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

// DATA
const TRENDING_NOW = [
  {
    trend: "Rich Gold Plating",
    desc: "Every gold plated necklace with earrings features a warm, luxurious gold finish designed to capture attention and elevate your style effortlessly.",
  },
  {
    trend: "Anti-Tarnish Protection",
    desc: "Enhanced with a protective anti-tarnish coating that helps preserve the brilliance, colour, and shine of your jewellery through regular wear.",
  },
  {
    trend: "Skin-Friendly Craftsmanship",
    desc: "Made using carefully selected skin-safe materials and a smooth plated finish, ensuring comfort even for sensitive skin types.",
  },
  {
    trend: "Lightweight Comfort",
    desc: "Thoughtfully designed to feel light and comfortable, allowing you to wear your necklace set all day for work, celebrations, or special occasions.",
  },
  {
    trend: "Premium Look, Smart Price",
    desc: "Experience the elegance and sophistication of luxury jewellery without the premium price tag, making everyday glamour more accessible.",
  },
  {
    trend: "Perfect for Every Occasion",
    desc: "From festive celebrations and weddings to casual outings and office wear, these versatile necklace sets complement every moment beautifully.",
  },
];

const COLLECTION_CATEGORIES: CollectionCategory[] = [
  {
    name: "Choker Necklace Sets",
    desc: "Elegant gold plated chokers paired with matching drop earrings for a refined and contemporary look. Perfect for festive gatherings, cocktail evenings, and statement styling.",
    tag: "Modern",
    icon: "◈",
    dark: true,
  },
  {
    name: "Layered Necklace Sets",
    desc: "Beautifully layered necklaces combined with coordinated stud earrings to create a fashionable stacked aesthetic that feels effortlessly luxurious.",
    tag: "Trending",
    icon: "○",
    dark: false,
  },
  {
    name: "Minimal Everyday Sets",
    desc: "Delicate chain necklaces with understated earrings designed for daily wear. Lightweight, versatile, and perfect for office, brunch, or casual outings.",
    tag: "Everyday",
    icon: "●",
    dark: false,
  },
  {
    name: "Traditional Jhumka Sets",
    desc: "Classic gold plated necklaces paired with elegant jhumka earrings, bringing together timeless Indian craftsmanship and contemporary comfort.",
    tag: "Ethnic",
    icon: "✦",
    dark: true,
  },
  {
    name: "Pearl & Classic Sets",
    desc: "Sophisticated pearl-accented necklace sets with matching earrings that offer a graceful balance of vintage charm and modern elegance.",
    tag: "Timeless",
    icon: "◇",
    dark: false,
  },
  {
    name: "Statement Occasion Sets",
    desc: "Bold statement necklaces with chandelier earrings designed for weddings, festive celebrations, parties, and special occasions where you want to stand out.",
    tag: "Luxury",
    icon: "⬟",
    dark: false,
  },
];

