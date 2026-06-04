// lib/api/search.ts
// Unified search across products, collections, and blogs

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

export interface SearchProductResult {
  type: "product";
  _id: string;
  slug: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number | null;
  priceFormatted?: string;
  originalPriceFormatted?: string | null;
  discountPct?: number;
  tag?: string;
  category?: string;
  collection?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  images: { src: string; alt: string }[];
  rating?: number;
  reviewCount?: number;
}

export interface SearchCollectionResult {
  type: "collection";
  _id: string;
  slug: string;
  name: string;
  label: string;
  tagline: string;
  tag: string;
  productCount: number;
  image?: string;
  coverImage?: string;
}

export interface SearchBlogResult {
  type: "blog";
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  tags?: string[];
  readTime?: number;
}

export type SearchResult =
  | SearchProductResult
  | SearchCollectionResult
  | SearchBlogResult;

export interface SearchSuggestion {
  label: string;
  type: "product" | "collection" | "category" | "tag";
  href: string;
  image?: string;
}

export interface UnifiedSearchResponse {
  success: boolean;
  query: string;
  products: SearchProductResult[];
  collections: SearchCollectionResult[];
  blogs: SearchBlogResult[];
  suggestions: SearchSuggestion[];
  total: number;
}

export interface SearchParams {
  q: string;
  limit?: number;
  productLimit?: number;
  collectionLimit?: number;
  blogLimit?: number;
}

// ─────────────────────────────────────────────────────────────────
// UNIFIED SEARCH ENDPOINT
// Expects backend: GET /api/search?q=nawabi&limit=5
// ─────────────────────────────────────────────────────────────────

export async function unifiedSearch(
  params: SearchParams,
): Promise<UnifiedSearchResponse> {
  const qs = new URLSearchParams();
  qs.set("q", params.q.trim());
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.productLimit) qs.set("productLimit", String(params.productLimit));
  if (params.collectionLimit)
    qs.set("collectionLimit", String(params.collectionLimit));
  if (params.blogLimit) qs.set("blogLimit", String(params.blogLimit));

  const res = await fetch(`${BASE}/api/search?${qs}`, {
    headers: { "Content-Type": "application/json" },
    // No cache — search results must be fresh
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Search failed (${res.status})`);
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────────
// SEARCH SUGGESTIONS (lightweight — for autocomplete dropdown)
// Expects backend: GET /api/search/suggestions?q=na&limit=8
// ─────────────────────────────────────────────────────────────────

export interface SuggestionsResponse {
  success: boolean;
  suggestions: SearchSuggestion[];
}

export async function fetchSearchSuggestions(
  query: string,
  limit = 8,
): Promise<SuggestionsResponse> {
  if (!query.trim()) return { success: true, suggestions: [] };

  const qs = new URLSearchParams({ q: query.trim(), limit: String(limit) });

  const res = await fetch(`${BASE}/api/search/suggestions?${qs}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) return { success: false, suggestions: [] };
  return res.json();
}

// ─────────────────────────────────────────────────────────────────
// CLIENT-SIDE FALLBACK SEARCH
// Used if /api/search doesn't exist yet — queries products + collections separately
// ─────────────────────────────────────────────────────────────────

import { fetchPublicProducts } from "./products";
import { fetchPublicCollections } from "./collections";

export async function clientSideSearch(
  query: string,
  opts: { productLimit?: number; collectionLimit?: number } = {},
): Promise<UnifiedSearchResponse> {
  const q = query.trim().toLowerCase();
  if (!q)
    return {
      success: true,
      query,
      products: [],
      collections: [],
      blogs: [],
      suggestions: [],
      total: 0,
    };

  const [productsRes, collectionsRes] = await Promise.allSettled([
    fetchPublicProducts({ search: q, limit: opts.productLimit ?? 6 }),
    fetchPublicCollections({ search: q, limit: opts.collectionLimit ?? 4 }),
  ]);

  const rawProducts =
    productsRes.status === "fulfilled" && productsRes.value.success
      ? productsRes.value.data
      : [];

  const rawCollections =
    collectionsRes.status === "fulfilled" && collectionsRes.value.success
      ? collectionsRes.value.data
      : [];

  const products: SearchProductResult[] = rawProducts.map((p) => ({
    type: "product" as const,
    _id: p._id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    price: p.price,
    originalPrice: p.originalPrice,
    priceFormatted: p.priceFormatted,
    originalPriceFormatted: p.originalPriceFormatted,
    discountPct: p.discountPct,
    tag: p.tag,
    category: p.category,
    collection: p.collection,
    images: p.images,
    rating: p.rating,
    reviewCount: p.reviewCount,
  }));

  const collections: SearchCollectionResult[] = rawCollections.map((c) => ({
    type: "collection" as const,
    _id: c._id,
    slug: c.slug,
    name: c.name,
    label: c.label,
    tagline: c.tagline,
    tag: c.tag,
    productCount: c.productCount,
    image: c.image,
    coverImage: c.heroImage,
  }));

  // Derive suggestions from results
  const suggestions: SearchSuggestion[] = [
    ...products.slice(0, 3).map((p) => ({
      label: p.name,
      type: "product" as const,
      href: `/products/${p.slug}`,
      image: p.images?.[0]?.src,
    })),
    ...collections.slice(0, 2).map((c) => ({
      label: c.name,
      type: "collection" as const,
      href: `/collections/${c.slug}`,
      image: c.coverImage ?? c.image,
    })),
  ];

  return {
    success: true,
    query,
    products,
    collections,
    blogs: [],
    suggestions,
    total: products.length + collections.length,
  };
}
