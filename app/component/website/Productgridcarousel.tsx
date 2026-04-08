// "use client";

// import { useRef, useState, useEffect, useCallback } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import ProductCardCarousel from "./Productcardcarousel";
// import type { Product } from "../../types/Product.types";

// // ─────────────────────────────────────────────────────────────────
// // DATA
// // ─────────────────────────────────────────────────────────────────
// const newArrivals: Product[] = [
//   {
//     id: "nawabi-chain-22kt-new",
//     name: "Nawabi Chain",
//     subtitle: "22kt Yellow Gold · 18 inch",
//     price: "₹8,999",
//     originalPrice: "₹10,499",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Chains",
//     description:
//       "A bold, hand-crafted Nawabi chain in BIS hallmarked 22kt gold.",
//     href: "/products/nawabi-chain-22kt",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
//         alt: "Nawabi Chain",
//       },
//       {
//         src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
//         alt: "Nawabi Chain detail",
//       },
//     ],
//     sizes: [
//       { label: '16"', available: true },
//       { label: '18"', available: true },
//       { label: '20"', available: true },
//       { label: '22"', available: false },
//     ],
//   },
//   {
//     id: "cuban-link-chain-new",
//     name: "Cuban Link Chain",
//     subtitle: "22kt Yellow Gold · 20 inch",
//     price: "₹11,299",
//     originalPrice: "₹13,500",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Chains",
//     description: "Street-ready Cuban link crafted in solid 22kt gold.",
//     href: "/products/cuban-link-chain",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
//         alt: "Cuban Link Chain",
//       },
//     ],
//     sizes: [
//       { label: '18"', available: true },
//       { label: '20"', available: true },
//       { label: '22"', available: true },
//     ],
//   },
//   {
//     id: "royal-kada-new",
//     name: "Royal Kada",
//     subtitle: "22kt Yellow Gold · Adjustable",
//     price: "₹12,499",
//     originalPrice: "₹14,999",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Kadas",
//     description: "A heavy, solid Royal Kada forged in 22kt gold.",
//     href: "/products/royal-kada-heavy",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=600&q=80",
//         alt: "Royal Kada",
//       },
//       {
//         src: "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=600&q=80",
//         alt: "Royal Kada on wrist",
//       },
//     ],
//     sizes: [
//       { label: "S", available: true },
//       { label: "M", available: true },
//       { label: "L", available: true },
//     ],
//   },
//   {
//     id: "signet-ring-new",
//     name: "Signet Ring",
//     subtitle: "22kt Yellow Gold · Men's",
//     price: "₹5,299",
//     originalPrice: "₹6,200",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Rings",
//     description:
//       "A flat-top signet ring in solid 22kt gold with free engraving.",
//     href: "/products/signet-ring-gold",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
//         alt: "Signet Ring",
//       },
//       {
//         src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
//         alt: "Signet Ring detail",
//       },
//     ],
//     sizes: [
//       { label: "18", available: true },
//       { label: "20", available: true },
//       { label: "22", available: true },
//       { label: "24", available: true },
//     ],
//   },
//   {
//     id: "link-bracelet-new",
//     name: "Link Bracelet",
//     subtitle: "22kt Yellow Gold · 8 inch",
//     price: "₹7,199",
//     originalPrice: "₹8,500",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Bracelets",
//     description:
//       "Rectangular flat links in 22kt gold — a modern statement piece.",
//     href: "/products/link-bracelet-gold",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80",
//         alt: "Link Bracelet",
//       },
//     ],
//     sizes: [
//       { label: '7"', available: true },
//       { label: '8"', available: true },
//       { label: '9"', available: false },
//     ],
//   },
//   {
//     id: "sol-pendant-new",
//     name: "Sol Pendant",
//     subtitle: "22kt Yellow Gold · Unisex",
//     price: "₹4,499",
//     originalPrice: "₹5,200",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Pendants",
//     description:
//       "A circular sun motif pendant in 22kt gold — wear it on any chain.",
//     href: "/products/sol-pendant-gold",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
//         alt: "Sol Pendant",
//       },
//     ],
//     sizes: [{ label: "Free", available: true }],
//   },
//   {
//     id: "rope-chain-new",
//     name: "Rope Chain",
//     subtitle: "22kt Yellow Gold · 22 inch",
//     price: "₹7,499",
//     originalPrice: "₹8,800",
//     tag: "New",
//     rating: 4,
//     reviewCount: 1,
//     category: "Chains",
//     description: "A timeless twisted rope chain in 22kt BIS hallmarked gold.",
//     href: "/products/rope-chain-gold",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
//         alt: "Rope Chain",
//       },
//     ],
//     sizes: [
//       { label: '18"', available: true },
//       { label: '20"', available: true },
//       { label: '22"', available: true },
//     ],
//   },
//   {
//     id: "moghul-kada-new",
//     name: "Moghul Kada",
//     subtitle: "22kt Yellow Gold · Carved",
//     price: "₹15,999",
//     originalPrice: "₹18,500",
//     tag: "New",
//     rating: 5,
//     reviewCount: 1,
//     category: "Kadas",
//     description: "48 hours of hand-carving by master artisans in Jaipur.",
//     href: "/products/moghul-kada-carved",
//     images: [
//       {
//         src: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=80",
//         alt: "Moghul Kada",
//       },
//     ],
//     sizes: [
//       { label: "S", available: true },
//       { label: "M", available: true },
//       { label: "L", available: true },
//     ],
//   },
// ];

