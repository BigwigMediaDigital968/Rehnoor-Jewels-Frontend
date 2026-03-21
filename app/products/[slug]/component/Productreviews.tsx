"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Camera, Check, ChevronDown, ThumbsUp } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  avatar: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  size?: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    avatar: "AM",
    city: "Mumbai",
    rating: 5,
    date: "Jan 12, 2025",
    title: "Absolutely stunning piece",
    body: "The finish is exceptional. Solid weight, mirror finish — got compliments at every event. The BIS hallmark gave me complete confidence. Packaging was premium — felt like a luxury brand.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80",
    ],
    helpful: 24,
    verified: true,
    size: '18"',
  },
  {
    id: 2,
    name: "Rohan Singhania",
    avatar: "RS",
    city: "Delhi",
    rating: 5,
    date: "Dec 28, 2024",
    title: "Value for money, premium quality",
    body: "Had my doubts buying jewellery online but Rehnoor exceeded all expectations. The chain feels solid and the gold colour is consistent throughout. Will definitely order again.",
    images: [],
    helpful: 18,
    verified: true,
    size: '20"',
  },
  {
    id: 3,
    name: "Vikram Nair",
    avatar: "VN",
    city: "Bangalore",
    rating: 4,
    date: "Nov 15, 2024",
    title: "Great design, minor sizing issue",
    body: "Love the design and weight. Had a minor sizing issue but their free adjustment service sorted it within 3 days. Customer support was very responsive throughout.",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80",
    ],
    helpful: 12,
    verified: true,
    size: "22",
  },
  {
    id: 4,
    name: "Dev Sharma",
    avatar: "DS",
    city: "Hyderabad",
    rating: 5,
    date: "Oct 3, 2024",
    title: "फोटो जैसा ही है, पैसे वसूल",
    body: "बिल्कुल वैसा ही है जैसा फोटो में दिखाया है। वजन और finish दोनों बहुत अच्छे हैं। Packaging भी बहुत premium था। जरूर recommend करूँगा।",
    images: [],
    helpful: 31,
    verified: true,
  },
  {
    id: 5,
    name: "Karan Oberoi",
    avatar: "KO",
    city: "Jaipur",
    rating: 5,
    date: "Sep 20, 2024",
    title: "Best purchase this year",
    body: "Bought this as an anniversary gift — she loved it! The quality is far better than what I expected at this price point. The engraving service was also perfect.",
    images: [
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=80",
    ],
    helpful: 9,
    verified: true,
  },
];

const RATING_DIST = [
  { stars: 5, count: 142, pct: 72 },
  { stars: 4, count: 38, pct: 19 },
  { stars: 3, count: 12, pct: 6 },
  { stars: 2, count: 4, pct: 2 },
  { stars: 1, count: 2, pct: 1 },
];

