// app/collections/earrings-for-women/component/EarringsForWomen.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Star,
  Truck,
  ChevronRight,
  ChevronLeft,
  Gem,
  Sun,
  Droplets,
  Heart,
  Quote,
  Sparkles,
  Wind,
  TrendingUp,
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

interface CollectionCategory {
  name: string;
  desc: string;
  tag: string;
  icon: string;
  dark: boolean;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface StyleTip {
  context: string;
  desc: string;
  num: string;
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
  { value: "6+", label: "Earring Styles" },
  { value: "Anti-Tarnish", label: "Coating" },
  { value: "Skin-Safe", label: "Hypoallergenic" },
  { value: "50K+", label: "Happy Customers" },
];

const TRENDING_NOW = [
  {
    trend: "Chunky Gold Hoops",
    desc: "Oversized statement hoops that make a bold impression with any outfit.",
  },
  {
    trend: "Minimal Stud Multiples",
    desc: "Stud earrings worn in multiples along the ear for a curated, editorial look.",
  },
  {
    trend: "Ethnic Jhumkas & Chandbali",
    desc: "Making a strong comeback with modern outfits ethnic-inspired and trending hard.",
  },
  {
    trend: "Nature-Themed Designs",
    desc: "Floral motifs, leaf shapes, and celestial elements for a personal, story-driven look.",
  },
  {
    trend: "Mix & Match Asymmetric",
    desc: "Wear two different styles together for an asymmetric, fashion-forward effect.",
  },
  {
    trend: "Pearl-Drop Gold Earrings",
    desc: "Combining classic pearls with contemporary gold for a timeless-yet-fresh aesthetic.",
  },
];

const COLLECTION_CATEGORIES: CollectionCategory[] = [
  {
    name: "Statement & Geometric",
    desc: "From clean geometric links and wide band designs to chunky radiant finishes and sculptural three-dimensional pieces. These are built for women who like their jewellery to do the talking.",
    tag: "Bold",
    icon: "◈",
    dark: true,
  },
  {
    name: "Hoop Gold",
    desc: "Hoops never go out of style. From crystal cascade hoops to woven chain designs and golden halo hoops small or bold, simple or textured, there is a hoop here for every woman.",
    tag: "Classic",
    icon: "○",
    dark: false,
  },
  {
    name: "Stud Gold",
    desc: "Sometimes the most elegant choice is the simplest one. Pavé-set designs, diamond ribbon studs, and character-inspired pieces you reach for every single morning without thinking twice.",
    tag: "Everyday",
    icon: "●",
    dark: false,
  },
  {
    name: "Nature & Character Inspired",
    desc: "Clover earrings, starfish designs, sparrow motifs, rocking horse sweetness, and distinctive owl designs each piece in this category tells its own small story.",
    tag: "Whimsical",
    icon: "✦",
    dark: true,
  },
  {
    name: "Pearl & Vintage",
    desc: "For women who love a classic, refined aesthetic pearl-accented designs and vintage-inspired gold plated earrings that feel both timeless and deeply personal.",
    tag: "Timeless",
    icon: "◇",
    dark: false,
  },
  {
    name: "Special Edition",
    desc: "Our Noor-e-Luck and Noor-e-Parinda designs go beyond just looking beautiful. Crafted for the woman who wants her jewellery to mean something for herself or someone she loves.",
    tag: "Meaningful",
    icon: "⬟",
    dark: false,
  },
];

const MOST_ATTRACTIVE = [
  {
    style: "Hoops",
    desc: "Classic, versatile, and universally flattering. A gold hoop earring works on every face shape and with every kind of outfit.",
    icon: "○",
  },
  {
    style: "Jhumkas",
    desc: "The timeless Indian earring that never goes out of style. Elegant with ethnic wear and surprisingly chic with denim.",
    icon: "⌿",
  },
  {
    style: "Drop & Dangle",
    desc: "These create beautiful movement and draw attention to the face in a very elegant way, a universally attractive choice.",
    icon: "⬇",
  },
  {
    style: "Stud Earrings",
    desc: "Simple, clean, and always appropriate. A well-crafted gold stud is one of the most attractive earrings for everyday wear.",
    icon: "●",
  },
  {
    style: "Chandbali",
    desc: "Rich, traditional, and deeply feminine. Consistently rated among the most beautiful earrings for festive occasions.",
    icon: "◐",
  },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Quality Gold Plating",
    desc: "Every pair of gold plated earrings carries a thick, rich gold finish that genuinely looks luxurious not something you have to squint to see.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "A protective layer that keeps your earrings from losing their shine with regular wear so they look as good months later as they did on day one.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Safe & Hypoallergenic",
    desc: "Crafted with hypoallergenic, skin-friendly base metals so your ears stay comfortable all day long even for women with sensitive ears.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight Comfort",
    desc: "Even our larger statement earrings are designed to be lightweight, so you can wear them for hours without any discomfort or heaviness.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Price",
    desc: "Beautiful gold plated earrings should not be a luxury only some women can afford. At Rehnoor Jewels, they never are.",
  },
  {
    icon: <Truck size={18} />,
    title: "Pan-India Delivery",
    desc: "Your favourite pair of earrings reaches your doorstep safely, wherever you are in India.",
  },
];

