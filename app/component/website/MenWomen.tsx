"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const menItems = [
  {
    id: 1,
    name: "Charming Design",
    subtitle: "Gold Plated Rajwadi Chain for Men",
    tag: "Bestseller",
    price: "₹2,040",
    gradient: "from-[#1a1a1a] via-[#2a2208] to-[#1a1a1a]",
    accent: "#fcc151",
    image: "/men-collection/chain-1.webp",
    link: "/products/charming-design-gold-plated-rajwadi-chain-for-men-style-e818",
  },
  {
    id: 2,
    name: "Artisanal Design",
    subtitle: "Gold Plated pipe Chain for Men",
    tag: "New",
    price: "₹1,390",
    gradient: "from-[#0a1f12] via-[#003720] to-[#0a1f12]",
    accent: "#fdd07a",
    image: "/men-collection/chain-2.webp",
    link: "/products/artisanal-design-gold-plated-pipe-chain-for-men-style-e820",
  },
  {
    id: 3,
    name: "Style E403",
    subtitle: "Design Link Bracelet for Men",
    tag: "Limited",
    price: "₹4,450",
    gradient: "from-[#1a1108] via-[#2e1f00] to-[#1a1108]",
    accent: "#f5a623",
    image: "/men-collection/bracelet-1.webp",
    link: "products/1-gram-gold-plated-trending-design-link-bracelet-for-men-style-e403",
  },
  {
    id: 4,
    name: "Style E420",
    subtitle: "Best Quality Bracelet for Men",
    tag: "Trending",
    price: "₹9,550",
    gradient: "from-[#1a1a1a] via-[#002410] to-[#1a1a1a]",
    accent: "#fcc151",
    image: "/men-collection/bracelet-2.webp",
    link: "/products/1-gram-gold-plated-stylish-design-best-quality-bracelet-for-men-style-e420",
  },
];

const womenItems = [
  {
    id: 1,
    name: "Lumière Drops",
    subtitle: "Tear-drop gemstone earrings",
    tag: "Bestseller",
    price: "₹3,599",
    gradient: "from-[#fef4dc] via-[#fdf0d0] to-[#fef4dc]",
    accent: "#003720",
    image: "/images/collections/women/lumiere-drops.jpg",
    link: "/collection/women-item",
  },
  {
    id: 2,
    name: "Petal Choker",
    subtitle: "Floral-motif collar necklace",
    tag: "New",
    price: "₹5,199",
    gradient: "from-[#faf8f3] via-[#fef4dc] to-[#faf8f3]",
    accent: "#004d2d",
    image: "/images/collections/women/petal-choker.jpg",
    link: "/collection/women-item",
  },
  {
    id: 3,
    name: "Bloom Bangle",
    subtitle: "Engraved gold-tone bangle",
    tag: "Limited",
    price: "₹2,499",
    gradient: "from-[#fef4dc] via-[#fdf5e0] to-[#fef4dc]",
    accent: "#003720",
    image: "/images/collections/women/bloom-bangle.jpg",
    link: "/collection/women-item",
  },
  {
    id: 4,
    name: "Silhouette Ring",
    subtitle: "Stackable minimalist ring",
    tag: "Trending",
    price: "₹1,899",
    gradient: "from-[#faf8f3] via-[#f2ede2] to-[#faf8f3]",
    accent: "#002410",
    image: "/images/collections/women/silhouette-ring.jpg",
    link: "/collection/women-item",
  },
];

