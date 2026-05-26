// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// interface ImageData {
//   src: string;
//   alt: string;
// }

// interface ZoomModalProps {
//   images: ImageData[];
//   currentIndex: number;
//   setCurrentIndex: (index: number | ((prev: number) => number)) => void;
//   onClose: () => void;
//   title?: string;
// }

// export default function ZoomModal({
//   images = [],
//   currentIndex,
//   setCurrentIndex,
//   onClose,
//   title = "Gallery View",
// }: ZoomModalProps) {
//   const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const imageContainerRef = useRef<HTMLDivElement>(null);

//   const [zoomVisible, setZoomVisible] = useState(false);

//   const [zoomPosition, setZoomPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const [backgroundPosition, setBackgroundPosition] = useState({
//     x: 0,
//     y: 0,
//   });

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const container = imageContainerRef.current;

//     if (!container) return;

//     const rect = container.getBoundingClientRect();

//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     const xPercent = (x / rect.width) * 100;
//     const yPercent = (y / rect.height) * 100;

//     setZoomPosition({ x, y });

//     setBackgroundPosition({
//       x: xPercent,
//       y: yPercent,
//     });
//   };

//   // Prevent background scrolling while the lightbox is active
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   // Keyboard navigation & Close on Escape key
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft") handlePrev();
//       if (e.key === "Escape") onClose();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentIndex, images.length]);

//   // Center active thumbnail in the scroll view when currentIndex changes
//   useEffect(() => {
//     const activeThumb = thumbnailRefs.current[currentIndex];
//     const container = scrollContainerRef.current;
//     if (activeThumb && container) {
//       const containerWidth = container.offsetWidth;
//       const thumbOffsetLeft = activeThumb.offsetLeft;
//       const thumbWidth = activeThumb.offsetWidth;

//       container.scrollTo({
//         left: thumbOffsetLeft - containerWidth / 2 + thumbWidth / 2,
//         behavior: "smooth",
//       });
//     }
//   }, [currentIndex]);

//   const handleNext = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrev = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Drag/Swipe gesture logic
//   const handleDragEnd = (event: any, info: any) => {
//     const swipeThreshold = 50; // pixels
//     if (info.offset.x < -swipeThreshold) {
//       handleNext();
//     } else if (info.offset.x > swipeThreshold) {
//       handlePrev();
//     }
//   };

//   if (!images.length) return null;

//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 select-none overflow-hidden font-sans">
//       {/* Translucent Backdrop: Page content remains blurry but visible */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="absolute inset-0 w-full h-full bg-rj-emerald-dark/60 backdrop-blur-md"
//         onClick={onClose}
//       />

//       {/* ── Mid Card Container ── */}
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.95, opacity: 0 }}
//         transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
//         className="relative w-full max-w-4xl bg-[#002410]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col p-2 py-4 sm:p-4 md:p-6 gap-2 z-10 my-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── Header Bar (Integrated inside Card) ── */}
//         <div className="hidden justify-between items-center pb-2 border-b border-white/5">
//           <div className="space-y-0.5">
//             <h2 className="text-sm md:text-lg font-serif font-light tracking-wide text-[#faf8f3]">
//               {title}
//             </h2>
//             <div className="flex items-center gap-2.5">
//               <span className="h-px w-6 bg-[#fcc151]/55" />
//               <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#fcc151] font-bold">
//                 {currentIndex + 1} of {images.length}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={onClose}
//             className="p-2 bg-white/5 hover:bg-white/10 active:scale-95 text-[#faf8f3] hover:text-[#fcc151] hover:rotate-90 rounded-full transition-all duration-300 border border-white/5 shadow-md"
//             aria-label="Close modal"
//           >
//             <X size={18} strokeWidth={1.5} />
//           </button>
//         </div>