// // ─────────────────────────────────────────────────────────────────
// // RESPONSIVE CARDS COUNT
// // ─────────────────────────────────────────────────────────────────
// function useCardsVisible() {
//   const [visible, setVisible] = useState(5);
//   useEffect(() => {
//     const update = () => {
//       const w = window.innerWidth;
//       if (w < 640) setVisible(2);
//       else if (w < 1024) setVisible(3);
//       else if (w < 1280) setVisible(4);
//       else setVisible(5);
//     };
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return visible;
// }

// // ─────────────────────────────────────────────────────────────────
// // MAIN SECTION
// // ─────────────────────────────────────────────────────────────────
// const GAP = 12; // px gap between cards

// export default function ProductGridCarousel() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);
//   const thumbTrack = useRef<HTMLDivElement>(null);
//   const thumbDragging = useRef(false);
//   const isDragging = useRef(false);
//   const dragStartX = useRef(0);
//   const dragStartI = useRef(0);

//   const cardsVisible = useCardsVisible();
//   const total = newArrivals.length;
//   const maxIndex = Math.max(0, total - cardsVisible);

//   const [index, setIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Clamp on resize
//   useEffect(() => {
//     setIndex((i) => Math.min(i, maxIndex));
//   }, [maxIndex]);

//   const goTo = useCallback(
//     (i: number) => {
//       const clamped = Math.max(0, Math.min(i, maxIndex));
//       setIndex(clamped);
//     },
//     [maxIndex],
//   );

//   // ── Thumb math ──────────────────────────────────────────────────
//   // thumbW  = what % of the track the thumb occupies
//   // thumbLeft = where the left edge of the thumb sits (% of track)
//   const thumbW = total > 0 ? (cardsVisible / total) * 100 : 100;
//   const thumbLeft = maxIndex > 0 ? (index / maxIndex) * (100 - thumbW) : 0;

//   // ── Thumb mouse drag ──────────────────────────────────────────
//   const onThumbMouseDown = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();
//       thumbDragging.current = true;

//       const onMove = (ev: MouseEvent) => {
//         if (!thumbTrack.current || !thumbDragging.current) return;
//         const rect = thumbTrack.current.getBoundingClientRect();
//         const rawPct = (ev.clientX - rect.left) / rect.width;
//         const clamped = Math.max(0, Math.min(1, rawPct));
//         goTo(Math.round(clamped * maxIndex));
//       };
//       const onUp = () => {
//         thumbDragging.current = false;
//         window.removeEventListener("mousemove", onMove);
//         window.removeEventListener("mouseup", onUp);
//       };
//       window.addEventListener("mousemove", onMove);
//       window.addEventListener("mouseup", onUp);
//     },
//     [goTo, maxIndex],
//   );

