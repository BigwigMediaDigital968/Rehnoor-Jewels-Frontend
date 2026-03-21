"use client";

import { useState, useMemo, useCallback } from "react";
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
  ArrowRight,
  Eye,
} from "lucide-react";
import type { Product } from "../../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// SAMPLE DATA — replace with API fetch by collectionId
// ─────────────────────────────────────────────────────────────────
const sampleProducts: Product[] = [
  {
    id: "nawabi-22kt",
    name: "Nawabi Chain",
    subtitle: "22kt · 18 inch",
    price: "₹8,999",
    originalPrice: "₹10,499",
    tag: "Bestseller",
    rating: 5,
    reviewCount: 248,
    category: "Chains",
    href: "/products/nawabi-chain-22kt",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        alt: "Nawabi Chain",
      },
    ],
    sizes: [
      { label: '16"', available: true },
      { label: '18"', available: true },
      { label: '20"', available: true },
    ],
  },
  {
    id: "cuban-22kt",
    name: "Cuban Link Chain",
    subtitle: "22kt · 20 inch",
    price: "₹11,299",
    originalPrice: "₹13,500",
    tag: "Trending",
    rating: 5,
    reviewCount: 134,
    category: "Chains",
    href: "/products/cuban-link-chain",
    images: [
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=80",
        alt: "Cuban Chain",
      },
    ],
    sizes: [
      { label: '18"', available: true },
      { label: '20"', available: true },
    ],
  },
  {
    id: "rope-22kt",
    name: "Rope Chain",
    subtitle: "22kt · 22 inch",
    price: "₹7,499",
    originalPrice: "₹8,800",
    tag: "New",
    rating: 4,
    reviewCount: 67,
    category: "Chains",
    href: "/products/rope-chain-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80",
        alt: "Rope Chain",
      },
    ],
    sizes: [
      { label: '18"', available: true },
      { label: '22"', available: true },
    ],
  },
  {
    id: "signet-22kt",
    name: "Signet Ring",
    subtitle: "22kt · Men's",
    price: "₹5,299",
    originalPrice: "₹6,200",
    tag: "Popular",
    rating: 5,
    reviewCount: 312,
    category: "Rings",
    href: "/products/signet-ring-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
        alt: "Signet Ring",
      },
    ],
    sizes: [
      { label: "18", available: true },
      { label: "20", available: true },
      { label: "22", available: true },
    ],
  },
  {
    id: "band-22kt",
    name: "Classic Band Ring",
    subtitle: "22kt · Plain",
    price: "₹3,499",
    tag: "Bestseller",
    rating: 4,
    reviewCount: 445,
    category: "Rings",
    href: "/products/band-ring-plain",
    images: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80",
        alt: "Band Ring",
      },
    ],
    sizes: [
      { label: "18", available: true },
      { label: "20", available: true },
    ],
  },
  {
    id: "royal-kada",
    name: "Royal Kada",
    subtitle: "22kt · Adjustable",
    price: "₹12,499",
    originalPrice: "₹14,999",
    tag: "New",
    rating: 5,
    reviewCount: 189,
    category: "Kadas",
    href: "/products/royal-kada-heavy",
    images: [
      {
        src: "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=500&q=80",
        alt: "Royal Kada",
      },
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
  },
  {
    id: "link-bracelet",
    name: "Link Bracelet",
    subtitle: "22kt · 8 inch",
    price: "₹7,199",
    originalPrice: "₹8,500",
    tag: "Limited",
    rating: 5,
    reviewCount: 98,
    category: "Bracelets",
    href: "/products/link-bracelet-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&q=80",
        alt: "Link Bracelet",
      },
    ],
    sizes: [
      { label: '7"', available: true },
      { label: '8"', available: true },
    ],
  },
  {
    id: "sol-pendant",
    name: "Sol Pendant",
    subtitle: "22kt · Unisex",
    price: "₹4,499",
    originalPrice: "₹5,200",
    tag: "New",
    rating: 5,
    reviewCount: 143,
    category: "Pendants",
    href: "/products/sol-pendant-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        alt: "Sol Pendant",
      },
    ],
    sizes: [{ label: "Free", available: true }],
  },
  {
    id: "moghul-kada",
    name: "Moghul Kada",
    subtitle: "22kt · Carved",
    price: "₹15,999",
    originalPrice: "₹18,500",
    tag: "Exclusive",
    rating: 5,
    reviewCount: 56,
    category: "Kadas",
    href: "/products/moghul-kada-carved",
    images: [
      {
        src: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=500&q=80",
        alt: "Moghul Kada",
      },
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
    ],
  },
  {
    id: "cord-bracelet",
    name: "Cord Bracelet",
    subtitle: "22kt · Minimal",
    price: "₹3,899",
    tag: "Bestseller",
    rating: 4,
    reviewCount: 567,
    category: "Bracelets",
    href: "/products/cord-bracelet-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80",
        alt: "Cord Bracelet",
      },
    ],
    sizes: [
      { label: '7"', available: true },
      { label: '8"', available: true },
    ],
  },
  {
    id: "om-pendant",
    name: "Om Pendant",
    subtitle: "22kt · Sacred",
    price: "₹5,899",
    originalPrice: "₹6,499",
    tag: "Popular",
    rating: 5,
    reviewCount: 278,
    category: "Pendants",
    href: "/products/om-pendant-22kt",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
        alt: "Om Pendant",
      },
    ],
    sizes: [{ label: "Free", available: true }],
  },
  {
    id: "cuban-22kt-2",
    name: "Cuban Chain Pro",
    subtitle: "22kt · 24 inch",
    price: "₹13,499",
    originalPrice: "₹15,000",
    tag: "New",
    rating: 4,
    reviewCount: 34,
    category: "Chains",
    href: "/products/cuban-link-chain-2",
    images: [
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
        alt: "Cuban Pro",
      },
    ],
    sizes: [
      { label: '20"', available: true },
      { label: '24"', available: true },
    ],
  },
];

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

