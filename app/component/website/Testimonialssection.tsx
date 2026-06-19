"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "PRIYA SHARMA",
    product: "Gold-Plated Necklace",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "Really loved the gold-plated necklace. The shine is beautiful, and it looks very close to real gold. Perfect for both daily wear and small occasions.",
  },
  {
    id: 2,
    name: "AMAN VERMA",
    product: "Bracelet",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    text: "Bought a bracelet and I’m happy with the quality. It’s stylish, lightweight, and goes well with most outfits.",
  },
  {
    id: 3,
    name: "NEHA KAPOOR",
    product: "Earrings",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "The earrings I ordered are elegant and comfortable to wear. I received compliments the first time I wore them.",
  },
  {
    id: 4,
    name: "RAHUL MEHTA",
    product: "Men's Chain",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    rating: 5,
    text: "Great collection for men. The chain I purchased looks premium, and the finishing is impressive. The jewellery is versatile enough to wear with casual and formal outfits. I especially liked that aspect of it.",
  },
  {
    id: 5,
    name: "SIMRAN KAUR",
    product: "Luxury Jewellery Collection",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&q=80",
    rating: 5,
    text: "Affordable yet high-end jewellery with great designs. It makes you feel luxurious when you're wearing it and gives a rich look without being too heavy or uncomfortable.",
  },
  {
    id: 6,
    name: "KARAN MALHOTRA",
    product: "Premium Ring",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&q=80",
    rating: 5,
    text: "The ring looks classy and well-made. Even with daily wear, the shine remains. The fitting is also perfect and comfortable for everyday use.",
  },
  {
    id: 7,
    name: "ANJALI GUPTA",
    product: "Jewellery Gift Set",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    rating: 5,
    text: "Ordered a jewellery set for gifting, and it was perfect. Nice packaging and beautiful design. The person I gifted it to absolutely loved it.",
  },
  {
    id: 8,
    name: "ROHIT SINGH",
    product: "Ethnic Jewellery Collection",
    avatar:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80",
    rating: 5,
    text: "Good quality jewellery. Looks great with ethnic wear, and delivery was also quick. The entire process went off without a hitch.",
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating ? "fill-[#FBBF24] text-[#FBBF24]" : "text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNavigate = (dir: 1 | -1) => {
    setDirection(dir);
    if (dir === 1) {
      setStartIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setStartIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      );
    }
  };

  // Get active subset of elements to guarantee layout completeness during runtime slide changes
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < testimonials.length; i++) {
      items.push(testimonials[(startIndex + i) % testimonials.length]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="h-[88vh] md:h-[80vh] bg-[#FBF9F6] flex flex-col justify-center py-14 overflow-hidden select-none">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col h-full justify-between">
        {/* Header Layout Block */}
        <div className="text-center pt-2">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-800 mb-2 font-cinzel">
            ✦ Customer Love ✦
          </p>
          <h2 className="text-3xl md:text-5xl font-cinzel text-neutral-800 font-medium tracking-wide">
            Trusted by Jewelry Lovers Across India
          </h2>
        </div>

        {/* Carousel Grid Track viewport container */}
        <div className="relative my-auto py-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              {visibleItems.slice(0, 3).map((item, index) => {
                // Dynamically apply hidden layout rules over viewports matching requested responsive columns

                return (
                  <motion.div
                    key={item.id}
                    layout
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 40 }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                    className={`bg-white border border-[#EBE5DF] rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]`}
                  >
                    <div>
                      {/* Top Metric Header Row */}
                      <div className="flex items-center justify-between mb-5">
                        <StarRow rating={item.rating} />
                        <span className="text-[9px] font-bold tracking-widest text-emerald-800 bg-[#E6ECE9] px-2.5 py-1 rounded-full uppercase font-cinzel">
                          Excellent
                        </span>
                      </div>

                      {/* Main Body Review Content */}
                      <p className="text-neutral-600 text-[13px] leading-relaxed font-normal tracking-wide line-clamp-4 mb-4">
                        {item.text}
                      </p>
                      <div className="w-full h-[1px] bg-[#F1ECE7] mb-4" />
                    </div>

                    {/* Bottom Author Row Metadata Block */}
                    <div>
                      <div className="flex items-center gap-3">
                        {/* <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            className="object-cover grayscale-[15%]"
                          />
                        </div> */}
                        <div className="overflow-hidden">
                          <h4 className="font-cinzel text-xs font-bold tracking-wider text-neutral-800 truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans tracking-wide mt-0.5 truncate">
                            {item.product}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Slide Controller Triggers */}
        <div className="flex items-center justify-between pb-4 border-t border-[#F1ECE7] pt-4">
          {/* Pagination Indicators */}
          <div className="flex gap-1.5">
            {testimonials.map((_, i) => {
              const isActive = i === startIndex;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > startIndex ? 1 : -1);
                    setStartIndex(i);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-5 bg-emerald-800"
                      : "w-1.5 bg-neutral-200 hover:bg-neutral-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              );
            })}
          </div>

          {/* Action Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => handleNavigate(-1)}
              className="w-9 h-9 rounded-full border border-[#EBE5DF] bg-white text-neutral-700 flex items-center justify-center hover:border-emerald-800 hover:text-emerald-800 transition-colors duration-200 active:scale-95 cursor-pointer"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => handleNavigate(1)}
              className="w-9 h-9 rounded-full border border-[#EBE5DF] bg-white text-neutral-700 flex items-center justify-center hover:border-emerald-800 hover:text-emerald-800 transition-colors duration-200 active:scale-95 cursor-pointer"
              aria-label="Next testimonials"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
