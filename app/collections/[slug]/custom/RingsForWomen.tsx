// app/collections/rings-for-women/component/RingsForWomen.tsx
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
  Gift,
  Sparkles,
  Maximize2,
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

interface StyleTip {
  context: string;
  desc: string;
  dark: boolean;
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
      style={{ color: light ? "rgba(252,193,81,0.7)" : "var(--rj-gold)" }}
    >
      ✦ {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "Free", label: "Size Adjustment" },
  { value: "50K+", label: "Happy Customers" },
  { value: "Anti-Tarnish", label: "Coating" },
  { value: "Skin", label: "Friendly & Safe" },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Every ring carries a rich, warm gold finish that looks genuinely luxurious the kind that makes people pause and ask where you got it from.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "A protective anti-tarnish finish keeps the colour and shine intact through regular wear, daily activities, and the beautiful unpredictability of everyday life.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Friendly & Safe",
    desc: "Crafted with skin-safe base metals and a smooth gold plated finish, gentle on all skin types and designed for comfortable long-term wear.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Lightweight Comfort",
    desc: "Despite their beautiful and intricate designs, our rings are lightweight and comfortable enough to wear from morning to night without any discomfort.",
  },
  {
    icon: <Maximize2 size={18} />,
    title: "Affordable Luxury",
    desc: "The look and feel of fine gold jewellery at a price that makes complete sense that is what every ring at Rehnoor Jewels promises to deliver.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "The Everyday Statement",
    desc: "A slim, minimal gold plated ring worn on its own with a casual outfit quiet, personal, and effortlessly elegant from morning to evening.",
    dark: true,
    num: "01",
  },
  {
    context: "The Stacked Look",
    desc: "Wear multiple rings across different fingers, mix delicate bands with bolder designs for a curated, fashion-forward hand look that is entirely your own.",
    dark: false,
    num: "02",
  },
  {
    context: "The Festive Hand",
    desc: "Pair a bold, ornate gold plated ring with a silk saree or lehenga for a festive look that is traditional, rich, and completely beautiful from every angle.",
    dark: false,
    num: "03",
  },
  {
    context: "The Office Edge",
    desc: "A sleek gold plated ring worn with a formal outfit adds a subtle personal touch to your professional look confident, polished, and quietly stylish.",
    dark: true,
    num: "04",
  },
];

const CARE_HABITS = [
  {
    icon: <Sun size={15} />,
    tip: "Gently wipe your ring with a soft, dry cloth after every wear to remove moisture, oils, or dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe carefully, and dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your gold plated ring in a dry, airtight jewellery pouch or box to protect it from humidity and air exposure.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Remove your ring before bathing, washing hands, swimming, or applying perfumes and skincare products.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Keep your ring separate from other metal jewellery to prevent scratching on the gold plated surface.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "Are gold plated rings for women suitable for daily wear?",
    a: "Yes! Our rings for women are lightweight, comfortable, and crafted for everyday use. With proper care keeping them away from water, sweat, and perfumes. they retain their beautiful gold finish for a long time.",
  },
  {
    q: "Do your rings come with free size adjustment?",
    a: "Absolutely! Every gold plated ring for women at Rehnoor Jewels comes with free size adjustment to ensure you always get the perfect, comfortable fit.",
  },
  {
    q: "Are your rings safe for sensitive skin?",
    a: "Yes! Our rings are crafted with skin-friendly base metals and a smooth gold plated finish that is gentle on most skin types. If you have a known metal allergy, we recommend consulting a specialist before purchase.",
  },
  {
    q: "How long does a gold plated ring last?",
    a: "With regular care, a gold plated ring for women from Rehnoor Jewels can last 1 to 2 years or more, thanks to our premium anti-tarnish coating and quality gold plating.",
  },
  {
    q: "Can I gift a ring from Rehnoor Jewels?",
    a: "Absolutely! Our rings for women make for one of the most personal and thoughtful gifts for birthdays, anniversaries, Rakhi, and more. Every piece arrives beautifully packaged and ready to gift.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered a ring from Rehnoor Jewels and it is honestly the piece I get the most compliments on. The gold finish is so warm and rich, nobody believes it is not solid gold. Absolutely love it!",
  },
  {
    name: "Sneha Patel",
    city: "Mumbai",
    text: "Been wearing my ring every single day for months and the finish is still as beautiful as day one. The anti-tarnish coating is no joke, it genuinely works. Rehnoor Jewels has a loyal customer in me!",
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    text: "The ring I ordered is so elegant and perfectly finished. Pairs beautifully with every outfit ethnic, western, casual, formal. It just works with everything. Such a versatile and beautiful piece!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "Gifted a ring from Rehnoor Jewels to my best friend on her birthday and she was genuinely surprised by the quality. She thought it was far more expensive than it was. That says everything about Rehnoor Jewels!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "The stacked ring look I created using pieces from Rehnoor Jewels gets me so many compliments. The gold finish on each ring is so consistent and warm. I am obsessed with my collection!",
  },
  {
    name: "Kavita Joshi",
    city: "Pune",
    text: "I ordered a ring for a family wedding and it looked absolutely stunning with my lehenga. The finish is so rich and the detailing is so precise. Rehnoor Jewels truly delivers on quality and style!",
  },
  {
    name: "Simran Kaur",
    city: "Chandigarh",
    text: "My mother gifted me a ring from Rehnoor Jewels for Diwali and I have worn it every single day since. It is so comfortable, so elegant, and the gold finish is just gorgeous. A truly wonderful gift!",
  },
  {
    name: "Ishita Bose",
    city: "Kolkata",
    text: "Ordered two rings from Rehnoor Jewels, one for myself and one as a Rakhi gift for my sister. Both of us are absolutely in love with our pieces. The quality is outstanding and the price is unbeatable!",
  },
];

