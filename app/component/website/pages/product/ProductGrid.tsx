"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowDown,
} from "lucide-react";
import ProductCard from "./ProductCard";
import {
  products,
  PRODUCT_CATEGORIES,
  PRODUCT_TAGS,
} from "../../../../productData";

// ─────────────────────────────────────────────────────────────────
// PAGINATION CONFIG
// ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 8; // shown on first load
const LOAD_MORE_SIZE = 4; // added per "Load More" click

// ─────────────────────────────────────────────────────────────────
// SORT OPTIONS
// ─────────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "New Arrivals" },
];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function parsePrice(p: string) {
  return parseInt(p.replace(/[^\d]/g, ""), 10);
}

// ─────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────
function EmptyState({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full py-24 flex flex-col items-center text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "rgba(0,55,32,0.06)",
          border: "1px solid rgba(0,55,32,0.1)",
        }}
      >
        <Search
          size={22}
          style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
        />
      </div>
      <p
        className="font-cormorant text-2xl font-light mb-2"
        style={{ color: "var(--rj-charcoal)" }}
      >
        No products found{query ? ` for "${query}"` : ""}
      </p>
      <p
        className="font-cinzel text-xs tracking-widest uppercase mb-6"
        style={{ color: "var(--rj-ash)" }}
      >
        Try adjusting your search or filters
      </p>
      <button
        onClick={onClear}
        className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all duration-300"
        style={{ background: "var(--rj-emerald)", color: "var(--rj-gold)" }}
      >
        Clear All Filters
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PRODUCT GRID
// ─────────────────────────────────────────────────────────────────
export default function ProductGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // ── Full filtered + sorted result list ──────────────────────────
  const results = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          (p.category ?? "").toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q),
      );
    }

    if (category !== "All") list = list.filter((p) => p.category === category);
    if (activeTag !== "All") list = list.filter((p) => p.tag === activeTag);

    if (sortBy === "price-asc")
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-desc")
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "rating")
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    if (sortBy === "newest")
      list.sort(
        (a, b) => (b.tag === "New" ? 1 : 0) - (a.tag === "New" ? 1 : 0),
      );

    return list;
  }, [query, category, activeTag, sortBy]);

  // ── Whenever filters/sort/search change — reset visible count ──
  // We track a "key" derived from all filter values; when it changes
  // we reset to PAGE_SIZE so the user always starts from top.
  const filterKey = `${query}|${category}|${activeTag}|${sortBy}`;
  const prevKey = useRef(filterKey);
  if (prevKey.current !== filterKey) {
    prevKey.current = filterKey;
    if (visibleCount !== PAGE_SIZE) setVisibleCount(PAGE_SIZE);
  }

  // ── Derived pagination values ───────────────────────────────────
  const visibleProducts = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;
  const remaining = Math.min(LOAD_MORE_SIZE, results.length - visibleCount);

  // ── Handlers ───────────────────────────────────────────────────
  const handleLoadMore = () => {
    setVisibleCount((c) => c + LOAD_MORE_SIZE);
    // Gently nudge the viewport toward the newly revealed cards
    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 120);
  };

  const clearAll = () => {
    setQuery("");
    setCategory("All");
    setActiveTag("All");
    setSortBy("featured");
    // visibleCount resets via the filterKey comparison above
  };

  const hasActiveFilters = !!(
    query ||
    category !== "All" ||
    activeTag !== "All" ||
    sortBy !== "featured"
  );

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p
            className="label-accent mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Our Products
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2
              className="heading-lg leading-tight"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Handcrafted
              <br />
              <em className="text-gold-shimmer font-normal pe-2">
                for the bold
              </em>
            </h2>

            <p className="font-cinzel text-md font-medium tracking-widest pb-1">
              {visibleProducts.length} of {results.length} product
              {results.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Row 1: Search + Sort + Mobile filter toggle */}
          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300"
                style={{ color: query ? "var(--rj-emerald)" : "var(--rj-ash)" }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-9 pr-9 py-2.5 font-cinzel text-xs tracking-wider outline-none transition-all duration-300"
                style={{
                  background: "#fff",
                  border: `1px solid ${query ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                  borderRadius: "8px",
                  color: "var(--rj-charcoal)",
                  boxShadow: query ? "0 0 0 3px rgba(0,55,32,0.07)" : "none",
                }}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  aria-label="Clear search"
                >
                  <X size={13} style={{ color: "var(--rj-ash)" }} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((s) => !s)}
                className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: showSort ? "var(--rj-emerald)" : "#fff",
                  border: `1px solid ${showSort ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                  color: showSort ? "var(--rj-gold)" : "var(--rj-ash)",
                }}
              >
                <SlidersHorizontal size={12} />
                <span className="hidden sm:inline">
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ||
                    "Sort"}
                </span>
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${showSort ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                    style={{
                      background: "#fff",
                      border: "1px solid var(--rj-bone)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                      minWidth: "170px",
                    }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSort(false);
                        }}
                        className="w-full text-left px-4 py-2.5 font-cinzel text-[10px] tracking-widest transition-colors duration-150 flex items-center justify-between cursor-pointer"
                        style={{
                          color:
                            sortBy === opt.value
                              ? "var(--rj-emerald)"
                              : "var(--rj-ash)",
                          background:
                            sortBy === opt.value
                              ? "rgba(0,55,32,0.05)"
                              : "transparent",
                          fontWeight: sortBy === opt.value ? 700 : 400,
                        }}
                      >
                        {opt.label}
                        {sortBy === opt.value && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "var(--rj-emerald)",
                              flexShrink: 0,
                              display: "inline-block",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters((f) => !f)}
              className="sm:hidden flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-3 py-2.5 rounded-lg transition-all duration-300 cursor-pointer"
              style={{
                background: showFilters ? "var(--rj-emerald)" : "#fff",
                border: `1px solid ${showFilters ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                color: showFilters ? "var(--rj-gold)" : "var(--rj-ash)",
              }}
            >
              Filter
              {hasActiveFilters && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center font-cinzel text-[8px]"
                  style={{
                    background: "var(--rj-gold)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  {[category !== "All", activeTag !== "All"].filter(Boolean)
                    .length || "!"}
                </span>
              )}
            </button>
          </div>

          {/* Row 2: Category + Tag chips */}
          <div
            className={`flex-col gap-3 ${showFilters ? "flex" : "hidden sm:flex"}`}
          >
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              <span
                className="font-cinzel text-[9px] tracking-widest uppercase self-center mr-1"
                style={{ color: "var(--rj-ash)" }}
              >
                Category:
              </span>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: category === cat ? "var(--rj-emerald)" : "#fff",
                    color:
                      category === cat ? "var(--rj-gold)" : "var(--rj-ash)",
                    border: `1px solid ${category === cat ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    fontWeight: category === cat ? 700 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-2">
              <span
                className="font-cinzel text-[9px] tracking-widest uppercase self-center mr-1"
                style={{ color: "var(--rj-ash)" }}
              >
                Filter:
              </span>
              {PRODUCT_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      activeTag === tag ? "var(--gradient-gold)" : "#fff",
                    color:
                      activeTag === tag ? "var(--rj-emerald)" : "var(--rj-ash)",
                    border: `1px solid ${activeTag === tag ? "transparent" : "var(--rj-bone)"}`,
                    fontWeight: activeTag === tag ? 700 : 400,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Active filter summary bar ── */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between mb-6 px-4 py-2.5 rounded-lg overflow-hidden"
              style={{
                background: "rgba(0,55,32,0.05)",
                border: "1px solid rgba(0,55,32,0.1)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2">
                {query && (
                  <span
                    className="font-cinzel text-[10px] tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    "{query}"
                    <button onClick={() => setQuery("")}>
                      <X size={9} />
                    </button>
                  </span>
                )}
                {category !== "All" && (
                  <span
                    className="font-cinzel text-[10px] tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 cursor-pointer"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    {category}
                    <button onClick={() => setCategory("All")}>
                      <X size={9} />
                    </button>
                  </span>
                )}
                {activeTag !== "All" && (
                  <span
                    className="font-cinzel text-[10px] tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 cursor-pointer"
                    style={{
                      background: "var(--gradient-gold)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    {activeTag}
                    <button onClick={() => setActiveTag("All")}>
                      <X size={9} />
                    </button>
                  </span>
                )}
              </div>
              <button
                onClick={clearAll}
                className="font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70 flex-shrink-0 ml-4 cursor-pointer"
                style={{ color: "var(--rj-emerald)" }}
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Product Grid ── */}
        {results.length === 0 ? (
          <EmptyState query={query} onClear={clearAll} />
        ) : (
          <motion.div
            layout
            className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: Math.min(i, 3) * 0.06 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More / End of results */}
        <AnimatePresence mode="wait">
          {results.length > 0 && (
            <motion.div
              ref={loadMoreRef}
              key={hasMore ? "load-more" : "end"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mt-14"
            >
              {hasMore ? (
                // ── Load More button ──
                <>
                  {/* Progress bar */}
                  <div className="max-w-xs mx-auto mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-cinzel text-[10px] tracking-widest"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {visibleProducts.length} shown
                      </span>
                      <span
                        className="font-cinzel text-[10px] tracking-widest"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {results.length} total
                      </span>
                    </div>
                    <div
                      className="h-0.5 w-full rounded-full overflow-hidden"
                      style={{ background: "var(--rj-bone)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-gold)" }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(visibleProducts.length / results.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleLoadMore}
                    className="group inline-flex items-center gap-2.5 font-cinzel text-[11px] tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300"
                    style={{
                      background: "transparent",
                      border: "1.5px solid var(--rj-emerald)",
                      color: "var(--rj-emerald)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--rj-emerald)";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--rj-gold)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--rj-emerald)";
                    }}
                  >
                    <ArrowDown
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-y-0.5"
                    />
                    Load {remaining} More Product{remaining !== 1 ? "s" : ""}
                  </button>
                </>
              ) : (
                // ── End of results message ──
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-12 h-px"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    All {results.length} product
                    {results.length !== 1 ? "s" : ""} shown
                  </p>
                  <div
                    className="w-12 h-px"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
