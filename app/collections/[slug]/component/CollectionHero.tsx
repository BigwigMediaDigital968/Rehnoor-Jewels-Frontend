"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface CollectionMeta {
  id: string;
  label: string;
  tagline: string;
  description: string;
  heroImage: string;
  accentColor: string; // CSS color for tint overlay
  productCount: number;
  purity: string;
  tag?: string;
  breadcrumb?: string[]; // e.g. ["Home","Collections","Chains"]
}

// ── Default collection data — swap via props/API ──────────────────
const DEFAULT_META: CollectionMeta = {
  id: "chains",
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
};

export default function CollectionHero({
  meta = DEFAULT_META,
}: {
  meta?: CollectionMeta;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-end"
      style={{
        minHeight: "clamp(420px, 65vh, 680px)",
        background: "var(--rj-emerald-dark)",
      }}
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src={meta.heroImage}
            alt={meta.label}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
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
      <div className="relative z-10 container-rj pb-12 pt-32 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6" aria-label="Breadcrumb">
          {(meta.breadcrumb ?? ["Home", "Collections", meta.label]).map(
            (crumb, i, arr) => (
              <span key={crumb} className="ch-crumb flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={i === 0 ? "/" : `/${crumb.toLowerCase()}`}
                      className="font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-70"
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        cursor: "pointer",
                      }}
                    >
                      {crumb}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {crumb}
                  </span>
                )}
              </span>
            ),
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
          className="leading-none mb-4"
          style={{
            fontFamily:
              "var(--font-display,'Cormorant Garamond'),Georgia,serif",
          }}
          aria-label={meta.label}
        >
          {meta.label.split(" ").map((word, wi) => (
            <span
              key={wi}
              className="ch-word inline-block mr-4 text-white"
              style={{
                fontSize: "clamp(2.8rem,7vw,7rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          className="ch-sub font-light leading-relaxed mb-8 max-w-lg"
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
            { v: meta.purity, l: "Purity" },
            { v: "BIS", l: "Hallmarked" },
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
  );
}
