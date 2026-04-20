"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Mehta",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Best gold chain I’ve bought online”
        </strong>
        <br />I ordered a gold chain and the finish is just like real gold.
        Definitely one of the best options for gold plated chains for men.
      </>
    ),
    verified: true,
  },
  {
    id: 2,
    name: "Aman Verma",
    location: "Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Premium cuban link chain quality”
        </strong>
        <br />
        The cuban link chain I received looks solid and stylish. Great option if
        you’re looking for trendy chains for men in gold look.
      </>
    ),
    verified: true,
  },
  {
    id: 3,
    name: "Karan Singh",
    location: "Jaipur",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Perfect 1 gram gold chain”
        </strong>
        <br />
        Very impressed with the shine and quality. This 1 gram gold chain for
        men is lightweight and perfect for daily wear.
      </>
    ),
    verified: true,
  },
  {
    id: 4,
    name: "Rohit Sharma",
    location: "Gurgaon",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Stylish chain design”
        </strong>
        <br />
        Bought a rope chain for men and it looks amazing. The gold plating is
        durable and doesn’t fade easily.
      </>
    ),
    verified: true,
  },
  {
    id: 5,
    name: "Vikas Yadav",
    location: "Lucknow",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">“Best gold kada”</strong>
        <br />I tried their gold plated kada for men - excellent finish and very
        comfortable to wear daily.
      </>
    ),
    verified: true,
  },
  {
    id: 6,
    name: "Priya Sharma",
    location: "Delhi",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Beautiful gold plated necklace”
        </strong>
        <br />I ordered a gold plated necklace for myself and it looks so
        elegant. Perfect for both daily wear and occasions.
      </>
    ),
    verified: true,
  },
  {
    id: 7,
    name: "Neha Gupta",
    location: "Chandigarh",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Loved the Gold Plated Jewellery collection”
        </strong>
        <br />
        Rehnoor has amazing one gram gold jewellery. The designs are trendy and
        look just like real gold.
      </>
    ),
    verified: true,
  },
  {
    id: 8,
    name: "Ritika Verma",
    location: "Indore",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Perfect mangalsutra design”
        </strong>
        <br />I bought a gold plated mangalsutra and it’s absolutely beautiful.
        Lightweight and very comfortable.
      </>
    ),
    verified: true,
  },
  {
    id: 9,
    name: "Anjali Mehta",
    location: "Pune",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Elegant bracelets for women”
        </strong>
        <br />
        The gold plated bracelets for women are stunning. The finish and
        detailing are impressive.
      </>
    ),
    verified: true,
  },
  {
    id: 10,
    name: "Aditya Kapoor",
    location: "Ahmedabad",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&q=80",
    rating: 5,
    text: (
      <>
        <strong className="text-[var(--rj-gold)]">
          “Amazing rings for women”
        </strong>
        <br />I purchased a couple of gold plated rings and they look premium.
        Totally worth it.
      </>
    ),
    verified: true,
  },

  // OLD testimonials (kept below)
  {
    id: 11,
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
    id: 12,
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
    id: 13,
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
    <section className="py-14 bg-[var(--rj-ivory-dark)] overflow-hidden">
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="label-accent text-[var(--rj-emerald)] mb-3">
            ✦ Customer Love
          </p>
          <h2 className="heading-lg text-[var(--rj-charcoal)]">
            Trusted by Jewellery Lovers Across India
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-3">
            Real experiences from customers who love our Gold Plated Jewellery
          </p>
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
                {active.text}&rdquo;
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
