"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CollectionsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current || !bgRef.current) return;
    gsap.set(
      [".hero-col-badge", ".hero-col-word", ".hero-col-sub", ".hero-col-cta"],
      { opacity: 0 },
    );
    gsap.set(bgRef.current, { clipPath: "inset(100% 0 0 0)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(bgRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          ".hero-col-badge",
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.8",
        )
        .to(
          ".hero-col-word",
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.04 },
          "-=0.8",
        )
        .to(".hero-col-sub", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
        .to(
          ".hero-col-cta",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.5",
        );
    }, sectionRef);

    gsap.set(".hero-col-word", { y: 60 });
    gsap.set(".hero-col-sub", { y: 30 });
    gsap.set(".hero-col-cta", { y: 20 });
    gsap.set(".hero-col-badge", { scale: 0 });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] md:h-[100vh] overflow-hidden flex items-center"
      style={{ background: "var(--rj-emerald-dark)" }}
    >
      {/* Parallax BG */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div ref={bgRef} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=85"
            alt="Collections"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(0,36,16,0.96) 0%, rgba(0,55,32,0.75) 50%, rgba(0,55,32,0.4) 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* Decorative diagonal line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-[30%] w-px h-full opacity-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--rj-gold), transparent)",
          }}
        />
        <div
          className="absolute top-0 right-[60%] w-px h-full opacity-5"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--rj-gold), transparent)",
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 container-rj py-32 w-full"
      >
        {/* Badge */}
        <div className="hero-col-badge inline-flex items-center gap-3 mb-8">
          <div className="divider-gold" />
          <span className="label-accent" style={{ color: "var(--rj-gold)" }}>
            The Complete Collection
          </span>
        </div>

        {/* Heading */}
        <h1
          className="heading-lg text-white mb-6 leading-none"
          aria-label="Every Piece. Pure Gold."
        >
          {["Every", " ", "Piece."].map((w, i) => (
            <span key={i} className="hero-col-word inline-block">
              {w === " " ? "\u00A0" : w}
            </span>
          ))}
          <br />
          {["Pure", " "].map((w, i) => (
            <span key={i} className="hero-col-word inline-block">
              {w === " " ? "\u00A0" : w}
            </span>
          ))}
          <span className="hero-col-word inline-block text-gold-shimmer">
            Gold.
          </span>
        </h1>

        <p className="hero-col-sub text-white/65 text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed">
          Signature collections. Meticulously handcrafted for those who
          understand that true style is defined by the details you choose.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#collections"
            className="hero-col-cta btn-primary group"
            style={{
              display: "inline-flex",
              background: "var(--gradient-gold)",
              color: "var(--rj-emerald)",
            }}
          >
            Browse All
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
          <Link
            href="/collections/new-arrivals"
            className="hero-col-cta btn-outline group"
            style={{
              display: "inline-flex",
              color: "var(--rj-gold)",
              borderColor: "var(--rj-gold)",
            }}
          >
            New Arrivals
          </Link>
        </div>

        {/* Stat strip */}
        <div className="hero-col-sub flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10">
          {[
            ["500+", "Designs"],
            ["Precision Crafted", "Timeless Style"],
            ["50K+", "Orders Delivered"],
          ].map(([v, l]) => (
            <div key={l}>
              <p
                className="font-cinzel text-2xl font-bold"
                style={{ color: "var(--rj-gold)" }}
              >
                {v}
              </p>
              <p className="text-white/40 text-xs tracking-widest mt-0.5">
                {l}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="label-accent text-white/25 text-[9px]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--rj-gold)] to-transparent" />
      </motion.div>
    </section>
  );
}
