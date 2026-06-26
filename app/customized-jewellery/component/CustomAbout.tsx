"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Award, Gem, Clock, Layers, Sparkles } from "lucide-react";

export default function CustomAbout() {
  // Animation presets for premium micro-interactions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const pillars = [
    {
      icon: <Layers size={18} className="text-amber-700" />,
      title: "Exclusive Design Catalog",
      desc: "Spanning Fine, Demi Fine, and Semi Fine Jewelry categories, all engineered dynamically for personal expression.",
    },
    {
      icon: <Award size={18} className="text-amber-700" />,
      title: "14K & 22K Purity",
      desc: "Crafted exclusively with real 14K or 22K gold, upholding luxury benchmarks with zero compromises.",
    },
    {
      icon: <Gem size={18} className="text-amber-700" />,
      title: "Certified Natural Diamonds",
      desc: "Ethically sourced, pristine natural diamonds verified by global standards. Never lab-grown or artificial.",
    },
    {
      icon: <Clock size={18} className="text-amber-700" />,
      title: "Locked 70/30 Structure",
      desc: "Secure your order with an upfront allocation. Live gold market rates are completely locked right at booking.",
    },
  ];
  const logos = [
    {
      id: "cert-1",
      name: "BIS Hallmark",
      altText: "Bureau of Indian Standards Government Authenticated Gold Seal",
      imageSrc: "/bis-logo.jpg",
    },
    {
      id: "cert-2",
      name: "HUID Unique ID",
      altText: "Government Traceable 6-digit HUID Code Certification",
      imageSrc: "/igi-logo.jpg",
    },]


  return (
    <section className="w-full bg-[#faf9f6] py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* ── LEFT COLUMN: TRANSITIONAL COMPOSITE IMAGES ── */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative items-center px-2">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/30 to-transparent blur-3xl rounded-full -z-10 pointer-events-none scale-75" />

            {/* Core Editorial Image */}
            <motion.div
              variants={imageVariants}
              className="col-span-8 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-100"
            >
              <Image
                src="/customize/about-1.png"
                alt="Artisan molding tailored luxury ring blueprint"
                fill
                sizes="(max-width: 1024px) 60vw, 35vw"
                className="object-cover object-center transition-transform duration-[6000ms] hover:scale-105"
                priority
              />
            </motion.div>

            {/* Overlapping Floating Image */}
            <motion.div
              variants={imageVariants}
              className="col-span-5 absolute bottom-[-5%] right-0 aspect-square w-[45%] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#faf9f6] bg-neutral-200"
            >
              <Image
                src="/customize/about-2.png"
                alt="Detailed premium natural diamond setup close-up"
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover object-center"
              />
            </motion.div>

            {/* Decorative Floating Seal */}
            {/* <motion.div
              variants={itemVariants}
              className="absolute top-8 right-4 bg-white/80 backdrop-blur-md px-4 py-3 rounded-xl border shadow-lg flex items-center gap-2.5 max-w-[170px]"
              style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
            >
              <ShieldCheck
                size={16}
                className="text-emerald-700 flex-shrink-0"
              />
              <span className="font-cinzel text-[9px] font-bold tracking-wider leading-tight text-neutral-800">
                100% Authentic Designs
              </span>
            </motion.div> */}
            <div className="absolute top-6 sm:top-8 right-12 flex flex-col gap-4">
                {
                  logos.map((logo, i)=>(
                    <div
                  key={`${logo.id}`}
                  className=" inline-flex items-center rounded-full overflow-hidden justify-center shadow-2xs aspect-square group cursor-pointer"
                  title={logo.altText}
                >
                  <img
                    src={logo.imageSrc}
                    alt={logo.altText}
                    className="h-[48px] sm:h-[88px] aspect-square object-contain group-hover:scale-105 transition-all duration-300 ease-out filter contrast-[0.95]"
                    onError={(e) => {
                      // Completely remove image from rendering tree on break
                      e.currentTarget.style.display = "none";

                      // Query fallback badge and forcefully replace Tailwind's utility hidden rule
                      const fallback = e.currentTarget.nextSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.setProperty("display", "inline-block", "important");
                      }
                    }}
                  />

                  {/* Premium Typography Fallback Badge (Becomes active instantly if image breaks) */}
                  <span className="hidden text-[11px] font-sans font-bold tracking-widest text-[#00140a]/70 uppercase bg-black/5 px-4 py-2 rounded border border-black/10 backdrop-blur-sm transition-all group-hover:bg-black/10">
                    {logo.name}
                  </span>
                </div>
                  ))
                }
              </div>
          </div>

          {/* ── RIGHT COLUMN: MANIFESTO & CAPABILITIES ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Identity Badge */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-4"
            >
              <Sparkles size={12} className="text-amber-600" />
              <span className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase">
                The Rehnoor Promise
              </span>
            </motion.div>

            {/* Section Main Title */}
            <motion.h2
              variants={itemVariants}
              className="font-cormorant font-light text-neutral-900 leading-[1.15] tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-6"
            >
              What Is Customized Jewellery <br />
              <span
                className="font-normal italic"
                style={{ color: "var(--rj-gold, #d4af37)" }}
              >
                at Rehnoor Jewels?
              </span>
            </motion.h2>

            {/* Narrative Body Text */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-neutral-500 font-light text-sm sm:text-base leading-relaxed mb-8"
            >
              <p>
                At Rehnoor Jewels, Customized Jewellery is not just a service;
                it is a promise. A promise that what you wear will carry your
                identity, your story, and your sense of beauty. Unlike
                mass-produced pieces, our Customized Jewellery is tailored from
                our thoughtfully curated design catalog to match your exact
                vision.
              </p>
              <p>
                Whether you are drawn to the warm richness of gold or the
                luminous brilliance of natural diamonds, our artisans ensure
                every customized creation reflects both your personal preference
                and the highest standards of quality.
              </p>
            </motion.div>

            <hr
              className="mb-8"
              style={{ borderColor: "var(--rj-bone, #e5e5e5)" }}
            />

            {/* Capabilities Subheader */}
            <motion.h3
              variants={itemVariants}
              className="font-cinzel text-xs font-bold tracking-[0.15em] uppercase text-neutral-800 mb-6"
            >
              Why Rehnoor Jewels Is a Name You Can Trust
            </motion.h3>

            {/* Features Responsive Layout Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-4 group"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-50 group-hover:bg-amber-100/70 transition-colors duration-300 flex-shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-cormorant font-bold text-neutral-900 text-lg leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
