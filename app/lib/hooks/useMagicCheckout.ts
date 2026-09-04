// app/lib/hooks/useMagicCheckout.ts
//
// Parallel to app/lib/hooks/useRazorpayCheckout.ts — deliberately not
// modifying that file. This one drives the Magic Checkout modal.

import { useState, useCallback, useRef } from "react";
import { useCartStore, CartItem } from "@/app/store/cartStore";

export type MagicCheckoutStage =
  | "idle"
  | "creating_order" // POST /api/magic-checkout/create-order
  | "awaiting_payment" // Magic Checkout modal open
  | "verifying" // POST /api/magic-checkout/verify
  | "success"
  | "error";

export interface MagicCheckoutResult {
  orderNumber: string;
  orderId: string;
  total: number;
  paymentMethod: string;
}

interface MagicCheckoutContact {
  name: string;
  email: string;
  phone: string;
}

const RJ_NAME = "Rehnoor Jewels";

let scriptLoadPromise: Promise<void> | null = null;
function loadMagicCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).Razorpay) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/magic-checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Could not load Razorpay Magic Checkout script."));
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
}

export function useMagicCheckout() {
  const [stage, setStage] = useState<MagicCheckoutStage>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<MagicCheckoutResult | null>(null);
  const rzpRef = useRef<any>(null);

  const reset = useCallback(() => {
    setStage("idle");
    setError("");
    setResult(null);
  }, []);

  const initiate = useCallback(async (contact: MagicCheckoutContact) => {
    setStage("creating_order");
    setError("");

    try {
      const cartItems: CartItem[] = useCartStore.getState().checkoutItems();
      const couponCode = useCartStore.getState().coupon?.code || null;

      const items = cartItems.map((i) => ({
        productId: i.productId,
        variantId: i.variant?.variantId ?? null,
        quantity: i.qty,
        customNote: i.customNote,
      }));

      // ── Step 1: create order (our Next.js API route) ──────────────────────
      const createRes = await fetch("/api/magic-checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, contact, couponCode }),
      });
      const createData = await createRes.json();

      if (!createData.success) {
        setError(createData.message || "Could not start checkout.");
        setStage("error");
        return;
      }

      const { magicOrderId, razorpayOrderId } = createData.data;

      // ── Step 2: load script + open Magic Checkout modal ───────────────────
      await loadMagicCheckoutScript();
      setStage("awaiting_payment");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        one_click_checkout: true,
        name: RJ_NAME,
        order_id: razorpayOrderId,
        show_coupons: true,
        redirect: false,
        prefill: {
          name: contact.name,
          email: contact.email,
          contact: contact.phone,
          ...(couponCode ? { coupon_code: couponCode } : {}),
        },
        notes: { magicOrderId },
        theme: { color: "#003720" }, // --rj-emerald
        modal: {
          confirm_close: true,
          animation: true,
          ondismiss: () => {
            setError(
              "Checkout was closed before payment completed. You can try again anytime.",
            );
            setStage("error");
          },
        },
        handler: async (response: any) => {
          setStage("verifying");

          try {
            const verifyRes = await fetch("/api/magic-checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                magicOrderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              setError(
                verifyData.message ||
                  "Payment received but verification failed. Contact support with Payment ID: " +
                    response.razorpay_payment_id,
              );
              setStage("error");
              return;
            }

            setResult(verifyData.data);
            setStage("success");
          } catch (err) {
            setError("Could not verify payment. Please contact support.");
            setStage("error");
          }
        },
      };

      const RazorpayConstructor = (window as Record<string, any>).Razorpay;
      rzpRef.current = new RazorpayConstructor(options);
      rzpRef.current.open();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not open Magic Checkout. Check your internet connection.",
      );
      setStage("error");
    }
  }, []);

  return { stage, error, result, initiate, reset };
}
