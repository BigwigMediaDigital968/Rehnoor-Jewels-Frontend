// app/policies/components/PolicyLayout.tsx
// Shared UI primitives and page shell for all Rehnoor Jewels policy pages.
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Shield,
  Mail,
  Phone,
  Clock,
  MapPin,
  Truck,
  RefreshCw,
  Lock,
  FileText,
  XCircle,
  Cookie,
} from "lucide-react";

// ─── Policy Tab Config ─────────────────────────────────────────────────────────
export type PolicyKey =
  | "shipping"
  | "returns"
  | "privacy"
  | "terms"
  | "cancellation"
  | "cookies";

export const POLICY_TABS: {
  key: PolicyKey;
  label: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    key: "shipping",
    label: "Shipping Policy",
    icon: <Truck size={14} />,
    href: "/policies/shipping",
  },
  {
    key: "returns",
    label: "Return & Refund",
    icon: <RefreshCw size={14} />,
    href: "/policies/returns",
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    icon: <Lock size={14} />,
    href: "/policies/privacy",
  },
  // {
  //   key: "terms",
  //   label: "Terms & Conditions",
  //   icon: <FileText size={14} />,
  //   href: "/policies/terms",
  // },
  {
    key: "cancellation",
    label: "Cancellation Policy",
    icon: <XCircle size={14} />,
    href: "/policies/cancellation",
  },
  {
    key: "cookies",
    label: "Cookie Policy",
    icon: <Cookie size={14} />,
    href: "/policies/cookies",
  },
];

// ─── Shared Section Wrapper ────────────────────────────────────────────────────
export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2
        className="font-cormorant font-light mb-4 pb-3"
        style={{
          fontSize: "1.5rem",
          color: "var(--rj-charcoal)",
          borderBottom: "1px solid var(--rj-bone)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

// ─── Body Paragraph ───────────────────────────────────────────────────────────
export function PolicyP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm leading-relaxed"
      style={{
        color: "var(--rj-ash)",
        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
        lineHeight: "1.8",
      }}
    >
      {children}
    </p>
  );
}

// ─── Checkmark List ───────────────────────────────────────────────────────────
export function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle
            size={13}
            style={{
              color: "var(--rj-emerald)",
              flexShrink: 0,
              marginTop: 3,
            }}
          />
          <span
            className="text-sm leading-relaxed"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── Highlight Box ────────────────────────────────────────────────────────────
