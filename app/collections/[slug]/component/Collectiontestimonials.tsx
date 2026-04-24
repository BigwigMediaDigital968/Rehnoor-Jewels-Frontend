"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  city: string;
  rating: number;
  review: string;
  avatar: string;
  productBought: string;
  verified: boolean;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    city: "Mumbai",
    rating: 5,
    review:
      "The Nawabi Chain is absolutely stunning. Solid weight, mirror finish — I wear it every day. Got so many compliments at my brother's wedding.",
    productBought: "Nawabi Chain · 18 inch",
    verified: true,
    date: "Dec 2024",
    avatar: "AM",
  },
  {
    id: 2,
    name: "Rohan Singhania",
    city: "Delhi",
    rating: 5,
    review:
      "Quality is exceptional for the price. It gave me complete confidence. Packaging was premium — felt like a luxury brand.",
    productBought: "Cuban Link Chain",
    verified: true,
    date: "Nov 2024",
    avatar: "RS",
  },
  {
    id: 3,
    name: "Vikram Nair",
    city: "Bangalore",
    rating: 5,
    review:
      "The Signet Ring is everything I imagined. Free engraving service was seamless — they got the font and spacing perfect.",
    productBought: "Signet Ring · 22kt",
    verified: true,
    date: "Jan 2025",
    avatar: "VN",
  },
  {
    id: 4,
    name: "Karan Oberoi",
    city: "Jaipur",
    rating: 4,
    review:
      "Royal Kada is heavy and premium. Slight delay in delivery but customer service resolved it quickly. Overall very satisfied.",
    productBought: "Royal Kada · Size M",
    verified: true,
    date: "Oct 2024",
    avatar: "KO",
  },
  {
    id: 5,
    name: "Dev Sharma",
    city: "Hyderabad",
    rating: 5,
    review:
      "फोटो जैसा ही है। पैसे वसूल है। Link Bracelet बहुत अच्छा लगता है। जरूर recommend करूँगा।",
    productBought: "Link Bracelet · 8 inch",
    verified: true,
    date: "Jan 2025",
    avatar: "DS",
  },
  {
    id: 6,
    name: "Aditya Kapoor",
    city: "Chennai",
    rating: 5,
    review:
      "The Sol Pendant is understated elegance. Pairs beautifully with my Cuban chain. Lightweight but substantial enough.",
    productBought: "Sol Pendant",
    verified: true,
    date: "Dec 2024",
    avatar: "AK",
  },
  {
    id: 7,
    name: "Mohit Sharma",
    city: "Pune",
    rating: 4,
    review:
      "Good quality at this price point. The Cord Bracelet is minimalist and perfect for daily wear. Arrived well-packed.",
    productBought: "Cord Bracelet · 22kt",
    verified: true,
    date: "Nov 2024",
    avatar: "MS",
  },
  {
    id: 8,
    name: "Ravi Gupta",
    city: "Surat",
    rating: 5,
    review:
      "Moghul Kada is a masterpiece. The carving detail is unbelievable — people stop me to ask where I bought it.",
    productBought: "Moghul Kada · Size L",
    verified: true,
    date: "Dec 2024",
    avatar: "RG",
  },
  {
    id: 9,
    name: "Sahil Mehra",
    city: "Ahmedabad",
    rating: 5,
    review:
      "Om Pendant is deeply meaningful and beautifully crafted. Gold colour is consistent and the finish is impeccable.",
    productBought: "Om Pendant · 22kt",
    verified: true,
    date: "Oct 2024",
    avatar: "SM",
  },
];

const MOBILE_PER_PAGE = 2;

