"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

export default function CustomBooking() {
  const commitments = [
    {
      label: "Natural Diamonds Only",
      desc: "We exclusively use ethically sourced, certified natural diamonds always",
    },
    {
      label: "Gold Purity Guaranteed",
      desc: "14K and 22K gold disclosed in full before production",
    },
    {
      label: "Transparent Specifications",
      desc: "Full disclosure of weight, clarity, color, and carat details",
    },
    {
      label: "Real-Time Communication",
      desc: "Direct WhatsApp consultation, no bots, no delays",
    },
    {
      label: "Locked Gold Rates",
      desc: "Gold rate fixed at the time of booking for complete price stability",
    },
    {
      label: "No Hidden Charges",
      desc: "Every cost component is explained clearly before confirmation",
    },
    {
      label: "Expert Craftsmanship",
      desc: "Every design is tailored with precision from our exclusive catalog",
    },
  ];

  const handleWhatsAppBooking = () => {
    const phoneNumber = "918595814465";
    const message = encodeURIComponent(
      "Hello Rehnoor Jewels, I am ready to begin my customized jewellery journey and would like to confirm my design options.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="w-full bg-[#faf9f6] py-16 overflow-hidden border-t border-neutral-200/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16 lg:space-y-24"
        >
          {/* ── PART 1: COMMITMENTS BLOCK ── */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            <div className="text-center max-w-4xl mx-auto mb-10">
              <p className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase mb-2">
                Secured Investment
              </p>
              <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl">
                What Makes Rehnoor Jewels an Authoritative Choice
                <br />
                <span
                  className="font-normal italic"
                  style={{ color: "var(--rj-gold, #d4af37)" }}
                >
                  for Customized Jewellery?
                </span>
              </h2>
              <p className="text-xs sm:text-sm font-light text-neutral-500 mt-3 leading-relaxed">
                When you invest in Customized Jewellery, you are not just buying
                a product, you are making a decision that reflects your values,
                taste, and standards. Here is why Rehnoor Jewels is the right
                choice:
              </p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Shield size={16} style={{ color: "var(--rj-gold, #d4af37)" }} />
              <h3 className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-neutral-800">
                Our Commitments to You
              </h3>
            </div>

            <div className="divide-y divide-neutral-100">
              {commitments.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 py-3.5 gap-1 md:gap-6 first:pt-0 last:pb-0 items-start"
                >
                  <div className="md:col-span-4 font-cormorant font-bold text-neutral-900 text-base md:text-lg">
                    {item.label}
                  </div>
                  <div className="md:col-span-8 font-light text-neutral-500 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── PART 2: BOOKING PROCESS ARCHITECTURE ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column */}
            <motion.div variants={fadeUp} className="lg:col-span-6 space-y-6">
              <div>
                <p className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase mb-2">
                  Secure Onboarding
                </p>
                <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl">
                  Booking Your Customized Jewellery: <br />
                  <span
                    className="font-normal italic"
                    style={{ color: "var(--rj-gold, #d4af37)" }}
                  >
                    Simple, Secure, Transparent
                  </span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                Beginning your Customized Jewellery journey with Rehnoor Jewels
                is straightforward. This booking structure is designed to
                protect both you and the integrity of your order. It ensures
                that the craftsmanship process begins only when all details are
                confirmed, and that you are never caught off-guard by pricing
                changes.
              </p>

              {/* Interactive Premium Callout Action */}
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppBooking}
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-neutral-900 text-white font-cinzel text-[10px] tracking-widest font-bold uppercase rounded-full shadow-lg hover:bg-neutral-800 transition-all duration-300 transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle size={14} fill="currentColor" />
                  Book Your Design on WhatsApp
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>

            {/* Right Information Architecture Cards */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-6 grid grid-cols-2 gap-4"
            >
              <div
                className="bg-white p-5 rounded-xl border shadow-sm space-y-2"
                style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 font-cinzel text-xs font-bold">
                  01
                </div>
                <h4 className="font-cormorant font-bold text-neutral-900 text-lg">
                  Design Cost Range
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  ₹500 to ₹6–7 lakh, depending on material, complexity, and
                  customization level.
                </p>
              </div>

              <div
                className="bg-white p-5 rounded-xl border shadow-sm space-y-2"
                style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 font-cinzel text-xs font-bold">
                  02
                </div>
                <h4 className="font-cormorant font-bold text-neutral-900 text-lg">
                  Advance Payment
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  70% at the time of booking to securely lock resources and
                  allocate artisan workspace to begin production.
                </p>
              </div>

              <div
                className="bg-white p-5 rounded-xl border shadow-sm space-y-2"
                style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 font-cinzel text-xs font-bold">
                  03
                </div>
                <h4 className="font-cormorant font-bold text-neutral-900 text-lg">
                  Balance Payment
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  30% after final design realization and order confirmation
                  right before delivery.
                </p>
              </div>

              <div
                className="bg-white p-5 rounded-xl border shadow-sm space-y-2"
                style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-cinzel text-xs font-bold">
                  ✓
                </div>
                <h4 className="font-cormorant font-bold text-neutral-900 text-lg">
                  Gold Rate Lock
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  The market value rate applicable on your booking date is
                  completely locked—ensuring zero fluctuation surprises.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
