"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, SlidersHorizontal, Eye } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DATA
// IMPORTANT: collection `id` values MUST match the slug keys in
// app/collections/[slug]/page.tsx → COLLECTION_MAP
// ─────────────────────────────────────────────────────────────────
const collections = [
  {
    id: "chains", // ← matches COLLECTION_MAP key
    label: "Nawabi Chain",
    tagline: "Bold, layered, iconic",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80",
    price: "₹8,999",
    count: 24,
    tag: "Bestseller",
    category: "Chains",
  },
  {
    id: "kadas",
    label: "Royal Kada",
    tagline: "Power on your wrist",
    image:
      "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=600&q=80",
    price: "₹12,499",
    count: 18,
    tag: "New",
    category: "Kadas",
  },
  {
    id: "rings",
    label: "Signet Ring",
    tagline: "Wear your statement",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=80",
    price: "₹5,299",
    count: 32,
    tag: "Popular",
    category: "Rings",
  },
  {
    id: "bracelets",
    label: "Link Bracelet",
    tagline: "Layered perfection",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=700&q=80",
    price: "₹7,199",
    count: 15,
    tag: "Limited",
    category: "Bracelets",
  },
  {
    id: "pendants",
    label: "Sol Pendant",
    tagline: "Close to the heart",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=80",
    price: "₹4,499",
    count: 28,
    tag: "New",
    category: "Pendants",
  },
  {
    id: "kadas", // Moghul Bangle also lives in /collections/kadas
    label: "Moghul Bangle",
    tagline: "Heritage, reimagined",
    image:
      "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=700&q=80",
    price: "₹15,999",
    count: 10,
    tag: "Exclusive",
    category: "Kadas",
  },
  {
    id: "chains",
    label: "Cuban Chain",
    tagline: "Street meets heritage",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
    price: "₹11,299",
    count: 20,
    tag: "Trending",
    category: "Chains",
  },
  {
    id: "bracelets",
    label: "Cord Bracelet",
    tagline: "Minimal. Pure. Gold.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=700&q=80",
    price: "₹3,899",
    count: 40,
    tag: "Bestseller",
    category: "Bracelets",
  },
];

export type Collection = (typeof collections)[number];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Bestseller: { bg: "var(--rj-gold)", text: "#000" },
  New: { bg: "#4ade80", text: "#000" },
  Popular: { bg: "#60a5fa", text: "#000" },
  Limited: { bg: "#f87171", text: "#000" },
  Exclusive: { bg: "#c084fc", text: "#000" },
  Trending: { bg: "#fb923c", text: "#000" },
};

const CATEGORIES = [
  "All",
  ...Array.from(new Set(collections.map((c) => c.category))),
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low–High" },
  { value: "price-desc", label: "Price: High–Low" },
  { value: "newest", label: "Newest First" },
];

function parsePrice(p: string) {
  return parseInt(p.replace(/[^0-9]/g, ""), 10);
}

