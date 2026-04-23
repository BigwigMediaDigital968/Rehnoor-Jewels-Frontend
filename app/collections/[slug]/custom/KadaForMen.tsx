// app/collections/kada-for-men/component/KadaForMen.tsx
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
  ChevronLeft,
  Layers,
  Gem,
  Sun,
  Droplets,
  Wind,
  Gift,
  Quote,
  Hammer,
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

interface KadaStyle {
  name: string;
  desc: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface WhyItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface DurabilityItem {
  icon: string;
  title: string;
  body: string;
  highlight: boolean;
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
  { value: "5+", label: "Kada Styles" },
  { value: "50K+", label: "Happy Customers" },
  { value: "1 Gram", label: "Gold Polish" },
  { value: "Free", label: "Pan-India Delivery" },
];

const KADA_STYLES: KadaStyle[] = [
  {
    name: "Plain Kada",
    desc: "A simple, sleek, and timeless gold plated kada that pairs effortlessly with any outfit, ethnic or casual. Perfect for everyday wear.",
  },
  {
    name: "Designer Kada",
    desc: "Intricately crafted with detailed patterns and engravings, our designer golden kada adds a touch of elegance and sophistication to any look.",
  },
  {
    name: "Broad Kada",
    desc: "Bold, wide, and striking. Our broad gold kada makes a strong style statement and is ideal for festive and wedding occasions.",
  },
  {
    name: "Twisted Kada",
    desc: "A unique and contemporary design featuring a twisted pattern, perfect for men who love to stand out with their style.",
  },
  {
    name: "Dual Tone Kada",
    desc: "A modern take on the classic golden kada, featuring a combination of gold and oxidised finishes for a bold and trendy look.",
  },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Finished with high-quality gold plating that retains its rich shine and colour for longer.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "Every golden kada comes with a protective anti-tarnish finish that keeps it looking fresh and radiant with regular use.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Comfortable",
    desc: "Designed for all-day wear — lightweight, smooth, and comfortable on the wrist.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the bold, traditional look of a gold kada at a price that suits every budget.",
  },
  {
    icon: <Layers size={18} />,
    title: "Wide Range of Designs",
    desc: "From plain and minimal to bold and ornate — a golden kada for every man and every occasion.",
  },
  {
    icon: <Hammer size={18} />,
    title: "Sturdy Build",
    desc: "Our gold plated kada for men is built to last — a reliable everyday accessory and a treasured festive piece.",
  },
];

const WHY_REHNOOR: WhyItem[] = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Trusted Quality",
    desc: "Every 1 gram gold kada at Rehnoor Jewels goes through strict quality checks to ensure a flawless finish and lasting shine.",
  },
  {
    icon: <Star size={16} />,
    title: "Affordable Pricing",
    desc: "We bring you the finest gold kada for men designs at prices that are easy on the pocket without compromising on craftsmanship.",
  },
  {
    icon: <Layers size={16} />,
    title: "Wide Collection",
    desc: "From plain everyday kadas to bold festive pieces, our gold plated kada range has something for every taste, style, and budget.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver your favourite golden kada safely and securely to your doorstep, anywhere across India.",
  },
  {
    icon: <RefreshCw size={16} />,
    title: "Customer First Approach",
    desc: "At Rehnoor Jewels, your satisfaction is our priority. We are always here to help you find the perfect gold kada for men.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "Traditional & Festive",
    tip: "Pair a bold gold kada for men with a kurta or sherwani for a classic and complete traditional look at weddings, pujas, or festive celebrations.",
    num: "01",
  },
  {
    context: "Casual Look",
    tip: "Wear a simple plain golden kada with a plain tee and jeans for a stylish and effortless everyday look.",
    num: "02",
  },
  {
    context: "Formal Style",
    tip: "A sleek and minimal 1 gram gold kada adds a subtle yet confident touch to any formal or semi-formal outfit.",
    num: "03",
  },
  {
    context: "Stacked Look",
    tip: "Pair your gold plated kada with a chain bracelet or beaded bracelet for a trendy and personalised stacked wrist look.",
    num: "04",
  },
  {
    context: "Fusion Look",
    tip: "Mix your golden kada with contemporary western outfits like shirts and chinos for a bold indo-western style statement.",
    num: "05",
  },
];