function parsePrice(s: string) {
  return parseInt(s.replace(/[^\d]/g, ""), 10);
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD (inline — links to product detail page)
// ─────────────────────────────────────────────────────────────────
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const tag = product.tag ? TAG_STYLES[product.tag] : null;

  const discountPct = product.originalPrice
    ? Math.round(
        (1 - parsePrice(product.price) / parsePrice(product.originalPrice)) *
          100,
      )
    : 0;

  const router = useRouter();

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  // FIX: The entire card is one <div> — no outer <Link>/<a>.
  // Navigation is handled by router.push() on the div's onClick.
  // The hover overlay uses a <button> (not <Link>) that also calls router.push().
  // This prevents <a> nested inside <a> which causes hydration errors.
  return (
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
      {/* Image area — plain div, card onClick handles navigation */}
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
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span
              className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: tag.bg, color: tag.color }}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist — stopPropagation so card onClick doesn't fire */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.93)",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          aria-label="Wishlist"
        >
          <Heart
            size={12}
            style={{
              fill: wishlisted ? "var(--rj-gold)" : "transparent",
              color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
              transition: "all 0.25s",
            }}
          />
        </button>

        {/* Desktop hover overlay — buttons only, no nested <a> */}
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
              {/* FIX: button + router.push instead of nested <Link>/<a> */}
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
              <button
                onClick={handleCart}
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
                  "Add to Cart"
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body — plain div, card onClick handles navigation */}
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

      {/* Mobile: Add to Cart — stopPropagation so it doesn't navigate */}
      <div className="md:hidden px-3 pb-3">
        <button
          onClick={handleCart}
          className="w-full py-2 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all duration-250"
          style={{
            background: addedToCart
              ? "var(--rj-emerald)"
              : "var(--rj-charcoal)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {addedToCart ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
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
const ALL_SIZES = [
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  "S",
  "M",
  "L",
  "XL",
  "Free",
  '7"',
  '8"',
  '9"',
  "18",
  "20",
  "22",
  "24",
  "26",
];
const PRICE_MAX = 20000;

function Sidebar({
  filters,
  onChange,
  onClose,
  mobileOpen,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
  mobileOpen: boolean;
}) {
  const [localPriceMax, setLocalPriceMax] = useState(filters.priceMax);

  const toggle = <T,>(arr: T[], val: T): T[] =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];

  // Get all sizes that actually appear in sample data
  const usedSizes = Array.from(
    new Set(
      sampleProducts.flatMap(
        (p) => p.sizes?.map((s: { label: any }) => s.label) ?? [],
      ),
    ),
  );

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
  products = sampleProducts,
}: {
  products?: Product[];
}) {
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
  const [visibleCount, setVisibleCount] = useState(9);

  const activeFilterCount =
    filters.tags.length +
    filters.sizes.length +
    filters.ratings.length +
    (filters.priceMax < PRICE_MAX ? 1 : 0);

  const results = useMemo(() => {
    let list = [...products];

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
        p.sizes?.some(
          (s: { label: string; available: any }) =>
            filters.sizes.includes(s.label) && s.available,
        ),
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

  const visible = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* ── Top bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: query ? "var(--rj-emerald)" : "var(--rj-ash)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-8 pr-8 py-2 font-cinzel text-[10px] tracking-wider outline-none transition-all duration-200"
              style={{
                background: "#fff",
                borderRadius: "8px",
                color: "var(--rj-charcoal)",
                border: `1px solid ${query ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                boxShadow: query ? "0 0 0 3px rgba(0,55,32,0.06)" : "none",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ cursor: "pointer" }}
              >
                <X size={12} style={{ color: "var(--rj-ash)" }} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg font-cinzel text-[10px] tracking-widest uppercase transition-all"
            style={{
              background: sidebarOpen ? "var(--rj-emerald)" : "#fff",
              border: "1px solid var(--rj-bone)",
              color: sidebarOpen ? "var(--rj-gold)" : "var(--rj-ash)",
              cursor: "pointer",
            }}
          >
            <SlidersHorizontal size={12} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center font-cinzel text-[8px] font-bold"
                style={{
                  background: "var(--rj-gold)",
                  color: "var(--rj-emerald)",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative ml-auto flex-shrink-0">
            <button
              onClick={() => setShowSort((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-cinzel text-[10px] tracking-widest uppercase transition-all"
              style={{
                background: showSort ? "var(--rj-emerald)" : "#fff",
                border: "1px solid var(--rj-bone)",
                color: showSort ? "var(--rj-gold)" : "var(--rj-ash)",
                cursor: "pointer",
              }}
            >
              <SlidersHorizontal size={12} />
              <span className="hidden sm:inline">
                {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown
                size={10}
                className={`transition-transform duration-200 ${showSort ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-full mt-2 z-50 rounded-xl overflow-hidden"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--rj-bone)",
                    boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
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
                      className="w-full text-left px-4 py-2.5 font-cinzel text-[10px] tracking-widest flex items-center justify-between"
                      style={{
                        color:
                          sortBy === opt.value
                            ? "var(--rj-emerald)"
                            : "var(--rj-ash)",
                        background:
                          sortBy === opt.value
                            ? "rgba(0,55,32,0.05)"
                            : "transparent",
                        cursor: "pointer",
                        fontWeight: sortBy === opt.value ? 700 : 400,
                      }}
                    >
                      {opt.label}
                      {sortBy === opt.value && (
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: "var(--rj-emerald)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result count */}
          <p
            className="font-cinzel text-[10px] tracking-widest hidden sm:block"
            style={{ color: "var(--rj-ash)" }}
          >
            {results.length} product{results.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Active filter pills */}
        <AnimatePresence>
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mb-4 overflow-hidden"
            >
              {filters.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                  }}
                >
                  {t}
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        tags: f.tags.filter((x) => x !== t),
                      }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <X size={9} />
                  </button>
                </span>
              ))}
              {filters.sizes.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                  }}
                >
                  Size: {s}
                  <button
                    onClick={() =>
                      setFilters((f) => ({
                        ...f,
                        sizes: f.sizes.filter((x) => x !== s),
                      }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <X size={9} />
                  </button>
                </span>
              ))}
              {filters.priceMax < PRICE_MAX && (
                <span
                  className="inline-flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                  }}
                >
                  Under ₹{filters.priceMax.toLocaleString("en-IN")}
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, priceMax: PRICE_MAX }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <X size={9} />
                  </button>
                </span>
              )}
              <button
                onClick={() =>
                  setFilters({
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
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Layout: Sidebar + Grid ── */}
        <div className="flex gap-6 lg:gap-8 items-start">
          {/* Sidebar */}
          <Sidebar
            filters={filters}
            onChange={setFilters}
            onClose={() => setSidebarOpen(false)}
            mobileOpen={sidebarOpen}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(0,55,32,0.06)",
                    border: "1px solid rgba(0,55,32,0.1)",
                  }}
                >
                  <Search
                    size={20}
                    style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
                  />
                </div>
                <p
                  className="font-cormorant text-2xl font-light mb-1"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  No products found
                </p>
                <p
                  className="font-cinzel text-xs tracking-widest uppercase mb-5"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Try adjusting your filters
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      priceMin: 0,
                      priceMax: PRICE_MAX,
                      tags: [],
                      sizes: [],
                      ratings: [],
                    });
                    setQuery("");
                  }}
                  className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                    cursor: "pointer",
                  }}
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
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

                {/* Load more / end */}
                <div className="text-center mt-10">
                  {hasMore ? (
                    <>
                      {/* Progress bar */}
                      <div className="max-w-xs mx-auto mb-5">
                        <div className="flex justify-between mb-1.5">
                          <span
                            className="font-cinzel text-[9px] tracking-widest"
                            style={{ color: "var(--rj-ash)" }}
                          >
                            {visible.length} shown
                          </span>
                          <span
                            className="font-cinzel text-[9px] tracking-widest"
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
                            animate={{
                              width: `${(visible.length / results.length) * 100}%`,
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setVisibleCount((c) => c + 6)}
                        className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-7 py-3 rounded-full transition-all duration-300 hover:bg-[var(--rj-emerald)] hover:text-[var(--rj-gold)] hover:border-[var(--rj-emerald)]"
                        style={{
                          border: "1.5px solid var(--rj-emerald)",
                          color: "var(--rj-emerald)",
                          cursor: "pointer",
                        }}
                      >
                        Load {Math.min(6, results.length - visibleCount)} More
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-10 h-px"
                        style={{ background: "var(--gradient-gold)" }}
                      />
                      <p
                        className="font-cinzel text-[9px] tracking-widest uppercase"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        All {results.length} products shown
                      </p>
                      <div
                        className="w-10 h-px"
                        style={{ background: "var(--gradient-gold)" }}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