// ─────────────────────────────────────────────────────────────────
// COLLECTION CARD
// ─────────────────────────────────────────────────────────────────
function CollectionCard({ col, index }: { col: Collection; index: number }) {
  const [hovered, setHovered] = useState(false);
  const tag = TAG_COLORS[col.tag] || TAG_COLORS.Bestseller;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -8 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/collections/${col.id}`}
        className="group relative overflow-hidden flex h-full rounded-xl"
        style={{ background: "#111", display: "flex", cursor: "pointer" }}
      >
        {/* Image */}
        <Image
          src={col.image}
          alt={col.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          }}
        />

        {/* Base gradient — always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-black/5" />

        {/* Emerald wash on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "var(--rj-emerald)",
            opacity: hovered ? 0.22 : 0,
          }}
        />

        {/* Tag badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="font-cinzel text-[8px] tracking-widest font-bold px-2.5 py-1 rounded-full"
            style={{ background: tag.bg, color: tag.text }}
          >
            {col.tag}
          </span>
        </div>

        {/* Category pill — top right */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-cinzel text-[8px] tracking-widest px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)",
            }}
          >
            {col.category}
          </span>
        </div>

        {/* ── Desktop hover: View Collection CTA ── */}
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
                <Eye size={12} />
                View Collection
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom content */}
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
            {col.label}
          </h3>

          <div className="flex items-end justify-between gap-2">
            <div>
              <p
                className="font-cinzel font-bold"
                style={{ color: "var(--rj-gold)", fontSize: "0.85rem" }}
              >
                From {col.price}
              </p>
              <p className="text-white/35 text-[10px] mt-0.5">
                {col.count} pieces
              </p>
            </div>

            {/* Mobile: always-visible CTA */}
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

            {/* Desktop: slide-up CTA in bottom-right */}
            <div className="hidden md:block overflow-hidden h-4 flex items-center">
              <span className="flex items-center gap-1 font-cinzel text-white/60 text-[10px] tracking-wider uppercase translate-y-5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                Explore <ArrowRight size={9} />
              </span>
            </div>
          </div>
        </div>

        {/* Gold border on hover */}
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
          background: "rgba(252,193,81,0.08)",
          border: "1px solid rgba(252,193,81,0.15)",
        }}
      >
        <Search size={22} style={{ color: "rgba(252,193,81,0.5)" }} />
      </div>
      <p className="font-cormorant text-white/60 text-2xl font-light mb-2">
        No results for "{query}"
      </p>
      <p className="font-cinzel text-white/30 text-[11px] tracking-widest uppercase mb-6">
        Try a different collection name or category
      </p>
      <button
        onClick={onClear}
        className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all"
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
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function CollectionsGrid() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showSort, setShowSort] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    let list = [...collections];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      );
    }

    if (activeTag !== "All")
      list = list.filter((c) => c.category === activeTag);

    if (sortBy === "price-asc")
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortBy === "price-desc")
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortBy === "newest")
      list.sort(
        (a, b) => (b.tag === "New" ? 1 : 0) - (a.tag === "New" ? 1 : 0),
      );

    return list;
  }, [query, activeTag, sortBy]);

  const clearAll = () => {
    setQuery("");
    setActiveTag("All");
    setSortBy("default");
  };

  return (
    <section
      id="collections"
      className="section-padding"
      style={{ background: "var(--rj-charcoal)" }}
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
          <p className="label-accent mb-3" style={{ color: "var(--rj-gold)" }}>
            ✦ Shop by Collection
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="heading-lg text-white leading-tight">
              Every piece,
              <br />
              <em className="text-gold-shimmer font-normal pe-3">pure gold</em>
            </h2>
            <p
              className="font-cinzel text-xs tracking-widest self-end pb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {results.length} collection{results.length !== 1 ? "s" : ""}
            </p>
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
          {/* Row 1: Search + Sort */}
          <div className="flex gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300"
                style={{
                  color: query ? "var(--rj-gold)" : "rgba(255,255,255,0.3)",
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
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${query ? "rgba(252,193,81,0.45)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "8px",
                  color: "white",
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

            {/* Sort */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((s) => !s)}
                className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg transition-all duration-300"
                style={{
                  background: showSort
                    ? "rgba(252,193,81,0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${showSort ? "rgba(252,193,81,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: showSort ? "var(--rj-gold)" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal size={12} />
                <span className="hidden sm:inline">
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
                    className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                    style={{
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
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
                        className="w-full text-left px-4 py-2.5 font-cinzel text-[10px] tracking-widest transition-colors duration-200"
                        style={{
                          color:
                            sortBy === opt.value
                              ? "var(--rj-gold)"
                              : "rgba(255,255,255,0.5)",
                          background:
                            sortBy === opt.value
                              ? "rgba(252,193,81,0.08)"
                              : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Row 2: Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className="font-cinzel text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-full transition-all duration-250"
                style={{
                  background:
                    activeTag === cat
                      ? "var(--gradient-gold)"
                      : "rgba(255,255,255,0.05)",
                  color:
                    activeTag === cat
                      ? "var(--rj-emerald)"
                      : "rgba(255,255,255,0.45)",
                  border: `1px solid ${activeTag === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
                  fontWeight: activeTag === cat ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Grid ── */}
        {results.length === 0 ? (
          <EmptyState query={query} onClear={clearAll} />
        ) : (
          <motion.div
            layout
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gridAutoRows: "clamp(240px, 28vw, 340px)" }}
          >
            <AnimatePresence mode="popLayout">
              {results.map((col, i) => (
                <CollectionCard
                  key={`${col.id}-${col.label}`}
                  col={col}
                  index={i}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Active filter summary ── */}
        <AnimatePresence>
          {(query || activeTag !== "All") && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 mt-6"
            >
              <p className="font-cinzel text-white/30 text-[10px] tracking-widest uppercase">
                Showing {results.length} of {collections.length}
              </p>
              <button
                onClick={clearAll}
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
