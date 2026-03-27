"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Search, X, Tag } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Gold Guide",
  "Style",
  "Care",
  "Culture",
  "Behind the Gold",
];

const POSTS = [
  {
    slug: "how-to-identify-22kt-gold",
    title: "How to identify real 22kt gold at home",
    excerpt:
      "Three simple tests — the magnet test, acid test, and hallmark check — that every gold buyer should know before spending.",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80",
    category: "Gold Guide",
    tags: ["22kt", "BIS", "hallmark"],
    readTime: 5,
    date: "14 Jan 2025",
    featured: true,
  },
  {
    slug: "how-to-style-gold-chains-men",
    title: "How to stack and style gold chains in 2025",
    excerpt:
      "From a single Nawabi to a three-chain layered look — the rule of thumb for lengths, weights, and pendant placement.",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
    category: "Style",
    tags: ["chains", "layering", "men's fashion"],
    readTime: 4,
    date: "08 Jan 2025",
    featured: false,
  },
  {
    slug: "cleaning-gold-at-home",
    title: "The right way to clean your gold jewellery at home",
    excerpt:
      "Dish soap, a soft toothbrush, and lukewarm water — that's all you need. Avoid these three common mistakes that dull the finish.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=700&q=80",
    category: "Care",
    tags: ["maintenance", "cleaning", "care guide"],
    readTime: 3,
    date: "02 Jan 2025",
    featured: false,
  },
  {
    slug: "history-of-nawabi-chain",
    title: "The Nawabi chain — a 400-year-old Mughal legacy",
    excerpt:
      "Tracing the origin of India's most iconic men's chain from the Nawabs of Awadh to the streets of modern Jaipur.",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&q=80",
    category: "Culture",
    tags: ["nawabi", "history", "mughal"],
    readTime: 7,
    date: "26 Dec 2024",
    featured: false,
  },
  {
    slug: "behind-the-gold-jaipur",
    title: "Inside our Jaipur workshop — 48 hours with master artisans",
    excerpt:
      "We spent two days photographing the artisans who hand-carve the Moghul Kada. Here's what we found.",
    image:
      "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=700&q=80",
    category: "Behind the Gold",
    tags: ["artisans", "jaipur", "craftsmanship"],
    readTime: 9,
    date: "18 Dec 2024",
    featured: false,
  },
  {
    slug: "gold-investment-2025",
    title: "Is buying 22kt jewellery a good investment in 2025?",
    excerpt:
      "Gold jewellery vs sovereign gold bonds vs gold ETFs — a plain-English breakdown for the first-time buyer.",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=700&q=80",
    category: "Gold Guide",
    tags: ["investment", "gold price", "finance"],
    readTime: 6,
    date: "10 Dec 2024",
    featured: false,
  },
];