const MOST_ATTRACTIVE = [
  {
    style: "Royal Heritage Set",
    desc: "Inspired by timeless royal jewellery, this gold-plated necklace and earring set blends intricate craftsmanship with graceful elegance.",
    icon: "♛",
  },
  {
    style: "Layered Luxe Set",
    desc: "Multiple cascading layers create depth and sophistication, making this one of the most admired styles for modern celebrations.",
    icon: "✦",
  },
  {
    style: "Pearl Fusion Set",
    desc: "Gold plating paired with luminous pearls offers a refined balance of classic beauty and contemporary charm.",
    icon: "◌",
  },
  {
    style: "Minimal Elegance Set",
    desc: "Clean lines and subtle detailing make this necklace and earring combination a versatile favorite for everyday luxury.",
    icon: "◇",
  },
  {
    style: "Bridal Statement Set",
    desc: "Bold, radiant, and unforgettable, this gold-plated necklace set with matching earrings is designed to be the centerpiece of special occasions.",
    icon: "✧",
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
    context: "Wedding & Festive Styling",
    desc: "Pair an ornate gold plated necklace with matching earrings alongside sarees, lehengas, or designer ethnic wear to create a rich, celebration-ready look that feels timeless and elegant.",
    num: "01",
    dark: true,
  },
  {
    context: "Elegant Ethnic Wear",
    desc: "A refined necklace set featuring a graceful chain and delicate earrings perfectly complements kurtas, Anarkalis, and Indo-western outfits without overwhelming the overall look.",
    num: "02",
    dark: false,
  },
  {
    context: "Modern Everyday Fashion",
    desc: "Minimal gold plated necklace sets with subtle earrings pair beautifully with dresses, blazers, co-ord sets, and office wear, adding sophistication to your daily wardrobe.",
    num: "03",
    dark: false,
  },
  {
    context: "Meaningful Gifting",
    desc: "Whether for birthdays, anniversaries, Rakhi, or festive occasions, a gold plated necklace with earrings is a thoughtful gift that combines beauty, practicality, and lasting charm.",
    num: "04",
    dark: true,
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your gold plated necklace and earrings gently with a soft, dry cloth after every wear to remove dust, oils, and moisture while maintaining their shine.",
  },
  {
    icon: <Zap size={15} />,
    tip: "For a deeper clean, use a soft cloth lightly dampened with mild soapy water, then dry the necklace set completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store your gold plated necklace with earrings in a dry, airtight jewellery pouch or box to help preserve its colour and finish.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "Keep your jewellery away from perfumes, skincare products, water, sweat, and other chemicals that may affect the gold plating over time.",
  },
  {
    icon: <Gem size={15} />,
    tip: "Store your necklace set separately from other metal jewellery and avoid tangling chains to prevent scratches and preserve its polished appearance.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "Is a gold plated necklace with earrings suitable for daily wear?",
    a: "Yes. Our necklace set for women is designed for regular use and everyday styling. With simple care habits such as keeping it away from water, perfumes, and excessive sweat, the gold plated finish can remain beautiful for a long time.",
  },
  {
    q: "How long does a gold plated necklace set for women last?",
    a: "With proper care, a gold plated necklace with earrings from Rehnoor Jewels can retain its shine and finish for 1 to 2 years or even longer. Our premium anti-tarnish coating helps preserve the richness of the gold plating through regular wear.",
  },
  {
    q: "Are your necklace sets safe for sensitive skin?",
    a: "Yes. Our necklace sets are crafted using skin-friendly base metals and finished with high-quality gold plating. Most customers with sensitive skin wear them comfortably. If you have a known severe metal allergy, we recommend consulting a specialist before purchase.",
  },
  {
    q: "Can I gift a gold plated necklace with earrings from Rehnoor Jewels?",
    a: "Absolutely. Every necklace set for women from Rehnoor Jewels arrives in elegant packaging and makes a thoughtful gift for birthdays, anniversaries, Rakhi, Diwali, weddings, and other special occasions.",
  },
  {
    q: "Do you offer free size adjustment on necklace sets?",
    a: "Our necklace sets are available in standard lengths designed to suit most women comfortably. Product-specific sizing information can be found on each product page. For customization-related questions, our support team will be happy to assist.",
  },
  {
    q: "What is the difference between a gold plated and solid gold necklace set?",
    a: "A solid gold necklace is made entirely of gold, whereas a gold plated necklace with earrings features a high-quality base metal coated with a layer of gold. Gold plated jewellery offers the same luxurious appearance at a much more affordable price, making it ideal for everyday fashion and special occasions.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes. Rehnoor Jewels offers pan-India delivery. Every gold plated necklace set for women is carefully inspected, securely packaged, and shipped to your doorstep regardless of your location within India.",
  },
  {
    q: "Will the gold plating fade over time?",
    a: "Like all gold plated jewellery, the finish may gradually wear with frequent exposure to water, chemicals, and friction. However, our anti-tarnish coating and proper care practices help extend the life and beauty of your necklace set significantly.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered a necklace set for women from Rehnoor Jewels, and it is honestly the piece I wear the most now. The gold finish is so rich and warm that everyone thinks it is real gold. Absolutely love it!",
  },
  {
    name: "Sneha Patel",
    city: "Mumbai",
    text: "Been wearing my gold plated necklace with earrings every single day for months, and it still looks as beautiful as when I first received it. The anti-tarnish coating genuinely works. Rehnoor Jewels has a loyal customer in me!",
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    text: "The necklace set for women I ordered is so elegant, and the finish is incredibly precise. It pairs beautifully with everything from a saree to a casual kurta. Such a versatile and beautiful piece!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "I gifted a gold plated necklace set for women to my best friend on her birthday, and she was genuinely surprised by the quality. She thought it was far more expensive than it was. That says everything about Rehnoor Jewels!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "I wore my gold plated necklace with earrings to a family wedding and received so many compliments. The detailing is so precise, and the finish is so rich. Rehnoor Jewels truly delivers on quality!",
  },
  {
    name: "Simran Kaur",
    city: "Chandigarh",
    text: "My mother gifted me a gold plated necklace set for women from Rehnoor Jewels for Diwali, and I have worn it every day since. So comfortable, so elegant, and the gold finish is gorgeous. A truly wonderful gift!",
  },
];

