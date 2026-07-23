
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface OfferSlide {
  id: string;
  imgSrc: string;
  alt: string;
  link: string;
  coupons: string[];
}

interface OfferPopupProps {
  slides: OfferSlide[];
  delaySeconds?: number;
}

export default function OfferPopup({ slides, delaySeconds = 2 }: OfferPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    // Trigger popup visibility based on configuration parameters
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, slides]);

  if (!isOpen || !slides || slides.length === 0) return null;

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Animation variants for the slide change transitions
  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const activeSlide = slides[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop Mask Frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Premium Frame Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative max-w-md w-full bg-[#00140a] rounded-2xl overflow-hidden border border-[#fcc151]/20 shadow-2xl z-10"
        >
          {/* Floating Absolute Dismiss Control */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 bg-[#00140a]/80 text-white/80 hover:text-[#fcc151] p-2 rounded-full border border-white/10 hover:border-[#fcc151]/30 transition-all duration-200 backdrop-blur-md cursor-pointer"
            aria-label="Dismiss Offer Portal"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Liquid Slider Container Box */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#001c0f]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full relative"
              >
                <Link href={activeSlide.link} onClick={() => setIsOpen(false)} className="block w-full h-full">
                  <Image
                    src={activeSlide.imgSrc}
                    alt={activeSlide.alt}
                    fill
                    sizes="(max-w-md) 100vw, 450px"
                    className="object-cover pointer-events-none"
                    priority
                  />
                  
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows (Only displays if multiple items exist) */}
            {slides.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#00140a] text-white/80 hover:text-[#fcc151] p-1.5 rounded-full border border-white/5 hover:border-[#fcc151]/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                  aria-label="Previous Offer Slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#00140a] text-white/80 hover:text-[#fcc151] p-1.5 rounded-full border border-white/5 hover:border-[#fcc151]/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                  aria-label="Next Offer Slide"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Technical Data Bar & Coupon Footer Grid */}
        
        </motion.div>
      </div>
    </AnimatePresence>
  );
}