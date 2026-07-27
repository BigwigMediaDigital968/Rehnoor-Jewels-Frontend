"use client";

// components/search/SearchModal.tsx
// Fixed: proper centering via CSS-only approach, fully responsive

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Package,
  Layers,
  ArrowRight,
  Loader2,
  Trash2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useSearch } from "@/app/lib/hooks/useSearch";
import type {
  SearchProductResult,
  SearchCollectionResult,
} from "@/app/lib/api/search";

// ─────────────────────────────────────────────────────────────────
// TRENDING
// ─────────────────────────────────────────────────────────────────
const TRENDING_SEARCHES = [
  { label: "Women's Necklace", href: "/search-results?search=necklace" },
  // { label: "Gold Kada", href: "/search-results?search=gold+kada" },
  { label: "Diamond Ring", href: "/search-results?search=diamond+ring" },
  {
    label: "Mangalsutra",
    href: "/collections/gold-plated-mangalsutra-for-women",
  },
  // {
  //   label: "Men's Bracelet",
  //   href: "/collections/gold-plated-bracelets-for-men",
  // },
  { label: "Pendant Set", href: "/search-results?search=pendant" },
];

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onClose,
}: {
  product: SearchProductResult;
  onClose: () => void;
}) {
  const img = product.images?.[0];
  const price =
    product.priceFormatted ?? `₹${product.price.toLocaleString("en-IN")}`;
  const originalPrice = product.originalPriceFormatted;
  const discount = product.discountPct;

  return (
    <Link
      href={`/products/${product.slug}`}
      onClick={onClose}
      className="group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200"
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0,55,32,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
        style={{ background: "rgba(0,55,32,0.06)" }}
      >
        {img ? (
          <Image
            src={img.src}
            alt={img.alt ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="56px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={20} style={{ color: "var(--rj-ash)" }} />
          </div>
        )}
        {discount && discount > 0 ? (
          <span
            className="absolute top-0.5 left-0.5 text-[8px] font-cinzel font-bold px-1 py-0.5 rounded"
            style={{ background: "var(--rj-gold)", color: "var(--rj-emerald)" }}
          >
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="font-cinzel text-[11px] tracking-wide truncate font-medium"
          style={{ color: "var(--rj-charcoal)" }}
        >
          {product.name}
        </p>
        {product.subtitle && (
          <p
            className="font-cinzel text-[9px] tracking-wider truncate mt-0.5"
            style={{ color: "var(--rj-ash)" }}
          >
            {product.subtitle}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span
            className="font-cinzel text-[11px] font-bold"
            style={{ color: "var(--rj-emerald)" }}
          >
            {price}
          </span>
          {originalPrice && (
            <span
              className="font-cinzel text-[9px] line-through"
              style={{ color: "var(--rj-ash)" }}
            >
              {originalPrice}
            </span>
          )}
        </div>
      </div>

      <ChevronRight
        size={14}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--rj-gold)" }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// COLLECTION CARD
// ─────────────────────────────────────────────────────────────────
function CollectionCard({
  collection,
  onClose,
}: {
  collection: SearchCollectionResult;
  onClose: () => void;
}) {
  const img = collection.coverImage ?? collection.image;

  return (
    <Link
      href={`/collections/${collection.slug}`}
      onClick={onClose}
      className="group flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200"
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(252,193,81,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
        style={{ background: "rgba(252,193,81,0.1)" }}
      >
        {img ? (
          <Image
            src={img}
            alt={collection.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="56px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Layers size={20} style={{ color: "var(--rj-gold)" }} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <p
            className="font-cinzel text-[11px] tracking-wide font-medium truncate"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {collection.name}
          </p>
          <span
            className="text-[8px] font-cinzel px-1.5 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: "rgba(252,193,81,0.15)",
              color: "#b8860b",
              border: "1px solid rgba(252,193,81,0.3)",
            }}
          >
            {collection.tag}
          </span>
        </div>
        <p
          className="font-cinzel text-[9px] tracking-wider truncate mt-0.5"
          style={{ color: "var(--rj-ash)" }}
        >
          {collection.tagline}
        </p>
        <p
          className="font-cinzel text-[9px] mt-0.5"
          style={{ color: "var(--rj-emerald)" }}
        >
          {collection.productCount} pieces
        </p>
      </div>

      <ChevronRight
        size={14}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--rj-gold)" }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN MODAL
// ─────────────────────────────────────────────────────────────────
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    setQuery,
    status,
    results,
    error,
    history,
    commitSearch,
    clearSearchHistory,
    reset,
    isEmpty,
    isLoading,
    hasResults,
    debouncedQuery,
  } = useSearch({ productLimit: 6, collectionLimit: 4 });

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(reset, 300);
  }, [onClose, reset]);

  const handleHistoryClick = (q: string) => {
    setQuery(q);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    commitSearch(query);
    window.location.href = `/search-results?search=${encodeURIComponent(query)}`;
  };

  const showDefault = !query || query.length < 2;
  const showResults = hasResults;
  const showEmpty = isEmpty;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur matching your site interaction overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Floating Card - Exactly positioned below your navbar trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[85px] z-[150] mx-auto w-full max-w-[760px] px-4"
          >
            {/* The Luxury Rounded Container */}
            <div className="bg-[#FAF9F6] text-[#002818] rounded-2xl sm:rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/60 overflow-hidden flex flex-col">
              
              {/* ── Search Input Field ───────────────────────────────────── */}
              <div className="p-6 pb-4 border-b border-neutral-200/60">
                <form onSubmit={handleSubmit} className="relative flex items-center w-full">
                  <Search size={18} className="text-[#002818]/60 absolute left-2" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="WHAT ARE YOU LOOKING FOR?"
                    className="w-full pl-9 pr-16 py-2 bg-transparent rounded-full outline-none font-cinzel text-xs tracking-[0.15em] text-[#002818] placeholder-[#002818]/40 uppercase"
                  />
                  
                  <div className="absolute right-2 flex items-center gap-2">
                    {isLoading && <Loader2 size={14} className="animate-spin text-[#002818]/60" />}
                    {query && (
                      <button type="button" onClick={() => setQuery("")} className="text-neutral-400 hover:text-neutral-600">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* ── Body ──────────────────────────────────── */}
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "clamp(300px, 65vh, 560px)" }}
              >
                <AnimatePresence mode="wait">
                  {/* DEFAULT */}
                  {showDefault && (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-4 sm:p-5 space-y-5"
                    >
                      {/* Recent */}
                      {history.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Clock
                                size={12}
                                style={{ color: "var(--rj-ash)" }}
                              />
                              <span
                                className="font-cinzel text-[9px] tracking-[0.2em] uppercase"
                                style={{ color: "var(--rj-ash)" }}
                              >
                                Recent
                              </span>
                            </div>
                            <button
                              onClick={clearSearchHistory}
                              className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase"
                              style={{
                                color: "var(--rj-ash)",
                                cursor: "pointer",
                              }}
                            >
                              <Trash2 size={9} />
                              Clear
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {history.map((q) => (
                              <button
                                key={q}
                                onClick={() => handleHistoryClick(q)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-cinzel text-[10px] tracking-wide transition-all"
                                style={{
                                  background: "rgba(0,55,32,0.05)",
                                  border: "1px solid rgba(0,55,32,0.1)",
                                  color: "var(--rj-charcoal)",
                                  cursor: "pointer",
                                }}
                              >
                                <Clock
                                  size={9}
                                  style={{ color: "var(--rj-ash)" }}
                                />
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trending */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp
                            size={12}
                            style={{ color: "var(--rj-gold)" }}
                          />
                          <span
                            className="font-cinzel text-[9px] tracking-[0.2em] uppercase"
                            style={{ color: "var(--rj-ash)" }}
                          >
                            Trending Searches
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {TRENDING_SEARCHES.map((t) => (
                            <Link
                              key={t.label}
                              href={t.href}
                              onClick={handleClose}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-cinzel text-[10px] tracking-wide transition-all"
                              style={{
                                background: "rgba(252,193,81,0.08)",
                                border: "1px solid rgba(252,193,81,0.2)",
                                color: "var(--rj-charcoal)",
                                cursor: "pointer",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(252,193,81,0.18)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(252,193,81,0.08)";
                              }}
                            >
                              <TrendingUp
                                size={9}
                                style={{ color: "var(--rj-gold)" }}
                              />
                              {t.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* LOADING */}
                  {isLoading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-10 flex flex-col items-center gap-3"
                    >
                      <div className="relative w-9 h-9">
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-25"
                          style={{ background: "var(--rj-gold)" }}
                        />
                        <div
                          className="absolute inset-0 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(252,193,81,0.12)" }}
                        >
                          <Search
                            size={16}
                            style={{ color: "var(--rj-gold)" }}
                          />
                        </div>
                      </div>
                      <span
                        className="font-cinzel text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        Searching…
                      </span>
                    </motion.div>
                  )}

                  {/* RESULTS */}
                  {showResults && !isLoading && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="p-3 sm:p-4 space-y-4"
                    >
                      {/* Products section */}
                        <section>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Package
                                size={12}
                                style={{ color: "var(--rj-emerald)" }}
                              />
                              <span
                                className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold"
                                style={{ color: "var(--rj-emerald)" }}
                              >
                                Products
                              </span>
                              <span
                                className="font-cinzel text-[9px] px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(0,55,32,0.08)",
                                  color: "var(--rj-emerald)",
                                }}
                              >
                                {results!.products.length}
                              </span>
                            </div>
                            <Link
                              href={`/search-results?search=${encodeURIComponent(debouncedQuery)}`}
                              onClick={handleClose}
                              className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase"
                              style={{
                                color: "var(--rj-gold)",
                                cursor: "pointer",
                              }}
                            >
                              View all <ArrowRight size={10} />
                            </Link>
                          </div>
                          
                        {results!.products.length === 0 ? (
                          <p
                            className="font-cinzel text-[10px] tracking-wider py-3 text-center"
                            style={{ color: "var(--rj-ash)" }}
                          >
                            No products found for "{debouncedQuery}"
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                            {results!.products.map((p) => (
                              <ProductCard
                                key={p._id}
                                product={p}
                                onClose={handleClose}
                              />
                            ))}
                          </div>
                        )}
                      </section>

                      {results!.products.length > 0 &&
                        results!.collections.length > 0 && (
                          <div
                            className="h-px"
                            style={{ background: "rgba(0,55,32,0.07)" }}
                          />
                        )}

                      {/* Collections section */}
                      {results!.products.length === 0 && results!.collections.length > 0 && (
                        <section>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Layers
                                size={12}
                                style={{ color: "var(--rj-gold)" }}
                              />
                              <span
                                className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold"
                                style={{ color: "#b8860b" }}
                              >
                                Collections
                              </span>
                              <span
                                className="font-cinzel text-[9px] px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(252,193,81,0.12)",
                                  color: "#b8860b",
                                }}
                              >
                                {results!.collections.length}
                              </span>
                            </div>
                            <Link
                              href="/collections"
                              onClick={handleClose}
                              className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase"
                              style={{
                                color: "var(--rj-gold)",
                                cursor: "pointer",
                              }}
                            >
                              Browse <ArrowRight size={10} />
                            </Link>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
                            {results!.collections.map((c) => (
                              <CollectionCard
                                key={c._id}
                                collection={c}
                                onClose={handleClose}
                              />
                            ))}
                          </div>
                        </section>
                      )}
                    </motion.div>
                  )}

                  {/* EMPTY */}
                  {showEmpty && !isLoading && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="py-10 flex flex-col items-center gap-3 text-center px-4"
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,55,32,0.06)" }}
                      >
                        <Search size={18} style={{ color: "var(--rj-ash)" }} />
                      </div>
                      <div>
                        <p
                          className="font-cinzel text-sm tracking-wide font-medium"
                          style={{ color: "var(--rj-charcoal)" }}
                        >
                          No results for "{debouncedQuery}"
                        </p>
                        <p
                          className="font-cinzel text-[10px] tracking-wider mt-1"
                          style={{ color: "var(--rj-ash)" }}
                        >
                          Try a different keyword or browse our collections
                        </p>
                      </div>
                      <Link
                        href="/collections"
                        onClick={handleClose}
                        className="mt-1 flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-[10px] tracking-[0.15em] uppercase"
                        style={{
                          background: "var(--rj-emerald)",
                          color: "var(--rj-gold)",
                          cursor: "pointer",
                        }}
                      >
                        Browse Collections <ArrowRight size={11} />
                      </Link>
                    </motion.div>
                  )}

                  {/* ERROR */}
                  {status === "error" && !isLoading && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-8 text-center px-4"
                    >
                      <p
                        className="font-cinzel text-sm"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {error ?? "Something went wrong. Please try again."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Footer ────────────────────────────────── */}
              {(showResults || showEmpty) && !isLoading && (
                <div
                  className="px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2"
                  style={{
                    borderTop: "1px solid rgba(0,55,32,0.06)",
                    background: "rgba(0,55,32,0.02)",
                  }}
                >
                  <span
                    className="font-cinzel text-[9px] tracking-[0.15em] uppercase truncate"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {results?.total ?? 0} result
                    {(results?.total ?? 0) !== 1 ? "s" : ""} for "
                    {debouncedQuery}"
                  </span>
                  <Link
                    href={`/search-results?search=${encodeURIComponent(debouncedQuery)}`}
                    onClick={() => {
                      commitSearch(debouncedQuery);
                      handleClose();
                    }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-cinzel text-[9px] tracking-[0.15em] uppercase"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                      cursor: "pointer",
                    }}
                  >
                    See all <ArrowRight size={9} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}