// lib/hooks/useCollectionProducts.ts
// Fetches + client-side filters products belonging to one collection.

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPublicProducts, type ApiProduct } from "../api/products";

export interface UseCollectionProductsOptions {
  collectionSlug: string;
  initialSearch?: string;
}

export function useCollectionProducts({
  collectionSlug,
  initialSearch = "",
}: UseCollectionProductsOptions) {
  const [data, setData] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch all products for this collection once ─────────────────
  const load = useCallback(async () => {
    if (!collectionSlug) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchPublicProducts({
        collection: collectionSlug,
        limit: 100, // pull all; client-side pagination handles the rest
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
  }, [collectionSlug]);

  useEffect(() => {
    load();
  }, [load]);

  // ── Normalise ApiProduct → Product shape the grid expects ───────
  // This is a thin adapter so CollectionProductGrid keeps its Product type
  const products = useMemo(
    () =>
      data.map((p) => ({
        id: p._id,
        name: p.name,
        subtitle: p.subtitle,

        // ✅ FIX HERE
        price: p.priceFormatted ?? `₹${p.price}`,
        priceNum: p.price ?? 0,

        originalPrice: p.originalPriceFormatted ?? p.originalPrice,
        tag: p.tag,
        rating: p.rating,
        reviewCount: p.reviewCount,
        category: p.category,
        href: p.href ?? `/products/${p.slug}`,
        images: p.images,
        sizes: p.sizes,
      })),
    [data],
  );

  return { products, loading, error, reload: load };
}
