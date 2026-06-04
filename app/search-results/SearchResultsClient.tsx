"use client";

// app/products/page.tsx  (or app/store/page.tsx — adjust to your routing)
// Reads ?search= from URL, renders product grid + related collection cards

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Package,
  Layers,
  ChevronRight,
  Star,
  Grid2X2,
  List,
} from "lucide-react";
import { fetchPublicProducts, type ApiProduct } from "@/app/lib/api/products";
import {
  fetchPublicCollections,
  type ApiCollection,
} from "@/app/lib/api/collections";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
type SortOption = "newest" | "price-asc" | "price-desc" | "rating";
type ViewMode = "grid" | "list";

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD — GRID
// ─────────────────────────────────────────────────────────────────
function ProductGridCard({ product }: { product: ApiProduct }) {
  const img = product.images?.[0];
  const price =
    product.priceFormatted ?? `₹${product.price.toLocaleString("en-IN")}`;
  const originalPrice = product.originalPriceFormatted;
  const discount = product.discountPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: "white",
          border: "1px solid rgba(0,55,32,0.08)",
          boxShadow: "0 2px 12px rgba(0,55,32,0.05)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,55,32,0.12)";
          e.currentTarget.style.borderColor = "rgba(252,193,81,0.3)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,55,32,0.05)";
          e.currentTarget.style.borderColor = "rgba(0,55,32,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1/1", background: "rgba(0,55,32,0.03)" }}
        >
          {img ? (
            <Image
              src={img.src}
              alt={img.alt ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={32} style={{ color: "rgba(0,55,32,0.2)" }} />
            </div>
          )}

          {/* Tag badge */}
          {product.tag && (
            <span
              className="absolute top-2 left-2 font-cinzel text-[8px] tracking-[0.15em] uppercase px-2 py-1 rounded-full"
              style={{
                background:
                  product.tag === "Sale"
                    ? "var(--rj-emerald)"
                    : "var(--rj-gold)",
                color:
                  product.tag === "Sale"
                    ? "var(--rj-gold)"
                    : "var(--rj-emerald)",
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Discount badge */}
          {discount && discount > 0 ? (
            <span
              className="absolute top-2 right-2 font-cinzel text-[9px] font-bold px-2 py-1 rounded-full"
              style={{ background: "#ef4444", color: "white" }}
            >
              -{discount}%
            </span>
          ) : null}

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(0,55,32,0.7) 0%, transparent 60%)",
            }}
          >
            <span
              className="font-cinzel text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full"
              style={{
                background: "var(--rj-gold)",
                color: "var(--rj-emerald)",
              }}
            >
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <p
            className="font-cinzel text-[10px] tracking-[0.15em] uppercase mb-1 truncate"
            style={{ color: "var(--rj-ash)" }}
          >
            {product.category ?? product.collection?.name}
          </p>
          <h3
            className="font-cinzel text-[12px] sm:text-[13px] tracking-wide font-medium leading-snug line-clamp-2 mb-2"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && product.rating > 0 ? (
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  style={{
                    fill:
                      i < Math.round(product.rating!)
                        ? "var(--rj-gold)"
                        : "transparent",
                    color:
                      i < Math.round(product.rating!)
                        ? "var(--rj-gold)"
                        : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
              {product.reviewCount ? (
                <span
                  className="font-cinzel text-[9px]"
                  style={{ color: "var(--rj-ash)" }}
                >
                  ({product.reviewCount})
                </span>
              ) : null}
            </div>
          ) : null}

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-cinzel text-[14px] sm:text-[15px] font-bold"
              style={{ color: "var(--rj-emerald)" }}
            >
              {price}
            </span>
            {originalPrice && (
              <span
                className="font-cinzel text-[11px] line-through"
                style={{ color: "var(--rj-ash)" }}
              >
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD — LIST
// ─────────────────────────────────────────────────────────────────
function ProductListCard({ product }: { product: ApiProduct }) {
  const img = product.images?.[0];
  const price =
    product.priceFormatted ?? `₹${product.price.toLocaleString("en-IN")}`;
  const originalPrice = product.originalPriceFormatted;
  const discount = product.discountPct;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex gap-4 p-3 sm:p-4 rounded-2xl transition-all duration-300"
        style={{
          background: "white",
          border: "1px solid rgba(0,55,32,0.08)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(252,193,81,0.3)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,55,32,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,55,32,0.08)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0"
          style={{ background: "rgba(0,55,32,0.04)" }}
        >
          {img ? (
            <Image
              src={img.src}
              alt={img.alt ?? product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={24} style={{ color: "rgba(0,55,32,0.2)" }} />
            </div>
          )}
          {discount && discount > 0 ? (
            <span
              className="absolute top-1 left-1 font-cinzel text-[7px] font-bold px-1 py-0.5 rounded"
              style={{ background: "#ef4444", color: "white" }}
            >
              -{discount}%
            </span>
          ) : null}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className="font-cinzel text-[9px] tracking-[0.15em] uppercase mb-0.5"
                style={{ color: "var(--rj-ash)" }}
              >
                {product.category ?? product.collection?.name}
              </p>
              <h3
                className="font-cinzel text-[12px] sm:text-[13px] tracking-wide font-medium leading-snug line-clamp-2"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {product.name}
              </h3>
            </div>
            {product.tag && (
              <span
                className="flex-shrink-0 font-cinzel text-[8px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(252,193,81,0.12)",
                  color: "#b8860b",
                  border: "1px solid rgba(252,193,81,0.25)",
                }}
              >
                {product.tag}
              </span>
            )}
          </div>

          {product.subtitle && (
            <p
              className="font-cinzel text-[10px] tracking-wider mt-1 line-clamp-1"
              style={{ color: "var(--rj-ash)" }}
            >
              {product.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span
                className="font-cinzel text-[14px] font-bold"
                style={{ color: "var(--rj-emerald)" }}
              >
                {price}
              </span>
              {originalPrice && (
                <span
                  className="font-cinzel text-[10px] line-through"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {originalPrice}
                </span>
              )}
            </div>
            <span
              className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase"
              style={{ color: "var(--rj-gold)" }}
            >
              View <ChevronRight size={10} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RELATED COLLECTION CARD
// ─────────────────────────────────────────────────────────────────
function CollectionCard({ collection }: { collection: ApiCollection }) {
  const img = collection.heroImage ?? collection.image;

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 flex-shrink-0"
      style={{
        width: "clamp(200px, 33vw, 300px)",
        aspectRatio: "4/3",
        cursor: "pointer",
        background: "rgba(0,55,32,0.06)",
      }}
    >
      {img ? (
        <Image
          src={img}
          alt={collection.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="280px"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Layers size={32} style={{ color: "rgba(0,55,32,0.2)" }} />
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,55,32,0.85) 0%, rgba(0,55,32,0.2) 60%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <span
          className="font-cinzel text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full mb-1.5 inline-block"
          style={{
            background: "rgba(252,193,81,0.25)",
            color: "var(--rj-gold)",
          }}
        >
          {collection.tag}
        </span>
        <h3
          className="font-cinzel text-[12px] sm:text-[13px] tracking-wide font-medium leading-snug"
          style={{ color: "white" }}
        >
          {collection.name}
        </h3>
        <p
          className="font-cinzel text-[9px] tracking-wider mt-0.5 opacity-80 line-clamp-1"
          style={{ color: "rgba(252,193,81,0.85)" }}
        >
          {collection.productCount} pieces
        </p>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
        style={{ background: "var(--rj-gold)" }}
      >
        <ChevronRight size={14} style={{ color: "var(--rj-emerald)" }} />
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────────────────────────────
function ProductSkeleton({ view }: { view: ViewMode }) {
  if (view === "list") {
    return (
      <div
        className="flex gap-4 p-4 rounded-2xl animate-pulse"
        style={{ background: "rgba(0,55,32,0.04)" }}
      >
        <div
          className="w-24 h-24 rounded-xl"
          style={{ background: "rgba(0,55,32,0.08)" }}
        />
        <div className="flex-1 space-y-2">
          <div
            className="h-3 rounded w-1/4"
            style={{ background: "rgba(0,55,32,0.08)" }}
          />
          <div
            className="h-4 rounded w-3/4"
            style={{ background: "rgba(0,55,32,0.08)" }}
          />
          <div
            className="h-3 rounded w-1/2"
            style={{ background: "rgba(0,55,32,0.08)" }}
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className="rounded-2xl overflow-hidden animate-pulse"
      style={{ background: "rgba(0,55,32,0.04)" }}
    >
      <div style={{ aspectRatio: "3/4", background: "rgba(0,55,32,0.08)" }} />
      <div className="p-4 space-y-2">
        <div
          className="h-3 rounded w-1/3"
          style={{ background: "rgba(0,55,32,0.08)" }}
        />
        <div
          className="h-4 rounded w-4/5"
          style={{ background: "rgba(0,55,32,0.08)" }}
        />
        <div
          className="h-5 rounded w-1/2"
          style={{ background: "rgba(0,55,32,0.08)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function ProductsSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get("search") ?? "";

  const [localQuery, setLocalQuery] = useState(urlQuery);
  const [committedQuery, setCommittedQuery] = useState(urlQuery);

  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [collections, setCollections] = useState<ApiCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  // Sync URL → local state when URL changes
  useEffect(() => {
    setLocalQuery(urlQuery);
    setCommittedQuery(urlQuery);
    setActiveCategory("All");
  }, [urlQuery]);

  // Fetch
  const runSearch = useCallback(
    async (q: string) => {
      setLoading(true);
      setError(null);

      const sortMap: Record<SortOption, { sort: any; order: "asc" | "desc" }> =
        {
          newest: { sort: "createdAt", order: "desc" },
          "price-asc": { sort: "price", order: "asc" },
          "price-desc": { sort: "price", order: "desc" },
          rating: { sort: "rating", order: "desc" },
        };

      try {
        const [productsRes, collectionsRes] = await Promise.allSettled([
          fetchPublicProducts({
            search: q || undefined,
            limit: 48,
            sort: sortMap[sortBy].sort,
            order: sortMap[sortBy].order,
          }),
          fetchPublicCollections({
            search: q || undefined,
            limit: 8,
          }),
        ]);

        if (productsRes.status === "fulfilled" && productsRes.value.success) {
          setProducts(productsRes.value.data);
        } else {
          setProducts([]);
        }

        if (
          collectionsRes.status === "fulfilled" &&
          collectionsRes.value.success
        ) {
          setCollections(collectionsRes.value.data);
        } else {
          setCollections([]);
        }
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [sortBy],
  );

  useEffect(() => {
    runSearch(committedQuery);
  }, [committedQuery, runSearch]);

  // Category pills from products
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    ).sort();
    return ["All", ...cats];
  }, [products]);

  // Client-side filter
  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localQuery.trim()) return;
    setCommittedQuery(localQuery);
    router.push(`/search-results?search=${encodeURIComponent(localQuery)}`, {
      scroll: false,
    });
  };

  const handleClear = () => {
    setLocalQuery("");
    setCommittedQuery("");
    router.push("/products", { scroll: false });
  };

  const hasQuery = !!committedQuery;
  const isEmpty = !loading && filtered.length === 0;

  // ── RENDER ─────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--rj-ivory, #faf8f4)" }}
    >
      {/* ── HEADER BAND ─────────────────────────────────────────── */}
      <div
        className="z-[50]"
        style={{
          background: "white",
          borderBottom: "1px solid rgba(0,55,32,0.08)",
          boxShadow: "0 2px 16px rgba(0,55,32,0.06)",
        }}
      >
        <div className="container-rj py-3 sm:py-4">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center gap-2"
          >
            <div
              className="flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all"
              style={{
                background: "rgba(0,55,32,0.04)",
                border: "1.5px solid rgba(0,55,32,0.1)",
              }}
              onFocus={() => {}}
            >
              <Search
                size={16}
                className="flex-shrink-0"
                style={{ color: "var(--rj-emerald)" }}
              />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search jewellery…"
                className="flex-1 bg-transparent outline-none font-cinzel text-[12px] sm:text-[13px] tracking-wide min-w-0"
                style={{ color: "var(--rj-charcoal)" }}
                autoComplete="off"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-shrink-0"
                  style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-cinzel text-[11px] tracking-[0.15em] uppercase transition-all"
              style={{
                background: "var(--rj-emerald)",
                color: "var(--rj-gold)",
                cursor: "pointer",
              }}
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            {/* Result count */}
            <p
              className="font-cinzel text-[10px] tracking-wider"
              style={{ color: "var(--rj-ash)" }}
            >
              {loading ? (
                "Searching…"
              ) : hasQuery ? (
                <>
                  <span style={{ color: "var(--rj-emerald)" }}>
                    {filtered.length}
                  </span>{" "}
                  result{filtered.length !== 1 ? "s" : ""} for{" "}
                  <span
                    className="font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    "{committedQuery}"
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: "var(--rj-emerald)" }}>
                    {filtered.length}
                  </span>{" "}
                  products
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="font-cinzel text-[10px] tracking-wide px-3 py-1.5 rounded-lg outline-none"
                style={{
                  background: "rgba(0,55,32,0.05)",
                  border: "1px solid rgba(0,55,32,0.1)",
                  color: "var(--rj-charcoal)",
                  cursor: "pointer",
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>

              {/* View toggle */}
              <div
                className="flex rounded-lg overflow-hidden"
                style={{ border: "1px solid rgba(0,55,32,0.1)" }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-2 transition-colors"
                  style={{
                    background:
                      viewMode === "grid" ? "var(--rj-emerald)" : "transparent",
                    color:
                      viewMode === "grid" ? "var(--rj-gold)" : "var(--rj-ash)",
                    cursor: "pointer",
                  }}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="p-2 transition-colors"
                  style={{
                    background:
                      viewMode === "list" ? "var(--rj-emerald)" : "transparent",
                    color:
                      viewMode === "list" ? "var(--rj-gold)" : "var(--rj-ash)",
                    cursor: "pointer",
                  }}
                  aria-label="List view"
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Category pills */}
          {categories.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 font-cinzel text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-all"
                  style={{
                    background:
                      activeCategory === cat
                        ? "var(--rj-emerald)"
                        : "rgba(0,55,32,0.05)",
                    color:
                      activeCategory === cat
                        ? "var(--rj-gold)"
                        : "var(--rj-charcoal)",
                    border:
                      activeCategory === cat
                        ? "1px solid transparent"
                        : "1px solid rgba(0,55,32,0.1)",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container-rj py-6 sm:py-8">
        {/* ── PRODUCTS GRID ─────────────────────────────────────── */}
        <section>
          {/* Section header */}
          <div className="flex items-center gap-2 mb-5">
            <Package size={15} style={{ color: "var(--rj-emerald)" }} />
            <h2
              className="font-cinzel text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-bold"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {hasQuery ? "Matching Products" : "All Products"}
            </h2>
          </div>

          {/* LOADING SKELETONS */}
          {loading && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} view={viewMode} />
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="py-16 text-center">
              <p
                className="font-cinzel text-sm tracking-wide"
                style={{ color: "var(--rj-ash)" }}
              >
                {error}
              </p>
              <button
                onClick={() => runSearch(committedQuery)}
                className="mt-4 font-cinzel text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded-xl"
                style={{
                  background: "var(--rj-emerald)",
                  color: "var(--rj-gold)",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
            </div>
          )}

          {/* RESULTS */}
          {!loading && !error && filtered.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${activeCategory}-${committedQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {filtered.map((product, i) =>
                  viewMode === "grid" ? (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.04, 0.32) }}
                    >
                      <ProductGridCard product={product} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.24) }}
                    >
                      <ProductListCard product={product} />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 flex flex-col items-center gap-5 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,55,32,0.06)" }}
              >
                <Search size={28} style={{ color: "rgba(0,55,32,0.25)" }} />
              </div>
              <div>
                <h3
                  className="font-cinzel text-base sm:text-lg tracking-wide font-medium"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {hasQuery
                    ? `No products found for "${committedQuery}"`
                    : "No products found"}
                </h3>
                <p
                  className="font-cinzel text-[11px] tracking-wider mt-2"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Try a different keyword or browse our collections
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-center">
                {hasQuery && (
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 rounded-xl"
                    style={{
                      background: "rgba(0,55,32,0.08)",
                      color: "var(--rj-charcoal)",
                      cursor: "pointer",
                    }}
                  >
                    <X size={12} /> Clear search
                  </button>
                )}
                <Link
                  href="/collections"
                  className="flex items-center gap-2 font-cinzel text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 rounded-xl"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                    cursor: "pointer",
                  }}
                >
                  Browse Collections <ChevronRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}
        </section>

        {/* ── RELATED COLLECTIONS (shown when search has results) ── */}
        <AnimatePresence>
          {!loading && collections.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="my-8 sm:my-16"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 pb-5">
                  <Layers size={15} style={{ color: "var(--rj-gold)" }} />
                  <h2
                    className="font-cinzel text-[12px] sm:text-[12px] tracking-[0.2em] uppercase font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {hasQuery ? "Related Collections" : "Browse Collections"}
                  </h2>
                </div>
                <Link
                  href="/collections"
                  className="flex items-center gap-1 font-cinzel text-[12px] pb-5 tracking-wider uppercase"
                  style={{ color: "var(--rj-gold)", cursor: "pointer" }}
                >
                  View all <ChevronRight size={10} />
                </Link>
              </div>

              {/* Horizontal scroll on mobile, wrap on desktop */}
              <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible scrollbar-hide justify-around">
                {collections.map((c) => (
                  <CollectionCard key={c._id} collection={c} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
