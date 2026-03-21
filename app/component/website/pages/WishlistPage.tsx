"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Star,
  Share2,
  Check,
  X,
  Package,
} from "lucide-react";
import { useWishlistStore, useCartStore } from "../../../store/cartStore";

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

// ─────────────────────────────────────────────────────────────────
// EMPTY WISHLIST
// ─────────────────────────────────────────────────────────────────
function EmptyWishlist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
        style={{
          background: "rgba(252,193,81,0.08)",
          border: "1px solid rgba(252,193,81,0.2)",
        }}
      >
        <Heart size={40} style={{ color: "var(--rj-gold)", opacity: 0.5 }} />
      </motion.div>
      <h2
        className="font-cormorant text-3xl font-light mb-3"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Your wishlist is empty
      </h2>
      <p
        className="font-cinzel text-xs tracking-widest uppercase mb-8"
        style={{ color: "var(--rj-ash)" }}
      >
        Save pieces you love for later
      </p>
      <Link
        href="/products"
        className="btn-primary"
        style={{
          display: "inline-flex",
          background: "var(--gradient-gold)",
          color: "var(--rj-emerald)",
          cursor: "pointer",
        }}
      >
        Explore Collections <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SIZE SELECTOR POPOVER (inline — appears on "Move to Cart")
// ─────────────────────────────────────────────────────────────────
const COMMON_SIZES = [
  { label: '16"' },
  { label: '18"' },
  { label: '20"' },
  { label: '22"' },
  { label: "S" },
  { label: "M" },
  { label: "L" },
  { label: "XL" },
  { label: "18" },
  { label: "20" },
  { label: "Free" },
];

