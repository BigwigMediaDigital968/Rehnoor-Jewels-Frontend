// lib/hooks/useSearch.ts
// Debounced search hook with suggestions, unified results, and history

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  clientSideSearch,
  type UnifiedSearchResponse,
  type SearchSuggestion,
} from "../api/search";

const DEBOUNCE_MS = 320;
const MIN_QUERY_LEN = 2;
const HISTORY_KEY = "rj_search_history";
const MAX_HISTORY = 6;

export type SearchStatus = "idle" | "loading" | "success" | "error";

// ── Local history helpers ─────────────────────────────────────────
function getHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function addToHistory(query: string) {
  if (!query.trim()) return;
  const prev = getHistory().filter(
    (q) => q.toLowerCase() !== query.toLowerCase(),
  );
  const next = [query, ...prev].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

// ─────────────────────────────────────────────────────────────────
// HOOK
// ─────────────────────────────────────────────────────────────────

export interface UseSearchOptions {
  productLimit?: number;
  collectionLimit?: number;
  blogLimit?: number;
  /** Use dedicated /api/search endpoint instead of client-side fanout */
  useUnifiedEndpoint?: boolean;
}

export function useSearch(opts: UseSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [results, setResults] = useState<UnifiedSearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Debounce query
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Run search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < MIN_QUERY_LEN) {
      setResults(null);
      setStatus("idle");
      setError(null);
      return;
    }

    // Cancel previous in-flight
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const run = async () => {
      setStatus("loading");
      setError(null);
      try {
        const res = await clientSideSearch(debouncedQuery, {
          productLimit: opts.productLimit ?? 6,
          collectionLimit: opts.collectionLimit ?? 4,
        });
        setResults(res);
        setStatus("success");
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message ?? "Search failed");
        setStatus("error");
      }
    };

    run();
  }, [debouncedQuery]);

  // Commit a search (adds to history)
  const commitSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    addToHistory(q);
    setHistory(getHistory());
  }, []);

  const clearSearchHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const reset = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setResults(null);
    setStatus("idle");
    setError(null);
  }, []);

  const isEmpty =
    status === "success" &&
    results !== null &&
    results.products.length === 0 &&
    results.collections.length === 0 &&
    results.blogs.length === 0;

  const isLoading = status === "loading";
  const hasResults =
    status === "success" &&
    results !== null &&
    (results.products.length > 0 ||
      results.collections.length > 0 ||
      results.blogs.length > 0);

  const showSuggestions = query.length >= MIN_QUERY_LEN;

  return {
    query,
    setQuery,
    status,
    results,
    error,
    history,
    commitSearch,
    clearSearchHistory,
    reset,
    isEmpty,
    isLoading,
    hasResults,
    showSuggestions,
    debouncedQuery,
  };
}
