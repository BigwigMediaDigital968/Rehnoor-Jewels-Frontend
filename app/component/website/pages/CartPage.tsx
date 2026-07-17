"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Lock,
  AlertCircle,
} from "lucide-react";
import { useCartStore, fmtPrice, CartItem } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { validateCoupon } from "@/app/lib/api/orders";

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
              whitespace-nowrap font-cinzel tracking-wider rounded-lg pointer-events-none"
            style={{
              fontSize: 9,
              background: "var(--rj-charcoal)",
              color: "#fff",
              padding: "4px 10px",
            }}
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// ─── Empty ────────────────────────────────────────────────────────────────────

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
        className="btn-primary inline-flex items-center gap-2"
        style={{
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

// ─── Cart Item Row ─────────────────────────────────────────────────────────────

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateQty, setBuyNow } = useCartStore();
  const { reset: resetCheckout } = useCheckoutStore();
  const router = useRouter();
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 300);
  };

  const discountPct = item.originalPriceNum
    ? Math.round((1 - item.priceNum / item.originalPriceNum) * 100)
    : 0;

  const handleBuyNow = () => {
    setBuyNow(item);
    resetCheckout();
    router.push("/checkout");
  };

  //  New Safe Code
  const variantLabel = item.variant?.options
    ? Object.values(item.variant.options).filter(Boolean).join(" · ")
    : null;

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
        className="relative flex-shrink-0 rounded-xl overflow-hidden group"
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
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          {variantLabel && (
            <p
              className="font-cinzel text-[10px] tracking-wider mt-1"
              style={{ color: "var(--rj-emerald)" }}
            >
              {variantLabel}
            </p>
          )}
          {item.variant?.sku && (
            <p
              className="font-mono text-[9px] mt-0.5"
              style={{ color: "var(--rj-ash)" }}
            >
              SKU: {item.variant.sku}
            </p>
          )}
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
                {fmtPrice(item.priceNum * item.qty)}
              </span>
              {item.qty > 1 && (
                <span
                  className="font-cinzel text-[9px]"
                  style={{ color: "var(--rj-ash)" }}
                >
                  ({fmtPrice(item.priceNum)} each)
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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Tip text="Checkout with this item only">
              <button
                onClick={handleBuyNow}
                className="font-cinzel text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--rj-emerald)",
                  cursor: "pointer",
                }}
              >
                Buy Now
              </button>
            </Tip>
            <Tip text="Remove from cart">
              <button
                onClick={handleRemove}
                className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-60"
                style={{ color: "var(--rj-ash)", cursor: "pointer" }}
              >
                <Trash2 size={11} /> Remove
              </button>
            </Tip>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Buy-now banner ───────────────────────────────────────────────────────────

