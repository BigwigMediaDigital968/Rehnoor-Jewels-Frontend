// app/collections/rings-for-men/component/RingsForMen.tsx
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

interface RingStyle {
  name: string;
  desc: string;
  tag: string;
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
  { value: "5+", label: "Ring Styles" },
  { value: "50K+", label: "Happy Customers" },
  { value: "Free", label: "Size Adjustment" },
  { value: "1 Gram", label: "Gold Polish" },
];

const RING_STYLES: RingStyle[] = [
  {
    name: "Plain Band Ring",
    desc: "A sleek, minimal, and timeless design that pairs effortlessly with any outfit. Perfect for men who prefer understated elegance in their daily wear.",
    tag: "Everyday",
  },
  {
    name: "Stone Studded Ring",
    desc: "Bold and eye-catching, our stone studded 1 gram gold rings are perfect for festive occasions and special events.",
    tag: "Festive",
  },
  {
    name: "Ad Ring",
    desc: "Our stunning ad rings feature intricate traditional designs inspired by antique jewellery, making them a perfect choice for ethnic and festive occasions.",
    tag: "Traditional",
  },
  {
    name: "Signet Ring",
    desc: "A classic and timeless style, our gold plated signet rings for men feature a flat top surface that can be engraved or left plain for a bold, confident look.",
    tag: "Classic",
  },
  {
    name: "Broad Band Ring",
    desc: "Wide, bold, and striking, our broad band gold plated rings make a strong style statement for weddings and festive occasions.",
    tag: "Statement",
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
    desc: "Every ring comes with a protective anti-tarnish finish that keeps it looking fresh and radiant with regular use.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Comfortable",
    desc: "Designed for all-day wear — lightweight, smooth, and comfortable on the finger.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the bold, rich look of gold rings for men at a price that suits every budget.",
  },
  {
    icon: <Layers size={18} />,
    title: "Wide Range of Designs",
    desc: "From plain and minimal to bold and ornate — a ring for every man and every occasion.",
  },
];

