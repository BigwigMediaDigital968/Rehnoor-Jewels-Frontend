"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────

const collections = [
  {
    id: "nawabi-chain",
    label: "Nawabi Chain",
    tagline: "Bold, layered, iconic",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80",
    price: "₹8,999",
    count: "24 pieces",
    tag: "Bestseller",
    size: "tall",
  },
  {
    id: "royal-kada",
    label: "Royal Kada",
    tagline: "Power on your wrist",
    image:
      "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=700&q=80",
    price: "₹12,499",
    count: "18 pieces",
    tag: "New",
    size: "square",
  },
  {
    id: "signet-ring",
    label: "Signet Ring",
    tagline: "Wear your statement",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=80",
    price: "₹5,299",
    count: "32 pieces",
    tag: "Popular",
    size: "square",
  },
  {
    id: "link-bracelet",
    label: "Link Bracelet",
    tagline: "Layered perfection",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=700&q=80",
    price: "₹7,199",
    count: "15 pieces",
    tag: "Limited",
    size: "wide",
  },
  {
    id: "sol-pendant",
    label: "Sol Pendant",
    tagline: "Close to the heart",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=80",
    price: "₹4,499",
    count: "28 pieces",
    tag: "New",
    size: "square",
  },
  {
    id: "moghul-bangle",
    label: "Moghul Bangle",
    tagline: "Heritage, reimagined",
    image:
      "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=700&q=80",
    price: "₹15,999",
    count: "10 pieces",
    tag: "Exclusive",
    size: "tall",
  },
  {
    id: "cuban-chain",
    label: "Cuban Chain",
    tagline: "Street meets heritage",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
    price: "₹11,299",
    count: "20 pieces",
    tag: "Trending",
    size: "square",
  },
  {
    id: "cord-bracelet",
    label: "Cord Bracelet",
    tagline: "Minimal. Pure. Gold.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=700&q=80",
    price: "₹3,899",
    count: "40 pieces",
    tag: "Bestseller",
    size: "square",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    city: "Mumbai",
    rating: 5,
    collection: "nawabi-chain",
    collectionLabel: "Nawabi Chain",
    text: "The finish on this chain is exceptional. Got compliments at every event. Worth every rupee — feels like heirloom quality.",
    avatar: "AM",
  },
  {
    id: 2,
    name: "Rohan Singhania",
    city: "Delhi",
    rating: 5,
    collection: "royal-kada",
    collectionLabel: "Royal Kada",
    text: "Solid weight, perfect thickness. The hallmark certificate gave me confidence. Will definitely be ordering the bracelet next.",
    avatar: "RS",
  },
  {
    id: 3,
    name: "Vikram Nair",
    city: "Bangalore",
    rating: 5,
    collection: "signet-ring",
    collectionLabel: "Signet Ring",
    text: "Custom engraving was done perfectly. The ring looks and feels premium. Exactly what I wanted for my anniversary gift.",
    avatar: "VN",
  },
  {
    id: 4,
    name: "Karan Oberoi",
    city: "Jaipur",
    rating: 5,
    collection: "link-bracelet",
    collectionLabel: "Link Bracelet",
    text: "Love the balance between modern design and traditional goldwork. The links are strong and smooth. Exceptional craftsmanship.",
    avatar: "KO",
  },
  {
    id: 5,
    name: "Dev Sharma",
    city: "Hyderabad",
    rating: 5,
    collection: "sol-pendant",
    collectionLabel: "Sol Pendant",
    text: "Lightweight yet substantial. The pendant sits beautifully on a chain. Customer service was also top notch — very responsive.",
    avatar: "DS",
  },
  {
    id: 6,
    name: "Aditya Kapoor",
    city: "Chennai",
    rating: 5,
    collection: "moghul-bangle",
    collectionLabel: "Moghul Bangle",
    text: "This bangle is a statement piece. The Moghul detailing is incredibly fine. I've received so many questions about where it's from.",
    avatar: "AK",
  },
];

const ALL_FILTER = "all";

export default function TestimonialsSection() {
  const [active, setActive] = useState(ALL_FILTER);
  const [page, setPage] = useState(0);
  const PER_PAGE = 3;

  const filters = [
    { id: ALL_FILTER, label: "All" },
    ...collections.slice(0, 6).map((c) => ({ id: c.id, label: c.label })),
  ];

  const filtered =
    active === ALL_FILTER
      ? testimonials
      : testimonials.filter((t) => t.collection === active);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  useEffect(() => setPage(0), [active]);

  return (
    <section
      className="section-padding overflow-hidden"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="container-rj">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p
            className="label-accent mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Customer Stories
          </p>
          <h2
            className="heading-lg leading-tight"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Worn with pride,
            <br />
            <em className="text-gold-shimmer font-normal">loved for life</em>
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className="font-cinzel text-[10px] tracking-widest cursor-pointer uppercase px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background:
                  active === f.id ? "var(--gradient-gold)" : "transparent",
                color: active === f.id ? "var(--rj-emerald)" : "var(--rj-ash)",
                border: `1px solid ${active === f.id ? "transparent" : "var(--rj-bone)"}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {visible.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative p-6 rounded-2xl"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
                }}
              >
                {/* Quote mark */}
                <div
                  className="absolute top-4 right-5 font-cormorant text-6xl leading-none pointer-events-none"
                  style={{ color: "rgba(252,193,81,0.12)", fontWeight: 300 }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      style={{
                        fill: "var(--rj-gold)",
                        color: "var(--rj-gold)",
                      }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  "{t.text}"
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "var(--rj-bone)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-xs font-bold"
                      style={{
                        background: "var(--gradient-gold)",
                        color: "var(--rj-emerald)",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p
                        className="font-cinzel text-xs"
                        style={{ color: "var(--rj-charcoal)" }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-[10px]"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {t.city}
                      </p>
                    </div>
                  </div>
                  <span
                    className="font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    {t.collectionLabel}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              style={{
                border: "1px solid var(--rj-bone)",
                color: "var(--rj-charcoal)",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    i === page ? "var(--rj-emerald)" : "var(--rj-bone)",
                  width: i === page ? "24px" : "8px",
                }}
              />
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              disabled={page === pages - 1}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              style={{
                border: "1px solid var(--rj-bone)",
                color: "var(--rj-charcoal)",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
