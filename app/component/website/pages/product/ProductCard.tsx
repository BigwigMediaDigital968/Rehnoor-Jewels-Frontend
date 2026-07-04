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
import { useCartStore } from "@/app/store/cartStore";
import { useWishlistStore } from "@/app/store/cartStore";
import type { Product } from "@/app/types/Product.types";
import QuickViewModal from "./QuickViewModal";

// ─── Tag colour map ───────────────────────────────────────────────
const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  New: { bg: "#4ade80", color: "#000" },
  Bestseller: { bg: "var(--rj-gold)", color: "#000" },
  Limited: { bg: "#f87171", color: "#000" },
  Sale: { bg: "#f87171", color: "#fff" },
  Exclusive: { bg: "#c084fc", color: "#000" },
  Trending: { bg: "#fb923c", color: "#000" },
  Popular: { bg: "#60a5fa", color: "#000" },
};

// ─────────────────────────────────────────────────────────────────
// QUICK VIEW MODAL
// ─────────────────────────────────────────────────────────────────
function QuickViewModal_v2({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [copied, setCopied] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const prevImg = () =>
    setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }

    const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10);
    const originalPriceNum = product.originalPrice
      ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
      : null;

    const finalSizeLabel = selectedSize || "Free Size";
    const matchedVariant = (product as any).variants?.find(
      (v: any) => v.title === finalSizeLabel,
    );

    const variantSnapshot = {
      variantId:
        matchedVariant?._id ??
        finalSizeLabel.toLowerCase().replace(/\s+/g, "-"),
      title: finalSizeLabel,
      options: { Size: finalSizeLabel },
      price: matchedVariant?.price ?? priceNum,
      originalPrice: matchedVariant?.originalPrice ?? originalPriceNum,
      image: matchedVariant?.images?.[0]?.src ?? product.images[0]?.src ?? "",
    };

    addItem({
      productId: product.id,
      name: product.name,
      subtitle: matchedVariant ? matchedVariant.title : product.subtitle,
      image: matchedVariant?.images?.[0]?.src ?? product.images[0]?.src ?? "",
      priceNum: matchedVariant?.price ?? priceNum,
      originalPriceNum: matchedVariant?.originalPrice ?? originalPriceNum,
      qty,
      href: product.href,
      category: product.category,
      tag: product.tag,
      variant: variantSnapshot,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + product.href,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Close on Escape
  useState(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", h);
      return () => window.removeEventListener("keydown", h);
    }
  });

  const handleToggleWishlist = () => {
    const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10);
    const originalPriceNum = product.originalPrice
      ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
      : null;

    const formattedVariants = ((product as any).variants || []).map(
      (v: any) => ({
        variantId: v._id,
        title: v.title,
        options: v.options || { Size: v.title },
        price: v.price,
        originalPrice: v.originalPrice ?? null,
        image: v.images?.[0]?.src ?? product.images[0]?.src ?? "",
      }),
    );

    toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src || "",
      priceNum,
      originalPriceNum,
      href: product.href,
      category: product.category,
      tag: product.tag,
      variants: formattedVariants,
    });
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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
          style={{ background: "var(--rj-charcoal)", color: "#fff" }}
        >
          <X size={14} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ── Left: Image ── */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[480px] bg-[var(--rj-ivory-dark)] rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl overflow-hidden">
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
                  className="object-cover object-top-left"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {product.tag && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="font-cinzel text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full"
                  style={{
                    background: TAG_STYLES[product.tag]?.bg ?? "var(--rj-gold)",
                    color: TAG_STYLES[product.tag]?.color ?? "#000",
                  }}
                >
                  {product.tag}
                </span>
              </div>
            )}

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <ChevronRight size={14} />
                </button>
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

          {/* ── Right: Details ── */}
          <div className="p-6 md:p-8 flex flex-col">
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
            <p
              className="font-body text-sm mb-4"
              style={{ color: "var(--rj-ash)" }}
            >
              {product.subtitle}
            </p>

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
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2.5"
                  style={{
                    color: sizeError ? "#ef4444" : "var(--rj-charcoal)",
                  }}
                >
                  {sizeError ? "Please select a size" : `Size: `}
                  {!sizeError && (
                    <span style={{ color: "var(--rj-emerald)" }}>
                      {selectedSize || "—"}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      disabled={!s.available}
                      onClick={() => {
                        setSelectedSize(s.label);
                        setSizeError(false);
                      }}
                      className="w-10 h-10 rounded-full font-cinzel text-xs transition-all duration-200 relative"
                      style={{
                        border: `1.5px solid ${selectedSize === s.label ? "var(--rj-emerald)" : sizeError ? "#fca5a5" : "var(--rj-bone)"}`,
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
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Cart */}
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center rounded-full overflow-hidden"
                style={{ border: "1.5px solid var(--rj-bone)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-8 h-9 flex items-center justify-center transition-colors cursor-pointer hover:bg-[var(--rj-ivory-dark)]"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  −
                </button>
                <span
                  className="w-6 text-center font-cinzel text-sm"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-8 h-9 flex items-center justify-center transition-colors cursor-pointer hover:bg-[var(--rj-ivory-dark)]"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="min-w-10 flex items-center justify-center gap-1 py-2.5 px-3 font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300 rounded-full cursor-pointer"
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
                    <Check size={13} /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={13} /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleToggleWishlist}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer hover:scale-110"
                style={{
                  border: "1.5px solid var(--rj-bone)",
                  background: wishlisted
                    ? "rgba(252,193,81,0.08)"
                    : "transparent",
                }}
              >
                <Heart
                  size={14}
                  style={{
                    fill: wishlisted ? "var(--rj-gold)" : "transparent",
                    color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                  }}
                />
              </button>

              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:opacity-70 cursor-pointer"
                style={{ border: "1.5px solid var(--rj-bone)" }}
              >
                {copied ? (
                  <Check size={13} style={{ color: "var(--rj-emerald)" }} />
                ) : (
                  <Share2 size={13} style={{ color: "var(--rj-ash)" }} />
                )}
              </button>
            </div>

            <Link
              href={product.href}
              className="flex items-center justify-center py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 cursor-pointer"
              style={{ background: "var(--rj-charcoal)", color: "#fff" }}
              onClick={onClose}
            >
              View Full Details
            </Link>

            <p
              className="text-center font-cinzel text-[9px] tracking-wider mt-4"
              style={{ color: "var(--rj-ash)" }}
            >
              ⚜ Craftsmanship · Free Sizing · 07-Day Returns
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
  const [quickView, setQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const priceNum = parseInt(product.price.replace(/[^\d]/g, ""), 10);
    const originalPriceNum = product.originalPrice
      ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
      : null;

    const formattedVariants = ((product as any).variants || []).map(
      (v: any) => ({
        variantId: v._id,
        title: v.title,
        options: v.options || { Size: v.title },
        price: v.price,
        originalPrice: v.originalPrice ?? null,
        image: v.images?.[0]?.src ?? product.images[0]?.src ?? "",
      }),
    );

    toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src || "",
      priceNum,
      originalPriceNum,
      href: product.href,
      category: product.category,
      tag: product.tag,
      variants: formattedVariants,
    });
  };

  const tag = product.tag ? TAG_STYLES[product.tag] : null;

  return (
    <>
      <Link href={product.href} className="block" aria-label={product.name}>
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

            {/* Wishlist */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              aria-label="Toggle wishlist"
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

            {/* Quick view — desktop hover */}
            {/* <AnimatePresence>
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
                  className="absolute inset-0 items-center justify-center z-10 hidden md:flex"
                >
                  <div className="absolute inset-0 bg-[var(--rj-emerald)]/30" />
                  <div
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold cursor-pointer hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      color: "var(--rj-emerald)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Eye size={13} /> Quick View
                  </div>
                </motion.button>
              )}
            </AnimatePresence> */}

            {/* Image nav */}
            {product.images.length > 1 && (
              <>
                <AnimatePresence>
                  {hovered && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        onClick={prevImg}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110"
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <ChevronLeft size={12} />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        onClick={nextImg}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110"
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <ChevronRight size={12} />
                      </motion.button>
                    </>
                  )}
                </AnimatePresence>
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
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── Card body ── */}
          <div className="flex flex-col flex-1 p-4">
            <h3
              className="font-cormorant font-light leading-tight mb-1 group-hover:text-[var(--rj-emerald)] transition-colors duration-300"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "var(--rj-charcoal)",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.name}
            </h3>
            {/* <p
            className="hidden md:block font-body text-xs mb-3"
            style={{ color: "var(--rj-ash)" }}
          >
            {product.subtitle}
          </p> */}

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

            <div className="flex-1" />

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
              {product.originalPrice && (
                <span
                  className="font-cinzel text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#fef2f2", color: "#ef4444" }}
                >
                  {Math.round(
                    (1 -
                      parseInt(product.price.replace(/[^\d]/g, ""), 10) /
                        parseInt(
                          product.originalPrice.replace(/[^\d]/g, ""),
                          10,
                        )) *
                      100,
                  )}
                  % OFF
                </span>
              )}
            </div>

            <div
              className="h-px mb-3"
              style={{ background: "var(--rj-bone)" }}
            />

            <div
              className="flex items-center justify-center gap-2 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300 cursor-pointer"
              style={{
                background: addedToCart
                  ? "var(--rj-emerald)"
                  : hovered
                    ? "var(--rj-emerald)"
                    : "var(--rj-charcoal)",
                color: "#fff",
              }}
            >
              <Eye size={12} /> View Details
            </div>
          </div>
        </motion.article>
      </Link>

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
