"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  AlertCircle,
  Loader2,
  CreditCard,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useRazorpayCheckout } from "@/app/lib/hooks/useRazorpayCheckout";
import OrderSummaryPanel from "../component/website/checkout/OrderSummaryPanel";
import {
  ContactSection,
  AddressSection,
  ShippingSection,
  PaymentSection,
  ReviewSection,
  type SectionHandle,
} from "../component/steps/CheckoutSteps";
import { trackPurchase } from "../lib/metaPixel";

// ─── Payment / order stage overlay ──────────────────────────────────────────
// One overlay, four visual states, all in the brand palette (emerald +
// gold). Success gets its own celebratory checkmark pop instead of the
// spinner so the transition to /thankyou feels intentional, not stalled.

type OverlayStage =
  | "creating_order"
  | "awaiting_payment"
  | "verifying"
  | "success";

const OVERLAY_COPY: Record<OverlayStage, { title: string; sub: string }> = {
  creating_order: {
    title: "Preparing your order…",
    sub: "Securing your items and confirming details",
  },
  awaiting_payment: {
    title: "Payment window open",
    sub: "Complete payment in the Razorpay window",
  },
  verifying: {
    title: "Verifying payment…",
    sub: "Please wait while we confirm your payment",
  },
  success: {
    title: "Order placed!",
    sub: "Redirecting you to your confirmation…",
  },
};

function PaymentStageOverlay({ stage }: { stage: OverlayStage }) {
  const copy = OVERLAY_COPY[stage];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-6"
      style={{ background: "rgba(0,26,15,0.92)", backdropFilter: "blur(10px)" }}
    >
      {/* Icon */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 84, height: 84 }}
      >
        {/* soft pulsing ring, brand gold */}
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{ border: "1.5px solid var(--rj-gold)" }}
        />
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background:
              stage === "success" ? "var(--rj-gold)" : "rgba(212,175,55,0.12)",
            border: "1.5px solid var(--rj-gold)",
          }}
        >
          {stage === "success" ? (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 16 }}
            >
              <CheckCircle2 size={32} style={{ color: "var(--rj-emerald)" }} />
            </motion.div>
          ) : stage === "awaiting_payment" ? (
            <CreditCard size={28} style={{ color: "var(--rj-gold)" }} />
          ) : stage === "creating_order" ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            >
              <PackageCheck size={28} style={{ color: "var(--rj-gold)" }} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={28} style={{ color: "var(--rj-gold)" }} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Copy */}
      <motion.div
        key={stage}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p
          className="font-cinzel text-sm tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-gold)" }}
        >
          {copy.title}
        </p>
        <p
          className="font-cinzel text-[10px] tracking-wider mt-2"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {copy.sub}
        </p>
      </motion.div>

      {/* Progress dots — a lightweight sense of where we are in the flow */}
      {stage !== "success" && (
        <div className="flex items-center gap-2 mt-1">
          {(["creating_order", "awaiting_payment", "verifying"] as const).map(
            (s) => {
              const order = ["creating_order", "awaiting_payment", "verifying"];
              const active = order.indexOf(stage) >= order.indexOf(s);
              return (
                <span
                  key={s}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active ? 18 : 6,
                    height: 6,
                    background: active
                      ? "var(--rj-gold)"
                      : "rgba(255,255,255,0.2)",
                  }}
                />
              );
            },
          )}
        </div>
      )}
    </motion.div>
  );
}

// ─── Error banner ───────────────────────────────────────────────────────────

function CheckoutErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-start gap-3 p-4 rounded-xl mb-6"
      style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
    >
      <AlertCircle
        size={16}
        style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }}
      />
      <div className="flex-1">
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
          style={{ color: "#c0392b" }}
        >
          Payment issue
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{
            color: "#7f1d1d",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        style={{
          color: "#fca5a5",
          cursor: "pointer",
          background: "none",
          border: "none",
        }}
      >
        ✕
      </button>
    </motion.div>
  );
}

// ─── Main checkout shell ─────────────────────────────────────────────────────

// How long to hold the "Order placed!" state on screen before navigating,
// so the confirmation registers instead of flashing past.
const SUCCESS_HOLD_MS = 1100;

