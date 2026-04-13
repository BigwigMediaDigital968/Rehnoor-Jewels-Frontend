"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { CollectionMeta } from "./CollectionHero";

// ─────────────────────────────────────────────────────────────────
// FEATURE PILL
// ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    label: "Artisan Crafted",
    desc: "Hand-finished by master craftsmen",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Lifetime Warranty",
    desc: "Protected for generations",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Same-Day Dispatch",
    desc: "Order before 2 PM",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    label: "Made to Last",
    desc: "Wear it every day, forever",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: "Free Shipping",
    desc: "On all orders above ₹5,000",
  },
  {
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Ships Across India",
    desc: "To every corner of the country",
  },
];

// ─────────────────────────────────────────────────────────────────
// DECORATIVE ORNAMENT SVG
// ─────────────────────────────────────────────────────────────────
function GoldOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="12"
      viewBox="0 0 120 12"
      fill="none"
    >
      <line
        x1="0"
        y1="6"
        x2="46"
        y2="6"
        stroke="var(--rj-gold)"
        strokeWidth="0.75"
        strokeOpacity="0.6"
      />
      <circle cx="50" cy="6" r="2" fill="var(--rj-gold)" fillOpacity="0.5" />
      <circle
        cx="60"
        cy="6"
        r="3.5"
        fill="none"
        stroke="var(--rj-gold)"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      <circle cx="60" cy="6" r="1.5" fill="var(--rj-gold)" fillOpacity="0.9" />
      <circle cx="70" cy="6" r="2" fill="var(--rj-gold)" fillOpacity="0.5" />
      <line
        x1="74"
        y1="6"
        x2="120"
        y2="6"
        stroke="var(--rj-gold)"
        strokeWidth="0.75"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// SCROLLING TICKER STRIP
// ─────────────────────────────────────────────────────────────────
function TickerStrip() {
  const items = [
    "✦ Free Shipping Above ₹5,000",
    "✦ Artisan Crafted",
    "✦ Lifetime Warranty",
    "✦ Same-Day Dispatch",
    "✦ Ships Pan-India",
    "✦ Easy 07-Day Returns",
  ];
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-2.5"
      style={{
        borderTop: "1px solid rgba(252,193,81,0.2)",
        borderBottom: "1px solid rgba(252,193,81,0.2)",
        background: "rgba(252,193,81,0.2)",
      }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-cinzel text-[9px] tracking-[0.3em] uppercase flex-shrink-0"
            style={{ color: "var(--rj-emerald-dark)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
  inView,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group flex flex-col items-center text-center gap-2 px-3 py-4"
    >
      {/* Icon circle */}
      <div
        className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-400 group-hover:scale-110"
        style={{
          background: "rgba(252,193,81,0.08)",
          border: "1px solid rgba(252,193,81,0.25)",
          color: "var(--rj-gold)",
          transition: "all 0.35s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "var(--rj-emerald)";
          (e.currentTarget as HTMLElement).style.color = "var(--rj-gold)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "var(--rj-emerald)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(252,193,81,0.08)";
          (e.currentTarget as HTMLElement).style.color = "var(--rj-gold)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(252,193,81,0.25)";
        }}
      >
        {feature.icon}
      </div>

      {/* Label */}
      <p
        className="font-cinzel text-[9.5px] font-bold tracking-[0.22em] uppercase leading-tight"
        style={{ color: "var(--rj-charcoal)" }}
      >
        {feature.label}
      </p>

      {/* Desc */}
      <p
        className="font-cormorant text-[12px] leading-snug"
        style={{ color: "var(--rj-ash)" }}
      >
        {feature.desc}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function CollectionIntroStrip({
  meta,
}: {
  meta: CollectionMeta;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Split tagline words for animated reveal
  const taglineWords = (
    meta.tagline ?? "Where bold design meets everyday luxury."
  ).split(" ");

  return (
    <div ref={ref} style={{ background: "var(--rj-ivory)" }}>
      {/* ── TICKER ── */}
      <TickerStrip />

      {/* ── MAIN INTRO SECTION ── */}
      <div className="container-rj py-10">
        {/* ── Eyebrow line ── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <GoldOrnament />
          <span
            className="font-cinzel text-[9px] tracking-[0.45em] uppercase"
            style={{ color: "var(--rj-gold)" }}
          >
            {meta.label ?? "Collection"}
          </span>
          <GoldOrnament className="scale-x-[-1]" />
        </motion.div>

        {/* ── Main heading ── */}
        {/* <div className="text-center mb-5">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-cormorant font-semibold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              color: "var(--rj-emerald)",
              letterSpacing: "-0.01em",
            }}
          >
            {meta.label}
          </motion.h2>

         
          <p
            className="font-cormorant font-light mt-2 flex flex-wrap justify-center gap-x-[0.35em] gap-y-0"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              color: "var(--rj-charcoal)",
              opacity: 0.75,
            }}
          >
            {taglineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.18 + i * 0.055,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div> */}

        {/* ── Description ── */}
        {/* {meta.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-cormorant text-center max-w-2xl mx-auto text-[15px] leading-relaxed mb-10"
            style={{ color: "var(--rj-ash)" }}
          >
            {meta.description}
          </motion.p>
        )} */}

        {/* ── Feature grid ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0"
          style={{ borderTop: "1px solid var(--rj-bone)" }}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.label}
              style={{
                borderRight:
                  i < FEATURES.length - 1 ? "1px solid var(--rj-bone)" : "none",
                borderBottom: "1px solid var(--rj-bone)",
              }}
              // on mobile, every 2 cols — remove right border on every 2nd item
              className="[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(6n)]:border-r-0"
            >
              <FeatureCard feature={feature} index={i} inView={inView} />
            </div>
          ))}
        </div>

        {/* ── Product count badge ── */}
        {meta.productCount != null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.65 }}
            className="flex justify-center my-8"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(0,55,32,0.05)",
                border: "1px solid rgba(0,55,32,0.12)",
              }}
            >
              {/* Animated dot */}
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "var(--rj-gold)" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "var(--rj-gold)" }}
                />
              </span>
              <span
                className="font-cinzel text-[9px] tracking-[0.3em] uppercase"
                style={{ color: "var(--rj-emerald)" }}
              >
                {meta.productCount} Pieces in this Collection
              </span>
            </div>
          </motion.div>
        )}

        {/* ── Gold divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center gap-3 mb-10"
          style={{ transformOrigin: "center" }}
        >
          <div
            className="flex-1 max-w-[100px] h-px"
            style={{
              background: "linear-gradient(90deg, transparent, var(--rj-gold))",
            }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: "var(--rj-gold)" }}
          />
          <div
            className="w-2.5 h-2.5 rotate-45 border"
            style={{ borderColor: "var(--rj-gold)" }}
          />
          <div
            className="w-1.5 h-1.5 rotate-45"
            style={{ background: "var(--rj-gold)" }}
          />
          <div
            className="flex-1 max-w-[100px] h-px"
            style={{
              background: "linear-gradient(90deg, var(--rj-gold), transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
