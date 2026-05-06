// app/collections/necklaces-for-women/component/NecklaceForWomen.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Star,
  Truck,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Gem,
  Sun,
  Droplets,
  Heart,
  Quote,
  Sparkles,
  Wind,
  Layers,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
interface ReviewItem {
  name: string;
  city: string;
  text: string;
}

interface CollectionStyle {
  name: string;
  desc: string;
  tag: string;
  icon: string;
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
const HERO_STATS = [
  { value: "5+", label: "Necklace Styles" },
  { value: "Anti-Tarnish", label: "Coating" },
  { value: "Skin-Safe", label: "Materials" },
  { value: "50K+", label: "Happy Customers" },
];

const COLLECTION_STYLES: CollectionStyle[] = [
  {
    name: "Choker Necklaces",
    desc: "Fitted, bold, and timelessly beautiful. Our gold plated chokers for women sit close to the neck and add an instant touch of royalty to any outfit ethnic or contemporary.",
    tag: "Bold",
    icon: "◎",
  },
  {
    name: "Layered Necklaces",
    desc: "Effortlessly stylish and endlessly versatile, our layered gold plated necklaces for women give you a curated, fashion-forward look without the effort of styling multiple pieces separately.",
    tag: "Versatile",
    icon: "≡",
  },
  {
    name: "Kundan Necklaces",
    desc: "A celebration of traditional Indian craftsmanship, our kundan necklaces for women feature intricate stone settings and a regal finish that is fit for every special occasion.",
    tag: "Traditional",
    icon: "◈",
  },
  {
    name: "Long Necklaces",
    desc: "Elegant, dramatic, and versatile. our long gold plated necklaces can be worn as a single statement piece or layered with shorter necklaces for a rich, bohemian look.",
    tag: "Statement",
    icon: "⬟",
  },
  {
    name: "Bridal Necklace Sets",
    desc: "Crafted for the most special day of your life, our bridal gold plated necklace sets are rich in finish, bold in design, and built to make every bride feel like royalty.",
    tag: "Bridal",
    icon: "♛",
  },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Every necklace is finished with high-quality gold plating that gives it the rich, warm glow of real gold without the heavy price tag.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Protection",
    desc: "A protective anti-tarnish coating preserves the shine and colour through regular wear and everyday exposure.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Safe Materials",
    desc: "Crafted with skin-friendly base metals and a smooth gold plated finish, gentle on all skin types.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Wearable",
    desc: "Despite their bold and intricate designs, our gold plated necklaces are lightweight and comfortable enough for all-day wear.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the look and feel of fine gold jewellery at a fraction of the cost because at Rehnoor Jewels, luxury is for everyone.",
  },
  {
    icon: <Layers size={18} />,
    title: "Occasion Ready",
    desc: "Whether it is a Monday morning at work or a Saturday wedding, our collection has a gold plated necklace for every moment and every mood.",
  },
];

