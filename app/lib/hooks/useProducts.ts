// app/hooks/useProducts.ts
// Live product hook — fully integrated with fetchPublicProducts API
// Supports: collection, category, tag, bestseller, limit
// Returns: filtered data, loading, error, reload, category pills, filter state

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPublicProducts, type ApiProduct } from "@/app/lib/api/products";

export interface UseProductsOptions {
  collection?: string;
  category?: string;
  tag?: string;
  bestseller?: boolean;
  limit?: number;
}

export function useProducts(opts: UseProductsOptions = {}) {
  const [data, setData] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const [activeGender, setActiveGender] = useState("All");

  // Stable option values to prevent unnecessary re-fetches
  const collection = opts.collection;
  const category = opts.category;
  const tag = opts.tag;
  const bestseller = opts.bestseller;
  const limit = opts.limit ?? 100;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPublicProducts({
        collection,
        category,
        tag,
        limit,
        sort: "createdAt",
        order: "desc",
      });
      if (res.success) {
        setData(res.data ?? []);
      } else {
        setError(res.message ?? "Failed to load products");
        setData([]);
      }
    } catch (err: any) {
      setError(err.message ?? "Network error — please try again");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [collection, category, tag, bestseller, limit]);

  useEffect(() => {
    load();
  }, [load]);

  // Reset filter when data changes (e.g. after reload with different opts)
  useEffect(() => {
    setActiveFilter("All");
    setActiveGender("All");
  }, [collection, category, tag, bestseller]);

  // Derive category pills from live data (always includes "All")
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        data.map((p) => p.category).filter((c): c is string => Boolean(c)),
      ),
    ).sort();
    return ["All", ...unique];
  }, [data]);

  function getGender(product: ApiProduct) {
    const slug = product.collection?.slug?.toLowerCase() ?? "";

    if (slug.includes("-for-women")) return "Women";
    if (slug.includes("-for-men")) return "Men";

    return "Unisex";
  }

  const genders = useMemo(() => {
    const found = new Set<string>();

    data.forEach((p) => {
      const gender = getGender(p);

      if (gender !== "Unisex") {
        found.add(gender);
      }
    });

    return ["All", ...Array.from(found)];
  }, [data]);

  // console.log(
  //   data.map((p) => ({
  //     name: p.name,
  //     collection: p.collection?.slug,
  //     gender: getGender(p),
  //   })),
  // );

  // console.log(data);

  // console.log(data[0]);
  // console.log(data[0]?.collection);

  // Client-side category filter (instant, no extra round-trip)

  const filtered = useMemo(() => {
    let products =
      activeFilter === "All"
        ? data
        : data.filter((p) => p.category === activeFilter);

    if (activeGender !== "All") {
      products = products.filter((p) => getGender(p) === activeGender);
    }

    return products;
  }, [data, activeFilter, activeGender]);

  // Derived stats
  const totalCount = data.length;
  const filteredCount = filtered.length;

  return {
    /** Products after applying activeFilter category */
    filtered,
    /** All raw products from API (unfiltered) */
    all: data,
    loading,
    error,
    /** Manually re-fetch from API */
    reload: load,
    /** Category pill labels derived from live data */
    categories,
    /** Gender pill labels derived from live data */
    genders,
    activeGender,
    setActiveGender,
    /** Currently active category filter ("All" by default) */
    activeFilter,
    /** Set the active category filter */
    setActiveFilter,
    /** Total products loaded from API */
    totalCount,
    /** Products matching current category filter */
    filteredCount,
  };
}
