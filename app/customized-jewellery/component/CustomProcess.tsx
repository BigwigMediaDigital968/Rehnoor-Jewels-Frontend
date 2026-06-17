"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  BadgePercent,
  ShieldCheck,
  ArrowRight,
  Clipboard,
} from "lucide-react";

export default function CustomProcess() {
  const steps = [
    {
      stepNumber: "01",
      icon: <Compass size={22} className="text-amber-700 animate-spin-slow" />,
      title: "Browse Our Design Catalog",
      description:
        "Explore our exclusive collection covering Fine Jewelry, Demi Fine Jewelry, and Semi Fine Jewelry, and select the design that resonates with your style. All customizations are made within our catalog, ensuring that every base design is already crafted to our quality standards.",
    },
    {
      stepNumber: "02",
      icon: <Clipboard size={22} className="text-amber-700" />,
      title: "Fill the Customization Form",
      description:
        "When you click Customize This Design, a short inquiry form will appear. Please fill in your name, contact number, design code or screenshot, size details, along with your preferred gold purity and finish. Our team will review your requirements and reach out to guide you through every choice.",
    },
    {
      stepNumber: "03",
      icon: <BadgePercent size={22} className="text-amber-700" />,
      title: "Receive Your Price on Request",
      description:
        "Because Customized Jewellery pricing is influenced by live gold rates, diamond weight, and design complexity, we do not display fixed prices on our page. Instead, we provide you with a real-time, accurate, transparent, and tailored solution matching your exact requirements.",
    },
    {
      stepNumber: "04",
      icon: <ShieldCheck size={22} className="text-amber-700" />,
      title: "Confirm and Book",
      description:
        "Once the design and price are finalized, proceed with booking. Your order begins with a 70% advance payment, and the remaining 30% is due after order confirmation. The gold rate applicable on your booking day is entirely locked in, ensuring absolute price stability.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="w-full bg-[#faf9f6] py-10 md:py-16 relative overflow-hidden">
      {/* Structural Minimal Grid Accents */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 pointer-events-none hidden md:grid grid-cols-4 gap-8 opacity-[0.03]">
        <div className="border-l border-neutral-900 h-full" />
        <div className="border-l border-neutral-900 h-full" />
        <div className="border-l border-neutral-900 h-full" />
        <div className="border-l border-neutral-900 h-full border-r" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 lg:mb-24">
          <p className="font-cinzel text-[10px] tracking-[0.3em] font-bold text-neutral-400 uppercase mb-3">
            The Bespoke Journey
          </p>
          <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl lg:text-5xl">
            How Our Customized <br className="sm:hidden" /> Jewellery{" "}
            <span
              className="font-normal italic"
              style={{ color: "var(--rj-gold, #d4af37)" }}
            >
              Process Works
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-amber-600/50 mx-auto mt-6" />
          <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed mt-4 max-w-3xl mx-auto">
            We have designed our customization journey to be simple, personal,
            and completely transparent from your first inquiry to the moment
            your piece is ready.
          </p>
        </div>

        {/* Dynamic Connected Flow Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative items-stretch"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative bg-white border border-neutral-200/60 rounded-2xl p-6 xl:p-8 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl hover:border-neutral-300/80"
            >
              {/* Top Accent Content */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-amber-100/80">
                    {step.icon}
                  </div>
                  <span className="font-cinzel font-bold text-2xl tracking-tighter text-neutral-200 group-hover:text-amber-200/50 transition-colors duration-300 select-none">
                    {step.stepNumber}
                  </span>
                </div>

                <h3 className="font-cormorant font-bold text-neutral-900 text-xl xl:text-2xl mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Minimalist Grid Connector Arrows */}
              {idx < 3 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 pointer-events-none text-neutral-300 group-hover:text-amber-500 transition-colors duration-300">
                  <ArrowRight size={16} strokeWidth={1.5} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