function StarRow({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          style={{
            fill: i < rating ? "var(--rj-gold)" : "transparent",
            color: i < rating ? "var(--rj-gold)" : "var(--rj-bone)",
          }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="flex flex-col h-full p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 group"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Quote icon */}
      <div
        className="absolute top-4 right-5 pointer-events-none select-none font-cormorant"
        style={{
          fontSize: "4.5rem",
          color: "rgba(252,193,81,0.1)",
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        "
      </div>

      {/* Stars + verified */}
      <div className="flex items-center justify-between mb-3 relative">
        <StarRow rating={t.rating} />
        {t.verified && (
          <span
            className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,55,32,0.07)",
              color: "var(--rj-emerald)",
            }}
          >
            ✓ Verified
          </span>
        )}
      </div>

      {/* Review */}
      <p
        className="text-sm leading-relaxed mb-4 flex-1 relative"
        style={{
          color: "var(--rj-charcoal)",
          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
        }}
      >
        "{t.review}"
      </p>

      {/* Footer */}
      <div
        className="pt-3.5 border-t flex items-center justify-between"
        style={{ borderColor: "var(--rj-bone)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-xs font-bold flex-shrink-0"
            style={{
              background: "var(--gradient-gold)",
              color: "var(--rj-emerald)",
            }}
          >
            {t.avatar}
          </div>
          <div>
            <p
              className="font-cinzel text-xs font-bold"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {t.name}
            </p>
            <p className="text-[10px]" style={{ color: "var(--rj-ash)" }}>
              {t.city} · {t.date}
            </p>
          </div>
        </div>
        <span
          className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full hidden sm:block"
          style={{
            background: "var(--rj-emerald)",
            color: "var(--rj-gold)",
            whiteSpace: "nowrap",
          }}
        >
          {t.productBought.length > 20
            ? t.productBought.slice(0, 20) + "…"
            : t.productBought}
        </span>
      </div>
    </div>
  );
}

// ── Desktop 3-col grid ────────────────────────────────────────────
function DesktopGrid() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-5">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.id}
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
        >
          <TestimonialCard t={t} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Mobile 2-card per page carousel ──────────────────────────────
function MobileCarousel() {
  const total = testimonials.length;
  const totalPages = Math.ceil(total / MOBILE_PER_PAGE);
  const [page, setPage] = useState(0);
  const touchStart = useRef(0);

  const pageItems = testimonials.slice(
    page * MOBILE_PER_PAGE,
    page * MOBILE_PER_PAGE + MOBILE_PER_PAGE,
  );

  return (
    <div className="md:hidden">
      <div
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = touchStart.current - e.changedTouches[0].clientX;
          if (delta > 40 && page < totalPages - 1) setPage((p) => p + 1);
          if (delta < -40 && page > 0) setPage((p) => p - 1);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {pageItems.map((t) => (
              <div key={t.id} className="relative">
                <TestimonialCard t={t} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid var(--rj-bone)",
            color: "var(--rj-charcoal)",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={15} />
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
                padding: 0,
                cursor: "pointer",
              }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid var(--rj-bone)",
            color: "var(--rj-charcoal)",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
      <p
        className="text-center font-cinzel text-[9px] tracking-widest mt-2"
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
export default function CollectionTestimonials() {
  const avg = (
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  ).toFixed(1);
  const five = Math.round(
    (testimonials.filter((t) => t.rating === 5).length / testimonials.length) *
      100,
  );

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* Heading */}
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
              ✦ Customer Reviews
            </p>
            <h2
              className="heading-lg leading-tight"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Words from our
              <br />
              <em className="text-gold-shimmer font-normal">gold family</em>
            </h2>
          </div>

          {/* Aggregate rating card */}
          <div
            className="flex items-center gap-5 px-6 py-4 rounded-2xl flex-shrink-0"
            style={{
              background: "#fff",
              border: "1px solid var(--rj-bone)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <div className="text-center">
              <p
                className="font-cormorant font-light leading-none"
                style={{ fontSize: "3rem", color: "var(--rj-charcoal)" }}
              >
                {avg}
              </p>
              <StarRow rating={5} size={11} />
            </div>
            <div
              className="w-px h-12"
              style={{ background: "var(--rj-bone)" }}
            />
            <div className="space-y-1.5">
              <div>
                <p
                  className="font-cinzel font-bold"
                  style={{ fontSize: "0.85rem", color: "var(--rj-charcoal)" }}
                >
                  {five}%
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
                  style={{ fontSize: "0.85rem", color: "var(--rj-charcoal)" }}
                >
                  {testimonials.length}+
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

        {/* Grid / Carousel */}
        <DesktopGrid />
        <MobileCarousel />
      </div>
    </section>
  );
}
