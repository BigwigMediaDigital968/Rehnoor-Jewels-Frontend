// lib/api/products.ts
// Public product fetching — mirrors the pattern in collections.ts

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// export interface ApiProduct {
//   weight: string;
//   badge: string | undefined;
//   karat: "22kt" | "18kt" | "14kt" | "24kt" | undefined;
//   description: string;
//   originalPriceFormatted: string | undefined;
//   priceFormatted: string;
//   _id: string;
//   id: string; // virtual or alias — add to your mongoose schema if needed
//   name: string;
//   subtitle: string;
//   slug: string;
//   price: number; // "₹8,999"  — formatted on the backend, or format here
//   priceNum: number; // raw number for sorting/filtering
//   originalPrice?: string;
//   tag?: string;
//   rating?: number;
//   reviewCount?: number;
//   category: string;
//   collection: string; // slug of the parent collection
//   href: string; // "/products/<slug>"
//   images: { src: string; alt: string }[];
//   sizeChartImage: { src: string; alt: string };
//   offerBannerImage: { src: string; alt: string };
//   sizes: { label: string; available: boolean }[];
//   isActive: boolean;
//   createdAt: string;
// }

export interface ApiProduct {
  id: any;
  _id: string;
  slug: string;

  // ─── Identity ─────────────────────────────
  name: string;
  subtitle: string;
  sku?: string;

  // ─── Collection / Category ────────────────
  collection?: string | null;
  category: string;

  // ─── Pricing ──────────────────────────────
  price: number;
  originalPrice?: number | null;
  currency: string;

  // ─── Classification ───────────────────────
  tag?:
    | "Bestseller"
    | "New"
    | "Popular"
    | "Limited"
    | "Exclusive"
    | "Trending"
    | "Sale"
    | "";

  purity?: string; // 22kt
  metal?: string; // Yellow Gold
  bisHallmark?: boolean;
  countryOfOrigin?: string;

  // ─── Content ──────────────────────────────
  shortDescription?: string;
  longDescription?: string;

  ourPromise: string;

  // ─── Media ────────────────────────────────
  images: {
    src: string;
    alt: string;
  }[];

  offerBannerImage: string;
  sizeChartImage: string;

  // ─── Variants ─────────────────────────────
  sizes: {
    label: string;
    available: boolean;
  }[];

  weightGrams?: string;

  // ─── Specifications ───────────────────────
  specifications?: {
    key: string;
    value: string;
    icon?: string;
  }[];

  // ─── SEO ──────────────────────────────────
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];

  // ─── Admin ────────────────────────────────
  isActive: boolean;
  isFeatured?: boolean;
  stock?: number | null;
  sortOrder?: number;

  // ─── System ───────────────────────────────
  createdAt: string;
  updatedAt: string;

  // ─── Virtuals (IMPORTANT) ─────────────────
  discountPct?: number;
  priceFormatted?: string;
  originalPriceFormatted?: string | null;
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  data: ApiProduct[];
  total?: number;
  page?: number;
  pages?: number;
}

/**
 * GET /api/products
 * Public product list. Filter by collection slug, tag, category, etc.
 */
export async function fetchPublicProducts(params?: {
  collection?: string; // collection slug — the key filter for this page
  category?: string;
  tag?: string;
  search?: string;
  sort?: "price" | "rating" | "createdAt" | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const qs = new URLSearchParams();
  if (params?.collection) qs.set("collection", params.collection);
  if (params?.category) qs.set("category", params.category);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.search) qs.set("search", params.search);
  if (params?.sort) qs.set("sort", params.sort);
  if (params?.order) qs.set("order", params.order);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const url = `${BASE}/api/products${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Failed to fetch products (${res.status})`);
  }

  return res.json();
}
