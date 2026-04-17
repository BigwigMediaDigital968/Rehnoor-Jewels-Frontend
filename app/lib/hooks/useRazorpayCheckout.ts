// hooks/useRazorpayCheckout.ts
// Encapsulates the entire Razorpay payment flow:
//   placeOrder → open modal → verifyPayment → success / failure
// The checkout page just calls `initiate()` and reacts to returned state.

import { useState, useCallback } from "react";
import {
  placeOrder,
  verifyRazorpayPayment,
  PlaceOrderPayload,
} from "@/app/lib/api/orders";
import {
  openRazorpayCheckout,
  RazorpaySuccessResponse,
} from "@/app/lib/razorpay";

export type CheckoutStage =
  | "idle"
  | "creating_order" // POST /api/orders
  | "awaiting_payment" // Razorpay modal open
  | "verifying" // POST /api/payments/razorpay/verify
  | "success"
  | "error";

export interface CheckoutResult {
  orderNumber: string;
  orderId: string;
  total: number;
  paymentMethod: string;
}

interface UseRazorpayCheckoutReturn {
  stage: CheckoutStage;
  error: string;
  result: CheckoutResult | null;
  initiate: (payload: PlaceOrderPayload) => Promise<void>;
  reset: () => void;
}

const RJ_NAME = "Rehnoor Jewels";
const RJ_LOGO = "/logo-square.png"; // put your square logo here
const RJ_THEME = "#003720"; // --rj-emerald

export function useRazorpayCheckout(): UseRazorpayCheckoutReturn {
  const [stage, setStage] = useState<CheckoutStage>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckoutResult | null>(null);

  const reset = useCallback(() => {
    setStage("idle");
    setError("");
    setResult(null);
  }, []);

  const initiate = useCallback(async (payload: PlaceOrderPayload) => {
    setStage("creating_order");
    setError("");

    // ── Step 1: Create order record on our backend ────────────────────────────
    const res = await placeOrder(payload);

    if (!res.success || !res.data) {
      setError(res.message || "Failed to place order.");
      setStage("error");
      return;
    }

    const {
      _id: orderId,
      orderNumber,
      total,
      paymentMethod,
      razorpayOrderId,
    } = res.data;

    // ── COD / non-gateway path ────────────────────────────────────────────────
    if (paymentMethod !== "razorpay" || !razorpayOrderId) {
      setResult({ orderNumber, orderId, total, paymentMethod });
      setStage("success");
      return;
    }

    // ── Razorpay path ─────────────────────────────────────────────────────────
    setStage("awaiting_payment");

    try {
      await openRazorpayCheckout({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: Math.round(total * 100), // paise
        currency: "INR",
        name: RJ_NAME,
        description: `Order ${orderNumber}`,
        image: RJ_LOGO,
        order_id: razorpayOrderId,

        prefill: {
          name: payload.customerName,
          email: payload.customerEmail,
          contact: payload.customerPhone,
        },

        notes: {
          orderNumber,
          orderId,
        },

        theme: { color: RJ_THEME },

        modal: {
          confirm_close: true,
          animation: true,
          ondismiss: () => {
            // User closed the modal without paying
            setError(
              "Payment was not completed. Your order has been saved — you can retry from My Orders.",
            );
            setStage("error");
          },
        },

        handler: async (response: RazorpaySuccessResponse) => {
          // ── Step 2: Verify on our backend ─────────────────────────────────
          setStage("verifying");

          const verifyRes = await verifyRazorpayPayment({
            orderId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (!verifyRes.success) {
            setError(
              verifyRes.message ||
                "Payment received but verification failed. Contact support with your Payment ID: " +
                  response.razorpay_payment_id,
            );
            setStage("error");
            return;
          }

          setResult({ orderNumber, orderId, total, paymentMethod });
          setStage("success");
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not open payment window. Check your internet connection.",
      );
      setStage("error");
    }
  }, []);

  return { stage, error, result, initiate, reset };
}
