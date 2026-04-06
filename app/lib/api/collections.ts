// lib/api/collections.ts
// Single source of truth for all collection API calls.
// Matches the routes in collectionRouter.js

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────
// TYPES — mirrors collectionSchema + CollectionMeta from the frontend
// ─────────────────────────────────────────────────────────────────
export interface ApiCollection {
  _id: string;
  name: string;
  slug: string;
  label: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string;
  tag: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  products: string[]; // ObjectId refs (public list)
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
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
// PUBLIC ENDPOINTS
// ─────────────────────────────────────────────────────────────────

/**
 * GET /api/collections
 * Fetch all active collections (public, no token).
 * Supports: ?category=Chains&tag=New&sort=sortOrder&order=asc&page=1&limit=20&search=nawabi
 */
export async function fetchPublicCollections(params?: {
  category?: string;
  tag?: string;
  sort?: "sortOrder" | "name" | "productCount" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
}): Promise<CollectionsResponse> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.tag) qs.set("tag", params.tag);
  if (params?.sort) qs.set("sort", params.sort);
  if (params?.order) qs.set("order", params.order);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.search) qs.set("search", params.search);

  const url = `${BASE}/api/collections${qs.toString() ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // ISR: revalidate every 60 s (Next.js 14+)
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
 * GET /api/collections/:idOrSlug
 * Single collection with its active products populated.
 */
export async function fetchCollectionBySlug(
  idOrSlug: string,
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/${idOrSlug}`, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Collection not found (${res.status})`);
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────────
// ADMIN ENDPOINTS (require JWT via Authorization: Bearer <token>)
// ─────────────────────────────────────────────────────────────────
function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/** GET /api/collections/admin/all */
export async function adminFetchAllCollections(
  token: string,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  },
): Promise<CollectionsResponse> {
  const qs = new URLSearchParams();
  if (params?.page !== undefined) qs.set("page", String(params.page));
  if (params?.limit !== undefined) qs.set("limit", String(params.limit));
  if (params?.search) qs.set("search", params.search);
  if (params?.isActive !== undefined)
    qs.set("isActive", String(params.isActive));
  const res = await fetch(`${BASE}/api/collections/admin/all?${qs}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Admin fetch failed (${res.status})`);
  return res.json();
}

/** POST /api/collections/admin/create */
export async function adminCreateCollection(
  token: string,
  payload: Partial<ApiCollection>,
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/admin/create`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Create failed (${res.status})`);
  return res.json();
}

/** PUT /api/collections/admin/:id */
export async function adminUpdateCollection(
  token: string,
  id: string,
  payload: Partial<ApiCollection>,
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/admin/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Update failed (${res.status})`);
  return res.json();
}

/** PATCH /api/collections/admin/:id/toggle */
export async function adminToggleCollection(
  token: string,
  id: string,
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/admin/${id}/toggle`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Toggle failed (${res.status})`);
  return res.json();
}

/** PATCH /api/collections/admin/:id/products */
export async function adminManageCollectionProducts(
  token: string,
  id: string,
  action: "add" | "remove",
  productIds: string[],
): Promise<SingleCollectionResponse> {
  const res = await fetch(`${BASE}/api/collections/admin/${id}/products`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ action, productIds }),
  });
  if (!res.ok) throw new Error(`Products update failed (${res.status})`);
  return res.json();
}

/** DELETE /api/collections/admin/:id */
export async function adminDeleteCollection(
  token: string,
  id: string,
): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE}/api/collections/admin/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
  return res.json();
}
