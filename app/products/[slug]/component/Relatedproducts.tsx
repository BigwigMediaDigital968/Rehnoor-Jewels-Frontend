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
  WifiOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Product } from "../../../types/Product.types";
import { useWishlistStore } from "@/app/store/cartStore";
import {
  fetchPublicProducts,
  fmt,
  type ApiProduct,
} from "@/app/lib/api/productLive";

// ─────────────────────────────────────────────────────────────────
// ADAPTER
// ─────────────────────────────────────────────────────────────────
function adaptProduct(p: ApiProduct): Product {
  return {
    id: p.slug || p._id,
    name: p.name,
    subtitle: p.subtitle || "",
    price:
      typeof p.price === "number"
        ? fmt(p.price)
        : (p as any).priceFormatted || String(p.price),
    originalPrice:
      (p as any).originalPriceFormatted ||
      (p.originalPrice && typeof p.originalPrice === "number"
        ? fmt(p.originalPrice)
        : p.originalPrice
          ? String(p.originalPrice)
          : undefined),
    tag: p.tag as Product["tag"],
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category,
    description: p.shortDescription,
    href: `/products/${p.slug || p._id}`,
    images:
      Array.isArray(p.images) && p.images.length > 0
        ? p.images
        : [
            {
              src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
              alt: p.name,
            },
          ],
    sizes: p.sizes || [],
  };
}

// ─────────────────────────────────────────────────────────────────
// CAROUSEL CONFIG
// ─────────────────────────────────────────────────────────────────
const GAP = 12;

function useCardsVisible() {
  const [visible, setVisible] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setVisible(2);
      else if (w < 640) setVisible(2);
      else if (w < 1024) setVisible(3);
      else setVisible(4);
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
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="animate-pulse"
        style={{ aspectRatio: "1/1", background: "rgba(255,255,255,0.08)" }}
      />
      <div className="p-3 flex flex-col gap-2">
        <div
          className="h-3 rounded-full animate-pulse w-3/4"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <div
          className="h-2.5 rounded-full animate-pulse w-1/2"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
        <div
          className="h-3 rounded-full animate-pulse w-1/3 mt-1"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MINI PRODUCT CARD
// ─────────────────────────────────────────────────────────────────
function RelatedCard({ product }: { product: Product }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const discountPct = product.originalPrice
    ? Math.round(
        (1 -
          parseInt(product.price.replace(/[^\d]/g, ""), 10) /
            parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)) *
          100,
      )
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src || "",
      price: product.price,
      priceNum: parseInt(product.price.replace(/[^\d]/g, ""), 10),
      originalPrice: product.originalPrice,
      href: product.href,
      category: product.category,
      tag: product.tag,
    });
  };

  // console.log(product);

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
          ? "0 12px 36px rgba(0,0,0,0.18)"
          : "0 2px 10px rgba(0,0,0,0.08)",
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

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

        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: wishlisted
              ? "rgba(252,193,81,0.15)"
              : "rgba(255,255,255,0.93)",
            border: wishlisted
              ? "1px solid rgba(252,193,81,0.4)"
              : "1px solid transparent",
            cursor: "pointer",
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={12}
            style={{
              fill: wishlisted ? "var(--rj-gold)" : "transparent",
              color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
              transition: "all 0.25s",
            }}
          />
        </button>

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
        {product.rating && product.rating > 0 && (
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
            {product.reviewCount && product.reviewCount > 0 && (
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
          className="font-cormorant font-light leading-snug mb-0.5 line-clamp-2 transition-colors"
          style={{
            fontSize: "clamp(0.85rem,1.4vw,1rem)",
            color: hovered ? "var(--rj-emerald)" : "var(--rj-charcoal)",
          }}
        >
          {product.name}
        </h3>
        {/* <p
          className="text-[10px] mb-2 line-clamp-1"
          style={{ color: "var(--rj-ash)" }}
        >
          {product.subtitle}
        </p> */}
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
  collectionSlug,
  currentProductId, // product slug — used for dedup & href comparison
  currentProductDbId, // product _id  — used for dedup fallback
}: {
  collectionSlug?: string;
  currentProductId?: string;
  currentProductDbId?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!collectionSlug) return;

    let cancelled = false;
    setLoading(true);
    setError(false);
    setProducts([]);

    fetchPublicProducts({
      collection: collectionSlug, // e.g. "chains-for-men" ← now correct
      limit: 12,
      sort: "createdAt",
      order: "desc",
    })
      .then((res) => {
        if (cancelled) return;
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const filtered = res.data
            .filter((p: ApiProduct) => {
              // Exclude current product by slug, _id, or href match
              if (!currentProductId && !currentProductDbId) return true;
              const matchesSlug =
                currentProductId && p.slug === currentProductId;
              const matchesId =
                currentProductDbId && p._id === currentProductDbId;
              return !matchesSlug && !matchesId;
            })
            .map(adaptProduct);
          setProducts(filtered);
        } else {
          // API returned empty — not a network error, just no products
          setProducts([]);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [collectionSlug, currentProductId, currentProductDbId]);

  console.log(collectionSlug);

  // ── Carousel state ──────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsVisible = useCardsVisible();
  const maxIndex = Math.max(0, products.length - cardsVisible);
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

  // Hide entirely if nothing to show after load
  if (!loading && !error && products.length === 0) return null;

  return (
    <section
      className="py-10 md:py-15"
      style={{ background: "var(--rj-charcoal)" }}
    >
      <div className="container-rj">
        {/* ── Heading ── */}
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
            {!loading && !error && products.length > cardsVisible && (
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
            )}
          </div>
        </motion.div>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${cardsVisible}, 1fr)` }}
          >
            {Array.from({ length: cardsVisible }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {!loading && error && (
          <div className="flex flex-col items-center py-12 gap-3">
            <WifiOff size={24} style={{ color: "rgba(255,255,255,0.2)" }} />
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Could not load related products
            </p>
          </div>
        )}

        {/* ── Carousel ── */}
        {!loading && !error && products.length > 0 && (
          <>
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
                {products?.map((p) => (
                  <div
                    key={p.id}
                    className="py-2"
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

            {/* Dots + mobile nav */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={14} />
              </button>

              {maxIndex > 0 && (
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === index ? "20px" : "6px",
                        height: "6px",
                        background:
                          i === index
                            ? "var(--rj-gold)"
                            : "rgba(255,255,255,0.2)",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => goTo(index + 1)}
                disabled={index >= maxIndex}
                className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all disabled:opacity-25"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
