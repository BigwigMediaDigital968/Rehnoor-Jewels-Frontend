// lib/api/collections.ts

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

export interface ApiCollection {
  _id: string;
  slug: string;
  name: string;
  label: string;
  tagline: string;
  tag: string;
  productCount: number;
  image?: string;
  heroImage?: string;
  isActive: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ourPromise: string;
  description: string;
  accentColor: string;
  products: string[]; // ObjectId refs (public list)
  seoKeywords: string[];
}

export interface CollectionsResponse {
  success: boolean;
  message?: string;
  data: ApiCollection[];
  total?: number;
  page?: number;
  pages?: number;
}

export interface SingleCollectionResponse {
  success: boolean;
  message?: string;
  data: ApiCollection | null;
}

// ─────────────────────────────────────────────────────────────────
// ENDPOINTS
// ─────────────────────────────────────────────────────────────────

/**
 * GET /api/collections
 * Supports: ?search=chains&tag=Men&sort=sortOrder&order=asc&page=1&limit=20
 */
export async function fetchPublicCollections(params?: {
  search?: string;
  tag?: string;
  sort?: "sortOrder" | "name" | "productCount" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}): Promise<CollectionsResponse> {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("search", params.search);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.sort) qs.set("sort", params.sort);
  if (params?.order) qs.set("order", params.order);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const url = `${BASE}/api/collections${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err.message ?? `Failed to fetch collections (${res.status})`,
    );
  }

  return res.json();
}

/**
 * GET /api/collections/:slug
 */
export async function fetchCollectionBySlug(
  slug: string,
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/${slug}`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

   if (res.status === 404) {
    return {
      success: false,
      data: null,
    };
  }

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}
