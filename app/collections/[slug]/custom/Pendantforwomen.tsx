// app/collections/pendants-for-women/component/PendantForWomen.tsx
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
  Link2,
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
      <Heart size={10} style={{ color: "var(--rj-gold)", flexShrink: 0 }} />
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
  { value: "Close", label: "to Your Heart" },
  { value: "Anti-Tarnish", label: "Protection" },
  { value: "Skin-Safe", label: "Materials" },
  { value: "50K+", label: "Women Who Wear Us" },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Every pendant is finished with high-quality gold plating that gives it the rich, warm glow of real gold beautiful, lasting, and genuinely luxurious.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Protection",
    desc: "A protective anti-tarnish coating preserves the shine and colour through daily wear and everyday exposure so your pendant stays as beautiful as the day you received it.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Friendly Materials",
    desc: "Crafted with skin-safe base metals and a smooth gold plated finish, gentle on all skin types including sensitive skin.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Wearable",
    desc: "Lightweight and comfortable enough to wear all day, every day from morning routines to evening celebrations.",
  },
  {
    icon: <Link2 size={18} />,
    title: "Comes with Chain Option",
    desc: "Select pendants come paired with a matching chain for a complete, ready-to-wear look straight out of the box.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Yet Luxurious",
    desc: "At Rehnoor Jewels, luxury is never out of reach. Our gold pendant for women collection gives you a premium look and feel at a price that makes complete sense.",
  },
];

const WHY_ITEMS: WhyItem[] = [
  {
    icon: <Heart size={16} />,
    title: "A Collection That Truly Caters to Women",
    desc: "Every pendant is designed with a woman's taste, lifestyle, and emotion in mind not just as an afterthought, but as the very heart of our design process.",
  },
  {
    icon: <Gem size={16} />,
    title: "Craftsmanship You Can See",
    desc: "The detailing on our gold pendant for women pieces is precise, intentional, and beautifully executed because we believe that the smallest details make the biggest difference.",
  },
  {
    icon: <BadgeCheck size={16} />,
    title: "Honest & Transparent",
    desc: "We are upfront about our materials, our plating, and our craftsmanship. What you see on our page is exactly what arrives at your door.",
  },
  {
    icon: <Star size={16} />,
    title: "Designs for Every Budget",
    desc: "Whether you are looking for an everyday piece or a special occasion statement, our pendants for women collection has something beautiful at every price point.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver safely and securely across India, with careful packaging that ensures your pendant arrives in perfect condition - ready to wear or gift.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "The Everyday Essential",
    desc: "A slim gold plated pendant on a delicate chain worn with a simple kurta, tee, or casual dress effortless, personal, and quietly beautiful every single day.",
    dark: true,
    num: "01",
  },
  {
    context: "The Festive Statement",
    desc: "A bold kundan or stone-set gold pendant for women layered over a silk saree or lehenga for a festive look that is rich, traditional, and completely stunning.",
    dark: false,
    num: "02",
  },
  {
    context: "The Office Look",
    desc: "A sleek initial or geometric pendant worn under the collar of a formal blouse or shirt subtle enough for the boardroom, stylish enough to turn heads in the corridor.",
    dark: false,
    num: "03",
  },
  {
    context: "The Layered Look",
    desc: "Stack two or three pendants of different lengths mix a slim floral pendant with a bold statement piece for a curated, fashion-forward layered necklace look that feels entirely your own.",
    dark: true,
    num: "04",
  },
];

