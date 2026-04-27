// app/collections/pendants-for-men/component/PendantsForMen.tsx
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
  Heart,
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

interface WhyItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface StyleTip {
  context: string;
  tip: string;
  num: string;
  dark: boolean;
}

interface FaqEntry {
  q: string;
  a: string;
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
  { value: "1 Gram", label: "Gold Polish" },
  { value: "50K+", label: "Happy Customers" },
  { value: "Free", label: "Pan-India Delivery" },
  { value: "∞", label: "Style Options" },
];

const PENDANT_STYLES = [
  {
    name: "God Locket / Religious Pendant",
    desc: "A deeply meaningful and timeless piece, our gold plated god lockets for men are designed to reflect faith and devotion while offering a premium finish for everyday wear.",
    tag: "Devotional",
  },
  {
    name: "Plain & Minimal Pendant",
    desc: "Sleek, understated, and endlessly versatile. Our plain gold plated pendants for men pair effortlessly with every outfit from casual to formal.",
    tag: "Everyday",
  },
  {
    name: "Geometric Pendant",
    desc: "Bold shapes and contemporary designs for the modern man. Our geometric pendants are crafted for those who express themselves through unique style.",
    tag: "Contemporary",
  },
  {
    name: "Oxidised Pendant",
    desc: "A striking fusion of rustic charm and modern design. Our oxidised pendants for men feature an antique finish that makes a bold, edgy style statement.",
    tag: "Statement",
  },
  {
    name: "Initial / Personalised Pendant",
    desc: "Make it uniquely yours. Our initial and personalised pendants for men are the perfect way to express identity and individuality in a meaningful piece.",
    tag: "Personalised",
  },
  {
    name: "Golden Locket",
    desc: "A classic pendant style with a rich gold finish, designed for daily or special occasion wear. Available in religious, plain, and designer varieties.",
    tag: "Classic",
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
    desc: "Every 1 gram gold pendant comes with a protective anti-tarnish finish that keeps it looking fresh and radiant.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Comfortable",
    desc: "Designed for all-day wear — lightweight and comfortable around the neck.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the rich, premium look of golden lockets and pendants at a price that suits every budget.",
  },
];

const WHY_REHNOOR: WhyItem[] = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Trusted Quality",
    desc: "Every 1 gram gold pendant at Rehnoor Jewels goes through strict quality checks to ensure a flawless finish and lasting shine.",
  },
  {
    icon: <Star size={16} />,
    title: "Affordable Pricing",
    desc: "We bring you the finest pendants for men and golden lockets at prices that are easy on the pocket without compromising on craftsmanship.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver your favourite pendants for men safely and securely to your doorstep, anywhere across India.",
  },
  {
    icon: <RefreshCw size={16} />,
    title: "Customer First Approach",
    desc: "At Rehnoor Jewels, your satisfaction is our priority. We are always here to help you find the perfect pendant or golden locket.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "Casual Look",
    tip: "Pair a simple 1 gram gold pendant or golden locket with a plain tee and jeans for an effortlessly stylish everyday look.",
    num: "01",
    dark: true,
  },
  {
    context: "Festive & Traditional",
    tip: "Wear a bold god locket or religious pendant for men over a kurta or sherwani to add a meaningful and elegant touch to your festive outfit.",
    num: "02",
    dark: false,
  },
  {
    context: "Formal Style",
    tip: "A sleek and minimal pendant for men worn under a formal shirt adds a subtle yet confident personal touch to your professional look.",
    num: "03",
    dark: false,
  },
  {
    context: "Layered Look",
    tip: "Layer two or three pendants for men of different lengths and styles for a trendy, personalised layered necklace look.",
    num: "04",
    dark: true,
  },
  {
    context: "Fusion Look",
    tip: "Combine a geometric or oxidised pendant for men with a casual western outfit for a bold and edgy indo-western style statement.",
    num: "05",
    dark: false,
  },
];

