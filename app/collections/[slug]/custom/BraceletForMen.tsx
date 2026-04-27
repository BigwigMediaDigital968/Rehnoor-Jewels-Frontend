// app/collections/bracelets-for-men/component/BraceletForMen.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Truck,
  RefreshCw,
  BadgeCheck,
  ChevronRight,
  Layers,
  Gem,
  Sun,
  Droplets,
  Wind,
  Gift,
  Quote,
  ChevronLeft,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
interface ReviewItem {
  name: string;
  city: string;
  text: string;
}

interface StyleTip {
  context: string;
  tip: string;
  num: string;
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
// SHARED UI PRIMITIVES
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-cinzel text-[10px] tracking-[0.25em] uppercase mb-3"
      style={{ color: "var(--rj-gold)" }}
    >
      ✦ {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const STAT_BADGES = [
  { value: "5+", label: "Bracelet Styles" },
  { value: "50K+", label: "Happy Customers" },
  { value: "1 Gram", label: "Gold Polish" },
  { value: "Free", label: "Pan-India Delivery" },
];

const BRACELET_STYLES = [
  {
    name: "Kada",
    desc: "A classic and timeless piece, the gold plated kada is bold, sturdy, and perfect for both traditional and contemporary looks.",
    symbol: "◎",
  },
  {
    name: "Chain Bracelet",
    desc: "Sleek and versatile, a gold plated chain bracelet for men pairs effortlessly with any outfit, casual or formal.",
    symbol: "〰",
  },
  {
    name: "Cuff Bracelet",
    desc: "Wide, bold, and striking. Our one gram gold cuff bracelets make a strong style statement for festive and special occasions.",
    symbol: "⌒",
  },
  {
    name: "Link Bracelet",
    desc: "Featuring interlocking links, this style adds a premium and structured look to your wrist, perfect for daily wear.",
    symbol: "⛓",
  },
  {
    name: "Beaded Bracelet",
    desc: "A trendy and lightweight option, our gold plated beaded bracelets blend modern style with everyday comfort.",
    symbol: "●●●",
  },
];

const SPECIAL_FEATURES = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Our gold plated bracelets for men are finished with high-quality gold plating that retains its shine and colour for longer.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: " Every bracelet comes with a protective anti-tarnish finish that keeps it looking fresh and radiant with regular use. ",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Comfortable",
    desc: "Designed for all-day wear, our one gram gold bracelets are lightweight, smooth, and comfortable on the wrist. ",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the bold, rich look of a gold bracelet at a price that suits every budget.",
  },
  {
    icon: <Layers size={18} />,
    title: "Wide Range of Designs",
    desc: "From minimalist to bold statement pieces, our collection has something for every man and every occasion.",
  },
];

