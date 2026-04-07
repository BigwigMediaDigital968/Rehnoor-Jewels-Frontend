"use client";

import { useRef } from "react";

import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

export default function OurPartners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const partners = [
    { name: "AMAZON India", role: "E-commerce Store", initial: "AM" },
    { name: "Razorpay", role: "Secure Payments", initial: "RP" },
    { name: "FLIPKART", role: "Logistics Partner", initial: "FK" },
    { name: "Shiprocket", role: "Fulfilment Network", initial: "SR" },
    { name: "Meta Business", role: "Brand & Commerce", initial: "MB" },
    { name: "Google Business", role: "Verified Seller", initial: "GB" },
  ];

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-charcoal)" }}
      ref={ref}
    >
      <div className="container-rj">
        <div className="text-center mb-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--rj-gold)" }}
          >
            ✦ Our Partners
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-cormorant font-light"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#fff",
            }}
          >
            Backed by Names You Trust
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i * 0.3}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(252,193,81,0.12)",
              }}
              whileHover={{
                background: "rgba(252,193,81,0.08)",
                borderColor: "rgba(252,193,81,0.3)",
              }}
            >
              {/* Partner avatar / logo placeholder */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-cinzel font-bold text-sm"
                style={{
                  background: "rgba(252,193,81,0.15)",
                  color: "var(--rj-gold)",
                  border: "1px solid rgba(252,193,81,0.25)",
                }}
              >
                {p.initial}
              </div>
              <div className="text-center">
                <p
                  className="font-cinzel text-[10px] font-bold tracking-wider"
                  style={{ color: "#fff" }}
                >
                  {p.name}
                </p>
                <p
                  className="font-cinzel text-[8px] tracking-wider mt-0.5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {p.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
