"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "../store/cartStore";

interface ShiprocketCheckoutButtonProps {
  label?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => boolean | void;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ShiprocketCheckoutButton({
  label = "Proceed to Buy Now",
  disabled = false,
  onClick,
  onSuccess,
  onCancel,
  className = "",
  style,
}: ShiprocketCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  // Listen to Shiprocket SDK window events safely without TypeScript type mismatches
  useEffect(() => {
    const handleSuccess = () => {
      onSuccess?.();
    };

    const handleCancel = () => {
      onCancel?.();
    };

    window.addEventListener("shiprocket_checkout_success", handleSuccess);
    window.addEventListener("shiprocket_checkout_cancel", handleCancel);
    window.addEventListener("shiprocket_checkout_close", handleCancel);

    return () => {
      window.removeEventListener("shiprocket_checkout_success", handleSuccess);
      window.removeEventListener("shiprocket_checkout_cancel", handleCancel);
      window.removeEventListener("shiprocket_checkout_close", handleCancel);
    };
  }, [onSuccess, onCancel]);

  const handleCheckout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 1. Run validation/setup handler
    if (onClick) {
      const isValid = onClick();
      if (isValid === false) return;
    }

    try {
      setLoading(true);

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // 2. Fetch active checkout items
      const cartItems = useCartStore.getState().checkoutItems();

      if (!cartItems.length) {
        alert("Your cart is empty.");
        setLoading(false);
        return;
      }

      // 3. Map items to fit Shiprocket API structure
      const formattedItems = cartItems.map((item) => ({
        variantId: item.variant?.variantId || item.productId,
        productId: item.productId,
        quantity: item.qty,
        name: item.name,
        price: item.priceNum,
      }));

      // 4. Save order metadata to sessionStorage for ThankYouPage
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

      // 5. Request Shiprocket Access Token
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
        onCancel?.();
        return;
      }

      // 6. Trigger Headless Checkout passing strictly allowed properties
      if (window.HeadlessCheckout?.addToCart) {
        window.HeadlessCheckout.addToCart(e, data.token, {
          fallbackUrl: `${window.location.origin}/checkout`,
        });
      } else {
        window.location.href = `${window.location.origin}/checkout`;
      }
    } catch (err) {
      console.error("Checkout initiation error:", err);
      onCancel?.();
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
