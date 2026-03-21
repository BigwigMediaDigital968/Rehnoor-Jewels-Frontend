"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight, ExternalLink } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// PLATFORM CONFIG
// ─────────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@rehnoorjewels",
    url: "https://instagram.com/rehnoorjewels",
    followers: "42.6K",
    followerLabel: "Followers",
    accent: "#E1306C",
    accentRgb: "225,48,108",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Rehnoor Jewels",
    url: "https://facebook.com/rehnoorjewels",
    followers: "28.4K",
    followerLabel: "Page Likes",
    accent: "#1877F2",
    accentRgb: "24,119,242",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "@rehnoorjewels",
    url: "https://pinterest.com/rehnoorjewels",
    followers: "18.9K",
    followerLabel: "Monthly Views",
    accent: "#E60023",
    accentRgb: "230,0,35",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    id: "x",
    label: "X (Twitter)",
    handle: "@rehnoorjewels",
    url: "https://x.com/rehnoorjewels",
    followers: "9.2K",
    followerLabel: "Followers",
    accent: "#000000",
    accentRgb: "255,255,255",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Rehnoor Jewels",
    url: "https://linkedin.com/company/rehnoorjewels",
    followers: "5.8K",
    followerLabel: "Connections",
    accent: "#0A66C2",
    accentRgb: "10,102,194",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────
// INSTAGRAM POSTS
// ─────────────────────────────────────────────────────────────────
const POSTS = [
  {
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    likes: "2.4K",
    caption: "Nawabi chain. Zero compromise. ✦",
    tag: "#PatraPerfection",
  },
  {
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85",
    likes: "1.8K",
    caption: "The kada that commands a room.",
    tag: "#GoldLooksGoodOnYou",
  },
  {
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    likes: "3.1K",
    caption: "Signet ring. Solid 18kt. Solid mood.",
    tag: "#PowerInPatra",
  },
  {
    img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=85",
    likes: "987",
    caption: "Link bracelet. Because details matter.",
    tag: "#SmartStyle",
  },
  {
    img: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=85",
    likes: "4.2K",
    caption: "Om pendant. Sacred. Stunning.",
    tag: "#QueenOnABudget",
  },
  {
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85",
    likes: "2.7K",
    caption: "Rope chain. Timeless meets today.",
    tag: "#RehnoorJewels",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

// ─────────────────────────────────────────────────────────────────
// PLATFORM CARD
// ─────────────────────────────────────────────────────────────────
function PlatformCard({
  platform,
  index,
  inView,
}: {
  platform: (typeof PLATFORMS)[number];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.12}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col items-center justify-between p-6 rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        minHeight: "200px",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        boxShadow: hovered
          ? `0 20px 60px rgba(${platform.accentRgb},0.18), 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      {/* Animated background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 0%, rgba(${platform.accentRgb},0.10) 0%, transparent 70%)`,
        }}
      />

      {/* Top: icon + label */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Icon circle */}
        <motion.div
          animate={
            hovered ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
          style={{
            background:
              platform.id === "x"
                ? "#000"
                : `rgba(${platform.accentRgb}, 0.12)`,
            color: platform.id === "x" ? "#fff" : platform.accent,
            border: `1.5px solid rgba(${platform.accentRgb},0.25)`,
          }}
        >
          {platform.icon}
        </motion.div>

        <p
          className="font-cinzel text-[11px] font-bold tracking-wider"
          style={{ color: "var(--rj-charcoal)" }}
        >
          {platform.label}
        </p>
        <p
          className="font-cinzel text-[9px] tracking-widest"
          style={{ color: "var(--rj-ash)" }}
        >
          {platform.handle}
        </p>
      </div>

      {/* Divider */}
      <div
        className="w-full my-4 h-px"
        style={{ background: "var(--rj-bone)" }}
      />

      {/* Bottom: follower count + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-2 w-full">
        <p
          className="font-cormorant font-semibold"
          style={{ fontSize: "1.75rem", color: platform.accent }}
        >
          {platform.followers}
        </p>
        <p
          className="font-cinzel text-[8px] tracking-[0.25em] uppercase"
          style={{ color: "var(--rj-ash)" }}
        >
          {platform.followerLabel}
        </p>

        {/* Follow pill */}
        <div
          className="mt-3 flex items-center gap-1.5 px-4 py-1.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all duration-300"
          style={{
            background: hovered
              ? platform.accent
              : `rgba(${platform.accentRgb},0.10)`,
            color: hovered ? "#fff" : platform.accent,
            border: `1.5px solid rgba(${platform.accentRgb},0.3)`,
          }}
        >
          Follow
          <ChevronRight size={10} />
        </div>
      </div>

      {/* Corner external link icon */}
      <div
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: "var(--rj-ash)" }}
      >
        <ExternalLink size={11} />
      </div>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────
