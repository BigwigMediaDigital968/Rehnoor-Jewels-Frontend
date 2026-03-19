"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  ShoppingBag,
  Share2,
  Check,
  Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSize {
  label: string; // e.g. "18", "20", "S", "Free"
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string; // e.g. "22kt Yellow Gold"
  price: string; // e.g. "₹8,999"
  originalPrice?: string; // if on sale
  tag?: string; // "New" | "Bestseller" | "Limited" | "Sale" etc.
  rating?: number; // 1–5
  reviewCount?: number;
  images: ProductImage[];
  sizes?: ProductSize[];
  href: string;
  category?: string;
  description?: string;
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  New: { bg: "#4ade80", color: "#000" },
  Bestseller: { bg: "var(--rj-gold)", color: "#000" },
  Limited: { bg: "#f87171", color: "#000" },
  Sale: { bg: "#f87171", color: "#fff" },
  Exclusive: { bg: "#c084fc", color: "#000" },
  Trending: { bg: "#fb923c", color: "#000" },
  Popular: { bg: "#60a5fa", color: "#000" },
};

function QuickViewModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const prevImg = () =>
    setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 cursor-pointer"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
          style={{ background: "var(--rj-charcoal)", color: "#fff" }}
          aria-label="Close quick view"
        >
          <X size={14} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ── Left: Image gallery ── */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[480px] bg-[var(--rj-ivory-dark)] rounded-tl-2xl rounded-bl-none rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl overflow-hidden flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[imgIdx].src}
                  alt={product.images[imgIdx].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Tag */}
            {product.tag && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="font-cinzel text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full"
                  style={
                    TAG_STYLES[product.tag] || {
                      bg: "var(--rj-gold)",
                      color: "#000",
                    }
                  }
                >
                  {product.tag}
                </span>
              </div>
            )}

            {/* Image nav — only if multiple */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "var(--rj-charcoal)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "var(--rj-charcoal)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ChevronRight size={14} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === imgIdx ? "18px" : "6px",
                        height: "6px",
                        background:
                          i === imgIdx
                            ? "var(--rj-emerald)"
                            : "rgba(255,255,255,0.6)",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Right: Product details ── */}
          <div className="p-6 md:p-8 flex flex-col">
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
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
                </div>
                {product.reviewCount && (
                  <span
                    className="font-cinzel text-[10px] tracking-wider"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Name */}
            <h2
              className="font-cormorant font-light leading-tight mb-1"
              style={{
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                color: "var(--rj-charcoal)",
                letterSpacing: "-0.01em",
              }}
            >
              {product.name}
            </h2>

            {/* Subtitle */}
            <p
              className="font-body text-sm mb-4"
              style={{ color: "var(--rj-ash)" }}
            >
              {product.subtitle}
            </p>

            {/* Description */}
            {product.description && (
              <p
                className="text-sm leading-relaxed mb-5"
                style={{
                  color: "var(--rj-ash)",
                  borderTop: "1px solid var(--rj-bone)",
                  paddingTop: "1rem",
                }}
              >
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="font-cinzel font-bold text-2xl"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {product.price}
              </span>
              {product.originalPrice && (
                <span
                  className="font-body text-sm line-through"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {product.originalPrice}
                </span>
              )}
              <span
                className="font-cinzel text-[9px] tracking-wider"
                style={{ color: "var(--rj-ash)" }}
              >
                Incl. taxes
              </span>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Size:{" "}
                    <span style={{ color: "var(--rj-emerald)" }}>
                      {selectedSize || "—"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s.label)}
                      className="w-10 h-10 rounded-full font-cinzel text-xs transition-all duration-200 relative cursor-pointer"
                      style={{
                        border: `1.5px solid ${selectedSize === s.label ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                        background:
                          selectedSize === s.label
                            ? "var(--rj-emerald)"
                            : "transparent",
                        color:
                          selectedSize === s.label
                            ? "#fff"
                            : s.available
                              ? "var(--rj-charcoal)"
                              : "var(--rj-bone)",
                        opacity: s.available ? 1 : 0.4,
                        cursor: s.available ? "pointer" : "not-allowed",
                      }}
                    >
                      {s.label}
                      {!s.available && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="absolute w-full h-px rotate-45"
                            style={{ background: "var(--rj-bone)" }}
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-3 mb-3">
              {/* Qty stepper */}
              <div
                className="flex items-center rounded-full overflow-hidden"
                style={{ border: "1.5px solid var(--rj-bone)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center transition-colors cursor-pointer hover:bg-[var(--rj-ivory-dark)]"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  −
                </button>
                <span
                  className="w-8 text-center font-cinzel text-sm"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center transition-colors cursor-pointer hover:bg-[var(--rj-ivory-dark)]"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  background: addedToCart
                    ? "var(--rj-emerald)"
                    : "var(--gradient-gold)",
                  color: addedToCart ? "#fff" : "var(--rj-emerald)",
                  boxShadow: "0 4px 20px rgba(252,193,81,0.25)",
                }}
              >
                {addedToCart ? (
                  <>
                    <Check size={13} />
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} />
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer hover:scale-110"
                style={{
                  border: "1.5px solid var(--rj-bone)",
                  background: wishlisted
                    ? "rgba(252,193,81,0.08)"
                    : "transparent",
                }}
                aria-label="Add to wishlist"
              >
                <Heart
                  size={14}
                  style={{
                    fill: wishlisted ? "var(--rj-gold)" : "transparent",
                    color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                  }}
                />
              </button>

              {/* Share */}
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:opacity-70 cursor-pointer"
                style={{ border: "1.5px solid var(--rj-bone)" }}
                aria-label="Share product"
              >
                <Share2 size={13} style={{ color: "var(--rj-ash)" }} />
              </button>
            </div>

            {/* Buy it now */}
            <Link
              href={product.href}
              className="flex items-center justify-center py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 cursor-pointer"
              style={{
                background: "var(--rj-charcoal)",
                color: "#fff",
              }}
              onClick={onClose}
            >
              Buy It Now
            </Link>

            {/* BIS badge */}
            <p
              className="text-center font-cinzel text-[9px] tracking-wider mt-4"
              style={{ color: "var(--rj-ash)" }}
            >
              ⚜ BIS Hallmarked · Free Sizing · 30-Day Returns
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────
export default function ProductCard({ product }: { product: Product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [quickView, setQuickView] = useState(false);

  const prevImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);
    },
    [product.images.length],
  );

  const nextImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setImgIdx((i) => (i + 1) % product.images.length);
    },
    [product.images.length],
  );

  const tag = product.tag ? TAG_STYLES[product.tag] : null;

  return (
    <>
      {/* ── Card ── */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col group"
        style={{
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--rj-bone)",
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(252,193,81,0.08)"
            : "0 2px 12px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.4s ease, transform 0.4s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        {/* ── Image area ── */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "1/1", background: "var(--rj-ivory-dark)" }}
        >
          {/* Main image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[imgIdx].src}
                alt={product.images[imgIdx].alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700"
                style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tag badge — top left */}
          {tag && product.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className="font-cinzel text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: tag.bg, color: tag.color }}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Wishlist button — top right */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlisted((w) => !w);
            }}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transform: wishlisted ? "scale(1.15)" : "scale(1)",
            }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={13}
              style={{
                fill: wishlisted ? "var(--rj-gold)" : "transparent",
                color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                transition: "all 0.3s",
              }}
            />
          </button>

          {/* ── Quick view eye — center on hover (hidden on mobile) ── */}
          <AnimatePresence>
            {hovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => {
                  e.preventDefault();
                  setQuickView(true);
                }}
                className="
                  absolute inset-0 items-center justify-center z-10
                  hidden md:flex
                "
                aria-label="Quick view"
              >
                {/* Scrim */}
                <div className="absolute inset-0 bg-[var(--rj-emerald)]/30" />
                {/* Eye pill */}
                <div
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold cursor-pointer hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "var(--rj-emerald)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  <Eye size={13} />
                  Quick View
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Image nav dots — shown on hover if multiple images */}
          {product.images.length > 1 && (
            <>
              {/* Prev / Next arrows */}
              <AnimatePresence>
                {hovered && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.2 }}
                      onClick={prevImg}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={12} />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 4 }}
                      transition={{ duration: 0.2 }}
                      onClick={nextImg}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110"
                      style={{
                        background: "rgba(255,255,255,0.9)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight size={12} />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Dot indicators at bottom */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      setImgIdx(i);
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === imgIdx ? "14px" : "5px",
                      height: "5px",
                      background:
                        i === imgIdx
                          ? "var(--rj-emerald)"
                          : "rgba(255,255,255,0.7)",
                    }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Card body — clicking navigates to product page ── */}
        <Link href={product.href} className="flex flex-col flex-1 p-4">
          {/* Name */}
          <h3
            className="font-cormorant font-light leading-tight mb-1 group-hover:text-[var(--rj-emerald)] transition-colors duration-300"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "var(--rj-charcoal)",
              letterSpacing: "-0.01em",
            }}
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          <p
            className="font-body text-xs mb-3"
            style={{ color: "var(--rj-ash)" }}
          >
            {product.subtitle}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
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
              </div>
              {product.reviewCount && (
                <span
                  className="font-cinzel text-[9px]"
                  style={{ color: "var(--rj-ash)" }}
                >
                  ({product.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price row */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-cinzel font-bold"
              style={{ fontSize: "1rem", color: "var(--rj-charcoal)" }}
            >
              {product.price}
            </span>
            {product.originalPrice && (
              <span
                className="font-body text-xs line-through"
                style={{ color: "var(--rj-ash)" }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px mb-3" style={{ background: "var(--rj-bone)" }} />

          {/* CTA button */}
          <div
            className="flex items-center justify-center py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300"
            style={{
              background: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
              color: "#fff",
            }}
          >
            Select Size
          </div>
        </Link>
      </motion.article>

      {/* ── Quick View Modal — portal to body (hidden on mobile via CSS) ── */}
      <AnimatePresence>
        {quickView && (
          <QuickViewModal
            product={product}
            onClose={() => setQuickView(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// USAGE EXAMPLE (delete this — for reference only)
// ─────────────────────────────────────────────────────────────────
//
// const product: Product = {
//   id:            "nawabi-chain-22kt",
//   name:          "Nawabi Chain",
//   subtitle:      "22kt Yellow Gold",
//   price:         "₹8,999",
//   originalPrice: "₹10,499",
//   tag:           "Bestseller",
//   rating:        5,
//   reviewCount:   124,
//   category:      "Chains",
//   description:   "A bold, hand-crafted Nawabi chain in BIS hallmarked 22kt gold. Timeless heritage, modern weight.",
//   href:          "/products/nawabi-chain",
//   images: [
//     { src: "/products/nawabi-chain-1.jpg", alt: "Nawabi Chain front" },
//     { src: "/products/nawabi-chain-2.jpg", alt: "Nawabi Chain side"  },
//   ],
//   sizes: [
//     { label: "18", available: true  },
//     { label: "20", available: true  },
//     { label: "22", available: true  },
//     { label: "24", available: false },
//   ],
// };
//
// <ProductCard product={product} />