function BuyNowBanner() {
  const { buyNowItems, clearBuyNow } = useCartStore();
  if (!buyNowItems || buyNowItems.length === 0) return null;

  const name = buyNowItems[0]?.name;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-4"
      style={{
        background: "rgba(252,193,81,0.1)",
        border: "1.5px solid rgba(252,193,81,0.4)",
      }}
    >
      <div className="flex items-center gap-2">
        <Lock size={13} style={{ color: "var(--rj-gold)" }} />
        <p
          className="font-cinzel text-[10px] tracking-wider"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Checkout is set to <strong>"{name}"</strong> only. Your other cart
          items are saved.
        </p>
      </div>
      <button
        onClick={clearBuyNow}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─── Coupon Section ────────────────────────────────────────────────────────────

function CouponSection({ email }: { email?: string }) {
  const { coupon, subtotal, applyCoupon, removeCoupon, checkoutItems } =
    useCartStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    const result = await validateCoupon(
      code.trim(),
      subtotal(),
      checkoutItems().length,
      email,
    );
    setLoading(false);

    if (!result.success || !result.coupon) {
      setError(result.message || "Invalid coupon code.");
      return;
    }

    applyCoupon({
      code: result.coupon.code,
      discountAmount: result.discountAmount ?? 0,
      discountType: result.coupon.discountType,
      discountValue: result.coupon.discountValue,
    });
    setCode("");
  };

  if (coupon?.code) {
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
              {coupon.code} applied!
            </p>
            <p
              className="font-cinzel text-[9px] tracking-wider"
              style={{ color: "var(--rj-ash)" }}
            >
              You save {fmtPrice(coupon.discountAmount)}
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
            style={{ color: error ? "#fca5a5" : "var(--rj-ash)" }}
          />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError("");
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
          disabled={loading}
          className="px-4 py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-lg transition-all disabled:opacity-50"
          style={{
            background: "var(--rj-emerald)",
            color: "var(--rj-gold)",
            cursor: "pointer",
          }}
        >
          {loading ? "…" : "Apply"}
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

// ─── Order Summary Sidebar ─────────────────────────────────────────────────────

function OrderSummary() {
  const router = useRouter();
  const {
    subtotal,
    savings,
    coupon,
    grandTotal,
    totalItems,
    items,
    checkoutItems,
    buyNowItems,
  } = useCartStore();
  const { reset: resetCheckout } = useCheckoutStore();

  const [checkoutErr, setCheckoutErr] = useState("");
  const [validating, setValidating] = useState(false);

  const activeItems = checkoutItems();
  const isBuyNow = !!buyNowItems && buyNowItems.length > 0;

  // Dynamic price architecture calculations depending on checkout status
  const buyNowItem = isBuyNow ? buyNowItems[0] : null;

  const sub =
    isBuyNow && buyNowItem ? buyNowItem.priceNum * buyNowItem.qty : subtotal();
  const save =
    isBuyNow && buyNowItem
      ? buyNowItem.originalPriceNum
        ? (buyNowItem.originalPriceNum - buyNowItem.priceNum) * buyNowItem.qty
        : 0
      : savings();

  const discount = isBuyNow ? 0 : (coupon?.discountAmount ?? 0);
  const grand = isBuyNow ? sub : grandTotal();

  const FREE_SHIP = 999;
  const shipping = grand >= FREE_SHIP ? 0 : 129;
  const final = grand + shipping;

  const summaryItemCount =
    isBuyNow && buyNowItem ? buyNowItem.qty : totalItems();

  const handleCheckout = async () => {
    if (activeItems.length === 0) return;
    setValidating(true);
    setCheckoutErr("");
    await new Promise((r) => setTimeout(r, 300));
    setValidating(false);
    resetCheckout();
    router.push("/checkout");
  };

  return (
    <div
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ border: "1px solid var(--rj-bone)" }}
    >
      <div className="px-5 py-4" style={{ background: "var(--rj-emerald)" }}>
        <p className="label-accent mb-0.5" style={{ color: "var(--rj-gold)" }}>
          {isBuyNow ? "✦ Buy Now Summary" : "✦ Order Summary"}
        </p>
        <p
          className="font-cinzel text-xs"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {summaryItemCount} item{summaryItemCount !== 1 ? "s" : ""} selected
        </p>
      </div>

      <div className="p-5 space-y-3" style={{ background: "#fff" }}>
        {/* Isolated Item Preview Area */}
        {isBuyNow && buyNowItem && (
          <div
            className="p-3 rounded-xl space-y-2"
            style={{
              background: "rgba(0,55,32,0.03)",
              border: "1px dashed var(--rj-bone)",
            }}
          >
            <p className="font-cinzel text-[9px] tracking-widest text-[var(--rj-ash)] uppercase">
              Purchasing:
            </p>
            <div className="flex gap-3 items-center">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--rj-ivory-dark)]">
                <Image
                  src={buyNowItem.image}
                  alt={buyNowItem.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-cormorant text-sm truncate font-medium text-[var(--rj-charcoal)]">
                  {buyNowItem.name}
                </p>
                <p className="font-cinzel text-[9px] text-[var(--rj-ash)]">
                  Qty: {buyNowItem.qty} · {fmtPrice(buyNowItem.priceNum)}
                </p>
              </div>
            </div>
            <p
              className="p-2 bg-[rgba(252,193,81,0.1)] rounded text-[9px] font-cinzel tracking-wider text-center"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Other {items.length - 1} item{items.length - 1 !== 1 ? "s" : ""}{" "}
              in cart are saved.
            </p>
          </div>
        )}

        {/* Price lines */}
        {[
          { label: "Subtotal", value: fmtPrice(sub), green: false },
          ...(save > 0
            ? [{ label: "You save", value: `-${fmtPrice(save)}`, green: true }]
            : []),
          ...(discount > 0 && !isBuyNow
            ? [
                {
                  label: `Coupon (${coupon?.code ?? ""})`,
                  value: `-${fmtPrice(discount)}`,
                  green: true,
                },
              ]
            : []),
          {
            label: "Shipping",
            value: shipping === 0 ? "Free" : fmtPrice(shipping),
            green: shipping === 0,
          },
        ].map((line) => (
          <div key={line.label} className="flex items-center justify-between">
            <span
              className="font-cinzel text-[10px] tracking-wider"
              style={{ color: "var(--rj-ash)" }}
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

        {grand < FREE_SHIP && (
          <div className="pt-1">
            <p
              className="font-cinzel text-[9px] tracking-wider mb-1.5"
              style={{ color: "var(--rj-ash)" }}
            >
              Add {fmtPrice(FREE_SHIP - grand)} more for free shipping
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
            {fmtPrice(final)}
          </span>
        </div>

        {!isBuyNow && <CouponSection />}

        <div className="h-px" style={{ background: "var(--rj-bone)" }} />

        <AnimatePresence>
          {checkoutErr && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 p-3 rounded-xl overflow-hidden"
              style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
            >
              <AlertCircle
                size={13}
                style={{ color: "#ef4444", flexShrink: 0, marginTop: 1 }}
              />
              <p
                className="font-cinzel text-[9px] tracking-wider leading-relaxed"
                style={{ color: "#ef4444" }}
              >
                {checkoutErr}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleCheckout}
          disabled={validating || activeItems.length === 0}
          className="btn-primary inline-flex w-full justify-center"
          style={{
            display: "inline-flex",
            background: "var(--gradient-gold)",
            color: "var(--rj-emerald)",
          }}
        >
          {validating ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ◌
              </motion.span>{" "}
              Checking…
            </>
          ) : (
            <>
              <Lock size={12} />{" "}
              {isBuyNow ? "Buy Selected Item Now" : "Proceed to Checkout"}
            </>
          )}
        </button>

        <p
          className="font-cinzel text-[8px] tracking-wider text-center"
          style={{ color: "var(--rj-ash)" }}
        >
          256-bit SSL encrypted · Payment info never stored
        </p>

        <Link
          href="/products"
          className="w-full py-2.5 font-cinzel text-[10px] tracking-widest uppercase font-bold rounded-full
            transition-all hover:opacity-70 flex items-center justify-center gap-2"
          style={{
            border: "1.5px solid var(--rj-bone)",
            color: "var(--rj-ash)",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </Link>

        <div className="pt-2 grid grid-cols-3 gap-2">
          {[
            { icon: <Shield size={12} />, label: "Secure", tip: "256-bit SSL" },
            {
              icon: <RefreshCw size={12} />,
              label: "Returns",
              tip: "Free 07-day returns",
            },
            {
              icon: <Truck size={12} />,
              label: "",
              tip: "All orders safely packed",
            },
          ].map((t) => (
            <Tip key={t.label} text={t.tip}>
              <div className="flex flex-col items-center gap-1 w-full cursor-help">
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
            </Tip>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CartPage() {
  const { items, clearCart, totalItems, savings } = useCartStore();
  const save = savings();

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
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
          <div className="flex items-end justify-between flex-wrap gap-3">
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
                  Saving {fmtPrice(save)} today
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
            <div className="lg:col-span-2">
              <BuyNowBanner />

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

              <motion.div layout>
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>

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

            <div className="block">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
