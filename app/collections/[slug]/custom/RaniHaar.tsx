// app/collections/rani-haar/component/RaniHaar.tsx
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
  Crown,
  Sparkles,
  Wind,
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
      <span style={{ color: "var(--rj-gold)", fontSize: "12px" }}>♛</span>
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
      ♛ {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "Royal", label: "Craftsmanship" },
  { value: "Anti-Tarnish", label: "Coating" },
  { value: "Bridal", label: "Grade Quality" },
  { value: "50K+", label: "Happy Customers" },
];

const SPECIAL_FEATURES: Feature[] = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Every Rani Haar is finished with high-quality gold plating that gives it the warm, lustrous glow of real gold — rich, beautiful, and genuinely regal.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "Our protective anti-tarnish finish preserves the shine and colour through regular wear and storage, keeping your piece as radiant as the day you received it.",
  },
  {
    icon: <Crown size={18} />,
    title: "Intricate Craftsmanship",
    desc: "Every motif, every bead, and every setting is crafted with precision and care — because a piece this significant deserves nothing less than exceptional attention to detail.",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight Despite the Drama",
    desc: "Crafted to look heavy and grand while remaining comfortable enough to wear through long celebrations — because royalty should never be uncomfortable.",
  },
  {
    icon: <Heart size={18} />,
    title: "Skin-Safe Materials",
    desc: "Skin-friendly base metals and a smooth gold plated finish that is gentle on all skin types, even through long hours of festive and bridal wear.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Royalty",
    desc: "The grandeur of a Rani Haar should not be reserved for the privileged few. Royal elegance at a price that feels generous, not extravagant.",
  },
];

const WHY_ITEMS: WhyItem[] = [
  {
    icon: <Crown size={16} />,
    title: "A Deep Respect for Tradition",
    desc: "At Rehnoor Jewels, we do not just make jewellery. We honour a tradition that has been passed down through generations of Indian women. Every gold plated Rani Haar we craft carries that respect in every detail.",
  },
  {
    icon: <Star size={16} />,
    title: "Bridal Expertise",
    desc: "We understand what brides need — designs that photograph beautifully, pieces that are comfortable through long ceremonies, and quality that holds up through every emotional moment of the wedding day.",
  },
  {
    icon: <Gem size={16} />,
    title: "A Collection That Grows with You",
    desc: "Our Rani Haar collection is not just for brides. It is for every woman who wants to feel regal — at a family function, a festive puja, a sangeet night, or a grand anniversary dinner.",
  },
  {
    icon: <BadgeCheck size={16} />,
    title: "Quality You Can See and Feel",
    desc: "The weight of our beads, the precision of our settings, the warmth of our gold plating — everything about our Rani Haar collection is designed to feel as luxurious as it looks.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver safely and securely across India with careful, protective packaging that ensures your Rani Haar arrives in perfect condition — ready to be worn or gifted.",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "After every wear, gently wipe your Rani Haar with a soft, dry cloth to remove any moisture, sweat, or dust from the surface.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, wipe gently across all surfaces, and dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Always store your gold plated Rani Haar in a dry, airtight jewellery box or pouch — ideally laid flat or hung carefully to prevent tangling or damage to the layers.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Remove your Rani Haar before bathing, swimming, or applying perfumes and skincare products to protect the gold plating and keep it shining longer.",
  },
  {
    icon: <Crown size={15} />,
    tip: "Handle the beads, pendants, and settings with care during wear and storage to maintain the integrity of the craftsmanship over time.",
  },
];

