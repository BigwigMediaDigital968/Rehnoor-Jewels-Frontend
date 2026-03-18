"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────

const collections = [
  {
    id: "nawabi-chain",
    label: "Nawabi Chain",
    tagline: "Bold, layered, iconic",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80",
    price: "₹8,999",
    count: "24 pieces",
    tag: "Bestseller",
    size: "tall",
  },
  {
    id: "royal-kada",
    label: "Royal Kada",
    tagline: "Power on your wrist",
    image:
      "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d/?w=600&q=80",
    price: "₹12,499",
    count: "18 pieces",
    tag: "New",
    size: "square",
  },
  {
    id: "signet-ring",
    label: "Signet Ring",
    tagline: "Wear your statement",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=80",
    price: "₹5,299",
    count: "32 pieces",
    tag: "Popular",
    size: "square",
  },
  {
    id: "link-bracelet",
    label: "Link Bracelet",
    tagline: "Layered perfection",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=700&q=80",
    price: "₹7,199",
    count: "15 pieces",
    tag: "Limited",
    size: "wide",
  },
  {
    id: "sol-pendant",
    label: "Sol Pendant",
    tagline: "Close to the heart",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&q=80",
    price: "₹4,499",
    count: "28 pieces",
    tag: "New",
    size: "square",
  },
  {
    id: "moghul-bangle",
    label: "Moghul Bangle",
    tagline: "Heritage, reimagined",
    image:
      "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=700&q=80",
    price: "₹15,999",
    count: "10 pieces",
    tag: "Exclusive",
    size: "tall",
  },
  {
    id: "cuban-chain",
    label: "Cuban Chain",
    tagline: "Street meets heritage",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=700&q=80",
    price: "₹11,299",
    count: "20 pieces",
    tag: "Trending",
    size: "square",
  },
  {
    id: "cord-bracelet",
    label: "Cord Bracelet",
    tagline: "Minimal. Pure. Gold.",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=700&q=80",
    price: "₹3,899",
    count: "40 pieces",
    tag: "Bestseller",
    size: "square",
  },
];

const tagColors: Record<string, string> = {
  Bestseller: "var(--rj-gold)",
  New: "#4ade80",
  Popular: "#60a5fa",
  Limited: "#f87171",
  Exclusive: "#c084fc",
  Trending: "#fb923c",
};

function CollectionCard({
  col,
  index,
}: {
  col: (typeof collections)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/collections/${col.id}`}
        className="group relative overflow-hidden block h-full rounded-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ background: "#0f0f0f" }}
      >
        {/* Image */}
        <Image
          src={col.image}
          alt={col.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "var(--rj-emerald)",
            opacity: hovered ? 0.2 : 0,
          }}
        />

        {/* Tag badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-2.5 py-1 rounded-full font-cinzel text-[9px] tracking-wider font-bold"
            style={{
              background: tagColors[col.tag] || "var(--rj-gold)",
              color: "#000",
            }}
          >
            {col.tag}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-10">
          <p
            className="label-accent mb-1"
            style={{
              color: "var(--rj-gold)",
              fontSize: "0.6rem",
              opacity: 0.8,
            }}
          >
            {col.tagline}
          </p>
          <h3
            className="font-cormorant text-white font-light leading-tight mb-1"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
          >
            {col.label}
          </h3>
          <p className="text-white/40 text-xs mb-3">{col.count}</p>

          <div className="flex items-center justify-between">
            <span
              className="font-cinzel font-bold"
              style={{ color: "var(--rj-gold)", fontSize: "0.9rem" }}
            >
              {col.price}
            </span>
            <div className="flex items-center gap-1 overflow-hidden h-4">
              <span className="font-cinzel text-white/70 text-[10px] tracking-wider uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                Shop
              </span>
              <ArrowRight
                size={10}
                className="text-white/70 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              />
            </div>
          </div>
        </div>

        {/* Hover border */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent group-hover:border-[var(--rj-gold)]/40 transition-all duration-500" />
      </Link>
    </motion.div>
  );
}

export default function CollectionsGrid() {
  return (
    <section
      id="collections"
      className="section-padding"
      style={{ background: "var(--rj-charcoal)" }}
    >
      <div className="container-rj">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ Shop by Collection
            </p>
            <h2 className="heading-lg text-white leading-tight">
              Eight ways to wear
              <br />
              <em className="text-gold-shimmer font-normal">pure gold</em>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase transition-opacity hover:opacity-60 group"
            style={{ color: "var(--rj-gold)" }}
          >
            View All Collections
            <ArrowRight
              size={13}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>

        {/*
          Creative asymmetric grid:
          ┌─────────────┬──────┬──────┐
          │  tall (2r)  │  sq  │  sq  │  row 1+2
          ├──────┬──────┴──────┴──────┤
          │  sq  │     wide (2c)      │  row 3
          ├──────┴──────┬──────┬──────┤
          │  tall (2r)  │  sq  │  sq  │  row 4+5
          └─────────────┴──────┴──────┘
        */}

        {/* Desktop grid */}
        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "260px 260px 260px",
          }}
        >
          {/* 0 - tall */}
          <div style={{ gridColumn: "1/2", gridRow: "1/3" }}>
            <CollectionCard col={collections[0]} index={0} />
          </div>
          {/* 1 - square */}
          <div style={{ gridColumn: "2/3", gridRow: "1/2" }}>
            <CollectionCard col={collections[1]} index={1} />
          </div>
          {/* 2 - square */}
          <div style={{ gridColumn: "3/4", gridRow: "1/2" }}>
            <CollectionCard col={collections[2]} index={2} />
          </div>
          {/* 3 - square */}
          <div style={{ gridColumn: "4/5", gridRow: "1/2" }}>
            <CollectionCard col={collections[3]} index={3} />
          </div>
          {/* 4 - wide */}
          <div style={{ gridColumn: "2/5", gridRow: "2/3" }}>
            <CollectionCard col={collections[4]} index={4} />
          </div>
          {/* 5 - square */}
          <div style={{ gridColumn: "1/2", gridRow: "3/4" }}>
            <CollectionCard col={collections[5]} index={5} />
          </div>
          {/* 6 - square */}
          <div style={{ gridColumn: "2/3", gridRow: "3/4" }}>
            <CollectionCard col={collections[6]} index={6} />
          </div>
          {/* 7 - wide */}
          <div style={{ gridColumn: "3/5", gridRow: "3/4" }}>
            <CollectionCard col={collections[7]} index={7} />
          </div>
        </div>

        {/* Tablet grid — 2 col */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {collections.map((col, i) => (
            <div key={col.id} style={{ height: "280px" }}>
              <CollectionCard col={col} index={i} />
            </div>
          ))}
        </div>

        {/* Mobile — 1 col */}
        <div className="grid md:hidden grid-cols-1 gap-4">
          {collections.map((col, i) => (
            <div key={col.id} style={{ height: "260px" }}>
              <CollectionCard col={col} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
