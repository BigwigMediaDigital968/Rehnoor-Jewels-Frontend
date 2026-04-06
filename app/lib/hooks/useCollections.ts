// lib/hooks/useCollections.ts
// Client-side hook for fetching + filtering collections with loading/error state.
// Used by CollectionsGrid — replaces the static `collections` array.

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPublicCollections, type ApiCollection } from "../api/collections";

export interface UseCollectionsOptions {
  initialCategory?: string;
  initialTag?: string;
  initialSort?: string;
  initialSearch?: string;
}

export function useCollections(opts: UseCollectionsOptions = {}) {
  const [data, setData] = useState<ApiCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Client-side filter state (applied on top of server data for instant UX)
  const [query, setQuery] = useState(opts.initialSearch ?? "");
  const [category, setCategory] = useState(opts.initialCategory ?? "All");
  const [sortBy, setSortBy] = useState(opts.initialSort ?? "default");

  // ── Fetch from API ──────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPublicCollections({
        // Pass server-side sort so the initial order is correct
        sort: "sortOrder",
        order: "asc",
        limit: 50,
      });
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.message ?? "Failed to load collections");
      }
    } catch (err: any) {
      setError(err.message ?? "Network error — please try again");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── Derived categories from API data ───────────────────────────
  const categories = useMemo(() => {
    const cats = Array.from(new Set(data.map((c) => c.label.split(" ")[0]))); // crude guess
    // Better: use a `category` field if your schema has it, otherwise derive from tag
    return [
      "All",
      ...Array.from(new Set(data.map((c) => c.tag).filter(Boolean))),
    ];
  }, [data]);

  // ── Client-side filter + sort (instant, no round-trip) ─────────
  const results = useMemo(() => {
    let list = [...data];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q),
      );
    }

    if (category !== "All") {
      list = list.filter((c) => c.tag === category);
    }

    if (sortBy === "price-asc")
      list.sort((a, b) => a.productCount - b.productCount);
    if (sortBy === "price-desc")
      list.sort((a, b) => b.productCount - a.productCount);
    if (sortBy === "newest")
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    // "default" — keep server sortOrder

    return list;
  }, [data, query, category, sortBy]);

  const clearAll = useCallback(() => {
    setQuery("");
    setCategory("All");
    setSortBy("default");
  }, []);

  return {
    results,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    categories,
    clearAll,
    reload: load,
  };
}
