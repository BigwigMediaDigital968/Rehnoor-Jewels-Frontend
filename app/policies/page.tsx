// app/policies/page.tsx  — Policies hub / index page
"use client";

import Link from "next/link";
import {
  ChevronRight,
  Truck,
  RefreshCw,
  Lock,
  FileText,
  XCircle,
  Cookie,
  Shield,
  CheckCircle,
} from "lucide-react";

const POLICIES = [
  {
    key: "shipping",
    label: "Shipping Policy",
    description:
      "Delivery timelines, courier partner (ShipRocket), shipping charges, packaging, and tracking information for all India orders.",
    href: "/policies/shipping",
    icon: <Truck size={20} />,
    tags: ["Pan India", "ShipRocket", "24–48hr Processing"],
  },
  {
    key: "returns",
    label: "Return & Refund Policy",
    description:
      "7-day return window for damaged products, 6-month extended return at 50% refund, 5-step return process, and warranty details.",
    href: "/policies/returns",
    icon: <RefreshCw size={20} />,
    tags: ["7-Day Returns", "6-Month Extended", "5–7 Day Refunds"],
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    description:
      "How we collect, use, and protect your personal data. Third-party disclosures for Razorpay, Google Analytics, and Facebook Pixel.",
    href: "/policies/privacy",
    icon: <Lock size={20} />,
    tags: ["IT Act 2000", "Data Protection", "GDPR Aligned"],
  },
  {
    key: "terms",
    label: "Terms & Conditions",
    description:
      "Website usage rules, account creation, gold pricing policy, product accuracy disclaimer, intellectual property, and governing law.",
    href: "/policies/terms",
    icon: <FileText size={20} />,
    tags: ["Dynamic Pricing", "IP Rights", "Delhi Jurisdiction"],
  },
  {
    key: "cancellation",
    label: "Cancellation Policy",
    description:
      "Cancel before dispatch, refund timelines by payment method, and what to do when cancellation isn't possible after dispatch.",
    href: "/policies/cancellation",
    icon: <XCircle size={20} />,
    tags: ["Pre-Dispatch Only", "Full Refund", "5–7 Day Processing"],
  },
  {
    key: "cookies",
    label: "Cookie Policy",
    description:
      "Types of cookies used (essential, analytics, marketing, preference), third-party cookies, browser controls, and opt-out options.",
    href: "/policies/cookies",
    icon: <Cookie size={20} />,
    tags: ["Google Analytics", "Facebook Pixel", "User Controls"],
  },
];

export default function PoliciesIndexPage() {
  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "5rem",
          paddingBottom: "4rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-6">
            <Link
              href="/"
              className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Home
            </Link>
            <ChevronRight
              size={10}
              style={{ color: "rgba(255,255,255,0.2)" }}
            />
            <span
              className="font-cinzel text-[9px] tracking-widest uppercase"
              style={{ color: "var(--rj-gold)" }}
            >
              Policies
            </span>
          </nav>

          <p
            className="font-cinzel text-[10px] tracking-widest uppercase mb-3"
            style={{ color: "rgba(252,193,81,0.7)" }}
          >
            ✦ Legal & Policies
          </p>
          <h1
            className="font-cormorant font-light text-white mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Our Policies
          </h1>
          <p
            className="text-sm max-w-xl leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            Rehnoor Jewels is committed to transparency. All our policies are
            crafted to comply with Indian consumer law.
          </p>

          {/* Compliance badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["Consumer Protection Act 2019", "IT Act 2000 (India)"].map(
              (b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 font-cinzel text-[8px] tracking-widest uppercase px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(252,193,81,0.15)",
                    color: "var(--rj-gold)",
                    border: "1px solid rgba(252,193,81,0.3)",
                  }}
                >
                  <CheckCircle size={9} /> {b}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ── Business Details Strip ── */}
      <div
        style={{ background: "#fff", borderBottom: "1px solid var(--rj-bone)" }}
      >
        <div className="container-rj py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Business Name", value: "Rehnoor Jewels" },
              { label: "GST Number", value: "07BFIPT1365P1ZQ" },
              { label: "Support Email", value: "hello@rehnoorjewels.com" },
              { label: "Registered City", value: "Delhi, India" },
            ].map((item) => (
              <div key={item.label}>
                <p
                  className="font-cinzel text-[8px] tracking-widest uppercase mb-0.5"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {item.label}
                </p>
                <p
                  className="font-cinzel text-[10px] font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Policy Cards Grid ── */}
      <div className="container-rj py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POLICIES.map((policy) => (
            <Link
              key={policy.key}
              href={policy.href}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid var(--rj-bone)",
                background: "#fff",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}
            >
              {/* Card Header */}
              <div
                className="flex items-center gap-4 px-6 py-5"
                style={{
                  background: "rgba(0,55,32,0.04)",
                  borderBottom: "1px solid var(--rj-bone)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[var(--rj-emerald)]"
                  style={{
                    background: "rgba(0,55,32,0.1)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-200">
                    {policy.icon}
                  </span>
                </div>
                <div>
                  <p
                    className="font-cinzel text-xs font-bold transition-colors duration-200 group-hover:text-[var(--rj-emerald)]"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {policy.label}
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  className="ml-auto transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "var(--rj-bone)" }}
                />
              </div>

              {/* Card Body */}
              <div className="px-6 py-5 flex-1 flex flex-col gap-4">
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {policy.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {policy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-cinzel text-[8px] tracking-wider px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(0,55,32,0.06)",
                        color: "var(--rj-emerald)",
                        border: "1px solid rgba(0,55,32,0.1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Compliance Note ── */}
        <div
          className="mt-14 p-8 rounded-2xl"
          style={{
            background: "rgba(0,55,32,0.04)",
            border: "1px solid rgba(0,55,32,0.1)",
          }}
        >
          <div className="flex items-start gap-4">
            <Shield
              size={20}
              style={{
                color: "var(--rj-emerald)",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <div>
              <p
                className="font-cinzel text-sm font-bold mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                Policy Compliance Statement
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                All policies on this page have been prepared to comply with the{" "}
                <strong>Consumer Protection Act, 2019</strong>, the{" "}
                <strong>Information Technology Act, 2000</strong>, and the
                guidelines of the <strong>Reserve Bank of India (RBI)</strong>{" "}
                as applicable to e-commerce merchants.
              </p>
              <p
                className="text-sm leading-relaxed mt-2"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                For any questions or concerns regarding these policies, please
                contact us at <strong>hello@rehnoorjewels.com</strong> or
                WhatsApp <strong>+91 84485 81529</strong> (Monday to Saturday,
                10:00 AM – 6:00 PM IST).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background: "var(--rj-emerald)", padding: "2.5rem 0" }}>
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
            <div className="flex flex-wrap gap-x-5 gap-y-1 justify-end">
              {POLICIES.map((p) => (
                <Link
                  key={p.key}
                  href={p.href}
                  className="font-cinzel text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {p.label}
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
