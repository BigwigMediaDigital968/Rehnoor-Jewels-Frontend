"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Award,
  Truck,
  RefreshCw,
  Star,
  CheckCircle2,
} from "lucide-react";

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
// 3. WHY TRUST US
// ─────────────────────────────────────────────────────────────────
export default function WhyTrustUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const trusts = [
    {
      icon: Shield,
      title: "BIS Hallmarked Gold",
      desc: "Every solid gold piece carries a BIS hallmark — certified, tested, and guaranteed for purity. No guessing.",
    },
    {
      icon: Award,
      title: "1-Gram Patra, Real Craft",
      desc: "Our patra isn't cheap imitation. It's precision-crafted electroform gold with a finish that rivals the real thing.",
    },
    {
      icon: Truck,
      title: "Free Insured Shipping",
      desc: "Every order ships insured, tracked, and sealed. If it doesn't arrive safe, we make it right.",
    },
    {
      icon: RefreshCw,
      title: "30-Day Easy Returns",
      desc: "Not happy? No 20 questions. Just return within 30 days for a full refund or exchange.",
    },
    {
      icon: Star,
      title: "4.9★ Average Rating",
      desc: "50,000+ customers. 4.9 stars average. We let the reviews do the talking.",
    },
    {
      icon: CheckCircle2,
      title: "Secure Payment",
      desc: "UPI, cards, net banking, and EMI options. All transactions encrypted. Your data stays yours.",
    },
  ];

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory)" }}
      ref={ref}
    >
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Why Trust Us
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
            We Built This On Honesty
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="max-w-md mx-auto text-sm"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            We don't fake it. We style it smart. And we back every piece with
            guarantees that actually mean something.
          </motion.p>
          <div className="divider-gold-center mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trusts.map((t, i) => (
            <motion.div
              key={t.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.5}
              className="group p-7 rounded-2xl transition-all duration-400"
              style={{
                background: "#fff",
                border: "1px solid var(--rj-bone)",
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 16px 48px rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[var(--rj-emerald)]"
                style={{ background: "rgba(0,55,32,0.07)" }}
              >
                <t.icon
                  size={20}
                  className="transition-colors duration-300 group-hover:text-[var(--rj-gold)]"
                  style={{ color: "var(--rj-emerald)" }}
                />
              </div>
              <h3
                className="font-cinzel text-sm font-bold tracking-wide mb-2"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {t.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