// ─────────────────────────────────────────────────────────────────
// BLOG CARD
// ─────────────────────────────────────────────────────────────────
function BlogCard({
  post,
  index,
  large = false,
}: {
  post: (typeof POSTS)[0];
  index: number;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col rounded-2xl overflow-hidden ${large ? "" : ""}`}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "rgba(252,193,81,0.4)" : "var(--rj-bone)"}`,
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.08)"
          : "0 2px 10px rgba(0,0,0,0.04)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden flex-shrink-0"
        style={{ cursor: "pointer" }}
      >
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: large ? "16/7" : "16/9" }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* Category pill */}
          <div className="absolute top-3 left-3">
            <span
              className="font-cinzel text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{
                background: "var(--rj-emerald)",
                color: "var(--rj-gold)",
              }}
            >
              {post.category}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span
                className="font-cinzel text-[8px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{ background: "var(--rj-gold)", color: "#000" }}
              >
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="font-cinzel text-[9px] tracking-widest"
            style={{ color: "var(--rj-ash)" }}
          >
            {post.date}
          </span>
          <span style={{ color: "var(--rj-bone)" }}>·</span>
          <span
            className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest"
            style={{ color: "var(--rj-ash)" }}
          >
            <Clock size={10} /> {post.readTime} min read
          </span>
        </div>

        <Link href={`/blog/${post.slug}`} style={{ cursor: "pointer" }}>
          <h2
            className="font-cormorant font-light leading-tight mb-2 transition-colors duration-250 line-clamp-2"
            style={{
              fontSize: large
                ? "clamp(1.35rem,2.5vw,1.9rem)"
                : "clamp(1rem,1.8vw,1.2rem)",
              color: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
            }}
          >
            {post.title}
          </h2>
        </Link>
        <p
          className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-cinzel text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(0,55,32,0.06)",
                color: "var(--rj-emerald)",
                border: "1px solid rgba(0,55,32,0.1)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase font-bold transition-opacity hover:opacity-60 mt-auto"
          style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
        >
          Read Article{" "}
          <ArrowRight
            size={11}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...POSTS];
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      );
    }
    return list;
  }, [activeCategory, query]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter(
    (p) => !p.featured || activeCategory !== "All" || query,
  );

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <div
        style={{
          background: "var(--rj-charcoal)",
          paddingTop: "6rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container-rj">
          <p className="label-accent mb-3" style={{ color: "var(--rj-gold)" }}>
            ✦ The Gold Edit
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="heading-lg text-white">
              Stories of gold,
              <br />
              <em className="text-gold-shimmer font-normal pe-5">
                craft &amp; culture
              </em>
            </h1>
            <p
              className="font-cinzel text-xs tracking-widest pb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {POSTS.length} articles
            </p>
          </div>
        </div>
      </div>

      <div className="container-rj py-10">
        {/* ── Controls ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center">
          {/* Search */}
          <div className="relative max-w-xs w-full">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: query ? "var(--rj-emerald)" : "var(--rj-ash)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-9 pr-8 py-2.5 font-cinzel text-xs tracking-wider outline-none rounded-lg"
              style={{
                background: "#fff",
                border: `1px solid ${query ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                color: "var(--rj-charcoal)",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ cursor: "pointer" }}
              >
                <X size={12} style={{ color: "var(--rj-ash)" }} />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200"
                style={{
                  background:
                    activeCategory === cat ? "var(--rj-emerald)" : "#fff",
                  color:
                    activeCategory === cat ? "var(--rj-gold)" : "var(--rj-ash)",
                  border: `1px solid ${activeCategory === cat ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                  cursor: "pointer",
                  fontWeight: activeCategory === cat ? 700 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Featured post (large) ── */}
        <AnimatePresence mode="wait">
          {featured && activeCategory === "All" && !query && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <BlogCard post={featured} index={0} large />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center text-center"
          >
            <Search
              size={28}
              style={{
                color: "var(--rj-emerald)",
                opacity: 0.3,
                marginBottom: 12,
              }}
            />
            <p
              className="font-cormorant text-2xl font-light mb-2"
              style={{ color: "var(--rj-charcoal)" }}
            >
              No articles found
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="font-cinzel text-[10px] tracking-widest uppercase mt-4 transition-opacity hover:opacity-60"
              style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {(activeCategory !== "All" || query ? filtered : rest).map(
                (post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Newsletter CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl overflow-hidden"
        >
          <div
            className="flex flex-col sm:flex-row items-center gap-6 p-8"
            style={{ background: "var(--rj-emerald)" }}
          >
            <div className="flex-1 text-center sm:text-left">
              <p
                className="label-accent mb-1"
                style={{ color: "var(--rj-gold)" }}
              >
                ✦ The Gold Edit newsletter
              </p>
              <h3 className="font-cormorant text-2xl font-light text-white">
                Gold knowledge, once a week
              </h3>
              <p
                className="font-cinzel text-[10px] tracking-widest mt-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                No spam. Just gold guides, new arrivals, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-56 px-4 py-3 rounded-full font-cinzel text-xs tracking-wider outline-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                }}
              />
              <button
                className="px-5 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold flex-shrink-0 transition-all hover:opacity-90"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--rj-emerald)",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
