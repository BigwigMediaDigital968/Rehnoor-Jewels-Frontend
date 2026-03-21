"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// ─────────────────────────────────────────────────────────────────
// 4. FEATURES / PATRA PHILOSOPHY
// ─────────────────────────────────────────────────────────────────
export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const features = [
    {
      tag: "Patra Perfection",
      quote:
        "Looks like 50 grams. Costs like 1gm. That's the quiet confidence of patra.",
      body: "You don't need heavy gold to carry heavy style. 1g can outshine the real thing.",
      img: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=85",
    },
    {
      tag: "Smart Style",
      quote:
        "Real talk: it's not real gold. But it's real style, real confidence, real savings.",
      body: "Patra isn't a shortcut. It's a strategy. We don't fake it — we style it smart.",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    },
    {
      tag: "Royal Vibe",
      quote: "Why spend like a queen when you can look like one — for less?",
      body: "Our patra pieces give you the royal vibe, not the royal expense. Claim your throne.",
      img: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=85",
    },
    {
      tag: "Power in Patra",
      quote: "They'll assume it's 22k. You don't need to correct them.",
      body: "Patra that passes the gold test from 3 feet or 3 inches away. Confidence isn't measured in grams.",
      img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    },
  ];

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-rj">
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ The Patra Philosophy
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-cormorant font-light mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--rj-charcoal)",
            }}
          >
            Luxury Isn't About What It Costs.
            <br />
            <span style={{ color: "var(--rj-emerald)" }}>
              It's About How It Makes You Feel.
            </span>
          </motion.h2>
          <div className="divider-gold-center mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.5}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                aspectRatio: "16/10",
                background: "var(--rj-ivory-dark)",
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={f.img}
                alt={f.tag}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <span
                  className="font-cinzel text-[8px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full mb-3 w-fit"
                  style={{ background: "var(--rj-gold)", color: "#000" }}
                >
                  {f.tag}
                </span>
                <blockquote
                  className="font-cormorant font-light text-white leading-tight mb-2"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                >
                  "{f.quote}"
                </blockquote>
                <p
                  className="text-sm"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {f.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