const FAQS: FaqEntry[] = [
  {
    q: "What is a Rani Haar?",
    a: "A Rani Haar is a traditional Indian long necklace — the name literally translates to a queen's necklace. It is characterised by its long length, layered design, and intricate pendant or motif work. Historically worn by Indian queens and noblewomen, the Rani Haar today is one of the most popular bridal and festive jewellery styles across India.",
  },
  {
    q: "Is a gold plated Rani Haar suitable for bridal wear?",
    a: "Absolutely! Our gold plated Rani Haar designs are crafted with the grandeur and detail that bridal occasions demand. Many brides across India choose our Rani Haar for their wedding, reception, and other bridal functions, and love the quality, finish, and value they receive.",
  },
  {
    q: "How long is a Rani Haar?",
    a: "A traditional Rani Haar typically falls at or below the chest, making it significantly longer than a standard necklace. The exact length varies by design. Please check individual product listings for specific length details of each piece in our collection.",
  },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    text: "I ordered the kundan Rani Haar for my wedding and I am still receiving compliments about it months later. The detailing is absolutely breathtaking and the gold finish is so warm and regal. Every bride needs a piece from Rehnoor Jewels!",
  },
  {
    name: "Anjali Verma",
    city: "Mumbai",
    text: "The temple Rani Haar I ordered for Navratri was beyond stunning. Paired it with my silk saree and felt like a complete queen all evening. The craftsmanship is so precise and the finish is absolutely gorgeous!",
  },
  {
    name: "Deepika Reddy",
    city: "Hyderabad",
    text: "Ordered the pearl Rani Haar for my sister's reception and she was moved to tears when she saw it. The combination of gold plating and pearls is so elegant and timeless. Rehnoor Jewels made her day even more special!",
  },
  {
    name: "Meera Iyer",
    city: "Bangalore",
    text: "The layered Rani Haar I ordered is the most dramatic and beautiful piece of jewellery I own. Despite looking so heavy and grand it is surprisingly comfortable to wear. Absolutely love everything about it!",
  },
  {
    name: "Sunita Patel",
    city: "Ahmedabad",
    text: "I gifted the classic Rani Haar to my daughter as a wedding gift and she absolutely treasures it. The packaging was so beautiful and the piece itself was even more stunning in person. A truly royal gift from Rehnoor Jewels!",
  },
  {
    name: "Kavita Joshi",
    city: "Pune",
    text: "The meenakari Rani Haar I ordered is a true work of art. The colours are so vibrant, the craftsmanship is so detailed, and the gold plating is so rich and warm. Wore it to a family function and was the most complimented woman in the room!",
  },
  {
    name: "Ritu Agarwal",
    city: "Jaipur",
    text: "Finally found a brand that understands what Indian women actually want from their jewellery. The antique Rani Haar I ordered is so unique and so beautifully crafted. It looks like a genuine heirloom piece. Rehnoor Jewels is truly exceptional!",
  },
  {
    name: "Naina Gupta",
    city: "Lucknow",
    text: "The bridal Rani Haar set I ordered for my best friend's wedding was absolutely perfect. The complete set looked so coordinated and so regal on her. She felt like a true queen and the photographs are absolutely stunning!",
  },
  {
    name: "Simran Kaur",
    city: "Chandigarh",
    text: "I ordered the kundan Rani Haar for Diwali and it was the best purchase I made all year. The richness of the design, the warmth of the gold finish, and the precision of the stone settings — everything is just perfect!",
  },
  {
    name: "Ramya Krishnan",
    city: "Chennai",
    text: "The temple Rani Haar is everything I could have dreamed of for my wedding. So deeply traditional, so beautifully detailed, and so comfortable to wear through the entire ceremony. Rehnoor Jewels truly crafted something special!",
  },
  {
    name: "Ishita Bose",
    city: "Kolkata",
    text: "My mother ordered the pearl Rani Haar as a surprise anniversary gift for me and I genuinely could not believe the quality for the price. It looks so luxurious, so elegant, and so perfectly crafted. A piece I will cherish forever!",
  },
  {
    name: "Pooja Mishra",
    city: "Bhopal",
    text: "Was searching for the perfect Rani Haar for my cousin's wedding and Rehnoor Jewels delivered beyond all expectations. The layered design is stunning, the gold finish is rich and warm, and the packaging made it feel like a truly royal purchase. Will definitely be ordering again!",
  },
];