const WHY_REHNOOR = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Trusted Quality",
    desc: "Every one gram gold bracelet at Rehnoor Jewels goes through strict quality checks to ensure a flawless finish and lasting shine.",
  },
  {
    icon: <Star size={16} />,
    title: "Affordable Pricing",
    desc: "We bring you the finest gold plated bracelets for men at prices that are easy on the pocket without compromising on craftsmanship.",
  },
  {
    icon: <Layers size={16} />,
    title: "Wide Collection",
    desc: "From classic kadas to trendy cuff bracelets, our gold plated bracelets range has something for every taste and style.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver your favourite one gram gold bracelets safely and securely to your doorstep, anywhere across India.",
  },
  {
    icon: <RefreshCw size={16} />,
    title: "Customer First Approach",
    desc: "At Rehnoor Jewels, your satisfaction is our priority. We are always here to help you find the perfect gold plated bracelet.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "Casual Look",
    tip: "Pair a simple one gram gold chain bracelet with a plain tee and joggers for an easy, stylish everyday look.",
    num: "01",
  },
  {
    context: "Festive & Traditional",
    tip: "Wear a bold gold plated kada or cuff bracelet over a kurta or sherwani to complete your festive look.",
    num: "02",
  },
  {
    context: "Formal Style",
    tip: "A sleek and minimal gold plated link bracelet adds a subtle yet sophisticated touch to any formal outfit.",
    num: "03",
  },
  {
    context: "Stacked Look",
    tip: "Mix and match different styles from our one gram gold bracelets collection and stack them together for a bold, trendy wrist look.",
    num: "04",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your bracelet with a soft, dry cloth after every use to remove sweat and dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth with mild soapy lukewarm water. Dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Keep away from perfumes, harsh chemicals, and prolonged water exposure to maintain shine.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What are gold plated bracelets?",
    a: "Gold plated bracelets for men are bracelets made from a base metal electroplated with a layer of real gold, offering a rich and luxurious look at a very affordable price.",
  },
  {
    q: "Are one gram gold bracelets for men suitable for daily wear?",
    a: "Yes! Our one gram gold bracelets for men are lightweight, comfortable, and designed for everyday use. With proper care, they hold up well with regular wear.",
  },
  {
    q: "How long do gold plated bracelets last?",
    a: "With regular care, a gold plated bracelet from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating.",
  },
  {
    q: "Can I wear gold plated bracelets in water?",
    a: "We recommend avoiding prolonged water exposure. Remove your gold plated bracelet for men before bathing, swimming, or any water-related activity to preserve the plating.",
  },
  {
    q: "How do I clean my one gram gold bracelet?",
    a: "Simply wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, then dry completely before storing.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Amit Rajput",
    city: "Delhi",
    text: "I bought a gold plated bracelet for men from Rehnoor Jewels and the quality is just outstanding! The finish looks so rich and premium, nobody can tell it is not solid gold. Absolutely love it!",
  },
  {
    name: "Suresh Yadav",
    city: "Mumbai",
    text: "Been wearing my one gram gold bracelet from Rehnoor Jewels every day for the past 2 months and there is zero fading. The anti-tarnish coating really works! Great value for money.",
  },
  {
    name: "Harpreet Singh",
    city: "Jaipur",
    text: "Finally found a gold plated bracelet that actually looks expensive! The finishing is smooth, the weight feels just right, and it pairs perfectly with both casual and ethnic outfits. Highly recommend Rehnoor Jewels!",
  },
  {
    name: "Gaurav Mishra",
    city: "Ahmedabad",
    text: "Ordered a one gram gold bracelet for men as a gift for my friend's birthday and he absolutely loved it! The packaging was neat and the bracelet looked stunning. Will definitely order again!",
  },
  {
    name: "Rajesh Chauhan",
    city: "Bangalore",
    text: "The gold plated kada I ordered from Rehnoor Jewels is exactly what I was looking for. Bold, sturdy, and looks amazing with my kurta. The quality is top class and the price is very reasonable!",
  },
  {
    name: "Manoj Tiwari",
    city: "Hyderabad",
    text: "I have tried many brands before but the one gram gold bracelet from Rehnoor Jewels is on a completely different level. It sits perfectly on the wrist, looks great with every outfit, and has held up really well with daily use!",
  },
  {
    name: "Deepak Saxena",
    city: "Lucknow",
    text: "The gold plated bracelet I ordered from Rehnoor Jewels exceeded all my expectations. Great quality, fast delivery, and the finish is absolutely flawless. Could not have asked for more at this price!",
  },
  {
    name: "Nitin Bhatt",
    city: "Chandigarh",
    text: "Wore my one gram gold bracelet to a wedding last week and received so many compliments! Everyone thought it was a real gold bracelet. Rehnoor Jewels truly delivers on quality and style!",
  },
  // {
  //   name: "Sandeep Kulkarni",
  //   city: "Pune",
  //   text: "I ordered two gold plated bracelets from Rehnoor Jewels, one for myself and one for my brother. Both of us are extremely happy with the purchase. The designs are trendy, the quality is great, and the price is unbeatable!",
  // },
  // {
  //   name: "Vishal Dubey",
  //   city: "Surat",
  //   text: "The one gram gold bracelet I ordered looks exactly like the pictures on the website. The shine is incredible and the anti-tarnish finish keeps it looking brand new. Rehnoor Jewels has earned a loyal customer!",
  // },
  {
    name: "Anjali Sharma",
    city: "Delhi",
    text: "I gifted a gold plated bracelet for men from Rehnoor Jewels to my husband on our anniversary and he has not taken it off since! The finish is so premium and elegant. He gets compliments every time he wears it.",
  },
  {
    name: "Neha Gupta",
    city: "Mumbai",
    text: "Was looking for a thoughtful Rakhi gift and came across Rehnoor Jewels. I ordered a one gram gold bracelet for my brother and he absolutely loved it! It arrived beautifully packed and looked stunning. Will definitely be ordering more pieces soon!",
  },
];

