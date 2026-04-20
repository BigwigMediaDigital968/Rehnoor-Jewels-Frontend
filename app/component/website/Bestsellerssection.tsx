"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Eye,
  ArrowRight,
  Star,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RefreshCw,
  Info,
} from "lucide-react";
import { useCartStore, useWishlistStore } from "../../store/cartStore";
import { useProducts } from "../../lib/hooks/useProducts";
import { fmt, calcDiscount, type ApiProduct } from "../../lib/api/productLive";

// ─────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────
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
      <div className="p-4 space-y-2.5">
        <div
          className="h-2 w-1/3 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
        <div
          className="h-4 w-2/3 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
        <div className="flex gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
          ))}
        </div>
        <div
          className="h-3 w-1/2 rounded-full"
          style={{ background: "var(--rj-bone)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// QUICK VIEW MODAL
// ─────────────────────────────────────────────────────────────────
function QuickViewModal({
  product,
  onClose,
}: {
  product: ApiProduct;
  onClose: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0].label : null,
  );
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  const discount = calcDiscount(product.price, product.originalPrice);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const wishlisted = mounted && isWishlisted(product._id);

  const handleAddToCart = () => {
    const needsSize =
      product.sizes.length > 1 ||
      (product.sizes.length === 1 && product.sizes[0].label !== "Free");
    if (needsSize && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart({
      productId: product._id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src ?? "",
      price: fmt(product.price),
      priceNum: product.price,
      originalPrice: product.originalPrice
        ? fmt(product.originalPrice)
        : undefined,
      size: selectedSize ?? product.sizes[0]?.label ?? "Free",
      qty,
      href: `/products/${product.slug}`,
      tag: product.tag,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleToggleWishlist = () => {
    toggleItem({
      id: product._id,
      productId: product._id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src ?? "",
      price: fmt(product.price),
      priceNum: product.price,
      originalPrice: product.originalPrice
        ? fmt(product.originalPrice)
        : undefined,
      href: `/products/${product.slug}`,
      category: product.category,
      tag: product.tag,
    });
  };

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
          data-qv="panel"
          style={{
            background: "#fff",
            cursor: "default",
            width: "100%",
            maxWidth: "860px",
            borderRadius: "20px 20px 0 0",
            maxHeight: "92vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <style>{`
            @media (min-width: 640px) {
              [data-qv="panel"]   { border-radius: 20px !important; margin: 1rem; max-height: 88vh; }
              [data-qv="img-col"] { height: 100% !important; min-height: 440px !important; border-radius: 20px 0 0 20px !important; }
            }
          `}</style>

          {/* Mobile drag handle */}
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div
              className="w-10 h-1 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
          </div>

          {/* Close */}
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

          <div className="flex flex-col sm:grid sm:grid-cols-2">
            {/* Image column */}
            <div
              data-qv="img-col"
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                height: "min(56vw, 320px)",
                minHeight: 220,
                background: "var(--rj-ivory-dark)",
                borderRadius: "20px 20px 0 0",
              }}
            >
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
                    src={product.images[imgIdx]?.src ?? ""}
                    alt={product.images[imgIdx]?.alt ?? product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {product.tag && (
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span
                    className="font-cinzel text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm"
                    style={{ background: "var(--rj-gold)", color: "#000" }}
                  >
                    {product.tag ?? product}
                  </span>
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImgIdx(
                        (i) =>
                          (i - 1 + product.images.length) %
                          product.images.length,
                      )
                    }
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
                    onClick={() =>
                      setImgIdx((i) => (i + 1) % product.images.length)
                    }
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

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10 px-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className="relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0"
                        style={{
                          width: 44,
                          height: 44,
                          border: `2px solid ${i === imgIdx ? "var(--rj-emerald)" : "rgba(255,255,255,0.4)"}`,
                          opacity: i === imgIdx ? 1 : 0.65,
                          cursor: "pointer",
                          background: "var(--rj-ivory-dark)",
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={`View ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details column */}
            <div
              className="flex flex-col p-5 sm:p-7"
              style={{ maxHeight: "88vh", overflowY: "auto" }}
            >
              {/* Stars */}
              {/* <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, m) => (
                    <Star
                      key={m}
                      size={12}
                      style={{
                        fill:
                          m < Math.floor(product.rating ?? 0)
                            ? "var(--rj-gold)"
                            : "transparent",
                        color:
                          m < Math.floor(product.rating ?? 0)
                            ? "var(--rj-gold)"
                            : "var(--rj-bone)",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="font-cinzel text-[10px]"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {product.rating} · {product.reviewCount} reviews
                </span>
              </div> */}

              <h2
                className="font-cormorant font-light leading-tight mb-1"
                style={{
                  fontSize: "clamp(1.35rem, 2.5vw, 1.9rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h2>

              <p
                className="text-sm mb-2"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {product.purity} · {product.weightGrams}
              </p>

              <span
                className="inline-block font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-4 w-fit"
                style={{
                  background: "rgba(0,55,32,0.07)",
                  color: "var(--rj-emerald)",
                }}
              >
                {product.category}
              </span>

              <p
                className="text-sm leading-relaxed mb-4 pt-3"
                style={{
                  color: "var(--rj-ash)",
                  borderTop: "1px solid var(--rj-bone)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {product.shortDescription || product.longDescription}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap mb-5">
                <span
                  className="font-cinzel font-bold"
                  style={{ fontSize: "1.45rem", color: "var(--rj-charcoal)" }}
                >
                  {fmt(product.price)}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-sm line-through"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {fmt(product.originalPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span
                    className="font-cinzel text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#fef2f2", color: "#ef4444" }}
                  >
                    {discount}% OFF
                  </span>
                )}
              </div>

              {/* Size picker */}
              {!(
                product.sizes.length === 1 && product.sizes[0].label === "Free"
              ) && (
                <div className="mb-5">
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2.5"
                    style={{
                      color: sizeError ? "#ef4444" : "var(--rj-charcoal)",
                    }}
                  >
                    Size:{" "}
                    <span
                      style={{
                        color: selectedSize
                          ? "var(--rj-emerald)"
                          : sizeError
                            ? "#ef4444"
                            : "var(--rj-ash)",
                      }}
                    >
                      {selectedSize || (sizeError ? "Required!" : "Select")}
                    </span>
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
                        className="relative font-cinzel text-xs transition-all duration-200"
                        style={{
                          width: "2.75rem",
                          height: "2.75rem",
                          borderRadius: "50%",
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
                          transform:
                            selectedSize === s.label
                              ? "scale(1.08)"
                              : "scale(1)",
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Cart + Wishlist */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="flex items-center rounded-full flex-shrink-0"
                  style={{ border: "1.5px solid var(--rj-bone)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                  >
                    <Minus size={13} />
                  </button>
                  <span
                    className="w-8 text-center font-cinzel text-sm"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
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

                <button
                  onClick={handleToggleWishlist}
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

              {/* View Full Details */}
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-center gap-2 py-3 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 mb-4"
                style={{
                  background: "var(--rj-charcoal)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                View Full Details <ArrowRight size={13} />
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

// ─────────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: ApiProduct }) {
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const discount = calcDiscount(product.price, product.originalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product._id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src ?? "",
      price: fmt(product.price),
      priceNum: product.price,
      originalPrice: product.originalPrice
        ? fmt(product.originalPrice)
        : undefined,
      size: product.sizes[0]?.label ?? "Free",
      qty: 1,
      href: `/products/${product.slug}`,
      tag: product.tag,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      id: product._id,
      productId: product._id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src ?? "",
      price: fmt(product.price),
      priceNum: product.price,
      originalPrice: product.originalPrice
        ? fmt(product.originalPrice)
        : undefined,
      href: `/products/${product.slug}`,
      category: product.category,
      tag: product.tag,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="card-product group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="card-product-image">
          <AnimatePresence mode="wait">
            <motion.div
              key={hovered ? "hover" : "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={
                  hovered && product.images[1]
                    ? product.images[1].src
                    : (product.images[0]?.src ?? "")
                }
                alt={product.name}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.tag && <span className="badge-gold">{product.tag}</span>}
            {discount > 0 && (
              <span className="badge-emerald">-{discount}%</span>
            )}
          </div>

          {/* Info hover */}
          {/* <div className="absolute top-3 right-14 z-20 group">
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
          </div> */}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            style={{ cursor: "pointer" }}
          >
            <Heart
              size={14}
              style={{
                fill: wishlisted ? "var(--rj-gold)" : "transparent",
                color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                transition: "all 0.25s",
              }}
            />
          </button>

          {/* Hover actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 text-[10px] font-cinzel tracking-wider uppercase transition-all duration-250 active:scale-95"
              style={{
                background: addedToCart
                  ? "var(--rj-gold)"
                  : "var(--rj-emerald)",
                color: addedToCart ? "var(--rj-emerald)" : "var(--rj-gold)",
                cursor: "pointer",
              }}
            >
              {addedToCart ? (
                <>
                  <Check size={11} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={12} /> Add to Cart
                </>
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickView(true);
              }}
              className="w-9 flex items-center justify-center transition-colors hover:bg-[var(--rj-gold)] hover:text-[var(--rj-emerald)]"
              style={{
                background: "white",
                color: "var(--rj-charcoal)",
                cursor: "pointer",
              }}
              aria-label="Quick view"
            >
              <Eye size={14} />
            </button>
          </div>
        </div>

        {/* Info */}
        <Link
          href={`/products/${product.slug}`}
          className="block p-4"
          style={{ cursor: "pointer" }}
        >
          {/* <p className="label-accent text-[var(--rj-ash)] text-[9px] mb-1">
            {product.purity} · {product.weightGrams}
          </p> */}
          <h3 className="font-cormorant text-[var(--rj-charcoal)] text-lg leading-tight mb-2 group-hover:text-[var(--rj-emerald)] transition-colors duration-300">
            {product.name}
          </h3>
          {/* Reviews and Rating */}
          {/* <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  style={{
                    fill:
                      i < Math.floor(product.rating ?? 0)
                        ? "var(--rj-gold)"
                        : "transparent",
                    color:
                      i < Math.floor(product.rating ?? 0)
                        ? "var(--rj-gold)"
                        : "var(--rj-bone)",
                  }}
                />
              ))}
            </div>
            <span className="text-[var(--rj-ash)] text-[10px]">
              ({product.reviewCount})
            </span>
          </div> */}
          <div className="flex items-baseline gap-2">
            <span className="price-tag text-[var(--rj-emerald)]">
              {fmt(product.price)}
            </span>
            {product.originalPrice && (
              <span className="price-original">
                {fmt(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span
                className="font-cinzel text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: "#fef2f2", color: "#ef4444" }}
              >
                {discount}%
              </span>
            )}
          </div>
        </Link>
      </motion.div>

      {quickView && (
        <QuickViewModal product={product} onClose={() => setQuickView(false)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// FLOATING Cart INDICATORS
// ─────────────────────────────────────────────────────────────────
function FloatingIndicators() {
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || (cartCount === 0 && wishlistCount === 0)) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <AnimatePresence>
        {(cartCount ?? 0) > 0 && (
          <motion.div
            key="cart-indicator"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <Link
              href="/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-[10px] tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: "rgba(0,55,32,0.08)",
                border: "1px solid rgba(0,55,32,0.15)",
                color: "var(--rj-emerald)",
                cursor: "pointer",
              }}
            >
              <ShoppingBag size={12} /> Cart
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px]"
                style={{ background: "var(--rj-emerald)", color: "#fff" }}
              >
                {cartCount}
              </span>
            </Link>
          </motion.div>
        )}
        {wishlistCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              delay: 0.05,
            }}
          >
            <Link
              href="/wishlist"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-[10px] tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: "rgba(252,193,81,0.1)",
                border: "1px solid rgba(252,193,81,0.3)",
                color: "#a07800",
                cursor: "pointer",
              }}
            >
              <Heart
                size={12}
                style={{ fill: "var(--rj-gold)", color: "var(--rj-gold)" }}
              />{" "}
              Saved
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px]"
                style={{
                  background: "var(--rj-gold)",
                  color: "var(--rj-emerald)",
                }}
              >
                {wishlistCount}
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function BestsellerSection() {
  const {
    filtered,
    loading,
    error,
    reload,
    categories,
    activeFilter,
    setActiveFilter,
  } = useProducts({ bestseller: true, limit: 20 });

  // console.log(categories);

  return (
    <section className="section-padding bg-white">
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="label-accent text-[var(--rj-emerald)] mb-3">
            ✦ OUR Gems
          </p>
          <h2 className="heading-lg text-[var(--rj-charcoal)] mb-4">
            Luxury Gold Plated Jewellery Designs
          </h2>
          <p className="text-[var(--rj-ash)] max-w-md mx-auto">
            Discover timeless designs that blend elegance and modern style -
            crafted to elevate every look.
          </p>
          <div className="divider-gold-center mt-6" />
          <FloatingIndicators />
        </div>

        {/* Error banner */}
        {error && !loading && (
          <div
            className="flex items-center justify-between py-3 px-4 rounded-xl mb-8"
            style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
          >
            <p className="font-cinzel text-[10px] tracking-widest text-red-500">
              {error}
            </p>
            <button
              onClick={reload}
              className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-widest uppercase text-red-500"
              style={{ cursor: "pointer" }}
            >
              <RefreshCw size={10} /> Retry
            </button>
          </div>
        )}

        {/* Category filter pills — derived from live API data */}
        {!loading && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 font-cinzel font-semibold text-[12px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-[var(--rj-emerald)] text-[var(--rj-gold)] shadow-lg"
                    : "bg-transparent border border-[var(--rj-bone)] text-[var(--rj-ash)] hover:border-[var(--rj-emerald)] hover:text-[var(--rj-emerald)]"
                }`}
                style={{ cursor: "pointer" }}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* Skeleton grid while loading */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Live product grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
            >
              {filtered?.slice(0, 8)?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-primary inline-flex group"
            style={{
              display: "inline-flex",
              background: "var(--gradient-gold)",
              color: "var(--rj-emerald)",
            }}
          >
            View All Products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