//         {/* ── Premium Stage Area ── */}
//         <div
//           ref={imageContainerRef}
//           className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden rounded-xl bg-[#001409]/0 border flex items-center justify-center"
//           onMouseMove={handleMouseMove}
//           onMouseEnter={() => setZoomVisible(true)}
//           onMouseLeave={() => setZoomVisible(false)}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.03 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={0.4}
//               onDragEnd={handleDragEnd}
//               className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
//             >
//               <img
//                 src={images[currentIndex].src}
//                 alt={images[currentIndex].alt || title}
//                 className="max-w-full max-h-full w-auto h-auto object-contain p-0 sm:p-2 md:p-4 pointer-events-none select-none"
//               />
//             </motion.div>
//           </AnimatePresence>

//           <div className="absolute top-1 sm:top-2 p-2 sm:p-4 right-0 flex justify-between w-full">
//             <div className="space-y-0.5">
//               <h2 className="text-sm hidden md:text-lg font-serif font-light tracking-wide text-[#faf8f3]">
//                 {title}
//               </h2>
//               <div className="flex items-center gap-2.5">
//                 <span className="h-px w-6 bg-[#fcc151]/55" />
//                 <p className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-[#fcc151] font-bold">
//                   {currentIndex + 1} of {images.length}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 bg-white/5 cursor-pointer hover:bg-white/10 active:scale-95 text-[#faf8f3] hover:text-[#fcc151] hover:rotate-90 rounded-full transition-all duration-300 border border-white/5 shadow-md"
//               aria-label="Close modal"
//             >
//               <X size={18} strokeWidth={1.5} />
//             </button>
//           </div>

//           {/* ── Inner Floating Navigation Controls ── */}
//           <div className="absolute inset-x-0 flex justify-between pointer-events-none w-full left-0 px-2 md:px-2">
//             <button
//               onClick={handlePrev}
//               className="pointer-events-auto cursor-pointer p-2.5 md:p-3 bg-[#003720]/80 hover:bg-[#004d2d] text-[#faf8f3] hover:text-[#fcc151] rounded-full transition-all border border-white/10 group shadow-md active:scale-95"
//               aria-label="Previous image"
//             >
//               <ChevronLeft
//                 size={20}
//                 strokeWidth={2.5}
//                 className="group-hover:-translate-x-0.5 transition-transform"
//               />
//             </button>
//             <button
//               onClick={handleNext}
//               className="pointer-events-auto cursor-pointer p-2.5 md:p-3 bg-[#003720]/80 hover:bg-[#004d2d] text-[#faf8f3] hover:text-[#fcc151] rounded-full transition-all border border-white/10 group shadow-md active:scale-95"
//               aria-label="Next image"
//             >
//               <ChevronRight
//                 size={20}
//                 strokeWidth={2.5}
//                 className="group-hover:translate-x-0.5 transition-transform"
//               />
//             </button>
//           </div>
//         </div>

//         {/* Telescope Zoom Lens */}
//         {zoomVisible && (
//           <div
//             className="absolute pointer-events-none z-99 border-2 border-[#fcc151] rounded-full shadow-2xl overflow-hidden hidden md:block"
//             style={{
//               width: 180,
//               height: 180,
//               left: zoomPosition.x - 90,
//               top: zoomPosition.y - 90,
//               backgroundImage: `url(${images[currentIndex].src})`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "250%",
//               backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
//               backdropFilter: "blur(2px)",
//             }}
//           >
//             {/* Lens Glow */}
//             <div className="absolute inset-0 rounded-full ring-4 ring-white/10" />

//             {/* Crosshair */}
//             <div className="absolute left-1/2 top-0 h-full w-px bg-white/20 -translate-x-1/2" />
//             <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 -translate-y-1/2" />
//           </div>
//         )}

//         {/* ── Integrated Bottom Dock (Directly below Image Stage) ── */}
//         <div
//           ref={scrollContainerRef}
//           className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-2 md:p-3 shadow-inner flex gap-2.5 overflow-x-auto justify-start md:justify-center items-center scrollbar-hidden snap-x touch-pan-x"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {images.map((img, i) => (
//             <button
//               key={i}
//               ref={(el) => {
//                 thumbnailRefs.current[i] = el;
//               }}
//               onClick={() => setCurrentIndex(i)}
//               className={`relative flex-shrink-0 w-14 h-10 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 snap-center focus:outline-none ${
//                 currentIndex === i
//                   ? "ring-2 ring-[#fcc151] scale-105 opacity-100 shadow-[0_0_12px_rgba(252,193,81,0.35)]"
//                   : "opacity-45 hover:opacity-80 scale-95"
//               }`}
//             >
//               <img
//                 src={img.src}
//                 alt={`Thumbnail view ${i + 1}`}
//                 className="w-full h-full object-cover select-none pointer-events-none"
//               />
//             </button>
//           ))}
//         </div>
//       </motion.div>

