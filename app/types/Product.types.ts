// ── Individual product image ──────────────────────────────────────
export interface ProductImage {
  src: string;
  alt: string;
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface Variant {
  _id: string;
  title?: string;
  sku?: string;
  barcode?: string;
  price: number;
  originalPrice?: number | null;
  stock?: number | null;
  weightGrams?: number;
  isDefault: boolean;
  isActive: boolean;
  options?: Record<string, string>;
  images?: ProductImage[];
}

// ── Size option ───────────────────────────────────────────────────
export interface ProductSize {
  label: string;
  available: boolean;
}

// ── Tag union — extend as needed ──────────────────────────────────
export type ProductTag =
  | "New"
  | "Bestseller"
  | "Limited"
  | "Sale"
  | "Exclusive"
  | "Trending"
  | "Popular";

// ── Category union — extend as needed ────────────────────────────
export type ProductCategory =
  | "Chains"
  | "Kadas"
  | "Rings"
  | "Bracelets"
  | "Pendants"
  | (string & {}); // allows custom strings while keeping autocomplete

// ── Core Product type ─────────────────────────────────────────────
export interface Product {
  /** Unique slug — used in URLs: /products/{id} */
  id: string;

  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  tag?: ProductTag;
  rating?: number;

  reviewCount?: number;

  category?: ProductCategory;
  collection?: string | null;

  description?: string;
  shortDescription?: string;

  href: string;

  options?: VariantOption[];
  variants?: Variant[];
  sku?: string;

  stock?: number | null;

  images: ProductImage[];

  sizeChartImage?: string;

  offerBannerImage?: string;

  sizes?: ProductSize[];

  arrivedAt?: string;

  weightGrams?: number;

  purity?: "22kt" | "18kt" | "14kt" | "24kt";

  /**
   * Optional: BIS hallmark certificate number.
   * Shown on product page for authenticity.
   */
  bisNumber?: string;
  ourPromise?: string;

  specifications?: {
    key: string;
    value: string;
    icon?: string;
  }[];

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// ── Lightweight card-only variant ────────────────────────────────
/**
 * Minimum fields needed to render a ProductCard or ProductCardCarousel.
 * Use this type when fetching a paginated product list where you
 * don't need the full product details yet.
 */
export type ProductSummary = Pick<
  Product,
  | "id"
  | "name"
  | "subtitle"
  | "price"
  | "originalPrice"
  | "tag"
  | "rating"
  | "reviewCount"
  | "category"
  | "href"
  | "images"
>;

// ── API response shape (for future backend integration) ───────────
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ── Filter state (used in ProductGrid) ───────────────────────────
export interface ProductFilters {
  query: string;
  category: ProductCategory | "All";
  tag: ProductTag | "All";
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
}
