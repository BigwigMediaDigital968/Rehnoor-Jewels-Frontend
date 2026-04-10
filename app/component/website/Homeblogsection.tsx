"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Eye, ArrowUpRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface BlogCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  category: string;
  tags: string[];
  author: { name: string };
  publishedAt: string | null;
  readingTimeMinutes: number | null;
  views: number;
  isFeatured: boolean;
}

interface BlogApiResponse {
  success: boolean;
  data: BlogCard[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function fetchFeaturedBlogs(): Promise<BlogCard[]> {
  const res = await fetch(`${API_BASE}/api/blogs?limit=4&sort=-publishedAt`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error("Failed");
  const json: BlogApiResponse = await res.json();
  return json.data;
}

// ─────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const FALLBACK =
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80";

// ─────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 animate-pulse">
      <div
        className="rounded-2xl"
        style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.05)" }}
      />
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl flex-1"
            style={{ background: "rgba(255,255,255,0.05)", minHeight: 90 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FEATURED (large left) CARD
// ─────────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden group"
      style={{ aspectRatio: "4/3", cursor: "pointer" }}
    >
      <Link href={`/blogs/${post.slug}`} className="absolute inset-0 z-10" />

      {/* Image */}
      <Image
        src={post.coverImage || FALLBACK}
        alt={post.coverImageAlt || post.title}
        fill
        sizes="(max-width:1024px) 100vw, 60vw"
        className="object-cover"
        style={{
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(0.25,0.1,0.25,1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: hovered
            ? "linear-gradient(160deg, rgba(0,0,0,0.1) 0%, rgba(0,30,15,0.88) 100%)"
            : "linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Gold shimmer line on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-700"
        style={{
          width: hovered ? "100%" : "0%",
          background: "linear-gradient(90deg,#FCC151,#E8A830)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        {/* Top */}
        <div className="flex items-start justify-between">
          {post.category && (
            <span
              className="font-cinzel text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
              style={{
                background: "var(--rj-emerald,#003720)",
                color: "var(--rj-gold,#FCC151)",
              }}
            >
              {post.category}
            </span>
          )}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center ml-auto transition-all duration-300"
            style={{
              background: hovered
                ? "var(--rj-gold,#FCC151)"
                : "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUpRight
              size={14}
              style={{
                color: hovered ? "var(--rj-emerald,#003720)" : "#fff",
              }}
            />
          </div>
        </div>

        {/* Bottom */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            {post.readingTimeMinutes && (
              <span
                className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <Clock size={9} />
                {post.readingTimeMinutes} min
              </span>
            )}
            {post.publishedAt && (
              <>
                <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                <span
                  className="font-cinzel text-[9px] tracking-widest"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {formatDate(post.publishedAt)}
                </span>
              </>
            )}
          </div>

          <h3
            className="font-cormorant font-light text-white leading-tight mb-3"
            style={{
              fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            {post.title}
          </h3>

          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              maxWidth: "48ch",
              opacity: hovered ? 1 : 0.75,
              transition: "opacity 0.3s",
            }}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-cinzel text-[9px] font-bold flex-shrink-0"
              style={{
                background: "var(--rj-gold,#FCC151)",
                color: "var(--rj-emerald,#003720)",
              }}
            >
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <span
              className="font-cinzel text-[9px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {post.author.name}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────
// SIDE (small right) CARD
// ─────────────────────────────────────────────────────────────────

function SideCard({ post, index }: { post: BlogCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden flex-1 group"
      style={{
        minHeight: 90,
        cursor: "pointer",
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(252,193,81,0.25)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.3s ease",
      }}
    >
      <Link href={`/blogs/${post.slug}`} className="absolute inset-0 z-10" />

      <div className="flex h-full">
        {/* Thumbnail */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{ width: "36%", minHeight: "100%" }}
        >
          <Image
            src={post.coverImage || FALLBACK}
            alt={post.coverImageAlt || post.title}
            fill
            sizes="120px"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(0,0,0,0.1))",
            }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between p-3.5 sm:p-4 flex-1 min-w-0">
          <div>
            {post.category && (
              <span
                className="font-cinzel text-[8px] font-bold tracking-widest uppercase"
                style={{
                  color: "var(--rj-gold,#FCC151)",
                  opacity: 0.85,
                }}
              >
                {post.category}
              </span>
            )}
            <h4
              className="font-cormorant font-light leading-snug line-clamp-2 mt-0.5 transition-colors duration-200"
              style={{
                fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)",
                color: hovered ? "#fff" : "rgba(255,255,255,0.85)",
              }}
            >
              {post.title}
            </h4>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {post.readingTimeMinutes && (
                <span
                  className="flex items-center gap-1 font-cinzel text-[8px] tracking-widest"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <Clock size={8} />
                  {post.readingTimeMinutes}m
                </span>
              )}
              {post.views > 0 && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span
                    className="flex items-center gap-1 font-cinzel text-[8px] tracking-widest"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <Eye size={8} />
                    {post.views > 999
                      ? `${(post.views / 1000).toFixed(1)}k`
                      : post.views}
                  </span>
                </>
              )}
            </div>

            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background: hovered
                  ? "var(--rj-gold,#FCC151)"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <ArrowUpRight
                size={9}
                style={{
                  color: hovered
                    ? "var(--rj-emerald,#003720)"
                    : "rgba(255,255,255,0.5)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Left accent bar on hover */}
      <div
        className="absolute left-0 top-0 w-0.5 transition-all duration-500"
        style={{
          height: hovered ? "100%" : "0%",
          background: "var(--rj-gold,#FCC151)",
        }}
      />
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────

export default function HomeBlogSection() {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const load = () => {
    setError(false);
    setLoading(true);
    fetchFeaturedBlogs()
      .then(setBlogs)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const [featured, ...rest] = blogs;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--rj-emerald)", padding: "5rem 0" }}
    >
      {/* ── Decorative background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(252,193,81,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,55,32,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(252,193,81,0.2),transparent)",
          }}
        />
      </div>

      <div className="container-rj relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p
              className="label-accent mb-2"
              style={{ color: "var(--rj-gold,#FCC151)" }}
            >
              ✦ The Gold Edit
            </p>
            <h2
              className="font-cormorant font-light text-white leading-tight"
              style={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}
            >
              Stories of gold,{" "}
              <em
                className="font-normal pe-2"
                style={{
                  background:
                    "linear-gradient(90deg,#FCC151 0%,#E8A830 50%,#FCC151 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                }}
              >
                craft &amp; culture
              </em>
            </h2>
          </div>

          <Link
            href="/blogs"
            className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase font-bold flex-shrink-0 group/link"
            style={{ color: "var(--rj-gold,#FCC151)" }}
          >
            All Articles
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:scale-110"
              style={{
                border: "1px solid rgba(252,193,81,0.35)",
                background: "rgba(252,193,81,0.08)",
              }}
            >
              <ArrowRight
                size={11}
                style={{ color: "var(--rj-gold,#FCC151)" }}
              />
            </span>
          </Link>
        </motion.div>

        {/* ── States ── */}
        {loading && <Skeleton />}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <p
              className="font-cormorant text-2xl font-light"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Could not load articles
            </p>
            <button
              onClick={load}
              className="font-cinzel text-[10px] tracking-widest uppercase px-5 py-2 rounded-full transition-opacity hover:opacity-70"
              style={{
                border: "1px solid rgba(252,193,81,0.3)",
                color: "var(--rj-gold,#FCC151)",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </motion.div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">
            {/* Large featured */}
            {featured && <FeaturedCard post={featured} />}

            {/* Stacked side cards */}
            {rest.length > 0 && (
              <div className="flex flex-col gap-4">
                {rest.map((post, i) => (
                  <SideCard key={post._id} post={post} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Bottom rule ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 h-px origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--rj-gold,#FCC151), rgba(252,193,81,0.1), transparent)",
          }}
        />
      </div>
    </section>
  );
}
