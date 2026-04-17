// lib/razorpay.ts
// Lazily loads the Razorpay checkout script — safe to call multiple times.

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number; // paise
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string; // Razorpay gateway order ID (order_xxx)
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
    animation?: boolean;
  };
}

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayInstance {
  open(): void;
  close(): void;
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Already loaded
    if (window.Razorpay) return resolve(true);

    // Script already in DOM (e.g. concurrent calls)
    if (document.getElementById("razorpay-sdk")) {
      const check = setInterval(() => {
        if (window.Razorpay) {
          clearInterval(check);
          resolve(true);
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout(
  options: RazorpayOptions,
): Promise<RazorpayInstance> {
  const loaded = await loadRazorpayScript();
  if (!loaded)
    throw new Error("Failed to load Razorpay. Check your internet connection.");
  const rzp = new window.Razorpay(options);
  rzp.open();
  return rzp;
}