const DURABILITY_ITEMS: DurabilityItem[] = [
  {
    icon: "⏱",
    title: "With Regular Care",
    body: "A well-maintained 1 gram gold kada can retain its shine and colour for up to 1 to 2 years or even longer.",
    highlight: true,
  },
  {
    icon: "🧪",
    title: "Key Factors",
    body: "The longevity of your golden kada depends on skin type, exposure to sweat, water, perfumes, and how frequently it is worn.",
    highlight: false,
  },
  {
    icon: "🛡",
    title: "Anti-Tarnish Advantage",
    body: "At Rehnoor Jewels, every gold plated kada for men comes with a premium anti-tarnish coating that adds an extra layer of protection and significantly extends the life of the plating.",
    highlight: false,
  },
  {
    icon: "💡",
    title: "Pro Tip",
    body: "Remove your gold kada before bathing, swimming, or exercising to keep it looking its best for longer.",
    highlight: true,
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your kada with a soft, dry cloth after every use to remove sweat and dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth with mild soapy lukewarm water. Dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your golden kada in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Keep away from perfumes, harsh chemicals, and prolonged water exposure to maintain shine and finish.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What is a gold plated kada for men?",
    a: "A gold plated kada for men is a traditional wrist ornament made from a base metal electroplated with a layer of real gold, offering the bold and rich look of a golden kada at a very affordable price.",
  },
  {
    q: "Is a 1 gram gold kada for men suitable for daily wear?",
    a: "Yes! Our 1 gram gold kada for men is lightweight, comfortable, and designed for everyday use. With proper care, it holds up well with regular wear and retains its shine for a long time.",
  },
  {
    q: "How long does a gold plated kada for men last?",
    a: "With regular care, a gold plated kada for men from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating.",
  },
  {
    q: "Can I wear a golden kada in water?",
    a: "We recommend avoiding prolonged water exposure. Remove your gold plated kada before bathing, swimming, or any water-related activity to preserve the plating and shine.",
  },
  {
    q: "What is the difference between a golden kada and a gold kada for men?",
    a: "Both terms refer to the same style of wrist ornament. A golden kada typically refers to its colour and finish, while a gold kada refers to the style and target wearer. At Rehnoor Jewels, all our kadas are gold plated and designed specifically for men.",
  },
  {
    q: "How do I clean my gold plated kada for men?",
    a: "Simply wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, then dry completely before storing.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Amarjeet Singh",
    city: "Amritsar",
    text: "I have been looking for a good gold plated kada for myself for a long time and Rehnoor Jewels did not disappoint! The finish is smooth, the weight feels just right, and it looks exactly like a real golden kada. Absolutely love it!",
  },
  {
    name: "Ramesh Yadav",
    city: "Lucknow",
    text: "Ordered a 1 gram gold kada for men from Rehnoor Jewels and I am beyond impressed. The quality is outstanding, the shine is incredible, and it has held up really well with daily wear. Highly recommend!",
  },
  {
    name: "Gurpreet Dhillon",
    city: "Chandigarh",
    text: "The gold plated kada I ordered from Rehnoor Jewels is just perfect. Bold, sturdy, and looks amazing with both my kurta and casual outfits. The anti-tarnish coating is a great feature — still looks brand new after months of wear!",
  },
  {
    name: "Manoj Tiwari",
    city: "Bhopal",
    text: "Finally found a golden kada that looks premium without the premium price tag! Rehnoor Jewels has nailed the quality and design. My friends keep asking where I got it from!",
  },
  {
    name: "Sunil Chauhan",
    city: "Jaipur",
    text: "The broad gold kada I ordered from Rehnoor Jewels is stunning. Wore it to a wedding last week and received so many compliments! Everyone thought it was a real gold kada. Truly impressed with the quality!",
  },
  {
    name: "Deepak Verma",
    city: "Pune",
    text: "I ordered the 1 gram gold kada for Diwali and it was the best purchase I made this festive season. The detailing is beautiful, the finish is flawless, and it paired perfectly with my kurta. Will definitely order more pieces!",
  },
  {
    name: "Rahul Nair",
    city: "Kochi",
    text: "Been wearing my gold plated kada from Rehnoor Jewels every day for the past 3 months and there is no fading at all. The anti-tarnish finish really makes a difference. Great value for money!",
  },
  {
    name: "Vishal Sharma",
    city: "Surat",
    text: "The golden kada I ordered from Rehnoor Jewels exceeded all my expectations. Fast delivery, beautiful packaging, and the quality is top class. Could not have asked for more at this price!",
  },
  {
    name: "Nikhil Patil",
    city: "Nagpur",
    text: "I ordered a gold kada for men from Rehnoor Jewels as a birthday gift for my best friend and he absolutely loved it! The packaging was elegant and the kada looked stunning. Will definitely be ordering again!",
  },
  {
    name: "Harish Dubey",
    city: "Varanasi",
    text: "The 1 gram gold kada from Rehnoor Jewels is a perfect blend of tradition and style. It looks bold and rich, feels lightweight and comfortable, and the price is very reasonable. Rehnoor Jewels has earned a loyal customer!",
  },
  {
    name: "Pooja Agarwal",
    city: "Delhi",
    text: "I gifted a gold plated kada from Rehnoor Jewels to my husband on his birthday and he has not taken it off since! The golden kada looks so rich and premium on his wrist. He gets compliments every time he steps out. So happy with my purchase!",
  },
  {
    name: "Simran Kaur",
    city: "Ludhiana",
    text: "Was looking for a meaningful Rakhi gift for my brother and came across Rehnoor Jewels. I ordered a 1 gram gold kada for men and he absolutely loved it! It arrived beautifully packed and looked just like a real gold kada. I will definitely order more from Rehnoor Jewels!",
  },
];