// INSTAGRAM POST GRID
// ─────────────────────────────────────────────────────────────────
function InstagramGrid({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {POSTS.map((post, i) => (
        <motion.a
          key={i}
          href="https://instagram.com/rehnoorjewels"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={i * 0.12}
          className="group relative rounded-xl overflow-hidden block"
          style={{
            aspectRatio: "1/1",
            background: "var(--rj-ivory-dark)",
          }}
        >
          <Image
            src={post.img}
            alt={post.caption}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 33vw, 16vw"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-1.5"
            style={{ background: "rgba(225,48,108,0.85)" }}
          >
            <Heart size={18} style={{ fill: "#fff", color: "#fff" }} />
            <span className="font-cinzel text-[10px] font-bold text-white">
              {post.likes}
            </span>
          </div>
          {/* Bottom gradient tag */}
          <div
            className="absolute bottom-0 left-0 right-0 px-2 py-1.5"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.65), transparent)",
            }}
          >
            <p
              className="font-cinzel text-[7px] tracking-wider truncate"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {post.tag}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARQUEE STRIP
// ─────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "#PatraPerfection",
  "#GoldLooksGoodOnYou",
  "#RehnoorJewels",
  "#SmartStyle",
  "#PowerInPatra",
  "#QueenOnABudget",
  "#KnowYourGold",
  "#PatraLuxury",
  "#FeelRich",
  "#LookStunning",
];

function MarqueeStrip() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="overflow-hidden py-4 my-10"
      style={{
        borderTop: "1px solid var(--rj-bone)",
        borderBottom: "1px solid var(--rj-bone)",
      }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((tag, i) => (
          <span
            key={i}
            className="font-cinzel text-[11px] tracking-widest flex items-center gap-3"
            style={{
              color: i % 2 === 0 ? "var(--rj-emerald)" : "var(--rj-ash)",
            }}
          >
            {tag}
            <span style={{ color: "var(--rj-gold)" }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function SocialFeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="section-padding overflow-hidden"
      style={{ background: "var(--rj-ivory)" }}
      ref={ref}
    >
      <div className="container-rj">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Connect With Us
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-cormorant font-light mb-3"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "var(--rj-charcoal)",
              lineHeight: 1.1,
            }}
          >
            Gold Lives Everywhere
            <br />
            <span style={{ color: "var(--rj-emerald)" }}>
              We Wear It Online Too.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="max-w-sm mx-auto text-sm"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            Follow us across platforms for styling drops, patra tips, gold news
            and behind-the-craft moments.
          </motion.p>
          <div className="divider-gold-center mt-6" />
        </div>

        {/* ── Platform cards: bento-style asymmetric grid ── */}
        {/* Mobile: 2-col. Tablet: 3-col. Desktop: 5-col */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {PLATFORMS.map((platform, i) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Total community count banner ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={6}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 rounded-2xl mb-2"
          style={{
            background: "var(--rj-charcoal)",
            border: "1px solid rgba(252,193,81,0.15)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(252,193,81,0.15)" }}
            >
              <span style={{ color: "var(--rj-gold)", fontSize: "1.1rem" }}>
                ✦
              </span>
            </div>
            <div>
              <p
                className="font-cormorant font-semibold"
                style={{
                  fontSize: "1.6rem",
                  color: "var(--rj-gold)",
                  lineHeight: 1,
                }}
              >
                104,900+
              </p>
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Combined Community Across All Platforms
              </p>
            </div>
          </div>
          <p
            className="font-cinzel text-[10px] tracking-wider text-center sm:text-right max-w-[200px]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            "Luxury isn't about what it costs. It's about how it makes you
            feel."
          </p>
        </motion.div>

        {/* ── Hashtag marquee ── */}
        <MarqueeStrip />

        {/* ── Instagram feed grid with header ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(225,48,108,0.12)",
                  color: "#E1306C",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <p
                  className="font-cinzel text-[11px] font-bold tracking-wider"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  Latest on Instagram
                </p>
                <p
                  className="font-cinzel text-[8px] tracking-widest"
                  style={{ color: "var(--rj-ash)" }}
                >
                  @rehnoorjewels · 42.6K followers
                </p>
              </div>
            </motion.div>

            <motion.a
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              href="https://instagram.com/rehnoorjewels"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-cinzel text-[9px] tracking-widest uppercase transition-all hover:opacity-70"
              style={{ color: "var(--rj-emerald)" }}
            >
              View All <ChevronRight size={11} />
            </motion.a>
          </div>

          <InstagramGrid inView={inView} />
        </div>

        {/* ── Bottom CTA row ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 pt-4"
          style={{ borderTop: "1px solid var(--rj-bone)" }}
        >
          {PLATFORMS.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: p.id === "x" ? "#000" : `rgba(${p.accentRgb},0.10)`,
                color: p.id === "x" ? "#fff" : p.accent,
                border: `1.5px solid rgba(${p.accentRgb},0.25)`,
              }}
            >
              {p.icon}
              {p.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
