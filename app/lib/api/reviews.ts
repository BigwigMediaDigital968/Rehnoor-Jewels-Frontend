// app/lib/api/reviews.ts
// All review-related API calls — public user side only

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────
// TYPES  (matching backend reviewSchema exactly)
// ─────────────────────────────────────────────────────────────────

export interface ReviewImage {
  src: string;
  alt: string;
}

export interface Review {
  _id: string;
  product: string;
  rating: number;
  reviewTitle: string;
  reviewDescription: string;
  username: string;
  userCity: string;
  sizePurchased: string;
  images: ReviewImage[];
  status: "pending" | "approved" | "rejected";
  isVerifiedPurchase: boolean;
  isFeatured: boolean;
  helpfulVotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface RatingBreakdown {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetReviewsResponse {
  success: boolean;
  message?: string;
  data: Review[];
  ratingBreakdown: RatingBreakdown;
  pagination: ReviewsPagination;
}

export interface SubmitReviewPayload {
  rating: number;
  reviewTitle: string;
  reviewDescription: string;
  username: string;
  userCity?: string;
  sizePurchased?: string;
  images?: File[];
}

export interface SubmitReviewResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    reviewTitle: string;
    status: string;
    createdAt: string;
  };
}

// ─────────────────────────────────────────────────────────────────
// FETCH APPROVED REVIEWS FOR A PRODUCT
// GET /api/reviews/:productIdOrSlug
// ─────────────────────────────────────────────────────────────────
export async function fetchProductReviews(
  productIdOrSlug: string,
  options: {
    page?: number;
    limit?: number;
    sort?: "recent" | "helpful" | "highest" | "lowest";
  } = {},
): Promise<GetReviewsResponse> {
  const { page = 1, limit = 10, sort = "recent" } = options;

  // Map sort UI values to API sort params
  const sortMap: Record<string, string> = {
    recent: "-createdAt",
    helpful: "-helpfulVotes",
    highest: "-rating",
    lowest: "rating",
  };

  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort: sortMap[sort] ?? "-createdAt",
  });

  const res = await fetch(`${BASE}/api/reviews/${productIdOrSlug}?${qs}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message ?? `Failed to fetch reviews (${res.status})`);
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────────────
// SUBMIT A REVIEW
// POST /api/reviews/:productId   (multipart/form-data)
// ─────────────────────────────────────────────────────────────────
export async function submitProductReview(
  productId: string,
  payload: SubmitReviewPayload,
): Promise<SubmitReviewResponse> {
  const fd = new FormData();
  fd.append("rating", String(payload.rating));
  fd.append("reviewTitle", payload.reviewTitle);
  fd.append("reviewDescription", payload.reviewDescription);
  fd.append("username", payload.username);
  if (payload.userCity) fd.append("userCity", payload.userCity);
  if (payload.sizePurchased) fd.append("sizePurchased", payload.sizePurchased);

  // Attach up to 5 images
  if (payload.images && payload.images.length > 0) {
    payload.images.slice(0, 5).forEach((file) => {
      fd.append("images", file);
    });
  }

  const res = await fetch(`${BASE}/api/reviews/${productId}`, {
    method: "POST",
    body: fd,
    // No Content-Type header — browser sets it with boundary for multipart
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? `Failed to submit review (${res.status})`);
  }

  return data;
}

// ─────────────────────────────────────────────────────────────────
// MARK REVIEW AS HELPFUL  (optimistic update — no backend endpoint needed)
// The backend schema has helpfulVotes but no dedicated increment route.
// We handle this client-side for now.
// ─────────────────────────────────────────────────────────────────
export function getHelpfulKey(reviewId: string): string {
  return `rj_helpful_${reviewId}`;
}

export function hasVotedHelpful(reviewId: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getHelpfulKey(reviewId)) === "1";
}

export function markVotedHelpful(reviewId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getHelpfulKey(reviewId), "1");
}
