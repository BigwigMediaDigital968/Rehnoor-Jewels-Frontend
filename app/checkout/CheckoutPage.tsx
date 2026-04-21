"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ShoppingBag,
  CheckCircle,
  Package,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  CreditCard,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useRazorpayCheckout } from "@/app/lib/hooks/useRazorpayCheckout";
import CheckoutProgress from "../component/website/checkout/CheckoutProgress";
import OrderSummaryPanel from "../component/website/checkout/OrderSummaryPanel";
import {
  StepContact,
  StepAddress,
  StepShipping,
  StepPayment,
  StepReview,
} from "../component/steps/CheckoutSteps";

// ─── Order success screen ─────────────────────────────────────────────────────

function OrderSuccess({
  orderNumber,
  total,
  paymentMethod,
}: {
  orderNumber: string;
  total: number;
  paymentMethod: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const isCod = paymentMethod === "cod";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ background: "var(--gradient-gold)" }}
        >
          <CheckCircle size={44} style={{ color: "var(--rj-emerald)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <p
            className="label-accent mb-2"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Order placed successfully
          </p>
          <h1
            className="font-cormorant text-3xl font-light mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Thank you for your order!
          </h1>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {isCod
              ? "Your order is confirmed. Our team will prepare your jewellery and dispatch it shortly. Please keep the exact amount ready at delivery."
              : "Payment confirmed. Your gold is being prepared with care and will be dispatched soon."}
          </p>

          {/* COD reminder */}
          {isCod && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-4 text-left"
              style={{
                background: "rgba(186,117,23,0.08)",
                border: "1px solid rgba(186,117,23,0.2)",
              }}
            >
              <Truck
                size={16}
                style={{ color: "#BA7517", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
                  style={{ color: "#BA7517" }}
                >
                  Cash on Delivery
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  Please keep{" "}
                  <strong style={{ color: "var(--rj-charcoal)" }}>
                    ₹{total.toLocaleString("en-IN")}
                  </strong>{" "}
                  ready at the time of delivery. Payment is collected by the
                  courier partner.
                </p>
              </div>
            </div>
          )}

          {/* Order number */}
          <div
            className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl mb-6"
            style={{
              background: "rgba(0,55,32,0.06)",
              border: "1px solid rgba(0,55,32,0.12)",
            }}
          >
            <div className="text-left">
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase"
                style={{ color: "var(--rj-ash)" }}
              >
                Order ID
              </p>
              <p
                className="font-cinzel font-bold text-sm"
                style={{ color: "var(--rj-emerald)" }}
              >
                {orderNumber}
              </p>
            </div>
            <button
              onClick={copyOrder}
              className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-60"
              style={{
                color: copied ? "var(--rj-emerald)" : "var(--rj-ash)",
                cursor: "pointer",
              }}
            >
              {copied ? (
                <>
                  <Check size={11} /> Copied
                </>
              ) : (
                <>
                  <Copy size={11} /> Copy
                </>
              )}
            </button>
          </div>

          <p
            className="font-cinzel text-[10px] tracking-widest mb-8"
            style={{ color: "var(--rj-ash)" }}
          >
            Order total:{" "}
            <span className="font-bold" style={{ color: "var(--rj-charcoal)" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href={`/track-order?id=${orderNumber}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
              style={{
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
                cursor: "pointer",
              }}
            >
              <Package size={12} /> Track Order
            </Link>
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-70"
              style={{
                border: "1.5px solid var(--rj-bone)",
                color: "var(--rj-ash)",
                cursor: "pointer",
              }}
            >
              <ShoppingBag size={12} /> Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Payment stage overlay ────────────────────────────────────────────────────
// Shown while Razorpay modal is open or verification is running

function PaymentStageOverlay({ stage }: { stage: string }) {
  const isVerifying = stage === "verifying";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{ background: "rgba(0,26,15,0.82)", backdropFilter: "blur(8px)" }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        {isVerifying ? (
          <Loader2 size={40} style={{ color: "var(--rj-gold)" }} />
        ) : (
          <CreditCard size={40} style={{ color: "var(--rj-gold)" }} />
        )}
      </motion.div>
      <div className="text-center">
        <p
          className="font-cinzel text-sm tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-gold)" }}
        >
          {isVerifying ? "Verifying payment…" : "Payment window open"}
        </p>
        <p
          className="font-cinzel text-[10px] tracking-wider mt-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {isVerifying
            ? "Please wait while we confirm your payment"
            : "Complete payment in the Razorpay window"}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Error banner ─────────────────────────────────────────────────────────────

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

// ─── Main checkout shell ──────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const {
    step,
    nextStep,
    prevStep,
    setStep,
    contact,
    address,
    billingDiff,
    billingAddress,
    paymentMethod,
    couponApplied,
    couponCode,
    couponDiscount,
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

  useEffect(() => {
    useCheckoutStore.persist.rehydrate();
    setMounted(true);
  }, []);

  // Redirect if cart is empty (and not just succeeded)
  useEffect(() => {
    if (mounted && items.length === 0 && !result) {
      router.replace("/cart");
    }
  }, [mounted, items.length, result, router]);

  // Clear cart + store after success
  useEffect(() => {
    if (stage === "success" && result) {
      clearCart();
      resetCheckout();
    }
  }, [stage, result, clearCart, resetCheckout]);

  if (!mounted) return null;

  // ── Success screen ──────────────────────────────────────────────────────────
  if (stage === "success" && result) {
    return (
      <OrderSuccess
        orderNumber={result.orderNumber}
        total={result.total}
        paymentMethod={result.paymentMethod}
      />
    );
  }

  // ── Place order ─────────────────────────────────────────────────────────────
  const handlePlaceOrder = async () => {
    await initiate({
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.qty,
        sizeSelected: i.size,
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
      coupon: couponApplied
        ? {
            code: couponCode,
            discountType: "flat",
            discountValue: couponDiscount,
            discountAmount: couponDiscount,
          }
        : null,
      customerNote,
      giftMessage,
      isGift,
      source: "website",
    });
  };

  const isProcessing =
    stage === "creating_order" ||
    stage === "awaiting_payment" ||
    stage === "verifying";

  const stepComponents = [
    <StepContact key={1} onNext={nextStep} />,
    <StepAddress key={2} onBack={prevStep} onNext={nextStep} />,
    <StepShipping key={3} onBack={prevStep} onNext={nextStep} />,
    <StepPayment key={4} onBack={prevStep} onNext={nextStep} />,
    <StepReview
      key={5}
      onBack={prevStep}
      onPlaceOrder={handlePlaceOrder}
      loading={isProcessing}
      error={""} // we handle error below
    />,
  ];

  return (
    <>
      {/* Overlay during payment processing */}
      <AnimatePresence>
        {(stage === "awaiting_payment" || stage === "verifying") && (
          <PaymentStageOverlay stage={stage} />
        )}
      </AnimatePresence>

      <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
        {/* Header */}
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
          <CheckoutProgress current={step} onStep={setStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                {/* Error banner — shown above last step */}
                <AnimatePresence>
                  {stage === "error" && error && (
                    <CheckoutErrorBanner
                      message={error}
                      onDismiss={resetPayment}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {stepComponents[step - 1]}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <OrderSummaryPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
