"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  X,
  SlidersHorizontal,
  Eye,
  AlertCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useCollections } from "../../../../lib/hooks/useCollections";
import type { ApiCollection } from "../../../../lib/api/collections";

// ─────────────────────────────────────────────────────────────────
// TAG COLOURS — matches collectionSchema tag enum
// ─────────────────────────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Bestseller: { bg: "var(--rj-gold)", text: "#000" },
  New: { bg: "#4ade80", text: "#000" },
  Popular: { bg: "#60a5fa", text: "#000" },
  Limited: { bg: "#f87171", text: "#000" },
  Exclusive: { bg: "#c084fc", text: "#000" },
  Trending: { bg: "#fb923c", text: "#000" },
  Featured: { bg: "var(--rj-emerald)", text: "var(--rj-gold)" },
};

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Count: Low–High" },
  { value: "price-desc", label: "Count: High–Low" },
];

// ─────────────────────────────────────────────────────────────────
// SKELETON CARD (shown while loading)
// ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden animate-pulse"
      style={{
        background: "rgba(255,255,255,0.05)",
        height: "clamp(240px, 28vw, 340px)",
      }}
    >
      <div
        className="w-full h-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ERROR STATE
// ─────────────────────────────────────────────────────────────────
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <AlertCircle size={22} style={{ color: "#f87171" }} />
      </div>
      <p className="font-cormorant text-white/60 text-xl font-light mb-2">
        Could not load collections
      </p>
      <p
        className="font-cinzel text-[10px] tracking-widest mb-6"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {message}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all hover:opacity-80"
        style={{
          background: "rgba(252,193,81,0.12)",
          color: "var(--rj-gold)",
          border: "1px solid rgba(252,193,81,0.3)",
          cursor: "pointer",
        }}
      >
        <RefreshCw size={11} /> Try Again
      </button>
    </motion.div>
  );
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
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: "var(--gradient-gold)",
          color: "var(--rj-emerald)",
        }}
      >
        <Search size={22} style={{ color: "rgba(252,193,81,0.5)" }} />
      </div>
      <p className="font-cormorant text-white/60 text-2xl font-light mb-2">
        {query ? `No results for "${query}"` : "No collections found"}
      </p>
      <p className="font-cinzel text-white/30 text-[11px] tracking-widest uppercase mb-6">
        Try a different collection name, tag, or gender track
      </p>
      <button
        onClick={onClear}
        className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all hover:opacity-80"
        style={{
          background: "rgba(252,193,81,0.12)",
          color: "var(--rj-gold)",
          border: "1px solid rgba(252,193,81,0.3)",
          cursor: "pointer",
        }}
      >
        Clear Filters
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// COLLECTION CARD — uses ApiCollection from the backend
// ─────────────────────────────────────────────────────────────────
function CollectionCard({ col, index }: { col: ApiCollection; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tag = col.tag ? (TAG_COLORS[col.tag] ?? TAG_COLORS.Bestseller) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -8 }}
      transition={{
        duration: 0.45,
        delay: (index % 8) * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/collections/${col.slug}`}
        className="group relative overflow-hidden flex h-full rounded-xl"
        style={{ background: "#111", display: "flex", cursor: "pointer" }}
      >
        {col.heroImage ? (
          <Image
            src={col.heroImage}
            alt={col.label || col.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "var(--rj-emerald)" }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-black/5" />

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "var(--rj-emerald)",
            opacity: hovered ? 0.18 : 0,
          }}
        />

        {tag && col.tag && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span
              className="font-cinzel text-[8px] tracking-widest font-bold px-2.5 py-1 rounded-full"
              style={{ background: tag.bg, color: tag.text }}
            >
              {col.tag}
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span
            className="font-cinzel text-[8px] tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: "#fff/50",
              color: "#fdd07a",
              backdropFilter: "blur(4px)",
            }}
          >
            {col.productCount} piece{col.productCount !== 1 ? "s" : ""}
          </span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 z-10 hidden md:flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, delay: 0.04 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  color: "var(--rj-emerald)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                  cursor: "pointer",
                }}
              >
                <Eye size={12} /> View Collection
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-0 inset-x-0 p-4 z-10">
          <p
            className="label-accent mb-0.5"
            style={{
              color: "var(--rj-gold)",
              fontSize: "0.55rem",
              opacity: 0.75,
            }}
          >
            {col.tagline}
          </p>
          <h3
            className="font-cormorant text-white font-light leading-tight mb-2"
            style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
          >
            {col.label || col.name}
          </h3>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p
                className="font-cinzel text-[10px] mt-0.5"
                style={{ color: "rgba(0,0,0,0.55)" }}
              >
                {col.productCount} piece{col.productCount !== 1 ? "s" : ""}
              </p>
            </div>

            <div
              className="md:hidden flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(252,193,81,0.15)",
                color: "var(--rj-gold)",
                border: "1px solid rgba(252,193,81,0.3)",
              }}
            >
              View <ArrowRight size={9} />
            </div>

            <div className="hidden md:block overflow-hidden h-4 flex items-center">
              <span className="flex items-center gap-1 font-cinzel text-white/60 text-[10px] tracking-wider uppercase translate-y-5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                Explore <ArrowRight size={9} />
              </span>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-500"
          style={{
            border: `1px solid ${hovered ? "rgba(252,193,81,0.45)" : "transparent"}`,
          }}
        />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION — wired to API via useCollections hook
// ─────────────────────────────────────────────────────────────────
export default function CollectionsGrid() {
  const {
    results,
    loading,
    error,
    query,
    setQuery,
    category,
    setCategory,
    sortBy,
    setSortBy,
    clearAll,
    reload,
  } = useCollections();

  const [showSort, setShowSort] = useState(false);
  const [genderFilter, setGenderFilter] = useState<"All" | "Men" | "Women">(
    "All",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Client-Side Sub-Filter matching Gender strings in Title / Labels
  const filteredAndGenteredResults = useMemo(() => {
    if (genderFilter === "All") return results;

    return results.filter((col) => {
      const searchTarget = `${col.label || ""} ${col.name || ""}`.toLowerCase();

      if (genderFilter === "Men") {
        // Match "men" but exclude cases where "women" accidentally flags it
        return searchTarget.includes("men") && !searchTarget.includes("women");
      }
      if (genderFilter === "Women") {
        return searchTarget.includes("women");
      }
      return true;
    });
  }, [results, genderFilter]);

  // Derive unique tags from live data view
  const allTags = [
    "All",
    ...Array.from(new Set(results.map((c) => c.tag).filter(Boolean))),
  ];

  const handleClearFilters = () => {
    setGenderFilter("All");
    clearAll();
  };

  return (
    <section
      id="collections"
      className="section-padding"
      style={{ background: "var(--rj-gold-pale)" }}
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
            ✦ Shop by Collection
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="heading-lg text-(--rj-emerald)">
              Every piece,
              <br />
              <em className="text-gold-shimmer font-normal pe-3">pure gold</em>
            </h2>
            <div className="flex items-center gap-3 self-end pb-1">
              {loading && (
                <Loader2
                  size={14}
                  className="animate-spin"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                />
              )}
              <p className="font-cinzel text-xs tracking-widest text-(var(--rj-emerald)) uppercase">
                {loading
                  ? "Loading…"
                  : `${filteredAndGenteredResults.length} collection${filteredAndGenteredResults.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 mb-10"
        >
          {/* Row 1: Search + Gender Filters + Sort Toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300"
                style={{
                  color: query ? "var(--rj-emerald)" : "rgba(0,0,0,0.35)",
                }}
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections…"
                className="w-full pl-9 pr-9 py-2.5 font-cinzel text-xs tracking-wider outline-none transition-all duration-300"
                style={{
                  background: "rgba(254,244,220,0.65)",
                  border: `1px solid ${query ? "rgba(252,193,81,0.45)" : "rgba(0,0,0,0.1)"}`,
                  borderRadius: "8px",
                  color: "var(--rj-charcoal)",
                  boxShadow: query ? "0 0 0 3px rgba(252,193,81,0.07)" : "none",
                }}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ cursor: "pointer" }}
                  aria-label="Clear search"
                >
                  <X size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              )}
            </div>

            {/* Premium Center-Aligned Gender Selector Tab Row */}
            <div
              className="flex items-center p-1 rounded-xl border"
              style={{
                background: "var(--rj-gold-pale)",
                borderColor: "rgba(0,55,32,0.12)",
              }}
            >
              {(["All", "Men", "Women"] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setGenderFilter(gender)}
                  className="relative px-5 py-2 font-cinzel text-[10px] tracking-widest uppercase rounded-lg transition-all duration-300"
                  style={{
                    color:
                      genderFilter === gender
                        ? "var(--rj-gold-pale)"
                        : "var(--rj-charcoal)",

                    background:
                      genderFilter === gender
                        ? "var(--rj-emerald)"
                        : "transparent",

                    fontWeight: genderFilter === gender ? 700 : 500,

                    boxShadow:
                      genderFilter === gender
                        ? "0 4px 12px rgba(0,55,32,0.15)"
                        : "none",

                    cursor: "pointer",
                  }}
                >
                  {gender === "All" ? "All" : `${gender}'s Line`}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0 w-full md:w-auto text-right">
              <button
                onClick={() => setShowSort((s) => !s)}
                className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg transition-all duration-300"
                style={{
                  background: showSort ? "var(--gradient-gold)" : "#fff",
                  border: `1px solid ${showSort ? "transparent" : "rgba(0,0,0,0.08)"}`,
                  color: showSort ? "var(--rj-emerald)" : "rgba(0,0,0,0.65)",
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal size={12} />
                <span>
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ||
                    "Sort"}
                </span>
              </button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden text-left"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      minWidth: "160px",
                    }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSort(false);
                        }}
                        className="w-full text-left px-4 py-2.5 font-cinzel text-[10px] tracking-widest transition-colors duration-200 flex items-center justify-between"
                        style={{
                          color:
                            sortBy === opt.value
                              ? "var(--rj-emerald)"
                              : "rgba(0,0,0,0.65)",
                          background:
                            sortBy === opt.value
                              ? "rgba(254,244,220,0.08)"
                              : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {opt.label}
                        {sortBy === opt.value && (
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "var(--rj-emerald)" }}
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Tag/category chips */}
          {!loading && allTags.length > 1 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[rgba(0,55,32,0.08)]">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setCategory(tag)}
                  className="font-cinzel text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background:
                      category === tag
                        ? "var(--gradient-gold)"
                        : "rgba(255,255,255,0.7)",

                    color:
                      category === tag
                        ? "var(--rj-emerald)"
                        : "var(--rj-charcoal)",

                    border: `1px solid ${
                      category === tag
                        ? "var(--rj-emerald)"
                        : "rgba(0,55,32,0.12)"
                    }`,

                    fontWeight: category === tag ? 700 : 500,
                    cursor: "pointer",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Grid / Skeletons / Error / Empty ── */}
        {loading ? (
          <div
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gridAutoRows: "clamp(240px, 28vw, 340px)" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : filteredAndGenteredResults.length === 0 ? (
          <EmptyState query={query} onClear={handleClearFilters} />
        ) : (
          <motion.div
            layout
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gridAutoRows: "clamp(240px, 28vw, 340px)" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredAndGenteredResults.map((col, i) => (
                <CollectionCard key={col._id} col={col} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Active filter summary ── */}
        <AnimatePresence>
          {!loading &&
            !error &&
            (query || category !== "All" || genderFilter !== "All") &&
            filteredAndGenteredResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 mt-6"
              >
                <p className="font-cinzel text-white/30 text-[10px] tracking-widest uppercase">
                  Showing {filteredAndGenteredResults.length} result
                  {filteredAndGenteredResults.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70"
                  style={{ color: "var(--rj-gold)", cursor: "pointer" }}
                >
                  <X size={10} /> Clear filters
                </button>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
}