const WHY_REHNOOR: WhyItem[] = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Trusted Quality",
    desc: "Every 1 gram gold ring at Rehnoor Jewels goes through strict quality checks to ensure a flawless finish and lasting shine.",
  },
  {
    icon: <Star size={16} />,
    title: "Affordable Pricing",
    desc: "We bring you the finest gold plated rings at prices that are easy on the pocket without compromising on craftsmanship.",
  },
  {
    icon: <Layers size={16} />,
    title: "Wide Collection",
    desc: "From classic plain bands to bold ad rings, our collection has something for every taste, style, and budget.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver your favourite gold plated rings safely and securely to your doorstep, anywhere across India.",
  },
  {
    icon: <RefreshCw size={16} />,
    title: "Customer First Approach",
    desc: "At Rehnoor Jewels, your satisfaction is our priority. We are always here to help you find the perfect ring.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "Casual Look",
    tip: "Wear a simple plain band or minimal 1 gram gold ring with a plain tee and jeans for an effortlessly stylish everyday look.",
    num: "01",
  },
  {
    context: "Festive & Traditional",
    tip: "Pair a bold ad ring or stone studded gold plated ring with a kurta or sherwani to complete your traditional festive look.",
    num: "02",
  },
  {
    context: "Formal Style",
    tip: "A sleek signet or plain band ring adds a subtle yet confident touch to any formal or business outfit.",
    num: "03",
  },
  {
    context: "Stacked Look",
    tip: "Mix and match different styles from our gold plated rings collection and wear them across fingers for a bold, trendy stacked look.",
    num: "04",
  },
  {
    context: "Fusion Look",
    tip: "Combine your gold plated ring with a watch and bracelet for a complete and stylish wrist and hand accessory look.",
    num: "05",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your ring with a soft, dry cloth after every use to remove sweat and dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth with mild soapy lukewarm water. Dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your 1 gram gold ring in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Keep away from perfumes, harsh chemicals, and prolonged water exposure to maintain shine and finish.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What are gold plated rings?",
    a: "Gold plated rings for men are rings made from a base metal electroplated with a layer of real gold, offering the rich and luxurious look of solid gold at a very affordable price.",
  },
  {
    q: "What is an ad ring?",
    a: "An ad ring is a type of traditional ring featuring intricate designs inspired by antique jewellery. At Rehnoor Jewels, our ad rings are gold plated and crafted with detailed patterns, making them perfect for ethnic and festive occasions.",
  },
  {
    q: "Are 1 gram gold rings for men suitable for daily wear?",
    a: "Yes! Our 1 gram gold rings for men are lightweight, comfortable, and designed for everyday use. With proper care, they hold up well with regular wear and retain their shine for a long time.",
  },
  {
    q: "How long do gold plated rings for men last?",
    a: "With regular care, a gold plated ring for men from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating.",
  },
  {
    q: "Do you offer free size adjustment on rings?",
    a: "Yes! All our gold plated rings for men come with free size adjustment so you always get the perfect and comfortable fit.",
  },
  {
    q: "How do I clean my gold plated ring?",
    a: "Simply wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, then dry completely before storing.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Rohit Sharma",
    city: "Delhi",
    text: "I ordered a gold plated ring from Rehnoor Jewels and I am absolutely blown away by the quality. The finish is so smooth and rich, it looks just like a real gold ring. Totally worth every rupee!",
  },
  {
    name: "Arjun Mehta",
    city: "Mumbai",
    text: "Been wearing my ring from Rehnoor Jewels every day for the past 2 months and there is no fading at all. The anti-tarnish coating really works! Great quality at a very reasonable price.",
  },
  {
    name: "Karan Singh",
    city: "Jaipur",
    text: "Finally found a ring that looks expensive without being expensive! The finishing is flawless and it pairs perfectly with both ethnic and casual outfits. Highly recommend Rehnoor Jewels!",
  },
  // {
  //   name: "Vikram Patel",
  //   city: "Surat",
  //   text: "Ordered the ad ring from Rehnoor Jewels for a wedding function and received so many compliments! The design is intricate and the gold finish is absolutely stunning. Will definitely order again!",
  // },
  // {
  //   name: "Aditya Nair",
  //   city: "Bangalore",
  //   text: "The stone studded ring I ordered from Rehnoor Jewels is exactly what I was looking for. Bold, eye-catching, and looks amazing with my festive outfits. The quality is top class!",
  // },
  // {
  //   name: "Siddharth Joshi",
  //   city: "Hyderabad",
  //   text: "I have tried rings from many brands before but Rehnoor Jewels is on a completely different level. The ring sits perfectly on the finger, looks great with every outfit, and has held up really well with daily use!",
  // },
  // {
  //   name: "Manish Gupta",
  //   city: "Lucknow",
  //   text: "The ring I ordered from Rehnoor Jewels exceeded all my expectations. Great quality, fast delivery, and the finish is absolutely flawless. Could not have asked for more at this price!",
  // },
  {
    name: "Deepak Rawat",
    city: "Chandigarh",
    text: "Wore my ring to a family function last week and everyone loved it! Nobody could believe it was not solid gold. Rehnoor Jewels truly delivers on quality and style!",
  },
  {
    name: "Nikhil Kapoor",
    city: "Pune",
    text: "Ordered two rings from Rehnoor Jewels, one for myself and one as a gift for my friend. Both of us are extremely happy with the purchase. The designs are trendy and the quality is unbeatable!",
  },
  {
    name: "Harish Dubey",
    city: "Nagpur",
    text: "The ring I ordered looks exactly like the pictures on the website. The shine is incredible and it still looks brand new after weeks of daily wear. Rehnoor Jewels has earned a loyal customer!",
  },
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I gifted a ring from Rehnoor Jewels to my husband on our anniversary and he absolutely loved it! It looks so premium and elegant on his finger. He gets compliments every time he wears it. So happy with my purchase!",
  },
  {
    name: "Neha Gupta",
    city: "Mumbai",
    text: "Was looking for a thoughtful birthday gift for my brother and came across Rehnoor Jewels. I ordered a ring for him and he loved it! It arrived beautifully packed and looked stunning. I will definitely be ordering more pieces soon!",
  },
];

