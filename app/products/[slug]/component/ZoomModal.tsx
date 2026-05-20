"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageData {
  src: string;
  alt: string;
}

interface ZoomModalProps {
  images: ImageData[];
  currentIndex: number;
  setCurrentIndex: (index: number | ((prev: number) => number)) => void;
  onClose: () => void;
  title?: string;
}

export default function ZoomModal({
  images = [],
  currentIndex,
  setCurrentIndex,
  onClose,
  title = "Gallery View",
}: ZoomModalProps) {
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling while the lightbox is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Keyboard navigation & Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images.length]);

  // Center active thumbnail in the scroll view when currentIndex changes
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[currentIndex];
    const container = scrollContainerRef.current;
    if (activeThumb && container) {
      const containerWidth = container.offsetWidth;
      const thumbOffsetLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      
      container.scrollTo({
        left: thumbOffsetLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Drag/Swipe gesture logic
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // pixels
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 select-none overflow-hidden font-sans">
      {/* Translucent Backdrop: Page content remains blurry but visible */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 w-full h-full bg-rj-emerald-dark/60 backdrop-blur-md"
        
        onClick={onClose}
      />

      {/* ── Mid Card Container ── */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-[#002410]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col p-2 py-4 sm:p-4 md:p-6 gap-2 z-10 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header Bar (Integrated inside Card) ── */}
        <div className="hidden justify-between items-center pb-2 border-b border-white/5">
          <div className="space-y-0.5">
            <h2 className="text-sm md:text-lg font-serif font-light tracking-wide text-[#faf8f3]">
              {title}
            </h2>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#fcc151]/55" />
              <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#fcc151] font-bold">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 active:scale-95 text-[#faf8f3] hover:text-[#fcc151] hover:rotate-90 rounded-full transition-all duration-300 border border-white/5 shadow-md"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Premium Stage Area ── */}
        <div className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden rounded-xl bg-[#001409]/0 border flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt || title}
                className="max-w-full max-h-full w-auto h-auto object-contain p-0 sm:p-2 md:p-4 pointer-events-none select-none"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1 sm:top-2 p-2 sm:p-4 right-0 flex justify-between w-full">
            <div className="space-y-0.5">
            <h2 className="text-sm hidden md:text-lg font-serif font-light tracking-wide text-[#faf8f3]">
              {title}
            </h2>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-[#fcc151]/55" />
              <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#fcc151] font-bold">
                {currentIndex + 1} of {images.length}
              </p>
            </div>
          </div>
            <button
            onClick={onClose}
            className="p-2 bg-white/5 cursor-pointer hover:bg-white/10 active:scale-95 text-[#faf8f3] hover:text-[#fcc151] hover:rotate-90 rounded-full transition-all duration-300 border border-white/5 shadow-md"
            aria-label="Close modal"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          </div>

          {/* ── Inner Floating Navigation Controls ── */}
          <div className="absolute inset-x-0 flex justify-between pointer-events-none w-full left-0 px-2 md:px-2">
            <button
              onClick={handlePrev}
              className="pointer-events-auto cursor-pointer p-2.5 md:p-3 bg-[#003720]/80 hover:bg-[#004d2d] text-[#faf8f3] hover:text-[#fcc151] rounded-full transition-all border border-white/10 group shadow-md active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto cursor-pointer p-2.5 md:p-3 bg-[#003720]/80 hover:bg-[#004d2d] text-[#faf8f3] hover:text-[#fcc151] rounded-full transition-all border border-white/10 group shadow-md active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── Integrated Bottom Dock (Directly below Image Stage) ── */}
        <div
          ref={scrollContainerRef}
          className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-2 md:p-3 shadow-inner flex gap-2.5 overflow-x-auto justify-start md:justify-center items-center scrollbar-hidden snap-x touch-pan-x"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              ref={(el) => { thumbnailRefs.current[i] = el; }}
              onClick={() => setCurrentIndex(i)}
              className={`relative flex-shrink-0 w-14 h-10 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 snap-center focus:outline-none ${
                currentIndex === i
                  ? "ring-2 ring-[#fcc151] scale-105 opacity-100 shadow-[0_0_12px_rgba(252,193,81,0.35)]"
                  : "opacity-45 hover:opacity-80 scale-95"
              }`}
            >
              <img
                src={img.src}
                alt={`Thumbnail view ${i + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* Style overrides for custom scrollbar configurations */}
      <style>{`
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}