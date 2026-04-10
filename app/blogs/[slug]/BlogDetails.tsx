"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Eye,
  Heart,
  Share2,
  Check,
  ChevronRight,
  Mail,
  Sparkles,
  AlertCircle,
  Loader2,
  BookOpen,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES — matching blogSchema exactly
// ─────────────────────────────────────────────────────────────────

interface BlogAuthor {
  name: string;
  bio?: string;
  avatar?: string;
  email?: string;
}

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  blogContent: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  contentImages: string[];
  category: string;
  tags: string[];
  author: BlogAuthor;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  readingTimeMinutes: number | null;
  wordCount: number;
  faqs: FaqItem[];
  status: "draft" | "published" | "archived" | "scheduled";
  publishedAt: string | null;
  scheduledAt: string | null;
  views: number;
  likes: number;
  relatedPosts: RelatedPost[];
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string | null;
  readingTimeMinutes: number | null;
}

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

// ─────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function fetchBlogBySlug(slug: string): Promise<BlogDetail> {
  const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
    next: { revalidate: 60 },
  });
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error(`Failed to fetch blog (${res.status})`);
  const json = await res.json();
  return json.data as BlogDetail;
}

// ─────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Inject unique IDs into H2/H3 tags in HTML string and extract TOC */
function processContent(html: string): {
  processedHtml: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  const slugMap = new Map<string, number>();

  const processedHtml = html.replace(
    /<(h[23])([\s>])(.*?)<\/h[23]>/gi,
    (match, tag, rest, inner) => {
      const level = parseInt(tag[1]);
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 60);
      if (!baseId) baseId = `heading-${headings.length}`;

      const count = slugMap.get(baseId) ?? 0;
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      slugMap.set(baseId, count + 1);

      headings.push({ id, text, level });
      const attrs = rest.startsWith(">") ? "" : rest;
      return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
    },
  );

  return { processedHtml, headings };
}

// ─────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS (sticky sidebar)
// ─────────────────────────────────────────────────────────────────

function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (headings.length === 0) return null;

  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={13} style={{ color: "var(--rj-emerald)" }} />
        <span
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-emerald)" }}
        >
          In this article
        </span>
      </div>
      <nav className="flex flex-col gap-1">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left transition-all duration-200 rounded-lg px-3 py-2 group"
              style={{
                paddingLeft: level === 3 ? "1.25rem" : "0.75rem",
                background: isActive ? "rgba(0,55,32,0.06)" : "transparent",
                cursor: "pointer",
              }}
            >
              <span
                className="font-cinzel text-[10px] tracking-wide leading-snug block"
                style={{
                  color: isActive ? "var(--rj-emerald)" : "var(--rj-ash)",
                  fontWeight: isActive ? 700 : 400,
                  transition: "color 0.2s",
                }}
              >
                {level === 3 && (
                  <ChevronRight size={9} className="inline mr-1 opacity-40" />
                )}
                {text}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SIDEBAR NEWSLETTER
// ─────────────────────────────────────────────────────────────────

