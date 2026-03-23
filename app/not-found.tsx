// app/not-found.tsx
// ─────────────────────────────────────────────────────────────────
// Next.js App Router global 404 page.
// This file is automatically shown for ALL unmatched routes.
// No import or config needed — just place this at app/not-found.tsx
// ─────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Home,
  Package,
  Heart,
  ShoppingBag,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// FLOATING GOLD PARTICLES (client-only, no hydration mismatch)
// ─────────────────────────────────────────────────────────────────
const PARTICLES = [
  { x: 12, y: 18, s: 3, d: 0 },
  { x: 85, y: 8, s: 2, d: 0.4 },
  { x: 25, y: 72, s: 4, d: 0.8 },
  { x: 70, y: 65, s: 2, d: 1.2 },
  { x: 90, y: 40, s: 3, d: 0.6 },
  { x: 5, y: 50, s: 2, d: 1.6 },
  { x: 50, y: 5, s: 4, d: 0.2 },
  { x: 60, y: 85, s: 2, d: 1.0 },
  { x: 38, y: 90, s: 3, d: 1.4 },
  { x: 78, y: 22, s: 2, d: 1.8 },
  { x: 18, y: 38, s: 2, d: 0.9 },
  { x: 92, y: 78, s: 3, d: 0.3 },
];

// Quick links shown below the CTA
const LINKS = [
  { href: "/", label: "Home", icon: <Home size={14} /> },
  { href: "/collections", label: "Collections", icon: <Package size={14} /> },
  { href: "/products", label: "Products", icon: <ShoppingBag size={14} /> },
  { href: "/wishlist", label: "Wishlist", icon: <Heart size={14} /> },
];

// ─────────────────────────────────────────────────────────────────
// ANIMATED CHAIN LINKS (decorative SVG)
// ─────────────────────────────────────────────────────────────────
function ChainDecoration() {
  return (
    <svg
      width="220"
      height="40"
      viewBox="0 0 220 40"
      className="mx-auto mb-2 opacity-30"
      aria-hidden="true"
    >
      {/* Repeating chain links */}
      {[0, 40, 80, 120, 160].map((x, i) => (
        <g key={i}>
          <ellipse
            cx={x + 18}
            cy={20}
            rx={16}
            ry={9}
            fill="none"
            stroke="var(--rj-gold)"
            strokeWidth="2"
          />
          {/* cross bar */}
          <line
            x1={x + 4}
            y1={20}
            x2={x + 32}
            y2={20}
            stroke="var(--rj-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* connector lines */}
      {[34, 74, 114, 154].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={20}
          x2={x + 6}
          y2={20}
          stroke="var(--rj-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN 404 PAGE
// ─────────────────────────────────────────────────────────────────
export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--rj-emerald)" }}
    >
      {/* ── Floating gold particles ── */}
      {mounted &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s * 4,
              height: p.s * 4,
              background: "var(--rj-gold)",
              opacity: 0.18,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.18, 0.4, 0.18] }}
            transition={{
              duration: 3 + p.d,
              delay: p.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ── Background decorative rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[320, 500, 680, 860].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              border: `1px solid rgba(252,193,81,${0.06 - i * 0.01})`,
            }}
          />
        ))}
      </div>

      {/* ── Diagonal gold accent lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 bottom-0 left-[15%] w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(252,193,81,0.12), transparent)",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-[15%] w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(252,193,81,0.12), transparent)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════
          CONTENT CARD
      ══════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">
        {/* ── Brand mark ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10"
        >
          <Link href="/" style={{ cursor: "pointer" }}>
            <p
              className="font-cinzel font-black tracking-[0.35em] leading-none"
              style={{ fontSize: "1.1rem", color: "var(--rj-gold)" }}
            >
              REHNOOR
            </p>
            <p
              className="font-cinzel tracking-[0.5em] mt-0.5"
              style={{ fontSize: "0.55rem", color: "rgba(252,193,81,0.5)" }}
            >
              JEWELS
            </p>
          </Link>
        </motion.div>

        {/* ── Giant 404 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          className="relative mb-2"
        >
          {/* Ghost text behind */}
          <p
            className="absolute inset-0 font-cormorant font-light select-none pointer-events-none flex items-center justify-center"
            style={{
              fontSize: "clamp(9rem,22vw,14rem)",
              color: "rgba(252,193,81,0.06)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              top: "4px",
              left: "4px",
            }}
            aria-hidden="true"
          >
            404
          </p>
          {/* Main 404 */}
          <p
            className="font-cormorant font-light leading-none"
            style={{
              fontSize: "clamp(9rem,22vw,14rem)",
              color: "var(--rj-gold)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            404
          </p>
        </motion.div>

        {/* ── Chain decoration ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChainDecoration />
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="font-cormorant font-light leading-tight mb-3"
          style={{
            fontSize: "clamp(1.5rem,5vw,2.4rem)",
            color: "#fff",
            letterSpacing: "-0.01em",
          }}
        >
          This page got lost
          <br />
          <em className="font-normal" style={{ color: "var(--rj-gold)" }}>
            in the gold vault
          </em>
        </motion.h1>

        {/* ── Sub copy ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="font-cinzel text-xs tracking-widest uppercase mb-8"
          style={{ color: "rgba(255,255,255,0.35)", lineHeight: 2 }}
        >
          The URL you visited doesn't exist.
          <br />
          But our gold collection is right where you left it.
        </motion.p>

        {/* ── Search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full mb-5"
        >
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "rgba(252,193,81,0.5)" }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chains, rings, kadas…"
            className="w-full pl-10 pr-4 py-3.5 font-cinzel text-xs tracking-wider outline-none rounded-full transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: `1px solid ${searchQuery ? "rgba(252,193,81,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: "#fff",
              boxShadow: searchQuery
                ? "0 0 0 3px rgba(252,193,81,0.07)"
                : "none",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
          />
        </motion.div>

        {/* ── Primary CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-3 w-full mb-10"
        >
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-cinzel text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
            style={{
              background: "var(--gradient-gold)",
              color: "var(--rj-emerald)",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(252,193,81,0.2)",
            }}
          >
            <Home size={13} />
            Go Home
          </Link>
          <Link
            href="/collections"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-cinzel text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:bg-white/10 active:scale-95"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.75)",
              cursor: "pointer",
            }}
          >
            <Package size={13} />
            Browse Collections
          </Link>
        </motion.div>

        {/* ── Quick links grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="w-full"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "1.5rem",
          }}
        >
          <p
            className="font-cinzel text-[9px] tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Or go to
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-[10px] tracking-widest uppercase transition-all duration-200 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                }}
              >
                <span style={{ color: "rgba(252,193,81,0.6)" }}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── Back button ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          onClick={() => window.history.back()}
          className="mt-8 flex items-center gap-1.5 font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: "rgba(255,255,255,0.2)", cursor: "pointer" }}
        >
          <ArrowLeft size={11} />
          Go back
        </motion.button>
      </div>

      {/* ── Bottom gold line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(252,193,81,0.4), transparent)",
        }}
      />
    </main>
  );
}
