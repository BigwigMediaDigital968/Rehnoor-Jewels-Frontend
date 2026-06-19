"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

const PARTICLES = Array.from({ length: 6 }, (_, i) => ({
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

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    if (!headingRef.current || !bgWrapperRef.current || !sectionRef.current)
      return;
    gsap.set(".hero-badge", { opacity: 0, scale: 0 });
    gsap.set(".hero-word", { opacity: 0, y: 80 });
    gsap.set(".hero-sub", { opacity: 0, y: 30 });
    gsap.set(".hero-cta", { opacity: 0, y: 20 });
    gsap.set(bgWrapperRef.current, { clipPath: "inset(100% 0 0 0)" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(bgWrapperRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
      })
        .to(
          ".hero-badge",
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.8",
        )
        .to(
          ".hero-word",
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.05 },
          "-=0.9",
        )
        .to(
          ".hero-sub",
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.7",
        )
        .to(
          ".hero-cta",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5",
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--rj-emerald-dark)] overflow-hidden"
    >
      {/* Parallax — Framer Motion owns y + scale on outer div */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* GSAP owns clipPath on this inner div — no FM conflict */}
        {/* <div ref={bgWrapperRef} className="absolute inset-0">
          <Image
            src="/hero-image-1.webp"
            alt="Rehnoor Jewels — gold jewellery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,36,16,0.92) 0%, rgba(0,55,32,0.7) 45%, rgba(0,55,32,0.3) 100%)",
            }}
          />
        </div> */}

        <div ref={bgWrapperRef} className="absolute inset-0">
          {/* Desktop Image */}
          <Image
            src="/image-2.webp"
            alt="Rehnoor Jewels — gold jewellery"
            fill
            priority
            sizes="100vw"
            className="hidden md:block object-cover object-center"
          />

          {/* Mobile Image */}
          <Image
            src="/image-1.webp"
            alt="Rehnoor Jewels — gold jewellery"
            fill
            priority
            sizes="100vw"
            className="block md:hidden object-cover object-center"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,36,16,0.7) 0%, rgba(0,55,32,0.5) 45%, rgba(0,55,32,0.1) 100%)",
            }}
          />
        </div>
      </motion.div>

      <GoldParticles />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container-rj flex flex-col justify-center min-h-screen py-24"
      >
        <div className="max-w-3xl">
          <div className="hero-badge mb-6 flex items-center gap-3">
            <div className="divider-gold" />
            <h1 className="label-accent text-[var(--rj-gold)]">
              India's Premier Gold Plated Jewellery
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden mb-6"
          >
            {/* <p
              className="heading-xl text-white leading-[0.95]"
              aria-label="Gold Reimagined"
            >
              {"Gold".split("").map((char, i) => (
                <span key={`g-${i}`} className="hero-word inline-block">
                  {char}
                </span>
              ))}
              <br />
              {"Reimagined".split("").map((char, i) => (
                <span
                  key={`r-${i}`}
                  className="hero-word pb-5 inline-block text-gold-shimmer"
                >
                  {char}
                </span>
              ))}
            </p> */}

            <p
              className="heading-lg text-white leading-[0.95] pb-3"
              aria-label="Gold Reimagined"
            >
              Gold
              <br />
              <span className="text-gold-shimmer">Reimagined</span>
            </p>
          </motion.div>

          <p className="hero-sub text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
            Crafted in premium 1 Gram Gold Plated tones, every Rehnoor piece
            blends timeless elegance with modern style perfect for everyday
            wear, celebrations, weddings, and every occasion in between.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/collections"
              className="hero-cta btn-primary group"
              style={{
                display: "inline-flex",
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
              }}
            >
              Explore Collection
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/about"
              className="hero-cta btn-outline group"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--rj-gold)",
                borderColor: "var(--rj-gold)",
              }}
            >
              <Play
                size={14}
                className="fill-current transition-transform duration-300 group-hover:scale-110"
              />
              Our Story
            </Link>
          </div>

          <div className="hero-sub grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
            {[
              { value: "100%", label: "Authentic Pieces" },
              { value: "500+", label: "Designs" },
              { value: "20K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
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

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="label-accent text-white/30 text-[9px]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--rj-gold)] to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-20 right-8 lg:right-16 z-10 glass-dark rounded-xl p-4 hidden md:block"
      >
        <p className="label-accent text-[var(--rj-gold)] text-[9px] mb-1">
          Bestseller
        </p>
        <p className="font-cormorant text-white text-lg font-medium">
          Ruby Royale Necklace
        </p>
        <p className="text-white/50 text-xs mt-0.5">Starting ₹3,499</p>
        <Link
          href="/products/ruby-royale-necklace-earring-set"
          className="mt-3 flex items-center gap-1.5 text-[var(--rj-gold)] text-xs hover:gap-3 transition-all duration-300"
        >
          View <ArrowRight size={12} />
        </Link>
      </motion.div>
    </section>
  );
}
