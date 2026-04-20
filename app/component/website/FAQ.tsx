"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export interface FAQLink {
  text: string;
  href: string;
  external?: boolean;
}

export interface FAQItem {
  question: string;
  /** Plain string, or an array of mixed text + link segments */
  answer: FAQAnswerSegment[] | string;
}

export type FAQAnswerSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; external?: boolean };

export interface FAQsProps {
  /** Small eyebrow line above the title  e.g. "Need help?" */
  tagline?: string;
  /** Section heading  e.g. "Frequently Asked Questions" */
  title?: string;
  /** Optional subtitle / description below the title */
  subtitle?: string;
  items: FAQItem[];
  /** "light" = ivory bg (default)  |  "dark" = emerald bg */
  theme?: "light" | "dark";
  /** Allow multiple items open at once (default false) */
  allowMultiple?: boolean;
}

/* ─────────────────────────────────────────────
   ANSWER RENDERER  (handles both string & rich)
───────────────────────────────────────────── */
function RenderAnswer({
  answer,
  dark,
  accent,
}: {
  answer: FAQItem["answer"];
  dark: boolean;
  accent: string;
}) {
  const bodyColor = dark ? "rgba(250,248,243,0.72)" : "rgba(26,26,26,0.65)";

  if (typeof answer === "string") {
    return (
      <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
        {answer}
      </p>
    );
  }

  return (
    <p className="text-sm leading-relaxed" style={{ color: bodyColor }}>
      {answer.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        const isExternal = seg.external ?? seg.href.startsWith("http");
        return isExternal ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-75"
            style={{ color: accent, textDecorationColor: `${accent}88` }}
          >
            {seg.value}
          </a>
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-75"
            style={{ color: accent, textDecorationColor: `${accent}88` }}
          >
            {seg.value}
          </Link>
        );
      })}
    </p>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED ACCORDION ITEM
───────────────────────────────────────────── */
function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
  dark,
  accent,
  index,
  visible,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  dark: boolean;
  accent: string;
  index: number;
  visible: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  const borderColor = dark ? "rgba(252,193,81,0.12)" : "rgba(0,55,32,0.10)";
  const borderColorHover = dark
    ? "rgba(252,193,81,0.28)"
    : "rgba(0,55,32,0.22)";
  const questionColor = dark ? "#faf8f3" : "#1a1a1a";
  const bgOpen = dark ? "rgba(252,193,81,0.05)" : "rgba(0,55,32,0.03)";

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s,
                     transform 0.55s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s`,
      }}
    >
      <div
        className="rounded-xl overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${isOpen ? borderColorHover : borderColor}`,
          background: isOpen ? bgOpen : "transparent",
          boxShadow: isOpen
            ? dark
              ? `0 4px 24px rgba(252,193,81,0.06)`
              : `0 4px 24px rgba(0,55,32,0.05)`
            : "none",
        }}
      >
        {/* Question row */}
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
          style={{ cursor: "pointer" }}
        >
          {/* Index + Question */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Number pip */}
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider mt-0.5 transition-all duration-300"
              style={{
                background: isOpen ? accent : "transparent",
                border: `1px solid ${accent}${isOpen ? "ff" : "55"}`,
                color: isOpen ? (dark ? "#1a1a1a" : "#fff") : accent,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="heading-sm text-[18px] leading-snug tracking-wide"
              style={{
                color: isOpen ? accent : questionColor,
                transition: "color 0.3s ease",
              }}
            >
              {item.question}
            </h3>
          </div>

          {/* +/− icon */}
          <span
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-400"
            style={{
              border: `1px solid ${accent}${isOpen ? "cc" : "44"}`,
              background: isOpen ? accent : "transparent",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition:
                "transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), background 0.3s ease, border-color 0.3s ease",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line
                x1="6"
                y1="1"
                x2="6"
                y2="11"
                stroke={isOpen ? (dark ? "#1a1a1a" : "#fff") : accent}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="6"
                x2="11"
                y2="6"
                stroke={isOpen ? (dark ? "#1a1a1a" : "#fff") : accent}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        {/* Answer — animated height */}
        <div
          style={{
            height: `${height}px`,
            overflow: "hidden",
            transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div ref={contentRef} className="px-6 pb-5 pl-16">
            {/* Thin accent rule */}
            <div
              className="mb-3 h-px w-8"
              style={{
                background: `linear-gradient(to right, ${accent}66, transparent)`,
              }}
            />
            <RenderAnswer answer={item.answer} dark={dark} accent={accent} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORNAMENT
───────────────────────────────────────────── */
function DiamondDivider({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      <div
        className="h-px w-14"
        style={{
          background: `linear-gradient(to right, transparent, ${color}66)`,
        }}
      />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <rect
          x="5"
          y="0.5"
          width="6.36"
          height="6.36"
          rx="0.5"
          transform="rotate(45 5 0.5)"
          fill={color}
          opacity="0.4"
          stroke={color}
          strokeWidth="0.8"
        />
      </svg>
      <div
        className="h-px w-14"
        style={{
          background: `linear-gradient(to left, transparent, ${color}66)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function FAQs({
  tagline = "Got questions?",
  title = "Frequently Asked Questions",
  subtitle,
  items,
  theme = "light",
  allowMultiple = false,
}: FAQsProps) {
  const dark = theme === "dark";
  const accent = dark ? "#fcc151" : "#003720";
  const accentAlt = dark ? "#fdd07a" : "#004d2d";

  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        if (!allowMultiple) next.clear();
        next.add(i);
      }
      return next;
    });
  };

  /* ── Split items into two columns for wide screens ── */
  const mid = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, mid);
  const rightItems = items.slice(mid);

  const sectionBg = dark
    ? "linear-gradient(135deg, #002410 0%, #003720 50%, #004d2d 100%)"
    : "var(--rj-ivory)";

  return (
    <>
      <style>{`
        @keyframes faq-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
        style={{ background: sectionBg }}
      >
        {/* ── Subtle texture ── */}
        {dark ? (
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #fcc151 0px, #fcc151 1px, transparent 1px, transparent 56px)`,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-[0.055] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #003720 1px, transparent 1px)`,
              backgroundSize: "26px 26px",
            }}
          />
        )}

        {/* ── Ambient glow orbs ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-80px",
            right: "-80px",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle, rgba(252,193,81,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,55,32,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-80px",
            left: "-80px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: dark
              ? "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(252,193,81,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* ── Section header ── */}
          <div
            className="text-center mb-14 md:mb-16"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-semibold mb-3"
              style={{ color: accent }}
            >
              {tagline}
            </span>

            <h2
              className="heading-lg tracking-tight leading-none mb-4"
              style={{
                color: dark ? "#faf8f3" : "#1a1a1a",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="text-sm md:text-base max-w-lg mx-auto leading-relaxed"
                style={{
                  color: dark
                    ? "rgba(250,248,243,0.52)"
                    : "rgba(26,26,26,0.52)",
                }}
              >
                {subtitle}
              </p>
            )}

            <DiamondDivider color={accent} />
          </div>

          {/* ── Accordion grid ── */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl flex flex-col gap-3">
              {items.map((item, i) => (
                <FAQAccordionItem
                  key={i}
                  item={item}
                  isOpen={openIndices.has(i)}
                  onToggle={() => toggle(i)}
                  dark={dark}
                  accent={i % 2 === 0 ? accent : accentAlt} // optional alternating accent
                  index={i}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
