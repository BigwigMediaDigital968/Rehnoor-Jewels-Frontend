"use client";

import React from "react";
import { motion } from "framer-motion";
import { ApiCollection } from "@/app/lib/api/collections";

/**
 * RelatedCollection Component
 * A highly stylized, animation-heavy section for Rehnoor Jewels.
 * Features:
 * - Staggered reveal animations
 * - Floating gold orbit effects
 * - Precise gender-based filtering
 * - Premium Typography (Cinzel/Serif)
 */

// interface Collection {
//   slug: string;
//   name: string;
//   heroImage: string;
//   label?: string;
// }

interface RelatedCollectionProps {
  currentSlug: string;
  allCollections: ApiCollection[];
}

export default function RelatedCollection({
  currentSlug,
  allCollections,
}: RelatedCollectionProps) {
  // Precise Gender Logic: 'women' contains 'men', so we isolate 'women' first.
  const isWomen =
    currentSlug.includes("women") || currentSlug.includes("rani-haar");
  const isMen = !isWomen && currentSlug.includes("men");

  const related = allCollections
    .filter((col) => {
      if (col.slug === currentSlug) return false;

      if (isWomen) {
        return col.slug.includes("women") || col.slug.includes("rani-haar");
      }
      if (isMen) {
        // Ensure we don't pick up women's collections just because they have 'men' in the string
        return col.slug.includes("men") && !col.slug.includes("women");
      }
      return true;
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#FCFBF7]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute -left-20 top-40 w-64 h-64 bg-[#003720]/5 rounded-full blur-3xl" />
      <div className="absolute -right-20 bottom-40 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 1 }}
            className="h-[1px] bg-[#D4AF37] mb-6"
          />
          <h2 className="font-cinzel text-3xl md:text-4xl tracking-[0.25em] uppercase text-[#003720] mb-3">
            The Royal <span className="italic font-light">Continuum</span>
          </h2>
          <p className="font-cinzel text-[11px] tracking-[0.4em] text-[#B89144] uppercase font-bold">
            Curated pieces to complement your aura
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6"
        >
          {related.map((col) => (
            <motion.a
              key={col.slug}
              href={`/collections/${col.slug}`}
              variants={itemVariants}
              className="group relative flex flex-col items-center no-underline"
            >
              {/* Circular Image Frame with animated orbit */}
              <div className="relative w-full aspect-square max-w-[280px] mb-8">
                {/* Orbiting Ring */}
                <div className="absolute inset-[-12px] border border-[#D4AF37]/20 rounded-full scale-95 group-hover:scale-105 group-hover:rotate-180 transition-all duration-1000 ease-out" />
                <div className="absolute inset-[-6px] border border-[#D4AF37]/10 rounded-full group-hover:border-[#D4AF37]/40 transition-colors duration-500" />

                {/* Main Image Mask */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,55,32,0.15)] bg-white">
                  <img
                    src={col.heroImage}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Inner Overlay */}
                  <div className="absolute inset-0 bg-[#003720]/10 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                  {/* Silk Reflection Effect */}
                  <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>

              {/* Textual Content */}
              <div className="text-center">
                <h3 className="font-cinzel text-lg tracking-[0.15em] text-[#003720] mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {col.label}
                </h3>

                <div className="flex flex-col items-center">
                  <div className="h-[1px] w-8 bg-[#D4AF37]/30 group-hover:w-16 transition-all duration-500" />
                  <span className="mt-3 font-cinzel text-[9px] tracking-[0.3em] text-[#B89144] uppercase opacity-60 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                    Discover Legacy
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Global Boutique Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <a
            href="/collections"
            className="inline-flex items-center gap-4 group cursor-pointer"
          >
            <span className="h-[1px] w-12 bg-[#003720]/20 group-hover:w-20 transition-all duration-500" />
            <span className="font-cinzel text-xs tracking-[0.5em] text-[#003720] uppercase font-bold">
              View Entire Archive
            </span>
            <span className="h-[1px] w-12 bg-[#003720]/20 group-hover:w-20 transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&display=swap");

        .font-cinzel {
          font-family: "Cinzel", serif;
        }
      `}</style>
    </section>
  );
}
