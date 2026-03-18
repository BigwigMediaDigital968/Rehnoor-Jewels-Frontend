"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Eye, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────
// Place your 10 videos in /public/reels/ folder:
// /public/reels/reel-1.mp4
// /public/reels/reel-2.mp4 ... reel-10.mp4
//
// Update the views count to match your actual numbers.
// ─────────────────────────────────────────────────────────────────
const reels = [
  {
    id: 1,
    src: "/reels/reel-1.mp4",
    views: "124K",
    caption: "Nawabi Chain — 22kt gold ✦",
  },
  {
    id: 2,
    src: "/reels/reel-2.mp4",
    views: "89K",
    caption: "Kada Collection Drop 🔥",
  },
  {
    id: 3,
    src: "/reels/reel-3.mp4",
    views: "210K",
    caption: "Ring sizing — free for life",
  },
  {
    id: 4,
    src: "/reels/reel-4.mp4",
    views: "67K",
    caption: "Behind the craft ✦",
  },
  {
    id: 5,
    src: "/reels/reel-5.mp4",
    views: "189K",
    caption: "Bracelet stack goals",
  },
  {
    id: 6,
    src: "/reels/reel-6.mp4",
    views: "324K",
    caption: "Pendant — wear your story",
  },
  {
    id: 7,
    src: "/reels/reel-7.mp4",
    views: "54K",
    caption: "Gold never goes out of style",
  },
  {
    id: 8,
    src: "/reels/reel-8.mp4",
    views: "98K",
    caption: "New arrival: Moghul Kada",
  },
  {
    id: 9,
    src: "/reels/reel-9.mp4",
    views: "143K",
    caption: "BIS hallmarked — always",
  },
  {
    id: 10,
    src: "/reels/reel-10.mp4",
    views: "76K",
    caption: "Crafted in Jaipur with love",
  },
];

