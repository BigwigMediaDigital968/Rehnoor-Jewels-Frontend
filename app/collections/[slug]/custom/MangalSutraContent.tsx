// app/collections/mangalsutra/component/MangalSutraCollection.tsx
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
  Gift,
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

interface WomanType {
  type: string;
  desc: string;
  dark: boolean;
  num: string;
  icon: string;
}

interface GiftOccasion {
  occasion: string;
  desc: string;
  dark: boolean;
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
function SacredDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div
        className="h-px flex-1"
        style={{ background: "rgba(252,193,81,0.25)" }}
      />
      {/* Unique: om-like sacred symbol for mangalsutra */}
      <span
        style={{
          color: "var(--rj-gold)",
          fontSize: "14px",
          fontFamily: "serif",
        }}
      >
        ॐ
      </span>
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
  { value: "Sacred", label: "Craftsmanship" },
  { value: "1 Gram", label: "Gold Polish" },
  { value: "Anti-Tarnish", label: "Coating" },
  { value: "20K+", label: "Women Who Wear Us" },
];

const WOMAN_TYPES: WomanType[] = [
  {
    type: "The Traditional Bride",
    desc: "If you hold tradition close, our classic black bead gold plated mangalsutra designs with intricate pendants are crafted to honour every ritual and every vow with grace and reverence.",
    dark: true,
    num: "01",
    icon: "♛",
  },
  {
    type: "The Modern Wife",
    desc: "If you love wearing your mangalsutra daily in a way that blends with your lifestyle, our slim and minimal 1 gram gold plated mangalsutra designs are lightweight, elegant, and perfect for everyday wear.",
    dark: false,
    num: "02",
    icon: "◈",
  },
  {
    type: "The Fusion Lover",
    desc: "If your style sits beautifully between tradition and trend, our contemporary mangalsutra for women designs feature unique pendants, geometric patterns, and dual tone finishes that feel fresh and fashionable.",
    dark: false,
    num: "03",
    icon: "⬟",
  },
  {
    type: "The Bold Woman",
    desc: "If you believe your jewellery should make a statement, our broad and heavily designed gold plated mangalsutra pieces with bold pendants and layered chains are crafted to be seen and admired.",
    dark: true,
    num: "04",
    icon: "◉",
  },
  {
    type: "The Practical Wearer",
    desc: "If comfort and durability matter most to you, our short and adjustable 1 gram gold plated mangalsutra designs are built for the woman who wants to honour the tradition without compromising on comfort.",
    dark: false,
    num: "05",
    icon: "◇",
  },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Rich Gold Plating",
    desc: "Every mangalsutra is finished with premium quality gold plating that gives it the warm, lustrous glow of real gold without the heavy price tag.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "Our protective anti-tarnish finish preserves the shine and colour through daily wear and everyday exposure — for every season of your married life.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Safe & Comfortable",
    desc: "Crafted with skin-friendly materials, designed to be comfortable for all-day wear — even against the most sensitive skin.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight Design",
    desc: "Despite their rich and detailed appearance, our 1 gram gold plated mangalsutra pieces are lightweight enough to wear from morning to night without any discomfort.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Meaningful Craftsmanship",
    desc: "Every piece is crafted with the understanding that a mangalsutra is not just an accessory — it is a symbol of love, commitment, and tradition that deserves to be made with care.",
  },
  {
    icon: <BadgeCheck size={18} />,
    title: "Affordable & Accessible",
    desc: "At Rehnoor Jewels, we believe that every woman deserves a beautiful mangalsutra, regardless of her budget. Premium quality at every price point.",
  },
];

const WHY_ITEMS: WhyItem[] = [
  {
    icon: <BadgeCheck size={16} />,
    title: "A Brand Built on Trust",
    desc: "Every gold plated mangalsutra goes through strict quality checks to ensure that what reaches you is nothing short of perfect.",
  },
  {
    icon: <Heart size={16} />,
    title: "Designs That Honour Tradition",
    desc: "Our designers draw deep inspiration from Indian bridal traditions, regional styles, and contemporary trends to create mangalsutra designs that feel both rooted and relevant.",
  },
  {
    icon: <Gem size={16} />,
    title: "Transparent Quality",
    desc: "We are honest about our materials and our craftsmanship. Every 1 gram gold plated mangalsutra is exactly what it says — premium quality, beautifully finished, and built to last.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "No matter where you are in India, your Rehnoor mangalsutra will reach you safely, securely, and beautifully packaged.",
  },
  {
    icon: <Gift size={16} />,
    title: "Gifting Made Beautiful",
    desc: "Every piece is packaged with care, making it the perfect gift for a bride, a wife, or any woman who deserves to be celebrated.",
  },
];

