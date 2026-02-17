/**
 * Embedding worker: loads Transformers.js pipeline, embeds app texts once,
 * then on query embeds query and returns similarities (0–100) by index.
 * Message protocol:
 * - { type: 'init', appTexts: string[] } -> worker stores embeddings
 * - { type: 'query', query: string, requestId: string } -> worker returns
 *   { type: 'similarities', requestId, similarities: number[] }
 * - { type: 'error', requestId?, message: string } on failure
 */

function cosineSimilarity(a, b) {
	if (a.length !== b.length) return 0;
	let dot = 0;
	let normA = 0;
	let normB = 0;
	for (let i = 0; i < a.length; i++) {
		dot += a[i] * b[i];
		normA += a[i] * a[i];
		normB += b[i] * b[i];
	}
	const denom = Math.sqrt(normA) * Math.sqrt(normB);
	return denom === 0 ? 0 : dot / denom;
}

let appEmbeddings = null;
let extractor = null;

self.onmessage = async (e) => {
	const { type } = e.data || {};
	try {
		if (type === "init") {
			const { appTexts } = e.data;
			const { pipeline } = await import("@xenova/transformers");
			extractor = await pipeline(
				"feature-extraction",
				"Xenova/all-MiniLM-L6-v2",
				{ progress_callback: () => {} },
			);
			appEmbeddings = [];
			for (let i = 0; i < appTexts.length; i++) {
				const out = await extractor(appTexts[i], {
					pooling: "mean",
					normalize: true,
				});
				appEmbeddings.push(Array.from(out.data));
			}
			self.postMessage({ type: "ready" });
			return;
		}
		if (type === "query") {
			const { query, requestId } = e.data;
			if (!extractor || !appEmbeddings?.length) {
				self.postMessage({
					type: "error",
					requestId,
					message: "Worker not initialized",
				});
				return;
			}
			const queryOut = await extractor(query, {
				pooling: "mean",
				normalize: true,
			});
			const queryVec = Array.from(queryOut.data);
			const similarities = appEmbeddings.map((vec) => {
				const sim = cosineSimilarity(queryVec, vec);
				return Math.max(0, Math.min(100, Math.round((sim + 1) * 50)));
			});
			self.postMessage({
				type: "similarities",
				requestId,
				similarities,
			});
			return;
		}
	} catch (err) {
		self.postMessage({
			type: "error",
			requestId: e.data?.requestId,
			message: err?.message || String(err),
		});
	}
};
