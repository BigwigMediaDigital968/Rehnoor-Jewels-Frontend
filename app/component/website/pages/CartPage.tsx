"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  Tag,
  X,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Shield,
  RefreshCw,
  Truck,
  Check,
  Gift,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "../../../store/cartStore";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

// ─────────────────────────────────────────────────────────────────
// EMPTY CART
// ─────────────────────────────────────────────────────────────────
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-2xl flex items-center justify-center mb-8"
        style={{
          background: "rgba(0,55,32,0.06)",
          border: "1px solid rgba(0,55,32,0.1)",
        }}
      >
        <ShoppingBag
          size={40}
          style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
        />
      </motion.div>
      <h2
        className="font-cormorant text-3xl font-light mb-3"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Your cart is empty
      </h2>
      <p
        className="font-cinzel text-xs tracking-widest uppercase mb-8"
        style={{ color: "var(--rj-ash)" }}
      >
        Add some gold to your life
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
        Shop Now <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CART ITEM ROW
// ─────────────────────────────────────────────────────────────────
function CartItemRow({
  item,
}: {
  item: ReturnType<typeof useCartStore.getState>["items"][0];
}) {
  const { removeItem, updateQty } = useCartStore();
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 300);
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: removing ? 0 : 1, x: removing ? -40 : 0 }}
      exit={{ opacity: 0, x: -40, height: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 py-5"
      style={{ borderBottom: "1px solid var(--rj-bone)" }}
    >
      {/* Image */}
      <Link
        href={item.href}
        className="relative flex-shrink-0 rounded-xl overflow-hidden"
        style={{
          width: 96,
          height: 96,
          background: "var(--rj-ivory-dark)",
          cursor: "pointer",
        }}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {item.tag && (
            <span
              className="font-cinzel text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-1 inline-block"
              style={{ background: "var(--rj-gold)", color: "#000" }}
            >
              {item.tag}
            </span>
          )}
          <Link href={item.href}>
            <h3
              className="font-cormorant font-light leading-tight hover:text-[var(--rj-emerald)] transition-colors"
              style={{
                fontSize: "1.05rem",
                color: "var(--rj-charcoal)",
                cursor: "pointer",
              }}
            >
              {item.name}
            </h3>
          </Link>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {item.subtitle}
          </p>
          <p
            className="font-cinzel text-[10px] tracking-wider mt-1"
            style={{ color: "var(--rj-emerald)" }}
          >
            Size: {item.size}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
          {/* Qty stepper */}
          <div
            className="flex items-center rounded-full"
            style={{ border: "1.5px solid var(--rj-bone)" }}
          >
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
              style={{ cursor: "pointer", color: "var(--rj-charcoal)" }}
            >
              <Minus size={12} />
            </button>
            <span
              className="w-7 text-center font-cinzel text-sm"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
              style={{ cursor: "pointer", color: "var(--rj-charcoal)" }}
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="flex items-baseline gap-2 justify-end">
              <span
                className="font-cinzel font-bold"
                style={{ fontSize: "1rem", color: "var(--rj-charcoal)" }}
              >
                {fmt(item.priceNum * item.qty)}
              </span>
              {item.qty > 1 && (
                <span
                  className="font-cinzel text-[9px]"
                  style={{ color: "var(--rj-ash)" }}
                >
                  ({fmt(item.priceNum)} each)
                </span>
              )}
            </div>
            {discountPct > 0 && (
              <span
                className="font-cinzel text-[9px] font-bold"
                style={{ color: "#ef4444" }}
              >
                {discountPct}% OFF
              </span>
            )}
          </div>

          {/* Remove */}
          <button
            onClick={handleRemove}
            className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-60"
            style={{ color: "var(--rj-ash)", cursor: "pointer" }}
          >
            <Trash2 size={11} /> Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// COUPON INPUT
// ─────────────────────────────────────────────────────────────────
function CouponSection() {
  const { coupon, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = () => {
    const ok = applyCoupon(code.trim());
    if (ok) {
      setError("");
      setSuccess(true);
      setCode("");
    } else {
      setError("Invalid coupon code. Try GOLD10 or REHNOOR20");
      setSuccess(false);
    }
  };

  if (coupon) {
    return (
      <div
        className="flex items-center justify-between p-3.5 rounded-xl"
        style={{
          background: "rgba(0,55,32,0.06)",
          border: "1.5px solid rgba(0,55,32,0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <Check size={14} style={{ color: "var(--rj-emerald)" }} />
          <div>
            <p
              className="font-cinzel text-xs font-bold"
              style={{ color: "var(--rj-emerald)" }}
            >
              {coupon} applied!
            </p>
            <p
              className="font-cinzel text-[9px] tracking-wider"
              style={{ color: "var(--rj-ash)" }}
            >
              You save {fmt(couponDiscount)}
            </p>
          </div>
        </div>
        <button onClick={removeCoupon} style={{ cursor: "pointer" }}>
          <X size={14} style={{ color: "var(--rj-ash)" }} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--rj-ash)" }}
          />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
              setSuccess(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Coupon code"
            className="w-full pl-9 pr-3 py-2.5 font-cinzel text-xs tracking-wider outline-none"
            style={{
              background: "#fff",
              border: `1px solid ${error ? "#fca5a5" : "var(--rj-bone)"}`,
              borderRadius: "8px",
              color: "var(--rj-charcoal)",
            }}
          />
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-lg transition-all"
          style={{
            background: "var(--rj-emerald)",
            color: "var(--rj-gold)",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>
      {error && (
        <p
          className="font-cinzel text-[9px] mt-1.5"
          style={{ color: "#ef4444" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ORDER SUMMARY
// ─────────────────────────────────────────────────────────────────
function OrderSummary() {
  const { subtotal, savings, couponDiscount, grandTotal, totalItems, coupon } =
    useCartStore();
  const sub = subtotal();
  const save = savings();
  const discount = couponDiscount;
  const grand = grandTotal();
  const FREE_SHIP = 2000;
  const shipping = grand >= FREE_SHIP ? 0 : 149;
  const final = grand + shipping;

  return (
    <div
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ border: "1px solid var(--rj-bone)" }}
    >
      {/* Header */}
      <div className="px-5 py-4" style={{ background: "var(--rj-emerald)" }}>
        <p className="label-accent mb-0.5" style={{ color: "var(--rj-gold)" }}>
          ✦ Order Summary
        </p>
        <p
          className="font-cinzel text-xs"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {totalItems()} item{totalItems() !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="p-5 space-y-3" style={{ background: "#fff" }}>
        {/* Lines */}
        {[
          { label: "Subtotal", value: fmt(sub), muted: false },
          ...(save > 0
            ? [
                {
                  label: "You save",
                  value: `-${fmt(save)}`,
                  muted: true,
                  green: true,
                },
              ]
            : []),
          ...(discount > 0
            ? [
                {
                  label: `Coupon (${coupon})`,
                  value: `-${fmt(discount)}`,
                  muted: true,
                  green: true,
                },
              ]
            : []),
          {
            label: "Shipping",
            value: shipping === 0 ? "Free" : fmt(shipping),
            muted: false,
            green: shipping === 0,
          },
        ].map((line: any) => (
          <div key={line.label} className="flex items-center justify-between">
            <span
              className="font-cinzel text-[10px] tracking-wider"
              style={{
                color: line.muted ? "var(--rj-ash)" : "var(--rj-charcoal)",
              }}
            >
              {line.label}
            </span>
            <span
              className="font-cinzel text-sm font-bold"
              style={{
                color: line.green ? "var(--rj-emerald)" : "var(--rj-charcoal)",
              }}
            >
              {line.value}
            </span>
          </div>
        ))}

        {/* Free shipping progress */}
        {grand < FREE_SHIP && (
          <div className="pt-2">
            <p
              className="font-cinzel text-[9px] tracking-wider mb-2"
              style={{ color: "var(--rj-ash)" }}
            >
              Add {fmt(FREE_SHIP - grand)} more for free shipping
            </p>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "var(--rj-bone)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--gradient-gold)" }}
                animate={{
                  width: `${Math.min((grand / FREE_SHIP) * 100, 100)}%`,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        <div className="h-px" style={{ background: "var(--rj-bone)" }} />

        {/* Grand total */}
        <div className="flex items-center justify-between py-1">
          <span
            className="font-cinzel text-sm font-bold tracking-wider"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Total
          </span>
          <span
            className="font-cormorant font-light"
            style={{ fontSize: "1.6rem", color: "var(--rj-charcoal)" }}
          >
            {fmt(final)}
          </span>
        </div>

        {/* Coupon */}
        <CouponSection />

        {/* Checkout */}
        <button
          className="w-full py-3.5 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95"
          style={{
            background: "var(--gradient-gold)",
            color: "var(--rj-emerald)",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
          }}
        >
          Proceed to Checkout
        </button>

        <Link
          href="/products"
          className="w-full py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full transition-all hover:opacity-70 flex items-center justify-center gap-2"
          style={{
            border: "1.5px solid var(--rj-bone)",
            color: "var(--rj-ash)",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </Link>

        {/* Trust */}
        <div className="pt-3 grid grid-cols-3 gap-2">
          {[
            { icon: <Shield size={12} />, label: "Secure" },
            { icon: <RefreshCw size={12} />, label: "Returns" },
            { icon: <Truck size={12} />, label: "Insured" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,55,32,0.06)" }}
              >
                <span style={{ color: "var(--rj-emerald)" }}>{t.icon}</span>
              </div>
              <span
                className="font-cinzel text-[8px] tracking-wider"
                style={{ color: "var(--rj-ash)" }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN CART PAGE
// ─────────────────────────────────────────────────────────────────
export default function CartPage() {
  const { items, clearCart, totalItems, savings } = useCartStore();
  const save = savings();

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* Page header */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "6rem",
          paddingBottom: "2.5rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-4">
            {["Home", "Cart"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href="/"
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.25)" }}
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
          <div className="flex items-end justify-between">
            <div>
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-gold)" }}
              >
                ✦ Your Selection
              </p>
              <h1 className="heading-lg text-white">Shopping Cart</h1>
            </div>
            {items.length > 0 && save > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(252,193,81,0.12)",
                  border: "1px solid rgba(252,193,81,0.25)",
                }}
              >
                <Sparkles size={13} style={{ color: "var(--rj-gold)" }} />
                <span
                  className="font-cinzel text-[10px] tracking-wider"
                  style={{ color: "var(--rj-gold)" }}
                >
                  Saving {fmt(save)} today
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="container-rj py-12">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
            {/* Cart items */}
            <div className="lg:col-span-2">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p
                  className="font-cinzel text-xs tracking-widest"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {totalItems()} item{totalItems() !== 1 ? "s" : ""} in your
                  cart
                </p>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                >
                  <Trash2 size={11} /> Clear All
                </button>
              </div>

              {/* Items */}
              <motion.div layout>
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Gift message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 rounded-xl flex items-start gap-3"
                style={{
                  background: "rgba(252,193,81,0.06)",
                  border: "1px dashed rgba(252,193,81,0.3)",
                }}
              >
                <Gift
                  size={16}
                  style={{
                    color: "var(--rj-gold)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <div>
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-0.5"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Add a Gift Message
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    Every Rehnoor order ships in our signature gift box. Add a
                    personal note at checkout — complimentary.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div>
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