const REHNOOR_ADVANTAGES = [
  {
    title: "Transparent Craftsmanship",
    desc: "We are honest about what we create. Every piece is beautifully gold plated and crafted to deliver the look of luxury jewellery without the premium solid-gold price tag.",
    icon: "◇",
  },
  {
    title: "Premium Anti-Tarnish Finish",
    desc: "Each necklace set is finished with a protective anti-tarnish coating that helps preserve its shine, colour, and elegance through regular wear.",
    icon: "✦",
  },
  {
    title: "Skin-Safe & Comfortable",
    desc: "Crafted using skin-friendly materials and lightweight construction, our jewellery is designed for all-day comfort, even for sensitive skin.",
    icon: "◈",
  },

  {
    title: "Quality Checked Before Dispatch",
    desc: "Every order undergoes detailed quality inspection so the piece you receive looks exactly as beautiful as the one you selected online.",
    icon: "○",
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
export default function NecklaceSet() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* Hero Section */}
      <Section
        className="relative py-14 overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        <div className="container-rj section-padding relative z-10">
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
                Necklace With Earrings
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
              Ready to Wear Necklace Set for Women
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
              Some jewellery pieces just have that effect. You put them on, and
              the whole outfit comes together. A gold plated necklace with
              earrings is exactly that kind of piece. It does not just sit on
              your neck; it completes a look. At Rehnoor Jewels, our necklace
              set for women collection is built around that very idea:
              beautiful, wearable jewellery that works for your life, your
              style, and your budget.
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
                  Why a Necklace Set for Women{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Just Makes Sense
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
                Buying a necklace and earrings separately can be tricky. You
                spend time matching finishes, trying to find the right pairing,
                and sometimes still end up with pieces that just do not sit
                right together. A gold plated necklace set for women solves all
                of that in one go. The necklace and earrings are designed as a
                unit, so everything is already balanced in terms of design,
                finish, and proportion.
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
                Whether you are dressing up for a wedding, going to a family
                dinner, heading to work, or just stepping out casually, a
                well-crafted{" "}
                <strong
                  style={{ color: "var(--rj-charcoal)", fontWeight: 600 }}
                >
                  gold plated necklace with earrings
                </strong>{" "}
                pulls everything together without you having to think too hard
                about it. That is the kind of effortless elegance every woman
                deserves.
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
                  Latest Editions
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
                What Makes Our Gold Plated Necklace <br />
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
                  With Earrings Different
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
                At Rehnoor Jewels, we put a lot of thought into every necklace
                set for women we craft. Here is what you will find in every
                piece from our collection:
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
                Styles Available in Our Necklace Set{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  for Women Collection
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
                We know that every woman has her own taste, which is why our
                gold plated necklace set for women collection spans a wide range
                of styles. Here is a quick look at what you can find.
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
                How to Style Your Gold Plated{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Necklace With Earrings
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
                One of the best things about a gold plated necklace set for
                women is how versatile it is. Here are some simple ways to wear
                yours.
              </motion.p>
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
                Simple Care Tips to Keep Your Set{" "}
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

      {/* Why Rehnoor + Best Gift */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left Content */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>The Perfect Gift</Label>

                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  A Necklace Set for Every{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Occasion
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
                If you have been looking for a gift that genuinely feels
                special, a{" "}
                <strong
                  style={{
                    color: "var(--rj-charcoal)",
                    fontWeight: 600,
                  }}
                >
                  gold plated necklace with earrings
                </strong>{" "}
                from Rehnoor Jewels is one of the most thoughtful choices you
                can make. Beautifully packaged and ready to present, each
                necklace set combines elegance, practicality, and timeless
                appeal.
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
                Whether it is a birthday, wedding anniversary, Rakhi, Karwa
                Chauth, Diwali, or simply a gesture of love without a special
                occasion, a beautifully crafted necklace set for women always
                leaves a lasting impression.
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
                The luxurious look, premium finish, and surprisingly affordable
                pricing make every Rehnoor Jewels piece feel far more valuable
                than its price tag suggests.
              </motion.p>
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-3">
              <motion.div variants={fadeUp}>
                <Label>Why Choose Rehnoor</Label>

                <h3
                  className="font-cormorant font-light mb-6"
                  style={{
                    fontSize: "clamp(1.5rem,3vw,2.3rem)",
                    color: "var(--rj-charcoal)",
                  }}
                >
                  Why Women Across India Trust{" "}
                  <em style={{ color: "var(--rj-emerald)" }}>Rehnoor Jewels</em>
                </h3>
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {REHNOOR_ADVANTAGES.map((item, i) => (
                  <motion.div
                    key={item.title}
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
                      style={{
                        color: "var(--rj-emerald)",
                        width: 28,
                      }}
                    >
                      {item.icon}
                    </span>

                    <div>
                      <p
                        className="font-cinzel text-[11px] tracking-wider font-bold mb-1.5"
                        style={{
                          color: "var(--rj-charcoal)",
                        }}
                      >
                        {item.title}
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
              </motion.div>
            </div>
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
                Jewelley Set Loved by Women{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
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
                Do not just take our word for it. Here is what women across
                India have to say about our gold plated necklace with earrings
                collection.
              </motion.p>
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
                    Our Equisite Jewellery Sets
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
              Shop Luxury Ready to Wear Sets
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
            className="max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(0.9rem,2vw,1.05rem)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              lineHeight: "1.85",
            }}
          >
            At Rehnoor Jewels, our necklace set for women collection is crafted
            for every woman who wants to wear something that feels genuinely
            special without spending a fortune. Browse our gold plated necklace
            set for women collection today and find the one that speaks to your
            style, your story, and your everyday moments.
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
