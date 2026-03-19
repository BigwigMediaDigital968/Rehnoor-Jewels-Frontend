"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  Check,
  Heart,
} from "lucide-react";
import type { Product } from "../../../../types/Product.types";

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  New: { bg: "#4ade80", color: "#000" },
  Bestseller: { bg: "var(--rj-gold)", color: "#000" },
  Limited: { bg: "#f87171", color: "#fff" },
  Sale: { bg: "#f87171", color: "#fff" },
  Exclusive: { bg: "#c084fc", color: "#000" },
  Trending: { bg: "#fb923c", color: "#000" },
  Popular: { bg: "#60a5fa", color: "#000" },
};

export default function QuickViewModal({
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

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const prevImg = () =>
    setImgIdx((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImg = () => setImgIdx((i) => (i + 1) % product.images.length);

  const handleAdd = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  const discountPct = product.originalPrice
    ? Math.round(
        (1 -
          parseInt(product.price.replace(/[^\d]/g, "")) /
            parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
          100,
      )
    : 0;

  const modal = (
    <AnimatePresence>
      <motion.div
        key="qv-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 flex items-end sm:items-center justify-center"
        style={{
          zIndex: 9999,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          // Mobile: sheet slides up from bottom (items-end)
          // Desktop: centred (items-center)
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
      >
        <motion.div
          key="qv-panel"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            cursor: "default",
            width: "100%",
            maxWidth: "860px",
            // Mobile: full-width sheet, max 92vh, rounded top corners only
            // Desktop: centred card with all rounded corners
            borderRadius: "20px 20px 0 0",
            maxHeight: "92vh",
            overflowY: "auto",
            position: "relative",
          }}
          // Override border-radius on sm+ via inline media query workaround:
          // We use a data attribute and a <style> tag below
          data-qv="panel"
        >
          {/* Rounded corners on all sides for sm+ */}
          <style>{`
            @media (min-width: 640px) {
              [data-qv="panel"] { border-radius: 20px !important; margin: 1rem; max-height: 88vh; }
            }
          `}</style>

          {/* ── Mobile drag handle ── */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
          </div>

          {/* ── Close button ── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
            style={{
              background: "var(--rj-charcoal)",
              color: "#fff",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <X size={14} />
          </button>

          {/*
            Layout:
            Mobile  → single column: image on top, details below (stacked)
            Desktop → two columns: image left, details right (side by side)
          */}
          <div className="flex flex-col sm:grid sm:grid-cols-2">
            {/* ── LEFT: Image panel ── */}
            <div
              className="relative overflow-hidden flex-shrink-0"
              style={{
                // Mobile: fixed square-ish height so image is always visible
                // Desktop: fills the left column height naturally
                height: "min(56vw, 320px)",
                minHeight: "220px",
                background: "var(--rj-ivory-dark)",
                // Radius: top-left only on mobile (sheet), top-left + bottom-left on desktop
                borderRadius: "20px 20px 0 0",
              }}
            >
              <style>{`
                @media (min-width: 640px) {
                  [data-qv="img-panel"] {
                    height: 100% !important;
                    min-height: 420px !important;
                    border-radius: 20px 0 0 20px !important;
                  }
                }
              `}</style>
              <div
                data-qv="img-panel"
                className="absolute inset-0"
                style={{
                  height: "min(56vw, 320px)",
                  minHeight: "220px",
                  background: "var(--rj-ivory-dark)",
                  borderRadius: "20px 20px 0 0",
                  overflow: "hidden",
                }}
              >
                {/* Sliding image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.26 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[imgIdx].src}
                      alt={product.images[imgIdx].alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Tag pill */}
                {product.tag && (
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className="font-cinzel text-[8px] font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm"
                      style={TAG_STYLES[product.tag] || TAG_STYLES.New}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Prev / Next arrows — only when multiple images */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImg}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={nextImg}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </>
                )}

                {/* Thumbnail row — bottom of image */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10 px-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className="relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0"
                        style={{
                          width: 44,
                          height: 44,
                          border: `2px solid ${i === imgIdx ? "var(--rj-emerald)" : "rgba(255,255,255,0.5)"}`,
                          opacity: i === imgIdx ? 1 : 0.65,
                          cursor: "pointer",
                          background: "var(--rj-ivory-dark)",
                        }}
                        aria-label={`View image ${i + 1}`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Product details ── */}
            <div
              className="flex flex-col p-5 sm:p-7 overflow-y-auto"
              style={{ maxHeight: "88vh" }}
            >
              {/* Stars + reviews */}
              {product.rating && (
                <div className="flex items-center gap-1.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
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
                      className="font-cinzel text-[10px]"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {product.rating.toFixed(1)} · {product.reviewCount} review
                      {product.reviewCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              )}

              {/* Name */}
              <h2
                className="font-cormorant font-light leading-tight mb-1"
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.9rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h2>

              {/* Subtitle */}
              <p className="text-sm mb-2" style={{ color: "var(--rj-ash)" }}>
                {product.subtitle}
              </p>

              {/* Category pill */}
              {product.category && (
                <span
                  className="inline-block font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-4 w-fit"
                  style={{
                    background: "rgba(0,55,32,0.07)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  {product.category}
                </span>
              )}

              {/* Description */}
              {product.description && (
                <p
                  className="text-sm leading-relaxed mb-4 pt-3"
                  style={{
                    color: "var(--rj-ash)",
                    borderTop: "1px solid var(--rj-bone)",
                  }}
                >
                  {product.description}
                </p>
              )}

              {/* Price row */}
              <div className="flex items-center gap-2.5 flex-wrap mb-5">
                <span
                  className="font-cinzel font-bold"
                  style={{ fontSize: "1.4rem", color: "var(--rj-charcoal)" }}
                >
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-sm line-through"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {product.originalPrice}
                  </span>
                )}
                {discountPct > 0 && (
                  <span
                    className="font-cinzel text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#fef2f2", color: "#ef4444" }}
                  >
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Size picker */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2.5"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Size:{" "}
                    <span
                      style={{
                        color: selectedSize
                          ? "var(--rj-emerald)"
                          : "var(--rj-ash)",
                      }}
                    >
                      {selectedSize || "Select"}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.label}
                        disabled={!s.available}
                        onClick={() => setSelectedSize(s.label)}
                        className="relative font-cinzel text-xs transition-all duration-200"
                        style={{
                          width: "2.75rem",
                          height: "2.75rem",
                          borderRadius: "50%",
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
                          transform:
                            selectedSize === s.label
                              ? "scale(1.08)"
                              : "scale(1)",
                        }}
                        aria-label={`Size ${s.label}${!s.available ? " — unavailable" : ""}`}
                      >
                        {s.label}
                        {!s.available && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div
                              className="w-full h-px rotate-45"
                              style={{ background: "var(--rj-bone)" }}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to Cart + Wishlist */}
              <div className="flex items-center gap-2.5 mb-3">
                {/* Qty stepper */}
                <div
                  className="flex items-center rounded-full overflow-hidden select-none flex-shrink-0"
                  style={{ border: "1.5px solid var(--rj-bone)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)]"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                    aria-label="Decrease quantity"
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
                    className="w-10 h-10 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)]"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95"
                  style={{
                    background: addedToCart
                      ? "var(--rj-emerald)"
                      : "var(--gradient-gold)",
                    color: addedToCart ? "#fff" : "var(--rj-emerald)",
                    boxShadow: addedToCart
                      ? "0 4px 20px rgba(0,55,32,0.25)"
                      : "0 4px 20px rgba(252,193,81,0.3)",
                    cursor: "pointer",
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

                {/* Wishlist */}
                <button
                  onClick={() => setWishlisted((w) => !w)}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 flex-shrink-0"
                  style={{
                    border: `1.5px solid ${wishlisted ? "var(--rj-gold)" : "var(--rj-bone)"}`,
                    background: wishlisted
                      ? "rgba(252,193,81,0.08)"
                      : "transparent",
                    cursor: "pointer",
                  }}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={15}
                    style={{
                      fill: wishlisted ? "var(--rj-gold)" : "transparent",
                      color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                      transition: "all 0.25s",
                    }}
                  />
                </button>
              </div>

              {/* Buy Now */}
              <Link
                href={product.href}
                onClick={onClose}
                className="flex items-center justify-center py-3 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 mb-4"
                style={{
                  background: "var(--rj-charcoal)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Buy It Now
              </Link>

              {/* Trust strip */}
              <div
                className="flex flex-wrap items-center justify-center gap-3 pt-4"
                style={{ borderTop: "1px solid var(--rj-bone)" }}
              >
                {["⚜ BIS Hallmarked", "✂ Free Sizing", "↩ 30-Day Returns"].map(
                  (t) => (
                    <span
                      key={t}
                      className="font-cinzel text-[9px] tracking-wider"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
