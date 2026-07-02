"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Plus,
    Minus,
    Tag,
    X,
    ChevronLeft,
    ShoppingBag,
    ArrowRight,
    Check,
    Gift,
    Sparkles,
    Lock,
    AlertCircle,
} from "lucide-react";
import { useCartStore, fmtPrice, CartItem } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { validateCoupon } from "@/app/lib/api/orders";

// ─── Empty ────────────────────────────────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center flex-1 text-center px-6"
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{
                    background: "rgba(0,55,32,0.06)",
                    border: "1px solid rgba(0,55,32,0.1)",
                }}
            >
                <ShoppingBag
                    size={32}
                    style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
                />
            </motion.div>
            <h2
                className="font-cormorant text-2xl font-light mb-2"
                style={{ color: "var(--rj-charcoal)" }}
            >
                Your bag is empty
            </h2>
            <p
                className="font-cinzel text-[10px] tracking-widest uppercase mb-7"
                style={{ color: "var(--rj-ash)" }}
            >
                Add some gold to your life
            </p>
            <Link
                href="/products"
                onClick={onClose}
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

// ─── Cart Item Row (compact, drawer-width) ────────────────────────────────────

function DrawerItemRow({
    item,
    onNavigate,
}: {
    item: CartItem;
    onNavigate: () => void;
}) {
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
        onNavigate();
        router.push("/checkout");
    };

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
            className="flex gap-3 p-3 rounded-2xl mb-3"
            style={{
                background: "#fff",
                border: "1px solid var(--rj-bone)",
            }}
        >
            {/* Image */}
            <Link
                href={item.href}
                onClick={onNavigate}
                className="relative flex-shrink-0 rounded-xl overflow-hidden group"
                style={{
                    width: 72,
                    height: 72,
                    background: "var(--rj-ivory-dark)",
                    cursor: "pointer",
                }}
            >
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="72px"
                />
                {discountPct > 0 && (
                    <span
                        className="absolute top-1 left-1 font-cinzel font-bold rounded-full px-1.5 py-0.5"
                        style={{
                            fontSize: 7,
                            background: "var(--rj-emerald)",
                            color: "var(--rj-gold)",
                        }}
                    >
                        {discountPct}% OFF
                    </span>
                )}
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <Link href={item.href} onClick={onNavigate}>
                            <h3
                                className="font-cormorant font-light leading-tight hover:text-[var(--rj-emerald)] transition-colors truncate"
                                style={{
                                    fontSize: "0.95rem",
                                    color: "var(--rj-charcoal)",
                                    cursor: "pointer",
                                }}
                            >
                                {item.name}
                            </h3>
                        </Link>
                        {variantLabel && (
                            <p
                                className="font-cinzel text-[9px] tracking-wider mt-0.5 truncate"
                                style={{ color: "var(--rj-emerald)" }}
                            >
                                {variantLabel}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleRemove}
                        className="flex-shrink-0 transition-opacity hover:opacity-60"
                        style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                    >
                        <Trash2 size={13} />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-1.5">
                    {/* Qty stepper */}
                    <div
                        className="flex items-center rounded-full"
                        style={{ border: "1.5px solid var(--rj-bone)" }}
                    >
                        <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                            style={{ cursor: "pointer", color: "var(--rj-charcoal)" }}
                        >
                            <Minus size={10} />
                        </button>
                        <span
                            className="w-5 text-center font-cinzel text-xs"
                            style={{ color: "var(--rj-charcoal)" }}
                        >
                            {item.qty}
                        </span>
                        <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-6 h-6 flex items-center justify-center transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                            style={{ cursor: "pointer", color: "var(--rj-charcoal)" }}
                        >
                            <Plus size={10} />
                        </button>
                    </div>

                    {/* Price + Buy now */}
                    <div className="flex items-center gap-2">
                        <div className="text-right">
                            <span
                                className="font-cinzel font-bold"
                                style={{ fontSize: "0.85rem", color: "var(--rj-charcoal)" }}
                            >
                                {fmtPrice(item.priceNum * item.qty)}
                            </span>
                            {item.originalPriceNum && (
                                <span
                                    className="font-cinzel text-[8px] ml-1 line-through"
                                    style={{ color: "var(--rj-ash)" }}
                                >
                                    {fmtPrice(item.originalPriceNum * item.qty)}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleBuyNow}
                            className="font-cinzel text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full transition-all hover:opacity-80 whitespace-nowrap"
                            style={{
                                background: "var(--gradient-gold)",
                                color: "var(--rj-emerald)",
                                cursor: "pointer",
                            }}
                        >
                            Buy Now
                        </button>
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
            className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl mb-3"
            style={{
                background: "rgba(252,193,81,0.1)",
                border: "1.5px solid rgba(252,193,81,0.4)",
            }}
        >
            <div className="flex items-center gap-2 min-w-0">
                <Lock size={12} className="flex-shrink-0" style={{ color: "var(--rj-gold)" }} />
                <p
                    className="font-cinzel text-[9px] tracking-wider truncate"
                    style={{ color: "var(--rj-charcoal)" }}
                >
                    Checkout set to <strong>"{name}"</strong> only
                </p>
            </div>
            <button
                onClick={clearBuyNow}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
                <X size={13} />
            </button>
        </motion.div>
    );
}

