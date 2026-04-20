"use client";

import React, { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const IconShipping = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M2 8h16v12H2z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M18 11h4l3 4v5h-7V11z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="21" r="2" stroke={color} strokeWidth="1.4" />
    <circle cx="21" cy="21" r="2" stroke={color} strokeWidth="1.4" />
    <path d="M2 12h10" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconSupport = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 4C8.477 4 4 8.477 4 14v3a3 3 0 0 0 3 3h1V14a7 7 0 1 1 14 0v6h1a3 3 0 0 0 3-3v-3C26 8.477 21.523 4 14 4z"
      stroke={color}
      strokeWidth="1.4"
    />
    <path
      d="M4 17v3a3 3 0 0 0 3 3h1v-6H7a3 3 0 0 0-3 3zM24 17a3 3 0 0 0-3-3h-1v6h1a3 3 0 0 0 3-3v0"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const IconQuality = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 3l2.8 5.6 6.2.9-4.5 4.4 1.1 6.1L14 17l-5.6 3 1.1-6.1L5 9.5l6.2-.9L14 3z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M9 22l2 3 3-4 3 4 2-3"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSecure = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 3l9 3.5v7C23 19 19 23.5 14 25 9 23.5 5 19 5 13.5v-7L14 3z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M10 14l3 3 5-5.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const features = [
  {
    Icon: IconShipping,
    title: "Free Shipping",
    description: "Enjoy free delivery on orders above ₹1000 across India.",
  },
  {
    Icon: IconSupport,
    title: "Customer Support",
    description:
      "We're here to assist you via call, WhatsApp, and email — whenever you need us.",
  },
  {
    Icon: IconQuality,
    title: "Quality Checked",
    description:
      "Every piece is carefully inspected to ensure it meets our standards of finish and design.",
  },
  {
    Icon: IconSecure,
    title: "Secure Payments",
    description: "Shop with confidence using safe and secure payment options.",
  },
];

/* ─────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────── */
function FeatureCard({
  Icon,
  title,
  description,
  index,
  visible,
}: {
  Icon: React.FC<{ color: string }>;
  title: string;
  description: string;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(32px) scale(0.97)",
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.13}s,
                     transform 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.13}s`,
      }}
    >
      <div
        className="relative flex flex-col items-center text-center px-7 py-9 rounded-2xl h-full"
        style={{
          background: hovered
            ? "linear-gradient(145deg, #004d2d, #003720, #002410)"
            : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "rgba(252,193,81,0.35)" : "rgba(252,193,81,0.12)"}`,
          boxShadow: hovered
            ? "0 20px 50px rgba(252,193,81,0.10), 0 4px 20px rgba(0,0,0,0.25)"
            : "0 4px 20px rgba(0,0,0,0.12)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition:
            "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
        }}
      >
        {/* Corner ornament – top left */}
        <div
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
          style={{
            borderTop: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "rgba(252,193,81,0.2)"}`,
            borderLeft: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "rgba(252,193,81,0.2)"}`,
            borderTopLeftRadius: "14px",
            transition: "border-color 0.4s ease",
          }}
        />
        {/* Corner ornament – bottom right */}
        <div
          className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
          style={{
            borderBottom: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "rgba(252,193,81,0.2)"}`,
            borderRight: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "rgba(252,193,81,0.2)"}`,
            borderBottomRightRadius: "14px",
            transition: "border-color 0.4s ease",
          }}
        />

        {/* Icon halo */}
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{
            background: hovered
              ? "rgba(252,193,81,0.15)"
              : "rgba(252,193,81,0.08)",
            boxShadow: hovered
              ? "0 0 32px rgba(252,193,81,0.20)"
              : "0 0 0px rgba(252,193,81,0)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition:
              "background 0.4s ease, box-shadow 0.4s ease, transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275)",
          }}
        >
          <Icon color={hovered ? "#fdd07a" : "#fcc151"} />
        </div>

        {/* Thin gold rule */}
        <div
          className="w-8 h-px mb-5"
          style={{
            background: `linear-gradient(to right, transparent, ${hovered ? "#fdd07a" : "#fcc151"}88, transparent)`,
            width: hovered ? "3rem" : "2rem",
            transition: "width 0.4s ease, background 0.4s ease",
          }}
        />

        {/* Title */}
        <h3
          className="text-base font-bold tracking-wide mb-3 leading-snug"
          style={{
            color: hovered ? "#fdd07a" : "#faf8f3",
            transition: "color 0.35s ease",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed"
          style={{
            color: hovered
              ? "rgba(250,248,243,0.80)"
              : "rgba(250,248,243,0.55)",
            transition: "color 0.35s ease",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes wc-shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes wc-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(160deg, #002410 0%, #003720 45%, #004d2d 100%)",
        }}
      >
        {/* ── Diagonal line texture ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #fcc151 0px, #fcc151 1px,
              transparent 1px, transparent 56px
            )`,
          }}
        />

        {/* ── Ambient glow orbs ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(252,193,81,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(252,193,81,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-60px",
            left: "-60px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,77,45,0.5) 0%, transparent 70%)",
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
            {/* Eyebrow */}
            <span
              className="block text-[10px] tracking-[0.35em] uppercase font-semibold mb-3"
              style={{ color: "#fcc151" }}
            >
              Our Promise
            </span>

            {/* Heading */}
            <h2
              className="heading-lg leading-none mb-4"
              style={{
                color: "#faf8f3",
                letterSpacing: "-0.02em",
              }}
            >
              Why Choose{" "}
              <span
                className="relative inline-block"
                style={{ color: "#fcc151" }}
              >
                Rehnoor Jewels
                {/* Shimmer sweep on the brand name */}
                <span
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ borderRadius: "2px" }}
                >
                  <span
                    className="absolute inset-y-0 w-12"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                      animation: "wc-shimmer 3.5s ease infinite",
                    }}
                  />
                </span>
              </span>
            </h2>

            {/* Decorative rule */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <div
                className="h-px"
                style={{
                  width: "60px",
                  background:
                    "linear-gradient(to right, transparent, rgba(252,193,81,0.6))",
                }}
              />
              {/* Rotating diamond */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                style={{ animation: "wc-spin 8s linear infinite" }}
              >
                <rect
                  x="6"
                  y="0.6"
                  width="7.6"
                  height="7.6"
                  rx="0.8"
                  transform="rotate(45 6 0.6)"
                  fill="rgba(252,193,81,0.25)"
                  stroke="#fcc151"
                  strokeWidth="0.9"
                />
              </svg>
              <div
                className="h-px"
                style={{
                  width: "60px",
                  background:
                    "linear-gradient(to left, transparent, rgba(252,193,81,0.6))",
                }}
              />
            </div>
          </div>

          {/* ── Feature grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                Icon={f.Icon}
                title={f.title}
                description={f.description}
                index={i}
                visible={visible}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