/* ─────────────────────────────────────────────
   SVG ORNAMENTS
───────────────────────────────────────────── */
const DiamondIcon = ({
  color = "#fcc151",
  size = 18,
}: {
  color?: string;
  size?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon
      points="12,2 22,9 18,22 6,22 2,9"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
    />
    <polygon points="12,2 22,9 12,7 2,9" fill={color} opacity="0.18" />
  </svg>
);

const LineSeparator = ({ color = "#fcc151" }: { color?: string }) => (
  <div className="flex items-center gap-2 w-full">
    <div
      className="flex-1 h-px"
      style={{
        background: `linear-gradient(to right, transparent, ${color}55)`,
      }}
    />
    <DiamondIcon color={color} size={10} />
    <div
      className="flex-1 h-px"
      style={{
        background: `linear-gradient(to left, transparent, ${color}55)`,
      }}
    />
  </div>
);

/* ─────────────────────────────────────────────
   ANIMATED SHIMMER BADGE
───────────────────────────────────────────── */
const Badge = ({ label, dark }: { label: string; dark: boolean }) => (
  <span
    className="relative overflow-hidden text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1 rounded-full"
    style={{
      background: dark ? "rgba(252,193,81,0.12)" : "rgba(0,55,32,0.10)",
      border: `1px solid ${dark ? "rgba(252,193,81,0.35)" : "rgba(0,55,32,0.25)"}`,
      color: dark ? "#fcc151" : "#003720",
    }}
  >
    <span
      className="absolute inset-0 -translate-x-full animate-shimmer"
      style={{
        background: dark
          ? "linear-gradient(90deg, transparent, rgba(252,193,81,0.22), transparent)"
          : "linear-gradient(90deg, transparent, rgba(0,77,45,0.14), transparent)",
      }}
    />
    {label}
  </span>
);

/* ─────────────────────────────────────────────
   COLLECTION CARD
───────────────────────────────────────────── */
interface CardProps {
  name: string;
  subtitle: string;
  tag: string;
  price: string;
  gradient: string;
  accent: string;
  dark: boolean;
  index: number;
  visible: boolean;
  image: string;
  link: string;
}

const CollectionCard: React.FC<CardProps> = ({
  name,
  subtitle,
  tag,
  price,
  gradient,
  accent,
  dark,
  index,
  visible,
  image,
  link,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(36px) scale(0.97)",
        transition: `opacity 0.65s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s, transform 0.65s cubic-bezier(0.4,0,0.2,1) ${index * 0.12}s`,
      }}
    >
      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient}`}
        style={{
          boxShadow: hovered
            ? `0 24px 60px ${accent}33, 0 4px 20px rgba(0,0,0,0.2)`
            : `0 8px 30px rgba(0,0,0,0.12)`,
          transform: hovered
            ? "translateY(-6px) scale(1.02)"
            : "translateY(0) scale(1)",
          transition:
            "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
          border: `1px solid ${accent}22`,
        }}
      >
        {/* Top visual area */}
        <div className="relative h-62 flex items-center justify-center overflow-hidden">
          {/* ── Background image ── */}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* ── Gradient overlay — preserves card colour identity ── */}
          {/* <div
            className="absolute inset-0"
            style={{
              background: dark
                ? `linear-gradient(to bottom, rgba(0,36,16,0.2) 0%, rgba(0,36,16,0.3) 100%)`
                : `linear-gradient(to bottom, rgba(254,244,220,0.2) 0%, rgba(254,244,220,0.30) 100%)`,
            }}
          /> */}
          {/* ── Radial accent glow (kept from original) ── */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, ${accent} 0%, transparent 60%),
                radial-gradient(circle at 75% 70%, ${accent} 0%, transparent 55%)`,
            }}
          />
          {/* Animated ring */}
          {/* <div
            className="absolute w-40 h-40 rounded-full"
            style={{
              border: `1px solid ${accent}50`,
              transform: hovered ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
          <div
            className="absolute w-28 h-28 rounded-full"
            style={{
              border: `1px solid ${accent}60`,
              transform: hovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.6s ease 0.05s",
            }}
          /> */}
          {/* Central gem icon */}
          {/* <div
            className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full"
            style={{
              background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
              boxShadow: `0 0 30px ${accent}66`,
              transform: hovered
                ? "scale(1.12) rotate(12deg)"
                : "scale(1) rotate(0deg)",
              transition: "transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275)",
            }}
          >
            <DiamondIcon color={accent} size={36} />
          </div> */}
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <Badge label={tag} dark={dark} />
          </div>
        </div>

        {/* Content area */}
        <div className="px-5 pb-5 pt-1">
          <LineSeparator color={accent} />
          <div className="mt-4 space-y-1">
            <h3
              className="text-base font-bold tracking-wide leading-tight heading-md"
              style={{
                color: dark ? "#faf8f3" : "#1a1a1a",
                // fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              {name}
            </h3>
            <p
              className="text-xs tracking-wide"
              style={{ color: dark ? "#fcc15199" : "#003720aa" }}
            >
              {subtitle}
            </p>
          </div>
          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-4">
            <span
              className="text-sm font-bold tracking-wider"
              style={{ color: accent }}
            >
              {price}
            </span>
            <Link
              href={link}
              className="text-[10px] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 rounded-full transition-all duration-300"
              style={{
                background: hovered ? accent : "transparent",
                color: hovered ? (dark ? "#1a1a1a" : "#fff") : accent,
                border: `1px solid ${accent}`,
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
            >
              Explore
            </Link>
          </div>
        </div>

        {/* Hover shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(115deg, transparent 40%, ${accent}10 50%, transparent 60%)`,
            transform: hovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s ease",
          }}
        />
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  tagline: string;
  dark: boolean;
  visible: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  tagline,
  dark,
  visible,
}) => (
  <div
    className="text-center mb-12"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}
  >
    <p className="label-accent" style={{ color: "var(--rj-gold)" }}>
      ✦ {tagline}
    </p>
    <h2
      className="heading-lg leading-tight"
      style={{
        color: dark ? "#faf8f3" : "#1a1a1a",
        letterSpacing: "-0.02em",
      }}
    >
      {title}
    </h2>
    <p
      className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
      style={{ color: dark ? "#faf8f388" : "#1a1a1a88" }}
    >
      {subtitle}
    </p>
    {/* Decorative rule */}
    <div className="flex items-center justify-center gap-3 mt-6">
      <div
        className="h-px w-16"
        style={{
          background: `linear-gradient(to right, transparent, ${dark ? "#fcc151" : "#003720"})`,
        }}
      />
      <DiamondIcon color={dark ? "#fcc151" : "#003720"} size={14} />
      <div
        className="h-px w-16"
        style={{
          background: `linear-gradient(to left, transparent, ${dark ? "#fcc151" : "#003720"})`,
        }}
      />
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MenWomen() {
  const router = useRouter();
  const menRef = useRef<HTMLDivElement>(null);
  const womenRef = useRef<HTMLDivElement>(null);
  const [menVisible, setMenVisible] = useState(false);
  const [womenVisible, setWomenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === menRef.current && entry.isIntersecting) {
            setMenVisible(true);
          }
          if (entry.target === womenRef.current && entry.isIntersecting) {
            setWomenVisible(true);
          }
        });
      },
      { threshold: 0.12 },
    );
    if (menRef.current) observer.observe(menRef.current);
    if (womenRef.current) observer.observe(womenRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Shimmer keyframe ── */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2.4s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <main
        style={{ background: "var(--rj-ivory)", color: "var(--rj-charcoal)" }}
      >
        {/* ══════════════════════════════════════
            MEN'S COLLECTION — dark / emerald
        ══════════════════════════════════════ */}
        <section
          ref={menRef}
          className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
          style={{ background: "var(--gradient-emerald)" }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                #fcc151 0px, #fcc151 1px,
                transparent 1px, transparent 60px
              )`,
            }}
          />
          {/* Glow orbs */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(252,193,81,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(252,193,81,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <SectionHeader
              title="Men's Collection"
              subtitle="Strong, modern designs with a refined gold-like finish. Designed to add a touch of elegance to every look, every day."
              tagline="Crafted for him"
              dark={true}
              visible={menVisible}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {menItems.map((item, i) => (
                <CollectionCard
                  key={item.id}
                  {...item}
                  dark={true}
                  index={i}
                  visible={menVisible}
                />
              ))}
            </div>

            {/* View all CTA */}
            <div
              className="text-center mt-12"
              style={{
                opacity: menVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.55s",
              }}
            >
              <button
                onClick={() => router.push("/collections")}
                className="group relative overflow-hidden text-xs tracking-[0.22em] uppercase font-semibold px-8 py-3.5 rounded-full cursor-pointer"
                style={{
                  border: "1px solid rgba(252,193,81,0.5)",
                  color: "#fcc151",
                  background: "rgba(252,193,81,0.06)",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#fcc151";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#003720";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(252,193,81,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#fcc151";
                }}
              >
                View All Men's Pieces
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            WOMEN'S COLLECTION — light / ivory
        ══════════════════════════════════════ */}
        {/* <section
          ref={womenRef}
          className="relative overflow-hidden py-14 px-4 sm:px-6 lg:px-8"
          style={{ background: "var(--rj-ivory)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #003720 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,55,32,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <SectionHeader
              title="Women's Collection"
              subtitle="Gracefully designed with an ageless elegance. Each piece complements any outfit for effortless everyday wear."
              tagline="Crafted for her"
              dark={false}
              visible={womenVisible}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {womenItems.map((item, i) => (
                <CollectionCard
                  key={item.id}
                  {...item}
                  dark={false}
                  index={i}
                  visible={womenVisible}
                />
              ))}
            </div>

            <div
              className="text-center mt-12"
              style={{
                opacity: womenVisible ? 1 : 0,
                transition: "opacity 0.7s ease 0.55s",
              }}
            >
              <button
                onClick={() => router.push("/women-collection")}
                className="relative overflow-hidden text-xs tracking-[0.22em] uppercase font-semibold px-8 py-3.5 rounded-full cursor-pointer"
                style={{
                  border: "1px solid rgba(0,55,32,0.35)",
                  color: "#003720",
                  background: "rgba(0,55,32,0.04)",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#003720";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#fcc151";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(0,55,32,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#003720";
                }}
              >
                View All Women's Pieces
              </button>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
