// app/checkout/page.tsx  (or component/website/checkout/CheckoutShell.tsx)
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
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { placeOrder } from "../lib/api/orders";
import CheckoutProgress from "../component/website/checkout/CheckoutProgress";
import OrderSummaryPanel from "../component/website/checkout/OrderSummaryPanel";
import {
  StepContact,
  StepAddress,
  StepShipping,
  StepPayment,
  StepReview,
} from "../component/steps/CheckoutSteps";

// ─────────────────────────────────────────────────────────────────
// ORDER SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────────
function OrderSuccess({
  orderNumber,
  total,
}: {
  orderNumber: string;
  total: number;
}) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const copyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Animated checkmark */}
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
            className="text-sm leading-relaxed mb-6"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            We've received your order and will send a confirmation to your email
            shortly. Your gold is being prepared with care.
          </p>

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

          {/* Total */}
          <p
            className="font-cinzel text-[10px] tracking-widest mb-8"
            style={{ color: "var(--rj-ash)" }}
          >
            Order total:{" "}
            <span className="font-bold" style={{ color: "var(--rj-charcoal)" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </p>

          {/* CTA buttons */}
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

// ─────────────────────────────────────────────────────────────────
// MAIN CHECKOUT SHELL
// ─────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, grandTotal, clearCart } = useCartStore();
  const {
    step,
    nextStep,
    prevStep,
    setStep,
    contact,
    address,
    billingDiff,
    billingAddress,
    shippingMethod,
    paymentMethod,
    couponApplied,
    couponCode,
    couponDiscount,
    customerNote,
    giftMessage,
    isGift,
    reset,
  } = useCheckoutStore();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [successData, setSuccessData] = useState<{
    orderNumber: string;
    total: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    useCheckoutStore.persist.rehydrate();
    setMounted(true);
  }, []);

  // Redirect to cart if empty
  useEffect(() => {
    if (mounted && items.length === 0 && !successData) {
      router.replace("/cart");
    }
  }, [mounted, items.length, successData, router]);

  if (!mounted) return null;

  // ── Show success screen ──────────────────────────────────────
  if (successData) {
    return (
      <OrderSuccess
        orderNumber={successData.orderNumber}
        total={successData.total}
      />
    );
  }

  // ── Place order handler ──────────────────────────────────────
  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    setOrderError("");
    try {
      const payload = {
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.qty,
          sizeSelected: i.size,
        })),
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: address.country,
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
              country: billingAddress.country,
              landmark: billingAddress.landmark,
            }
          : undefined,
        billingSameAsShipping: !billingDiff,
        paymentMethod,
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
      };

      const res = await placeOrder(payload);

      if (!res.success || !res.data) {
        setOrderError(
          res.message || "Failed to place order. Please try again.",
        );
        setPlacingOrder(false);
        return;
      }

      // ── For Razorpay: open payment modal ──
      if (paymentMethod === "razorpay" && typeof window !== "undefined") {
        // TODO: load Razorpay script, create gateway order, open modal
        // import { createRazorpayOrder, verifyRazorpayPayment } from "../../lib/api/orders";
        // const gw = await createRazorpayOrder(res.data.total, res.data.orderNumber);
        // open Razorpay checkout with gw.id…
      }

      // ── For COD / UPI: order is placed directly ──
      clearCart();
      reset();
      setSuccessData({
        orderNumber: res.data.orderNumber,
        total: res.data.total,
      });
    } catch (err) {
      setOrderError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  const stepComponents = [
    <StepContact key={1} onNext={nextStep} />,
    <StepAddress key={2} onBack={prevStep} onNext={nextStep} />,
    <StepShipping key={3} onBack={prevStep} onNext={nextStep} />,
    <StepPayment key={4} onBack={prevStep} onNext={nextStep} />,
    <StepReview
      key={5}
      onBack={prevStep}
      onPlaceOrder={handlePlaceOrder}
      loading={placingOrder}
      error={orderError}
    />,
  ];

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Header ── */}
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
        {/* Progress bar */}
        <CheckoutProgress current={step} onStep={setStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
          {/* ── Left: step forms (2 cols) ── */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "#fff",
                border: "1px solid var(--rj-bone)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}
            >
              <AnimatePresence mode="wait">
                {stepComponents[step - 1]}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Right: order summary ── */}
          <div>
            <OrderSummaryPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
