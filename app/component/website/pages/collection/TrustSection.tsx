"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
  {
    icon: "⚜",
    title: "Premium Craftsmanship",
    desc: "Every piece is crafted with precision to deliver a flawless finish and a real gold-like shine that lasts.",
    stat: "100%",
    statLabel: "Quality Checked",
  },
  {
    icon: "✦",
    title: "Expert Artisans",
    desc: "Designed and finished by experienced craftsmen who understand detail, balance, and lasting quality.",
    stat: "40+",
    statLabel: "Years of Craft Expertise",
  },
  {
    icon: "♾",
    title: "Anti-Tarnish Finish",
    desc: "Designed to retain its shine for longer, our jewellery resists fading with proper care.",
    stat: "100%",
    statLabel: "Long-Lasting Shine",
  },
  {
    icon: "✧",
    title: "Exclusive Designs",
    desc: "Modern, stylish, and made to stand out our designs are created for everyday confidence.",
    stat: "500+",
    statLabel: "Unique Styles",
  },
  {
    icon: "⟳",
    title: "07-Day Returns",
    desc: "Changed your mind? Return or exchange your order within 7 days quick and hassle-free.",
    stat: "07",
    statLabel: "Day no stress return",
  },
  {
    icon: "◉",
    title: "Secure Packaging",
    desc: "Each piece is packed safely in tamper-proof packaging to ensure it reaches you in perfect condition.",
    stat: "100%",
    statLabel: "Safe & Insured Delivery",
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".trust-card", { opacity: 0, y: 80 });
      gsap.to(".trust-card", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trust-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding overflow-hidden"
      style={{ background: "var(--rj-emerald)" }}
    >
      <div className="container-rj">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="label-accent mb-4"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ The Rehnoor Promise
            </p>
            <h2 className="heading-lg text-white leading-tight">
              Six reasons
              <br />
              <em className="text-gold-shimmer font-normal">
                to trust Rehnoor
              </em>
              <br />
              for timeless jewellery
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/60 leading-relaxed mb-6">
              Discover premium gold plated jewellery designed for everyday
              elegance. Crafted with precision, long-lasting shine, and a real
              gold-like finish.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Secure Checkout", "Free Shipping", "Premium Packaging"].map(
                (t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(252,193,81,0.2)" }}
                    >
                      <Check size={9} style={{ color: "var(--rj-gold)" }} />
                    </div>
                    <span
                      className="font-cinzel text-[10px] tracking-wider"
                      style={{ color: "var(--rj-gold)" }}
                    >
                      {t}
                    </span>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Trust cards grid */}
        <div className="trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((tp, i) => (
            <motion.div
              key={tp.title}
              className="trust-card relative overflow-hidden rounded-2xl p-6 group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(252,193,81,0.1)",
                backdropFilter: "blur(8px)",
              }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(252,193,81,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Stat — large background number */}
              <div
                className="absolute top-3 right-4 font-cormorant leading-none pointer-events-none"
                style={{
                  fontSize: "3.5rem",
                  color: "rgba(252,193,81,0.06)",
                  fontWeight: 700,
                }}
              >
                {tp.stat}
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: "rgba(252,193,81,0.1)",
                  border: "1px solid rgba(252,193,81,0.2)",
                }}
              >
                <span className="text-xl" style={{ color: "var(--rj-gold)" }}>
                  {tp.icon}
                </span>
              </div>

              <h3 className="font-cinzel text-white text-sm tracking-wider mb-2">
                {tp.title}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed mb-5">
                {tp.desc}
              </p>

              {/* Stat pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(252,193,81,0.08)",
                  border: "1px solid rgba(252,193,81,0.2)",
                }}
              >
                <span
                  className="font-cinzel font-bold"
                  style={{ color: "var(--rj-gold)", fontSize: "0.85rem" }}
                >
                  {tp.stat}
                </span>
                <span className="font-cinzel text-white/40 text-[9px] tracking-wider uppercase">
                  {tp.statLabel}
                </span>
              </div>

              {/* Bottom gold line on hover */}
              <div
                className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "var(--gradient-gold)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Visual accent — large numbers strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 pt-12 border-t grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {[
            ["06+", "Years in Business"],
            ["100%", "Quality Assured"],
            ["50K+", "Happy Customers"],
            ["500+", "Unique Designs"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p
                className="font-cormorant font-light"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "var(--rj-gold)",
                  lineHeight: 1,
                }}
              >
                {v}
              </p>
              <p className="text-white/35 text-xs tracking-widest mt-2 uppercase font-cinzel">
                {l}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
