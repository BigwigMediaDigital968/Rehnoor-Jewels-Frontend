"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface CollectionMeta {
  id: string;
  name: string;
  label: string;
  tagline: string;

  description: string;
  heroImage: string;
  accentColor: string; // CSS color for tint overlay
  productCount: number;
  purity: string;
  tag?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  breadcrumb: string[]; // e.g. ["Home","Collections","Chains"]
  products: string[]; // ObjectId refs (public list)
}

// ── Default collection data — swap via props/API ──────────────────
const DEFAULT_META: CollectionMeta = {
  id: "chains",
  name: "Chain for Men",
  label: "Chains",
  tagline: "Bold, layered, iconic",
  description:
    "Every Rehnoor chain is hand-forged in 22kt BIS hallmarked gold by master artisans in Jaipur. Wear one. Stack them. Either way, be noticed.",
  heroImage:
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=85",
  accentColor: "rgba(0,36,16,0.88)",
  productCount: 24,
  purity: "22kt",
  tag: "Bestseller",
  breadcrumb: ["Home", "Collections", "Chains"],
  products: [],
};

export default function CollectionHero({
  meta = DEFAULT_META,
}: {
  meta?: CollectionMeta;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activePopup, setActivePopup] = useState<"ring" | "earring" | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);


  const pathname = usePathname();

  const ringLink = "/collections/gold-plated-rings-for-women";
  const earringLink = "/collections/gold-plated-earrings-for-women";

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Trigger Ring popup ONLY if user is visiting the Ring collection
    if (pathname === ringLink) {
      timer = setTimeout(() => {
        setActivePopup("ring");
      }, 2000);
    } 
    // Trigger Earring popup ONLY if user is visiting the Earring collection
    else if (pathname === earringLink) {
      timer = setTimeout(() => {
        setActivePopup("earring");
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname]); // Fires appropriately whenever the route changes

  const closeRingAndNext = () => {
    setActivePopup(null);
    // Open the Earring popup 1 second after Ring closes
  };


  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;
    gsap.set(".ch-badge", { opacity: 0, scale: 0 });
    gsap.set(".ch-word", { opacity: 0, y: 60 });
    gsap.set(".ch-sub", { opacity: 0, y: 24 });
    gsap.set(".ch-stat", { opacity: 0, y: 16 });
    gsap.set(".ch-crumb", { opacity: 0, x: -12 });
    gsap.set(bgRef.current, { clipPath: "inset(100% 0 0 0)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(bgRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.3,
        ease: "power4.inOut",
      })
        .to(
          ".ch-crumb",
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          "-=0.9",
        )
        .to(
          ".ch-badge",
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.7",
        )
        .to(
          ".ch-word",
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.04 },
          "-=0.7",
        )
        .to(
          ".ch-sub",
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
          "-=0.5",
        )
        .to(
          ".ch-stat",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [meta.id]);

  // console.log(meta);

  const heroImage =
    meta?.heroImage && meta.heroImage.trim() !== "" ? meta.heroImage : null;

  return (
    <>
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "clamp(420px, 80vh, 680px)",
        background: "var(--rj-emerald-dark)",
      }}
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div ref={bgRef} className="absolute inset-0">
          {heroImage && (
            <Image
              src={heroImage}
              alt={meta?.label || "Collection"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(165deg, ${meta.accentColor} 0%, rgba(0,55,32,0.65) 55%, rgba(0,55,32,0.25) 100%)`,
            }}
          />
          {/* Bottom fade so content reads over the image */}
          <div
            className="absolute inset-x-0 bottom-0 h-48"
            style={{
              background:
                "linear-gradient(to top, rgba(0,36,16,0.95) 0%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ["25%", "0.07"],
          ["65%", "0.03"],
        ].map(([r, op], i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px"
            style={{
              right: r,
              background: `linear-gradient(to bottom, transparent, rgba(252,193,81,${op}), transparent)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-rj pb-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6" aria-label="Breadcrumb">
          {(meta.breadcrumb ?? ["Home", "Collections", meta.id]).map(
            (crumb, i, arr) => {
              // 👉 Generate correct URLs
              let href = "/";
              if (i === 1) href = "/collections";
              if (i === 2) href = `/collections/${meta.id}`;

              // 👉 Shorten only last breadcrumb (collection name)
              const formatCrumb = (text: string) => {
                if (i !== arr.length - 1) return text;

                const words = text.split(" ");
                if (words.length <= 2) return text;

                return words.slice(0, 2).join(" ") + "...";
              };

              return (
                <span
                  key={crumb}
                  className="ch-crumb flex items-center gap-1.5"
                >
                  {i < arr.length - 1 ? (
                    <>
                      <Link
                        href={href}
                        className="font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-70"
                        style={{
                          color: "rgba(255,255,255,0.45)",
                          cursor: "pointer",
                        }}
                      >
                        {formatCrumb(crumb)}
                      </Link>

                      <ChevronRight
                        size={10}
                        style={{
                          color: "rgba(255,255,255,0.25)",
                          flexShrink: 0,
                        }}
                      />
                    </>
                  ) : (
                    <span
                      className="font-cinzel text-[9px] tracking-widest uppercase"
                      style={{ color: "var(--rj-gold)" }}
                    >
                      {formatCrumb(crumb)}
                    </span>
                  )}
                </span>
              );
            },
          )}
        </nav>

        {/* Badge + label */}
        <div className="ch-badge inline-flex items-center gap-3 mb-5">
          <div className="divider-gold" />
          <span className="label-accent" style={{ color: "var(--rj-gold)" }}>
            {meta.tag ?? "Collection"}
          </span>
        </div>

        {/* Heading */}
        <h1
          className="leading-none mb-4 max-w-2xl"
          style={{
            fontFamily:
              "var(--font-display,'Cormorant Garamond'),Georgia,serif",
          }}
          aria-label={meta.label}
        >
          <span
            className="ch-word inline-block mr-4 text-white"
            style={{
              fontSize: "clamp(2.8rem,4vw,7rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {meta.name}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="ch-sub font-light leading-relaxed mb-8 max-w-xl"
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: "clamp(0.95rem,1.8vw,1.15rem)",
          }}
        >
          {meta.description}
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
          {[
            { v: `${meta.productCount}`, l: "Pieces" },
            { v: "Timeless", l: "Designs" },
            { v: "Premium", l: "Finish" },
            { v: "Free", l: "Size Adjust" },
          ].map((s) => (
            <div key={s.l} className="ch-stat">
              <p
                className="font-cinzel font-bold leading-none"
                style={{ fontSize: "1.3rem", color: "var(--rj-gold)" }}
              >
                {s.v}
              </p>
              <p
                className="font-cinzel mt-1"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="font-cinzel"
          style={{
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.18)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--rj-gold), transparent)",
          }}
        />
      </motion.div>
    </section>
    {false && activePopup && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          {/* Ring Offer Popup */}
          {activePopup === "ring" && (
            <div className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl transform transition-all scale-100">
              <button
                onClick={closeRingAndNext}
                className="absolute top-3 right-3 z-[100000] bg-black/50 hover:bg-black/75 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                aria-label="Close offer"
              >
                ✕
              </button>
              <Link href={ringLink} onClick={() => setActivePopup(null)} className="block relative">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/ring2.png"
                    alt="Special Offer on Gold Plated Rings"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Ring Coupon Only */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-center text-white z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY3GET2FREE</strong>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY2GET1FREE</strong>
                </div>
              </div>
            </div>
              </Link>
            </div>
          )}

          {/* Earring Offer Popup */}
          {activePopup === "earring" && (
            <div className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl transform transition-all scale-100">
              <button
                onClick={() => setActivePopup(null)}
                className="absolute top-3 right-3 z-[100000] bg-black/50 hover:bg-black/75 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
                aria-label="Close offer"
              >
                ✕
              </button>
              <Link href={earringLink} onClick={() => setActivePopup(null)} className="block relative">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/Earring2.png"
                    alt="Special Offer on One Gram Gold Earrings"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Earring Coupon Only */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-center text-white z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 rounded w-full sm:w-auto">
                  <span className="text-gray-300 text-xs block">Buy 3 Get 2</span>
                  <strong className="text-amber-400 font-mono tracking-wider">BUY3GET2FREE</strong>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 rounded w-full sm:w-auto">
                  <span className="text-gray-300 text-xs block">Buy 2 Get 1</span>
                  <strong className="text-amber-400 font-mono tracking-wider">BUY2GET1FREE</strong>
                </div>
              </div>
            </div>
              </Link>
            </div>
          )}
        </div>
      )}
      </>
  );
}
