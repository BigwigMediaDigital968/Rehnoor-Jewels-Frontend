// lib/hooks/useCollectionProducts.ts
// Fetches + client-side filters products belonging to one collection.

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ApiProduct, fetchPublicProducts } from "../api/productLive";

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

  console.log(data);

  // ── Normalise ApiProduct → Product shape the grid expects ───────
  // This is a thin adapter so CollectionProductGrid keeps its Product type

  const products = useMemo(
    () =>
      data.map((p) => ({
        id: p._id,
        name: p.name,
        subtitle: p.subtitle?.trim() || "",

        // ✅ Price handling
        price: p.priceFormatted ?? `₹${p.price}`,
        priceNum: p.price ?? 0,

        // ✅ Ensure string type
        originalPrice:
          p.originalPriceFormatted ??
          (p.originalPrice != null ? `₹${p.originalPrice}` : undefined),

        tag: p.tag,

        // ❌ REMOVE (not in backend)
        // rating: p.rating,
        // reviewCount: p.reviewCount,

        category: p.category,

        // ✅ FIXED
        href: `/products/${p.slug}`,

        images: p.images?.length
          ? p.images
          : [
              {
                src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
                alt: p.name,
              },
            ],

        sizes: p.sizes || [],
      })),
    [data],
  );

  return { products, loading, error, reload: load };
}