// ─────────────────────────────────────────────────────────────────
// ADD REVIEW MODAL
// ─────────────────────────────────────────────────────────────────
function AddReviewModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !body.trim()) return;
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  const inputStyle = {
    background: "#fff",
    border: "1px solid var(--rj-bone)",
    borderRadius: "8px",
    color: "var(--rj-charcoal)",
    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="w-full sm:max-w-lg overflow-y-auto"
        style={{
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          maxHeight: "92vh",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--rj-bone)" }}
          />
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Check size={28} style={{ color: "var(--rj-emerald)" }} />
            </motion.div>
            <h3
              className="font-cormorant text-2xl font-light mb-2"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Review Submitted!
            </h3>
            <p
              className="font-cinzel text-xs tracking-wider"
              style={{ color: "var(--rj-ash)" }}
            >
              Thank you for sharing your experience.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p
                  className="label-accent mb-1"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  ✦ Your Review
                </p>
                <h3
                  className="font-cormorant text-xl font-light"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  Share Your Experience
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "var(--rj-charcoal)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Star rating */}
            <div className="mb-5">
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase mb-2.5 font-bold"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Your Rating <span style={{ color: "#ef4444" }}>*</span>
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <Star
                      size={28}
                      style={{
                        fill:
                          s <= (hoverRating || rating)
                            ? "var(--rj-gold)"
                            : "transparent",
                        color:
                          s <= (hoverRating || rating)
                            ? "var(--rj-gold)"
                            : "var(--rj-bone)",
                        transition: "all 0.15s",
                      }}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span
                    className="self-center font-cinzel text-xs ml-1"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {
                      ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][
                        rating
                      ]
                    }
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label
                className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Review Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience…"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--rj-emerald)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
              />
            </div>

            {/* Body */}
            <div className="mb-4">
              <label
                className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Review <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Tell us about the quality, fit, and your overall experience…"
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--rj-emerald)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
              />
            </div>

            {/* Name + City */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label
                  className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--rj-emerald)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--rj-bone)")
                  }
                />
              </div>
              <div>
                <label
                  className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--rj-emerald)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--rj-bone)")
                  }
                />
              </div>
            </div>

            {/* Size worn */}
            <div className="mb-5">
              <label
                className="font-cinzel text-[10px] tracking-widest uppercase mb-1.5 block font-bold"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Size Purchased
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder='e.g. 18", M, 20'
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--rj-emerald)")
                }
                onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
              />
            </div>

            {/* Image upload hint */}
            <div
              className="mb-6 p-3 rounded-xl flex items-center gap-3"
              style={{
                background: "rgba(0,55,32,0.04)",
                border: "1px dashed var(--rj-bone)",
              }}
            >
              <Camera
                size={18}
                style={{ color: "var(--rj-emerald)", flexShrink: 0 }}
              />
              <p
                className="font-cinzel text-[9px] tracking-wider"
                style={{ color: "var(--rj-ash)" }}
              >
                Photo upload coming soon — we'll notify you when it's available.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!rating || !body.trim()}
              className="w-full py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-40"
              style={{
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
                cursor: rating && body.trim() ? "pointer" : "not-allowed",
                boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
              }}
            >
              Submit Review
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// REVIEW CARD
// ─────────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      {lightboxSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.9)", cursor: "zoom-out" }}
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative w-full max-w-xl"
            style={{ aspectRatio: "1/1" }}
          >
            <Image
              src={lightboxSrc}
              alt="Review photo"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </motion.div>
      )}

      <div
        className="p-5 rounded-2xl"
        style={{
          background: "#fff",
          border: "1px solid var(--rj-bone)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-xs font-bold flex-shrink-0"
              style={{
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
              }}
            >
              {review.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {review.name}
                </p>
                {review.verified && (
                  <span
                    className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(0,55,32,0.08)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-[10px]" style={{ color: "var(--rj-ash)" }}>
                {review.city} · {review.date}
                {review.size ? ` · Size: ${review.size}` : ""}
              </p>
            </div>
          </div>
          <div className="flex gap-0.5 flex-shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                style={{
                  fill: i < review.rating ? "var(--rj-gold)" : "transparent",
                  color:
                    i < review.rating ? "var(--rj-gold)" : "var(--rj-bone)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        {review.title && (
          <p
            className="font-cinzel text-xs font-bold mb-1.5"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {review.title}
          </p>
        )}

        {/* Body */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{
            color: "var(--rj-charcoal)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {review.body}
        </p>

        {/* Review photos */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 mb-4">
            {review.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxSrc(img)}
                className="relative rounded-lg overflow-hidden flex-shrink-0 transition-all hover:scale-105"
                style={{
                  width: 64,
                  height: 64,
                  border: "1px solid var(--rj-bone)",
                  cursor: "zoom-in",
                }}
              >
                <Image
                  src={img}
                  alt={`Review photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Helpful */}
        <div
          className="flex items-center gap-2 pt-3"
          style={{ borderTop: "1px solid var(--rj-bone)" }}
        >
          <p
            className="font-cinzel text-[9px] tracking-wider"
            style={{ color: "var(--rj-ash)" }}
          >
            Helpful? ({helpfulCount})
          </p>
          <button
            onClick={() => {
              if (!voted) {
                setHelpfulCount((c) => c + 1);
                setVoted(true);
              }
            }}
            disabled={voted}
            className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full transition-all"
            style={{
              border: `1px solid ${voted ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
              background: voted ? "rgba(0,55,32,0.06)" : "transparent",
              color: voted ? "var(--rj-emerald)" : "var(--rj-ash)",
              cursor: voted ? "default" : "pointer",
            }}
          >
            <ThumbsUp size={10} /> Yes
          </button>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN REVIEWS SECTION
// ─────────────────────────────────────────────────────────────────
export default function ProductReviews() {
  const [showModal, setShowModal] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  const avgRating = (
    SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / SAMPLE_REVIEWS.length
  ).toFixed(1);
  const totalCount = RATING_DIST.reduce((s, d) => s + d.count, 0);

  const filtered =
    filterRating === 0
      ? SAMPLE_REVIEWS
      : SAMPLE_REVIEWS.filter((r) => r.rating === filterRating);

  const visible = showAll ? filtered : filtered.slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {showModal && <AddReviewModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <section
        id="reviews"
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                ✦ Customer Reviews
              </p>
              <h2
                className="heading-md leading-tight"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Real people,
                <br />
                <em className="text-gold-shimmer font-normal">real gold</em>
              </h2>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary self-start sm:self-auto flex-shrink-0"
              style={{
                display: "inline-flex",
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
                cursor: "pointer",
              }}
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Summary sidebar */}
            <div>
              {/* Aggregate */}
              <div
                className="p-6 rounded-2xl mb-6"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                }}
              >
                <p
                  className="font-cormorant font-light leading-none mb-1"
                  style={{ fontSize: "4rem", color: "var(--rj-charcoal)" }}
                >
                  {avgRating}
                </p>
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      style={{
                        fill:
                          i < Math.floor(+avgRating)
                            ? "var(--rj-gold)"
                            : "transparent",
                        color:
                          i < Math.floor(+avgRating)
                            ? "var(--rj-gold)"
                            : "var(--rj-bone)",
                      }}
                    />
                  ))}
                </div>
                <p
                  className="font-cinzel text-[10px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Based on {totalCount} reviews
                </p>

                {/* Distribution bars */}
                <div className="mt-5 space-y-2">
                  {RATING_DIST.map((d) => (
                    <button
                      key={d.stars}
                      onClick={() =>
                        setFilterRating(filterRating === d.stars ? 0 : d.stars)
                      }
                      className="w-full flex items-center gap-2 group"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex gap-0.5 flex-shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            style={{
                              fill:
                                i < d.stars ? "var(--rj-gold)" : "transparent",
                              color:
                                i < d.stars
                                  ? "var(--rj-gold)"
                                  : "var(--rj-bone)",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        className="flex-1 h-1.5 rounded-full overflow-hidden"
                        style={{ background: "var(--rj-bone)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${d.pct}%`,
                            background:
                              filterRating === d.stars
                                ? "var(--rj-emerald)"
                                : "var(--rj-gold)",
                          }}
                        />
                      </div>
                      <span
                        className="font-cinzel text-[9px] flex-shrink-0 w-6 text-right"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {d.count}
                      </span>
                    </button>
                  ))}
                </div>

                {filterRating > 0 && (
                  <button
                    onClick={() => setFilterRating(0)}
                    className="mt-4 w-full font-cinzel text-[9px] tracking-wider uppercase py-1.5 rounded-full transition-all"
                    style={{
                      border: "1px solid var(--rj-bone)",
                      color: "var(--rj-ash)",
                      cursor: "pointer",
                    }}
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>

            {/* Reviews list */}
            <div className="lg:col-span-2">
              {/* Sort */}
              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-cinzel text-[10px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Showing {visible.length} of {filtered.length} reviews
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="font-cinzel text-[10px] tracking-wider outline-none px-3 py-1.5 rounded-lg"
                  style={{
                    border: "1px solid var(--rj-bone)",
                    background: "#fff",
                    color: "var(--rj-ash)",
                    cursor: "pointer",
                  }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {visible.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <ReviewCard review={r} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filtered.length > 3 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAll((s) => !s)}
                    className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all"
                    style={{
                      border: "1.5px solid var(--rj-emerald)",
                      color: "var(--rj-emerald)",
                      cursor: "pointer",
                    }}
                  >
                    {showAll
                      ? "Show Less"
                      : `Show All ${filtered.length} Reviews`}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
