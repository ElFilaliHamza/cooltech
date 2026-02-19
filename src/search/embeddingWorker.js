/**
 * Embedding worker: loads the model ONCE, embeds app texts once,
 * then on query embeds only the query and returns similarities (0–100) by index.
 * Progress messages drive the enable-semantic modal (no model load on main thread).
 *
 * Messages in:
 * - { type: 'init', appTexts: string[] }
 * - { type: 'query', query: string, requestId: string }
 *
 * Messages out:
 * - { type: 'progress', status: string, percent: number }
 * - { type: 'ready' }
 * - { type: 'similarities', requestId, similarities: number[] }
 * - { type: 'error', requestId?, message: string }
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

function postProgress(percent, status) {
	self.postMessage({ type: "progress", percent, status });
}

let appEmbeddings = null;
let extractor = null;

self.onmessage = async (e) => {
	const { type } = e.data || {};
	try {
		if (type === "init") {
			const { appTexts } = e.data;
			if (!Array.isArray(appTexts) || !appTexts.length) {
				self.postMessage({
					type: "error",
					message: "init requires non-empty appTexts",
				});
				return;
			}

			postProgress(0, "Preparing…");
			postProgress(10, "Loading package…");
			const { pipeline, env } = await import("@xenova/transformers");

			if (env && typeof env !== "undefined") {
				env.remoteHost = "https://huggingface.co";
				env.useBrowserCache = false;
				env.allowLocalModels = false;
			}

			postProgress(20, "Downloading model…");
			extractor = await pipeline(
				"feature-extraction",
				"Xenova/all-MiniLM-L6-v2",
				{
					progress_callback: (progress) => {
						const p = progress?.progress ?? progress?.loaded;
						const value =
							typeof p === "number" ? 20 + (p / 100) * 50 : 35;
						postProgress(
							Math.min(69, Math.round(value)),
							"Downloading model…",
						);
					},
				},
			);

			postProgress(70, "Indexing catalog…");
			appEmbeddings = [];
			const total = appTexts.length;
			for (let i = 0; i < total; i++) {
				const out = await extractor(appTexts[i], {
					pooling: "mean",
					normalize: true,
				});
				appEmbeddings.push(Array.from(out.data));
				if (i % 10 === 0 || i === total - 1) {
					postProgress(
						70 + Math.round((i / total) * 29),
						`Indexing… ${i + 1}/${total}`,
					);
				}
			}

			postProgress(100, "Ready");
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
