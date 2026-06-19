"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 7,
    name: "Pooja Arora",
    rating: 5,
    badge: "Excellent",
    review:
      "The design of my items was excellent. Excellent craftsmanship makes these earrings go great with both Indian and Western styles of dress. The quality of the final product has an enormous impact on the visual presentation.",
    productName: "Designer Earrings",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=80&q=80",
  },
  {
    id: 8,
    name: "Vikas Jain",
    rating: 5,
    badge: "Excellent",
    review:
      "Fashionable and trending jewelry at budget prices, but very nice quality items with a high-end finish. A very good place to buy stylish jewelry without spending too much money.",
    productName: "Fashion Jewellery Collection",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=80&q=80",
  },
  {
    id: 9,
    name: "Aarav Malhotra",
    rating: 5,
    badge: "Excellent",
    review:
      "I purchased the Tri Tone Cocktail Ring for gifting, and it turned out to be an amazing choice. The finish looks premium, and the design is very unique. It easily matches with different outfits, making it quite versatile.",
    productName: "Tri Tone Cocktail Ring",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&q=80",
  },
  {
    id: 10,
    name: "Riya Saxena",
    rating: 5,
    badge: "Excellent",
    review:
      "The Elegant Green Floral Ring is absolutely beautiful. The detailing is neat, and the color looks even better in real life. It adds a graceful touch to my ethnic outfits.",
    productName: "Elegant Green Floral Ring",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1603561596112-db1d6e83eec6?w=80&q=80",
  },
  {
    id: 11,
    name: "Kunal Mehra",
    rating: 5,
    badge: "Excellent",
    review:
      "Bought the Blooming Floral Statement Ring for my sister, and she loved it. The design is bold but still elegant, making it perfect for parties and special occasions.",
    productName: "Blooming Floral Statement Ring",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=80&q=80",
  },
  {
    id: 12,
    name: "Ishika Bhatia",
    rating: 5,
    badge: "Excellent",
    review:
      "The Ocean Wave Cocktail Ring has a very modern and stylish design. It’s lightweight and comfortable to wear for long hours, which I really appreciate.",
    productName: "Ocean Wave Cocktail Ring",
    productHref: "/collections",
    productImage:
      "https://images.unsplash.com/photo-1602752275437-4fbab7c9b86c?w=80&q=80",
  },
];

// ─────────────────────────────────────────────────────────────────
// BADGE STYLES
// ─────────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Excellent: { bg: "rgba(0,55,32,0.08)", color: "var(--rj-emerald)" },
  Good: { bg: "rgba(252,193,81,0.12)", color: "#a07800" },
  Rated: { bg: "rgba(107,107,107,0.1)", color: "var(--rj-ash)" },
};

