"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  title: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    title: "Exactly What I Imagined, Down to Every Detail",
    author: "Priya S.",
    location: "Delhi",
    quote:
      "I had a very specific design in mind and was worried no one would execute it right. Rehnoor Jewels not only understood my vision but improved it. The gold weight and diamond clarity were shared before production, just as promised. Absolutely worth every rupee.",
  },
  {
    title: "Transparent Pricing Made All the Difference",
    author: "Rahul M.",
    location: "Mumbai",
    quote:
      "What I appreciated most was that there were no surprises. Every cost, from gold weight to diamond carats, was explained clearly on WhatsApp before I confirmed. The final piece was stunning. This is how jewellery buying should feel.",
  },
  {
    title: "Only Natural Diamonds, and They Proved It",
    author: "Sneha K.",
    location: "Bangalore",
    quote:
      "I was specifically looking for natural diamond jewellery, not lab-grown. Rehnoor Jewels gave me full certification details and clarity specifications upfront. The piece I received is breathtaking and genuinely valuable.",
  },
  {
    title: "The WhatsApp Process Was So Simple",
    author: "Ananya R.",
    location: "Hyderabad",
    quote:
      "I was hesitant to customize jewellery online, but the WhatsApp consultation made it feel personal and safe. The team guided me at every step, from sizing to finish selection. My ring fits perfectly and looks even better in person.",
  },
  {
    title: "A Bridal Set That Felt Truly Mine",
    author: "Meera T.",
    location: "Pune",
    quote:
      "For my wedding, I wanted something that no one else would have. Rehnoor Jewels delivered exactly that. The 22K gold bangle set was customized to my wrist size and design preference. The craftsmanship is exceptional.",
  },
  {
    title: "Gold Rate Was Locked. No Stress, No Surprises.",
    author: "Vikram D.",
    location: "Chennai",
    quote:
      "The gold rate lock feature was something I had never seen before. I booked at a certain rate, and the final billing matched exactly. That level of financial transparency is rare in the jewellery industry.",
  },
];

export default function CustomTestimonial() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Desktop Navigation Trigger
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const offsetWidth =
        direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Mouse Drag Scroller Setup for Desktop Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed velocity weight multipliers
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="w-full bg-[#faf9f6] py-16 md:py-24 overflow-hidden select-none">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ── HEADER NAVIGATION PANEL ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <span className="font-cinzel text-[10px] tracking-[0.3em] font-bold text-amber-600 uppercase block">
              ✦ Client Journals ✦
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-neutral-900 leading-tight">
              What Our Customers Say About <br />
              Their{" "}
              <em className="text-neutral-500 font-normal italic">
                Customized Jewellery
              </em>
            </h2>
          </div>

          {/* Desktop Arrow Buttons Container */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="w-11 h-11 rounded-full border border-[#E8DCC3] bg-white flex items-center justify-center text-[#9B7A47] hover:bg-[#9B7A47] hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-11 h-11 rounded-full border border-[#E8DCC3] bg-white flex items-center justify-center text-[#9B7A47] hover:bg-[#9B7A47] hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
              aria-label="Scroll Right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── CAROUSEL INTERACTIVE WRAPPER FRAME ── */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto pb-8 pt-2 px-1 scrollbar-none snap-x snap-mandatory no-scrollbar ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch", // native physics swipe acceleration engine for Apple/Android platforms
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="min-w-[290px] sm:min-w-[380px] max-w-[380px] snap-start flex flex-col justify-between bg-white border border-neutral-200/70 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(155,122,71,0.06)] border-b-4 hover:border-b-[#9B7A47] transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Visual Accent Block Frame Components */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <Quote
                    size={20}
                    className="text-neutral-200 fill-neutral-100"
                  />
                </div>

                {/* Narrative Layout Text Sections */}
                <div className="space-y-2">
                  <h3 className="font-cormorant text-xl font-medium text-neutral-900 tracking-wide leading-snug">
                    &ldquo;{item.title}&rdquo;
                  </h3>
                  <p className="font-sans font-light text-neutral-600 text-sm leading-relaxed">
                    {item.quote}
                  </p>
                </div>
              </div>

              {/* Author Identification Grid Block */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-cinzel text-xs font-bold tracking-widest text-neutral-800">
                    {item.author}
                  </h4>
                  <p className="font-sans text-[11px] text-neutral-400 font-light mt-0.5">
                    Verified Client • {item.location}
                  </p>
                </div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest bg-neutral-100 px-2.5 py-1 rounded-full text-neutral-500">
                  100% Certified
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Indicator Helper Tagline */}
        <p className="font-sans text-center text-xs text-neutral-400 font-light tracking-wide mt-4 md:hidden">
          Swipe horizontally to explore all parameters
        </p>
      </div>
    </section>
  );
}
