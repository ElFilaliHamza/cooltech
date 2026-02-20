import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import Fuse from "fuse.js";

const DEBOUNCE_MS = 300;
const SEMANTIC_THRESHOLD = 62;
const TOP_K = 50;

function textForApp(app) {
	const parts = [
		app.name,
		app.category,
		app.description,
		...(Array.isArray(app.categories) ? app.categories : []),
		...(Array.isArray(app.tags) ? app.tags : []),
	];
	const d = app.details;
	if (d) {
		if (d.features) parts.push(d.features);
		if (d.whenToUse) parts.push(d.whenToUse);
		if (d.tips) parts.push(d.tips);
	}
	return parts.filter(Boolean).join(" ");
}

/**
 * useAISearch(apps) — fuzzy + optional semantic search.
 * Returns: setSearchQuery, results, similarityMap, useSemantic, handleSemanticChange,
 * semanticConfirmOpened, confirmAndLoadSemantic, closeSemanticConfirm,
 * isSemanticLoading, semanticError, semanticLoadProgress, semanticLoadStatus.
 */
export function useAISearch(apps, options = {}) {
	const workerRef = useRef(null);
	const workerReadyRef = useRef(false);
	const [workerReady, setWorkerReady] = useState(false);
	const lastRequestIdRef = useRef(0);

	useEffect(() => {
		workerReadyRef.current = workerReady;
	}, [workerReady]);
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [useSemantic, setUseSemantic] = useState(
		options.useSemantic ?? false,
	);
	const [semanticResults, setSemanticResults] = useState(null);
	const [isSemanticLoading, setIsSemanticLoading] = useState(false);
	const [semanticError, setSemanticError] = useState(null);
	const [semanticConfirmOpened, setSemanticConfirmOpened] = useState(false);
	const [semanticLoadProgress, setSemanticLoadProgress] = useState(0);
	const [semanticLoadStatus, setSemanticLoadStatus] = useState("");

	const debounceRef = useRef(null);

	const setSearchQuery = useCallback((value) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setDebouncedQuery(value);
		}, DEBOUNCE_MS);
	}, []);

	const fuse = useMemo(() => {
		if (!apps?.length) return null;
		return new Fuse(apps, {
			keys: ["name", "category", "description", "categories", "tags"],
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
			similarityMap.set(
				r.item.id,
				Math.max(0, Math.min(100, similarity)),
			);
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
		if (!workerReady || !workerRef.current) {
			setIsSemanticLoading(false);
			return;
		}
		setIsSemanticLoading(true);
		setSemanticError(null);
		lastRequestIdRef.current += 1;
		const requestId = lastRequestIdRef.current;
		workerRef.current.postMessage({
			type: "query",
			query: debouncedQuery.trim(),
			requestId,
		});
	}, [useSemantic, debouncedQuery, apps, workerReady]);

	const { results, similarityMap } = useMemo(() => {
		if (useSemantic && semanticResults && !semanticError) {
			return {
				results: semanticResults.map((r) => r.item),
				similarityMap: (() => {
					const m = new Map();
					semanticResults.forEach((r) =>
						m.set(r.item.id, Math.round(r.similarity)),
					);
					return m;
				})(),
			};
		}
		return fuzzyResults;
	}, [useSemantic, semanticResults, semanticError, fuzzyResults]);

	const requestEnableSemantic = useCallback(() => {
		if (workerReady) {
			setUseSemantic(true);
			setSemanticConfirmOpened(false);
			return;
		}
		setSemanticConfirmOpened(true);
		setSemanticLoadProgress(0);
		setSemanticLoadStatus("");
		setSemanticError(null);
	}, []);

	const confirmAndLoadSemantic = useCallback(() => {
		if (workerRef.current) {
			if (workerReadyRef.current) {
				setUseSemantic(true);
				setSemanticConfirmOpened(false);
			}
			return;
		}

		const worker = new Worker(
			new URL("./embeddingWorker.js", import.meta.url),
			{ type: "module" },
		);
		workerRef.current = worker;

		worker.onmessage = (event) => {
			const {
				type: msgType,
				percent,
				status,
				requestId,
				similarities,
				message,
			} = event.data || {};
			if (msgType === "progress") {
				setSemanticLoadProgress(percent ?? 0);
				setSemanticLoadStatus(status ?? "");
				return;
			}
			if (msgType === "ready") {
				setWorkerReady(true);
				setUseSemantic(true);
				setSemanticConfirmOpened(false);
				return;
			}
			if (msgType === "error") {
				setSemanticError(new Error(message || "Worker error"));
				if (requestId !== undefined) {
					setIsSemanticLoading(false);
				}
				return;
			}
			if (msgType === "similarities") {
				if (requestId !== lastRequestIdRef.current) return;
				setIsSemanticLoading(false);
				setSemanticError(null);
				const results = apps
					.map((app, i) => ({
						item: app,
						similarity: similarities[i] ?? 0,
					}))
					.sort((a, b) => b.similarity - a.similarity)
					.filter((r) => r.similarity >= SEMANTIC_THRESHOLD)
					.slice(0, TOP_K);
				setSemanticResults(results);
			}
		};

		worker.postMessage({
			type: "init",
			appTexts: apps.map(textForApp),
		});
	}, [apps]);

	// When user toggles OFF: close modal, cancel any in-progress load, leave worker running if already ready
	const handleSemanticChange = useCallback(
		(checked) => {
			if (!checked) {
				setUseSemantic(false);
				setSemanticConfirmOpened(false);
				if (!workerReady && workerRef.current) {
					workerRef.current.terminate();
					workerRef.current = null;
					setWorkerReady(false);
				}
				return;
			}
			requestEnableSemantic();
		},
		[requestEnableSemantic, workerReady],
	);

	// Cleanup the worker on unmount
	useEffect(() => {
		return () => {
			workerRef.current?.terminate();
			workerRef.current = null;
		};
	}, []);
	const closeSemanticConfirm = useCallback(() => {
		setSemanticConfirmOpened(false);
		setSemanticError(null);
	}, []);

	return {
		setSearchQuery,
		results,
		similarityMap,
		isSemanticLoading,
		semanticError,
		useSemantic,
		handleSemanticChange,
		semanticConfirmOpened,
		semanticLoadProgress,
		semanticLoadStatus,
		confirmAndLoadSemantic,
		closeSemanticConfirm,
	};
}