const DURABILITY_ITEMS: DurabilityItem[] = [
  {
    icon: "⏱",
    title: "With Regular Care",
    body: "A well-maintained 1 gram gold pendant can retain its shine and colour for up to 1 to 2 years or even longer.",
    highlight: true,
  },
  {
    icon: "🧪",
    title: "Key Factors",
    body: "The longevity of your golden locket or pendant depends on skin type, exposure to sweat, water, perfumes, and how frequently it is worn.",
    highlight: false,
  },
  {
    icon: "🛡",
    title: "Anti-Tarnish Advantage",
    body: "At Rehnoor Jewels, every pendant for men comes with a premium anti-tarnish coating that adds an extra layer of protection and significantly extends the life of the plating.",
    highlight: false,
  },
  {
    icon: "💡",
    title: "Pro Tip",
    body: "Remove your pendant before bathing, swimming, or exercising to keep it looking its best for longer.",
    highlight: true,
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your pendant with a soft, dry cloth after every use to remove sweat and dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth with mild soapy lukewarm water. Dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your 1 gram gold pendant or golden locket in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Keep away from perfumes, harsh chemicals, and prolonged water exposure to maintain shine and finish.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What is a 1 gram gold pendant?",
    a: "A 1 gram gold pendant is a pendant crafted from a base metal and electroplated with one gram of real gold, giving it a rich and luxurious finish at a very affordable price. Our 1 gram gold pendant collection at Rehnoor Jewels offers a wide variety of styles for every occasion.",
  },
  {
    q: "What is a golden locket?",
    a: "A golden locket is a classic pendant style with a gold finish, designed to be worn daily or on special occasions. At Rehnoor Jewels, our golden lockets for men are available in various designs including religious, plain, and designer styles.",
  },
  {
    q: "Are pendants for men suitable for daily wear?",
    a: "Yes! Our pendants for men are lightweight, comfortable, and designed for everyday use. With proper care, they hold up well with regular wear and retain their shine for a long time.",
  },
  {
    q: "How long do pendants for men last?",
    a: "With regular care, a pendant for men from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating.",
  },
  {
    q: "Do your pendants for men come with a chain?",
    a: "Select pendants in our collection come paired with a matching chain for a complete ready-to-wear look. Please check individual product descriptions for details.",
  },
  {
    q: "How do I clean my 1 gram gold pendant or golden locket?",
    a: "Simply wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, then dry completely before storing.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Rohit Verma",
    city: "Delhi",
    text: "I ordered a god locket from Rehnoor Jewels and the quality genuinely surprised me. The detailing is beautiful, the finish is smooth, and it looks absolutely premium. Totally worth every rupee!",
  },
  {
    name: "Arjun Nair",
    city: "Mumbai",
    text: "Been wearing my pendant from Rehnoor Jewels every single day and there is no fading at all even after months of use. The anti-tarnish coating really does its job. Highly recommend!",
  },
  {
    name: "Suresh Yadav",
    city: "Jaipur",
    text: "Finally found a pendant that looks expensive without the expensive price tag! The finish is flawless and it pairs perfectly with both my casual and ethnic outfits. Rehnoor Jewels never disappoints!",
  },
  {
    name: "Gaurav Mishra",
    city: "Ahmedabad",
    text: "Ordered the geometric pendant as a gift for my friend's birthday and he absolutely loved it! The packaging was neat and elegant and the pendant looked stunning. Will definitely order again!",
  },
  {
    name: "Harpreet Singh",
    city: "Chandigarh",
    text: "The religious pendant I ordered from Rehnoor Jewels is exactly what I was looking for. Meaningful, beautifully crafted, and the gold finish is absolutely stunning. Wore it to the Gurudwara and received so many compliments!",
  },
  {
    name: "Manoj Chauhan",
    city: "Pune",
    text: "I have tried pendants from many brands but Rehnoor Jewels is on a completely different level. The quality is outstanding, the designs are unique, and the price is very reasonable. Could not be happier!",
  },
  {
    name: "Siddharth Joshi",
    city: "Hyderabad",
    text: "Ordered the oxidised pendant and it is just perfect for my style. Bold, edgy, and looks great with my casual outfits. The finish has held up really well with regular wear. Absolutely love it!",
  },
  {
    name: "Vishal Sharma",
    city: "Surat",
    text: "The locket I ordered from Rehnoor Jewels exceeded all my expectations. Fast delivery, beautiful packaging, and the quality is top class. Rehnoor Jewels has definitely earned a loyal customer!",
  },
  {
    name: "Nikhil Patil",
    city: "Nagpur",
    text: "Ordered a pendant as a Diwali gift for my brother and he was thrilled! It arrived beautifully packed and looked absolutely stunning. My brother has been wearing it every day since. Great purchase!",
  },
  {
    name: "Deepak Saxena",
    city: "Bhopal",
    text: "The initial pendant I ordered for myself is such a unique and personalised piece. The finish is flawless and it looks great with every outfit. Rehnoor Jewels has the best collection at the best price!",
  },
  {
    name: "Anita Sharma",
    city: "Delhi",
    text: "I gifted a god locket from Rehnoor Jewels to my husband on our wedding anniversary and he was so moved by the gesture. The locket is beautifully crafted and looks so premium. He wears it every day and gets compliments wherever he goes!",
  },
  {
    name: "Kavita Patel",
    city: "Mumbai",
    text: "Was looking for a meaningful Rakhi gift for my brother and found Rehnoor Jewels. I ordered a religious pendant for him and he absolutely loved it! It arrived beautifully packed and the quality is outstanding. Will definitely be ordering more!",
  },
];