// ─────────────────────────────────────────────────────────────────
// SINGLE TESTIMONIAL CARD
// ─────────────────────────────────────────────────────────────────
function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const badge = BADGE_STYLES[t.badge] ?? BADGE_STYLES.Rated;

  return (
    <div
      className="flex flex-col h-full p-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top row: stars + badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={11}
              style={{
                fill: i < t.rating ? "var(--rj-gold)" : "transparent",
                color: i < t.rating ? "var(--rj-gold)" : "var(--rj-bone)",
              }}
            />
          ))}
        </div>
        <span
          className="font-cinzel text-[8px] tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: badge.bg, color: badge.color }}
        >
          {t.badge}
        </span>
      </div>

      {/* Review text */}
      <p
        className="text-xs leading-relaxed mb-4 flex-1"
        style={{
          color: "var(--rj-charcoal)",
          fontFamily: "var(--font-body, 'DM Sans'), sans-serif",
        }}
      >
        {t.review}
      </p>

      {/* Product thumbnail + reviewer */}
      <div className="flex items-center gap-2.5 mb-3">
        {/* <div
          className="relative flex-shrink-0 rounded-lg overflow-hidden"
          style={{ width: 36, height: 36, background: "var(--rj-ivory-dark)" }}
        >
          <Image
            src={t.productImage}
            alt={t.productName}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div> */}
        <div>
          <p
            className="font-cinzel font-bold"
            style={{
              fontSize: "0.65rem",
              color: "var(--rj-charcoal)",
              letterSpacing: "0.03em",
            }}
          >
            {t.name}
          </p>
          <p
            className="font-body"
            style={{ fontSize: "0.6rem", color: "var(--rj-ash)" }}
          >
            {t.productName}
          </p>
        </div>
      </div>

      {/* Divider */}
      {/* <div className="h-px mb-3" style={{ background: "var(--rj-bone)" }} /> */}

      {/* View product link */}
      {/* <Link
        href={t.productHref}
        className="inline-flex items-center gap-1 group/link transition-all duration-200"
        style={{ color: "var(--rj-emerald)" }}
      >
        <span
          className="font-cinzel text-[9px] tracking-widest uppercase group-hover/link:underline"
          style={{ textUnderlineOffset: "3px" }}
        >
          View product
        </span>
        <ArrowRight
          size={9}
          className="transition-transform duration-200 group-hover/link:translate-x-0.5"
        />
      </Link> */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DESKTOP: 3-column masonry-style grid (3 per row × 4 rows = 12)
// ─────────────────────────────────────────────────────────────────
function DesktopGrid() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-4">
      {testimonials.slice(0, 6).map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: (i % 3) * 0.08,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <TestimonialCard t={t} />
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MOBILE: 2×2 carousel (2 columns × 2 rows = 4 cards per page)
// ─────────────────────────────────────────────────────────────────
const MOBILE_PER_PAGE = 4; // 2 cols × 2 rows

function MobileCarousel() {
  const totalPages = Math.ceil(testimonials.length / MOBILE_PER_PAGE);
  const [page, setPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Touch drag support
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 40) setPage((p) => Math.min(p + 1, totalPages - 1));
    if (delta < -40) setPage((p) => Math.max(p - 1, 0));
  };

  const pageItems = testimonials.slice(
    page * MOBILE_PER_PAGE,
    page * MOBILE_PER_PAGE + MOBILE_PER_PAGE,
  );

  return (
    <div className="md:hidden">
      {/* Carousel viewport */}
      <div
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-2 gap-3"
          >
            {pageItems.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        {/* Prev */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid var(--rj-bone)",
            color: "var(--rj-charcoal)",
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === page ? "20px" : "6px",
                height: "6px",
                background: i === page ? "var(--rj-emerald)" : "var(--rj-bone)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid var(--rj-bone)",
            color: "var(--rj-charcoal)",
          }}
          aria-label="Next"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Page counter */}
      <p
        className="text-center font-cinzel text-[10px] tracking-widest mt-3"
        style={{ color: "var(--rj-ash)" }}
      >
        {page + 1} / {totalPages}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function ProductTestimonials() {
  // Aggregate stats
  const avgRating = (
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  ).toFixed(1);
  const totalCount = testimonials.length;
  const fiveStarPct = Math.round(
    (testimonials.filter((t) => t.rating === 5).length / totalCount) * 100,
  );

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* ── Heading row ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Verified Purchases
            </p>
            <h2
              className="heading-lg leading-tight"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Let customers
              <br />
              <em className="text-gold-shimmer font-normal">speak for us</em>
            </h2>
          </div>

          {/* Aggregate rating block */}
          <div
            className="flex items-center gap-5 px-6 py-4 rounded-2xl flex-shrink-0"
            style={{
              background: "#fff",
              border: "1px solid var(--rj-bone)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* Big rating number */}
            <div className="text-center">
              <p
                className="font-cormorant font-light leading-none"
                style={{ fontSize: "3rem", color: "var(--rj-charcoal)" }}
              >
                {avgRating}
              </p>
              <div className="flex gap-0.5 justify-center mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    style={{ fill: "var(--rj-gold)", color: "var(--rj-gold)" }}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className="w-px h-12"
              style={{ background: "var(--rj-bone)" }}
            />

            {/* Stats */}
            <div className="space-y-1.5">
              <div>
                <p
                  className="font-cinzel font-bold"
                  style={{ fontSize: "0.8rem", color: "var(--rj-charcoal)" }}
                >
                  {fiveStarPct}%
                </p>
                <p
                  className="font-cinzel text-[9px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  5-star reviews
                </p>
              </div>
              <div>
                <p
                  className="font-cinzel font-bold"
                  style={{ fontSize: "0.8rem", color: "var(--rj-charcoal)" }}
                >
                  {totalCount}+
                </p>
                <p
                  className="font-cinzel text-[9px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Verified reviews
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Desktop 3-col grid ── */}
        <DesktopGrid />

        {/* ── Mobile 2×2 carousel ── */}
        <MobileCarousel />
      </div>
    </section>
  );
}
