// lib/hooks/useProducts.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPublicProducts, type ApiProduct } from "../api/productLive";

export interface UseProductsOptions {
  collection?: string;
  category?: string;
  bestseller?: boolean;
  limit?: number;
}

export function useProducts(opts: UseProductsOptions = {}) {
  const [data, setData] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPublicProducts({
        collection: opts.collection,
        category: opts.category,
        bestseller: opts.bestseller,
        limit: opts.limit ?? 20,
        sort: "createdAt",
        order: "desc",
      });
      if (res.success) {
        setData(res.data);
      } else {
        setError(res.message ?? "Failed to load products");
      }
    } catch (err: any) {
      setError(err.message ?? "Network error — please try again");
    } finally {
      setLoading(false);
    }
  }, [opts.collection, opts.category, opts.bestseller, opts.limit]);

  useEffect(() => {
    load();
  }, [load]);

  // Derive category pills from live data
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(data.map((p) => p.category).filter(Boolean))),
    ],
    [data],
  );

  console.log(data);

  // Client-side category filter (instant, no round-trip)
  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? data
        : data.filter((p) => p.category === activeFilter),
    [data, activeFilter],
  );

  return {
    filtered,
    loading,
    error,
    reload: load,
    categories,
    activeFilter,
    setActiveFilter,
  };
}
