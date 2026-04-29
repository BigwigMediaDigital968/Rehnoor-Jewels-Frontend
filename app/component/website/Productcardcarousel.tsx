"use client";

import { useState, useCallback, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  Star,
  Plus,
  Info,
} from "lucide-react";
import type { Product } from "../../types/Product.types";
import QuickViewModal from "../website/pages/product/QuickViewModal";
import { useCartStore, useWishlistStore } from "../../store/cartStore";

// ─────────────────────────────────────────────────────────────────
// TAG STYLES
// ─────────────────────────────────────────────────────────────────
const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  New: { bg: "#4ade80", color: "#000" },
  Bestseller: { bg: "var(--rj-gold)", color: "#000" },
  Limited: { bg: "#f87171", color: "#fff" },
  Sale: { bg: "#f87171", color: "#fff" },
  Exclusive: { bg: "#c084fc", color: "#000" },
  Trending: { bg: "#fb923c", color: "#000" },
  Popular: { bg: "#60a5fa", color: "#000" },
};

// ─────────────────────────────────────────────────────────────────
// MINI SIZE PICKER POPOVER
// Shown inside the card overlay when user clicks "Add to Cart"
// on desktop (before a size has been chosen in Quick View).
// ─────────────────────────────────────────────────────────────────
function SizePicker({
  sizes,
  onSelect,
  onCancel,
}: {
  sizes?: Product["sizes"];
  onSelect: (label: string) => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-x-3 bottom-3 z-20 rounded-2xl p-3 flex flex-col gap-2"
      style={{
        background: "rgba(255,255,255,0.97)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        backdropFilter: "blur(6px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className="font-cinzel text-[9px] tracking-widest uppercase text-center"
        style={{ color: "var(--rj-ash)" }}
      >
        Select Size
      </p>
      <div className="flex flex-wrap justify-center gap-1.5">
        {(sizes ?? []).map((s) => (
          <button
            key={s.label}
            disabled={!s.available}
            onClick={() => s.available && onSelect(s.label)}
            className="font-cinzel text-[10px] rounded-full transition-all duration-150 hover:scale-105 active:scale-95"
            style={{
              width: "2.2rem",
              height: "2.2rem",
              border: "1.5px solid var(--rj-bone)",
              background: s.available ? "transparent" : "var(--rj-ivory-dark)",
              color: s.available ? "var(--rj-charcoal)" : "var(--rj-bone)",
              opacity: s.available ? 1 : 0.45,
              cursor: s.available ? "pointer" : "not-allowed",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <button
        onClick={onCancel}
        className="font-cinzel text-[8px] tracking-widest text-center mt-0.5 transition-opacity hover:opacity-60"
        style={{
          color: "var(--rj-ash)",
          cursor: "pointer",
          background: "none",
          border: "none",
        }}
      >
        Cancel
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD CAROUSEL
// ─────────────────────────────────────────────────────────────────
export default function ProductCardCarousel({ product }: { product: Product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartAnim, setCartAnim] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ── Stores ────────────────────────────────────────────────────
  const addItem = useCartStore((s) => s.addItem);
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted);

  // Stable wishlist ID: same as CartItem.id convention but without size
  const wishlistId = product.id;
  const wishlisted = isWishlisted(wishlistId);

  // Add this effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Image nav ─────────────────────────────────────────────────
  const prevImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);
    },
    [product.images.length],
  );

  const nextImg = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIdx((i) => (i + 1) % product.images.length);
    },
    [product.images.length],
  );

  // ── Wishlist toggle ───────────────────────────────────────────
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      id: wishlistId,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src ?? "",
      price: product.price,
      priceNum: parseInt(product.price.replace(/[^\d]/g, ""), 10),
      originalPrice: product.originalPrice,
      href: product.href,
      category: product.category,
      tag: product.tag,
    });
  };

  // ── Add to cart (after size selected) ────────────────────────
  const commitToCart = useCallback(
    (size: string) => {
      addItem({
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        image: product.images[0]?.src ?? "",
        price: product.price,
        priceNum: parseInt(product.price.replace(/[^\d]/g, ""), 10),
        originalPrice: product.originalPrice,
        size,
        qty: 1,
        href: product.href,
        category: product.category,
        tag: product.tag,
      });
      setShowSizePicker(false);
      setAddedToCart(true);
      setCartAnim(true);
      setTimeout(() => setAddedToCart(false), 2200);
      setTimeout(() => setCartAnim(false), 400);
    },
    [addItem, product],
  );

  // ── Cart button click ─────────────────────────────────────────
  // If product has only one size (or a "Free" size), add directly.
  // Otherwise show the size picker popover first.
  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addedToCart) return;

    const available = (product.sizes ?? []).filter((s) => s.available);
    if (available.length === 0) return;

    // Single / free size → add immediately
    if (
      available.length === 1 ||
      (available.length === 1 && available[0].label === "Free")
    ) {
      commitToCart(available[0].label);
      return;
    }

    setShowSizePicker((v) => !v);
  };

  const tag = product.tag ? TAG_STYLES[product.tag] : null;

  // console.log(product);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShowSizePicker(false);
        }}
        className="flex flex-col"
        style={{
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(252,193,81,0.55)" : "var(--rj-bone)"}`,
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(252,193,81,0.2)"
            : "0 2px 12px rgba(0,0,0,0.06)",
          transition:
            "box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          cursor: "default",
        }}
      >
        {/* ── Image area ── */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", background: "var(--rj-ivory-dark)" }}
        >
          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[imgIdx].src}
                alt={product.images[imgIdx].alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
                className="object-cover"
                style={{
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tag */}
          {tag && product.tag && (
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span
                className="font-cinzel text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm"
                style={{ background: tag.bg, color: tag.color }}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Info hover */}
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
              className="absolute top-10 right-0 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300"
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
              {product?.ourPromise}
            </div>
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-115"
            style={{
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              cursor: "pointer",
              transform: wishlisted ? "scale(1.15)" : "scale(1)",
            }}
            aria-label={
              wishlisted ? "Remove from wishlist" : "Save to wishlist"
            }
          >
            <Heart
              size={13}
              style={{
                fill: wishlisted ? "var(--rj-gold)" : "transparent",
                color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                transition: "all 0.25s",
              }}
            />
          </button>

          {/* ── DESKTOP: Quick View + Add to Cart overlay ── */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 hidden md:flex flex-col items-center justify-center gap-2.5 z-10"
              >
                <div className="absolute inset-0 bg-[var(--rj-emerald)]/25 backdrop-blur-[1px] pointer-events-none" />

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, delay: 0.04 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuickView(true);
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    color: "var(--rj-emerald)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    minWidth: "140px",
                    justifyContent: "center",
                  }}
                >
                  <Eye size={12} />
                  Quick View
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, delay: 0.09 }}
                  onClick={handleCart}
                  whileTap={{ scale: 0.96 }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-250"
                  style={{
                    background: addedToCart
                      ? "var(--rj-emerald)"
                      : "rgba(255,255,255,0.97)",
                    color: addedToCart ? "#fff" : "var(--rj-charcoal)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    minWidth: "140px",
                    justifyContent: "center",
                  }}
                >
                  {addedToCart ? (
                    <>
                      <Check size={12} /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={12} /> Add to Cart
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini size picker popover (desktop, shown above cart button) */}
          <AnimatePresence>
            {showSizePicker && (
              <SizePicker
                sizes={product.sizes ?? []}
                onSelect={commitToCart}
                onCancel={() => setShowSizePicker(false)}
              />
            )}
          </AnimatePresence>

          {/* Image nav arrows */}
          {product.images.length > 1 && (
            <>
              <AnimatePresence>
                {hovered && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={prevImg}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronLeft size={12} />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      onClick={nextImg}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full hidden md:flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronRight size={12} />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Dots */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setImgIdx(i);
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === imgIdx ? "14px" : "5px",
                      height: "5px",
                      background:
                        i === imgIdx
                          ? "var(--rj-emerald)"
                          : "rgba(255,255,255,0.75)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Card body ── */}
        <Link
          href={product.href}
          className="flex flex-col flex-1 p-3.5 group/link"
          style={{ cursor: "pointer" }}
        >
          {/* Stars */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-1.5">
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
                  className="font-cinzel text-[9px] ml-0.5"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {product.rating.toFixed(1)} · {product.reviewCount} rating
                  {product.reviewCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* Name */}
          <h3
            className="font-cormorant font-light leading-snug mb-0.5 line-clamp-2 transition-colors duration-250 group-hover/link:text-[var(--rj-emerald)]"
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "var(--rj-charcoal)",
            }}
          >
            {product.name}
          </h3>

          {/* Subtitle */}
          {/* <p
            className="text-xs mb-2.5 line-clamp-1"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body, 'DM Sans'), sans-serif",
            }}
          >
            {product.subtitle}
          </p> */}

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto flex-wrap">
            {product.originalPrice && (
              <span
                className="text-xs line-through"
                style={{ color: "var(--rj-ash)" }}
              >
                {product.originalPrice}
              </span>
            )}
            <span
              className="font-cinzel font-bold"
              style={{ fontSize: "0.95rem", color: "var(--rj-emerald)" }}
            >
              {product.price}
            </span>
            {product.originalPrice && (
              <span
                className="font-cinzel text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "#fef2f2", color: "#ef4444" }}
              >
                {Math.round(
                  (1 -
                    parseInt(product.price.replace(/[^\d]/g, "")) /
                      parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
                    100,
                )}
                % OFF
              </span>
            )}
          </div>
        </Link>

        {/* ── MOBILE ONLY: Add to cart ── */}
        <div className="md:hidden px-3.5 pb-3.5 pt-1">
          <motion.button
            onClick={handleCart}
            animate={cartAnim ? { scale: [1, 0.95, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-300"
            style={{
              background: addedToCart
                ? "var(--rj-emerald)"
                : "var(--rj-charcoal)",
              color: "#fff",
              cursor: "pointer",
              boxShadow: addedToCart ? "0 4px 16px rgba(0,55,32,0.25)" : "none",
            }}
          >
            {addedToCart ? (
              <>
                <Check size={11} /> Added to Cart
              </>
            ) : (
              <>
                <Plus size={11} /> Add to Cart
              </>
            )}
          </motion.button>

          {/* Mobile size picker (rendered inline below button) */}
          <AnimatePresence>
            {showSizePicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-2 flex flex-wrap justify-center gap-1.5">
                  {(product.sizes ?? [])
                    .filter((s) => s.available)
                    .map((s) => (
                      <button
                        key={s.label}
                        onClick={() => commitToCart(s.label)}
                        className="font-cinzel text-[10px] rounded-full transition-all duration-150 active:scale-95"
                        style={{
                          width: "2.2rem",
                          height: "2.2rem",
                          border: "1.5px solid var(--rj-bone)",
                          background: "transparent",
                          color: "var(--rj-charcoal)",
                          cursor: "pointer",
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      {quickView && isMounted && (
        <QuickViewModal product={product} onClose={() => setQuickView(false)} />
      )}
    </>
  );
}