const CARE_HABITS = [
  {
    icon: <Sun size={15} />,
    tip: "After every wear, gently wipe your pendant with a soft, dry cloth to remove moisture, sweat, or dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe gently, and ensure it is completely dry before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Always store your gold plated pendant in a dry, airtight jewellery pouch or box to protect it from humidity and air exposure.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Remove your pendant before bathing, swimming, exercising, or applying perfumes and skincare products to preserve the gold plating.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Keep your pendant separate from other metal jewellery to prevent scratching or friction on the gold plated surface.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What are pendants for women?",
    a: "Pendants for women are decorative ornaments worn on a chain around the neck, available in a wide range of styles from religious god lockets and personalised initials to bold geometric and kundan designs. At Rehnoor Jewels, all our pendants are gold plated and crafted to give a premium finish at an accessible price.",
  },
  {
    q: "What is a gold plated pendant?",
    a: "A gold plated pendant is a pendant crafted from a base metal such as brass or copper and electroplated with a layer of real gold, giving it the rich, warm appearance of solid gold jewellery at a fraction of the cost. At Rehnoor Jewels, every gold plated pendant comes with an anti-tarnish coating for lasting shine.",
  },
  {
    q: "Are your pendants for women suitable for sensitive skin?",
    a: "Yes! Our pendants are crafted with skin-friendly base metals and a smooth gold plated finish that is gentle on most skin types. If you have a known metal allergy, we recommend consulting a specialist before purchase.",
  },
  {
    q: "Do your pendants come with a chain?",
    a: "Select pendants in our collection come paired with a matching chain for a complete, ready-to-wear look. Please check individual product listings for details on chain inclusion.",
  },
  {
    q: "Can I wear a gold pendant for women every day?",
    a: "Absolutely! Our pendants for women are lightweight, comfortable, and designed for everyday wear. With proper care — keeping them away from water, sweat, and perfumes. They retain their shine and finish beautifully for a long time.",
  },
  {
    q: "Are your pendants suitable as gifts?",
    a: "Yes! Our gold plated pendants for women make for one of the most thoughtful and personal gifts for birthdays, anniversaries, Rakhi, weddings, and more. Every piece arrives beautifully packaged and ready to gift.",
  },
  {
    q: "How long does a gold plated pendant last?",
    a: "With regular and mindful care, a gold plated pendant from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating and high-quality gold plating.",
  },
  {
    q: "How do I clean my gold pendant for women?",
    a: "Gently wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe carefully, and dry completely before storing in an airtight pouch or jewellery box.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered a floral pendant from Rehnoor Jewels and it is honestly the prettiest piece of jewellery I own. The detailing is so delicate and the gold finish is so warm and rich. I wear it every single day and still get compliments!",
  },
  {
    name: "Sneha Patel",
    city: "Mumbai",
    text: "Been wearing my initial pendant from Rehnoor Jewels for months and the finish is still as beautiful as day one. The anti-tarnish coating genuinely makes a difference. Such a personal and meaningful piece!",
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    text: "The pendant I ordered is absolutely stunning. The craftsmanship is so precise and the gold finish is so warm and authentic looking. Wore it to a family puja and received so many compliments!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "I gifted the heart pendant to my best friend at her wedding and she cried happy tears! The packaging was so beautiful and the pendant was even more gorgeous in person. Rehnoor Jewels made the moment extra special!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "The pendant I ordered is such a bold and unique piece. Pairs beautifully with both my western and ethnic outfits. The gold finish is smooth, warm, and absolutely gorgeous. Love it!",
  },
  {
    name: "Deepika Nair",
    city: "Kochi",
    text: "Finally found a pendant brand that delivers exactly what it promises. The quality is outstanding, the finish is premium, and the price is so reasonable. Nobody believes it is not solid gold!",
  },
  {
    name: "Pooja Mishra",
    city: "Lucknow",
    text: "The pendant I ordered feels so personal and meaningful. The detailing is beautiful and the gold finish is rich and warm. I love that I can wear something that truly represents me every day!",
  },
  {
    name: "Kajal Sharma",
    city: "Chandigarh",
    text: "Ordered the pendant for a family wedding and it was the perfect festive piece. Rich, bold, and so beautifully crafted. Paired it with my lehenga and felt absolutely stunning!",
  },
  {
    name: "Sunita Verma",
    city: "Pune",
    text: "I ordered a pendant for my daughter on her graduation and she absolutely loved it. The packaging was so elegant and the pendant was so beautifully crafted. A gift she will treasure forever!",
  },
  {
    name: "Naina Gupta",
    city: "Surat",
    text: "The oxidised pendant I ordered is so bold and edgy exactly my style. It pairs perfectly with my casual outfits and gets me compliments every single time. Rehnoor Jewels truly gets it!",
  },
  {
    name: "Ramya Krishnan",
    city: "Chennai",
    text: "Ordered a pendant for my mother on her birthday and she was deeply moved. The detailing is so intricate and meaningful and the gold finish is so warm and beautiful.",
  },
  {
    name: "Ishita Bose",
    city: "Kolkata",
    text: "The pendant I ordered from Rehnoor Jewels is the most delicate and beautiful piece I own. Light, elegant, and so perfectly finished. I have received more compliments for this one piece than anything else I own!",
  },
];

