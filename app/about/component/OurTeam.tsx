"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
};

const team = [
  {
    name: "Riya Sharma",
    role: "Founder & Creative Director",
    bio: "Jewellery designer turned entrepreneur. 12 years of craft, one obsession: democratising gold.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85",
    tag: "Founder",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Craft & Quality",
    bio: "Master craftsman from Rajasthan. If it leaves our workshop, it has passed Arjun's eye.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85",
    tag: "Craft Lead",
  },
  {
    name: "Priya Nair",
    role: "Customer Experience Lead",
    bio: "Ex-hospitality. Now making sure every Rehnoor experience feels like a 5-star moment.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85",
    tag: "CX Lead",
  },
  {
    name: "Karan Bose",
    role: "Tech & Growth",
    bio: "Building the systems that let you find your perfect piece in under 60 seconds.",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=85",
    tag: "Growth",
  },
];

// ─────────────────────────────────────────────────────────────────
// SHARED CARD
// ─────────────────────────────────────────────────────────────────
function TeamCard({
  member,
  animate = false,
}: {
  member: (typeof team)[number];
  animate?: boolean;
}) {
  return (
    <div className="group text-center w-full">
      {/* Photo */}
      <div
        className="relative mx-auto mb-5 rounded-2xl overflow-hidden"
        style={{
          width: "100%",
          aspectRatio: "3/4",
          background: "var(--rj-ivory-dark)",
        }}
      >
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 85vw, 25vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,55,32,0.65) 0%, transparent 55%)",
          }}
        />
        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className="font-cinzel text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: "var(--rj-gold)", color: "#000" }}
          >
            {member.tag}
          </span>
        </div>
        {/* Name overlay on photo (bottom) */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <p className="font-cormorant font-semibold text-xl text-white leading-tight">
            {member.name}
          </p>
          <p
            className="font-cinzel text-[8px] tracking-widest uppercase mt-0.5"
            style={{ color: "var(--rj-gold)" }}
          >
            {member.role}
          </p>
        </div>
      </div>

      <p
        className="text-sm leading-relaxed px-1"
        style={{
          color: "var(--rj-ash)",
          fontFamily: "var(--font-body,'DM Sans'),sans-serif",
        }}
      >
        {member.bio}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MOBILE CAROUSEL
// ─────────────────────────────────────────────────────────────────
function MobileCarousel({ inView }: { inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 prev, 1 next

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + team.length) % team.length);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="sm:hidden"
    >
      {/* Card stage */}
      <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full px-6"
          >
            <TeamCard member={team[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-center gap-5 mt-5">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            border: "1.5px solid var(--rj-bone)",
            background: "#fff",
            color: "var(--rj-charcoal)",
            cursor: "pointer",
          }}
          aria-label="Previous member"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              aria-label={`Go to member ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "22px" : "6px",
                height: "6px",
                background:
                  i === current ? "var(--rj-emerald)" : "var(--rj-bone)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => go(1)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            border: "1.5px solid var(--rj-bone)",
            background: "#fff",
            color: "var(--rj-charcoal)",
            cursor: "pointer",
          }}
          aria-label="Next member"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Counter */}
      <p
        className="text-center font-cinzel text-[9px] tracking-widest mt-3"
        style={{ color: "var(--rj-ash)" }}
      >
        {current + 1} / {team.length}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DESKTOP GRID
// ─────────────────────────────────────────────────────────────────
function DesktopGrid({ inView }: { inView: boolean }) {
  return (
    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, i) => (
        <motion.div
          key={member.name}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={i * 0.4}
        >
          <TeamCard member={member} />
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function OurTeam() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-cinzel text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "var(--rj-emerald)" }}
          >
            ✦ Our Team
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
            className="font-cormorant font-light mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--rj-charcoal)",
            }}
          >
            The People Behind the Gold
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="max-w-sm mx-auto text-sm"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            Small team. Big obsession. Every piece you wear is touched by
            someone who genuinely cares.
          </motion.p>
          <div className="divider-gold-center mt-6" />
        </div>

        {/* Mobile carousel / Desktop grid */}
        <MobileCarousel inView={inView} />
        <DesktopGrid inView={inView} />
      </div>
    </section>
  );
}
