import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Fuse from "fuse.js";

const DEBOUNCE_MS = 300;

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

function textForApp(app) {
	return [app.name, app.category, app.description].filter(Boolean).join(" ");
}

/**
 * Lazy-load Transformers.js and run semantic search.
 * Returns { results: [{ item, similarity }], error }.
 */
async function runSemanticSearch(apps, query) {
	try {
		const { pipeline } = await import("@xenova/transformers");
		const extractor = await pipeline(
			"feature-extraction",
			"Xenova/all-MiniLM-L6-v2",
			{ progress_callback: () => {} },
		);
		const queryEmbedding = await extractor(query, {
			pooling: "mean",
			normalize: true,
		});
		const queryVec = Array.from(queryEmbedding.data);

		const results = [];
		for (let i = 0; i < apps.length; i++) {
			const text = textForApp(apps[i]);
			const emb = await extractor(text, {
				pooling: "mean",
				normalize: true,
			});
			const vec = Array.from(emb.data);
			const sim = cosineSimilarity(queryVec, vec);
			const similarity = Math.max(0, Math.min(100, (sim + 1) * 50));
			results.push({ item: apps[i], similarity });
		}
		results.sort((a, b) => b.similarity - a.similarity);
		return { results, error: null };
	} catch (err) {
		return { results: [], error: err };
	}
}

/**
 * useAISearch(apps, options)
 * - apps: array of { id, name, category, description }
 * - options: { useSemantic: boolean }
 * Returns: { query, setQuery, debouncedQuery, results, similarityMap, isSemanticLoading, semanticError, useSemantic, setUseSemantic }
 * - results: array of app items (filtered/sorted by search)
 * - similarityMap: Map<id, 0-100> when in search mode
 */
export function useAISearch(apps, options = {}) {
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [useSemantic, setUseSemantic] = useState(false);
	const [semanticResults, setSemanticResults] = useState(null);
	const [isSemanticLoading, setIsSemanticLoading] = useState(false);
	const [semanticError, setSemanticError] = useState(null);
	const debounceRef = useRef(null);

	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setDebouncedQuery(query);
			debounceRef.current = null;
		}, DEBOUNCE_MS);
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [query]);

	const fuse = useMemo(() => {
		if (!apps?.length) return null;
		return new Fuse(apps, {
			keys: ["name", "category", "description"],
			includeScore: true,
			threshold: 0.4,
		});
	}, [apps]);

	const fuzzyResults = useMemo(() => {
		if (!fuse) return { results: [], similarityMap: new Map() };
		if (!debouncedQuery.trim()) {
			const similarityMap = new Map();
			apps.forEach((a) => similarityMap.set(a.id, 100));
			return { results: apps, similarityMap };
		}
		const searchResults = fuse.search(debouncedQuery.trim());
		const similarityMap = new Map();
		const results = searchResults.map((r) => {
			const score = r.score ?? 1;
			const similarity = Math.round((1 - score) * 100);
			similarityMap.set(r.item.id, Math.max(0, Math.min(100, similarity)));
			return r.item;
		});
		return { results, similarityMap };
	}, [fuse, debouncedQuery, apps]);

	useEffect(() => {
		if (!useSemantic || !debouncedQuery.trim() || !apps?.length) {
			setSemanticResults(null);
			setSemanticError(null);
			return;
		}
		let cancelled = false;
		setIsSemanticLoading(true);
		setSemanticError(null);
		runSemanticSearch(apps, debouncedQuery).then(({ results, error }) => {
			if (cancelled) return;
			setIsSemanticLoading(false);
			setSemanticError(error ?? null);
			setSemanticResults(results);
		});
		return () => {
			cancelled = true;
		};
	}, [useSemantic, debouncedQuery, apps]);

	const results = useMemo(() => {
		if (useSemantic && semanticResults && !semanticError) {
			return semanticResults.map((r) => r.item);
		}
		return fuzzyResults.results;
	}, [useSemantic, semanticResults, semanticError, fuzzyResults.results]);

	const similarityMap = useMemo(() => {
		if (useSemantic && semanticResults && !semanticError) {
			const m = new Map();
			semanticResults.forEach((r) =>
				m.set(r.item.id, Math.round(r.similarity)),
			);
			return m;
		}
		return fuzzyResults.similarityMap;
	}, [useSemantic, semanticResults, semanticError, fuzzyResults.similarityMap]);

	return {
		query,
		setQuery,
		debouncedQuery,
		results,
		similarityMap,
		isSemanticLoading,
		semanticError,
		useSemantic,
		setUseSemantic,
	};
}
