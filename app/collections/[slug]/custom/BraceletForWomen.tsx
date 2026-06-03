// app/collections/bracelets-for-women/component/BraceletForWomen.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Star,
  ChevronRight,
  ChevronLeft,
  Gem,
  Sun,
  Droplets,
  Heart,
  Quote,
  Sparkles,
  Wind,
  Link2,
  BadgeCheck,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
interface ReviewItem {
  name: string;
  city: string;
  text: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FaqEntry {
  q: string;
  a: string;
}

// ─────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

// ─────────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────
function Section({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

// ─────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div
        className="h-px flex-1"
        style={{ background: "rgba(252,193,81,0.25)" }}
      />
      <span style={{ color: "var(--rj-gold)", fontSize: "10px" }}>✦</span>
      <div
        className="h-px flex-1"
        style={{ background: "rgba(252,193,81,0.25)" }}
      />
    </div>
  );
}

function Label({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-3"
      style={{ color: light ? "rgba(252,193,81,0.65)" : "var(--rj-gold)" }}
    >
      ✦ {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Every bracelet in our collection is finished with high-quality gold plating that delivers the warm, rich glow of real gold. Because the plating procedure is carried out with accuracy and generosity rather than as an afterthought, our gold plated bracelets for women appear truly opulent.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Finish",
    desc: "Our gold plated bracelets for women come with a protective anti-tarnish coating that keeps them shining beautifully through daily wear, festive occasions, and long-term storage. Wear them today, and they will look just as stunning six months from now.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Exquisite Craftsmanship",
    desc: "Every bracelet in our line is crafted with the level of care that makes a piece feel genuinely unique. From delicate filigree work to precise stone settings, our bracelets for women are crafted by skilled artisans who take pride in every curve and clasp.",
  },
  {
    icon: <Wind size={18} />,
    title: "Comfortable Everyday Fit",
    desc: "Beautiful jewellery that pinches or slips is jewellery that stays in the box. Our bracelets for women are designed with wearability in mind, smooth on the inside, lightweight on the wrist, and sized thoughtfully so every woman finds her perfect fit.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Safe Materials",
    desc: "Crafted using skin-friendly base metals and a smooth gold plated finish, our bracelets are gentle on all skin types. You can wear our gold plated bracelets for women for long hours of celebration without irritation or discomfort.",
  },
  {
    icon: <BadgeCheck size={18} />,
    title: "Affordable Elegance",
    desc: "The joy of wearing a beautifully crafted gold bracelet should be available to every woman, not just a fortunate few. At Rehnoor Jewels, our gold plated bracelets for women bring that joy to you at a price that feels generous, not out of reach.",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "After every wear, gently wipe your bracelet with a soft, dry cloth to remove any moisture or dust from the surface.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your gold plated bracelets in a dry, airtight jewellery pouch or box to protect the plating from humidity and oxidation.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "Remove your bracelets before bathing, swimming, or applying perfumes, lotions, and skincare products, as these can dull the finish over time.",
  },
  {
    icon: <Link2 size={15} />,
    tip: "Keep your bracelets and your 1 gram gold chain for women stored separately to prevent scratching and tangling.",
  },
  {
    icon: <Zap size={15} />,
    tip: "For a gentle clean, use a soft cloth lightly dampened with mild soapy water, wipe carefully across all surfaces, and dry completely before storing.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "Are your gold plated bracelets for women suitable for daily wear?",
    a: "Absolutely. Our gold plated bracelets for women are crafted with thick, durable plating and an anti-tarnish finish that makes them suitable for regular daily use. With basic care, your bracelet will maintain its shine through everyday wear beautifully.",
  },
  {
    q: "What sizes are available for bracelets for women?",
    a: "Our bracelets for women are available in a range of standard sizes. Each product listing includes a detailed size guide to help you find the perfect fit. If you are between sizes, we recommend sizing up for the most comfortable wear experience.",
  },
  {
    q: "Can I pair a bracelet with a 1-gram gold chain for women from your collection?",
    a: "Yes, and we highly recommend it. Our 1-gram gold chain for women is designed to pair beautifully with our bracelet collection. Many of our customers shop together as a coordinated set, and the combination always looks stunning.",
  },
  {
    q: "Are your bracelets for women suitable as gifts?",
    a: "Our bracelets for women make some of the most meaningful and appreciated gifts for birthdays, anniversaries, weddings, and festive occasions. Every Rehnoor Jewels order arrives in elegant packaging that makes the gift feel as special as the piece itself.",
  },
  {
    q: "Is the gold plating on your bracelets safe for sensitive skin?",
    a: "Yes. Our gold plated bracelets for women are crafted with hypoallergenic base metals and a smooth gold plated finish that is gentle on all skin types, including sensitive skin.",
  },
  {
    q: "Are your gold plated bracelets for women durable?",
    a: "Yes. Our gold plated bracelets for women are made with a thick layer of gold plating over high-quality base metal, ensuring lasting shine and durability with proper care.",
  },
  {
    q: "Do you offer a 1 gram gold chain for women in different lengths?",
    a: "Yes. Our 1 gram gold chain for women collection is available in multiple lengths and link styles, so you can find the perfect fit for any neckline.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I received so many compliments after wearing the Kundan bracelet set at my engagement. The gold finish is so warm and rich, and the detailing is absolutely stunning. Rehnoor Jewels delivered beyond my expectations!",
  },
  {
    name: "Anjali Verma",
    city: "Mumbai",
    text: "The gold plated bracelet I purchased for Navratri fulfilled all of my expectations. Paired it with my silk saree and the 1 gram gold chain I ordered together and felt completely put together the entire evening!",
  },
  {
    name: "Deepika Reddy",
    city: "Hyderabad",
    text: "Gifted a set of bracelets for women from Rehnoor Jewels to my sister for her birthday, and she was so moved. The packaging is beautiful, and the quality is so much better than the price suggests. Will definitely order again!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "I was anxious about purchasing bracelets online, but Rehnoor Jewels made the process quite simple. The bracelet fits perfectly, the gold finish is stunning, and it has not tarnished even after weeks of daily wear. Absolutely love it!",
  },
  {
    name: "Sunita Patel",
    city: "Ahmedabad",
    text: "As a wedding anniversary present for my daughter, I ordered matching bracelets and a 1-gram gold chain for women. The set looked so coordinated and elegant together. She treasures it completely. Thank you, Rehnoor Jewels!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "Finally found a brand that truly understands Indian women and their love for jewellery. The bracelet I ordered looks like something from a high-end jewellery store. The craftsmanship is exceptional, and the price is so fair!",
  },
];

// ─────────────────────────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.details
      ref={ref}
      variants={fadeUp}
      custom={index * 0.3}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
      style={{ borderBottom: "1px solid rgba(252,193,81,0.15)" }}
    >
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none">
        <span
          className="font-cormorant font-semibold leading-snug"
          style={{
            fontSize: "clamp(1rem,2vw,1.15rem)",
            color: "var(--rj-charcoal)",
          }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-open:rotate-45"
          style={{
            background: "rgba(252,193,81,0.12)",
            color: "var(--rj-gold)",
            border: "1px solid rgba(252,193,81,0.3)",
          }}
        >
          <ChevronRight size={13} />
        </span>
      </summary>
      <p
        className="pb-5 leading-relaxed"
        style={{
          color: "var(--rj-ash)",
          fontSize: "0.92rem",
          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          lineHeight: "1.8",
        }}
      >
        {a}
      </p>
    </motion.details>
  );
}

// ─────────────────────────────────────────────────────────────────
// REVIEW CAROUSEL
// ─────────────────────────────────────────────────────────────────
function ReviewCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((review, i) => (
            <div
              key={`${page}-${i}`}
              className="flex flex-col p-6 rounded-2xl gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={12}
                    style={{ fill: "var(--rj-gold)", color: "var(--rj-gold)" }}
                  />
                ))}
              </div>
              <Quote
                size={18}
                style={{ color: "rgba(252,193,81,0.3)", flexShrink: 0 }}
              />
              <p
                className="flex-1 leading-relaxed text-sm"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.8",
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div
                className="flex items-center gap-3 pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-cinzel text-sm font-bold"
                  style={{
                    background: "rgba(252,193,81,0.15)",
                    color: "var(--rj-gold)",
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="font-cinzel text-[10px] tracking-wider font-bold"
                    style={{ color: "#fff" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    {review.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === page ? "20px" : "6px",
                height: "6px",
                background:
                  i === page ? "var(--rj-gold)" : "rgba(255,255,255,0.2)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <ChevronRight size={14} />
        </button>
        <span
          className="font-cinzel text-[10px] tracking-widest tabular-nums"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {String(page + 1).padStart(2, "0")} /{" "}
          {String(totalPages).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function BraceletForWomen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* Hero */}
      <Section
        className="relative overflow-hidden py-14"
        style={{ background: "var(--rj-emerald)" }}
      >
        <div className="container-rj section-padding relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Rehnoor Jewels</Label>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(2.2rem,6vw,4.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Bracelets{" "}
              <em
                className="font-normal not-italic"
                style={{
                  background:
                    "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for Women
              </em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={1.5}
              className="font-cormorant font-light italic"
              style={{
                fontSize: "clamp(1rem,2.5vw,1.25rem)",
                color: "rgba(252,193,81,0.6)",
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Designed for Every Woman Who Deserves to Shine
            </motion.p>

            <GoldDivider />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(0.95rem,2vw,1.1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.9",
              }}
            >
              A bracelet is never just a bracelet. It is the quiet confidence
              wrapped around your wrist before a significant encounter. It is
              the shimmer that catches someone's eye as you reach across the
              table. Our collection of bracelets for women is crafted for the
              woman who understands that feeling beautiful is not vanity, it is
              power.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={2.5}
              className="mt-4 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(0.9rem,1.8vw,1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.85",
              }}
            >
              From delicate everyday bangles to bold festive cuff pieces, our
              bracelets for women are designed to move with you through every
              chapter of your life, every occasion, and every version of
              yourself.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* Second Section */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left — prose cultural context */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>Symbols of Beauty</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  The Bracelet That Was Made for{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    You
                  </em>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                custom={1}
                className="leading-relaxed mb-5"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.95",
                }}
              >
                Every culture has its symbols of beauty, and in India, the
                bracelet holds a place of profound significance. Worn at
                engagements, weddings, and family functions, exchanged as gifts
                between mothers and daughters, and slipped onto wrists as quiet
                celebrations of personal milestones, bracelets for women have
                always carried meaning far beyond their design.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="leading-relaxed mb-5"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.95",
                }}
              >
                In order to honour that significance, we at Rehnoor Jewels
                create{" "}
                <strong
                  style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                >
                  bracelets for women
                </strong>{" "}
                that blend the richness of ancient Indian aesthetics with styles
                that are appropriate for contemporary women. Whether you are
                looking for a piece rooted in heritage or something contemporary
                and minimal, our collection holds something that feels like it
                was designed specifically for you.
              </motion.p>
            </div>

            {/* Right — significance cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  symbol: "◎",
                  title: "The Engagement Bangle",
                  desc: "Worn at the moment a new chapter begins, the bracelet is one of the first pieces of jewellery exchanged at an engagement, carrying the warmth of a promise.",
                  dark: true,
                },
                {
                  symbol: "✦",
                  title: "The Wedding Gift",
                  desc: "Passed from mother to daughter, gifted by friends on the most special day, a bracelet given at a wedding carries love in every link.",
                  dark: false,
                },
                {
                  symbol: "◈",
                  title: "The Personal Milestone",
                  desc: "A promotion, a graduation, a birthday that matters, sometimes a bracelet is just for you. A quiet celebration of who you are becoming.",
                  dark: false,
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={i * 0.2}
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{
                    background: card.dark
                      ? "var(--rj-gold-pale)"
                      : "rgba(0,55,32,0.05)",
                    border: !card.dark ? "1px solid rgba(0,55,32,0.1)" : "none",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl font-cormorant"
                    style={{
                      background: card.dark
                        ? "rgba(252,193,81,0.12)"
                        : "rgba(0,55,32,0.08)",
                      color: "var(--rj-emerald)",
                      border: "1px solid rgba(0,55,32,0.14)",
                    }}
                  >
                    {card.symbol}
                  </div>
                  <div>
                    <p
                      className="font-cinzel text-[11px] tracking-wider font-bold mb-2"
                      style={{
                        color: "var(--rj-charcoal)",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: card.dark ? "#000" : "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                        lineHeight: "1.8",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CRAFTED TO LAST — dark bg, 3+3 grid
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(252,193,81,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="container-rj relative z-10">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Crafted to Last</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Plated Bracelets for Women{" "}
                <em
                  className="font-normal not-italic"
                  style={{
                    background:
                      "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Exceptional
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIAL_FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                custom={i * 0.1}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  background: "rgba(252,193,81,0.06)",
                  borderColor: "rgba(252,193,81,0.2)",
                  y: -3,
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(252,193,81,0.12)",
                    color: "var(--rj-gold)",
                  }}
                >
                  {feat.icon}
                </div>
                <h3
                  className="font-cinzel text-[11px] tracking-wider font-bold mb-2"
                  style={{ color: "#fff" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.75",
                  }}
                >
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CHAIN CROSS-SELL — emerald bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-emerald, #003720)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 100% 50%, rgba(252,193,81,0.1) 0%, transparent 65%)",
          }}
        />
        <div className="container-rj relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>Complete Your Look</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-5"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Pair Your Bracelet with a{" "}
                  <em
                    className="font-normal not-italic"
                    style={{
                      background:
                        "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    1 Gram Gold Chain
                  </em>
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                custom={1}
                className="leading-relaxed mb-5"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.9",
                  fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                }}
              >
                No jewellery look is truly complete with just one piece. That is
                why our customers consistently pair their favourite bracelets
                for women with our bestselling{" "}
                <strong style={{ color: "var(--rj-gold)" }}>
                  1 gram gold chain for women
                </strong>
                . Light enough to wear every day but rich enough to carry the
                look of real gold, our chain comes in a range of link styles,
                lengths, and finishes that coordinate beautifully with any
                bracelet from our collection.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.92rem",
                }}
              >
                Whether you are dressing for a casual family lunch or a grand
                festive celebration, the bracelet and chain together create a
                coordinated, pulled-together look that feels effortlessly
                elegant. Browse our full range of gold plated bracelets for
                women and find the chain that completes your set.
              </motion.p>
            </div>

            {/* Right — pairing benefit cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Casual Lunch",
                  sub: "Coordinated & effortless",
                  icon: "◇",
                },
                {
                  label: "Festive Celebration",
                  sub: "Rich & pulled-together",
                  icon: "♛",
                },
                {
                  label: "Wedding Function",
                  sub: "Traditional & complete",
                  icon: "✦",
                },
                {
                  label: "Everyday Wear",
                  sub: "Light enough for daily use",
                  icon: "◈",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="p-5 rounded-2xl flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span className="text-xl" style={{ color: "var(--rj-gold)" }}>
                    {card.icon}
                  </span>
                  <p
                    className="font-cinzel text-[11px] tracking-wider font-bold"
                    style={{ color: "#fff" }}
                  >
                    {card.label}
                  </p>
                  <p
                    className="text-[11px]"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    {card.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CARE TIPS — ivory bg, 3+2 layout
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Caring for Your Bracelets</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Simple Tips to Keep Your{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Bracelets Shining
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {CARE_TIPS.slice(0, 3).map((tip, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i * 0.12}
                className="p-6 rounded-2xl text-center flex flex-col items-center gap-3"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.09)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0,55,32,0.07)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  {tip.icon}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.75",
                  }}
                >
                  {tip.tip}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {CARE_TIPS.slice(3).map((tip, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={(i + 3) * 0.12}
                className="p-6 rounded-2xl text-center flex flex-col items-center gap-3"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 28px rgba(0,0,0,0.09)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0,55,32,0.07)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  {tip.icon}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.75",
                  }}
                >
                  {tip.tip}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          REVIEWS — dark bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(252,193,81,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="container-rj relative z-10">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>What Women Are Saying</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Our Customers'{" "}
                <em
                  className="font-normal not-italic"
                  style={{
                    background:
                      "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Stories
                </em>
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      style={{
                        fill: "var(--rj-gold)",
                        color: "var(--rj-gold)",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "#fff" }}
                >
                  5.0
                </span>
                <span
                  className="font-cinzel text-[10px] tracking-wider"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  · {REVIEWS.length} verified reviews
                </span>
              </div>
            </motion.div>
          </div>
          <ReviewCarousel reviews={REVIEWS} />
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          FAQ — ivory bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Frequently Asked Questions</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  FAQ: Bracelets for Women at{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Rehnoor Jewels
                  </em>
                </h2>
              </motion.div>
            </div>
            <div
              className="rounded-2xl overflow-hidden p-2"
              style={{ border: "1px solid var(--rj-bone)", background: "#fff" }}
            >
              {FAQS.map((faq, i) => (
                <div key={i} className="px-4">
                  <FaqItem q={faq.q} a={faq.a} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CTA FOOTER — dark bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div className="container-rj relative z-10 text-center">
          <motion.div variants={fadeUp} custom={0}>
            <Label light>Shop Now</Label>
            <h2
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Shop Bracelets for Women
              <br />
              <em
                className="font-normal not-italic"
                style={{
                  background:
                    "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                at Rehnoor Jewels
              </em>
            </h2>
          </motion.div>

          {/* Unique empowering closing line */}
          <motion.p
            variants={fadeUp}
            custom={1}
            className="font-cormorant italic max-w-xl mx-auto mb-4"
            style={{
              fontSize: "clamp(1rem,2.5vw,1.2rem)",
              color: "rgba(252,193,81,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            A bracelet is not just an accessory. It is a feeling, a memory, and
            a piece of who you are.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={1.5}
            className="max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.9rem,2vw,1.05rem)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              lineHeight: "1.85",
            }}
          >
            Explore our full collection of bracelets for women, gold plated
            bracelets for women, and 1 gram gold chain for women today and find
            the piece that feels like it was made for you.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:gap-3 hover:opacity-90"
              style={{
                background:
                  "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                color: "var(--rj-charcoal, #1a1a1a)",
                fontWeight: 700,
                boxShadow: "0 4px 24px rgba(252,193,81,0.3)",
              }}
            >
              Browse Collections <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
