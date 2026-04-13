"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  };
}

// ─────────────────────────────────────────────────────────────────
// RESPONSIVE CARDS COUNT — 1 on mobile, more on larger screens
// ─────────────────────────────────────────────────────────────────
function useCardsVisible() {
  const [visible, setVisible] = useState(5);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480)
        setVisible(1); // mobile: 1 card
      else if (w < 640)
        setVisible(2); // large mobile: 2 cards
      else if (w < 1024)
        setVisible(3); // tablet: 3 cards
      else if (w < 1280)
        setVisible(4); // small desktop: 4 cards
      else setVisible(5); // desktop: 5 cards
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
      className="rounded-xl overflow-hidden animate-pulse flex-shrink-0 w-full"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        className="w-full"
        style={{ paddingTop: "130%", background: "rgba(255,255,255,0.07)" }}
      />
      <div className="p-4 space-y-2">
        <div
          className="h-3 rounded-full"
          style={{ width: "70%", background: "rgba(255,255,255,0.07)" }}
        />
        <div
          className="h-3 rounded-full"
          style={{ width: "50%", background: "rgba(255,255,255,0.05)" }}
        />
        <div
          className="h-4 rounded-full mt-3"
          style={{ width: "40%", background: "rgba(252,193,81,0.12)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DOT INDICATOR (mobile)
// ─────────────────────────────────────────────────────────────────
function DotIndicator({
  total,
  current,
  onDotClick,
}: {
  total: number;
  current: number;
  onDotClick: (i: number) => void;
}) {
  const maxDots = 10;
  const count = Math.min(total, maxDots);
  return (
    <div className="flex items-center justify-center gap-1.5 mt-5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className="rounded-full transition-all duration-300 focus:outline-none"
          style={{
            width: i === current ? "20px" : "6px",
            height: "6px",
            background:
              i === current ? "var(--rj-gold)" : "rgba(255,255,255,0.2)",
            boxShadow: i === current ? "0 0 8px rgba(252,193,81,0.6)" : "none",
          }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────
const GAP = 12; // px gap between cards

export default function ProductGridCarousel() {
  const {
    filtered: products,
    loading,
    error,
    reload,
  } = useProducts({ tag: "New", limit: 20 });

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);

  const cardsVisible = useCardsVisible();
  const isMobile = cardsVisible === 1;
  const total = loading ? cardsVisible * 2 : products.length;
  const maxIndex = Math.max(0, total - cardsVisible);

  const [index, setIndex] = useState(0);

  // Motion values for smooth physics-based dragging
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 400, damping: 40, mass: 0.8 });

  // Pointer drag state
  const isDragging = useRef(false);
  const pointerStartX = useRef(0);
  const scrollStartOffset = useRef(0);
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const hasDragged = useRef(false);
  const animControls = useRef<ReturnType<typeof animate> | null>(null);

  // Thumb drag
  const thumbDragging = useRef(false);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // ── Card width calculation ──────────────────────────────────────
  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 0;
    const w = containerRef.current.offsetWidth;
    return (w - GAP * (cardsVisible - 1)) / cardsVisible;
  }, [cardsVisible]);

  const getOffsetForIndex = useCallback(
    (i: number) => {
      const cardW = getCardWidth();
      return i * (cardW + GAP);
    },
    [getCardWidth],
  );

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(i, maxIndex));
      setIndex(clamped);
      const offset = getOffsetForIndex(clamped);
      if (animControls.current) animControls.current.stop();
      animControls.current = animate(dragX, -offset, {
        type: "spring",
        stiffness: 380,
        damping: 38,
        mass: 0.9,
      });
    },
    [maxIndex, getOffsetForIndex, dragX],
  );

  // Keep spring in sync when index changes externally (resize, etc.)
  useEffect(() => {
    const offset = getOffsetForIndex(index);
    if (animControls.current) animControls.current.stop();
    animControls.current = animate(dragX, -offset, {
      type: "spring",
      stiffness: 380,
      damping: 38,
      mass: 0.9,
    });
  }, [index, getOffsetForIndex, dragX]);

  // ── Pointer events (mouse + trackpad + touch on desktop) ────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only for left button (mouse) or touch
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      hasDragged.current = false;
      pointerStartX.current = e.clientX;
      scrollStartOffset.current = dragX.get();
      lastPointerX.current = e.clientX;
      lastPointerTime.current = performance.now();
      velocity.current = 0;
      if (animControls.current) animControls.current.stop();
    },
    [dragX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = e.clientX - pointerStartX.current;

      if (Math.abs(delta) > 4) hasDragged.current = true;

      // Track velocity
      const now = performance.now();
      const dt = now - lastPointerTime.current;
      if (dt > 0) {
        velocity.current = (e.clientX - lastPointerX.current) / dt;
      }
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;

      // Apply rubber-band resistance at edges
      const maxOffset = getOffsetForIndex(maxIndex);
      let newOffset = scrollStartOffset.current - delta;
      if (newOffset < -maxOffset * 0.05) {
        // Rubber band left
        const over = newOffset - -maxOffset * 0.05;
        newOffset = -maxOffset * 0.05 + over * 0.3;
      } else if (newOffset > maxOffset + maxOffset * 0.05) {
        // Rubber band right
        const over = newOffset - (maxOffset + maxOffset * 0.05);
        newOffset = maxOffset + maxOffset * 0.05 + over * 0.3;
      }

      dragX.set(-newOffset);
    },
    [dragX, maxIndex, getOffsetForIndex],
  );

  const onPointerUp = useCallback(
    (_e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const currentOffset = -dragX.get();
      const cardW = getCardWidth();
      const step = cardW + GAP;

      // Momentum-based snapping
      const momentumOffset = currentOffset - velocity.current * 150;
      let targetIndex = Math.round(momentumOffset / step);
      targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));

      // If dragged less than 30% of card, snap back unless momentum carries
      const nearestIndex = Math.round(currentOffset / step);
      const nearestClamped = Math.max(0, Math.min(nearestIndex, maxIndex));

      const finalIndex = hasDragged.current ? targetIndex : nearestClamped;
      goTo(finalIndex);
    },
    [dragX, getCardWidth, maxIndex, velocity, goTo],
  );

  // ── Touch events for mobile (native feel) ──────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = null;
      pointerStartX.current = e.touches[0].clientX;
      scrollStartOffset.current = dragX.get();
      lastPointerX.current = e.touches[0].clientX;
      lastPointerTime.current = performance.now();
      velocity.current = 0;
      hasDragged.current = false;
      if (animControls.current) animControls.current.stop();
    },
    [dragX],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (isHorizontalSwipe.current === null) {
        isHorizontalSwipe.current = Math.abs(dx) > Math.abs(dy);
      }
      if (!isHorizontalSwipe.current) return;

      e.preventDefault();
      hasDragged.current = true;

      const delta = e.touches[0].clientX - pointerStartX.current;
      const now = performance.now();
      const dt = now - lastPointerTime.current;
      if (dt > 0)
        velocity.current = (e.touches[0].clientX - lastPointerX.current) / dt;
      lastPointerX.current = e.touches[0].clientX;
      lastPointerTime.current = now;

      const maxOffset = getOffsetForIndex(maxIndex);
      let newOffset = scrollStartOffset.current - delta;
      // Rubber band
      if (newOffset < 0) newOffset = newOffset * 0.25;
      if (newOffset > maxOffset)
        newOffset = maxOffset + (newOffset - maxOffset) * 0.25;

      dragX.set(-newOffset);
    },
    [dragX, maxIndex, getOffsetForIndex],
  );

  const onTouchEnd = useCallback(() => {
    const currentOffset = -dragX.get();
    const cardW = getCardWidth();
    const step = cardW + GAP;
    const momentumOffset = currentOffset - velocity.current * 180;
    let targetIndex = Math.round(momentumOffset / step);
    targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
    goTo(targetIndex);
  }, [dragX, getCardWidth, maxIndex, velocity, goTo]);

  // ── Thumb slider ────────────────────────────────────────────────
  const thumbW = total > 0 ? (cardsVisible / total) * 100 : 100;
  const thumbLeft = maxIndex > 0 ? (index / maxIndex) * (100 - thumbW) : 0;

  const onThumbPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (loading) return;
      e.preventDefault();
      e.stopPropagation();
      thumbDragging.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        if (!thumbTrackRef.current || !thumbDragging.current) return;
        const rect = thumbTrackRef.current.getBoundingClientRect();
        const pct = Math.max(
          0,
          Math.min(1, (ev.clientX - rect.left) / rect.width),
        );
        goTo(Math.round(pct * maxIndex));
      };
      const onUp = () => {
        thumbDragging.current = false;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [goTo, maxIndex, loading],
  );

  const onThumbTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (!thumbTrackRef.current || loading) return;
      const rect = thumbTrackRef.current.getBoundingClientRect();
      const pct = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width),
      );
      goTo(Math.round(pct * maxIndex));
    },
    [goTo, maxIndex, loading],
  );

  // ── Prevent click on card after drag ────────────────────────────
  const onTrackClick = useCallback((e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // ── Render items ─────────────────────────────────────────────────
  const renderItems = () => {
    if (loading) {
      return Array.from({ length: cardsVisible * 2 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          style={{ flexShrink: 0, width: `${getCardWidth() || 200}px` }}
        >
          <SkeletonCard />
        </div>
      ));
    }
    return products.map((product) => (
      <div
        key={product._id}
        style={{ flexShrink: 0, width: `${getCardWidth() || 200}px` }}
        className="select-none"
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

            {/* Desktop arrows — hidden on mobile */}
            <div className="hidden md:flex items-center gap-2">
              <NavButton
                direction="left"
                onClick={() => goTo(index - 1)}
                disabled={index === 0 || loading}
              />
              <NavButton
                direction="right"
                onClick={() => goTo(index + 1)}
                disabled={index >= maxIndex || loading}
              />
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
            {/* Track container */}
            <div
              ref={containerRef}
              className="overflow-hidden"
              style={{
                cursor: isDragging.current ? "grabbing" : "grab",
                touchAction: "pan-y",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={onTrackClick}
            >
              <motion.div
                ref={trackRef}
                className="flex"
                style={{
                  gap: `${GAP}px`,
                  x: springX,
                  alignItems: "stretch",
                  willChange: "transform",
                }}
              >
                {renderItems()}
              </motion.div>
            </div>

            {/* ── Mobile: dots indicator ── */}
            {isMobile && !loading && (
              <DotIndicator
                total={Math.min(products.length, 10)}
                current={Math.min(index, 9)}
                onDotClick={goTo}
              />
            )}

            {/* ── Mobile: arrow buttons row ── */}
            {isMobile && (
              <div className="flex items-center justify-center gap-6 mt-5">
                <NavButton
                  direction="left"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0 || loading}
                  size="lg"
                />
                <span
                  className="font-cinzel text-[11px] tracking-widest tabular-nums"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {loading
                    ? "—"
                    : `${String(index + 1).padStart(2, "0")} / ${String(products.length).padStart(2, "0")}`}
                </span>
                <NavButton
                  direction="right"
                  onClick={() => goTo(index + 1)}
                  disabled={index >= maxIndex || loading}
                  size="lg"
                />
              </div>
            )}

            {/* ── Desktop: slider + counter ── */}
            {!isMobile && (
              <div className="mt-8 flex items-center gap-4">
                {/* Mobile prev (sm/tablet range) */}
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
                  ref={thumbTrackRef}
                  className="flex-1 relative rounded-full cursor-pointer"
                  style={{
                    height: "4px",
                    background: "rgba(255,255,255,0.07)",
                  }}
                  onClick={onThumbTrackClick}
                >
                  {/* Background fill */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
                    style={{
                      width: `${thumbLeft + thumbW}%`,
                      background: "rgba(252,193,81,0.12)",
                      transition: "width 0.35s ease",
                    }}
                  />

                  {/* Draggable thumb */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${thumbLeft}%`,
                      width: `${thumbW}%`,
                      height: "6px",
                      background: loading
                        ? "rgba(255,255,255,0.1)"
                        : "var(--gradient-gold)",
                      boxShadow: loading
                        ? "none"
                        : "0 0 14px rgba(252,193,81,0.5)",
                      cursor: "grab",
                      transition: thumbDragging.current
                        ? "none"
                        : "left 0.3s ease",
                    }}
                    onPointerDown={onThumbPointerDown}
                    whileHover={!loading ? { scaleY: 1.5, cursor: "grab" } : {}}
                    whileTap={
                      !loading ? { scaleY: 1.8, cursor: "grabbing" } : {}
                    }
                  />
                </div>

                {/* Mobile next (sm/tablet range) */}
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
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAV BUTTON
// ─────────────────────────────────────────────────────────────────
function NavButton({
  direction,
  onClick,
  disabled,
  size = "sm",
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "w-12 h-12" : "w-9 h-9";
  const iconSize = size === "lg" ? 16 : 14;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${dim} rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400`}
      style={{
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
        cursor: disabled ? "default" : "pointer",
        background: "rgba(255,255,255,0.04)",
      }}
      whileHover={
        !disabled
          ? {
              scale: 1.08,
              background: "rgba(252,193,81,0.1)",
              borderColor: "rgba(252,193,81,0.4)",
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.94 } : {}}
      animate={{ opacity: disabled ? 0.25 : 1 }}
      transition={{ duration: 0.18 }}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <ChevronLeft size={iconSize} />
      ) : (
        <ChevronRight size={iconSize} />
      )}
    </motion.button>
  );
}
