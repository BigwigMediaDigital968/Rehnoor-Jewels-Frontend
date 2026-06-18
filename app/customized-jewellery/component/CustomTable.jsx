"use client";

import React from "react";
import { Scale, Gem, FileText, CheckCircle } from "lucide-react";

export default function CustomTable() {
  const goldSpecs = [
    {
      label: "Gold Purity",
      value: "14K / 22K chosen based on your design requirement",
    },
    {
      label: "Gold Weight",
      value:
        "Calculated in grams varies based on design, size, and customization",
    },
    {
      label: "Finish",
      value: "High-polish / Matte / Textured as per your preference",
    },
  ];

  const diamondSpecs = [
    {
      label: "Diamond Type",
      value: "100% Natural Diamonds, no lab-grown or artificial alternatives",
    },
    {
      label: "Clarity",
      value:
        "VS / SI range visually clean diamonds with excellent light performance",
    },
    { label: "Color", value: "G–H range near-colorless, premium brilliance" },
    {
      label: "Diamond Weight",
      value: "Measured precisely in carats/cents per design",
    },
    {
      label: "Net Diamond Weight",
      value: "Transparently calculated and shared before order confirmation",
    },
  ];

  return (
    <section className="w-full bg-[#faf9f6] py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Block */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl mb-4">
            Complete Product Transparency: <br />
            <span
              className="font-normal italic"
              style={{ color: "var(--rj-gold, #d4af37)" }}
            >
              What Your Customized Jewellery Includes
            </span>
          </h2>
          <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed">
            We believe that a premium purchase deserves complete clarity. When
            you order Customized Jewellery from Rehnoor Jewels, you receive full
            disclosure of every specification before production begins.
          </p>
        </div>

        {/* Specifications Wrapper */}
        <div className="space-y-10">
          {/* ── GOLD SPECIFICATIONS ── */}
          <div
            className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <Scale size={20} style={{ color: "var(--rj-gold, #d4af37)" }} />
              <h3 className="font-cinzel text-sm font-bold tracking-widest text-neutral-800 uppercase">
                Gold Specifications
              </h3>
            </div>

            <div className="divide-y divide-neutral-100">
              {goldSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 py-4 gap-2 md:gap-6 first:pt-0 last:pb-0"
                >
                  <div className="md:col-span-4 font-cormorant font-bold text-neutral-900 text-lg">
                    {spec.label}
                  </div>
                  <div className="md:col-span-8 font-light text-neutral-500 text-sm sm:text-base leading-relaxed">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── DIAMOND SPECIFICATIONS ── */}
          <div
            className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100">
              <Gem size={19} style={{ color: "var(--rj-gold, #d4af37)" }} />
              <h3 className="font-cinzel text-sm font-bold tracking-widest text-neutral-800 uppercase">
                Diamond Specifications
              </h3>
            </div>

            <div className="divide-y divide-neutral-100">
              {diamondSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 py-4 gap-2 md:gap-6 first:pt-0 last:pb-0"
                >
                  <div className="md:col-span-4 font-cormorant font-bold text-neutral-900 text-lg">
                    {spec.label}
                  </div>
                  <div className="md:col-span-8 font-light text-neutral-500 text-sm sm:text-base leading-relaxed">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Guarantee Manifesto Card */}
        <div
          className="mt-12 p-6 rounded-xl border border-dashed flex flex-col sm:flex-row items-start gap-4 bg-amber-50/40"
          style={{ borderColor: "var(--rj-gold, #d4af37)" }}
        >
          <div
            className="p-2 bg-white rounded-lg border shadow-sm shrink-0"
            style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
          >
            <FileText size={18} style={{ color: "var(--rj-gold, #d4af37)" }} />
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            This level of product transparency is central to how we operate. You
            will never receive a vague estimate;{" "}
            <strong>
              every number is accurate, every detail is disclosed.
            </strong>{" "}
            This is what true premium Customized Jewellery looks like.
          </p>
        </div>
      </div>
    </section>
  );
}
