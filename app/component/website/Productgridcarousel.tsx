"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCardCarousel from "./Productcardcarousel";
import { useProducts } from "../../lib/hooks/useProducts";
import type { ApiProduct } from "../../lib/api/productLive";
import type { Product, ProductTag } from "../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// HELPERS — map ApiProduct → Product
// ─────────────────────────────────────────────────────────────────
function toCardProduct(p: ApiProduct): Product {
  return {
    id: p._id,
    name: p.name,
    subtitle: p.subtitle,
    price: "₹" + p.price.toLocaleString("en-IN"),
    originalPrice: p.originalPrice
      ? "₹" + p.originalPrice.toLocaleString("en-IN")
      : undefined,
    tag: p.tag as ProductTag | undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category,
    description: p.shortDescription,
    href: `/products/${p.slug}`,
    images: p.images,
    sizes: p.sizes,
    ourPromise: p.ourPromise,

    // ── ADDED SEO FIELDS FOR THE PRODUCT TYPE ──
    seoTitle: p.seoTitle || p.name || "",
    seoDescription: p.seoDescription || p.shortDescription || "",
    seoKeywords: p.seoKeywords || [],
  };
}
// ─────────────────────────────────────────────────────────────────
// CARD WIDTH — responsive
// ─────────────────────────────────────────────────────────────────
function useCardWidth() {
  const [width, setWidth] = useState(280);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setWidth(220);
      else if (w < 768) setWidth(240);
      else if (w < 1024) setWidth(260);
      else setWidth(280);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// ─────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────
function SkeletonCard({ width }: { width: number }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        width,
        background: "linear-gradient(145deg, #f8f5f0, #f1ece4)",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="shimmer" />
      </div>

      {/* Image placeholder */}
      <div
        style={{
          paddingTop: "133%",
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
        }}
      />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div
          className="h-3 rounded-full"
          style={{
            width: "70%",
            background: "rgba(0,0,0,0.08)",
          }}
        />

        <div
          className="h-3 rounded-full"
          style={{
            width: "50%",
            background: "rgba(0,0,0,0.06)",
          }}
        />

        <div
          className="h-4 rounded-full mt-3"
          style={{
            width: "40%",
            background:
              "linear-gradient(90deg, rgba(252,193,81,0.25), rgba(252,193,81,0.1))",
          }}
        />
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────
// MARQUEE TRACK — core infinite scroll logic
// ─────────────────────────────────────────────────────────────────
const GAP = 16;
const SPEED = 1.2; // px per frame

function MarqueeTrack({
  products,
  loading,
  cardWidth,
}: {
  products: ApiProduct[];
  loading: boolean;
  cardWidth: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  const pausedRef = useRef(false);
  const isDragging = useRef(false);
  const isInteracting = useRef(false);

  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const isDrag = useRef(false);

  // ─────────────────────────────────────────────────────────────
  // ITEMS (infinite loop)
  // ─────────────────────────────────────────────────────────────
  const items = loading
    ? Array.from({ length: 10 }, (_, i) => ({
        _id: `sk-${i}`,
        __skeleton: true,
      }))
    : [...products, ...products, ...products];

  const itemCount = loading ? 10 : products.length;
  const singleSetWidth = itemCount * (cardWidth + GAP);

  // ─────────────────────────────────────────────────────────────
  // AUTO SCROLL LOOP
  // ─────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    if (
      !trackRef.current ||
      pausedRef.current ||
      isDragging.current ||
      isInteracting.current
    ) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    posRef.current += SPEED;

    if (posRef.current >= singleSetWidth) {
      posRef.current -= singleSetWidth;
    }

    trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
    rafRef.current = requestAnimationFrame(tick);
  }, [singleSetWidth]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // ─────────────────────────────────────────────────────────────
  // DRAG HANDLERS
  // ─────────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDragging.current = true;
    isInteracting.current = true;
    isDrag.current = false;

    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const delta = dragStartX.current - e.clientX;

    if (Math.abs(delta) > 10) {
      isDrag.current = true;
    }

    let newPos = dragStartPos.current + delta;

    if (newPos < 0) newPos += singleSetWidth;
    if (newPos >= singleSetWidth) newPos -= singleSetWidth;

    posRef.current = newPos;

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-newPos}px)`;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
    // ❗ do NOT reset interaction here
    // wait for mouse leave
  };

  // ─────────────────────────────────────────────────────────────
  // CLICK (prevent accidental clicks during drag)
  // ─────────────────────────────────────────────────────────────
  const onClick = (e: React.MouseEvent) => {
    if (isDrag.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true;
        isInteracting.current = true;
      }}
      onMouseLeave={() => {
        if (!isDragging.current) {
          pausedRef.current = false;
          isInteracting.current = false;
        }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={onClick}
      style={{
        cursor: isDragging.current ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
    >
      {/* Left Fade */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "30px",
          background:
            "linear-gradient(to right, var(--rj-bg, #f8f5f0), transparent)",
        }}
      />

      {/* Right Fade */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "30px",
          background:
            "linear-gradient(to left, var(--rj-bg, #f8f5f0), transparent)",
        }}
      />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex"
        style={{
          gap: `${GAP}px`,
          willChange: "transform",
          width: "max-content",
          paddingBottom: "8px",
        }}
      >
        {items.map((item, i) => {
          if ("__skeleton" in item) {
            return <SkeletonCard key={`sk-${i}`} width={cardWidth} />;
          }

          const product = item as ApiProduct;

          return (
            <div
              key={`${product._id}-${i}`}
              style={{ flexShrink: 0, width: cardWidth }}
              className="select-none"
            >
              <ProductCardCarousel product={toCardProduct(product)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
export default function ProductGridCarousel() {
  const {
    filtered: products,
    loading,
    error,
    reload,
  } = useProducts({ tag: "New", limit: 20 });
  const cardWidth = useCardWidth();

  const SlicedProduct = products.slice(0, 10);

  console.log(SlicedProduct);

  return (
    <section className="py-14" style={{ overflow: "hidden" }}>
      <div className="container-rj">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p
              className="label-accent mb-2.5"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Just Arrived
            </p>
            <div className="flex items-center gap-4">
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "rgba(252,193,81,0.9)" }}
              />
              <h2 className="heading-lg leading-tight whitespace-nowrap">
                New Arrivals
              </h2>
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "rgba(252,193,81,0.9)" }}
              />
            </div>
          </div>

          <Link
            href="/collections/new-arrivals"
            className="group flex items-center gap-1.5 font-cinzel text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70 self-start sm:self-auto"
            style={{ color: "var(--rj-emerald)" }}
          >
            View All
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* ── Error state ── */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <p
            className="font-cinzel text-sm tracking-widest text-center"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            Couldn't load new arrivals
          </p>
          <button
            onClick={reload}
            className="font-cinzel text-[11px] tracking-widest uppercase px-5 py-2 rounded-full transition-all hover:opacity-80"
            style={{
              border: "1px solid rgba(252,193,81,0.6)",
              color: "var(--rj-gold)",
            }}
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Infinite scroll marquee (full bleed, no container padding) ── */}
      {!error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MarqueeTrack
            products={SlicedProduct}
            loading={loading}
            cardWidth={cardWidth}
          />
        </motion.div>
      )}

      {/* ── Hint text ── */}
      {!loading && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-center mt-6"
          style={{ color: "rgba(0,55,32,0.35)" }}
        >
          Hover to pause · Drag to explore
        </motion.p>
      )}
    </section>
  );
}
