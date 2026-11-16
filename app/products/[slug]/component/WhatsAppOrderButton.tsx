"use client";

import React, { useState } from "react";
import { MessageCircle, Share2, Check } from "lucide-react";
import type { Product } from "../../../types/Product.types";

interface WhatsAppOrderButtonProps {
  product: Product;
  selectedOptions?: Record<string, string>;
  quantity?: number;
  activePrice?: string;
  activeSku?: string;
  phoneNumber?: string;
}

export default function WhatsAppOrderButton({
  product,
  selectedOptions = {},
  quantity = 1,
  activePrice,
  activeSku,
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
}: WhatsAppOrderButtonProps) {
  const [linkCopied, setLinkCopied] = useState(false);

  const getProductUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.rehnoorjewels.com"}${product.href}`;
  };

  const handleWhatsAppOrder = () => {
    const siteUrl = getProductUrl();

    const variantEntries = Object.entries(selectedOptions).filter(
      ([, val]) => Boolean(val)
    );

    const variantLine =
      variantEntries.length > 0
        ? `• *Selection:* ${variantEntries
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ")}`
        : "";

    const skuValue = activeSku || product.sku;
    const skuLine = skuValue ? `• *SKU:* ${skuValue}` : "";

    const message = [
      `Hello *Rehnoor Jewels*! ✨`,
      `I would like to place an order / inquire about this piece:`,
      ``,
      `• *Product:* ${product.name}`,
      `• *Price:* ${activePrice || product.price}`,
      skuLine,
      variantLine,
      `• *Quantity:* ${quantity}`,
      `• *Link:* ${siteUrl}`,
      ``,
      `Please assist me with placing this order.`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareProduct = async () => {
    const shareUrl = getProductUrl();
    const shareData = {
      title: `${product.name} | Rehnoor Jewels`,
      text: `Check out ${product.name} (${activePrice || product.price}) from Rehnoor Jewels ✨`,
      url: shareUrl,
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (err) {
      // Ignore user-cancelled native share dialog; fall back to clipboard on failure
      if ((err as Error)?.name === "AbortError") return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    }
  };

  return (
    <div className="flex items-center gap-2.5 w-full mt-4">
      {/* Primary Order on WhatsApp Pill */}
      <button
        type="button"
        onClick={handleWhatsAppOrder}
        className="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-full font-cinzel text-[11px] tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer group"
        style={{
          background: "rgba(0, 55, 32, 0.06)",
          border: "1.5px solid var(--rj-emerald)",
          color: "var(--rj-emerald)",
        }}
      >
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{ background: "#25D366", color: "#FFFFFF" }}
        >
          <MessageCircle size={12} fill="#FFFFFF" />
        </span>
        <span>Order on WhatsApp</span>
      </button>

      {/* Share Product Button */}
      <button
        type="button"
        onClick={handleShareProduct}
        aria-label="Share product link"
        title={linkCopied ? "Link copied!" : "Share product link"}
        className="shrink-0 h-[44px] px-4 rounded-full flex items-center justify-center gap-1.5 font-cinzel text-[10px] tracking-wider uppercase font-bold transition-all duration-300 hover:shadow-sm active:scale-95 cursor-pointer"
        style={{
          background: linkCopied ? "var(--rj-emerald)" : "#FFFFFF",
          border: linkCopied
            ? "1.5px solid var(--rj-emerald)"
            : "1.5px solid var(--rj-bone)",
          color: linkCopied ? "#FFFFFF" : "var(--rj-charcoal)",
        }}
      >
        {linkCopied ? (
          <>
            <Check size={14} strokeWidth={2.5} />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Share2 size={14} style={{ color: "var(--rj-emerald)" }} />
            <span className="hidden sm:inline">Share</span>
          </>
        )}
      </button>
    </div>
  );
}