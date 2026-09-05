"use client";

import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";

interface ShiprocketCheckoutButtonProps {
  label?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => boolean | void;
  onSuccess?: () => void; // Called when checkout completes successfully
  className?: string;
  style?: React.CSSProperties;
}

export default function ShiprocketCheckoutButton({
  label = "Proceed to Buy Now",
  disabled = false,
  onClick,
  onSuccess,
  className = "",
  style,
}: ShiprocketCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Fire the custom onClick handler first (e.g., setBuyNow, validate options)
    if (onClick) {
      const isValid = onClick();
      // If explicit boolean false is returned, halt checkout flow
      if (isValid === false) return;
    }

    try {
      setLoading(true);

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // 1. Fetch active items (handles normal cart or Buy Now items)
      const cartItems = useCartStore.getState().checkoutItems();

      if (!cartItems.length) {
        alert("Your cart is empty.");
        setLoading(false);
        return;
      }

      // 2. Map items to fit Shiprocket API structure
      const formattedItems = cartItems.map((item) => ({
        variantId: item.variant?.variantId || item.productId,
        productId: item.productId,
        quantity: item.qty,
        name: item.name,
        price: item.priceNum,
      }));

      // 3. Save order metadata to sessionStorage for ThankYouPage display
      const pendingOrder = {
        orderNumber: `RJ-${Math.floor(100000 + Math.random() * 900000)}`,
        total: useCartStore.getState().grandTotal(),
        paymentMethod: "prepaid",
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.priceNum,
          qty: item.qty,
          variant: { variantId: item.variant?.variantId },
        })),
      };
      sessionStorage.setItem("rj_last_order", JSON.stringify(pendingOrder));

      // 4. Request Shiprocket Access Token
      const response = await fetch(
        `${API_BASE_URL}/api/shiprocket/access-token`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: formattedItems,
            redirectUrl: `${window.location.origin}/thankyou`,
          }),
        },
      );

      const data = await response.json();

      if (!data.success || !data.token) {
        alert("Failed to initialize checkout session. Please try again.");
        return;
      }

      // Execute success callback if provided (e.g., removing drawer item)
      if (onSuccess) {
        onSuccess();
      }

      // 5. Trigger Headless Checkout
      if (window.HeadlessCheckout?.addToCart) {
        window.HeadlessCheckout.addToCart(e, data.token, {
          fallbackUrl: `${window.location.origin}/cart`,
        });
      } else {
        window.location.href = `${window.location.origin}/checkout`;
      }
    } catch (err) {
      console.error("Checkout initiation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={`w-full font-cinzel tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      style={{
        background: "var(--rj-emerald)",
        color: "var(--rj-gold)",
        ...style,
      }}
    >
      {loading ? "Initializing..." : label}
    </button>
  );
}