const GIFT_OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Rakhi",
  "Diwali",
  "Religious Milestone",
  "Special Occasion",
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
export default function PendantsForMen() {
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
          HERO — charcoal bg, pendant-specific chain motif
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
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bottom-0 w-px hidden lg:block pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(252,193,81,0.18), transparent 30%, transparent 70%, rgba(252,193,81,0.08))",
          }}
        />

        <div className="container-rj py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Rehnoor Jewels Collection</Label>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-cormorant font-light leading-tight mb-5"
              style={{
                fontSize: "clamp(2.2rem,6vw,4rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Pendants{" "}
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
            </motion.h2>

            <GoldDivider />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(0.95rem,2vw,1.1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.85",
              }}
            >
              Explore our exclusive collection of pendants for men where bold
              expression meets everyday elegance. Each piece is crafted to give
              you a rich, premium look at an affordable price, making it perfect
              for casual wear, festive celebrations, and special occasions.
            </motion.p>
          </div>
        </div>
      </Section> */}

        {/* ══════════════════════════════════════════════════
          WHAT ARE PENDANTS FOR MEN? — ivory bg
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
                      fontSize: "clamp(1.8rem,4vw,3rem)",
                      color: "var(--rj-charcoal)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    What are{" "}
                    <em
                      className="font-normal"
                      style={{ color: "var(--rj-emerald)" }}
                    >
                      Pendants for Men?
                    </em>
                  </h2>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  custom={1}
                  className="leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  Pendants for men are decorative ornaments worn around the
                  neck, crafted from a base metal such as brass or copper and
                  gold plated to give them a rich, luxurious finish.
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  custom={2}
                  className="mt-4 leading-relaxed"
                  style={{
                    color: "var(--rj-ash)",
                    fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                  }}
                >
                  At Rehnoor Jewels, our{" "}
                  <strong
                    style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                  >
                    1 gram gold pendant
                  </strong>{" "}
                  collection is designed with precision and finished to
                  perfection, offering a wide range of styles from bold
                  statement pieces to subtle everyday designs. Whether you are
                  looking for a simple golden locket for daily wear or an
                  intricately designed pendant for a special occasion, we have
                  the perfect piece for you.
                </motion.p>
              </div>

              {/* Right — 2×2 card grid */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  {
                    label: "God Lockets",
                    sub: "Faith & devotion",
                    icon: <Heart size={22} />,
                  },
                  {
                    label: "Lasting Shine",
                    sub: "Anti-tarnish finish",
                    icon: <Sun size={22} />,
                  },
                  {
                    label: "6+ Styles",
                    sub: "For every personality",
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
          PENDANT STYLES — dark bg
          Unique: style TAG chip inline with name
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-charcoal)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(252,193,81,0.05) 0%, transparent 70%)",
            }}
          />
          <div className="container-rj relative z-10">
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Style Guide</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Pendant Styles for{" "}
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
                    Every Man
                  </em>
                </h2>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PENDANT_STYLES.map((style, i) => (
                <motion.div
                  key={style.name}
                  variants={fadeUp}
                  custom={i * 0.12}
                  className="group flex items-start gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    background: "rgba(252,193,81,0.05)",
                    borderColor: "rgba(252,193,81,0.2)",
                    y: -2,
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
          WHAT MAKES IT SPECIAL — ivory bg, 2×2 grid
          (4 features for pendants — smaller set)
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div className="container-rj">
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Crafted with Care</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  What Makes Our Pendants{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Special?
                  </em>
                </h2>
              </motion.div>
            </div>

            {/* 2×2 grid — balanced for 4 features */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:mx-auto">
              {SPECIAL_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  custom={i * 0.12}
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
          WHY CHOOSE REHNOOR — emerald bg
      ══════════════════════════════════════════════════ */}
        <Section
          className="section-padding relative overflow-hidden"
          style={{ background: "var(--rj-emerald, #003720)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 100% 50%, rgba(252,193,81,0.08) 0%, transparent 65%)",
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
                      fontSize: "clamp(1.8rem,4vw,3rem)",
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
                      Pendants?
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
                    When it comes to buying pendants for men online, Rehnoor
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
          HOW TO STYLE — ivory bg, 3+2 layout
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
                    fontSize: "clamp(1.8rem,4vw,3rem)",
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
                  Pendants for Men
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
                    background: tip.dark ? "var(--rj-charcoal)" : "#fff",
                    border: !tip.dark ? "1px solid var(--rj-bone)" : "none",
                  }}
                >
                  <span
                    className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                    style={{
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: tip.dark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,55,32,0.05)",
                    }}
                  >
                    {tip.num}
                  </span>
                  <span
                    className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                    style={{
                      background: tip.dark
                        ? "rgba(252,193,81,0.15)"
                        : "rgba(0,55,32,0.08)",
                      color: tip.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  >
                    {tip.context}
                  </span>
                  <p
                    className="leading-relaxed text-sm relative z-10 mt-2"
                    style={{
                      color: tip.dark
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

            {/* Bottom 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
              {STYLE_TIPS.slice(3).map((tip, i) => (
                <motion.div
                  key={tip.context}
                  variants={fadeUp}
                  custom={(i + 3) * 0.15}
                  className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                  style={{
                    background: tip.dark ? "var(--rj-charcoal)" : "#fff",
                    border: !tip.dark ? "1px solid var(--rj-bone)" : "none",
                  }}
                >
                  <span
                    className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                    style={{
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: tip.dark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,55,32,0.05)",
                    }}
                  >
                    {tip.num}
                  </span>
                  <span
                    className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                    style={{
                      background: tip.dark
                        ? "rgba(252,193,81,0.15)"
                        : "rgba(0,55,32,0.08)",
                      color: tip.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  >
                    {tip.context}
                  </span>
                  <p
                    className="leading-relaxed text-sm relative z-10 mt-2"
                    style={{
                      color: tip.dark
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
          PERFECT GIFT — dark card on ivory
          Pendant-specific: includes religious milestone
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
                  1 Gram Pendant: A Perfect Gift{" "}
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
                    for Every Occasion
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
                  Looking for a gift that is meaningful, stylish, and
                  budget-friendly? A 1 gram gold pendant from Rehnoor Jewels
                  makes for a perfect gift for every occasion. Whether it is a
                  birthday, anniversary, Rakhi, Diwali, or a religious
                  milestone, our pendants for men and golden lockets are a
                  thoughtful and elegant choice that any man would cherish.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  From classic god lockets to personalised initial pendants, our
                  collection has something for every personality and every
                  budget. Give the gift of meaning and style.
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
          DURABILITY — dark bg
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
                      fontSize: "clamp(1.8rem,4vw,3rem)",
                      color: "#fff",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    How Long Do{" "}
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
                      Pendants Last?
                    </em>
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
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Care Tips for Your{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Pendant
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
                "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(252,193,81,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="container-rj relative z-10">
            <div className="text-center mb-12">
              <motion.div variants={fadeUp} custom={0}>
                <Label>Customer Love</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
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
                      fontSize: "clamp(1.8rem,4vw,3rem)",
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
          CTA FOOTER — dark bg
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
                  fontSize: "clamp(1.8rem,5vw,3.5rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Shop Pendants for Men
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
                fontSize: "clamp(0.9rem,2vw,1.05rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.85",
              }}
            >
              At Rehnoor Jewels, we believe every man deserves an accessory that
              tells his story. Browse our 1 gram gold pendant and golden locket
              collection today and find the perfect piece that speaks to your
              faith, personality, and style.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/collections/"
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
