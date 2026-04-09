"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCardCarousel from "./Productcardcarousel";
import { useProducts } from "../../lib/hooks/useProducts";
import type { ApiProduct } from "../../lib/api/productLive";
import type { Product, ProductTag } from "../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// HELPERS — map ApiProduct → Product (what ProductCardCarousel expects)
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
    // Cast to ProductTag — the API and the union share the same string values
    tag: p.tag as ProductTag | undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category,
    description: p.shortDescription,
    href: `/products/${p.slug}`,
    images: p.images,
    sizes: p.sizes,
    ourPromise: p.ourPromise,
  };
}

// ─────────────────────────────────────────────────────────────────
// RESPONSIVE CARDS COUNT
// ─────────────────────────────────────────────────────────────────
function useCardsVisible() {
  const [visible, setVisible] = useState(5);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(2);
      else if (w < 1024) setVisible(3);
      else if (w < 1280) setVisible(4);
      else setVisible(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return visible;
}

// ─────────────────────────────────────────────────────────────────
// SKELETON CARD
// ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-lg overflow-hidden animate-pulse flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      {/* Image placeholder */}
      <div
        className="w-full"
        style={{ paddingTop: "120%", background: "rgba(255,255,255,0.08)" }}
      />
      {/* Text placeholders */}
      <div className="p-3 space-y-2">
        <div
          className="h-3 rounded"
          style={{ width: "70%", background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="h-3 rounded"
          style={{ width: "50%", background: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="h-4 rounded mt-3"
          style={{ width: "40%", background: "rgba(252,193,81,0.15)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
const GAP = 12; // px gap between cards

export default function ProductGridCarousel() {
  // ── Live data ────────────────────────────────────────────────────
  const {
    filtered: products,
    loading,
    error,
    reload,
  } = useProducts({
    tag: "New",
    limit: 20,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbTrack = useRef<HTMLDivElement>(null);
  const thumbDragging = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartI = useRef(0);

  const cardsVisible = useCardsVisible();
  const total = loading ? cardsVisible : products.length; // show skeleton count while loading
  const maxIndex = Math.max(0, total - cardsVisible);

  const [index, setIndex] = useState(0);

  // Clamp on resize / data change
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, maxIndex));
      setIndex(clamped);
    },
    [maxIndex],
  );

  // ── Thumb math ──────────────────────────────────────────────────
  const thumbW = total > 0 ? (cardsVisible / total) * 100 : 100;
  const thumbLeft = maxIndex > 0 ? (index / maxIndex) * (100 - thumbW) : 0;

  // ── Thumb mouse drag ────────────────────────────────────────────
  const onThumbMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      thumbDragging.current = true;
      const onMove = (ev: MouseEvent) => {
        if (!thumbTrack.current || !thumbDragging.current) return;
        const rect = thumbTrack.current.getBoundingClientRect();
        const rawPct = (ev.clientX - rect.left) / rect.width;
        const clamped = Math.max(0, Math.min(1, rawPct));
        goTo(Math.round(clamped * maxIndex));
      };
      const onUp = () => {
        thumbDragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [goTo, maxIndex],
  );

  // ── Thumb touch ─────────────────────────────────────────────────
  const onThumbTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!thumbTrack.current) return;
      const rect = thumbTrack.current.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.touches[0].clientX - rect.left) / rect.width),
      );
      goTo(Math.round(pct * maxIndex));
    },
    [goTo, maxIndex],
  );

  // ── Card swipe (touch) ──────────────────────────────────────────
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      dragStartX.current = e.touches[0].clientX;
      dragStartI.current = index;
    },
    [index],
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = dragStartX.current - e.changedTouches[0].clientX;
      if (delta > 50) goTo(dragStartI.current + 1);
      else if (delta < -50) goTo(dragStartI.current - 1);
    },
    [goTo],
  );

  const [trackOffset, setTrackOffset] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.offsetWidth;
      const cardW = (containerW - GAP * (cardsVisible - 1)) / cardsVisible;
      setTrackOffset(index * (cardW + GAP));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [index, cardsVisible]);

  // ── Render items (skeleton while loading) ──────────────────────
  const renderItems = () => {
    if (loading) {
      return Array.from({ length: cardsVisible * 2 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          style={{
            flexShrink: 0,
            width: `calc((100vw - var(--container-padding, 3rem) * 2 - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`,
          }}
        >
          <SkeletonCard />
        </div>
      ));
    }

    return products.map((product) => (
      <div
        key={product._id}
        style={{
          flexShrink: 0,
          width: `calc((100vw - var(--container-padding, 3rem) * 2 - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`,
        }}
      >
        <ProductCardCarousel product={toCardProduct(product)} />
      </div>
    ));
  };

  return (
    <section
      className="section-padding overflow-hidden"
      style={{ background: "var(--rj-charcoal)" }}
    >
      <div className="container-rj">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ Just Arrived
            </p>
            <div className="flex items-center gap-4">
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "rgba(252,193,81,0.4)" }}
              />
              <h2 className="heading-lg text-white leading-tight whitespace-nowrap">
                New Arrivals
              </h2>
              <div
                className="h-px w-10 flex-shrink-0"
                style={{ background: "rgba(252,193,81,0.4)" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/collections/new-arrivals"
              className="group flex items-center gap-1.5 font-cinzel text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: "var(--rj-gold)" }}
            >
              View All
              <ArrowRight
                size={12}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Desktop arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => goTo(index - 1)}
                disabled={index === 0 || loading}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                  background:
                    index === 0 ? "transparent" : "rgba(255,255,255,0.05)",
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => goTo(index + 1)}
                disabled={index >= maxIndex || loading}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                  background:
                    index >= maxIndex
                      ? "transparent"
                      : "rgba(255,255,255,0.05)",
                }}
                aria-label="Next"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Error state ── */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p
              className="font-cinzel text-sm tracking-widest text-center"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Couldn't load new arrivals
            </p>
            <button
              onClick={reload}
              className="font-cinzel text-[11px] tracking-widest uppercase px-5 py-2 rounded-full transition-all hover:opacity-80"
              style={{
                border: "1px solid rgba(252,193,81,0.4)",
                color: "var(--rj-gold)",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Carousel ── */}
        {!error && (
          <>
            <div
              ref={containerRef}
              className="overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                ref={trackRef}
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(-${trackOffset}px)`,
                  transition: isDragging.current
                    ? "none"
                    : "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                  alignItems: "stretch",
                }}
              >
                {renderItems()}
              </div>
            </div>

            {/* ── Slider + mobile nav ── */}
            <div className="mt-8 flex items-center gap-4">
              {/* Mobile: prev */}
              <button
                onClick={() => goTo(index - 1)}
                disabled={index === 0 || loading}
                className="md:hidden w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={13} />
              </button>

              {/* Thumb track */}
              <div
                ref={thumbTrack}
                className="flex-1 relative rounded-full cursor-pointer"
                style={{ height: "4px", background: "rgba(255,255,255,0.08)" }}
                onClick={(e) => {
                  if (!thumbTrack.current || loading) return;
                  const rect = thumbTrack.current.getBoundingClientRect();
                  const pct = Math.max(
                    0,
                    Math.min(1, (e.clientX - rect.left) / rect.width),
                  );
                  goTo(Math.round(pct * maxIndex));
                }}
                onTouchMove={onThumbTouchMove}
              >
                {/* Background fill */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    width: `${thumbLeft + thumbW}%`,
                    background: "rgba(252,193,81,0.15)",
                    transition: "width 0.3s ease",
                  }}
                />

                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 rounded-full cursor-grab active:cursor-grabbing"
                  style={{
                    left: `${thumbLeft}%`,
                    width: `${thumbW}%`,
                    height: "8px",
                    background: loading
                      ? "rgba(255,255,255,0.1)"
                      : "var(--gradient-gold)",
                    boxShadow: loading
                      ? "none"
                      : "0 0 12px rgba(252,193,81,0.5)",
                    transition: thumbDragging.current
                      ? "none"
                      : "left 0.3s ease",
                  }}
                  onMouseDown={!loading ? onThumbMouseDown : undefined}
                  whileHover={!loading ? { scaleY: 1.4 } : {}}
                  whileTap={!loading ? { scaleY: 1.6, cursor: "grabbing" } : {}}
                />
              </div>

              {/* Mobile: next */}
              <button
                onClick={() => goTo(index + 1)}
                disabled={index >= maxIndex || loading}
                className="md:hidden w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
                aria-label="Next"
              >
                <ChevronRight size={13} />
              </button>

              {/* Counter */}
              <span
                className="font-cinzel text-[10px] tracking-widest flex-shrink-0 tabular-nums"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {loading ? "—" : String(index + 1).padStart(2, "0")} /{" "}
                {loading ? "—" : String(products.length).padStart(2, "0")}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
