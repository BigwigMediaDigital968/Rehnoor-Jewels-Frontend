// component/website/checkout/shared/OrderSummaryPanel.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag, X, Check, Lock, ChevronDown } from "lucide-react";
import { useState } from "react";

import Tooltip from "../../shared/Tooltip";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useCartStore } from "@/app/store/cartStore";

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
  const { items, subtotal, savings } = useCartStore();
  const {
    shippingMethod,
    couponApplied,
    couponCode,
    couponDiscount,
    clearCoupon,
    setCoupon,
  } = useCheckoutStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponErr, setCouponErr] = useState("");
  const [couponLoad, setCouponLoad] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sub = subtotal();
  const save = savings();
  const ship = SHIPPING_COST[shippingMethod] ?? 0;
  const discount = couponDiscount;
  const total = Math.max(0, sub - discount + ship);

  const applyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    setCouponLoad(true);
    setCouponErr("");
    // Client-side demo — replace with real API call from lib/api/orders.ts
    await new Promise((r) => setTimeout(r, 700));
    const DEMO: Record<string, number> = {
      GOLD10: 500,
      REHNOOR20: 1000,
      FIRST15: 750,
    };
    if (DEMO[code]) {
      setCoupon(code, DEMO[code]);
      setCouponInput("");
    } else {
      setCouponErr("Invalid code. Try GOLD10");
    }
    setCouponLoad(false);
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
          ✦ Order Summary ({items.length} item{items.length !== 1 ? "s" : ""})
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
          {/* Items */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
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
                  <p
                    className="font-cinzel text-[9px] tracking-wider mt-0.5"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    Size: {item.size}
                  </p>
                </div>
                <p
                  className="font-cinzel font-bold text-xs flex-shrink-0"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {fmt(item.priceNum * item.qty)}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px" style={{ background: "var(--rj-bone)" }} />

          {/* Coupon */}
          {!couponApplied ? (
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
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
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
                    onClick={applyCoupon}
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
                  {couponCode} — {fmt(discount)} off
                </span>
              </div>
              <Tooltip content="Remove coupon">
                <button onClick={clearCoupon} style={{ cursor: "pointer" }}>
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
                    label: `Coupon (${couponCode})`,
                    value: `-${fmt(discount)}`,
                    green: true,
                  },
                ]
              : []),
            {
              label: `Shipping (${SHIPPING_LABEL[shippingMethod]})`,
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