const GIFT_OCCASIONS: GiftOccasion[] = [
  {
    occasion: "Wedding Gift",
    desc: "Gift a beautifully designed gold plated mangalsutra to a bride and give her something she will cherish and wear every single day of her married life.",
    dark: true,
  },
  {
    occasion: "Anniversary Surprise",
    desc: "Surprise your wife with a new mangalsutra for women design to celebrate another year of love, commitment, and togetherness.",
    dark: false,
  },
  {
    occasion: "Baby Shower Gift",
    desc: "A 1 gram gold plated mangalsutra makes a thoughtful and traditional gift for a new mother entering a beautiful new chapter of life.",
    dark: false,
  },
  {
    occasion: "Karva Chauth Gift",
    desc: "Honour the spirit of Karva Chauth by gifting your wife a stunning new mangalsutra that she can wear with pride on this most special day.",
    dark: true,
  },
  {
    occasion: "Just Because",
    desc: "Because sometimes the best gifts are the ones that need no occasion at all. Every piece arrives beautifully packaged — no wrapping required, just love.",
    dark: false,
  },
];

const CARE_HABITS = [
  {
    icon: <Sun size={15} />,
    tip: "After every wear, gently wipe your mangalsutra with a soft, dry cloth to remove sweat, skin oils, or dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe gently, and dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Always store your gold plated mangalsutra in a dry, airtight jewellery pouch or box to protect it from humidity and air exposure.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Remove it before bathing, swimming, exercising, or applying perfumes and skincare products to protect the gold plating.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Keep your mangalsutra separate from other metal jewellery to avoid scratching or friction on the gold plated surface.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What is a gold plated mangalsutra?",
    a: "A gold plated mangalsutra is a traditional Indian bridal necklace crafted from a base metal such as brass or copper and electroplated with a layer of real gold, giving it the rich, warm appearance of a solid gold mangalsutra at a fraction of the cost. At Rehnoor Jewels, every gold plated mangalsutra is finished with premium quality plating and an anti-tarnish coating for lasting shine.",
  },
  {
    q: "Is a 1 gram gold plated mangalsutra suitable for daily wear?",
    a: "Absolutely! Our 1 gram gold plated mangalsutra designs are lightweight, comfortable, and crafted specifically for everyday wear. With proper care, they retain their shine and finish beautifully through regular use.",
  },
  {
    q: "Is your mangalsutra safe for sensitive skin?",
    a: "Yes! Our mangalsutra for women are crafted with skin-friendly base metals and a smooth gold plated finish that is gentle on most skin types. If you have a known metal sensitivity or allergy, we recommend consulting a specialist before purchase.",
  },
  {
    q: "Can I gift a gold plated mangalsutra from Rehnoor Jewels?",
    a: "Yes! Our gold plated mangalsutra collection makes for one of the most meaningful and heartfelt gifts for brides, wives, and mothers. Every piece arrives beautifully packaged and ready to gift.",
  },
  {
    q: "Do you offer designer mangalsutra styles for special occasions?",
    a: "Yes! Our collection includes a wide range of designer mangalsutra for women, featuring intricate patterns, multiple pendants, and rich gold plated detailing — perfect for weddings, anniversaries, and festive celebrations.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered a short mangalsutra from Rehnoor Jewels for my everyday wear and I am absolutely in love with it. The gold finish is so warm and rich, it looks just like real gold. Light on the neck, easy to wear, and beautiful beyond words!",
  },
  {
    name: "Anjali Verma",
    city: "Mumbai",
    text: "Been wearing my 1 gram mangalsutra from Rehnoor Jewels every single day since my wedding and there is no fading at all. The anti-tarnish coating genuinely works wonders. So happy with my purchase!",
  },
  {
    name: "Deepika Reddy",
    city: "Hyderabad",
    text: "The designer mangalsutra I ordered for our anniversary was breathtaking. My husband could not believe it was not solid gold. The detailing is so intricate and the finish is absolutely flawless. Rehnoor Jewels truly delivered!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "Finally found a mangalsutra that is beautiful, lightweight, and affordable all at once. I was so tired of heavy, uncomfortable pieces but my Rehnoor mangalsutra feels like I am wearing nothing at all — in the best possible way!",
  },
  {
    name: "Sunita Patel",
    city: "Ahmedabad",
    text: "Ordered the tanmaniya style mangalsutra for my daily office wear and it is absolutely perfect. Subtle, elegant, and so easy to style with everything. Nobody believes it is not real gold!",
  },
  {
    name: "Kavita Joshi",
    city: "Pune",
    text: "I gifted a gold plated mangalsutra from Rehnoor Jewels to my daughter-in-law as a wedding gift and she was moved to tears. The packaging was so beautiful and the piece itself was stunning. A truly memorable gift!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "The long mangalsutra I ordered for a family wedding function looked absolutely regal with my silk saree. Rich finish, beautiful pendant, and so many compliments from family and friends. Rehnoor Jewels never disappoint!",
  },
  {
    name: "Naina Gupta",
    city: "Lucknow",
    text: "Ordered the diamond cut mangalsutra and it is everything I dreamed of. The way it catches the light is just magical. Comfortable, beautiful, and so well priced. Could not recommend Rehnoor Jewels enough!",
  },
  {
    name: "Simran Kaur",
    city: "Chandigarh",
    text: "My mother ordered a mangalsutra for me as a Karva Chauth surprise and I honestly could not have asked for a more perfect gift. The design is traditional yet modern and the gold finish is so warm and gorgeous!",
  },
  {
    name: "Ramya Krishnan",
    city: "Chennai",
    text: "The classic black bead mangalsutra I ordered is so beautifully crafted. The pendant detailing is precise, the finish is rich, and it sits so elegantly around the neck. Exactly what I wanted and more!",
  },
  {
    name: "Ishita Bose",
    city: "Kolkata",
    text: "I bought a pendant mangalsutra from Rehnoor Jewels and styled it with my everyday outfits, ethnic and western both. It looks stunning every single time. Lightweight, beautiful, and worth every rupee!",
  },
  {
    name: "Pooja Mishra",
    city: "Bhopal",
    text: "Was a little unsure about buying a mangalsutra online but Rehnoor Jewels completely changed my perspective. The quality exceeded my expectations, the delivery was fast, and the packaging was so elegant. A brand I will keep coming back to!",
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
export default function MangalSutraCollection() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO — deep charcoal, sacred tone
          Unique: ॐ divider, "sacred bond" opening,
          sacred-style icon, editorial devotional voice
      ══════════════════════════════════════════════════ */}
      <Section
        className="relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 50% 0%, rgba(252,193,81,0.07) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(252,193,81,0.03) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(252,193,81,0.5), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(252,193,81,0.1), transparent)",
          }}
        />

        <div className="container-rj py-14 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Unique: sacred ॐ icon above heading */}

            <motion.div variants={fadeUp} custom={0}>
              <Label light>Rehnoor Jewels · Sacred Collection</Label>
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
              Gold Plated{" "}
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
                Mangalsutra
              </em>
            </motion.h2>

            {/* Unique: sacred editorial subtitle */}
            <motion.p
              variants={fadeUp}
              custom={1.5}
              className="font-cormorant font-light italic"
              style={{
                fontSize: "clamp(1rem,2.5vw,1.3rem)",
                color: "rgba(252,193,81,0.6)",
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
              }}
            >
              A Sacred Bond, Beautifully Crafted
            </motion.p>

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
              For generations, the mangalsutra has held a place of deep
              significance in Indian culture. It is the first piece of jewellery
              a bride receives and often the last she ever takes off. At Rehnoor
              Jewels, we understand the weight of that meaning which is why
              every gold plated mangalsutra in our collection is crafted not
              just to look beautiful, but to feel meaningful.
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
              Whether you are a new bride or a woman who wants to add a fresh
              design to her collection, Rehnoor Jewels has the perfect piece
              waiting for you.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          NOT ALL MANGALSUTRAS ARE THE SAME — ivory bg
          Unique: 5 woman archetypes — the most personal
          section on any collection page, speaks directly
          to 5 different buyer personas
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Find Yours</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Not All Mangalsutras Are the Same{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Find Yours
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
                Every woman is different. Every love story is unique. And every
                mangalsutra should reflect that.
              </motion.p>
            </motion.div>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {WOMAN_TYPES.slice(0, 3).map((w, i) => (
              <motion.div
                key={w.type}
                variants={fadeUp}
                custom={i * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: w.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !w.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                {/* Large watermark number */}
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: w.dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,55,32,0.04)",
                  }}
                >
                  {w.num}
                </span>
                {/* Type icon */}
                <span
                  className="text-2xl block mb-3"
                  style={{
                    color: w.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {w.icon}
                </span>
                {/* Type name in italic Cormorant — unique treatment */}
                <p
                  className="font-cormorant italic font-semibold text-lg block mb-3 relative z-10"
                  style={{
                    color: w.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {w.type}
                </p>
                <p
                  className="leading-relaxed text-sm relative z-10"
                  style={{
                    color: w.dark ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {WOMAN_TYPES.slice(3).map((w, i) => (
              <motion.div
                key={w.type}
                variants={fadeUp}
                custom={(i + 3) * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: w.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !w.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: w.dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,55,32,0.04)",
                  }}
                >
                  {w.num}
                </span>
                <span
                  className="text-2xl block mb-3"
                  style={{
                    color: w.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {w.icon}
                </span>
                <p
                  className="font-cormorant italic font-semibold text-lg block mb-3 relative z-10"
                  style={{
                    color: w.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {w.type}
                </p>
                <p
                  className="leading-relaxed text-sm relative z-10"
                  style={{
                    color: w.dark ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT MAKES IT SPECIAL — dark bg, 3+3 grid
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
              <Label light>Crafted with Reverence</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Plated Mangalsutra{" "}
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
                  Special
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
          WHY THOUSANDS TRUST REHNOOR — emerald bg
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
                <Label>The Trust We've Earned</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Thousands of Women Trust Rehnoor Jewels for Their{" "}
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
                    Mangalsutra
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
                  Buying a mangalsutra is not like buying any other piece of
                  jewellery. It is a deeply personal decision that deserves a
                  brand you can truly trust.
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
          THE PERFECT GIFT — ivory bg
          Unique: 5 gift occasions in a 3+2 grid
          "Just Because" is the most human gift occasion
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Gift with Meaning</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                The Perfect Gift <br /> Gold Plated Mangalsutra{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  for Every Occasion
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
                A mangalsutra from Rehnoor Jewels is one of the most heartfelt
                gifts you can give to a woman you love.
              </motion.p>
            </motion.div>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {GIFT_OCCASIONS.slice(0, 3).map((g, i) => (
              <motion.div
                key={g.occasion}
                variants={fadeUp}
                custom={i * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: g.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !g.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                {/* Gift icon as watermark */}
                <span className="absolute top-4 right-5 text-5xl select-none pointer-events-none opacity-5">
                  🎁
                </span>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase mb-3"
                  style={{
                    color: g.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {g.occasion}
                </p>
                <p
                  className="leading-relaxed text-sm"
                  style={{
                    color: g.dark ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom 2 — includes "Just Because" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:max-w-2xl sm:mx-auto">
            {GIFT_OCCASIONS.slice(3).map((g, i) => (
              <motion.div
                key={g.occasion}
                variants={fadeUp}
                custom={(i + 3) * 0.15}
                className="relative p-6 sm:p-7 rounded-2xl overflow-hidden"
                style={{
                  background: g.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !g.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                <span className="absolute top-4 right-5 text-5xl select-none pointer-events-none opacity-5">
                  🎁
                </span>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase mb-3"
                  style={{
                    color: g.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {g.occasion}
                </p>
                <p
                  className="leading-relaxed text-sm"
                  style={{
                    color: g.dark ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                  }}
                >
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* "No wrapping required" note */}
          <motion.div variants={fadeUp} custom={5} className="text-center mt-8">
            <span
              className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(0,55,32,0.07)",
                border: "1px solid rgba(0,55,32,0.12)",
                color: "var(--rj-emerald)",
              }}
            >
              <Gift size={11} /> Every piece arrives beautifully packaged — no
              wrapping required, just love
            </span>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CARE TIPS — dark bg, 3+2 layout
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
          <div className="text-center mb-10">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Care & Preservation</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Caring for Your Mangalsutra{" "}
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
                  Simple Habits for Lasting Shine
                </em>
              </h2>
            </motion.div>
          </div>

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
      </Section>

      {/* ══════════════════════════════════════════════════
          REVIEWS — ivory wrapper with charcoal inner
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Worn with Love</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Our Customers{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
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
                  About Our{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Mangalsutra Collection
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
          CTA FOOTER — dark bg, sacred editorial close
          Unique: "you feel" closing — more personal than
          "your style" — mirrors the sacred weight of piece
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
              "linear-gradient(90deg, transparent, rgba(252,193,81,0.5), transparent)",
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
              Shop Gold Plated Mangalsutra
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

          {/* Sacred closing quote */}
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
            Your mangalsutra is more than something you wear, it is something
            you feel.
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
            At Rehnoor Jewels, every gold plated mangalsutra in our collection
            is crafted with the reverence that this sacred piece deserves.
            Whether you are a new bride, a modern wife, or someone looking for a
            meaningful gift, our collection has a mangalsutra for women that was
            made for your story. Shop today and wear your love with pride.
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
