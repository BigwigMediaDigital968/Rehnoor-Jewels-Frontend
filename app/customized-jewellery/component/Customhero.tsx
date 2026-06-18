"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShieldCheck, Hammer, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomHero() {
  // Fade-up animation variants for elegant loading
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
        delay: custom * 0.15,
      },
    }),
  };

  return (
    <section className="relative w-full bg-[#faf9f6] overflow-hidden min-h-[85vh] flex items-center justify-center py-12">
      {/* Background Decorative Elements */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(var(--rj-charcoal) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT COLUMN: CONTENT PANEL ── */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left order-2 md:order-1">
            {/* Tagline Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border shadow-sm w-fit mx-auto lg:mx-0 mb-6"
              style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
            >
              <Sparkles size={12} className="text-amber-500 animate-pulse" />
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-600">
                Bespoke Experience
              </span>
            </motion.div>

            {/* Title Block */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-cormorant font-light text-neutral-900 leading-[1.15] tracking-tight mb-4 text-4xl sm:text-5xl xl:text-6xl"
            >
              Customized Jewellery <br />
              <span
                className="font-normal italic"
                style={{ color: "var(--rj-gold, #d4af37)" }}
              >
                by Rehnoor Jewels
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base md:text-lg font-light max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-neutral-500"
            >
              Crafted from Our Exclusive Catalog.{" "}
              <br className="hidden sm:inline" />
              Made Entirely for You.
            </motion.p>

            {/* Premium Pillars Grid */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b py-6 mb-8 text-left max-w-xl mx-auto lg:mx-0"
              style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-amber-50 text-amber-700 mt-0.5">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="font-cinzel text-[11px] font-bold tracking-wide text-neutral-800">
                    Premium Gold
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                    14K - 22K Purity Gold
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 mt-0.5">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h4 className="font-cinzel text-[11px] font-bold tracking-wide text-neutral-800">
                    Natural Diamonds
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                    Eqisite & Conflict-Free
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-neutral-100 text-neutral-700 mt-0.5">
                  <Hammer size={14} />
                </div>
                <div>
                  <h4 className="font-cinzel text-[11px] font-bold tracking-wide text-neutral-800">
                    Personalized
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5">
                    Master Craftsmanship
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Primary Action Button */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="w-full sm:w-auto"
            >
              <Link
                href="#leadform"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-cinzel text-[11px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 w-full sm:w-fit active:scale-95 overflow-hidden shadow-lg shadow-neutral-900/10 hover:shadow-xl"
                style={{
                  background: "var(--rj-charcoal, #111111)",
                  color: "#ffffff",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Customize This Design
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  />
                </span>
                <div className="absolute inset-0 w-full h-full bg-neutral-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE IMAGERY ── */}
          <div className="lg:col-span-6 relative w-full flex justify-center items-center h-[350px] md:h-[550px] order-1 md:order-2">
            {/* Main Showcase Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-200"
            >
              <Image
                src="/customize/hero-image.png" // Replace with your luxury editorial asset path
                alt="Custom Luxury Jewelry Showcase"
                fill
                priority
                className="object-cover object-center transition-transform duration-[4000ms] hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