// ── Single Reel Card ──────────────────────────────────────────────
function ReelCard({
  reel,
  index,
  globalMuted,
  onUnmute,
}: {
  reel: (typeof reels)[number];
  index: number;
  globalMuted: boolean;
  onUnmute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Intersection Observer — play when in view, pause when out
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Sync mute state with global toggle
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = globalMuted;
  }, [globalMuted]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        borderRadius: "16px",
        aspectRatio: "9/16",
        background: "#0a0a0a",
        boxShadow: hovered
          ? "0 20px 60px rgba(252,193,81,0.18), 0 4px 20px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.15)",
        transition: "box-shadow 0.4s ease",
        cursor: "pointer",
      }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={reel.src}
        loop
        muted={globalMuted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Gradient overlays ── */}
      {/* Top fade — for Instagram header */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade — for caption + views */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
        }}
      />

      {/* ── Gold shimmer border on hover ── */}
      <div
        className="absolute inset-0 rounded-[16px] pointer-events-none transition-opacity duration-400"
        style={{
          border: "1.5px solid rgba(252,193,81,0.6)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Top bar — Instagram handle ── */}
      <div className="absolute top-0 inset-x-0 px-3 pt-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {/* Gradient avatar */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background:
                "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              padding: "2px",
            }}
          >
            <div className="w-full h-full rounded-full bg-black/30 flex items-center justify-center">
              <Instagram size={12} color="#fff" />
            </div>
          </div>
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                color: "#fff",
                fontFamily: "var(--font-accent, Cinzel)",
                letterSpacing: "0.08em",
                lineHeight: 1.2,
              }}
            >
              rehnoorjewels
            </p>
            <p
              style={{
                fontSize: "0.5rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1,
              }}
            >
              Original audio
            </p>
          </div>
        </div>
        {/* Reel number */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(252,193,81,0.15)",
            border: "1px solid rgba(252,193,81,0.3)",
          }}
        >
          <span
            style={{
              fontSize: "0.5rem",
              color: "var(--rj-gold)",
              fontFamily: "var(--font-accent, Cinzel)",
              letterSpacing: "0.1em",
            }}
          >
            REEL
          </span>
        </div>
      </div>

      {/* ── Bottom bar — caption + views ── */}
      <div className="absolute bottom-0 inset-x-0 px-3 pb-3 z-10">
        {/* Caption */}
        <p
          className="mb-2 line-clamp-2"
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: 1.4,
            fontFamily: "var(--font-body, DM Sans)",
          }}
        >
          {reel.caption}
        </p>

        {/* Views + hashtag row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Eye size={11} style={{ color: "var(--rj-gold)" }} />
            <span
              style={{
                fontSize: "0.6rem",
                color: "var(--rj-gold)",
                fontFamily: "var(--font-accent, Cinzel)",
                letterSpacing: "0.08em",
              }}
            >
              {reel.views} views
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              style={{
                fontSize: "0.55rem",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-accent, Cinzel)",
                letterSpacing: "0.06em",
              }}
            >
              #GoldReimagined
            </span>
          </div>
        </div>
      </div>

      {/* ── Play/Pause indicator (brief flash on state change) ── */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(252,193,81,0.2)",
              border: "1.5px solid rgba(252,193,81,0.5)",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderLeft: "14px solid var(--rj-gold)",
                marginLeft: "3px",
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────
export default function InstagramSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active slide for dot indicator
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onScroll = () => {
      const cardWidth = slider.scrollWidth / reels.length;
      const idx = Math.round(slider.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, reels.length - 1));
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;

    const down = (e: MouseEvent) => {
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const up = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };
    const move = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      slider.scrollLeft =
        scrollLeft - (e.pageX - slider.offsetLeft - startX) * 1.2;
    };

    slider.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    slider.addEventListener("mousemove", move);
    return () => {
      slider.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      slider.removeEventListener("mousemove", move);
    };
  }, []);

  // Scroll to dot
  const scrollToIndex = useCallback((i: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.scrollWidth / reels.length;
    slider.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  }, []);

  return (
    <section
      className="section-padding overflow-hidden"
      style={{ background: "var(--rj-charcoal)" }}
    >
      <div className="container-rj">
        {/* ── Heading ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ Follow the Gold
            </p>
            <h2 className="heading-lg leading-tight text-white">
              As seen on
              <br />
              <em className="text-gold-shimmer font-normal">Instagram</em>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <Link
              href="https://instagram.com/rehnoorjewels"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{ color: "var(--rj-gold)" }}
            >
              <Instagram size={14} />
              @rehnoorjewels
            </Link>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Tag #RehnoorMoments to get featured
            </p>
            {/* Global mute toggle */}
            <button
              onClick={() => setMuted((m) => !m)}
              className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70"
              style={{
                color: muted ? "rgba(255,255,255,0.4)" : "var(--rj-gold)",
              }}
            >
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              {muted ? "Unmute" : "Mute"} All
            </button>
          </div>
        </div>

        {/*
          ── UNIFIED SLIDER — works on all breakpoints ──
          mobile:  1 card visible (100% - padding)
          tablet:  3 cards visible
          desktop: 5 cards visible

          Achieved by setting card width as a percentage of container
          using CSS custom properties, with gap factored in.
        */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2"
            style={{
              scrollSnapType: "x mandatory",
              cursor: "grab",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Left padding */}
            <div className="flex-shrink-0 w-2" />

            {reels.map((reel, i) => (
              <div
                key={reel.id}
                style={{
                  scrollSnapAlign: "start",
                  flexShrink: 0,
                  // Mobile: 1 card = ~85vw, Tablet (md): 3 cards, Desktop (lg): 5 cards
                  // We use calc with vw minus container padding and gap
                  width:
                    "clamp(200px, calc((100vw - 3rem - 1rem) * 0.85), 260px)",
                }}
                className="md:!w-[calc((100%-5rem)/3)] lg:!w-[calc((100%-7rem)/5)]"
              >
                <ReelCard
                  reel={reel}
                  index={i}
                  globalMuted={muted}
                  onUnmute={() => setMuted(false)}
                />
              </div>
            ))}

            {/* Right padding */}
            <div className="flex-shrink-0 w-2" />
          </div>

          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-2 w-6 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--rj-charcoal), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-2 w-6 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, var(--rj-charcoal), transparent)",
            }}
          />
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-1.5 mt-5">
          {reels.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                background:
                  i === activeIndex
                    ? "var(--rj-gold)"
                    : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Go to reel ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center mt-10">
          <Link
            href="https://instagram.com/rehnoorjewels"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
            style={{
              display: "inline-flex",
              color: "var(--rj-gold)",
              borderColor: "var(--rj-gold)",
            }}
          >
            <Instagram size={14} />
            See All Reels on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
