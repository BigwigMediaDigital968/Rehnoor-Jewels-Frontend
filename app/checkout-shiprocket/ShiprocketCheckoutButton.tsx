"use client";

import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";

interface ShiprocketCheckoutButtonProps {
  disabled?: boolean;
  onClick?: () => boolean | void;
}

export default function ShiprocketCheckoutButton({
  disabled = false,
  onClick,
}: ShiprocketCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      className="w-full py-4 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 mb-3 cursor-pointer"
      style={{
        background: "var(--rj-emerald)",
        color: "var(--rj-gold)",
        cursor: "pointer",
      }}
    >
      {loading ? "Initializing..." : "Proceed to Buy Now"}
    </button>
  );
}
