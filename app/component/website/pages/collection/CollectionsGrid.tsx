"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, SlidersHorizontal } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DATA — in future, replace this with a fetch() / server component
// ─────────────────────────────────────────────────────────────────
const collections = [
  {
    id: "nawabi-chain",
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
    id: "royal-kada",
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
    id: "signet-ring",
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
    id: "link-bracelet",
    label: "Link Bracelet",
    tagline: "Layered perfection",
    image: "https://images.unsplash.com/photo-1729290252735-ef9824782fcd",
    price: "₹7,199",
    count: 15,
    tag: "Limited",
    category: "Bracelets",
  },
  {
    id: "sol-pendant",
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
    id: "moghul-bangle",
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
    id: "cuban-chain",
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
    id: "cord-bracelet",
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

function CollectionCard({ col, index }: { col: Collection; index: number }) {
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
    >
      <Link
        href={`/collections/${col.id}`}
        className="group relative overflow-hidden flex h-full rounded-xl block"
        style={{ background: "#111" }}
      >
        {/* Image */}
        <Image
          src={col.image}
          alt={col.label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Persistent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-black/5" />

        {/* Hover emerald wash */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: "var(--rj-emerald)" }}
        />

        {/* Tag */}
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

        {/* Content */}
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
                Starting from {col.price}
              </p>
              <p className="text-white/35 text-[10px] mt-0.5">
                {col.count} pieces
              </p>
            </div>
            {/* Shop CTA — slides up on hover */}
            <div className="overflow-hidden h-4 flex items-center">
              <span className="flex items-center gap-1 font-cinzel text-white/60 text-[10px] tracking-wider uppercase translate-y-5 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                Shop <ArrowRight size={9} />
              </span>
            </div>
          </div>
        </div>

        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-hover:border-[var(--rj-gold)]/35 transition-colors duration-500" />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────
function EmptyState({ query }: { query: string }) {
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
      <p className="font-cinzel text-white/30 text-[11px] tracking-widest uppercase">
        Try a different collection name or category
      </p>
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

  // ── Derived filtered + sorted list ──
  const results = useMemo(() => {
    let list = [...collections];

    // Search by name or tagline
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (activeTag !== "All") {
      list = list.filter((c) => c.category === activeTag);
    }

    // Sort
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

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
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
            {/* Live result count */}
            <p className="font-cinzel text-gold-shimmer text-md font-medium tracking-widest self-end pb-1">
              {results.length} collection{results.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* ── Controls row: Search + Category chips + Sort ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 mb-10"
        >
          {/* Row 1: Search + Sort */}
          <div className="flex gap-3 items-center">
            {/* Search box */}
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
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  aria-label="Clear search"
                >
                  <X size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((s) => !s)}
                className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: showSort
                    ? "rgba(252,193,81,0.12)"
                    : "rgba(255,255,255,0.05)",
                  border: `1px solid ${showSort ? "rgba(252,193,81,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: showSort ? "var(--rj-gold)" : "rgba(255,255,255,0.5)",
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
                    transition={{ duration: 0.2 }}
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

          {/* Row 2: Category filter chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className="font-cinzel text-[9px] tracking-widest uppercase px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
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
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Grid or empty state ── */}
        {results.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <motion.div
            layout
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gridAutoRows: "clamp(240px, 28vw, 340px)" }}
          >
            <AnimatePresence mode="popLayout">
              {results.map((col, i) => (
                <CollectionCard key={col.id} col={col} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Active filter summary ── */}
        {(query || activeTag !== "All") && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mt-6"
          >
            <p className="font-cinzel text-white/30 text-[10px] tracking-widest uppercase">
              Showing {results.length} of {collections.length}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveTag("All");
                setSortBy("default");
              }}
              className="flex items-center gap-1 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: "var(--rj-gold)" }}
            >
              <X size={10} /> Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