//   // ── Thumb touch ────────────────────────────────────────────────
//   const onThumbTouchMove = useCallback(
//     (e: React.TouchEvent) => {
//       if (!thumbTrack.current) return;
//       const rect = thumbTrack.current.getBoundingClientRect();
//       const pct = Math.max(
//         0,
//         Math.min(1, (e.touches[0].clientX - rect.left) / rect.width),
//       );
//       goTo(Math.round(pct * maxIndex));
//     },
//     [goTo, maxIndex],
//   );

//   // ── Card swipe (touch) ─────────────────────────────────────────
//   const onTouchStart = useCallback(
//     (e: React.TouchEvent) => {
//       dragStartX.current = e.touches[0].clientX;
//       dragStartI.current = index;
//     },
//     [index],
//   );

//   const onTouchEnd = useCallback(
//     (e: React.TouchEvent) => {
//       const delta = dragStartX.current - e.changedTouches[0].clientX;
//       if (delta > 50) goTo(dragStartI.current + 1);
//       else if (delta < -50) goTo(dragStartI.current - 1);
//     },
//     [goTo],
//   );

//   const [trackOffset, setTrackOffset] = useState(0);

//   useEffect(() => {
//     const compute = () => {
//       if (!containerRef.current) return;
//       const containerW = containerRef.current.offsetWidth;
//       const cardW = (containerW - GAP * (cardsVisible - 1)) / cardsVisible;
//       setTrackOffset(index * (cardW + GAP));
//     };
//     compute();
//     window.addEventListener("resize", compute);
//     return () => window.removeEventListener("resize", compute);
//   }, [index, cardsVisible]);

//   return (
//     <section
//       className="section-padding overflow-hidden"
//       style={{ background: "var(--rj-charcoal)" }}
//     >
//       <div className="container-rj">
//         {/* ── Heading ── */}
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
//         >
//           <div>
//             <p
//               className="label-accent mb-3"
//               style={{ color: "var(--rj-gold)" }}
//             >
//               ✦ Just Arrived
//             </p>
//             <div className="flex items-center gap-4">
//               <div
//                 className="h-px w-10 flex-shrink-0"
//                 style={{ background: "rgba(252,193,81,0.4)" }}
//               />
//               <h2 className="heading-lg text-white leading-tight whitespace-nowrap">
//                 New Arrivals
//               </h2>
//               <div
//                 className="h-px w-10 flex-shrink-0"
//                 style={{ background: "rgba(252,193,81,0.4)" }}
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link
//               href="/collections/new-arrivals"
//               className="group flex items-center gap-1.5 font-cinzel text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70"
//               style={{ color: "var(--rj-gold)" }}
//             >
//               View All
//               <ArrowRight
//                 size={12}
//                 className="transition-transform duration-300 group-hover:translate-x-1"
//               />
//             </Link>