function SizePopover({
  onSelect,
  onClose,
}: {
  onSelect: (s: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-0 mb-2 z-30 rounded-xl p-3 w-56"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 12px 36px rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <p
          className="font-cinzel text-[9px] tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Select Size
        </p>
        <button onClick={onClose} style={{ cursor: "pointer" }}>
          <X size={12} style={{ color: "var(--rj-ash)" }} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {COMMON_SIZES.map((s) => (
          <button
            key={s.label}
            onClick={() => onSelect(s.label)}
            className="font-cinzel text-[9px] tracking-wider px-2.5 py-1.5 rounded-full transition-all hover:scale-105"
            style={{
              border: "1px solid var(--rj-bone)",
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
  );
}

// ─────────────────────────────────────────────────────────────────
// WISHLIST CARD
// ─────────────────────────────────────────────────────────────────
function WishlistCard({
  item,
}: {
  item: ReturnType<typeof useWishlistStore.getState>["items"][0];
}) {
  const { removeItem, moveToCart } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [showSizes, setShowSizes] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [movedToCart, setMovedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 300);
  };

  const handleMoveToCart = (size: string) => {
    setShowSizes(false);
    moveToCart(item.id, size, addToCart);
    setMovedToCart(true);
  };

  const discountPct = item.originalPrice
    ? Math.round(
        (1 -
          item.priceNum /
            parseInt(item.originalPrice.replace(/[^\d]/g, ""), 10)) *
          100,
      )
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{
        opacity: removing ? 0 : 1,
        scale: removing ? 0.94 : 1,
        y: removing ? -8 : 0,
      }}
      exit={{ opacity: 0, scale: 0.94, height: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col"
      style={{
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "var(--rj-bone)"}`,
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.08), 0 0 0 1px rgba(252,193,81,0.12)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <Link
        href={item.href}
        className="relative overflow-hidden block"
        style={{
          aspectRatio: "1/1",
          background: "var(--rj-ivory-dark)",
          cursor: "pointer",
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 50vw, 33vw"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Tag */}
        {item.tag && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span
              className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: "var(--rj-gold)", color: "#000" }}
            >
              {item.tag}
            </span>
          </div>
        )}

        {/* Added date */}
        <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
          <span
            className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.5)",
              color: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            Saved{" "}
            {new Date(item.addedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        {/* Remove from wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRemove();
          }}
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.92)", cursor: "pointer" }}
        >
          <Heart
            size={13}
            style={{ fill: "var(--rj-gold)", color: "var(--rj-gold)" }}
          />
        </button>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3.5">
        <Link href={item.href} style={{ cursor: "pointer" }}>
          <h3
            className="font-cormorant font-light leading-snug mb-0.5 hover:text-[var(--rj-emerald)] transition-colors line-clamp-1"
            style={{
              fontSize: "clamp(0.9rem,1.5vw,1.05rem)",
              color: "var(--rj-charcoal)",
            }}
          >
            {item.name}
          </h3>
        </Link>
        <p
          className="text-[10px] mb-2 line-clamp-1"
          style={{ color: "var(--rj-ash)" }}
        >
          {item.subtitle}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {item.originalPrice && (
            <span
              className="text-[10px] line-through"
              style={{ color: "var(--rj-ash)" }}
            >
              {item.originalPrice}
            </span>
          )}
          <span
            className="font-cinzel font-bold"
            style={{ fontSize: "0.9rem", color: "var(--rj-emerald)" }}
          >
            {item.price}
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

        {/* Actions */}
        <div className="relative mt-auto">
          <AnimatePresence>
            {showSizes && (
              <SizePopover
                onSelect={handleMoveToCart}
                onClose={() => setShowSizes(false)}
              />
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowSizes((s) => !s)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-250 active:scale-95"
            style={{
              background: movedToCart
                ? "var(--rj-emerald)"
                : "var(--rj-charcoal)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {movedToCart ? (
              <>
                <Check size={11} /> Moved to Cart
              </>
            ) : (
              <>
                <ShoppingBag size={11} /> Move to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SHARE WISHLIST BUTTON
// ─────────────────────────────────────────────────────────────────
function ShareWishlist() {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase transition-all hover:opacity-70"
      style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
    >
      {copied ? (
        <>
          <Check size={12} /> Copied!
        </>
      ) : (
        <>
          <Share2 size={12} /> Share Wishlist
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// MOVE ALL TO CART
// ─────────────────────────────────────────────────────────────────
function MoveAllToCart() {
  const { items, clearAll } = useWishlistStore();
  const { addItem } = useCartStore();
  const [done, setDone] = useState(false);

  const handleMoveAll = () => {
    items.forEach((item) => {
      addItem({
        productId: item.productId,
        name: item.name,
        subtitle: item.subtitle,
        image: item.image,
        price: item.price,
        priceNum: item.priceNum,
        originalPrice: item.originalPrice,
        size: "Default",
        qty: 1,
        href: item.href,
        category: item.category,
        tag: item.tag,
      });
    });
    clearAll();
    setDone(true);
  };

  return (
    <button
      onClick={handleMoveAll}
      disabled={done}
      className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-4 py-2 rounded-full transition-all"
      style={{
        border: "1.5px solid var(--rj-emerald)",
        color: done ? "#fff" : "var(--rj-emerald)",
        background: done ? "var(--rj-emerald)" : "transparent",
        cursor: done ? "default" : "pointer",
      }}
    >
      {done ? (
        <>
          <Check size={11} /> Moved!
        </>
      ) : (
        <>
          <Package size={11} /> Move All to Cart
        </>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function WishlistPage() {
  const { items, clearAll } = useWishlistStore();
  const [sortBy, setSortBy] = useState<"recent" | "price-asc" | "price-desc">(
    "recent",
  );

  const sorted = [...items].sort((a, b) => {
    if (sortBy === "price-asc") return a.priceNum - b.priceNum;
    if (sortBy === "price-desc") return b.priceNum - a.priceNum;
    return b.addedAt - a.addedAt;
  });

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          background: "var(--rj-charcoal)",
          paddingTop: "6rem",
          paddingBottom: "2.5rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-4">
            {["Home", "Wishlist"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href="/"
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60"
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-gold)" }}
              >
                ✦ Your Saved Pieces
              </p>
              <h1 className="heading-lg text-white">Wishlist</h1>
            </div>
            {items.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <ShareWishlist />
                <MoveAllToCart />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-rj py-12">
        {items.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <p
                className="font-cinzel text-xs tracking-widest"
                style={{ color: "var(--rj-ash)" }}
              >
                {items.length} saved piece{items.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="font-cinzel text-[10px] tracking-wider outline-none px-3 py-2 rounded-lg"
                  style={{
                    border: "1px solid var(--rj-bone)",
                    background: "#fff",
                    color: "var(--rj-ash)",
                    cursor: "pointer",
                  }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                </select>

                {/* Clear all */}
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                >
                  <Trash2 size={11} /> Clear All
                </button>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {sorted.map((item, i) => (
                  <WishlistCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* You might also like CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-16 text-center"
            >
              <div className="divider-gold-center mb-4" />
              <p
                className="font-cinzel text-xs tracking-widest uppercase mb-4"
                style={{ color: "var(--rj-ash)" }}
              >
                Discover more gold
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 btn-outline"
                style={{
                  display: "inline-flex",
                  color: "var(--rj-emerald)",
                  borderColor: "var(--rj-emerald)",
                  cursor: "pointer",
                }}
              >
                Browse All Products <ArrowRight size={13} />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