function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl overflow-hidden mb-6"
      style={{ background: "var(--rj-emerald)" }}
    >
      <div className="p-5">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: "rgba(252,193,81,0.15)" }}
        >
          <Sparkles size={18} style={{ color: "var(--rj-gold)" }} />
        </div>

        <p className="label-accent mb-1" style={{ color: "var(--rj-gold)" }}>
          ✦ The Gold Edit
        </p>
        <h3 className="font-cormorant text-xl font-light text-white leading-tight mb-2">
          Gold knowledge, once a week
        </h3>
        <p
          className="font-cinzel text-[9px] tracking-widest leading-relaxed mb-4"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Early access, care guides, exclusive drops. No spam.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="relative">
                <Mail
                  size={12}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-8 pr-3 py-2.5 font-cinzel text-[11px] tracking-wider outline-none rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg font-cinzel text-[10px] tracking-widest uppercase font-bold transition-opacity"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--rj-emerald)",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={11} className="animate-spin" /> Subscribing…
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
              {error && (
                <p className="font-cinzel text-[9px] text-red-300 text-center">
                  {error}
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 py-2"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Check size={11} style={{ color: "var(--rj-emerald)" }} />
              </div>
              <p
                className="font-cinzel text-[10px] tracking-wider"
                style={{ color: "var(--rj-gold)" }}
              >
                You're in the inner circle ✦
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────────────────────────

function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (faqs.length === 0) return null;

  const sorted = [...faqs].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1" style={{ background: "var(--rj-bone)" }} />
        <span
          className="font-cinzel text-[10px] tracking-widest uppercase"
          style={{ color: "var(--rj-ash)" }}
        >
          ✦ Frequently Asked
        </span>
        <div className="h-px flex-1" style={{ background: "var(--rj-bone)" }} />
      </div>

      <div className="flex flex-col gap-2">
        {sorted.map((faq) => {
          const isOpen = open === faq._id;
          return (
            <div
              key={faq._id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                border: `1px solid ${isOpen ? "rgba(0,55,32,0.2)" : "var(--rj-bone)"}`,
                background: isOpen ? "rgba(0,55,32,0.02)" : "#fff",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : faq._id)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left"
                style={{ cursor: "pointer" }}
              >
                <span
                  className="font-cormorant text-base font-semibold leading-snug"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: isOpen ? "var(--rj-emerald)" : "var(--rj-bone)",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <span
                    className="font-cinzel text-sm font-bold"
                    style={{
                      color: isOpen ? "var(--rj-gold)" : "var(--rj-ash)",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="px-4 pb-4 text-sm leading-relaxed"
                      style={{
                        color: "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// RELATED POSTS
// ─────────────────────────────────────────────────────────────────

function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1" style={{ background: "var(--rj-bone)" }} />
        <span
          className="font-cinzel text-[10px] tracking-widest uppercase"
          style={{ color: "var(--rj-ash)" }}
        >
          ✦ Continue Reading
        </span>
        <div className="h-px flex-1" style={{ background: "var(--rj-bone)" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <RelatedCard key={post._id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}

function RelatedCard({ post, index }: { post: RelatedPost; index: number }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc =
    post.coverImage ||
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "rgba(252,193,81,0.4)" : "var(--rj-bone)"}`,
        boxShadow: hovered
          ? "0 10px 30px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <Link href={`/blogs/${post.slug}`} className="block overflow-hidden">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={imgSrc}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {post.readingTimeMinutes && (
          <span
            className="flex items-center gap-1 font-cinzel text-[9px] tracking-widest mb-2"
            style={{ color: "var(--rj-ash)" }}
          >
            <Clock size={9} /> {post.readingTimeMinutes} min read
          </span>
        )}
        <Link href={`/blogs/${post.slug}`}>
          <h3
            className="font-cormorant font-light leading-snug line-clamp-2 mb-3 transition-colors duration-200"
            style={{
              fontSize: "clamp(1rem,1.5vw,1.1rem)",
              color: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
            }}
          >
            {post.title}
          </h3>
        </Link>
        {post.excerpt && (
          <p
            className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {post.excerpt}
          </p>
        )}
        <Link
          href={`/blogs/${post.slug}`}
          className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase font-bold mt-auto transition-opacity hover:opacity-60"
          style={{ color: "var(--rj-emerald)" }}
        >
          Read <ChevronRight size={10} />
        </Link>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────
// SKELETON DETAIL
// ─────────────────────────────────────────────────────────────────

function SkeletonDetail() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <div
        className="w-full mb-0"
        style={{ aspectRatio: "21/7", background: "var(--rj-bone)" }}
      />
      <div className="container-rj py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <div className="flex flex-col gap-4">
            <div
              className="h-4 w-24 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
            <div
              className="h-10 w-4/5 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
            <div
              className="h-10 w-3/5 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
            <div
              className="h-4 w-full rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
            <div
              className="h-4 w-full rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
            <div
              className="h-4 w-2/3 rounded-full"
              style={{ background: "var(--rj-bone)" }}
            />
          </div>
          <div
            className="h-64 rounded-2xl"
            style={{ background: "var(--rj-bone)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SHARE BUTTON
// ─────────────────────────────────────────────────────────────────

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={share}
      className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-80"
      style={{
        background: "rgba(0,55,32,0.06)",
        border: "1px solid rgba(0,55,32,0.12)",
        color: "var(--rj-emerald)",
        cursor: "pointer",
      }}
    >
      {copied ? <Check size={10} /> : <Share2 size={10} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN BLOG DETAIL PAGE
// ─────────────────────────────────────────────────────────────────

interface BlogDetailLayoutProps {
  slug: string;
}

export default function BlogDetailLayout({ slug }: BlogDetailLayoutProps) {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [processedContent, setProcessedContent] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Fetch blog ──
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchBlogBySlug(slug)
      .then((data) => {
        setBlog(data);
        const { processedHtml, headings: h } = processContent(
          data.blogContent || "",
        );
        setProcessedContent(processedHtml);
        setHeadings(h);
      })
      .catch((e: Error) => {
        setError(e.message === "NOT_FOUND" ? "Blog not found." : e.message);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // ── Read progress bar ──
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setReadProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Loading ──
  if (loading) return <SkeletonDetail />;

  // ── Error ──
  if (error || !blog) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--rj-ivory)" }}
      >
        <AlertCircle
          size={36}
          style={{ color: "var(--rj-emerald)", opacity: 0.4 }}
        />
        <p
          className="font-cormorant text-2xl"
          style={{ color: "var(--rj-charcoal)" }}
        >
          {error === "Blog not found."
            ? "Article not found"
            : "Something went wrong"}
        </p>
        <Link
          href="/blog"
          className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full"
          style={{ background: "var(--rj-emerald)", color: "var(--rj-gold)" }}
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const coverSrc =
    blog.coverImage ||
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1400&q=80";

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Reading progress bar ── */}
      <div
        className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-150"
        style={{
          width: `${readProgress}%`,
          background: "var(--gradient-gold)",
        }}
      />

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "21/7", minHeight: 280, maxHeight: 520 }}
      >
        <Image
          src={coverSrc}
          alt={blog.coverImageAlt || blog.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Hero content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end container-rj pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {blog.category && (
              <span
                className="inline-block font-cinzel text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                style={{
                  background: "var(--rj-emerald)",
                  color: "var(--rj-gold)",
                }}
              >
                {blog.category}
              </span>
            )}
            <h1
              className="font-cormorant font-light text-white leading-tight"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", maxWidth: "42ch" }}
            >
              {blog.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Article meta bar ── */}
      <div
        className="border-b"
        style={{
          background: "#fff",
          borderColor: "var(--rj-bone)",
        }}
      >
        <div className="container-rj py-4 flex flex-wrap items-center gap-4 justify-between">
          {/* Left: back + meta */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/blogs"
              className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: "var(--rj-ash)" }}
            >
              <ArrowLeft size={11} /> All Articles
            </Link>

            <div className="flex items-center gap-3">
              {blog.publishedAt && (
                <span
                  className="font-cinzel text-[10px] tracking-widest"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {formatDate(blog.publishedAt)}
                </span>
              )}
              {blog.readingTimeMinutes && (
                <>
                  <span style={{ color: "var(--rj-bone)" }}>·</span>
                  <span
                    className="flex items-center gap-1 font-cinzel text-[10px] tracking-widest"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    <Clock size={10} /> {blog.readingTimeMinutes} min read
                  </span>
                </>
              )}
              {blog.views > 0 && (
                <>
                  <span style={{ color: "var(--rj-bone)" }}>·</span>
                  <span
                    className="flex items-center gap-1 font-cinzel text-[10px] tracking-widest"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    <Eye size={10} /> {blog.views.toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right: author + share */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {blog.author.avatar ? (
                <div className="relative w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-cinzel text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "var(--rj-gold)",
                  }}
                >
                  {blog.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span
                className="font-cinzel text-[10px] tracking-widest"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {blog.author.name}
              </span>
            </div>
            <ShareButton title={blog.title} />
          </div>
        </div>
      </div>

      {/* ── Main layout: article + sidebar ── */}
      <div className="container-rj py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          {/* ── Article body ── */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Excerpt pull-quote */}
            {blog.excerpt && (
              <blockquote
                className="mb-10 pl-5 font-cormorant text-xl font-light italic leading-relaxed"
                style={{
                  borderLeft: "3px solid var(--rj-gold)",
                  color: "var(--rj-charcoal)",
                }}
              >
                {blog.excerpt}
              </blockquote>
            )}

            {/* Blog content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Tags */}
            {blog.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mt-10 pt-8"
                style={{ borderTop: "1px solid var(--rj-bone)" }}
              >
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(0,55,32,0.06)",
                      border: "1px solid rgba(0,55,32,0.12)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* FAQs */}
            <FaqSection faqs={blog.faqs} />

            {/* Related posts */}
            <RelatedPosts posts={blog.relatedPosts} />
          </motion.div>

          {/* ── Sticky Sidebar ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col">
              <TableOfContents headings={headings} />
              <SidebarNewsletter />

              {/* Author card */}
              {blog.author.bio && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--rj-bone)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {blog.author.avatar ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel text-sm font-bold flex-shrink-0"
                        style={{
                          background: "var(--rj-emerald)",
                          color: "var(--rj-gold)",
                        }}
                      >
                        {blog.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p
                        className="font-cinzel text-[11px] font-bold tracking-wider"
                        style={{ color: "var(--rj-charcoal)" }}
                      >
                        {blog.author.name}
                      </p>
                      <p
                        className="font-cinzel text-[9px] tracking-widest"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        Author
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    {blog.author.bio}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Blog content styles ── */}
      <style>{`
        .blog-content {
          font-family: var(--font-body, 'DM Sans'), sans-serif;
          color: var(--rj-charcoal);
          line-height: 1.85;
          font-size: 1rem;
        }
        .blog-content h2 {
          font-family: var(--font-cormorant, 'Cormorant Garamond'), serif;
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 300;
          color: var(--rj-charcoal);
          margin: 2.5rem 0 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--rj-bone);
          scroll-margin-top: 100px;
        }
        .blog-content h3 {
          font-family: var(--font-cormorant, 'Cormorant Garamond'), serif;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 400;
          color: var(--rj-charcoal);
          margin: 2rem 0 0.75rem;
          scroll-margin-top: 100px;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          color: #3a3a3a;
        }
        .blog-content strong {
          font-weight: 600;
          color: var(--rj-charcoal);
        }
        .blog-content em {
          font-style: italic;
          color: var(--rj-emerald);
        }
        .blog-content a {
          color: var(--rj-emerald);
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }
        .blog-content a:hover { opacity: 0.7; }
        .blog-content ul, .blog-content ol {
          margin: 1.25rem 0;
          padding-left: 1.5rem;
        }
        .blog-content ul { list-style: none; padding-left: 0; }
        .blog-content ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .blog-content ul li::before {
          content: '✦';
          position: absolute;
          left: 0;
          font-size: 8px;
          top: 6px;
          color: var(--rj-gold);
        }
        .blog-content ol { list-style: decimal; }
        .blog-content ol li { margin-bottom: 0.5rem; padding-left: 0.25rem; }
        .blog-content blockquote {
          border-left: 3px solid var(--rj-gold);
          padding-left: 1.25rem;
          margin: 1.75rem 0;
          font-family: var(--font-cormorant, 'Cormorant Garamond'), serif;
          font-size: 1.15rem;
          font-style: italic;
          color: var(--rj-charcoal);
        }
        .blog-content img {
          width: 100%;
          border-radius: 12px;
          margin: 2rem 0;
          object-fit: cover;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.75rem 0;
          font-size: 0.9rem;
        }
        .blog-content th {
          background: var(--rj-emerald);
          color: var(--rj-gold);
          font-family: var(--font-cinzel, 'Cinzel'), serif;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 14px;
          text-align: left;
        }
        .blog-content td {
          padding: 10px 14px;
          border-bottom: 1px solid var(--rj-bone);
          color: #3a3a3a;
        }
        .blog-content tr:last-child td { border-bottom: none; }
        .blog-content tr:nth-child(even) td { background: rgba(0,0,0,0.02); }
        .blog-content code {
          font-family: 'Courier New', monospace;
          font-size: 0.85em;
          background: rgba(0,55,32,0.06);
          color: var(--rj-emerald);
          padding: 2px 6px;
          border-radius: 4px;
        }
        .blog-content pre {
          background: var(--rj-charcoal);
          color: #d4b896;
          padding: 1.25rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.85rem;
        }
        .blog-content pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .blog-content hr {
          border: none;
          border-top: 1px solid var(--rj-bone);
          margin: 2.5rem 0;
        }
      `}</style>
    </main>
  );
}