// ─── Coupon Section (compact) ──────────────────────────────────────────────────

function CouponSection() {
    const { coupon, subtotal, applyCoupon, removeCoupon, checkoutItems } =
        useCartStore();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleApply = async () => {
        if (!code.trim()) return;
        setLoading(true);
        setError("");
        const result = await validateCoupon(
            code.trim(),
            subtotal(),
            checkoutItems().length,
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
        setShow(false);
    };

    if (coupon?.code) {
        return (
            <div
                className="flex items-center justify-between p-2.5 rounded-xl"
                style={{
                    background: "rgba(0,55,32,0.06)",
                    border: "1.5px solid rgba(0,55,32,0.15)",
                }}
            >
                <div className="flex items-center gap-2">
                    <Check size={13} style={{ color: "var(--rj-emerald)" }} />
                    <div>
                        <p
                            className="font-cinzel text-[11px] font-bold"
                            style={{ color: "var(--rj-emerald)" }}
                        >
                            {coupon.code} applied!
                        </p>
                        <p
                            className="font-cinzel text-[8px] tracking-wider"
                            style={{ color: "var(--rj-ash)" }}
                        >
                            You save {fmtPrice(coupon.discountAmount)}
                        </p>
                    </div>
                </div>
                <button onClick={removeCoupon} style={{ cursor: "pointer" }}>
                    <X size={13} style={{ color: "var(--rj-ash)" }} />
                </button>
            </div>
        );
    }

    if (!show) {
        return (
            <button
                onClick={() => setShow(true)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors hover:bg-[var(--rj-ivory-dark)]"
                style={{
                    border: "1px dashed var(--rj-bone)",
                    cursor: "pointer",
                }}
            >
                <span
                    className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider"
                    style={{ color: "var(--rj-ash)" }}
                >
                    <Tag size={12} /> Enter a coupon
                </span>
                <ArrowRight size={11} style={{ color: "var(--rj-ash)" }} />
            </button>
        );
    }

    return (
        <div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag
                        size={12}
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: error ? "#fca5a5" : "var(--rj-ash)" }}
                    />
                    <input
                        type="text"
                        autoFocus
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleApply()}
                        placeholder="Coupon code"
                        className="w-full pl-8 pr-3 py-2 font-cinzel text-[11px] tracking-wider outline-none"
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
                    className="px-3.5 py-2 font-cinzel text-[9px] tracking-widest uppercase font-bold rounded-lg transition-all disabled:opacity-50"
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
                    className="font-cinzel text-[8px] mt-1.5"
                    style={{ color: "#ef4444" }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Sticky Bottom Summary ──────────────────────────────────────────────────────

function DrawerSummary({ onClose }: { onClose: () => void }) {
    const router = useRouter();
    const {
        subtotal,
        savings,
        coupon,
        grandTotal,
        items,
        checkoutItems,
        buyNowItems,
    } = useCartStore();
    const { reset: resetCheckout } = useCheckoutStore();

    const [checkoutErr, setCheckoutErr] = useState("");
    const [validating, setValidating] = useState(false);

    const activeItems = checkoutItems();
    const isBuyNow = !!buyNowItems && buyNowItems.length > 0;
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

    const FREE_SHIP = 500;
    const shipping = grand >= FREE_SHIP ? 0 : 149;
    const final = grand + shipping;

    const handleCheckout = async () => {
        if (activeItems.length === 0) return;
        setValidating(true);
        setCheckoutErr("");
        await new Promise((r) => setTimeout(r, 300));
        setValidating(false);
        resetCheckout();
        onClose();
        router.push("/checkout");
    };

    return (
        <>

            <div className="w-full relative overflow-hidden">
                {/* Injecting the pure CSS keyframes for the sweep animation */}
                <style>{`
        @keyframes subtleGlowSweep {
          0% { transform: translateX(-100%) skewX(-25deg); }
          100% { transform: translateX(200%) skewX(-25deg); }
        }
        .animate-glow-sweep {
          animation: subtleGlowSweep 3.5s linear 0.3s infinite;
        }
      `}</style>

                {/* The Banner Body */}
                <div className="w-full bg-[#003720] rounded-t-lg py-2 text-center text-xs sm:text-sm tracking-wider text-white/90 relative overflow-hidden shadow-sm">

                    {/* Animated Gloss Stripe */}
                    <div
                        className="absolute inset-0 w-1/3 h-full pointer-events-none animate-glow-sweep"
                        style={{
                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)',
                        }}
                    />

                    {/* Text Content */}
                    <span className="relative z-10 font-medium text-sm">
                        🎉 You&rsquo;re saving <strong className="text-[#FCC131] font-bold">{fmtPrice(save)}</strong>!
                    </span>
                </div>
            </div>
            <div
                className="flex-shrink-0 px-4 pt-3 pb-4 space-y-2.5"
                style={{
                    background: "#fff",
                    borderTop: "1px solid var(--rj-bone)",
                    boxShadow: "0 -8px 24px -8px rgba(0,0,0,0.08)",
                }}
            >

                {/* Free shipping progress */}
                {grand < FREE_SHIP && (
                    <div>
                        <p
                            className="font-cinzel text-[9px] tracking-wider mb-1.5 flex items-center gap-1"
                            style={{ color: "var(--rj-ash)" }}
                        >
                            <Sparkles size={10} style={{ color: "var(--rj-gold)" }} />
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

                {!isBuyNow && <CouponSection />}

                <div className="h-px" style={{ background: "var(--rj-bone)" }} />

                {/* Condensed price lines */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <span
                            className="font-cinzel text-[10px] tracking-wider"
                            style={{ color: "var(--rj-ash)" }}
                        >
                            Subtotal
                        </span>
                        <span
                            className="font-cinzel text-xs font-bold"
                            style={{ color: "var(--rj-charcoal)" }}
                        >
                            {fmtPrice(sub)}
                        </span>
                    </div>
                    {save > 0 && (
                        <div className="flex items-center justify-between">
                            <span
                                className="font-cinzel text-[10px] tracking-wider"
                                style={{ color: "var(--rj-ash)" }}
                            >
                                You save
                            </span>
                            <span
                                className="font-cinzel text-xs font-bold"
                                style={{ color: "var(--rj-emerald)" }}
                            >
                                -{fmtPrice(save)}
                            </span>
                        </div>
                    )}
                    {discount > 0 && !isBuyNow && (
                        <div className="flex items-center justify-between">
                            <span
                                className="font-cinzel text-[10px] tracking-wider"
                                style={{ color: "var(--rj-ash)" }}
                            >
                                Coupon ({coupon?.code})
                            </span>
                            <span
                                className="font-cinzel text-xs font-bold"
                                style={{ color: "var(--rj-emerald)" }}
                            >
                                -{fmtPrice(discount)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <span
                            className="font-cinzel text-[10px] tracking-wider"
                            style={{ color: "var(--rj-ash)" }}
                        >
                            Shipping
                        </span>
                        <span
                            className="font-cinzel text-xs font-bold"
                            style={{
                                color: shipping === 0 ? "var(--rj-emerald)" : "var(--rj-charcoal)",
                            }}
                        >
                            {shipping === 0 ? "Free" : fmtPrice(shipping)}
                        </span>
                    </div>
                </div>

                <div className="h-px" style={{ background: "var(--rj-bone)" }} />

                <div className="flex items-center justify-between">
                    <span
                        className="font-cinzel text-xs font-bold tracking-wider"
                        style={{ color: "var(--rj-charcoal)" }}
                    >
                        Total
                    </span>
                    <span
                        className="font-cormorant font-light"
                        style={{ fontSize: "1.4rem", color: "var(--rj-charcoal)" }}
                    >
                        {fmtPrice(final)}
                    </span>
                </div>

                <AnimatePresence>
                    {checkoutErr && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-start gap-2 p-2.5 rounded-xl overflow-hidden"
                            style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
                        >
                            <AlertCircle
                                size={12}
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
            </div>
        </>
    );
}

// ─── Cart Drawer (main export) ──────────────────────────────────────────────────

export function CartDrawer() {
    const { items, clearCart, totalItems, isDrawerOpen, closeDrawer } =
        useCartStore();

    // Lock background scroll while drawer is open
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isDrawerOpen]);

    const handleNavigate = () => closeDrawer();

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.4,          // Slightly increased for a more premium, graceful feel
                            ease: [0.215, 0.610, 0.355, 1.000] // Custom cubic-bezier (easeOutCubic) for ultra-smooth easing
                        }}
                        onClick={closeDrawer}
                        className="fixed inset-0 z-[90] backdrop-blur-[2px]" // Optional: added a tiny backdrop-blur for luxury feel
                        style={{ background: "rgba(0, 20, 12, 0.45)" }}
                    />

                    {/* Drawer panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 320,     // High enough to make it snap open snappily
                            damping: 32,        // High damping completely eliminates visible bouncing, keeping it clean
                            mass: 0.8           // Keeps the panel feeling light and highly responsive
                        }}
                        className="fixed top-0 right-0 h-full z-[999] flex flex-col"
                        style={{
                            width: "min(440px, 95vw)",
                            background: "var(--rj-ivory)",
                            boxShadow: "-12px 0 40px rgba(0,0,0,0.18)",
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping bag"
                    >
                        {/* Fixed header */}
                        <div
                            className="flex-shrink-0 flex items-center justify-between px-4 py-4"
                            style={{
                                background: "#fff",
                                borderBottom: "1px solid var(--rj-bone)",
                            }}
                        >
                            <button
                                onClick={closeDrawer}
                                className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
                                style={{ cursor: "pointer", color: "var(--rj-charcoal)" }}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <h2
                                className="font-cinzel text-sm font-bold tracking-wider"
                                style={{ color: "var(--rj-charcoal)" }}
                            >
                                Shopping Bag ({totalItems()})
                            </h2>
                            {items.length > 0 ? (
                                <button
                                    onClick={clearCart}
                                    className="font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                                    style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                                >
                                    Clear
                                </button>
                            ) : (
                                <span style={{ width: 18 }} />
                            )}
                        </div>

                        {items.length === 0 ? (
                            <EmptyCart onClose={closeDrawer} />
                        ) : (
                            <>
                                {/* Scrollable item list — the only part that grows/scrolls */}
                                <div
                                    className="flex-1 overflow-y-auto px-4 pt-4"
                                    style={{ minHeight: 0 }}
                                >
                                    <BuyNowBanner />

                                    <motion.div layout>
                                        <AnimatePresence mode="popLayout">
                                            {items.map((item) => (
                                                <DrawerItemRow
                                                    key={item.id}
                                                    item={item}
                                                    onNavigate={handleNavigate}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-4 p-3 rounded-xl flex items-start gap-2.5"
                                        style={{
                                            background: "rgba(252,193,81,0.06)",
                                            border: "1px dashed rgba(252,193,81,0.3)",
                                        }}
                                    >
                                        <Gift
                                            size={14}
                                            style={{
                                                color: "var(--rj-gold)",
                                                flexShrink: 0,
                                                marginTop: 2,
                                            }}
                                        />
                                        <div>
                                            <p
                                                className="font-cinzel text-[9px] tracking-widest uppercase font-bold mb-0.5"
                                                style={{ color: "var(--rj-charcoal)" }}
                                            >
                                                Gift Box Included
                                            </p>
                                            <p
                                                className="text-[11px] leading-snug"
                                                style={{
                                                    color: "var(--rj-ash)",
                                                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                                                }}
                                            >
                                                Every order ships in our signature gift box, free.
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Sticky bottom summary — never scrolls away */}
                                <DrawerSummary onClose={closeDrawer} />
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}