const RANI_HAAR_STYLES = [
  {
    name: "Kundan Rani Haar",
    tag: "Bridal",
    desc: "Rich, intricate kundan work set in gold plated frames — the quintessential bridal Rani Haar for wedding ceremonies and receptions.",
  },
  {
    name: "Temple Rani Haar",
    tag: "Traditional",
    desc: "Inspired by South Indian temple jewellery with deity motifs and traditional patterns, perfect for festive occasions and classical celebrations.",
  },
  {
    name: "Pearl Rani Haar",
    tag: "Elegant",
    desc: "A timeless combination of lustrous pearls and warm gold plating — elegant, graceful, and suited to weddings, anniversaries, and formal gatherings.",
  },
  {
    name: "Layered Rani Haar",
    tag: "Statement",
    desc: "Multi-strand layered design with dramatic length and presence — the ultimate statement piece for any grand occasion.",
  },
  {
    name: "Meenakari Rani Haar",
    tag: "Artistic",
    desc: "Vibrant enamel meenakari work in rich colours on gold plating — a true work of art that celebrates the finest traditions of Indian craftsmanship.",
  },
  {
    name: "Antique Rani Haar",
    tag: "Heirloom",
    desc: "An oxidised antique finish that gives each piece the look of a genuine family heirloom — unique, evocative, and deeply rooted in heritage.",
  },
  {
    name: "Classic Gold Rani Haar",
    tag: "Everyday Festive",
    desc: "Simple, graceful gold plated design with clean lines and warm colour — versatile enough for festive occasions, family functions, and daily wear.",
  },
  {
    name: "Bridal Rani Haar Set",
    tag: "Bridal Set",
    desc: "A complete coordinated bridal set with Rani Haar, earrings, and maangtika — everything a bride needs in one beautifully matched collection.",
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
export default function RaniHaar() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO — deep charcoal with regal crown motif
          Unique: full-width editorial prose opening,
          crown ♛ replaces ✦ throughout this page
      ══════════════════════════════════════════════════ */}
      <Section
        className="relative overflow-hidden py-24"
        style={{ background: "var(--rj-emerald-dark)" }}
      >
        {/* Multi-layer radial glows — more dramatic for bridal */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(252,193,81,0.08) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 80% 80%, rgba(252,193,81,0.04) 0%, transparent 65%)",
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
              "linear-gradient(90deg, transparent, rgba(252,193,81,0.15), transparent)",
          }}
        />

        <div className="container-rj section-padding relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Label light>Rehnoor Jewels · Bridal Collection</Label>
            </motion.div>

            {/* Regal crown icon above heading */}
            <motion.div
              variants={fadeIn}
              custom={0.5}
              className="flex justify-center mb-5"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(252,193,81,0.1)",
                  border: "1px solid rgba(252,193,81,0.25)",
                }}
              >
                <Crown size={28} style={{ color: "var(--rj-gold)" }} />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="font-cormorant font-light leading-tight mb-4"
              style={{
                fontSize: "clamp(2.4rem,7vw,5rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Rani Haar
            </motion.h2>

            {/* Unique: editorial subtitle — The Necklace Born for Queens */}
            <motion.p
              variants={fadeUp}
              custom={1.5}
              className="font-cormorant font-light italic"
              style={{
                fontSize: "clamp(1rem,2.5vw,1.35rem)",
                color: "rgba(252,193,81,0.65)",
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
              }}
            >
              The Necklace That Was Born for Queens
            </motion.p>

            <GoldDivider />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 leading-relaxed max-w-2xl mx-auto"
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "clamp(0.95rem,2vw,1.1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.9",
              }}
            >
              The name says it all. Rani Haar, literally meaning a{" "}
              <b>'queen's necklace'</b> has been one of the most celebrated and
              cherished jewellery styles in Indian culture for centuries. Long,
              layered, and steeped in tradition, a Rani Haar is the kind of
              piece that transforms an outfit, elevates a look, and makes every
              woman who wears it feel truly regal.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={2.5}
              className="mt-4 leading-relaxed max-w-2xl mx-auto"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "clamp(0.9rem,1.8vw,1rem)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.85",
              }}
            >
              At Rehnoor Jewels, our gold plated Rani Haar collection brings
              this timeless tradition to every woman — not just the privileged
              few.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT MAKES A RANI HAAR SPECIAL? — ivory bg
          Unique: history/context section with prose + 
          editorial aside card, specific to Rani Haar
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">
            {/* Left — prose history */}
            <div>
              <motion.div variants={fadeUp} custom={0}>
                <Label>The Heritage</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-6"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  What Makes a{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Rani Haar So Special?
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
                A traditional Rani Haar is characterised by its long length,
                typically falling at or below the chest, its layered design, and
                its intricate pendant or motif work. Historically worn by queens
                and noblewomen across royal courts of India, the Rani Haar was a
                symbol of status, beauty, and power.
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
                Today it remains one of the most sought after bridal and festive
                jewellery styles across the country and for good reason. What
                sets a Rani Haar apart from other necklaces is its drama. The
                way it commands attention, frames the face and neckline, and
                brings an entire look together with a single piece.
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
                At Rehnoor Jewels, we honour that drama with every gold plated
                Rani Haar we craft.
              </motion.p>
            </div>

            {/* Right — history timeline cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  era: "Royal Courts of India",
                  desc: "Originally worn exclusively by queens and noblewomen of India's royal courts - the Rani Haar was a marker of status, power, and extraordinary beauty.",
                  icon: "♛",
                },
                {
                  era: "Symbol of Tradition",
                  desc: "Passed down through generations as heirlooms, the Rani Haar carries the weight of centuries of Indian jewellery heritage in every bead and motif.",
                  icon: "◈",
                },
                {
                  era: "The Modern Bride",
                  desc: "Today, the Rani Haar is one of the most coveted bridal jewellery styles across India worn at weddings, receptions, festive celebrations, and sangeet nights.",
                  icon: "✦",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.era}
                  variants={fadeUp}
                  custom={i * 0.22}
                  className="flex gap-4 p-6 rounded-2xl"
                  style={{
                    background:
                      i === 1 ? "var(--rj-charcoal)" : "rgba(0,55,32,0.05)",
                    border: i === 1 ? "none" : "1px solid rgba(0,55,32,0.1)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-cormorant text-xl"
                    style={{
                      background:
                        i === 1
                          ? "rgba(252,193,81,0.15)"
                          : "rgba(0,55,32,0.08)",
                      color: i === 1 ? "var(--rj-gold)" : "var(--rj-emerald)",
                      border: `1px solid ${i === 1 ? "rgba(252,193,81,0.25)" : "rgba(0,55,32,0.15)"}`,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <p
                      className="font-cinzel text-[11px] tracking-wider font-bold mb-2"
                      style={{ color: i === 1 ? "#fff" : "var(--rj-charcoal)" }}
                    >
                      {card.era}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color:
                          i === 1 ? "rgba(255,255,255,0.5)" : "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                        lineHeight: "1.75",
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          RANI HAAR STYLES — dark bg, 2-column grid
          Unique: 8 styles with occasion tags
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
                  Rani Haar
                </em>
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RANI_HAAR_STYLES.map((style, i) => (
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
          CRAFTED LIKE ROYALTY — ivory bg, 3+3 grid
          Unique: heading uses royal language
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Crafted Like Royalty</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Plated Rani Haar{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Exceptional
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
          Unique: bridal-specific copy throughout
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
                <Label>The Rehnoor Promise</Label>
                <h2
                  className="font-cormorant font-light leading-tight mb-4"
                  style={{
                    fontSize: "clamp(1.8rem,4vw,3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Why Rehnoor Jewels Is the Destination for{" "}
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
                    Rani Haar in India
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
                  Choosing the right Rani Haar is one of the most important
                  jewellery decisions a woman makes, especially for a bride.
                  Here is why thousands of women across India trust Rehnoor
                  Jewels.
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
          OCCASIONS — ivory bg
          Unique: occasion grid instead of styling tips
          Rani Haar is worn for specific occasions,
          not styled like everyday accessories
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>When to Wear It</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                A Collection That{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Grows with You
                </em>
              </h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 max-w-xl mx-auto"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  lineHeight: "1.85",
                  fontSize: "0.95rem",
                }}
              >
                Our Rani Haar collection is not just for brides. It is for every
                woman who wants to feel regal.
              </motion.p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                occasion: "Wedding & Bridal",
                desc: "The quintessential bridal centrepiece — photographs beautifully and carries the weight of the most important day.",
                icon: "♛",
                dark: true,
              },
              {
                occasion: "Reception",
                desc: "Paired with a grand lehenga or saree, the Rani Haar commands every room at the wedding reception.",
                icon: "◈",
                dark: false,
              },
              {
                occasion: "Navratri & Puja",
                desc: "Traditional Rani Haar styles pair perfectly with festive ethnic wear for religious occasions and pooja celebrations.",
                icon: "✦",
                dark: false,
              },
              {
                occasion: "Sangeet Night",
                desc: "Make your sangeet night unforgettable with a dramatic layered or meenakari Rani Haar that dances with you.",
                icon: "◉",
                dark: true,
              },
              {
                occasion: "Family Functions",
                desc: "Elevate any family occasion — from an engagement to an anniversary dinner — with the timeless drama of a Rani Haar.",
                icon: "⬟",
                dark: false,
              },
              {
                occasion: "Gifting",
                desc: "A Rani Haar is one of the most meaningful and cherished gifts a woman can receive — beautifully presented, ready to gift.",
                icon: "◇",
                dark: false,
              },
            ].map((item, i) => (
              <motion.div
                key={item.occasion}
                variants={fadeUp}
                custom={i * 0.1}
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: item.dark ? "var(--rj-charcoal)" : "#fff",
                  border: !item.dark ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "4rem",
                    lineHeight: 1,
                    color: item.dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,55,32,0.05)",
                  }}
                >
                  {item.icon}
                </span>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase mb-3 relative z-10"
                  style={{
                    color: item.dark ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {item.occasion}
                </p>
                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{
                    color: item.dark
                      ? "rgba(255,255,255,0.6)"
                      : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.8",
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CARE TIPS — dark bg, 5 items (3+2)
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
                Caring for Your Rani Haar:{" "}
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
                  Simple Tips to Preserve Its Grandeur
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

      {/* ══════════════════════════════════════════════════
          CUSTOMER REVIEWS — ivory bg
          Unique: light bg reviews for contrast variety
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Royal Testimonials</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Our{" "}
                <em
                  className="font-normal"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Customers Are Saying
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

          {/* Reviews on charcoal bg for readability */}
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
          <div className="max-w-2xl mx-auto">
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
                    Rani Haar
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
          CTA FOOTER — charcoal bg, editorial royal close
          Unique: closing statement from source copy used
          verbatim in design — "she is wearing her royalty"
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
          {/* Crown icon */}
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
              <Crown size={24} style={{ color: "var(--rj-gold)" }} />
            </div>
          </motion.div>

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
              Shop Gold Plated Rani Haar
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

          {/* Unique closing editorial quote */}
          <motion.p
            variants={fadeUp}
            custom={1}
            className="font-cormorant italic max-w-2xl mx-auto mb-4"
            style={{
              fontSize: "clamp(1rem,2.5vw,1.25rem)",
              color: "rgba(252,193,81,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            A Rani Haar is not just a necklace. It is a statement. It is a
            tradition. It is a feeling.
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
            At Rehnoor Jewels, we craft every gold plated Rani Haar with the
            understanding that when a woman puts it on, she is not just wearing
            jewellery — she is wearing her royalty. Shop our Rani Haar
            collection today and find the piece that makes you feel exactly as
            you deserve to feel. Like a queen.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/collections/rani-haar"
              className="inline-flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase px-8 py-4 rounded-full transition-all duration-300 hover:gap-3 hover:opacity-90"
              style={{
                background:
                  "var(--gradient-gold, linear-gradient(135deg,#fcc151,#e8a020))",
                color: "var(--rj-charcoal, #1a1a1a)",
                fontWeight: 700,
                boxShadow: "0 4px 24px rgba(252,193,81,0.3)",
              }}
            >
              Browse Rani Haar <ChevronRight size={13} />
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