//             {/* Desktop arrows */}
//             <div className="hidden md:flex items-center gap-2">
//               <button
//                 onClick={() => goTo(index - 1)}
//                 disabled={index === 0}
//                 className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
//                 style={{
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   color: "#fff",
//                   cursor: "pointer",
//                   background:
//                     index === 0 ? "transparent" : "rgba(255,255,255,0.05)",
//                 }}
//                 aria-label="Previous"
//               >
//                 <ChevronLeft size={15} />
//               </button>
//               <button
//                 onClick={() => goTo(index + 1)}
//                 disabled={index >= maxIndex}
//                 className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-25"
//                 style={{
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   color: "#fff",
//                   cursor: "pointer",
//                   background:
//                     index >= maxIndex
//                       ? "transparent"
//                       : "rgba(255,255,255,0.05)",
//                 }}
//                 aria-label="Next"
//               >
//                 <ChevronRight size={15} />
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/*
//           ── Carousel ────────────────────────────────────────────────
//           FIX: Use a fixed-gap flex row where each card has an exact
//           pixel width. We calculate this via a container ref so gaps
//           are always consistent and no card is narrower or wider.

//           Track uses translateX with a pixel value (not %) so the
//           gap is correctly handled.
//         */}
//         <div
//           ref={containerRef}
//           className="overflow-hidden"
//           onTouchStart={onTouchStart}
//           onTouchEnd={onTouchEnd}
//         >
//           <div
//             ref={trackRef}
//             className="flex"
//             style={{
//               // FIX: pixel-based gap — consistent across all cards
//               gap: `${GAP}px`,
//               transform: `translateX(-${trackOffset}px)`,
//               // FIX: only animate when not touch-dragging
//               transition: isDragging.current
//                 ? "none"
//                 : "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
//               // FIX: equal height for all cards using align-items:stretch
//               alignItems: "stretch",
//             }}
//           >
//             {newArrivals.map((product) => (
//               <div
//                 key={product.id}
//                 style={{
//                   flexShrink: 0,
//                   // FIX: calc() gives each card equal width accounting for gaps
//                   // (containerWidth - gap*(n-1)) / n
//                   width: `calc((100vw - var(--container-padding, 3rem) * 2 - ${GAP * (cardsVisible - 1)}px) / ${cardsVisible})`,
//                 }}
//               >
//                 <ProductCardCarousel product={product} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── Slider + mobile nav ── */}
//         <div className="mt-8 flex items-center gap-4">
//           {/* Mobile: prev */}
//           <button
//             onClick={() => goTo(index - 1)}
//             disabled={index === 0}
//             className="md:hidden w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 disabled:opacity-25"
//             style={{
//               border: "1px solid rgba(255,255,255,0.15)",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//             aria-label="Previous"
//           >
//             <ChevronLeft size={13} />
//           </button>

//           {/* Thumb track */}
//           <div
//             ref={thumbTrack}
//             className="flex-1 relative rounded-full cursor-pointer"
//             style={{ height: "4px", background: "rgba(255,255,255,0.08)" }}
//             onClick={(e) => {
//               if (!thumbTrack.current) return;
//               const rect = thumbTrack.current.getBoundingClientRect();
//               const pct = Math.max(
//                 0,
//                 Math.min(1, (e.clientX - rect.left) / rect.width),
//               );
//               goTo(Math.round(pct * maxIndex));
//             }}
//             onTouchMove={onThumbTouchMove}
//           >
//             {/* Background fill */}
//             <div
//               className="absolute inset-y-0 left-0 rounded-full"
//               style={{
//                 width: `${thumbLeft + thumbW}%`,
//                 background: "rgba(252,193,81,0.15)",
//                 transition: "width 0.3s ease",
//               }}
//             />

//             {/*
//               FIX: Thumb position uses `left` as a % of the track,
//               accounting for the thumb's own width so it never overflows.
//               left = thumbLeft% = (index / maxIndex) * (100 - thumbW)%
//             */}
//             <motion.div
//               className="absolute top-1/2 -translate-y-1/2 rounded-full cursor-grab active:cursor-grabbing"
//               style={{
//                 left: `${thumbLeft}%`,
//                 width: `${thumbW}%`,
//                 height: "8px",
//                 background: "var(--gradient-gold)",
//                 boxShadow: "0 0 12px rgba(252,193,81,0.5)",
//                 transition: thumbDragging.current ? "none" : "left 0.3s ease",
//               }}
//               onMouseDown={onThumbMouseDown}
//               whileHover={{ scaleY: 1.4 }}
//               whileTap={{ scaleY: 1.6, cursor: "grabbing" }}
//             />
//           </div>

//           {/* Mobile: next */}
//           <button
//             onClick={() => goTo(index + 1)}
//             disabled={index >= maxIndex}
//             className="md:hidden w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 disabled:opacity-25"
//             style={{
//               border: "1px solid rgba(255,255,255,0.15)",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//             aria-label="Next"
//           >
//             <ChevronRight size={13} />
//           </button>

//           {/* Counter */}
//           <span
//             className="font-cinzel text-[10px] tracking-widest flex-shrink-0 tabular-nums"
//             style={{ color: "rgba(255,255,255,0.35)" }}
//           >
//             {String(index + 1).padStart(2, "0")} /{" "}
//             {String(total).padStart(2, "0")}
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

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
    tag: (p.tag ?? p.badge) as ProductTag | undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category,
    description: p.description,
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