//       {/* Style overrides for custom scrollbar configurations */}
//       <style>{`
//         .scrollbar-hidden::-webkit-scrollbar { display: none; }
//         .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

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

const LENS_SIZE = 168; // diameter px
const ZOOM_SCALE = 3.0; // magnification factor

export default function ZoomModal({
  images = [],
  currentIndex,
  setCurrentIndex,
  onClose,
  title = "Gallery View",
}: ZoomModalProps) {
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollRailRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Lens: viewport-space cursor + image-space bg-position
  const [lens, setLens] = useState<{
    active: boolean; // true only when cursor is over the stage on desktop
    // position of lens centre relative to the *card* (px) — avoids overflow clip
    lx: number;
    ly: number;
    // background-position percentages (0-100) for the zoomed image
    bx: number;
    by: number;
  }>({ active: false, lx: 0, ly: 0, bx: 50, by: 50 });

  // Only show lens on pointer-capable (non-touch) devices
  const [isPointer, setIsPointer] = useState(false);
  useEffect(() => {
    setIsPointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard nav
  const handleNext = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      (e as React.MouseEvent)?.stopPropagation?.();
      setCurrentIndex((p) => (p + 1) % images.length);
    },
    [images.length, setCurrentIndex],
  );
  const handlePrev = useCallback(
    (e?: React.MouseEvent | KeyboardEvent) => {
      (e as React.MouseEvent)?.stopPropagation?.();
      setCurrentIndex((p) => (p - 1 + images.length) % images.length);
    },
    [images.length, setCurrentIndex],
  );
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev, onClose]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const thumb = thumbnailRefs.current[currentIndex];
    const rail = scrollRailRef.current;
    if (!thumb || !rail) return;
    rail.scrollTo({
      left: thumb.offsetLeft - rail.offsetWidth / 2 + thumb.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [currentIndex]);

  // Mouse move: compute lens position relative to card, bg-position relative to image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPointer) return;
    const stage = stageRef.current;
    const img = imgRef.current;
    const card = cardRef.current;
    if (!stage || !img || !card) return;

    const stageRect = stage.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Cursor relative to stage
    const cx = e.clientX - stageRect.left;
    const cy = e.clientY - stageRect.top;

    // Rendered image rect inside the stage (object-contain letterboxing)
    const natW = img.naturalWidth || img.clientWidth;
    const natH = img.naturalHeight || img.clientHeight;
    const sW = stageRect.width;
    const sH = stageRect.height;
    const imgAspect = natW / natH;
    const stageAspect = sW / sH;

    let rendW: number, rendH: number, offX: number, offY: number;
    if (imgAspect > stageAspect) {
      rendW = sW;
      rendH = sW / imgAspect;
      offX = 0;
      offY = (sH - rendH) / 2;
    } else {
      rendH = sH;
      rendW = sH * imgAspect;
      offX = (sW - rendW) / 2;
      offY = 0;
    }

    const relX = Math.max(0, Math.min(cx - offX, rendW));
    const relY = Math.max(0, Math.min(cy - offY, rendH));
    const bx = (relX / rendW) * 100;
    const by = (relY / rendH) * 100;

    // Lens centre relative to card — so it isn't clipped by stage overflow:hidden
    const lx = e.clientX - cardRect.left;
    const ly = e.clientY - cardRect.top;

    // Clamp lens so it stays fully inside the card
    const clampedLx = Math.max(
      LENS_SIZE / 2,
      Math.min(cardRect.width - LENS_SIZE / 2, lx),
    );
    const clampedLy = Math.max(
      LENS_SIZE / 2,
      Math.min(cardRect.height - LENS_SIZE / 2, ly),
    );

    setLens({ active: true, lx: clampedLx, ly: clampedLy, bx, by });
  };

  // Swipe to navigate
  const handleDragEnd = (_e: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) handleNext();
    else if (info.offset.x > 50) handlePrev();
  };

  if (!images.length) return null;
  const current = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6 select-none overflow-hidden"
      style={{ fontFamily: "inherit" }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0"
        style={{
          background: "rgba(0,24,10,0.75)",
          backdropFilter: "blur(10px)",
        }}
        onClick={onClose}
      />

      {/* Card — position:relative so lens can be absolute inside it */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col w-full"
        style={{
          maxWidth: 900,
          height: "min(92dvh, 780px)",
          background: "rgba(0,24,10,0.92)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 20,
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Top bar ── */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2.5">
            <ZoomIn size={14} style={{ color: "rgba(252,193,81,0.7)" }} />
            <span
              style={{
                fontFamily: "var(--font-cinzel, 'Cinzel', serif)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(252,193,81,0.55)",
              }}
            >
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-all duration-200 hover:rotate-90 hover:opacity-70"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e8e4d9",
              cursor: "pointer",
            }}
            aria-label="Close gallery"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* ── Image stage ── */}
        <div
          ref={stageRef}
          className="relative overflow-hidden flex items-center justify-center"
          style={{
            flexGrow: 1,
            flexShrink: 1,
            minHeight: 200,
            cursor: isPointer ? "crosshair" : "grab",
            background: "rgba(0,18,8,0.4)",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setLens((l) => ({ ...l, active: false }))}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex items-center justify-center"
              style={{ cursor: isPointer ? "crosshair" : "grab" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={current.src}
                alt={current.alt || title}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  padding: "10px 14px",
                  pointerEvents: "none",
                  userSelect: "none",
                  display: "block",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(0,30,15,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e8e4d9",
                  cursor: "pointer",
                  zIndex: 90,
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(0,30,15,0.75)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e8e4d9",
                  cursor: "pointer",
                  zIndex: 90,
                }}
                aria-label="Next image"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* ── Zoom lens — sibling of stage, not child, so overflow:hidden doesn't clip it ── */}
        {isPointer && lens.active && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              // lx/ly are the lens *centre* relative to the card
              left: lens.lx - LENS_SIZE / 2,
              top: lens.ly - LENS_SIZE / 2,
              width: LENS_SIZE,
              height: LENS_SIZE,
              borderRadius: "50%",
              border: "2px solid rgba(252,193,81,0.8)",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.5), " +
                "0 8px 32px rgba(0,0,0,0.5), " +
                "inset 0 0 0 1px rgba(255,255,255,0.06)",
              backgroundImage: `url(${current.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${ZOOM_SCALE * 100}%`,
              backgroundPosition: `${lens.bx}% ${lens.by}%`,
              pointerEvents: "none",
              // Sits above the stage content but below modal chrome
              zIndex: 20,
              // Subtle vignette
              WebkitMaskImage:
                "radial-gradient(circle, black 60%, transparent 100%)",
              maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
            }}
          >
            {/* crosshair */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "12%",
                bottom: "12%",
                width: 1,
                background: "rgba(255,255,255,0.2)",
                transform: "translateX(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "12%",
                right: "12%",
                height: 1,
                background: "rgba(255,255,255,0.2)",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        )}

        {/* ── Thumbnail rail ── */}
        {images.length > 1 && (
          <div
            ref={scrollRailRef}
            className="flex gap-2 overflow-x-auto flex-shrink-0"
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={i}
                ref={(el) => {
                  thumbnailRefs.current[i] = el;
                }}
                onClick={() => setCurrentIndex(i)}
                style={{
                  flexShrink: 0,
                  width: 64,
                  height: 52,
                  borderRadius: 10,
                  overflow: "hidden",
                  padding: 0,
                  border:
                    i === currentIndex
                      ? "2px solid rgba(252,193,81,0.85)"
                      : "2px solid transparent",
                  opacity: i === currentIndex ? 1 : 0.42,
                  transform: i === currentIndex ? "scale(1.06)" : "scale(1)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  background: "rgba(0,0,0,0.3)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={`View ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    userSelect: "none",
                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
