"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Search,
  Heart,
  Star,
  Check,
  Eye,
  Info,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import type { Product } from "../../../types/Product.types";
import { useCartStore, useWishlistStore } from "@/app/store/cartStore";
import Link from "next/link";

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  Bestseller: { bg: "var(--rj-gold)", color: "#000" },
  New: { bg: "#4ade80", color: "#000" },
  Popular: { bg: "#60a5fa", color: "#000" },
  Limited: { bg: "#f87171", color: "#fff" },
  Exclusive: { bg: "#c084fc", color: "#000" },
  Trending: { bg: "#fb923c", color: "#000" },
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "New Arrivals" },
];

function parsePrice(s: string | number): number {
  if (typeof s === "number") return s;
  return parseInt(s.replace(/[^\d]/g, ""), 10);
}

// ─────────────────────────────────────────────────────────────────
// SIZE PICKER MODAL
// Shown when user clicks "Add to Cart" — lets them pick a size
// before the item lands in the Zustand store.
// ─────────────────────────────────────────────────────────────────
function SizePickerModal({
  product,
  onConfirm,
  onClose,
}: {
  product: Product;
  onConfirm: (size: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(
    product.sizes?.length === 1 ? product.sizes[0].label : null,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-auto sm:min-w-[320px] rounded-t-2xl sm:rounded-2xl p-6"
        style={{
          background: "#fff",
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <p
            className="font-cormorant text-lg font-light"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {product.name}
          </p>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "var(--rj-bone)", cursor: "pointer" }}
          >
            <X size={12} style={{ color: "var(--rj-charcoal)" }} />
          </button>
        </div>
        <p
          className="font-cinzel text-[9px] tracking-widest mb-4"
          style={{ color: "var(--rj-ash)" }}
        >
          {product.subtitle}
        </p>

        {/* Size grid */}
        <p
          className="font-cinzel text-[9px] tracking-widest uppercase font-bold mb-2"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Select Size
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {product.sizes?.map((s) => (
            <button
              key={s.label}
              disabled={!s.available}
              onClick={() => setSelected(s.label)}
              className="min-w-[2.5rem] h-10 px-3 rounded-full font-cinzel text-[10px] transition-all duration-200"
              style={{
                border: `1.5px solid ${selected === s.label ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                background:
                  selected === s.label ? "var(--rj-emerald)" : "transparent",
                color:
                  selected === s.label
                    ? "#fff"
                    : s.available
                      ? "var(--rj-charcoal)"
                      : "var(--rj-bone)",
                opacity: s.available ? 1 : 0.4,
                cursor: s.available ? "pointer" : "not-allowed",
                transform: selected === s.label ? "scale(1.05)" : "scale(1)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Confirm */}
        <button
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
          className="w-full py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-200"
          style={{
            background: selected ? "var(--rj-emerald)" : "var(--rj-bone)",
            color: selected ? "var(--rj-gold)" : "var(--rj-ash)",
            cursor: selected ? "pointer" : "not-allowed",
            boxShadow: selected ? "0 4px 16px rgba(0,55,32,0.2)" : "none",
          }}
        >
          {selected ? `Add to Bag — ${selected}` : "Pick a Size"}
        </button>
      </motion.div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden animate-pulse"
      style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
    >
      <div
        className="w-full"
        style={{ aspectRatio: "1/1", background: "var(--rj-ivory-dark)" }}
      />
      <div className="p-3 space-y-2">
        <div
          className="h-2 w-1/2 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
        <div
          className="h-3 w-3/4 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
        <div
          className="h-2 w-1/3 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD (inline — links to product detail page)
// ─────────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  // ── Zustand ──────────────────────────────────────────────────
  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));

  const tag = product.tag ? TAG_STYLES[product.tag] : null;
  const router = useRouter();

  const discountPct = product.originalPrice
    ? Math.round(
        (1 - parsePrice(product.price) / parsePrice(product.originalPrice)) *
          100,
      )
    : 0;

  // ── Wishlist toggle ──────────────────────────────────────────
  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        image: product.images[0].src,
        price: product.price,
        priceNum: parsePrice(product.price),
        originalPrice: product.originalPrice,
        href: product.href,
        category: product.category,
        tag: product.tag,
      });
    },
    [product, toggleItem],
  );

  // ── Cart: open size picker, or add directly if only 1 size ──
  const handleCartClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!product.sizes || product.sizes.length === 0) {
        // No sizes — add directly
        addItem({
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          image: product.images[0].src,
          price: product.price,
          priceNum: parsePrice(product.price),
          originalPrice: product.originalPrice,
          size: "Free",
          qty: 1,
          href: product.href,
          category: product.category,
          tag: product.tag,
        });
        flashAdded();
      } else {
        setShowSizePicker(true);
      }
    },
    [product, addItem],
  );

  // ── Confirm after size is chosen ────────────────────────────
  const handleConfirmSize = useCallback(
    (size: string) => {
      addItem({
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        image: product.images[0].src,
        price: product.price,
        priceNum: parsePrice(product.price),
        originalPrice: product.originalPrice,
        size,
        qty: 1,
        href: product.href,
        category: product.category,
        tag: product.tag,
      });
      setShowSizePicker(false);
      flashAdded();
    },
    [product, addItem],
  );

  const flashAdded = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {/* Size picker modal (portal-like, outside card DOM) */}
      <AnimatePresence>
        {showSizePicker && (
          <SizePickerModal
            product={product}
            onConfirm={handleConfirmSize}
            onClose={() => setShowSizePicker(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push(product.href)}
        className="flex flex-col"
        style={{
          background: "#fff",
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "var(--rj-bone)"}`,
          boxShadow: hovered
            ? "0 12px 36px rgba(0,0,0,0.1), 0 0 0 1px rgba(252,193,81,0.15)"
            : "0 2px 10px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          cursor: "pointer",
        }}
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1/1", background: "var(--rj-ivory-dark)" }}
        >
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Tag */}
          {tag && product.tag && (
            <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
              <span
                className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: tag.bg, color: tag.color }}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Wishlist — now backed by Zustand */}
          <button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: isWishlisted
                ? "rgba(252,193,81,0.15)"
                : "rgba(255,255,255,0.93)",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              size={12}
              style={{
                fill: isWishlisted ? "var(--rj-gold)" : "transparent",
                color: isWishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                transition: "all 0.25s",
              }}
            />
          </button>

          {/* Info tooltip */}
          <div className="absolute top-3 right-14 z-20 group">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-115"
              style={{
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                cursor: "pointer",
              }}
            >
              <Info size={13} style={{ color: "var(--rj-ash)" }} />
            </button>
            <div
              className="absolute top-5 right-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
              style={{
                minWidth: 180,
                background: "rgba(0,0,0,0.85)",
                color: "#fff",
                fontSize: 12,
                padding: "10px 12px",
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                transform: "translateY(6px)",
                backdropFilter: "blur(8px)",
              }}
            >
              This product is trending 🔥 <br />
              Limited stock available.
            </div>
          </div>

          {/* Desktop hover overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 hidden md:flex flex-col items-center justify-center gap-2 z-10"
              >
                <div className="absolute inset-0 bg-[var(--rj-emerald)]/20 backdrop-blur-[1px]" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(product.href);
                  }}
                  className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    color: "var(--rj-emerald)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  <Eye size={11} /> View Details
                </button>
                {/* Add to Cart — opens size picker or adds directly */}
                <button
                  onClick={handleCartClick}
                  className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all hover:scale-105"
                  style={{
                    background: addedToCart
                      ? "var(--rj-emerald)"
                      : "rgba(255,255,255,0.97)",
                    color: addedToCart ? "#fff" : "var(--rj-charcoal)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  {addedToCart ? (
                    <>
                      <Check size={11} /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={11} /> Add to Cart
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-3">
          {product.rating && (
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={9}
                  style={{
                    fill:
                      i < Math.floor(product.rating!)
                        ? "var(--rj-gold)"
                        : "transparent",
                    color:
                      i < Math.floor(product.rating!)
                        ? "var(--rj-gold)"
                        : "var(--rj-bone)",
                  }}
                />
              ))}
              {product.reviewCount && (
                <span
                  className="font-cinzel text-[8px] ml-0.5"
                  style={{ color: "var(--rj-ash)" }}
                >
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}
          <h3
            className="font-cormorant font-light leading-snug mb-0.5 line-clamp-1 transition-colors duration-200"
            style={{
              fontSize: "clamp(0.85rem,1.4vw,1rem)",
              color: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[10px] mb-2 line-clamp-1"
            style={{ color: "var(--rj-ash)" }}
          >
            {product.subtitle}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap mt-auto">
            {product.originalPrice && (
              <span
                className="text-[10px] line-through"
                style={{ color: "var(--rj-ash)" }}
              >
                {product.originalPrice}
              </span>
            )}
            <span
              className="font-cinzel font-bold"
              style={{ fontSize: "0.88rem", color: "var(--rj-emerald)" }}
            >
              {product.price}
            </span>
            {discountPct > 0 && (
              <span
                className="font-cinzel text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "#fef2f2", color: "#ef4444" }}
              >
                {discountPct}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Mobile: Add to Cart */}
        <div className="md:hidden px-3 pb-3">
          <button
            onClick={handleCartClick}
            className="w-full py-2 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all duration-250 flex items-center justify-center gap-1.5"
            style={{
              background: addedToCart
                ? "var(--rj-emerald)"
                : "var(--rj-charcoal)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {addedToCart ? (
              <>
                <Check size={10} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={10} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// SIDEBAR FILTERS
// ─────────────────────────────────────────────────────────────────
interface Filters {
  priceMin: number;
  priceMax: number;
  tags: string[];
  sizes: string[];
  ratings: number[];
}

const ALL_TAGS = [
  "Bestseller",
  "New",
  "Popular",
  "Limited",
  "Exclusive",
  "Trending",
];

const PRICE_MAX = 20000;

function Sidebar({
  filters,
  onChange,
  onClose,
  mobileOpen,
  usedSizes,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
  mobileOpen: boolean;
  usedSizes: string[];
}) {
  const [localPriceMax, setLocalPriceMax] = useState(filters.priceMax);

  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  // Get all sizes that actually appear in sample data
  // const usedSizes = Array.from(
  //   new Set(
  //     sampleProducts.flatMap(
  //       (p) => p.sizes?.map((s: { label: any }) => s.label) ?? [],
  //     ),
  //   ),
  // );

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 overflow-y-auto
          lg:static lg:h-auto lg:z-auto lg:overflow-visible
          transition-transform duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{
          width: "280px",
          minWidth: "280px",
          background: "#fff",
          borderRight: "1px solid var(--rj-bone)",
          padding: "1.5rem 1.25rem",
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p
            className="font-cinzel text-xs tracking-widest uppercase font-bold"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Filters
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onChange({
                  priceMin: 0,
                  priceMax: PRICE_MAX,
                  tags: [],
                  sizes: [],
                  ratings: [],
                })
              }
              className="font-cinzel text-[9px] tracking-wider uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="lg:hidden w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "var(--rj-bone)", cursor: "pointer" }}
            >
              <X size={12} style={{ color: "var(--rj-charcoal)" }} />
            </button>
          </div>
        </div>

        {/* ── Price range ── */}
        <div
          className="mb-6 pb-6"
          style={{ borderBottom: "1px solid var(--rj-bone)" }}
        >
          <p
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Price Range
          </p>
          <div className="flex items-center justify-between mb-2">
            <span
              className="font-cinzel text-[10px]"
              style={{ color: "var(--rj-ash)" }}
            >
              ₹0
            </span>
            <span
              className="font-cinzel text-[10px] font-bold"
              style={{ color: "var(--rj-emerald)" }}
            >
              ₹{localPriceMax.toLocaleString("en-IN")}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={PRICE_MAX}
            step={500}
            value={localPriceMax}
            onChange={(e) => setLocalPriceMax(+e.target.value)}
            onMouseUp={() => onChange({ ...filters, priceMax: localPriceMax })}
            onTouchEnd={() => onChange({ ...filters, priceMax: localPriceMax })}
            className="w-full"
            style={{
              accentColor: "var(--rj-emerald)",
              cursor: "pointer",
              height: "4px",
            }}
          />
          <div className="flex justify-between mt-1">
            <span
              className="font-cinzel text-[8px]"
              style={{ color: "var(--rj-bone)" }}
            >
              ₹0
            </span>
            <span
              className="font-cinzel text-[8px]"
              style={{ color: "var(--rj-bone)" }}
            >
              ₹20,000
            </span>
          </div>
        </div>

        {/* ── Tags ── */}
        <div
          className="mb-6 pb-6"
          style={{ borderBottom: "1px solid var(--rj-bone)" }}
        >
          <p
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Collection Tag
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map((tag) => {
              const active = filters.tags.includes(tag);
              const style = TAG_STYLES[tag];
              return (
                <button
                  key={tag}
                  onClick={() =>
                    onChange({ ...filters, tags: toggle(filters.tags, tag) })
                  }
                  className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full transition-all duration-200"
                  style={{
                    background: active
                      ? (style?.bg ?? "var(--rj-gold)")
                      : "transparent",
                    color: active ? (style?.color ?? "#000") : "var(--rj-ash)",
                    border: `1px solid ${active ? "transparent" : "var(--rj-bone)"}`,
                    cursor: "pointer",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Sizes ── */}
        <div
          className="mb-6 pb-6"
          style={{ borderBottom: "1px solid var(--rj-bone)" }}
        >
          <p
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Size
          </p>
          <div className="flex flex-wrap gap-1.5">
            {usedSizes.map((size) => {
              const active = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() =>
                    onChange({ ...filters, sizes: toggle(filters.sizes, size) })
                  }
                  className="w-9 h-9 rounded-full font-cinzel text-[10px] transition-all duration-200"
                  style={{
                    border: `1.5px solid ${active ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    background: active ? "var(--rj-emerald)" : "transparent",
                    color: active ? "#fff" : "var(--rj-charcoal)",
                    cursor: "pointer",
                    transform: active ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Rating ── */}
        <div className="mb-6">
          <p
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Minimum Rating
          </p>
          {[5, 4, 3].map((r) => {
            const active = filters.ratings.includes(r);
            return (
              <button
                key={r}
                onClick={() =>
                  onChange({ ...filters, ratings: toggle(filters.ratings, r) })
                }
                className="w-full flex items-center gap-2 py-1.5 px-2 rounded-lg transition-all duration-200 mb-1"
                style={{
                  background: active ? "rgba(0,55,32,0.06)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      style={{
                        fill: i < r ? "var(--rj-gold)" : "transparent",
                        color: i < r ? "var(--rj-gold)" : "var(--rj-bone)",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="font-cinzel text-[9px]"
                  style={{
                    color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                  }}
                >
                  {r === 5 ? "& above" : `${r}+ stars`}
                </span>
                {active && (
                  <Check
                    size={10}
                    className="ml-auto"
                    style={{ color: "var(--rj-emerald)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN GRID SECTION
// ─────────────────────────────────────────────────────────────────
export default function CollectionProductGrid({
  collectionSlug,
  products,
  loading,
  error,
  // reload,
}: {
  collectionSlug: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  // reload: () => void;
}) {
  console.log(products);

  // Derive usedSizes from live data (passed down to Sidebar)
  const usedSizes = useMemo(
    () =>
      Array.from(
        new Set(products.flatMap((p) => p.sizes?.map((s) => s.label) ?? [])),
      ),
    [products],
  );

  // ── All existing state is unchanged ─────────────────────────────
  const [filters, setFilters] = useState<Filters>({
    priceMin: 0,
    priceMax: PRICE_MAX,
    tags: [],
    sizes: [],
    ratings: [],
  });
  const [sortBy, setSortBy] = useState("featured");
  const [showSort, setShowSort] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  // const [visibleCount, setVisibleCount] = useState(9);
  const INITIAL_COUNT = 9;
  const PAGE_STEP = 3;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const activeFilterCount =
    filters.tags.length +
    filters.sizes.length +
    filters.ratings.length +
    (filters.priceMax < PRICE_MAX ? 1 : 0);

  // ── Filter + sort — identical logic, now operates on `products` ─
  const results = useMemo(() => {
    let list = [...products] as Product[];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q),
      );
    }
    if (filters.tags.length)
      list = list.filter((p) => p.tag && filters.tags.includes(p.tag));
    if (filters.sizes.length)
      list = list.filter((p) =>
        p.sizes?.some((s) => filters.sizes.includes(s.label) && s.available),
      );
    if (filters.ratings.length)
      list = list.filter((p) =>
        filters.ratings.some((r) => (p.rating ?? 0) >= r),
      );
    list = list.filter((p) => parsePrice(p.price) <= filters.priceMax);

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
  }, [products, query, filters, sortBy]);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [query, filters, sortBy]);

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const clearAll = () => {
    setFilters({
      priceMin: 0,
      priceMax: PRICE_MAX,
      tags: [],
      sizes: [],
      ratings: [],
    });
    setQuery("");
  };

  // Condition for no products in the collection
  if (!loading && products.length === 0) {
    return (
      <section
        className="section-padding flex items-center justify-center"
        style={{ background: "var(--rj-ivory)", minHeight: "60vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto flex flex-col items-center"
        >
          {/* Decorative Line */}
          <div
            className="w-16 h-[2px] mb-6"
            style={{ background: "var(--rj-gold)" }}
          />

          {/* Heading */}
          <h2
            className="font-cinzel text-xl md:text-2xl tracking-[0.3em] uppercase mb-4"
            style={{ color: "var(--rj-emerald)" }}
          >
            Coming Soon
          </h2>

          {/* Description */}
          <p
            className="font-cinzel text-[11px] tracking-widest leading-relaxed mb-6"
            style={{ color: "var(--rj-ash)" }}
          >
            This collection is being crafted with precision and elegance. Stay
            tuned — something exquisite is on its way.
          </p>

          {/* Subtle Loader Animation */}
          <motion.div
            className="flex gap-2 mt-2"
            initial="hidden"
            animate="visible"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--rj-gold)" }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Optional CTA */}
          <Link
            href="/collection"
            className="mt-8 font-cinzel text-[10px] tracking-[0.25em] uppercase px-6 py-2.5 rounded-full transition-all duration-300"
            style={{
              border: "1px solid var(--rj-emerald)",
              color: "var(--rj-emerald)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Explore Other Collections
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* ── Error banner ── */}
        {error && !loading && (
          <div
            className="flex items-center justify-between py-3 px-4 rounded-xl mb-6"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <p className="font-cinzel text-[10px] tracking-widest text-red-500">
              {error}
            </p>
            <button
              // onClick={reload}
              className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest uppercase text-red-500"
              style={{ cursor: "pointer" }}
            >
              <RefreshCw size={10} /> Retry
            </button>
          </div>
        )}

        {/* ── Top bar — unchanged markup ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search, mobile filter toggle, sort dropdown, result count */}
          {/* ...keep exactly as-is, just update the result count to handle loading... */}
          <p
            className="font-cinzel text-[10px] tracking-widest hidden sm:block"
            style={{ color: "var(--rj-ash)" }}
          >
            {loading
              ? "Loading…"
              : `${results.length} product${results.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Active filter pills — unchanged */}

        {/* ── Layout: Sidebar + Grid ── */}
        <div className="flex gap-6 lg:gap-8 items-start">
          <Sidebar
            filters={filters}
            onChange={setFilters}
            onClose={() => setSidebarOpen(false)}
            mobileOpen={sidebarOpen}
            usedSizes={usedSizes}
          />

          <div className="flex-1 min-w-0">
            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Empty state — only after loading finishes */}
            {!loading && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center text-center"
              >
                {/* ...unchanged empty state markup... */}
                <button
                  onClick={clearAll}
                  className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                    cursor: "pointer",
                  }}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {/* Product grid — only when not loading */}
            {!loading && results.length > 0 && (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {visible.map((p, i) => (
                      <ProductCard key={p.id} product={p} index={i} />
                    ))}
                  </AnimatePresence>
                </motion.div>
                {/* Load more / end — unchanged */}

                {/* ── Pagination ── */}
                {hasMore ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 flex flex-col items-center gap-3"
                  >
                    {/* Progress bar */}
                    <div className="w-full max-w-xs flex flex-col items-center gap-2">
                      <div
                        className="w-full h-[3px] rounded-full overflow-hidden"
                        style={{ background: "var(--rj-bone)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: "var(--rj-gold)" }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min((visibleCount / results.length) * 100, 100)}%`,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <p
                        className="font-cinzel text-[9px] tracking-widest"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        Showing {Math.min(visibleCount, results.length)} of{" "}
                        {results.length} products
                      </p>
                    </div>

                    {/* Explore More button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setVisibleCount((c) => c + PAGE_STEP)}
                      className="group flex items-center gap-3 px-8 py-3.5 rounded-full font-cinzel text-[10px] tracking-[0.25em] uppercase font-bold transition-all duration-300 cursor-pointer"
                      style={{
                        background: "transparent",
                        border: "1.5px solid var(--rj-emerald)",
                        color: "var(--rj-emerald)",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "var(--rj-emerald)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--rj-gold)";
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--rj-emerald)";
                      }}
                    >
                      <span>Explore More</span>
                      <motion.span
                        animate={{ y: [0, 3, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-xs"
                      >
                        ↓
                      </motion.span>
                      <span
                        className="font-cinzel text-[8px] tracking-widest px-2 py-0.5 rounded-full"
                        // style={{
                        //   background: "rgba(0,55,32,0.08)",
                        //   color: "var(--rj-emerald)",
                        // }}
                      >
                        +{Math.min(PAGE_STEP, results.length - visibleCount)}{" "}
                        items
                      </span>
                    </motion.button>
                  </motion.div>
                ) : (
                  /* End of collection */
                  results.length > INITIAL_COUNT && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-10 flex flex-col items-center gap-3"
                    >
                      <div
                        className="w-full max-w-xs h-[3px] rounded-full"
                        style={{ background: "var(--rj-gold)" }}
                      />
                      <p
                        className="font-cinzel text-[9px] tracking-[0.3em] uppercase"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        ✦ All {results.length} products shown ✦
                      </p>
                    </motion.div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
