"use client";
import Image from "next/image";
import { Tag, X, Check, Lock, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import Tooltip from "../../shared/Tooltip";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useCartStore } from "@/app/store/cartStore";
import {
  validateCoupon,
  type ValidateCouponResponse,
} from "@/app/lib/api/orders";

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const SHIPPING_COST: Record<string, number> = {
  standard: 0,
  express: 149,
  same_day: 299,
};

const SHIPPING_LABEL: Record<string, string> = {
  standard: "Standard (5–7 days)",
  express: "Express (2–3 days)",
  same_day: "Same Day",
};

export default function OrderSummaryPanel() {
  // 1. Pull current active properties & setters directly from Cart Store
  const {
    checkoutItems,
    subtotal,
    savings,
    coupon: cartCoupon,
    applyCoupon: applyCartCoupon,
    removeCoupon: removeCartCoupon,
  } = useCartStore();

  const {
    shippingMethod,
    setCoupon: setCheckoutCoupon,
    clearCoupon: clearCheckoutCoupon,
  } = useCheckoutStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [couponLoad, setCouponLoad] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Compute values dynamically
  const activeItems = checkoutItems();
  const sub = subtotal();
  const save = savings();
  // const ship = SHIPPING_COST[shippingMethod] ?? 129;
  const FREE_SHIPPING_THRESHOLD = 999;
  const DEFAULT_SHIPPING_CHARGE = 129;

  const ship = sub >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_CHARGE;

  // Deriving active validation from cart store settings
  const isCouponApplied = !!cartCoupon?.code;
  const activeCouponCode = cartCoupon?.code || "";
  const discount = cartCoupon?.discountAmount ?? 0;
  const total = Math.max(0, sub - discount + ship);

  // Determine if a Buy X Get Y discount is happening
  const isBuyXGetY = isCouponApplied && cartCoupon?.discountType === "buy_x_get_y";

  // Identify the free item ID by looking for the item that matches the discount amount
  let freeItemId: string | number | null = null;
  if (isBuyXGetY && discount > 0) {
    // Find the item whose individual priceNum matches the calculated discount value
    const matchingItem = activeItems.find((item) => item.priceNum === discount);
    
    if (matchingItem) {
      freeItemId = matchingItem.id;
    } else {
      // Fallback: if precision differs, pick the item with the lowest priceNum
      const lowestPricedItem = [...activeItems].sort((a, b) => a.priceNum - b.priceNum)[0];
      if (lowestPricedItem) freeItemId = lowestPricedItem.id;
    }
  }

  // Keep CheckoutStore dynamically synchronized with changes originating from the Cart page
  useEffect(() => {
    if (isCouponApplied) {
      setCheckoutCoupon(activeCouponCode, discount);
    } else {
      clearCheckoutCoupon();
    }
  }, [
    isCouponApplied,
    activeCouponCode,
    discount,
    setCheckoutCoupon,
    clearCheckoutCoupon,
  ]);

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setCouponLoad(true);
    setCouponErr("");

    try {
      const res = await validateCoupon(code, sub, activeItems);

      if (!res.success || !res.coupon) {
        setCouponErr(res.message || "Invalid coupon code.");
        return;
      }

      const discountAmount = res.discountAmount ?? 0;
      const discountType = res.coupon.discountType;
      const discountValue = res.coupon.discountValue ?? 0;

      const finalDiscount =
        discountType === "free_shipping" ? 0 : discountAmount;

      // Update centralized data store configurations globally
      applyCartCoupon({
        code,
        discountAmount: finalDiscount,
        discountType: discountType as any,
        discountValue,
      });

      setCouponInput("");
    } catch {
      setCouponErr("Something went wrong. Try again.");
    } finally {
      setCouponLoad(false);
    }
  };

  const handleClearCoupon = () => {
    removeCartCoupon();
    clearCheckoutCoupon();
  };


  return (
    <aside
      className="rounded-2xl overflow-hidden sticky top-24"
      style={{ border: "1px solid var(--rj-bone)", background: "#fff" }}
    >
      {/* Header — tap to collapse on mobile */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
        style={{ background: "var(--rj-emerald)" }}
      >
        <p
          className="font-cinzel text-xs tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-gold)" }}
        >
          ✦ Order Summary ({activeItems.length} item
          {activeItems.length !== 1 ? "s" : ""})
        </p>
        <div className="flex items-center gap-2">
          <span
            className="font-cinzel font-bold text-sm"
            style={{ color: "var(--rj-gold)" }}
          >
            {fmt(total)}
          </span>
          <ChevronDown
            size={14}
            style={{
              color: "rgba(252,193,81,0.6)",
              transform: collapsed ? "rotate(-90deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
        </div>
      </button>

      {!collapsed && (
        <div className="p-5 flex flex-col gap-4">
          {/* Items Map */}
          <div className="flex flex-col gap-3">
            {activeItems.map((item) => {
              // Check if this particular mapped item is the one marked as free
              const isThisItemFree = item.id === freeItemId;

              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ background: "var(--rj-ivory-dark)" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    {/* qty badge */}
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-cinzel text-[9px] font-bold"
                      style={{ background: "var(--rj-charcoal)", color: "#fff" }}
                    >
                      {item.qty}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-cormorant font-light leading-snug line-clamp-1"
                      style={{ fontSize: "0.95rem", color: "var(--rj-charcoal)" }}
                    >
                      {item.name}
                    </p>

                    {item.variant ? (
                      <p
                        className="font-cinzel text-[9px] tracking-wider mt-0.5"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {item.variant.title}
                      </p>
                    ) : item.subtitle ? (
                      <p
                        className="font-cinzel text-[9px] tracking-wider mt-0.5"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {item.subtitle}
                      </p>
                    ) : null}
                    
                    {/* Visual context subtext tag under name for clarity */}
                    {isThisItemFree && (
                      <span 
                        className="inline-block font-cinzel text-[8px] font-bold tracking-widest px-1.5 py-0.5 mt-1 rounded uppercase"
                        style={{ background: "rgba(0,55,32,0.08)", color: "var(--rj-emerald)" }}
                      >
                        Free Promotional Item
                      </span>
                    )}
                  </div>
                  
                  {/* Dynamic Price Display */}
                  <p
                    className="font-cinzel font-bold text-xs flex-shrink-0"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    {isThisItemFree ? (
                      <span className="uppercase tracking-wider">Free</span>
                    ) : (
                      fmt(item.priceNum * item.qty)
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="h-px" style={{ background: "var(--rj-bone)" }} />

          {/* Coupon Input */}
          {!isCouponApplied ? (
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag
                    size={12}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: couponErr ? "#fca5a5" : "var(--rj-ash)" }}
                  />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponErr("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                    placeholder="Coupon code"
                    className="w-full pl-8 pr-3 py-2 font-cinzel text-xs tracking-wider outline-none rounded-lg"
                    style={{
                      background: "var(--rj-ivory-dark)",
                      border: `1px solid ${couponErr ? "#fca5a5" : "var(--rj-bone)"}`,
                      color: "var(--rj-charcoal)",
                    }}
                  />
                </div>
                <Tooltip content="Apply coupon code">
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponInput.trim() || couponLoad}
                    className="px-3 py-2 rounded-lg font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all disabled:opacity-40"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                      cursor: "pointer",
                    }}
                  >
                    {couponLoad ? "…" : "Apply"}
                  </button>
                </Tooltip>
              </div>
              {couponErr && (
                <p
                  className="font-cinzel text-[9px] mt-1"
                  style={{ color: "#ef4444" }}
                >
                  {couponErr}
                </p>
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{
                background: "rgba(0,55,32,0.06)",
                border: "1px solid rgba(0,55,32,0.12)",
              }}
            >
              <div className="flex items-center gap-2">
                <Check size={12} style={{ color: "var(--rj-emerald)" }} />
                <span
                  className="font-cinzel text-[10px] font-bold"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {isBuyXGetY 
                    ? `${activeCouponCode} — Free Item Applied` 
                    : `${activeCouponCode} — ${fmt(discount)} off`}
                </span>
              </div>
              <Tooltip content="Remove coupon">
                <button
                  onClick={handleClearCoupon}
                  style={{ cursor: "pointer" }}
                >
                  <X size={12} style={{ color: "var(--rj-ash)" }} />
                </button>
              </Tooltip>
            </div>
          )}

          <div className="h-px" style={{ background: "var(--rj-bone)" }} />

          {/* Price breakdown */}
          {[
            { label: "Subtotal", value: fmt(sub), green: false },
            ...(save > 0
              ? [
                  {
                    label: "Product savings",
                    value: `-${fmt(save)}`,
                    green: true,
                  },
                ]
              : []),
            ...(discount > 0
              ? [
                  {
                    label: isBuyXGetY
                      ? `Offer (${activeCouponCode}) — Lowest Item Free`
                      : `Coupon (${activeCouponCode})`,
                    value: `-${fmt(discount)}`,
                    green: true,
                  },
                ]
              : []),
            {
              label:
                ship === 0
                  ? `Shipping (Free on orders ₹${FREE_SHIPPING_THRESHOLD}+)`
                  : `Shipping`,
              value: ship === 0 ? "Free" : fmt(ship),
              green: ship === 0,
            },
          ].map((l: any) => (
            <div key={l.label} className="flex items-center justify-between">
              <span
                className="font-cinzel text-[10px] tracking-wider"
                style={{ color: "var(--rj-ash)" }}
              >
                {l.label}
              </span>
              <span
                className="font-cinzel text-xs font-bold"
                style={{
                  color: l.green ? "var(--rj-emerald)" : "var(--rj-charcoal)",
                }}
              >
                {l.value}
              </span>
            </div>
          ))}

          {sub < FREE_SHIPPING_THRESHOLD && (
            <p
              className="font-cinzel text-[9px] text-center"
              style={{ color: "var(--rj-ash)" }}
            >
              Add {fmt(FREE_SHIPPING_THRESHOLD - sub)} more to get{" "}
              <strong>FREE Shipping</strong>.
            </p>
          )}

          <div className="h-px" style={{ background: "var(--rj-bone)" }} />

          <div className="flex items-center justify-between">
            <span
              className="font-cinzel text-sm font-bold tracking-wider"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Total
            </span>
            <span
              className="font-cormorant font-light"
              style={{ fontSize: "1.6rem", color: "var(--rj-charcoal)" }}
            >
              {fmt(total)}
            </span>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <Lock size={11} style={{ color: "var(--rj-ash)" }} />
            <span
              className="font-cinzel text-[8px] tracking-wider uppercase"
              style={{ color: "var(--rj-ash)" }}
            >
              256-bit SSL secured checkout
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}