"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gem } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────────────────────────
// GOLD PARTICLES — deterministic positions (no hydration mismatch)
// ─────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${((i * 47.3) % 100).toFixed(3)}%`,
  top: `${((i * 61.8) % 100).toFixed(3)}%`,
  yEnd: -(80 + ((i * 13) % 60)),
  duration: 4 + ((i * 0.37) % 4),
  delay: (i * 0.41) % 6,
}));

function GoldParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: "var(--rj-gold)", left: p.left, top: p.top }}
          animate={{ y: [0, p.yEnd], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT HERO
// ─────────────────────────────────────────────────────────────────
export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  // ── Parallax ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // ── GSAP entrance ──
  useEffect(() => {
    if (!headingRef.current || !bgWrapperRef.current || !sectionRef.current)
      return;

    gsap.set(".about-badge", { opacity: 0, scale: 0 });
    gsap.set(".about-word", { opacity: 0, y: 80 });
    gsap.set(".about-sub", { opacity: 0, y: 30 });
    gsap.set(".about-cta", { opacity: 0, y: 20 });
    gsap.set(".about-stat", { opacity: 0, y: 20 });
    gsap.set(bgWrapperRef.current, { clipPath: "inset(100% 0 0 0)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(bgWrapperRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          ".about-badge",
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.8",
        )
        .to(
          ".about-word",
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.05 },
          "-=0.9",
        )
        .to(
          ".about-sub",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        )
        .to(
          ".about-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          ".about-stat",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--rj-charcoal)] overflow-hidden"
    >
      {/* ── Parallax wrapper (Framer Motion owns y + scale) ── */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {/* ── GSAP owns clipPath on this inner div — no FM conflict ── */}
        <div ref={bgWrapperRef} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1600&q=85"
            alt="Rehnoor Jewels — crafted with gold"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark emerald overlay — mirrors HeroSection gradient angle */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,20,10,0.95) 0%, rgba(0,36,16,0.80) 45%, rgba(0,55,32,0.35) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Gold radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(252,193,81,0.08) 0%, transparent 70%)",
        }}
      />

      <GoldParticles />

      {/* ── Vertical side labels (desktop only) ── */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}
      >
        <span
          className="font-cinzel text-[9px] tracking-widest uppercase"
          style={{ color: "rgba(252,193,81,0.45)" }}
        >
          Est. 2020
        </span>
        <div
          className="w-px flex-1 min-h-[80px]"
          style={{ background: "rgba(252,193,81,0.2)" }}
        />
      </div>

      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-20"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}
      >
        <div
          className="w-px flex-1 min-h-[80px]"
          style={{ background: "rgba(252,193,81,0.2)" }}
        />
        <span
          className="font-cinzel text-[9px] tracking-widest uppercase"
          style={{ color: "rgba(252,193,81,0.45)" }}
        >
          Rehnoor Jewels
        </span>
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-rj flex flex-col justify-center min-h-screen py-24"
      >
        <div className="max-w-3xl">
          {/* Badge — mirrors HeroSection hero-badge */}
          <div className="about-badge mb-6 flex items-center gap-3">
            <div className="divider-gold" />
            <span className="label-accent text-[var(--rj-gold)]">
              ✦ Our Story
            </span>
          </div>

          {/* Headline — word-by-word split exactly as HeroSection */}
          <div ref={headingRef} className="overflow-hidden mb-6">
            <h1
              className="heading-md text-white leading-[0.95]"
              aria-label="Crafted with Gold. Worn with Pride."
            >
              {"Crafted".split("").map((char, i) => (
                <span key={`c-${i}`} className="about-word inline-block">
                  {char}
                </span>
              ))}
              <span className="about-word inline-block">&nbsp;</span>
              {"with".split("").map((char, i) => (
                <span key={`w-${i}`} className="about-word inline-block">
                  {char}
                </span>
              ))}
              <span className="about-word inline-block">&nbsp;</span>
              {"Gold.".split("").map((char, i) => (
                <span key={`g-${i}`} className="about-word inline-block">
                  {char}
                </span>
              ))}
              <br />
              {"Worn".split("").map((char, i) => (
                <span
                  key={`wo-${i}`}
                  className="about-word pb-5 inline-block text-gold-shimmer"
                >
                  {char}
                </span>
              ))}
              <span className="about-word inline-block pb-5 text-gold-shimmer">
                &nbsp;
              </span>
              {"with".split("").map((char, i) => (
                <span
                  key={`wt-${i}`}
                  className="about-word pb-5 inline-block text-gold-shimmer"
                >
                  {char}
                </span>
              ))}
              <span className="about-word inline-block pb-5 text-gold-shimmer">
                &nbsp;
              </span>
              {"Pride.".split("").map((char, i) => (
                <span
                  key={`p-${i}`}
                  className="about-word pb-5 inline-block text-gold-shimmer"
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Subheading */}
          <p className="about-sub text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
            Rehnoor Jewels was born from one belief - everyone deserves to feel
            like royalty. Because true luxury is a feeling, not just a piece.
          </p>

          {/* CTAs — same pattern as HeroSection */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/products"
              className="about-cta btn-primary group"
              style={{
                display: "inline-flex",
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
              }}
            >
              Shop the Collection
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#story"
              className="about-cta btn-outline group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--rj-gold)",
                borderColor: "var(--rj-gold)",
              }}
            >
              <Gem
                size={14}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              Know Our Story
            </a>
          </div>

          {/* Stats — same 3-col grid as HeroSection */}
          <div
            className="about-sub grid grid-cols-4 gap-6 pt-8 max-w-lg"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "500+", label: "Unique Designs" },
              { value: "6+", label: "Years of Craft" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map((stat) => (
              <div key={stat.label} className="about-stat">
                <p className="font-cinzel text-[var(--rj-gold)] text-2xl font-bold">
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs mt-1 tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator — identical to HeroSection ── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="label-accent text-white/30 text-[9px]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--rj-gold)] to-transparent" />
      </motion.div>

      {/* ── Floating card (bottom-right) — mirrors HeroSection floating card ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-20 right-8 lg:right-16 z-10 glass-dark rounded-xl p-4 hidden md:block"
      >
        <p className="label-accent text-[var(--rj-gold)] text-[9px] mb-1">
          Est. 2020
        </p>
        <p className="font-cormorant text-white text-lg font-medium">
          Rehnoor Jewels
        </p>
        <p className="text-white/50 text-xs mt-0.5">
          Premium Designs · 50K+ customers
        </p>
        <a
          href="#story"
          className="mt-3 flex items-center gap-1.5 text-[var(--rj-gold)] text-xs hover:gap-3 transition-all duration-300"
        >
          Our journey <ArrowRight size={12} />
        </a>
      </motion.div>

      {/* ── Bottom fade into page ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #fff)",
        }}
      />
    </section>
  );
}