const GIFT_OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Diwali",
  "Wedding",
  "Festive Occasions",
];

// ─────────────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.details
      ref={ref}
      variants={fadeUp}
      custom={index * 0.4}
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
          aria-label="Previous reviews"
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
              aria-label={`Page ${i + 1}`}
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
          aria-label="Next reviews"
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
export default function KadaForMen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO INTRO — charcoal bg
      ══════════════════════════════════════════════════ */}
      <Section
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

        <div className="container-rj py-14 relative z-10">
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
              Gold Plated Kada{" "}
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
              Explore our exclusive collection of gold plated kada for men —
              where tradition meets contemporary style. Each piece is crafted to
              give you the bold, rich look of a golden kada at an affordable
              price, making it perfect for daily wear, festive celebrations, and
              special occasions.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT IS A GOLD PLATED KADA? — ivory bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Left — text */}
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
                  What is a Gold Plated
                  <br />
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Kada for Men?
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
                A gold plated kada for men is a traditional wrist ornament
                crafted from a base metal such as brass or copper, electroplated
                with a layer of real gold, giving it the rich and bold
                appearance of a solid gold kada at a fraction of the cost.
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
                  1 gram gold kada for men
                </strong>{" "}
                collection is designed with precision, finished to perfection,
                and built to complement every style — from traditional ethnic
                looks to modern contemporary outfits. Whether you are looking
                for a simple golden kada for daily wear or a bold gold kada for
                festive occasions, we have the perfect piece for you.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="mt-8">
                <Link
                  href="/collections/kada-for-men"
                  className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:gap-3"
                  style={{ background: "var(--rj-emerald)", color: "#fff" }}
                >
                  Shop Kadas <ChevronRight size={12} />
                </Link>
              </motion.div>
            </div>

            {/* Right — decorative 2×2 card grid */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-2 gap-3"
            >
              {[
                {
                  label: "Traditional Roots",
                  sub: "Rooted in culture",
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
                      i % 2 === 0 ? "var(--rj-charcoal)" : "rgba(0,55,32,0.06)",
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
          TOP KADA STYLES — dark bg with horizontal timeline feel
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
        {/* Vertical gold line decoration — desktop only */}
        <div
          className="absolute left-[calc(50%-1px)] top-32 bottom-16 w-px hidden lg:block pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(252,193,81,0.15), transparent)",
          }}
        />

        <div className="container-rj relative z-10">
          <div className="text-center mb-12">
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
                Top Styles in{" "}
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
                  Gold Plated Kada
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            {KADA_STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                variants={fadeUp}
                custom={i * 0.15}
                className="group flex items-start gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default"
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
                {/* Numbered circle */}
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
          WHAT MAKES IT SPECIAL — ivory bg, 6-card grid
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Crafted with Precision</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Kada{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Special?
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
          WHY CHOOSE REHNOOR — emerald bg, split layout
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
            {/* Left — sticky heading */}
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
                  Why Choose Rehnoor Jewels for Your{" "}
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
                    Gold Plated Kada?
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
                  When it comes to buying a gold plated kada for men online,
                  Rehnoor Jewels is a name you can trust.
                </p>
              </motion.div>
            </div>

            {/* Right — feature list */}
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
          HOW TO STYLE — ivory bg, 5-tip grid (3+2)
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
                a Gold Plated Kada
              </h2>
            </motion.div>
          </div>

          {/* Top row — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {STYLE_TIPS.slice(0, 3).map((tip, i) => (
              <motion.div
                key={tip.context}
                variants={fadeUp}
                custom={i * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: i === 1 ? "var(--rj-charcoal)" : "#fff",
                  border: i === 1 ? "none" : "1px solid var(--rj-bone)",
                }}
              >
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color:
                      i === 1 ? "rgba(255,255,255,0.05)" : "rgba(0,55,32,0.05)",
                  }}
                >
                  {tip.num}
                </span>
                <span
                  className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                  style={{
                    background:
                      i === 1 ? "rgba(252,193,81,0.15)" : "rgba(0,55,32,0.08)",
                    color: i === 1 ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {tip.context}
                </span>
                <p
                  className="leading-relaxed text-sm relative z-10 mt-2"
                  style={{
                    color: i === 1 ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  {tip.tip}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom row — 2 cards (centered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {STYLE_TIPS.slice(3).map((tip, i) => (
              <motion.div
                key={tip.context}
                variants={fadeUp}
                custom={(i + 3) * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: i === 0 ? "#fff" : "var(--rj-charcoal)",
                  border: i === 0 ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color:
                      i === 0 ? "rgba(0,55,32,0.05)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  {tip.num}
                </span>
                <span
                  className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                  style={{
                    background:
                      i === 0 ? "rgba(0,55,32,0.08)" : "rgba(252,193,81,0.15)",
                    color: i === 0 ? "var(--rj-emerald)" : "var(--rj-gold)",
                  }}
                >
                  {tip.context}
                </span>
                <p
                  className="leading-relaxed text-sm relative z-10 mt-2"
                  style={{
                    color: i === 0 ? "var(--rj-ash)" : "rgba(255,255,255,0.65)",
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
          PERFECT GIFT — charcoal bg with gold glow card
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
            style={{
              background: "var(--rj-charcoal)",
              border: "1px solid rgba(252,193,81,0.2)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(252,193,81,0.08) 0%, transparent 65%)",
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
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
                1 Gram Gold Kada for Men:{" "}
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
                Looking for a gift that is traditional, meaningful, and
                budget-friendly? A 1 gram gold kada for men from Rehnoor Jewels
                makes for a perfect gift for every occasion. Whether it is a
                birthday, anniversary, Rakhi, Diwali, or wedding, our gold
                plated kada for men is a thoughtful and elegant choice that any
                man would be proud to wear.
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
                Each piece comes beautifully presented, making it ready to gift
                straight out of the box. Give the gift of tradition and style
                and let Rehnoor Jewels make every occasion truly special.
              </p>

              {/* Occasion pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {GIFT_OCCASIONS.map((occasion) => (
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
                  How Long Does a{" "}
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
                    Gold Plated Kada
                  </em>{" "}
                  Last?
                </h2>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              {DURABILITY_ITEMS.map((item, i) => (
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
                  Gold Plated Kada
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
          CUSTOMER REVIEWS — dark bg, paginated carousel
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
              <Label>Testimonials</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Our Customers{" "}
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
                  Are Saying
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Frequently Asked Questions</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Got{" "}
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
              Shop Gold Plated Kada for Men
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
            is rooted in tradition yet styled for today. Browse our golden kada
            and 1 gram gold kada for men collection today and find the perfect
            piece that speaks to your style and tradition.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/collections/kada-for-men"
              className="inline-flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:gap-3 hover:opacity-90"
              style={{
                background:
                  "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                color: "var(--rj-charcoal, #1a1a1a)",
                fontWeight: 700,
                boxShadow: "0 4px 24px rgba(252,193,81,0.3)",
              }}
            >
              Browse Kadas <ChevronRight size={13} />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:opacity-70"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
              }}
            >
              All Collections
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
