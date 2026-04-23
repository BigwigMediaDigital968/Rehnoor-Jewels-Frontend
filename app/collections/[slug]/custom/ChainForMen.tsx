// app/collections/chains-for-men/component/ChainForMen.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Maximize2,
  Star,
  Truck,
  RefreshCw,
  BadgeCheck,
  ChevronRight,
  Layers,
  Gem,
  Sun,
  Droplets,
  Wind,
} from "lucide-react";

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
// SECTION WRAPPER — triggers animation on scroll
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
  const ref = useRef(null);
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
// GOLD DIVIDER
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

// ─────────────────────────────────────────────────────────────────
// LABEL ACCENT
// ─────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-medium text-[10px] tracking-[0.25em] uppercase mb-3"
      style={{ color: "var(--rj-gold)" }}
    >
      ✦ {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const CHAIN_STYLES = [
  {
    name: "Rope Chain",
    desc: "A classic twisted design that adds texture and character to any outfit. One of the most popular styles in our 1 gram gold chain for men collection.",
    icon: "〰",
  },
  {
    name: "Box Chain",
    desc: "Sleek, structured, and minimal. A perfect gold chain for men who prefer clean, understated elegance.",
    icon: "□",
  },
  {
    name: "Cuban Link Chain",
    desc: "Bold, thick, and eye-catching. Ideal for men who want to make a strong style statement with their gold plated chain.",
    icon: "⛓",
  },
  {
    name: "Figaro Chain",
    desc: "A timeless Italian-inspired pattern with alternating link sizes, giving a refined and sophisticated look.",
    icon: "∞",
  },
  {
    name: "Layered Chain",
    desc: "Perfect for those who love to stack and style. Mix lengths and designs from our 1 gram gold chain for men range for a trendy, personalised look.",
    icon: "≡",
  },
];

const SPECIAL_FEATURES = [
  {
    icon: <Gem size={18} />,
    title: "Premium Gold Plating",
    desc: "Our gold plated chain for men is finished with high-quality gold plating that retains its shine and colour for longer.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Anti-Tarnish Coating",
    desc: "Every chain comes with a protective anti-tarnish finish to keep it looking fresh and radiant with regular use. ",
  },
  {
    icon: <Wind size={18} />,
    title: "Lightweight & Comfortable",
    desc: "Designed for all-day wear, our 1 gram gold chain for men is lightweight and easy to style with any outfit. ",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Affordable Luxury",
    desc: "Get the look and feel of a real gold chain at a fraction of the cost, without compromising on quality.",
  },
  {
    icon: <Layers size={18} />,
    title: "Wide Range of Designs",
    desc: "From minimalist to statement pieces, our collection has something for every man and every occasion.",
  },
];

const WHY_REHNOOR = [
  {
    icon: <BadgeCheck size={16} />,
    title: "Trusted Quality",
    desc: "Every 1 gram gold chain for men at Rehnoor Jewels goes through strict quality checks to ensure a flawless finish.",
  },
  {
    icon: <Star size={16} />,
    title: "Affordable Pricing",
    desc: "We bring you the finest gold chain for men designs at prices that are easy on the pocket.",
  },
  {
    icon: <Layers size={16} />,
    title: "Wide Collection",
    desc: "From classic to contemporary — our gold plated chain for men range has something for every taste.",
  },
  {
    icon: <Truck size={16} />,
    title: "Pan-India Delivery",
    desc: "We deliver your favourite 1 gram gold chain for men safely to your doorstep, anywhere across India.",
  },
  {
    icon: <RefreshCw size={16} />,
    title: "Customer First Approach",
    desc: "At Rehnoor Jewels, your satisfaction is our priority. We are always here to help you find the perfect gold chain.",
  },
];

const STYLE_TIPS = [
  {
    context: "Casual Look",
    tip: "Pair a simple 1 gram gold chain with a plain white tee and jeans for an effortlessly stylish everyday look.",
    num: "01",
  },
  {
    context: "Festive & Traditional",
    tip: "Layer a bold gold chain over a kurta or sherwani to elevate your festive or wedding outfit.",
    num: "02",
  },
  {
    context: "Formal Style",
    tip: "Wear a sleek, minimal gold plated chain for men under a formal shirt for a subtle yet sophisticated touch.",
    num: "03",
  },
  {
    context: "Layered Look",
    tip: "Mix and match different lengths and styles from our 1 gram gold chain for men collection to create a trendy layered look.",
    num: "04",
  },
];

const CARE_TIPS = [
  {
    icon: <Sun size={15} />,
    tip: "Wipe your chain with a soft, dry cloth after every use to remove sweat and dust.",
  },
  {
    icon: <Droplets size={15} />,
    tip: "For a deeper clean, use a soft cloth with mild soapy lukewarm water. Dry completely before storing.",
  },
  {
    icon: <ShieldCheck size={15} />,
    tip: "Store in a dry, airtight pouch or jewellery box when not in use.",
  },
  {
    icon: <Zap size={15} />,
    tip: "Keep away from perfumes, harsh chemicals, and prolonged water exposure to maintain shine.",
  },
];

const FAQS = [
  {
    q: "What is a gold plated chain for men?",
    a: "A gold plated chain for men is a chain made from a base metal, such as brass or copper, electroplated with a layer of real gold. It offers the rich look of a gold chain for men at a much more affordable price.",
  },
  {
    q: "Is a 1 gram gold chain for men suitable for daily wear?",
    a: "Yes! Our 1 gram gold chain for men is lightweight, comfortable, and designed for everyday use. With proper care, it holds up well with regular wear.",
  },
  {
    q: "How long does a gold plated chain for men last?",
    a: "With regular care and mindful use, a gold plated chain for men from Rehnoor Jewels can last anywhere from 1 to 2 years or more, thanks to our premium anti-tarnish coating.",
  },
  {
    q: "Can I wear a gold plated chain for men in water?",
    a: "We recommend avoiding prolonged water exposure for your gold chain. Remove it before bathing, swimming, or any water-related activity to preserve the plating.",
  },
  {
    q: "How do I clean my 1 gram gold chain for men?",
    a: "Simply wipe it with a soft, dry cloth after each use. For a deeper clean, use a soft cloth dampened with mild soapy lukewarm water, then dry completely before storing.",
  },
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
      custom={index * 0.5}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group"
      style={{
        borderBottom: "1px solid rgba(252,193,81,0.15)",
      }}
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
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function ChainForMen() {
  return (
    <div style={{ background: "var(--rj-ivory)" }} className="overflow-hidden">
      {/* ══════════════════════════════════════════════════
          HERO INTRO SECTION — dark charcoal bg
      ══════════════════════════════════════════════════ */}
      <Section
        className="relative overflow-hidden"
        style={{ background: "var(--rj-charcoal)" }}
      >
        {/* Background decoration */}
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

        <div className="container-rj section-padding relative py-18 z-10">
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
              Gold Plated Chain{" "}
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
              Explore our exclusive collection of gold plated chain for men,
              where bold style meets everyday elegance. Each piece is crafted to
              give you the rich, luxurious look of gold at an affordable price,
              making it perfect for both casual and festive occasions.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          WHAT IS A GOLD PLATED CHAIN?
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
                    Chain for Men?
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
                A gold plated chain for men is a chain crafted from a base metal
                such as brass or copper, electroplated with a layer of real
                gold, giving it the rich and luxurious appearance of a solid
                gold chain for men at a fraction of the cost.
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
                  1 gram gold chain for men
                </strong>{" "}
                collection is designed to offer you premium quality, a flawless
                finish, and stunning designs that suit every style and occasion
                without putting a strain on your budget.
              </motion.p>

              {/* <motion.div variants={fadeUp} custom={3} className="mt-8">
                <Link
                  href="/collections/chains-for-men"
                  className="inline-flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:gap-3"
                  style={{
                    background: "var(--rj-emerald)",
                    color: "#fff",
                  }}
                >
                  Shop the Collection <ChevronRight size={12} />
                </Link>
              </motion.div> */}
            </div>

            {/* Right — decorative card grid */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-2 gap-3"
            >
              {[
                {
                  label: "Elegant Designs",
                  sub: "Crafted with care",
                  icon: <Gem size={22} />,
                },
                {
                  label: "Lasting Shine",
                  sub: "Anti-tarnish finish",
                  icon: <Sun size={22} />,
                },
                {
                  label: "10+ Styles",
                  sub: "For every occasion",
                  icon: <Layers size={22} />,
                },
                {
                  label: "Free Size Adjust",
                  sub: "Perfect fit guaranteed",
                  icon: <Maximize2 size={22} />,
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
          TOP CHAIN STYLES
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
          <div className="flex justify-center text-center mb-12">
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
                Top Chain Styles in{" "}
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
                  Gold Plated
                </em>
              </h2>

              <p className="text-white/60 max-w-4xl text-center mt-3">
                Finding the right style is just as important as finding the
                right piece. Here are the most popular gold plated chain for men
                available at Rehnoor Jewels:
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 w-4xl mx-auto">
            {CHAIN_STYLES.map((style, i) => (
              <motion.div
                key={style.name}
                variants={fadeUp}
                custom={i * 0.15}
                className="group flex items-center gap-5 p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default"
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
                {/* Number */}
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
                    className="font-cinzel text-sm tracking-wider font-bold mb-2 transition-colors duration-300"
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
          WHAT MAKES IT SPECIAL
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} custom={0}>
              <Label>Crafted to Last</Label>
              <h2
                className="font-cormorant font-light leading-tight"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Makes Our Gold Chain for Men{" "}
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
                custom={i * 0.12}
                className="group p-6 rounded-2xl transition-all duration-300"
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
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300"
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
          WHY CHOOSE REHNOOR JEWELS — split layout
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
            {/* Left heading — sticky */}
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
                  Why Choose{" "}
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
                    Rehnoor Jewels?
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
                  When it comes to buying a gold plated chain for men online,
                  Rehnoor Jewels stands apart for all the right reasons.
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
          HOW TO STYLE
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
                a Gold Plated Chain
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STYLE_TIPS.map((tip, i) => (
              <motion.div
                key={tip.context}
                variants={fadeUp}
                custom={i * 0.15}
                className="relative p-6 sm:p-8 rounded-2xl overflow-hidden"
                style={{
                  background: i % 2 === 0 ? "var(--rj-charcoal)" : "#fff",
                  border: i % 2 !== 0 ? "1px solid var(--rj-bone)" : "none",
                }}
              >
                {/* Large number watermark */}
                <span
                  className="absolute top-4 right-5 font-cormorant font-light select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    lineHeight: 1,
                    color:
                      i % 2 === 0
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,55,32,0.05)",
                  }}
                >
                  {tip.num}
                </span>

                <span
                  className="font-cinzel text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1 rounded-full mb-4 inline-block"
                  style={{
                    background:
                      i % 2 === 0
                        ? "rgba(252,193,81,0.15)"
                        : "rgba(0,55,32,0.08)",
                    color: i % 2 === 0 ? "var(--rj-gold)" : "var(--rj-emerald)",
                  }}
                >
                  {tip.context}
                </span>

                <p
                  className="leading-relaxed text-sm relative z-10"
                  style={{
                    color:
                      i % 2 === 0 ? "rgba(255,255,255,0.65)" : "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    lineHeight: "1.85",
                    marginTop: "0.5rem",
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
          PRODUCT LIFE / HOW LONG DOES IT LAST
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
                <Label>Product Life</Label>
                <h2
                  className="font-cormorant font-light leading-tight"
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  How Long Does{" "}
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
                    Gold Plating
                  </em>{" "}
                  Last?
                </h2>

                <p className="text-white/50 mt-2">
                  One of the most common questions buyers have before purchasing
                  a gold plated chain for men is how long the gold plating will
                  last. The answer depends on how well you care for your piece.
                  Here is what you can expect:{" "}
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "✨",
                  title: "With Regular Care",
                  body: "A well-maintained 1 gram gold chain can retain its shine and colour for up to 1 to 2 years or even longer.",
                  highlight: true,
                },
                {
                  icon: "✨",
                  title: "Key Factors",
                  body: "The longevity of your gold chain depends on factors like skin type, exposure to sweat, water, perfumes, and how often it is worn.",
                  highlight: false,
                },
                {
                  icon: "✨",
                  title: "Anti-Tarnish Advantage",
                  body: "At Rehnoor Jewels, our gold plated chain for men comes with a premium anti-tarnish coating that adds an extra layer of protection, significantly extending the life of the plating.",
                  highlight: false,
                },
                {
                  icon: "✨",
                  title: "Pro Tip",
                  body: "Remove your 1 gram gold chain for men before bathing, swimming, or exercising to keep it looking its best for longer.",
                  highlight: true,
                },
              ].map((item, i) => (
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
                  <span className="text-2xl flex-shrink-0 mt-0.5 text-white">
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

            <p className="mt-5 text-white/60 text-center">
              With proper care and mindful wearing habits, your gold plated
              chain for men from Rehnoor Jewels will remain a cherished part of
              your collection for years to come.
            </p>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════
          CARE TIPS
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
                  Gold Plated Chain
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
          FAQ
      ══════════════════════════════════════════════════ */}
      <Section
        className="section-padding relative overflow-hidden"
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
                    fontSize: "clamp(1.8rem, 4vw, 3rem)",
                    color: "var(--rj-charcoal)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  FAQ:{" "}
                  <em
                    className="font-normal"
                    style={{ color: "var(--rj-emerald)" }}
                  >
                    Gold Plated Chain for Men
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
          CTA FOOTER STRIP
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
              Shop Gold Plated Chain for Men
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
            At Rehnoor Jewels, we believe every man deserves to wear jewellery
            that reflects his personality and style. Our gold plated chain for
            men collection is thoughtfully designed to offer you premium
            quality, stunning designs, and great value all in one place. Browse
            our 1 gram gold chain for men collection today and find the perfect
            piece that speaks to your style.
          </motion.p>
          {/* 
          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/collections/chains-for-men"
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
          </motion.div> */}
        </div>
      </Section>
    </div>
  );
}
