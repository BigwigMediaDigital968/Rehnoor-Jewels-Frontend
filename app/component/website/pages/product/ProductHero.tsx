"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Shield, Award, RefreshCw } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ── Trust pills shown in the hero ────────────────────────────────
const TRUST_PILLS = [
  { icon: <Shield size={10} />, label: "Trusted" },
  { icon: <Award size={10} />, label: "Rewarded" },
  { icon: <RefreshCw size={10} />, label: "07-Day Returns" },
];

export default function ProductsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;

    // Pre-set all elements to invisible before first paint — no flash
    gsap.set(".ph-badge", { opacity: 0, scale: 0 });
    gsap.set(".ph-word", { opacity: 0, y: 70 });
    gsap.set(".ph-sub", { opacity: 0, y: 30 });
    gsap.set(".ph-pill", { opacity: 0, y: 16 });
    gsap.set(".ph-stat", { opacity: 0, y: 20 });
    gsap.set(bgRef.current, { clipPath: "inset(100% 0 0 0)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(bgRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          ".ph-badge",
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" },
          "-=0.9",
        )
        .to(
          ".ph-word",
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.045 },
          "-=0.75",
        )
        .to(
          ".ph-sub",
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6",
        )
        .to(
          ".ph-pill",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          ".ph-stat",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] md:min-h-[75vh] overflow-hidden flex items-center"
      style={{ background: "var(--rj-emerald-dark)" }}
    >
      {/* ── Parallax background ── */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85"
            alt="Rehnoor Jewels Products"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Multi-stop gradient overlay — dark left, lighter right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(0,36,16,0.97) 0%, rgba(0,55,32,0.80) 45%, rgba(0,55,32,0.35) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Decorative vertical rule lines ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { right: "28%", opacity: 0.09 },
          { right: "55%", opacity: 0.04 },
        ].map(({ right, opacity: op }, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px"
            style={{
              right,
              background: `linear-gradient(to bottom, transparent 0%, rgba(252,193,81,${op}) 40%, rgba(252,193,81,${op}) 60%, transparent 100%)`,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-rj py-28 md:py-36 w-full">
        {/* Pre-heading badge */}
        <div className="ph-badge inline-flex items-center gap-3 mb-7">
          <div className="divider-gold" />
          <span className="label-accent" style={{ color: "var(--rj-gold)" }}>
            Check the store
          </span>
        </div>

        {/* Main heading — each word is a separate span for GSAP stagger */}
        <h1
          className="leading-none mb-6"
          style={{
            fontFamily:
              "var(--font-display, 'Cormorant Garamond'), Georgia, serif",
          }}
          aria-label="Crafted in gold. Built to last."
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            {["Crafted", "\u00A0", "in", "\u00A0", "gold."].map((w, i) => (
              <span
                key={i}
                className="ph-word inline-block text-white pb-3"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {w}
              </span>
            ))}
          </span>

          {/* Line 2 — gold shimmer */}
          <span className="block overflow-hidden mt-1">
            {["Built", "\u00A0", "to", "\u00A0"].map((w, i) => (
              <span
                key={i}
                className="ph-word inline-block text-white"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {w}
              </span>
            ))}
            <span
              className="ph-word inline-block text-gold-shimmer"
              style={{
                fontSize: "clamp(3rem, 7vw, 7rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              last.
            </span>
          </span>
        </h1>

        {/* Sub-heading */}
        <p
          className="ph-sub text-white/65 font-light leading-relaxed mb-8 max-w-lg"
          style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)" }}
        >
          500+ handcrafted pieces. Every chain, kada, ring, bracelet, and
          pendant reflects expert craftsmanship, timeless design, and a lifetime
          of quality.
        </p>

        {/* Trust pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {TRUST_PILLS.map((pill) => (
            <div
              key={pill.label}
              className="ph-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(252,193,81,0.1)",
                border: "1px solid rgba(252,193,81,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: "var(--rj-gold)" }}>{pill.icon}</span>
              <span
                className="font-cinzel"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {pill.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Stats strip ── */}
        <div
          className="ph-stat flex flex-wrap gap-8 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          {[
            { value: "5000+", label: "Products" },
            { value: "25+", label: "Value Partners" },
            { value: "50K+", label: "Orders Delivered" },
            { value: "Free", label: "Sizing & Engraving" },
          ].map((stat) => (
            <div key={stat.label} className="ph-stat">
              <p
                className="font-cinzel font-bold"
                style={{
                  fontSize: "1.4rem",
                  color: "var(--rj-gold)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-cinzel mt-1"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="font-cinzel"
          style={{
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--rj-gold), transparent)",
          }}
        />
      </motion.div>

      {/* ── Floating "New Arrivals" badge — bottom right ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-16 right-6 lg:right-14 z-10 hidden md:block"
      >
        <div
          className="px-5 py-3.5 rounded-xl"
          style={{
            background: "rgba(0,55,32,0.6)",
            border: "1px solid rgba(252,193,81,0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <p
            className="font-cinzel mb-0.5"
            style={{
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "var(--rj-gold)",
              textTransform: "uppercase",
            }}
          >
            Just Dropped
          </p>
          <p
            className="font-cormorant text-white font-light"
            style={{ fontSize: "1.1rem", lineHeight: 1.2 }}
          >
            New Arrivals
          </p>
          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.45)",
              marginTop: "2px",
            }}
          >
            3 new pieces this week
          </p>
          <div
            className="flex items-center gap-1 mt-2.5"
            style={{ color: "var(--rj-gold)", fontSize: "0.6rem" }}
          >
            <span className="font-cinzel tracking-wider">Explore</span>
            <ArrowRight size={10} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