const WHY_ITEMS: WhyItem[] = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Crafted with Care",
    desc: "Every necklace at Rehnoor Jewels is made with attention to detail from the quality of the base metal to the precision of the gold plating and the strength of the clasp.",
  },
  {
    icon: <Sparkles size={16} />,
    title: "Designs That Inspire",
    desc: "Our designers draw inspiration from Indian tradition, global trends, and everyday elegance to create necklaces that feel fresh, beautiful, and timeless all at once.",
  },
  {
    icon: <Gem size={16} />,
    title: "Honest Pricing",
    desc: "No hidden costs, no inflated prices. What you see is what you get - premium quality gold plated necklaces at prices that make complete sense.",
  },
  {
    icon: <Truck size={16} />,
    title: "Safe & Speedy Delivery",
    desc: "We deliver pan-India with careful packaging to ensure your necklace arrives in perfect condition, ready to wear or gift.",
  },
  {
    icon: <Heart size={16} />,
    title: "A Brand You Can Trust",
    desc: "At Rehnoor Jewels, every piece we make reflects our commitment to quality, style, and customer satisfaction. Your trust means everything to us.",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "After every wear, gently wipe your gold plated necklace with a soft, dry cloth to remove moisture, sweat, or dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "When a deeper clean is needed, use a soft cloth dampened with mild soapy lukewarm water, wipe gently, and dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Always store your gold plated necklace in a dry, airtight jewellery pouch or box to protect it from humidity and air exposure.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Remove your necklace before bathing, swimming, exercising, or applying perfumes and lotions to preserve the gold plating for longer.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Avoid layering your necklace with other metal jewellery that could cause scratching or friction on the gold plated surface.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What are gold plated necklaces?",
    a: "Gold plated necklaces are necklaces crafted from a base metal such as brass or copper and electroplated with a layer of real gold, giving them the rich, warm appearance of solid gold jewellery at a fraction of the cost.",
  },
  {
    q: "Are gold plated necklaces suitable for daily wear?",
    a: "Yes! Our gold plated necklaces are lightweight, comfortable, and designed to hold up well with regular everyday wear. With proper care and mindful use, they retain their shine and finish for a long time.",
  },
  {
    q: "Are your necklaces safe for sensitive skin?",
    a: "Our gold plated necklaces are crafted with skin-friendly base metals and a smooth gold plated finish that is gentle on most skin types. If you have a known metal sensitivity, we recommend consulting a specialist before purchase.",
  },
  {
    q: "How do I clean my gold plated necklace?",
    a: "Wipe it gently with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe carefully, and dry completely before storing in an airtight pouch.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered a kundan necklace from Rehnoor Jewels for a family wedding and honestly it was the best decision I made. The finish is so rich and detailed, everyone kept asking if it was real gold. Absolutely in love with it!",
  },
  {
    name: "Sneha Patel",
    city: "Mumbai",
    text: "Been wearing my pendant necklace from Rehnoor Jewels every single day for months and it still looks as beautiful as the day it arrived. The anti-tarnish coating genuinely works. I highly recommend it!",
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    text: "The necklace I ordered for Navratri was absolutely stunning. The detailing is so precise and the gold finish is so warm and rich. Paired it with my silk saree and received compliments all evening!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "Finally found a jewellery brand that delivers exactly what it promises. My layered necklace from Rehnoor Jewels looks so premium and stylish, nobody believes I did not spend a fortune on it!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "Ordered the choker necklace set as a gift for my sister's birthday and she was absolutely thrilled. The packaging was so elegant and the necklace looked stunning. She has barely taken it off since!",
  },
  {
    name: "Deepika Nair",
    city: "Kochi",
    text: "The bridal necklace set I ordered for my cousin's wedding was breathtaking. Bold, rich, and so beautifully crafted. She felt like royalty wearing it and the photographs looked incredible!",
  },
  {
    name: "Pooja Mishra",
    city: "Lucknow",
    text: "I was a little hesitant to buy jewellery online but Rehnoor Jewels completely changed my mind. The quality is outstanding, the delivery was fast, and the necklace looked even better in person than in the photos!",
  },
  {
    name: "Kajal Sharma",
    city: "Chandigarh",
    text: "The geometric necklace I ordered is such a unique and modern piece. Pairs beautifully with both western and ethnic outfits. The gold finish is smooth, warm, and absolutely gorgeous!",
  },
  {
    name: "Sunita Verma",
    city: "Pune",
    text: "Gifted a pendant necklace to my daughter on her graduation and she cried happy tears! The packaging was beautiful and the necklace was so elegant and personal. Rehnoor Jewels made the moment extra special!",
  },
  {
    name: "Naina Gupta",
    city: "Surat",
    text: "The long necklace I ordered from Rehnoor Jewels is everything I wanted — dramatic, elegant, and so versatile. I have styled it three different ways already and it looks stunning every single time!",
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
      custom={index * 0.4}
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
export default function NecklaceForWomen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO — charcoal bg
          Unique: "first thing people notice" editorial
          framing, necklace as the centrepiece accessory
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
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 80% 80%, rgba(252,193,81,0.03) 0%, transparent 65%)",
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
          <div className="max-w-5xl mx-auto text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Rehnoor Jewels</Label>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(2.2rem,6vw,4.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Gold Plated Necklaces{" "}
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
            </motion.h2>

            {/* Unique: editorial subtitle about necklace as statement piece */}
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
              Where Tradition Meets Modern Elegance
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
              A necklace has always been more than an accessory. It is the first
              thing people notice, the last thing you take off, and the piece
              that ties every outfit together. Our gold plated necklaces for
              women are designed with that understanding each piece crafted to
              feel as beautiful as it looks, whether you are heading to the
              office, a family gathering, or a grand festive celebration.
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
              At Rehnoor Jewels, we believe that luxury should never be limited
              by a price tag.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10"
            >
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeIn}
                  custom={i}
                  className="flex flex-col items-center gap-1 py-4 px-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(252,193,81,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span
                    className="font-cinzel font-bold"
                    style={{
                      fontSize: "clamp(0.85rem,1.8vw,1.1rem)",
                      background:
                        "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase text-center"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          THE REHNOOR COLLECTION — ivory bg
          Unique: editorial intro + 5-style showcase
          Each style gets its own card in a staggered
          large+small mixed grid
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>The Rehnoor Collection</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Gold Plated Necklaces That{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Tell a Story
                </em>
              </h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="max-w-xl mx-auto"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.95rem",
                }}
              >
                Our collection is built around one simple idea, every piece
                should have a story worth telling.
              </motion.p>
            </motion.div>
          </div>

          {/* Unique layout: 1 large hero card + 4 in 2×2 */}
          {/* Hero style — Bridal Necklace Sets as the lead */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative p-8 sm:p-10 rounded-3xl overflow-hidden mb-4"
            style={{
              background: "var(--rj-charcoal)",
              border: "1px solid rgba(252,193,81,0.2)",
              minHeight: 180,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 0% 50%, rgba(252,193,81,0.07) 0%, transparent 65%)",
              }}
            />
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" style={{ color: "var(--rj-gold)" }}>
                  {COLLECTION_STYLES[4].icon}
                </span>
                <span
                  className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(252,193,81,0.12)",
                    color: "var(--rj-gold)",
                    border: "1px solid rgba(252,193,81,0.2)",
                  }}
                >
                  {COLLECTION_STYLES[4].tag}
                </span>
              </div>
              <h3
                className="font-cormorant font-light text-2xl sm:text-3xl mb-3 leading-tight"
                style={{ color: "#fff" }}
              >
                {COLLECTION_STYLES[4].name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.8",
                }}
              >
                {COLLECTION_STYLES[4].desc}
              </p>
            </div>
            <div
              className="absolute top-6 right-8 font-cormorant font-light text-8xl select-none pointer-events-none"
              style={{ color: "rgba(252,193,81,0.07)", lineHeight: 1 }}
            >
              {COLLECTION_STYLES[4].icon}
            </div>
          </motion.div>

          {/* 2×2 remaining styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COLLECTION_STYLES.slice(0, 4).map((style, i) => (
              <motion.div
                key={style.name}
                variants={fadeUp}
                custom={i * 0.12}
                className="group flex items-start gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                  borderColor: "rgba(252,193,81,0.4)",
                }}
              >
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-xl"
                  style={{
                    background: "rgba(0,55,32,0.07)",
                    color: "var(--rj-emerald)",
                    border: "1px solid rgba(0,55,32,0.12)",
                  }}
                >
                  {style.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3
                      className="font-cinzel text-sm tracking-wider font-bold"
                      style={{ color: "var(--rj-charcoal)" }}
                    >
                      {style.name}
                    </h3>
                    <span
                      className="font-cinzel text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(0,55,32,0.08)",
                        color: "var(--rj-emerald)",
                        border: "1px solid rgba(0,55,32,0.12)",
                      }}
                    >
                      {style.tag}
                    </span>
                  </div>
                  <p
                    className="leading-relaxed text-sm"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      lineHeight: "1.75",
                    }}
                  >
                    {style.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHY STAND APART — dark bg, 3+3 grid
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
              <Label light>Our Difference</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Why Our Gold Plated Necklaces{" "}
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
                  Stand Apart
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
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Why Rehnoor Jewels</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Thousands of Women Choose{" "}
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
                    Rehnoor Jewels
                  </em>
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                    fontSize: "0.92rem",
                  }}
                >
                  There are many places to buy gold plated necklaces online.
                  Here is why we stand apart.
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-4">
              {WHY_ITEMS.map((item, i) => (
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
          DURABILITY — ivory bg, editorial prose + visual
          Unique: honest prose durability explanation
          inside a styled card, not bullet list
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-10"
            >
              <Label>The Honest Truth</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                How Long Do Gold Plated{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Necklaces Last?
                </em>
              </h2>
            </motion.div>

            {/* Editorial prose card — unique to necklaces page */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="p-8 sm:p-10 rounded-3xl relative overflow-hidden mb-8"
              style={{
                background: "var(--rj-charcoal)",
                border: "1px solid rgba(252,193,81,0.18)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(252,193,81,0.06) 0%, transparent 65%)",
                }}
              />
              <div className="relative z-10">
                <p
                  className="font-cormorant italic text-lg leading-relaxed mb-5"
                  style={{
                    color: "rgba(252,193,81,0.7)",
                    fontSize: "clamp(1rem,2.5vw,1.2rem)",
                  }}
                >
                  A question we hear often and one we are always happy to answer
                  honestly.
                </p>
                <p
                  className="leading-relaxed mb-4"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                    fontSize: "0.95rem",
                  }}
                >
                  With our premium anti-tarnish coating and high-quality gold
                  plating, a Rehnoor gold plated necklace for women can retain
                  its shine and colour for{" "}
                  <span style={{ color: "var(--rj-gold)", fontWeight: 600 }}>
                    1 to 2 years or even longer
                  </span>{" "}
                  with proper care. The key factors that affect longevity
                  include exposure to sweat, water, perfumes, and how frequently
                  the piece is worn.
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                    fontSize: "0.92rem",
                  }}
                >
                  The good news is that with just a little mindful care removing
                  it before bathing, storing it properly, and wiping it after
                  use your necklace will continue to shine beautifully for a
                  very long time.
                </p>
              </div>
            </motion.div>

            {/* Care tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {CARE_TIPS.slice(0, 3).map((tip, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.12}
                  className="p-5 rounded-2xl text-center flex flex-col items-center gap-3"
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
                  className="p-5 rounded-2xl text-center flex flex-col items-center gap-3"
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
              "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(252,193,81,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="container-rj relative z-10">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Customer Love</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
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
          CTA FOOTER — dark bg
          Unique: "add a little gold to your story" closing
          matches editorial voice of the source doc
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
            <Label light>Shop Now</Label>
            <h2
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Shop Gold Plated Necklaces for Women
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

          {/* Unique closing quote */}
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
            Your perfect necklace is just a click away.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={1.5}
            className="max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.9rem,2vw,1.05rem)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              lineHeight: "1.85",
            }}
          >
            Whether you are drawn to the timeless grandeur of a choker necklace,
            the effortless charm of a layered design, or the personal touch of a
            pendant, our gold plated necklaces for women collection has
            something that was made for you. Shop today and let Rehnoor Jewels
            add a little gold to your story.
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
              Browse Collection <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