// ─────────────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef<HTMLDetailsElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.details
      ref={ref}
      variants={fadeUp}
      custom={index * 0.5}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
      style={{ borderBottom: "1px solid rgba(252,193,81,0.15)" }}
    >
      <summary
        className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none"
        style={{ color: "var(--rj-charcoal)" }}
      >
        <span
          className="font-cormorant font-semibold leading-snug"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
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
      {/* Cards */}
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
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={12}
                    style={{ fill: "var(--rj-gold)", color: "var(--rj-gold)" }}
                  />
                ))}
              </div>

              {/* Quote icon */}
              <Quote
                size={18}
                style={{ color: "rgba(252,193,81,0.3)", flexShrink: 0 }}
              />

              {/* Review text */}
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

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Avatar initial */}
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

      {/* Pagination */}
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

        {/* Counter */}
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function BraceletForMen() {
  return (
    <>
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div
        style={{ background: "var(--rj-ivory)" }}
        className="overflow-hidden"
      >
        {/* ══════════════════════════════════════════════════
          HERO INTRO — charcoal bg
      ══════════════════════════════════════════════════ */}
        {/* <Section
          className="relative overflow-hidden"
          style={{ background: "var(--rj-charcoal)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(252,193,81,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(252,193,81,0.4), transparent)",
            }}
          />

          <div className="container-rj section-padding py-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Rehnoor Jewels Collection</Label>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-cormorant font-light leading-tight mb-5"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Gold Plated Bracelets{" "}
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
                  for Men
                </em>
              </motion.h1>

              <GoldDivider />

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                }}
              >
                Shop our exclusive collection of gold plated bracelets for men
                crafted for those who wear their style with confidence. Each
                piece is designed to give you a rich, premium gold look at an
                affordable price, perfect for everyday wear as well as special
                occasions.
              </motion.p>
            </div>
          </div>
        </Section> */}

        {/* ══════════════════════════════════════════════════
          WHAT ARE GOLD PLATED BRACELETS?
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
              {/* Left */}
              <div>
                <motion.div variants={fadeUp} custom={0}>
                  <Label>About Our Collection</Label>
                  <h2
                    className="font-cormorant font-light leading-tight mb-5"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      color: "var(--rj-charcoal)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    What are Gold Plated
                    <br />
                    <em
                      className="font-normal"
                      style={{ color: "var(--rj-emerald)" }}
                    >
                      Bracelets for Men?
                    </em>
                  </h2>
                </motion.div>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  Gold plated bracelets for men are bracelets crafted from a
                  base metal such as brass or copper, electroplated with a layer
                  of real gold, giving them the bold and luxurious appearance of
                  solid gold at a fraction of the cost.
                </motion.p>
                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mt-4 leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  At Rehnoor Jewels, our{" "}
                  <strong
                    style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                  >
                    one gram gold bracelets for men
                  </strong>{" "}
                  are designed with precision, finished to perfection, and built
                  to complement every style — from casual everyday looks to
                  festive and formal occasions.
                </motion.p>
                {/* <motion.div variants={fadeUp} custom={3} className="mt-8">
                <Link
                  href="/collections/bracelets-for-men"
                  className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:gap-3"
                  style={{ background: "var(--rj-emerald)", color: "#fff" }}
                >
                  Shop the Collection <ChevronRight size={12} />
                </Link>
              </motion.div> */}
              </div>

              {/* Right — 2×2 card grid */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  {
                    label: "Kada & Cuffs",
                    sub: "Bold statement pieces",
                    icon: <Gem size={22} />,
                  },
                  {
                    label: "Lasting Shine",
                    sub: "Anti-tarnish finish",
                    icon: <Sun size={22} />,
                  },
                  {
                    label: "5+ Styles",
                    sub: "For every occasion",
                    icon: <Layers size={22} />,
                  },
                  {
                    label: "Perfect Gift",
                    sub: "For every celebration",
                    icon: <Gift size={22} />,
                  },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    variants={fadeUp}
                    custom={i * 0.3}
                    className="p-5 rounded-2xl flex flex-col gap-3"
                    style={{
                      background:
                        i % 2 === 0
                          ? "var(--rj-charcoal)"
                          : "rgba(0,55,32,0.06)",
                      border:
                        i % 2 === 0 ? "none" : "1px solid rgba(0,55,32,0.12)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          i % 2 === 0
                            ? "rgba(252,193,81,0.15)"
                            : "rgba(0,55,32,0.1)",
                        color:
                          i % 2 === 0 ? "var(--rj-gold)" : "var(--rj-emerald)",
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <p
                        className="font-cinzel text-[11px] tracking-wider font-bold"
                        style={{
                          color: i % 2 === 0 ? "#fff" : "var(--rj-charcoal)",
                        }}
                      >
                        {card.label}
                      </p>
                      <p
                        className="text-[11px] mt-0.5"
                        style={{
                          color:
                            i % 2 === 0
                              ? "rgba(255,255,255,0.45)"
                              : "var(--rj-ash)",
                          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                        }}
                      >
                        {card.sub}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          TOP BRACELET STYLES — dark bg
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
            <div className="flex text-center justify-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Style Guide</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Top Bracelet Styles in{" "}
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
                    Gold Plated for Men
                  </em>
                </h2>

                <p className="text-white/60 mt-3 max-w-3xl">
                  From bold statement pieces to sleek everyday designs, here are
                  the most popular gold plated bracelets for men styles
                  available at Rehnoor Jewels:{" "}
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-3">
              {BRACELET_STYLES.map((style, i) => (
                <motion.div
                  key={style.name}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="group flex items-center mx-auto gap-5 p-5 sm:p-6 rounded-2xl max-w-3xl transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    background: "rgba(252,193,81,0.05)",
                    borderColor: "rgba(252,193,81,0.2)",
                    x: 4,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-xl font-light"
                    style={{
                      border: "1px solid rgba(252,193,81,0.3)",
                      color: "var(--rj-gold)",
                      background: "rgba(252,193,81,0.06)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-cinzel text-sm tracking-wider font-bold mb-2"
                      style={{ color: "#fff" }}
                    >
                      {style.name}
                    </h3>
                    <p
                      className="leading-relaxed text-sm"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                        lineHeight: "1.75",
                      }}
                    >
                      {style.desc}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1"
                    style={{ color: "var(--rj-gold)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          WHAT MAKES IT SPECIAL — ivory bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Crafted to Last</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  What Makes Our Gold Plated
                  <br />
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Bracelets Special?
                  </em>
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPECIAL_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  custom={i * 0.12}
                  className="group p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--rj-bone)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                    borderColor: "rgba(252,193,81,0.4)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(0,55,32,0.07)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    {feat.icon}
                  </div>
                  <h3
                    className="font-cinzel text-[11px] tracking-wider font-bold mb-2"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--rj-ash)",
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
          WHY CHOOSE REHNOOR JEWELS — emerald bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-emerald, #003720)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 0% 50%, rgba(252,193,81,0.08) 0%, transparent 65%)",
            }}
          />
          <div className="container-rj relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-28">
                <motion.div variants={fadeUp} custom={0}>
                  <Label>Our Promise</Label>
                  <h2
                    className="font-cormorant font-light leading-tight mb-4"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Why Choose{" "}
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
                      Rehnoor Jewels?
                    </em>
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      lineHeight: "1.85",
                    }}
                  >
                    When it comes to buying gold plated bracelets for men
                    online, Rehnoor Jewels is a name you can trust.
                  </p>
                </motion.div>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-4">
                {WHY_REHNOOR.map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    custom={i * 0.15}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(252,193,81,0.15)",
                        color: "var(--rj-gold)",
                        border: "1px solid rgba(252,193,81,0.25)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        className="font-cinzel text-[11px] tracking-wider font-bold mb-1.5"
                        style={{ color: "#fff" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                          lineHeight: "1.75",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          HOW TO STYLE — ivory bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Styling Tips</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  How to{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Style
                  </em>{" "}
                  Gold Plated Bracelets
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {STYLE_TIPS.map((tip, i) => (
                <motion.div
                  key={tip.context}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="relative p-6 sm:p-8 rounded-2xl overflow-hidden"
                  style={{
                    background: i % 2 === 0 ? "var(--rj-charcoal)" : "#fff",
                    border: i % 2 !== 0 ? "1px solid var(--rj-bone)" : "none",
                  }}
                >
                  <span
                    className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                    style={{
                      fontSize: "5rem",
                      lineHeight: 1,
                      color:
                        i % 2 === 0
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,55,32,0.05)",
                    }}
                  >
                    {tip.num}
                  </span>
                  <span
                    className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                    style={{
                      background:
                        i % 2 === 0
                          ? "rgba(252,193,81,0.15)"
                          : "rgba(0,55,32,0.08)",
                      color:
                        i % 2 === 0 ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  >
                    {tip.context}
                  </span>
                  <p
                    className="leading-relaxed text-sm relative z-10 mt-2"
                    style={{
                      color:
                        i % 2 === 0
                          ? "rgba(255,255,255,0.65)"
                          : "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      lineHeight: "1.85",
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
          PERFECT GIFT SECTION — gold-tinted ivory
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
              style={{
                background: "var(--rj-emerald-light)",
                border: "1px solid rgba(252,193,81,0.2)",
              }}
            >
              {/* Decorative radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(252,193,81,0.08) 0%, transparent 65%)",
                }}
              />

              <div className="relative z-10 max-w-3xl mx-auto">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
                  style={{
                    background: "rgba(252,193,81,0.12)",
                    border: "1px solid rgba(252,193,81,0.3)",
                  }}
                >
                  <Gift size={22} style={{ color: "var(--rj-gold)" }} />
                </div>

                <Label>Gift Ideas</Label>

                <h2
                  className="font-cormorant font-light leading-tight mb-5"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  One Gram Gold Bracelets for Men:{" "}
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
                    A Perfect Gift
                  </em>
                </h2>

                <p
                  className="leading-relaxed mb-4"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  Looking for a gift that is meaningful, stylish, and
                  budget-friendly? A one gram gold bracelet for men from Rehnoor
                  Jewels makes for a perfect gift for every occasion. Whether it
                  is a birthday, anniversary, Rakhi, or festive celebration, our
                  gold plated bracelets for men are a thoughtful and elegant
                  choice that any man would love.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  Each piece comes beautifully presented, making it ready to
                  gift straight out of the box. Give the gift of style and let
                  Rehnoor Jewels make every occasion a little more special.
                </p>

                {/* Occasion pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  {[
                    "Birthday",
                    "Anniversary",
                    "Rakhi",
                    "Festive Occasions",
                    "Wedding",
                  ].map((occasion) => (
                    <span
                      key={occasion}
                      className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(252,193,81,0.1)",
                        border: "1px solid rgba(252,193,81,0.2)",
                        color: "var(--rj-gold)",
                      }}
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          PRODUCT LIFE — dark bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-charcoal)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 50% 100%, rgba(252,193,81,0.07) 0%, transparent 65%)",
            }}
          />
          <div className="container-rj relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <motion.div variants={fadeUp} custom={0}>
                  <Label>Durability</Label>
                  <h2
                    className="font-cormorant font-light leading-tight"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    How Long Do Gold Plated{" "}
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
                      Bracelets Last?
                    </em>
                  </h2>
                </motion.div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: "✨",
                    title: "With Regular Care",
                    body: "A well-maintained one gram gold bracelet for men can retain its shine and colour for up to 1 to 2 years or even longer.",
                    highlight: true,
                  },
                  {
                    icon: "✨",
                    title: "Key Factors",
                    body: "The longevity of your gold plated bracelet for men depends on skin type, exposure to sweat, water, perfumes, and frequency of wear.",
                    highlight: false,
                  },
                  {
                    icon: "✨",
                    title: "Anti-Tarnish Advantage",
                    body: "At Rehnoor Jewels, every gold plated bracelet comes with a premium anti-tarnish coating that significantly extends the life of the plating.",
                    highlight: false,
                  },
                  {
                    icon: "✨",
                    title: "Pro Tip",
                    body: "Remove your one gram gold bracelet before bathing, swimming, or exercising to keep it looking its best for longer.",
                    highlight: true,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    custom={i * 0.15}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{
                      background: item.highlight
                        ? "rgba(252,193,81,0.07)"
                        : "rgba(255,255,255,0.03)",
                      border: `1px solid ${item.highlight ? "rgba(252,193,81,0.2)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div>
                      <h3
                        className="font-cinzel text-[11px] tracking-wider font-bold mb-1.5"
                        style={{
                          color: item.highlight ? "var(--rj-gold)" : "#fff",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                          lineHeight: "1.78",
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          CARE TIPS — ivory bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <div className="text-center mb-10">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Maintenance</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Care Tips for Your{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Gold Plated Bracelet
                  </em>
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CARE_TIPS.map((tip, i) => (
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
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════
          CUSTOMER REVIEWS CAROUSEL — dark bg
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
                <Label>Customer Love</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Loved by Our Customers{" "}
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
                    Across India
                  </em>
                </h2>

                {/* Aggregate rating */}
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
                  <Label>Got Questions?</Label>
                  <h2
                    className="font-cormorant font-light leading-tight"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      color: "var(--rj-charcoal)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Frequently Asked{" "}
                    <em
                      className="font-normal"
                      style={{ color: "var(--rj-emerald)" }}
                    >
                      Questions?
                    </em>
                  </h2>
                </motion.div>
              </div>

              <div
                className="rounded-2xl overflow-hidden p-2"
                style={{
                  border: "1px solid var(--rj-bone)",
                  background: "#fff",
                }}
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
          CTA FOOTER STRIP — dark bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-charcoal)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(252,193,81,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(252,193,81,0.4), transparent)",
            }}
          />

          <div className="container-rj relative z-10 text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Shop Now</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Shop Gold Plated Bracelets for Men
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

            <motion.p
              variants={fadeUp}
              custom={1}
              className="max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.85",
              }}
            >
              At Rehnoor Jewels, we believe every man deserves an accessory that
              reflects his personality and elevates his style. Browse our one
              gram gold bracelets for men collection today and find the perfect
              piece for your wrist.
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
    </>
  );
}
