"use client";

import React, { useState } from "react";

declare global {
  interface Window {
    HeadlessCheckout?: {
      addToCart: (
        event: React.MouseEvent<HTMLButtonElement>,
        token: string,
        options: { fallbackUrl: string }
      ) => void;
    };
  }
}

interface CartItem {
  variantId: string | number;
  quantity: number;
}

interface CheckoutButtonProps {
  cartItems: CartItem[];
  fallbackUrl?: string;
  className?: string;
}

export default function ShiprocketCheckoutButton({
  cartItems,
  fallbackUrl = "https://rehnoorjewels.com/checkout",
  className = "",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleShiprocketCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get access token from your backend endpoint
      const res = await fetch("https://rehnoor-jewels-backend-7d5n.onrender.com/api/shiprocket/access-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          redirectUrl: "https://rehnoorjewels.com/thankyou",
        }),
      });

      const data = await res.json();
      const token = data?.result?.token || data?.token;

      if (!token) {
        throw new Error("Token not received from server");
      }

      // 2. Trigger Shiprocket Headless Checkout iFrame
      if (window.HeadlessCheckout?.addToCart) {
        window.HeadlessCheckout.addToCart(e, token, { fallbackUrl });
      } else {
        // Fallback if script fails to load
        window.location.href = fallbackUrl;
      }
    } catch (err) {
      console.error("Shiprocket Checkout Error:", err);
      // Redirect to native fallback checkout if iframe fails
      window.location.href = fallbackUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleShiprocketCheckout}
      disabled={loading || cartItems.length === 0}
      className={`w-full py-3 bg-[var(--rj-charcoal)] text-white font-cinzel text-xs tracking-widest uppercase font-bold hover:opacity-90 transition-all ${className}`}
    >
      {loading ? "Initializing Fast Checkout..." : "Buy Now with Shiprocket"}
    </button>
  );
}