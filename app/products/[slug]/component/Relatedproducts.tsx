"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Product } from "../../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// SAMPLE DATA — replace with API fetch filtered by collection
// ─────────────────────────────────────────────────────────────────
const relatedProducts: Product[] = [
  {
    id: "cuban-link",
    name: "Cuban Link Chain",
    subtitle: "22kt · 20 inch",
    price: "₹11,299",
    originalPrice: "₹13,500",
    tag: "Trending",
    rating: 5,
    reviewCount: 134,
    category: "Chains",
    href: "/products/cuban-link-chain",
    images: [
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&q=80",
        alt: "Cuban Link",
      },
    ],
  },
  {
    id: "rope-chain",
    name: "Rope Chain",
    subtitle: "22kt · 22 inch",
    price: "₹7,499",
    originalPrice: "₹8,800",
    tag: "New",
    rating: 4,
    reviewCount: 67,
    category: "Chains",
    href: "/products/rope-chain-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80",
        alt: "Rope Chain",
      },
    ],
  },
  {
    id: "signet-ring",
    name: "Signet Ring",
    subtitle: "22kt · Men's",
    price: "₹5,299",
    originalPrice: "₹6,200",
    tag: "Popular",
    rating: 5,
    reviewCount: 312,
    category: "Rings",
    href: "/products/signet-ring-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
        alt: "Signet Ring",
      },
    ],
  },
  {
    id: "royal-kada",
    name: "Royal Kada",
    subtitle: "22kt · Adjustable",
    price: "₹12,499",
    originalPrice: "₹14,999",
    tag: "New",
    rating: 5,
    reviewCount: 189,
    category: "Kadas",
    href: "/products/royal-kada-heavy",
    images: [
      {
        src: "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=500&q=80",
        alt: "Royal Kada",
      },
    ],
  },
  {
    id: "link-bracelet",
    name: "Link Bracelet",
    subtitle: "22kt · 8 inch",
    price: "₹7,199",
    originalPrice: "₹8,500",
    tag: "Limited",
    rating: 5,
    reviewCount: 98,
    category: "Bracelets",
    href: "/products/link-bracelet-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&q=80",
        alt: "Bracelet",
      },
    ],
  },
  {
    id: "sol-pendant",
    name: "Sol Pendant",
    subtitle: "22kt · Unisex",
    price: "₹4,499",
    originalPrice: "₹5,200",
    tag: "New",
    rating: 5,
    reviewCount: 143,
    category: "Pendants",
    href: "/products/sol-pendant-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        alt: "Sol Pendant",
      },
    ],
  },
];

const GAP = 12;

function useCardsVisible() {
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(2);
      else if (w < 1024) setVisible(3);
      else setVisible(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

// ── Mini Product Card (no nested <a>) ───────────────────────────
function RelatedCard({ product }: { product: Product }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);

  const discountPct = product.originalPrice
    ? Math.round(
        (1 -
          parseInt(product.price.replace(/[^\d]/g, "")) /
            parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
          100,
      )
    : 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(product.href)}
      className="flex flex-col"
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(252,193,81,0.5)" : "var(--rj-bone)"}`,
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.1)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1/1", background: "var(--rj-ivory-dark)" }}
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(max-width:640px) 50vw, 25vw"
          className="object-cover"
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span
              className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: "var(--rj-gold)", color: "#000" }}
            >
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWished((w) => !w);
          }}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(255,255,255,0.93)", cursor: "pointer" }}
        >
          <Heart
            size={12}
            style={{
              fill: wished ? "var(--rj-gold)" : "transparent",
              color: wished ? "var(--rj-gold)" : "var(--rj-ash)",
              transition: "all 0.25s",
            }}
          />
        </button>

        {/* Hover: View Product */}
        {hovered && (
          <div className="absolute inset-0 hidden md:flex items-center justify-center z-10">
            <div className="absolute inset-0 bg-[var(--rj-emerald)]/20" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(product.href);
              }}
              className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold"
              style={{
                background: "rgba(255,255,255,0.97)",
                color: "var(--rj-emerald)",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              View Product
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-3">
        {product.rating && (
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={9}
                style={{
                  fill:
                    i < Math.floor(product.rating!)
                      ? "var(--rj-gold)"
                      : "transparent",
                  color:
                    i < Math.floor(product.rating!)
                      ? "var(--rj-gold)"
                      : "var(--rj-bone)",
                }}
              />
            ))}
            {product.reviewCount && (
              <span
                className="font-cinzel text-[8px] ml-0.5"
                style={{ color: "var(--rj-ash)" }}
              >
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
        <h3
          className="font-cormorant font-light leading-snug mb-0.5 line-clamp-1 transition-colors"
          style={{
            fontSize: "clamp(0.85rem,1.4vw,1rem)",
            color: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
          }}
        >
          {product.name}
        </h3>
        <p
          className="text-[10px] mb-2 line-clamp-1"
          style={{ color: "var(--rj-ash)" }}
        >
          {product.subtitle}
        </p>
        <div className="flex items-center gap-1.5 mt-auto flex-wrap">
          {product.originalPrice && (
            <span
              className="text-[10px] line-through"
              style={{ color: "var(--rj-ash)" }}
            >
              {product.originalPrice}
            </span>
          )}
          <span
            className="font-cinzel font-bold"
            style={{ fontSize: "0.88rem", color: "var(--rj-emerald)" }}
          >
            {product.price}
          </span>
          {discountPct > 0 && (
            <span
              className="font-cinzel text-[8px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "#fef2f2", color: "#ef4444" }}
            >
              {discountPct}% OFF
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function RelatedProducts({
  collectionSlug = "chains",
}: {
  collectionSlug?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsVisible = useCardsVisible();
  const total = relatedProducts.length;
  const maxIndex = Math.max(0, total - cardsVisible);
  const [index, setIndex] = useState(0);
  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(i, maxIndex))),
    [maxIndex],
  );

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const cardW = (w - GAP * (cardsVisible - 1)) / cardsVisible;
      setTrackOffset(index * (cardW + GAP));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [index, cardsVisible]);

  // Touch swipe
  const touchStart = useRef(0);
  const touchI = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchI.current = index;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (delta > 50) goTo(touchI.current + 1);
    if (delta < -50) goTo(touchI.current - 1);
  };

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-charcoal)" }}
    >
      <div className="container-rj">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p
              className="label-accent mb-2"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ You May Also Like
            </p>
            <h2 className="heading-md text-white leading-tight">
              From the same
              <br />
              <em className="text-gold-shimmer font-normal">collection</em>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/collections/${collectionSlug}`}
              className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: "var(--rj-gold)", cursor: "pointer" }}
            >
              View All <ArrowRight size={11} />
            </a>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => goTo(index + 1)}
                disabled={index >= maxIndex}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${trackOffset}px)`,
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  flexShrink: 0,
                  width: `calc((100% - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`,
                }}
              >
                <RelatedCard product={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="flex sm:hidden justify-center gap-3 mt-5">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index >= maxIndex}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
