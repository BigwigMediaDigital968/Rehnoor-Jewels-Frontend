"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// SHARED ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

export default function OurStory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const milestones = [
    {
      year: "2018",
      title: "The First Spark",
      desc: "Founded in a small workshop in Jaipur with one craftsman, one kiln, and an obsession with making gold accessible to all.",
    },
    {
      year: "2020",
      title: "Patra Reimagined",
      desc: "We launched our 1-gram gold line — bringing luxury looks at a fraction of the price. The internet noticed.",
    },
    {
      year: "2022",
      title: "10,000 Smiles",
      desc: "Crossed 10,000 orders. Our DMs flooded with wedding photos, graduation selfies, and first-gold stories.",
    },
    {
      year: "2024",
      title: "The Gold Standard",
      desc: "Expanded to 22kt BIS hallmarked pieces. Now offering both patra elegance and solid gold — for every budget, every occasion.",
    },
  ];

  return (
    <section id="story" className="section-padding bg-white" ref={ref}>
      <div className="container-rj">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5", background: "var(--rj-ivory-dark)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85"
                alt="Rehnoor Jewels craftsmanship"
                fill
                className="object-cover"
              />
              {/* Gold overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,55,32,0.5) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <span
                  className="font-cinzel text-[9px] tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: "var(--rj-gold)", color: "#000" }}
                >
                  BIS Hallmarked
                </span>
              </div>
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-8 -right-6 rounded-2xl p-5 shadow-2xl"
              style={{
                background: "var(--rj-charcoal)",
                maxWidth: "180px",
              }}
            >
              <p
                className="font-cormorant text-3xl font-semibold"
                style={{ color: "var(--rj-gold)" }}
              >
                50K+
              </p>
              <p
                className="font-cinzel text-[8px] tracking-widest uppercase mt-1"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Women who chose smart gold
              </p>
            </div>

            {/* Small accent image */}
            <div
              className="absolute -top-6 -right-6 w-28 h-28 rounded-xl overflow-hidden border-4"
              style={{
                background: "var(--rj-ivory-dark)",
                borderColor: "#fff",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&q=85"
                alt="Rehnoor detail"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Story text */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Know Our Story
            </motion.p>

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-cormorant font-light mb-5 leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--rj-charcoal)",
                letterSpacing: "-0.01em",
              }}
            >
              Gold for the Bold.
              <br />
              <span style={{ color: "var(--rj-emerald)" }}>
                Style for the Smart.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              className="text-base leading-relaxed mb-6"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              Rehnoor Jewels started with a simple but powerful question:
              <em> why should looking like gold cost like gold?</em> We believed
              — and still believe — that confidence, beauty, and luxury
              shouldn't have a price tag attached.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              className="text-base leading-relaxed mb-10"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              From our 1-gram patra pieces that pass the gold test from 3 feet
              away, to our solid 22kt BIS hallmarked chains — every piece is
              crafted for the woman who knows exactly what she wants and refuses
              to pay a rupee more than she should.
            </motion.p>

            {/* Milestones */}
            <div className="space-y-5">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={4 + i}
                  className="flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <span
                      className="font-cinzel text-xs font-bold"
                      style={{ color: "var(--rj-gold)" }}
                    >
                      {m.year}
                    </span>
                    {i < milestones.length - 1 && (
                      <div
                        className="w-px h-8"
                        style={{ background: "var(--rj-bone)" }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      className="font-cinzel text-[11px] font-bold tracking-wider mb-1"
                      style={{ color: "var(--rj-charcoal)" }}
                    >
                      {m.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
