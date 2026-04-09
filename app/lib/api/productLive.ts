// lib/api/products.ts

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
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

  // Reviews and Rating
  rating?: number;
  reviewCount?: number;
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  data: ApiProduct[];
  total?: number;
  page?: number;
  pages?: number;
}

export interface SingleProductResponse {
  success: boolean;
  message?: string;
  data: ApiProduct | null;
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
export function fmt(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function calcDiscount(
  price: number,
  originalPrice?: number | null,
): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// ─────────────────────────────────────────────────────────────────
// PUBLIC ENDPOINTS
// ─────────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * Supports: ?collection=chains&category=Rings&tag=Bestseller
 *           &sort=price&order=asc&page=1&limit=20&search=nawabi
 *           &bestseller=true
 */
export async function fetchPublicProducts(params?: {
  collection?: string;
  category?: string;
  tag?: string;
  bestseller?: boolean;
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
  if (params?.bestseller) qs.set("bestseller", "true");
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

/**
 * GET /api/products/:slug
 * Single product with full details (images, sizes, related, etc.)
 */
export async function fetchProductBySlug(
  slug: string,
): Promise<SingleProductResponse> {
  const res = await fetch(`${BASE}/api/products/${slug}`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Product not found (${res.status})`);
  }

  return res.json();
}

/**
 * GET /api/products/slugs
 * Returns all slugs for generateStaticParams.
 * Your backend should implement this lightweight route.
 */
export async function fetchAllProductSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE}/api/products/slugs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