export default function CheckoutPage() {
  const router = useRouter();

  const checkoutItems = useCartStore((s) => s.checkoutItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const clearBuyNow = useCartStore((s) => s.clearBuyNow);

  const {
    contact,
    address,
    billingDiff,
    billingAddress,
    paymentMethod,
    customerNote,
    giftMessage,
    isGift,
    reset: resetCheckout,
  } = useCheckoutStore();

  const {
    stage,
    error,
    result,
    initiate,
    reset: resetPayment,
  } = useRazorpayCheckout();

  const [mounted, setMounted] = useState(false);
  const [formError, setFormError] = useState("");
  // True once we've fired the success sequence, so we keep the overlay
  // (and the page behind it) mounted while we hold + redirect, instead of
  // relying on `stage` alone which the hook may reset.
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  // Refs into each section so we can validate() them all at once and
  // scroll to whichever one fails first.
  const contactRef = useRef<SectionHandle>(null);
  const addressRef = useRef<SectionHandle>(null);
  const shippingRef = useRef<SectionHandle>(null);
  const paymentRef = useRef<SectionHandle>(null);

  const sectionAnchors = {
    contact: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    shipping: useRef<HTMLDivElement>(null),
    payment: useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    useCheckoutStore.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && checkoutItems().length === 0 && !result) {
      router.replace("/cart");
    }
  }, [mounted, checkoutItems, result, router]);

  // On success: fire pixel + persist order immediately, but hold the
  // success overlay on screen for a beat before navigating so the user
  // actually sees the confirmation instead of a blank flash.
  useEffect(() => {
    if (stage !== "success" || !result) return;

    setShowSuccessOverlay(true);

    const wasBuyNow = !!useCartStore.getState().buyNowItems;
    const allProductIds = checkoutItems().map((item) => item.productId);

    trackPurchase({
      id: allProductIds,
      price: result.total,
      currency: "INR",
    });

    try {
      
      sessionStorage.setItem(
        "rj_last_order",
        JSON.stringify({
          orderNumber: result.orderNumber,
          total: result.total,
          paymentMethod: result.paymentMethod,
          items: checkoutItems().map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.priceNum,
            qty: i.qty,
            variant: { variantId: i.variant?.variantId },
          })),
        }),
      );
    } catch {}

    if (wasBuyNow) clearBuyNow();
    else clearCart();

    resetCheckout();

    const t = setTimeout(() => {
      router.replace("/thankyou");
    }, SUCCESS_HOLD_MS);

    return () => clearTimeout(t);
  }, [
    stage,
    result,
    clearCart,
    clearBuyNow,
    resetCheckout,
    checkoutItems,
    router,
  ]);

  if (!mounted) return null;

  const isProcessing =
    stage === "creating_order" ||
    stage === "awaiting_payment" ||
    stage === "verifying";

  const overlayStage: OverlayStage | null = showSuccessOverlay
    ? "success"
    : isProcessing
      ? (stage as OverlayStage)
      : null;

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePlaceOrder = async (): Promise<void> => {
    setFormError("");

    // Validate every section in order; stop at (and scroll to) the first
    // one that fails.
    const checks: [
      SectionHandle | null,
      React.RefObject<HTMLDivElement | null>,
    ][] = [
      [contactRef.current, sectionAnchors.contact],
      [addressRef.current, sectionAnchors.address],
      [shippingRef.current, sectionAnchors.shipping],
      [paymentRef.current, sectionAnchors.payment],
    ];

    for (const [handle, anchor] of checks) {
      const ok = handle ? handle.validate() : true;
      if (!ok) {
        scrollTo(anchor);
        setFormError(
          "Please fix the highlighted fields before placing your order.",
        );
        return;
      }
    }

    const activeCartCoupon = useCartStore.getState().coupon?.code;

    await initiate({
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      items: checkoutItems().map((i) => ({
        productId: i.productId,
        variantId: i.variant?.variantId,
        quantity: i.qty,
        customNote: i.customNote,
      })),
      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country || "India",
        landmark: address.landmark,
      },
      billingAddress: billingDiff
        ? {
            fullName: billingAddress.fullName,
            phone: billingAddress.phone,
            addressLine1: billingAddress.addressLine1,
            addressLine2: billingAddress.addressLine2,
            city: billingAddress.city,
            state: billingAddress.state,
            pincode: billingAddress.pincode,
            country: billingAddress.country || "India",
            landmark: billingAddress.landmark,
          }
        : undefined,
      billingSameAsShipping: !billingDiff,
      paymentMethod: paymentMethod as "cod" | "razorpay",
      couponCode: activeCartCoupon || null,
      customerNote,
      giftMessage,
      isGift,
      source: "website",
    });
  };

  return (
    <>
      <AnimatePresence>
        {overlayStage && (
          <PaymentStageOverlay key={overlayStage} stage={overlayStage} />
        )}
      </AnimatePresence>

      <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
        <div
          style={{
            background: "var(--rj-emerald)",
            paddingTop: "5rem",
            paddingBottom: "1.5rem",
          }}
        >
          <div className="container-rj">
            <nav className="flex items-center gap-1.5 mb-4 flex-wrap">
              {["Home", "Cart", "Checkout"].map((c, i, arr) => (
                <span key={c} className="flex items-center gap-1.5">
                  {i < arr.length - 1 ? (
                    <>
                      <Link
                        href={i === 0 ? "/" : "/cart"}
                        className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
                        style={{
                          color: "rgba(255,255,255,0.4)",
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
            <h1 className="heading-lg text-white">Secure Checkout</h1>
          </div>
        </div>

        <div className="container-rj py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
            <div className="lg:col-span-2 order-2 lg:order-1 flex flex-col gap-6">
              <AnimatePresence>
                {stage === "error" && error && (
                  <CheckoutErrorBanner
                    message={error}
                    onDismiss={resetPayment}
                  />
                )}
              </AnimatePresence>

              <div ref={sectionAnchors.contact}>
                <ContactSection index={1} ref={contactRef} />
              </div>
              <div ref={sectionAnchors.address}>
                <AddressSection index={2} ref={addressRef} />
              </div>
              <div ref={sectionAnchors.shipping}>
                <ShippingSection index={3} ref={shippingRef} />
              </div>
              <div ref={sectionAnchors.payment}>
                <PaymentSection index={4} ref={paymentRef} />
              </div>
              <div ref={sectionAnchors.review}>
                <ReviewSection index={5} error={formError} />
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || showSuccessOverlay}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-cinzel text-[12px] tracking-widest uppercase font-bold transition-all duration-300 active:scale-95 disabled:opacity-50"
                style={{
                  background: "var(--rj-emerald)",
                  color: "var(--rj-gold)",
                  cursor:
                    isProcessing || showSuccessOverlay ? "wait" : "pointer",
                  boxShadow: "0 4px 24px rgba(0,55,32,0.25)",
                }}
              >
                {isProcessing || showSuccessOverlay ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ◌
                    </motion.span>{" "}
                    Placing order…
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
              <p
                className="font-cinzel text-[9px] tracking-wider text-center mt-3"
                style={{ color: "var(--rj-ash)" }}
              >
                By placing this order you agree to our Terms &amp; Conditions
                and Return Policy.
              </p>
            </div>

            <div className="lg:sticky lg:top-24 order-1 sm:order-2">
              <OrderSummaryPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