const STYLE_TIPS: StyleTip[] = [
  {
    context: "For Everyday Wear",
    desc: "A pair of simple gold stud earrings or small hoops paired with a casual outfit and tied-back hair keeps things clean, elegant, and effortless.",
    num: "01",
    dark: true,
  },
  {
    context: "For the Office",
    desc: "Choose minimal drop earrings or sleek gold hoops. They add personality to your professional look without being distracting.",
    num: "02",
    dark: false,
  },
  {
    context: "For Festive Occasions",
    desc: "Go bold with jhumkas, chandbali earrings, or layered tassel designs paired with a saree or lehenga. These gold plated earrings make every festive look complete.",
    num: "03",
    dark: false,
  },
  {
    context: "For Date Night",
    desc: "Long dangle earrings paired with a dress or a silk top create an effortlessly romantic look that always gets noticed.",
    num: "04",
    dark: true,
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your earrings gently with a soft, dry cloth after every use to remove oils, sweat, and dust.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your gold plated earrings in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "Always remove your earrings before bathing, swimming, washing your face, or applying perfume and skincare products.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Keep your earrings separate from other jewellery to prevent scratching on the gold plated surface.",
  },
  {
    icon: <Zap size={15} />,
    tip: "For a deeper clean, use a cloth lightly dampened with mild soapy water, clean gently, and dry thoroughly before storing.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "Are gold plated earrings for women safe for sensitive ears?",
    a: "Yes! Our gold plated earrings for women are crafted with skin-friendly, hypoallergenic base metals designed to be gentle on most skin types. The smooth gold plated finish adds an extra layer of protection. If you have a known severe metal allergy, we suggest consulting a specialist before purchase, but most women with sensitive ears wear our pieces comfortably every day.",
  },
  {
    q: "How long do gold plated earrings for women last?",
    a: "With proper care, our gold plated earrings for women can retain their beautiful finish for 1 to 2 years or longer. Keeping them away from water, sweat, and harsh chemicals and storing them correctly significantly extends their lifespan.",
  },
  {
    q: "What is the latest trend in jewellery?",
    a: "Current jewellery trends include oversized gold hoop earrings, layered ethnic jhumkas, pearl-drop designs, nature-inspired motifs, and minimalist ear cuffs. Mix-and-match styles and asymmetric earring looks are also hugely popular right now.",
  },
  {
    q: "What earrings are most attractive?",
    a: "Attractiveness depends on personal style and face shape, but universally loved styles include gold hoop earrings, jhumkas, dangle earrings, and clean gold studs. A well-crafted gold plated earring in any of these styles will always turn heads.",
  },
  {
    q: "Can 1 gram of gold make an earring?",
    a: "Technically, yes - a very small stud can be made from 1 gram of gold. But solid gold is expensive even at that small quantity. Gold plated earrings for women offer the same beautiful gold look at a far more accessible price, which is exactly what we offer at Rehnoor Jewels.",
  },
  {
    q: "What earrings are trendy right now?",
    a: "Trendy earrings right now include big textured gold hoops, jhumkas and chandbalis in warm gold tones, geometric abstract earrings, tassel earrings, and minimalist huggie hoops. All of these styles are available in our gold plated earrings for women collection.",
  },
  {
    q: "Can I gift earrings from Rehnoor Jewels?",
    a: "Absolutely. Our earrings for women make thoughtful, personal gifts for birthdays, anniversaries, Diwali, Rakhi, and other special occasions. Every piece comes beautifully packaged and ready to gift.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Divya Menon",
    city: "Chennai",
    text: "I was unsure about buying gold plated earrings online, but Rehnoor Jewels completely changed my mind. The finish is gorgeous, and after weeks of daily wear, they still look brand new.",
  },
  {
    name: "Pooja Sharma",
    city: "Lucknow",
    text: "Ordered pearl earrings as a birthday gift for my mother, and she absolutely loved them. The quality was beyond what I expected at this price.",
  },
  {
    name: "Rhea Kapoor",
    city: "Gurgaon",
    text: "I have sensitive ears, and most earrings bother me within an hour, but Rehnoor Jewels earrings I wore all day without any irritation. Finally found my go-to brand.",
  },
  {
    name: "Naina Verma",
    city: "Bhopal",
    text: "The stud earrings I ordered are so elegant and perfectly sized for everyday office wear. I get compliments on them every single time I wear them.",
  },
  {
    name: "Sana Sheikh",
    city: "Hyderabad",
    text: "Bought three pairs in one order and every single one of them is stunning. I love that they are affordable without looking cheap even slightly.",
  },
  {
    name: "Preethi Nair",
    city: "Kochi",
    text: "Gifted the owl earrings to my best friend, and she was completely obsessed with the detailing. Rehnoor Jewels clearly puts real care into every piece.",
  },
  {
    name: "Aisha Siddiqui",
    city: "Jaipur",
    text: "Wore my Rehnoor Jewels earrings to a family wedding, and multiple people assumed they were solid gold. The quality truly speaks for itself.",
  },
  {
    name: "Tanvi Desai",
    city: "Ahmedabad",
    text: "The vintage earrings I ordered pair so beautifully with both ethnic and western outfits. Will definitely be ordering more from Rehnoor Jewels.",
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
      custom={index * 0.25}
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
export default function EarringsForWomen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* Hero Section */}
      <Section
        className="relative py-14 overflow-hidden"
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
              "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(252,193,81,0.03) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(252,193,81,0.4), transparent)",
          }}
        />

        <div className="container-rj section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
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
              Earrings{" "}
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

            {/* Unique: sensory "feel right" editorial subtitle */}
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
              Some pieces feel right the moment you put them on.
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
              Whether you are heading out for the day, attending a function, or
              just want to feel put together at home the right pair of earrings
              quietly makes everything better. At Rehnoor Jewels, we have built
              a collection of gold plated earrings for women that covers every
              mood, every occasion, and every personal style without asking you
              to spend a fortune.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* WHY EARRINGS ARE THE MOST LOVED */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left — prose */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>The Most Loved Accessory</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Earrings for Women Are{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Irreplaceable
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
                Ask any woman what the one accessory she cannot leave the house
                without is, and nine times out of ten, it will be earrings.
                Earrings for women have the special power of completing an
                outfit without any effort. You could be wearing the simplest
                kurta or a plain western top, and a good pair of earrings
                completely transforms the way you look and feel.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="leading-relaxed"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "clamp(0.92rem,1.8vw,1.05rem)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.95",
                }}
              >
                What makes earrings so universally loved is how easy they are to
                wear. They do not need adjustment during the day. They stay in
                place. They frame your face in the most flattering way. And when
                they are made well like our{" "}
                <strong
                  style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                >
                  gold plated earrings for women
                </strong>{" "}
                at Rehnoor Jewels they look like they cost far more than they
                actually do.
              </motion.p>
            </div>

            {/* Right — 5 attractive styles */}
            <div className="flex flex-col gap-3">
              {MOST_ATTRACTIVE.map((item, i) => (
                <motion.div
                  key={item.style}
                  variants={fadeUp}
                  custom={i * 0.15}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--rj-bone)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.09)",
                    borderColor: "rgba(252,193,81,0.35)",
                  }}
                >
                  <span
                    className="text-2xl flex-shrink-0 mt-0.5 font-cormorant"
                    style={{ color: "var(--rj-emerald)", width: 28 }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      className="font-cinzel text-[11px] tracking-wider font-bold mb-1.5"
                      style={{ color: "var(--rj-charcoal)" }}
                    >
                      {item.style}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--rj-ash)",
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

      {/* WHAT'S TRENDING — dark bg*/}
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
              <div className="inline-flex items-center gap-2 mb-3">
                <TrendingUp size={14} style={{ color: "var(--rj-gold)" }} />
                <p
                  className="font-cinzel text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--rj-gold)" }}
                >
                  2025 · 2026 Trends
                </p>
              </div>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Earrings Are{" "}
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
                  Trending Right Now
                </em>
              </h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 max-w-xl mx-auto"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.95rem",
                }}
              >
                The best part about gold plated earrings is that you can follow
                every trend without locking yourself into one expensive look.
                Refresh as trends evolve, without the cost.
              </motion.p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRENDING_NOW.map((item, i) => (
              <motion.div
                key={item.trend}
                variants={fadeUp}
                custom={i * 0.1}
                className="p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{
                  background: "rgba(252,193,81,0.06)",
                  borderColor: "rgba(252,193,81,0.2)",
                  y: -2,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: "var(--rj-gold)",
                      boxShadow: "0 0 6px rgba(252,193,81,0.5)",
                    }}
                  />
                  <h3
                    className="font-cinzel text-[11px] tracking-wider font-bold"
                    style={{ color: "#fff" }}
                  >
                    {item.trend}
                  </h3>
                </div>
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
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* COLLECTION AT A GLANCE */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>The Collection</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                Our Earrings for Women{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Collection at a Glance
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
                Curated with one clear goal to give every woman access to a
                piece that feels made for her.
              </motion.p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLLECTION_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                custom={i * 0.1}
                className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: cat.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !cat.dark ? "1px solid var(--rj-bone)" : "none",
                }}
                whileHover={{
                  y: cat.dark ? -3 : -2,
                  boxShadow: cat.dark
                    ? "0 12px 32px rgba(0,0,0,0.25)"
                    : "0 12px 32px rgba(0,0,0,0.1)",
                  borderColor: !cat.dark ? "rgba(252,193,81,0.35)" : undefined,
                }}
              >
                {/* Watermark icon */}
                <span
                  className="absolute top-4 right-5 text-5xl select-none pointer-events-none font-cormorant"
                  style={{
                    color: cat.dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,55,32,0.05)",
                    lineHeight: 1,
                  }}
                >
                  {cat.icon}
                </span>

                <div className="flex items-center gap-2 flex-wrap mb-3 relative z-10">
                  <span
                    className="text-lg font-cormorant"
                    style={{
                      color: cat.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                    }}
                  >
                    {cat.icon}
                  </span>
                  <span
                    className="font-cinzel text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full"
                    style={{
                      background: cat.dark
                        ? "rgba(252,193,81,0.12)"
                        : "rgba(0,55,32,0.08)",
                      color: cat.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                      border: `1px solid ${cat.dark ? "rgba(252,193,81,0.2)" : "rgba(0,55,32,0.12)"}`,
                    }}
                  >
                    {cat.tag}
                  </span>
                </div>

                <h3
                  className="font-cinzel text-sm tracking-wider font-bold mb-2 relative z-10"
                  style={{ color: cat.dark ? "#fff" : "var(--rj-charcoal)" }}
                >
                  {cat.name}
                </h3>
                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{
                    color: cat.dark
                      ? "rgba(255,255,255,0.55)"
                      : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.75",
                  }}
                >
                  {cat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHAT MAKES US STAND OUT */}
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
              <Label light>Why Rehnoor Jewels</Label>
              <h2
                className="font-cormorant font-light leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Plated Earrings{" "}
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
                  Stand Out
                </em>
              </h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="max-w-xl mx-auto"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.92rem",
                }}
              >
                There are a lot of jewellery brands online. Here is the honest
                answer to why women across India choose us.
              </motion.p>
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

      {/* HOW TO STYLE */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Styling Ideas</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                How to Style Your{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Earrings for Women
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
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: tip.dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,55,32,0.04)",
                  }}
                >
                  {tip.num}
                </span>
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

      {/* CARE TIPS */}
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
              <Label light>Care Tips</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                Simple Care Tips to Keep Your Earrings{" "}
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
                  Looking New
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
            {CARE_TIPS.slice(3).map((tip, i) => (
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

      {/* REVIEWS */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>What Women Are Saying</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Our Customers Say About{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Our Earrings
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

      {/* FAQ */}
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
                  Everything About{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Earrings for Women
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

      {/* CTA FOOTER */}
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
            <Label light>Find Your Earrings</Label>
            <h2
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem,5vw,3.5rem)",
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              The Right Earrings Are Waiting
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
                for You at Rehnoor Jewels
              </em>
            </h2>
          </motion.div>

          {/* Unique generous closing */}
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
            You deserve to wear something beautiful every single day.
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
            From a classic gold stud for everyday wear to a showstopping
            chandbali for a wedding, our gold plated earrings for women are
            crafted with real care, premium materials, and an honest commitment
            to quality. Browse our collection today and find the pair that was
            made for you.
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
              Premium Collections <ChevronRight size={13} />
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