export function HighlightBox({
  icon,
  title,
  children,
  variant = "green",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: "green" | "gold" | "red";
}) {
  const colors = {
    green: {
      bg: "rgba(0,55,32,0.05)",
      border: "rgba(0,55,32,0.12)",
      icon: "var(--rj-emerald)",
    },
    gold: {
      bg: "rgba(252,193,81,0.08)",
      border: "rgba(252,193,81,0.25)",
      icon: "#a07800",
    },
    red: {
      bg: "rgba(239,68,68,0.05)",
      border: "rgba(239,68,68,0.2)",
      icon: "#ef4444",
    },
  };
  const c = colors[variant];
  return (
    <div
      className="flex gap-3 p-4 rounded-xl"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <div style={{ color: c.icon, flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
          style={{ color: c.icon }}
        >
          {title}
        </p>
        <div
          className="text-sm leading-relaxed"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Info Grid ────────────────────────────────────────────────────────────────
export function InfoGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-3.5 rounded-xl"
          style={{
            background: "var(--rj-ivory-dark)",
            border: "1px solid var(--rj-bone)",
          }}
        >
          <p
            className="font-cinzel text-[8px] tracking-widest uppercase mb-1"
            style={{ color: "var(--rj-ash)" }}
          >
            {item.label}
          </p>
          <p
            className="font-cinzel text-xs font-bold"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
export function StepCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="flex gap-4 p-4 rounded-xl"
      style={{
        background: "var(--rj-ivory-dark)",
        border: "1px solid var(--rj-bone)",
      }}
    >
      <div
        className="font-cormorant text-3xl font-light flex-shrink-0"
        style={{ color: "var(--rj-gold)", lineHeight: 1 }}
      >
        {step}
      </div>
      <div>
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
          style={{ color: "var(--rj-emerald)" }}
        >
          {title}
        </p>
        <p
          className="text-sm"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

// ─── Full Page Shell ──────────────────────────────────────────────────────────
export function PolicyPageShell({
  activeKey,
  title,
  lastUpdated,
  children,
}: {
  activeKey: PolicyKey;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Emerald Hero Header ── */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-6 flex-wrap">
            {["Home", "Policies", title].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={i === 0 ? "/" : "/policies"}
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {c}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase mb-2"
                style={{ color: "rgba(252,193,81,0.7)" }}
              >
                ✦ Legal & Policies
              </p>
              <h1
                className="font-cormorant font-light text-white leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h1>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Last Updated
              </p>
              <p
                className="font-cinzel text-xs font-bold"
                style={{ color: "var(--rj-gold)" }}
              >
                {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Business Info Strip ── */}
      <div
        style={{
          background: "rgba(0,55,32,0.06)",
          borderBottom: "1px solid var(--rj-bone)",
        }}
      >
        <div className="container-rj py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            {[
              {
                icon: <MapPin size={10} />,
                text: "10722, Pratap Nagar, Delhi 110007",
              },
              { icon: <Mail size={10} />, text: "hello@rehnoorjewels.com" },
              { icon: <Phone size={10} />, text: "+91 84485 81529" },
              { icon: <Clock size={10} />, text: "Mon–Sat, 10 AM – 6 PM" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5">
                <span style={{ color: "var(--rj-emerald)" }}>{item.icon}</span>
                <span
                  className="font-cinzel text-[9px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--rj-bone)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="container-rj">
          <div className="flex overflow-x-auto no-scrollbar">
            {POLICY_TABS.map((tab) => {
              const active = tab.key === activeKey;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className="flex items-center gap-2 px-4 py-4 font-cinzel text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={{
                    color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                    borderBottom: active
                      ? "2px solid var(--rj-emerald)"
                      : "2px solid transparent",
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  <span
                    style={{
                      color: active ? "var(--rj-emerald)" : "var(--rj-bone)",
                    }}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Body Grid ── */}
      <div className="container-rj py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Quick Links */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--rj-bone)" }}
              >
                <div
                  className="px-5 py-4"
                  style={{ background: "var(--rj-emerald)" }}
                >
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    ✦ All Policies
                  </p>
                </div>
                <div className="p-2">
                  {POLICY_TABS.map((tab) => {
                    const active = tab.key === activeKey;
                    return (
                      <Link
                        key={tab.key}
                        href={tab.href}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                        style={{
                          background: active
                            ? "rgba(0,55,32,0.06)"
                            : "transparent",
                        }}
                      >
                        <span
                          style={{
                            color: active
                              ? "var(--rj-emerald)"
                              : "var(--rj-bone)",
                          }}
                        >
                          {tab.icon}
                        </span>
                        <span
                          className="font-cinzel text-[9px] tracking-wider flex-1"
                          style={{
                            color: active
                              ? "var(--rj-emerald)"
                              : "var(--rj-ash)",
                            fontWeight: active ? 700 : 400,
                          }}
                        >
                          {tab.label}
                        </span>
                        {active && (
                          <ChevronRight
                            size={10}
                            style={{ color: "var(--rj-emerald)" }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Contact Card */}
              <div
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(0,55,32,0.05)",
                  border: "1px solid rgba(0,55,32,0.12)",
                }}
              >
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Need Help?
                </p>
                {[
                  {
                    icon: <Mail size={12} />,
                    label: "Email",
                    value: "hello@rehnoorjewels.com",
                  },
                  {
                    icon: <Phone size={12} />,
                    label: "WhatsApp",
                    value: "+91 84485 81529",
                  },
                  {
                    icon: <Clock size={12} />,
                    label: "Hours",
                    value: "Mon–Sat, 10 AM – 6 PM",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-2.5">
                    <span style={{ color: "var(--rj-emerald)", marginTop: 1 }}>
                      {c.icon}
                    </span>
                    <div>
                      <p
                        className="font-cinzel text-[8px] tracking-wider uppercase"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="font-cinzel text-[10px] font-bold"
                        style={{ color: "var(--rj-charcoal)" }}
                      >
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(252,193,81,0.06)",
                  border: "1px solid rgba(252,193,81,0.2)",
                }}
              >
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
                  style={{ color: "#a07800" }}
                >
                  ✦ Our Commitment
                </p>
                {[
                  // "BIS Hallmarked Jewellery",
                  "Pure 24K Gold Plating",
                  "100–300 mg Gold Per Piece",
                  "6-Month Warranty",
                  "Secure Razorpay Payments",
                  "GST: 07BFIPT1365P1ZQ",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 py-1.5"
                    style={{ borderBottom: "1px solid rgba(252,193,81,0.15)" }}
                  >
                    <CheckCircle
                      size={11}
                      style={{ color: "#a07800", flexShrink: 0 }}
                    />
                    <span
                      className="font-cinzel text-[9px] tracking-wider"
                      style={{ color: "#a07800" }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Footer Strip ── */}
      <div style={{ background: "var(--rj-emerald)", padding: "2rem 0" }}>
        <div className="container-rj">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-cormorant text-2xl font-light text-white">
                Rehnoor Jewels
              </p>
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Pure Gold · Timeless Craft · Delhi, India
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 justify-center sm:justify-end">
              {POLICY_TABS.map((tab) => (
                <Link
                  key={tab.key}
                  href={tab.href}
                  className="font-cinzel text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{
                    color:
                      activeKey === tab.key
                        ? "var(--rj-gold)"
                        : "rgba(255,255,255,0.4)",
                  }}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="font-cinzel text-[8px] tracking-wider text-center"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              © {new Date().getFullYear()} Rehnoor Jewels · GST: 07BFIPT1365P1ZQ
              · 10722, Pratap Nagar, Delhi 110007 · All Rights Reserved ·
              Governed by Laws of India
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
