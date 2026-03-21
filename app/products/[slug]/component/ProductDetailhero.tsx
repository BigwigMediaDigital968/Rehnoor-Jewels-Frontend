"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  Star,
  Shield,
  RefreshCw,
  Truck,
  Award,
  ZoomIn,
  ChevronRight as Chevron,
} from "lucide-react";
import type { Product } from "../../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// TRUST BADGES
// ─────────────────────────────────────────────────────────────────
const TRUST = [
  { icon: <Shield size={14} />, label: "BIS Hallmarked" },
  { icon: <Award size={14} />, label: "22kt Pure Gold" },
  { icon: <RefreshCw size={14} />, label: "30-Day Returns" },
  { icon: <Truck size={14} />, label: "Free Shipping" },
];

// ─────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────name───────────────────────────────────────────
interface Props {
  product: Product;
  onAddToCart?: () => void;
}

// ─────────────────────────────────────────────────────────────────
// ZOOM MODAL
// ─────────────────────────────────────────────────────────────────
function ZoomModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(8px)",
          cursor: "zoom-out",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl"
          style={{ aspectRatio: "1/1", cursor: "default" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function ProductDetailHero({ product, onAddToCart }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const images = product.images;

  const prevImg = useCallback(
    () => setImgIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const nextImg = useCallback(
    () => setImgIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    setAddedToCart(true);
    onAddToCart?.();
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const discountPct = product.originalPrice
    ? Math.round(
        (1 -
          parseInt(product.price.replace(/[^\d]/g, "")) /
            parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
          100,
      )
    : 0;

  return (
    <>
      {zoomed && (
        <ZoomModal
          src={images[imgIdx].src}
          alt={images[imgIdx].alt}
          onClose={() => setZoomed(false)}
        />
      )}

      <section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 mb-8 flex-wrap"
            aria-label="Breadcrumb"
          >
            {[
              "Home",
              "Products",
              product.category ?? "Collection",
              product.name,
            ].map((crumb, i, arr) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={
                        i === 0
                          ? "/"
                          : i === 1
                            ? "/products"
                            : `/collections/${(product.category ?? "").toLowerCase()}`
                      }
                      className="font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                      style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                    >
                      {crumb}
                    </Link>
                    <Chevron
                      size={10}
                      style={{ color: "var(--rj-bone)", flexShrink: 0 }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    {crumb}
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            {/* ── LEFT: Image Gallery ── */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
              {/* Main image */}
              <div
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  aspectRatio: "1/1",
                  background: "var(--rj-ivory-dark)",
                  cursor: "zoom-in",
                }}
                onClick={() => setZoomed(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.28 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[imgIdx].src}
                      alt={images[imgIdx].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom hint */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-cinzel text-[9px] tracking-wider"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                  >
                    <ZoomIn size={11} /> Zoom
                  </div>
                </div>

                {/* Tag badge */}
                {product.tag && (
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span
                      className="font-cinzel text-[9px] font-bold tracking-widest px-3 py-1 rounded-full"
                      style={{ background: "var(--rj-gold)", color: "#000" }}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setWishlisted((w) => !w);
                  }}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                  }}
                  aria-label="Wishlist"
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

                {/* Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImg();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImg();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        width: 72,
                        height: 72,
                        border: `2px solid ${i === imgIdx ? "var(--rj-emerald)" : "transparent"}`,
                        background: "var(--rj-ivory-dark)",
                        cursor: "pointer",
                        opacity: i === imgIdx ? 1 : 0.6,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── RIGHT: Product Details ── */}
            <div className="flex flex-col">
              {/* Category + tag */}
              <div className="flex items-center gap-3 mb-3">
                {product.category && (
                  <Link
                    href={`/collections/${product.category.toLowerCase()}`}
                    className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full transition-opacity hover:opacity-70"
                    style={{
                      background: "rgba(0,55,32,0.08)",
                      color: "var(--rj-emerald)",
                      cursor: "pointer",
                    }}
                  >
                    {product.category}
                  </Link>
                )}
                {product.purity && (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(252,193,81,0.1)",
                      color: "#a07800",
                    }}
                  >
                    {product.purity}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className="font-cormorant font-light leading-tight mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h1>

              {/* Subtitle */}
              <p
                className="mb-4"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {product.subtitle}
              </p>

              {/* Rating row */}
              {product.rating && (
                <div
                  className="flex items-center gap-3 mb-5 pb-5"
                  style={{ borderBottom: "1px solid var(--rj-bone)" }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
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
                  <span
                    className="font-cinzel text-xs font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviewCount && (
                    <a
                      href="#reviews"
                      className="font-cinzel text-[10px] tracking-wider transition-opacity hover:opacity-60"
                      style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                    >
                      ({product.reviewCount} reviews)
                    </a>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap mb-6">
                <span
                  className="font-cinzel font-bold"
                  style={{ fontSize: "2rem", color: "var(--rj-charcoal)" }}
                >
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span
                    className="font-body text-base line-through"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {product.originalPrice}
                  </span>
                )}
                {discountPct > 0 && (
                  <span
                    className="font-cinzel text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#fef2f2", color: "#ef4444" }}
                  >
                    {discountPct}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {product.description}
                </p>
              )}

              {/* Size picker */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="font-cinzel text-[11px] tracking-widest uppercase font-bold"
                      style={{
                        color: sizeError ? "#ef4444" : "var(--rj-charcoal)",
                      }}
                    >
                      {sizeError
                        ? "Please select a size"
                        : `Size${selectedSize ? `: ${selectedSize}` : ""}`}
                    </p>
                    <button
                      className="font-cinzel text-[9px] tracking-wider uppercase transition-opacity hover:opacity-60"
                      style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.label}
                        disabled={!s.available}
                        onClick={() => {
                          setSelectedSize(s.label);
                          setSizeError(false);
                        }}
                        className="relative font-cinzel text-xs transition-all duration-200 hover:scale-105"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          border: `2px solid ${selectedSize === s.label ? "var(--rj-emerald)" : sizeError && !selectedSize ? "#fca5a5" : "var(--rj-bone)"}`,
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
              <div className="flex items-center gap-3 mb-4">
                {/* Qty */}
                <div
                  className="flex items-center rounded-full flex-shrink-0"
                  style={{ border: "1.5px solid var(--rj-bone)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
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
                    className="w-11 h-11 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95"
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
                      <Check size={14} /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} /> Add to Cart
                    </>
                  )}
                </button>

                {/* Share */}
                <button
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                  style={{
                    border: "1.5px solid var(--rj-bone)",
                    cursor: "pointer",
                  }}
                  aria-label="Share"
                >
                  {copied ? (
                    <Check size={14} style={{ color: "var(--rj-emerald)" }} />
                  ) : (
                    <Share2 size={14} style={{ color: "var(--rj-ash)" }} />
                  )}
                </button>
              </div>

              {/* Buy Now */}
              <button
                className="w-full py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 mb-6"
                style={{
                  background: "var(--rj-charcoal)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Buy It Now
              </button>

              {/* Trust strip */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6"
                style={{ borderTop: "1px solid var(--rj-bone)" }}
              >
                {TRUST.map((t) => (
                  <div
                    key={t.label}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,55,32,0.06)" }}
                    >
                      <span style={{ color: "var(--rj-emerald)" }}>
                        {t.icon}
                      </span>
                    </div>
                    <span
                      className="font-cinzel text-[9px] tracking-wider"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