const GIFT_OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Diwali",
  "Wedding",
  "Festivals",
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
          aria-label="Previous"
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
          aria-label="Next"
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
export default function RingsForWomen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          A RING FOR EVERY VERSION OF YOU — ivory bg
          Unique: editorial prose layout — no bullet lists
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left — prose editorial */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>The Story Behind Each Ring</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  A Ring for Every{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Version of You
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
                There is something uniquely personal about a ring. Unlike any
                other piece of jewellery, a ring is always visible to you and to
                everyone around you. It sits on your hand through every
                handshake, every gesture, and every quiet moment of your day.
                Which is exactly why choosing the right one matters.
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
                At Rehnoor Jewels, our{" "}
                <strong
                  style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                >
                  gold plated rings for women
                </strong>{" "}
                are designed with that personal significance in mind. Whether
                you are drawn to something delicate and minimal for everyday
                wear, something bold and ornate for a festive occasion, or
                something deeply meaningful like an initial or symbol ring our
                collection is built to offer every woman a ring that feels like
                it was made specifically for her.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="leading-relaxed"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.95",
                }}
              >
                Each ring in our collection is finished with premium quality
                gold plating, protected with an anti-tarnish coating, and
                crafted with skin-friendly materials because a ring you wear
                every day deserves to be made with the highest care and the
                finest attention to detail.
              </motion.p>
            </div>

            {/* Right — editorial pull-quote cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  quote:
                    "Unlike any other jewellery, a ring is always visible to you and to the world.",
                  attr: "The ring that sits on your hand through every moment.",
                },
                {
                  quote:
                    "Whether delicate and minimal or bold and ornate, the right ring feels like it was made specifically for you.",
                  attr: "Our promise with every piece.",
                },
                {
                  quote:
                    "Gold plated. Anti-tarnish. Skin-safe. Crafted for everyday wear without compromise.",
                  attr: "What every Rehnoor Jewels ring delivers.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.25}
                  className="p-6 rounded-2xl relative overflow-hidden"
                  style={{
                    background:
                      i === 1
                        ? "var(--rj-charcoal)"
                        : i === 0
                          ? "rgba(0,55,32,0.06)"
                          : "rgba(252,193,81,0.07)",
                    border:
                      i === 1
                        ? "none"
                        : i === 0
                          ? "1px solid rgba(0,55,32,0.12)"
                          : "1px solid rgba(252,193,81,0.2)",
                  }}
                >
                  <Quote
                    size={20}
                    className="mb-3 opacity-40"
                    style={{
                      color: i === 1 ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  />
                  <p
                    className="font-cormorant leading-snug mb-3"
                    style={{
                      fontSize: "clamp(1rem,2vw,1.15rem)",
                      fontStyle: "italic",
                      color: i === 1 ? "#fff" : "var(--rj-charcoal)",
                      fontWeight: 500,
                    }}
                  >
                    {card.quote}
                  </p>
                  <p
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{
                      color:
                        i === 1 ? "rgba(255,255,255,0.3)" : "var(--rj-ash)",
                    }}
                  >
                    {card.attr}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT MAKES IT SPECIAL — dark bg
          Unique: prose intro + 5-feature grid
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
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>What Sets Us Apart</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Plated Rings for Women{" "}
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
                  Truly Special
                </em>
              </h2>
              {/* Prose intro — unique editorial touch */}
              <motion.p
                variants={fadeUp}
                custom={1}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.95rem",
                }}
              >
                We believe that what makes a piece of jewellery worth wearing
                every day goes far beyond how it looks. Here is what sets our
                rings for women apart.
              </motion.p>
            </motion.div>
          </div>

          {/* 3 + 2 layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {SPECIAL_FEATURES.slice(0, 3).map((feat, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {SPECIAL_FEATURES.slice(3).map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                custom={(i + 3) * 0.1}
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
          WHY REHNOOR — emerald bg, editorial prose layout
          Unique: long-form prose rather than bullet points
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Left heading */}
            <div className="lg:sticky lg:top-28">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Why Choose Us</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-5"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Rehnoor Jewels Is the Right Choice for Your{" "}
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
                    Next Ring
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
                  Choosing where to buy a ring is as personal as choosing the
                  ring itself.
                </p>
              </motion.div>
            </div>

            {/* Right — editorial prose blocks */}
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: <BadgeCheck size={16} />,
                  title: "Crafted with Care, Delivered with Pride",
                  body: "At Rehnoor Jewels, we do not just make rings we craft experiences. Every gold plated ring for women in our collection goes through careful quality checks to ensure that what reaches you is flawless in finish, precise in detail, and exactly as beautiful as it appeared on our page.",
                },
                {
                  icon: <Heart size={16} />,
                  title: "Honest About What We Offer",
                  body: "We are also a brand that believes in honesty. Our rings for women are gold plated, not solid gold, and we are upfront about that. What we promise is premium quality plating, expert craftsmanship, and a finish that genuinely rivals the real thing at a price that every woman deserves access to.",
                },
                {
                  icon: <Truck size={16} />,
                  title: "Curated for Every Woman, Delivered Across India",
                  body: "From intricate festive pieces to clean everyday designs, our collection is thoughtfully curated to serve every taste, every occasion, and every budget with pan-India delivery that brings your favourite ring safely to your doorstep.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i * 0.18}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(252,193,81,0.15)",
                        color: "var(--rj-gold)",
                        border: "1px solid rgba(252,193,81,0.25)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className="font-cinzel text-[11px] tracking-wider font-bold"
                      style={{ color: "#fff" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.52)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      lineHeight: "1.85",
                    }}
                  >
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          STYLING IDEAS — ivory bg
          Unique: 2×2 grid with evocative named looks
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Wear It Your Way</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Styling Ideas for{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Every Occasion
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STYLE_TIPS.map((tip, i) => (
              <motion.div
                key={tip.context}
                variants={fadeUp}
                custom={i * 0.15}
                className="relative p-7 sm:p-8 rounded-2xl overflow-hidden"
                style={{
                  background: tip.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !tip.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                {/* Large watermark number */}
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "6rem",
                    lineHeight: 1,
                    color: tip.dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,55,32,0.04)",
                  }}
                >
                  {tip.num}
                </span>

                {/* Evocative name badge */}
                <span
                  className="font-cormorant italic font-light text-lg block mb-3 relative z-10"
                  style={{
                    color: tip.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {tip.context}
                </span>

                <p
                  className="leading-relaxed text-sm relative z-10"
                  style={{
                    color: tip.dark
                      ? "rgba(255,255,255,0.65)"
                      : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  {tip.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          PERFECT GIFT — dark card on ivory
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
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                The Most Personal Gift You Can Give,{" "}
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
                  A Ring
                </em>
              </h2>
              <p
                className="leading-relaxed mb-4"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                }}
              >
                Our rings for women make for one of the most personal and
                thoughtful gifts for any occasion. Whether it is a birthday,
                anniversary, Rakhi, or Diwali every ring arrives beautifully
                packaged and ready to gift, because first impressions matter as
                much as what is inside the box.
              </p>
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
          CARE HABITS — ivory bg, 5 items
          Unique: 5-card layout (3+2), richer tips
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Care & Maintenance</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Simple Care Habits for{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Lasting Shine
                </em>
              </h2>
            </motion.div>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {CARE_HABITS.slice(0, 3).map((tip, i) => (
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
          {/* Bottom 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {CARE_HABITS.slice(3).map((tip, i) => (
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
          CUSTOMER REVIEWS — dark bg
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
              <Label light>Real Women, Real Stories</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Here Is What Our{" "}
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
                  Customers Say
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
          CTA FOOTER — dark bg, editorial closing
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
            <Label light>Find Your Ring</Label>
            <h2
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Shop Rings for Women
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

          {/* Closing editorial quote — unique to women's collection */}
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
            The right ring does not just sit on your finger, it says something
            about who you are.
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
            At Rehnoor Jewels, our gold plated rings for women are crafted for
            every woman who deserves to wear something beautiful, meaningful,
            and made with genuine care. Browse our rings for women collection
            today and find the one that was made for your hand, your story, and
            your style.
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
              Browse Colections <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
