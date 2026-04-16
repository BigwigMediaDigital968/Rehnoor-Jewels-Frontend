"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "The Nawabi chain I ordered is absolutely stunning. The weight, the finish, the craftsmanship — everything exceeded my expectations. Got compliments at my cousin's wedding from everyone!",
    product: "Nawabi Gold Chain",
    verified: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    location: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: "Bought a kada for my father's birthday. The packaging was luxurious and the piece itself is extraordinary. Rehnoor truly reimagines gold. Will definitely be a repeat customer.",
    product: "Jaguar Rhodium Kada",
    verified: true,
  },
  {
    id: 3,
    name: "Vikram Patel",
    location: "Ahmedabad",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    rating: 5,
    text: "The quality is unmatched for the price. Got the BIS certificate with the piece, and the hallmark confirms it's genuine 22kt gold. Transparent, trustworthy brand.",
    product: "Franco Chain",
    verified: true,
  },
  {
    id: 4,
    name: "Siddharth Nair",
    location: "Bangalore",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "Ordered the signet ring for my engagement. The sizing was perfect and the finish is immaculate. The whole buying experience — from the website to delivery — was 5 stars.",
    product: "Signet Band Ring",
    verified: true,
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating
              ? "fill-[var(--rj-gold)] text-[var(--rj-gold)]"
              : "text-[var(--rj-bone)]"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  const active = testimonials[current];

  return (
    <section className="py-14 h-[90vh] bg-[var(--rj-ivory-dark)] overflow-hidden">
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="label-accent text-[var(--rj-emerald)] mb-3">
            ✦ Customer Love
          </p>
          <h2 className="heading-lg text-[var(--rj-charcoal)]">
            Worn with pride
          </h2>
          <div className="divider-gold-center mt-6" />
        </div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-[var(--shadow-card)] relative"
            >
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote size={60} className="text-[var(--rj-emerald)]" />
              </div>

              <StarRow rating={active.rating} />

              <blockquote className="font-[var(--font-display)] text-[var(--rj-charcoal)] text-xl md:text-2xl leading-relaxed mt-5 mb-8 italic">
                &ldquo;{active.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src={active.avatar}
                      alt={active.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-[var(--font-cinzel)] text-[var(--rj-charcoal)] text-sm tracking-wider">
                      {active.name}
                    </p>
                    <p className="text-[var(--rj-ash)] text-xs mt-0.5">
                      {active.location} · {active.product}
                    </p>
                  </div>
                </div>
                {active.verified && (
                  <span className="badge-emerald">✓ Verified</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-[var(--rj-emerald)]"
                      : "w-2 h-2 bg-[var(--rj-bone)] hover:bg-[var(--rj-gold)]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="w-10 h-10 border border-[var(--rj-bone)] hover:border-[var(--rj-emerald)] hover:text-[var(--rj-emerald)] flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-10 h-10 border border-[var(--rj-bone)] hover:border-[var(--rj-emerald)] hover:text-[var(--rj-emerald)] flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