const PENDANT_STYLES = [
  {
    name: "Floral Pendant",
    tag: "Everyday",
    desc: "Delicate, feminine, and beautifully detailed floral gold plated pendants pair effortlessly with any outfit from casual tees to festive kurtas.",
  },
  {
    name: "Initial / Name Pendant",
    tag: "Personalised",
    desc: "Wear your own story. Initial and name pendants are among the most meaningful and personal pieces in our collection, the perfect gift for yourself or someone you love.",
  },
  {
    name: "Heart Pendant",
    tag: "Romantic",
    desc: "A timeless symbol of love and warmth. Our gold plated heart pendants are the perfect gift for birthdays, anniversaries, and every quiet moment of affection.",
  },
  {
    name: "Kundan Pendant",
    tag: "Festive",
    desc: "Rich, ornate kundan work set in warm gold plating the quintessential festive pendant for sarees, lehengas, and traditional celebrations.",
  },
  {
    name: "Geometric Pendant",
    tag: "Contemporary",
    desc: "Clean lines, bold shapes, and a modern aesthetic. Our geometric gold pendants for women are designed for the woman who expresses herself through distinctive, contemporary style.",
  },
  {
    name: "Oxidised Pendant",
    tag: "Statement",
    desc: "An antique oxidised finish that brings edge and character to your look bold, unique, and perfectly suited to casual and indo-western styles.",
  },
  {
    name: "Stone-Set Pendant",
    tag: "Glam",
    desc: "Colour, sparkle, and festive drama, our stone-set gold pendant for women collection is designed to make a statement at every celebration and special occasion.",
  },
  {
    name: "God / Religious Pendant",
    tag: "Devotional",
    desc: "Carry your faith close to your heart. Our gold plated religious pendants for women are beautifully detailed and deeply meaningful perfect for daily devotional wear.",
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
export default function PendantForWomen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO — charcoal bg
          Unique: intimate editorial opening, heart divider,
          "close to your heart" as the defining motif
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
            {/* Unique: heart icon above heading — pendant sits close to the heart */}
            <motion.div
              variants={fadeIn}
              custom={0}
              className="flex justify-center mb-5"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(252,193,81,0.08)",
                  border: "1px solid rgba(252,193,81,0.2)",
                }}
              >
                <Heart size={24} style={{ color: "var(--rj-gold)" }} />
              </div>
            </motion.div>

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
              Pendants for{" "}
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
                Women
              </em>
            </motion.h2>

            {/* Unique: intimate editorial subtitle */}
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
              A Pendant Is Personal. And Ours Are Made That Way.
            </motion.p>

            <GoldDivider />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(0.95rem,2vw,1.1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.9",
              }}
            >
              There is something beautifully intimate about a pendant. It sits
              close to your heart, moves with you through every moment of your
              day, and often carries a meaning that only you truly understand.
              At Rehnoor Jewels, we design our pendants for women with that
              intimacy in mind.
            </motion.p>

            {/* Stat badges */}
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
          THE INTIMACY OF A PENDANT — ivory bg
          Unique: editorial prose left + intimate pull-quotes right
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left — prose */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>Made for You</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Our Gold Plated Pendants{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Personal by Design
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
                Every curve, every finish, and every detail of our gold plated
                pendant collection is crafted to feel as personal as the woman
                wearing it. Our designs bring together a wide world of styles,
                all finished with a rich, warm gold plating that makes every
                piece look and feel truly luxurious.
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
                And because we believe that great jewellery should be accessible
                to every woman, our{" "}
                <strong
                  style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                >
                  gold pendant for women
                </strong>{" "}
                collection is priced to make you smile, not stress.
              </motion.p>
            </div>

            {/* Right — intimate pull-quote cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  quote:
                    "It sits close to your heart, moves with you through every moment, and carries a meaning only you truly understand.",
                  attr: "The story of every pendant we make.",
                  dark: false,
                },
                {
                  quote:
                    "Every curve, every finish, and every detail is crafted to feel as personal as the woman wearing it.",
                  attr: "Our design philosophy.",
                  dark: true,
                },
                {
                  quote:
                    "Great jewellery should be accessible to every woman — our gold pendants are priced to make you smile, not stress.",
                  attr: "The Rehnoor Jewels promise.",
                  dark: false,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.22}
                  className="p-6 rounded-2xl relative overflow-hidden"
                  style={{
                    background: card.dark
                      ? "var(--rj-charcoal)"
                      : "rgba(0,55,32,0.05)",
                    border: !card.dark ? "1px solid rgba(0,55,32,0.1)" : "none",
                  }}
                >
                  <Heart
                    size={16}
                    className="mb-3 opacity-30"
                    style={{
                      color: card.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  />
                  <p
                    className="font-cormorant leading-snug mb-3 italic"
                    style={{
                      fontSize: "clamp(1rem,2vw,1.1rem)",
                      color: card.dark ? "#fff" : "var(--rj-charcoal)",
                      fontWeight: 500,
                    }}
                  >
                    {card.quote}
                  </p>
                  <p
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{
                      color: card.dark
                        ? "rgba(255,255,255,0.3)"
                        : "var(--rj-ash)",
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
          PENDANT STYLES — dark bg, 2-column grid
          Unique: 8 women-specific pendant styles with tags
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
              <Label light>The Collection</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Every Style of{" "}
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
                  Pendant for Women
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PENDANT_STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                variants={fadeUp}
                custom={i * 0.1}
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
          WHAT SETS US APART — ivory bg, 3+3 grid
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>What Sets Our Pendants Apart</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Crafted to Be{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Worn Every Day
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
          WHY REHNOOR — emerald bg, split layout
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
                <Label>Why Choose Us</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Rehnoor Jewels Is the Home of Pendants for{" "}
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
                    Women in India
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
                  The choices can feel overwhelming. Here is why women across
                  India trust Rehnoor Jewels.
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
          STYLING IDEAS — ivory bg, 2×2 with evocative names
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
                From Everyday to{" "}
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
                {/* Evocative title in italic Cormorant */}
                <p
                  className="font-cormorant italic font-light text-xl block mb-3 relative z-10"
                  style={{
                    color: tip.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {tip.context}
                </p>
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
          DURABILITY + CARE — dark bg with prose intro
          Unique: editorial "honest truth" framing
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(252,193,81,0.06) 0%, transparent 65%)",
          }}
        />
        <div className="container-rj relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Editorial intro */}
            <div className="text-center mb-10">
              <motion.div variants={fadeUp} custom={0}>
                <Label light>The Honest Truth</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-5"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Durability & Care{" "}
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
                    What You Deserve to Know
                  </em>
                </h2>
                <motion.p
                  variants={fadeUp}
                  custom={1}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.9",
                    fontSize: "0.95rem",
                  }}
                >
                  We believe every woman deserves to know exactly what she is
                  investing in. With our premium anti-tarnish coating and
                  high-quality gold plating, a Rehnoor pendant for women can
                  retain its rich shine for{" "}
                  <span style={{ color: "var(--rj-gold)" }}>
                    1 to 2 years or longer
                  </span>{" "}
                  with proper care. Caring for your pendant is simple and takes
                  less than a minute — and with just a little mindful attention,
                  it will continue to shine beautifully through every moment of
                  your life.
                </motion.p>
              </motion.div>
            </div>

            {/* Care habits — dark cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {CARE_HABITS.slice(0, 3).map((tip, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.12}
                  className="p-6 rounded-2xl text-center flex flex-col items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(252,193,81,0.12)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    {tip.icon}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.55)",
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
              {CARE_HABITS.slice(3).map((tip, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={(i + 3) * 0.12}
                  className="p-6 rounded-2xl text-center flex flex-col items-center gap-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(252,193,81,0.12)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    {tip.icon}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.55)",
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
          REVIEWS — dark bg inside ivory section
          Unique: wrapped in a charcoal card on ivory
          for contrast variety
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Real Women, Real Love</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Here Is What Our{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
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
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  5.0
                </span>
                <span
                  className="font-cinzel text-[10px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  · {REVIEWS.length} verified reviews
                </span>
              </div>
            </motion.div>
          </div>

          {/* Reviews wrapped in charcoal card for contrast */}
          <div
            className="rounded-3xl overflow-hidden p-6 sm:p-10"
            style={{
              background: "var(--rj-charcoal)",
              border: "1px solid rgba(252,193,81,0.12)",
            }}
          >
            <ReviewCarousel reviews={REVIEWS} />
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          FAQ — ivory bg, 8 questions (most of all pages)
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
                  Everything You{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Want to Know
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
          CTA FOOTER — dark bg, intimate editorial close
          Unique: "Your perfect pendant is closer than
          you think" — reflective of the "close to heart" motif
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
          <motion.div
            variants={fadeIn}
            custom={0}
            className="flex justify-center mb-6"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(252,193,81,0.1)",
                border: "1px solid rgba(252,193,81,0.25)",
              }}
            >
              <Heart size={22} style={{ color: "var(--rj-gold)" }} />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0}>
            <Label light>Find Your Pendant</Label>
            <h2
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              Shop Collections for Women
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

          {/* Unique intimate closing line */}
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
            Your perfect pendant is closer than you think.
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
            Our pendants for women collection at Rehnoor Jewels has a piece that
            was made for your story. Shop today and wear what moves you.
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
              Browse Products <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
