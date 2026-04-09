// ── Individual product image ──────────────────────────────────────
export interface ProductImage {
  /** Absolute URL or relative path to the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
}

// ── Size option ───────────────────────────────────────────────────
export interface ProductSize {
  /**
   * Display label shown on the size picker button.
   * Examples: "18", "20", "S", "M", "L", '18"', "Free"
   */
  label: string;
  /** Whether this size is currently in stock */
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

  /** Display name shown on the card and product page */
  name: string;

  /**
   * Short descriptor line shown below the name.
   * Example: "22kt Yellow Gold · 18 inch"
   */
  subtitle: string;

  /**
   * Current selling price as a formatted string.
   * Example: "₹8,999"
   */
  price: string;

  /**
   * Original / MRP price (shown as strikethrough when present).
   * Omit if there is no discount.
   * Example: "₹10,499"
   */
  originalPrice?: string;

  /**
   * Prominent badge shown on the card image.
   * Drives the colour of the tag pill via TAG_STYLES map.
   */
  tag?: ProductTag;

  /**
   * Average star rating (1–5).
   * Used for the star row and "Top Rated" sort.
   */
  rating?: number;

  /** Total number of verified reviews */
  reviewCount?: number;

  /**
   * Product category.
   * Drives the category filter chips in ProductGrid.
   */
  category?: ProductCategory;

  /**
   * Short paragraph shown in the Quick View modal and product page hero.
   * Keep under ~200 characters for best layout.
   */
  description?: string;

  /**
   * Canonical URL for the product page.
   * Example: "/products/nawabi-chain-22kt"
   */
  href: string;

  /**
   * Ordered list of images for the card carousel.
   * First image is shown by default; subsequent images appear on arrow click.
   * Minimum: 1 image. Recommended: 2–4 images.
   */
  images: ProductImage[];

  sizeChartImage?: string;

  /** Banner image URL displayed below the "Buy It Now" button */
  offerBannerImage?: string;
  /**
   * Available sizes for the size picker in Quick View / product page.
   * Omit entirely for "one size fits all" products (pendant, free-size kadas).
   * Set available: false to show the size as greyed-out / crossed out.
   */
  sizes?: ProductSize[];

  /**
   * Optional: ISO date string for "New Arrivals" sorting.
   * Example: "2025-06-01"
   * If omitted, products fall back to array insertion order.
   */
  arrivedAt?: string;

  /**
   * Optional: gold weight in grams shown on product page.
   * Example: "8.5g"
   */
  goldWeight?: string;

  /**
   * Optional: purity label shown on product page / trust section.
   * Defaults to "22kt" if omitted.
   */
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
