"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Ruler, MessageCircle, DollarSign } from "lucide-react";

export default function CustomPricing() {
  const priceFactors = [
    {
      label: "Gold Rate",
      value:
        "Fluctuates daily based on market prices locked on the booking date",
    },
    {
      label: "Gold Weight",
      value: "Varies by design dimensions, size, and structural requirements",
    },
    {
      label: "Diamond Weight",
      value: "Measured in carats or cents, each design differs",
    },
    {
      label: "Diamond Quality",
      value: "Clarity and color specifications affect the final cost",
    },
    {
      label: "Customization Complexity",
      value: "More detailed modifications may affect production cost",
    },
    {
      label: "Size Requirements",
      value: "Custom sizing affects both material usage and craftsmanship time",
    },
  ];

  // Helper function to launch formatted WhatsApp chat
  const handleWhatsAppClick = () => {
    const phoneNumber = "918595814465";
    const message = encodeURIComponent(
      "Hello Rehnoor Jewels, I am looking through your Custom Jewellery collection and would love to request a quote based on today's live rates.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
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
    <section className="w-full bg-[#faf9f6] py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* ── SECTION 1: PRICING TRANSPARENCY PANEL ── */}
          <motion.div
            variants={fadeUp}
            className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            <div className="text-center max-w-4xl mx-auto mb-10">
              <p className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase mb-2">
                Real-Time Valuations
              </p>
              <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl">
                Transparent & Dynamic Pricing: <br />
                <span
                  className="font-normal italic"
                  style={{ color: "var(--rj-gold, #d4af37)" }}
                >
                  No Hidden Costs
                </span>
              </h2>
              <p className="text-xs sm:text-sm font-light text-neutral-500 mt-3 leading-relaxed">
                Customized Jewellery pricing at Rehnoor Jewels is not arbitrary.
                Every quote is calculated based on real-time market values and
                your specific design requirements. This is why we operate on a
                Price on Request and Get Today&apos;s Price model.
              </p>
            </div>

            {/* Price Determination List */}
            <div className="border px-6 border-yellow-100 divide-y divide-yellow-100 mb-8">
              <div className="py-3 hidden md:grid grid-cols-12 font-cinzel text-[10px] tracking-wider font-bold text-var(--rj-emerald-light) uppercase">
                <div className="col-span-4">What Determines Your Price?</div>
                <div className="col-span-8">Market & Design Parameters</div>
              </div>

              {priceFactors.map((factor, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 py-4 gap-1 md:gap-6 items-start"
                >
                  <div className="md:col-span-4 font-cormorant font-bold text-neutral-900 text-base sm:text-md">
                    {factor.label}
                  </div>
                  <div className="md:col-span-8 font-light text-neutral-500 text-xs sm:text-sm leading-relaxed">
                    {factor.value}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Premium CTA Footer */}
            <div className="bg-neutral-50 rounded-xl p-5 border text-center flex flex-col items-center justify-center">
              <p className="text-xs text-neutral-500 font-light max-w-xl mb-4 leading-relaxed">
                We believe in full pricing transparency. You will never be
                surprised by your final bill;{" "}
                <strong>
                  every component is discussed and confirmed via WhatsApp
                </strong>{" "}
                before production begins.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#25D366] text-white font-cinzel text-[10px] tracking-widest font-bold uppercase rounded-full shadow-md hover:bg-[#20ba5a] transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <MessageCircle size={15} fill="currentColor" />
                Get Today&apos;s Price on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* ── SECTION 2: SIZING ASSISTANCE PANEL ── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-2xl border p-6 md:p-8 shadow-sm"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            {/* Left Graphics/Icon Block */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r pb-6 md:pb-0 md:pr-6 border-neutral-100">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 mb-4">
                <Ruler size={22} />
              </div>
              <h3 className="font-cormorant font-bold text-neutral-900 text-2xl leading-tight">
                Getting Your Size <br className="hidden md:inline" /> Right
              </h3>
              <p className="font-cinzel text-[9px] tracking-widest font-bold text-neutral-400 uppercase mt-1">
                Measurement Assistance
              </p>
            </div>

            {/* Right Detailed Content Block */}
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mb-4">
                For Customized Jewellery to feel as beautiful as it looks,
                accuracy in sizing is essential. Rehnoor Jewels provides
                multiple options to ensure a perfect fit:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Enter your size directly when placing your inquiry on
                  WhatsApp.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Use our Find Your Size guide, accessible from the product
                  page.
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  Request personal measurement assistance via WhatsApp, and our
                  team will walk you through the process.
                </li>
              </ul>

              <p className="text-[11px] sm:text-xs italic text-neutral-400 font-light border-t pt-3 border-neutral-100">
                We take sizing seriously because an improperly fitted piece, no
                matter how beautifully crafted, does not deliver the experience
                it deserves. Our team will confirm your sizing details before
                production begins.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