const GIFT_OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Diwali",
  "Wedding",
  "Special Occasions",
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
export default function RingsForMen() {
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
              Gold Plated Rings{" "}
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
              Explore our exclusive collection of gold plated rings for men,
              crafted for those who believe every detail matters. Each piece is
              designed to give you the bold, luxurious look of gold at an
              affordable price, making it perfect for daily wear, festive
              celebrations, and special occasions.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT ARE GOLD PLATED RINGS? — ivory bg
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
                  What are Gold Plated
                  <br />
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Rings for Men?
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
                Gold plated rings are crafted from a base metal such as brass or
                copper, electroplated with a layer of real gold, giving them the
                rich and luxurious appearance of solid gold at a fraction of the
                cost.
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
                  1 gram gold rings for men
                </strong>{" "}
                are designed with precision, finished to perfection, and built
                to complement every style — from bold statement looks to subtle
                everyday elegance. Whether you are looking for a simple ad ring
                for daily wear or a designer piece for a special occasion, we
                have the perfect ring for you.
              </motion.p>
            </div>

            {/* Right — decorative 2×2 card grid */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-2 gap-3"
            >
              {[
                {
                  label: "5 Unique Styles",
                  sub: "For every occasion",
                  icon: <Gem size={22} />,
                },
                {
                  label: "Free Size Adjust",
                  sub: "Perfect fit always",
                  icon: <Maximize2 size={22} />,
                },
                {
                  label: "Lasting Shine",
                  sub: "Anti-tarnish finish",
                  icon: <Sun size={22} />,
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
          TOP RING STYLES — dark bg
          Ring-specific: style TAG chips per card
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-emerald-dark)" }}
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
                  Gold Plated Rings
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            {RING_STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                variants={fadeUp}
                custom={i * 0.15}
                className="group flex items-center max-w-3xl mx-auto gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default"
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
                  {/* Name + occasion tag on same row */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3
                      className="font-cinzel text-sm tracking-wider font-bold"
                      style={{ color: "#fff" }}
                    >
                      {style.name}
                    </h3>
                    <span
                      className="font-cinzel text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(252,193,81,0.12)",
                        color: "var(--rj-gold)",
                        border: "1px solid rgba(252,193,81,0.2)",
                      }}
                    >
                      {style.tag}
                    </span>
                  </div>
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
              <Label>Crafted with Precision</Label>
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
                  Rings Special?
                </em>
              </h2>
            </motion.div>
          </div>

          {/* 5-card grid: 3 top + 2 bottom centered */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {SPECIAL_FEATURES.slice(0, 3).map((feat, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {SPECIAL_FEATURES.slice(3).map((feat, i) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                custom={(i + 3) * 0.1}
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
                  Why Choose Rehnoor Jewels for{" "}
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
                    Gold Plated Rings?
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
                  When it comes to buying gold plated rings online, Rehnoor
                  Jewels is a name you can trust.
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
          HOW TO STYLE — ivory bg, 3+2 grid
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
                Gold Plated Rings
              </h2>
            </motion.div>
          </div>

          {/* Top 3 */}
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

          {/* Bottom 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {STYLE_TIPS.slice(3).map((tip, i) => (
              <motion.div
                key={tip.context}
                variants={fadeUp}
                custom={(i + 3) * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: i === 0 ? "var(--rj-charcoal)" : "#fff",
                  border: i === 0 ? "none" : "1px solid var(--rj-bone)",
                }}
              >
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color:
                      i === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,55,32,0.05)",
                  }}
                >
                  {tip.num}
                </span>
                <span
                  className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                  style={{
                    background:
                      i === 0 ? "rgba(252,193,81,0.15)" : "rgba(0,55,32,0.08)",
                    color: i === 0 ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {tip.context}
                </span>
                <p
                  className="leading-relaxed text-sm relative z-10 mt-2"
                  style={{
                    color: i === 0 ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
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
          PERFECT GIFT — charcoal card on ivory
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-emerald-dark)" }}
      >
        <div className="container-rj">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
            style={{
              background: "var(--rj-emerald)",
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
                1 Gram Gold Rings for Men:{" "}
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
                Looking for a gift that is stylish, meaningful, and
                budget-friendly? A 1 gram gold ring for men from Rehnoor Jewels
                makes for a perfect gift for every occasion. Whether it is a
                birthday, anniversary, Rakhi, Diwali, or wedding, our gold
                plated rings are a thoughtful and elegant choice that any man
                would be proud to wear.
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
                straight out of the box. Give the gift of style and let Rehnoor
                Jewels make every occasion truly special.
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
                  Gold Plated Rings
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
              Shop Gold Plated Rings for Men
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
            makes him stand out. Browse our 1 gram gold rings for men and ad
            rings collection today and find the perfect piece that speaks to
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
              Browse Articles <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
