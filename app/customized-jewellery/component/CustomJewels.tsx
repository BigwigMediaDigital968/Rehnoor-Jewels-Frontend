"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Scale, ShieldCheck, Sparkles, Gem, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomJewel() {
  // Staggered layout variants for clean page presentation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="w-full bg-[#faf9f6] py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-0 max-w-8xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24 lg:space-y-36"
        >
          {/* ── SECTION 1: CUSTOMIZED GOLD JEWELLERY ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-6 order-2 lg:order-1 px-4 md:pl-36"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles
                  size={14}
                  className="text-amber-600 animate-spin-slow"
                />
                <span className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase">
                  Material Integrity
                </span>
              </div>

              <h2 className="font-cormorant font-light text-neutral-900 leading-[1.15] tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
                Customized Gold Jewellery: <br />
                <span
                  className="font-normal italic"
                  style={{ color: "var(--rj-gold, #d4af37)" }}
                >
                  Premium Purity, Enduring Elegance
                </span>
              </h2>

              <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed mb-8">
                Our Customized Gold Jewellery service is built on a foundation
                of material integrity. We source high-purity gold and craft each
                piece to exacting standards, ensuring the design you choose
                holds its value, beauty, and structure for years to come. <br />
                <br />
                Each piece of Customized Gold Jewellery is shaped to your exact
                measurements and finishes. From the weight of the gold to the
                surface texture, every element is fine-tuned to your
                specifications with zero compromise on quality.
              </p>

              {/* Gold Specifications List */}
              <ul className="space-y-4 border-t border-b py-6 mb-8 border-neutral-200">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-amber-50 rounded text-amber-700">
                    <Scale size={14} />
                  </div>
                  <span className="text-sm font-light text-neutral-600">
                    <strong className="font-cinzel text-[11px] font-bold tracking-wider text-neutral-800 uppercase mr-1">
                      Gold Purity:
                    </strong>{" "}
                    14K to 22K, durable, valuable, and timeless
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-amber-50 rounded text-amber-700">
                    <Scale size={14} />
                  </div>
                  <span className="text-sm font-light text-neutral-600">
                    <strong className="font-cinzel text-[11px] font-bold tracking-wider text-neutral-800 uppercase mr-1">
                      Weight:
                    </strong>{" "}
                    Calculated precisely in grams, disclosed before production
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-amber-50 rounded text-amber-700">
                    <Scale size={14} />
                  </div>
                  <span className="text-sm font-light text-neutral-600">
                    <strong className="font-cinzel text-[11px] font-bold tracking-wider text-neutral-800 uppercase mr-1">
                      Finishes Available:
                    </strong>{" "}
                    High-polish for a lustrous shine, matte for understated
                    elegance, or textured for a contemporary look
                  </span>
                </li>
              </ul>

              <p className="text-xs italic text-neutral-400 font-light mb-6">
                Our Customized Gold Jewellery is ideal for those who appreciate
                lasting craftsmanship and demand authenticity in every detail.
              </p>

              {/* Action Button */}
              <Link
                href="#leadform"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 font-cinzel text-[10px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 w-full sm:w-fit overflow-hidden border border-neutral-900 bg-neutral-900 text-white shadow-md hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Customize This Design
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <div className="absolute inset-0 bg-neutral-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[400ms] z-0" />
              </Link>
            </motion.div>

            {/* Right Image Frame */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-neutral-100"
            >
              <Image
                src="/customize/jewels-wide.png"
                alt="Premium 14K and 22K Customized Gold Jewellery collection"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-[5000ms] hover:scale-105"
              />
            </motion.div>
          </div>

          {/* ── SECTION 2: CUSTOMIZED NATURAL DIAMOND JEWELLERY ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image Frame */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl bg-neutral-100"
            >
              <Image
                src="/customize/jewels-image-2.png"
                alt="Ethically sourced luxury customized natural diamond jewellery"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center transition-transform duration-[5000ms] hover:scale-105"
              />
            </motion.div>

            {/* Right Content Column */}
            <motion.div
              variants={slideUp}
              className="lg:col-span-6 px-4 md:pe-36"
            >
              <div className="flex items-center gap-2 mb-4">
                <Gem size={14} className="text-amber-600 animate-pulse" />
                <span className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase">
                  Authenticity Standard
                </span>
              </div>

              <h2 className="font-cormorant font-light text-neutral-900 leading-[1.15] tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
                Customized Natural Diamond Jewellery: <br />
                <span
                  className="font-normal italic"
                  style={{ color: "var(--rj-gold, #d4af37)" }}
                >
                  Authenticity Is Our Standard
                </span>
              </h2>

              <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed mb-8">
                In a world where alternatives are everywhere, we hold firm to
                one principle: only natural is good enough. Our Customized
                Natural Diamond Jewellery is crafted exclusively with diamonds
                that formed over billions of years beneath the earth, not in a
                laboratory. <br />
                <br />
                This is not just a product choice; it is a values statement.
                Choosing Customized Natural Diamond Jewellery from Rehnoor
                Jewels means choosing a piece with genuine rarity, authentic
                origin, and enduring worth.
              </p>

              {/* Diamond Specifications List */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b py-6 mb-8 border-neutral-200">
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 bg-emerald-50 rounded text-emerald-700">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-light text-neutral-600 leading-snug">
                    Every diamond is naturally formed and ethically sourced
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 bg-emerald-50 rounded text-emerald-700">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-light text-neutral-600 leading-snug">
                    Certified for clarity, color, and carat weight
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 bg-emerald-50 rounded text-emerald-700">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-light text-neutral-600 leading-snug">
                    Positioned to hold long-term sentimental and material value
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 bg-emerald-50 rounded text-emerald-700">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-light text-neutral-600 leading-snug">
                    Never substituted with lab-grown or synthetic alternatives
                  </span>
                </li>
              </ul>

              <p className="text-xs italic text-neutral-400 font-light mb-6">
                Our Customized Diamond Jewellery is crafted for those who
                understand that the finest things in life are authentic and who
                refuse to settle for less.
              </p>

              {/* Action Button */}
              <Link
                href="#leadform"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 font-cinzel text-[10px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 w-full sm:w-fit overflow-hidden border border-neutral-900 bg-neutral-900 text-white shadow-md hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Customize This Design
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <div className="absolute inset-0 bg-neutral-800 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[400ms] z-0" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
