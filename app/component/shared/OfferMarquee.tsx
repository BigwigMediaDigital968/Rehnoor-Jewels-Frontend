"use client";

import React from "react";
import { Sparkles, Percent, Gift } from "lucide-react";

const OFFERS = [
  {
    text: "💍 Buy 1 Get 1 Free on Women's Rings & Earrings 💍",
    code: null,
    icon: Gift,
  },
  {
    text: "🛍️ Black Friday Sale: Use BLACKFRIDAY10 on orders above ₹1,000 & BLACKFRIDAY20 on orders above ₹2,000",
    code: null,
    icon: Percent,
  },
  // {
  //   text: "🔥 Black Friday Sale: Use BLACKFRIDAY20 on orders above ₹2,000",
  //   code: null,
  //   icon: Percent,
  // },
  {
    text: "💸 Get ₹100 OFF on All Prepaid Orders",
    code: null,
    icon: Gift,
  },
];

export default function OfferMarquee() {
  // We duplicate the array items to ensure seamless infinite looping structural flow
  const marqueeItems = [...OFFERS, ...OFFERS, ...OFFERS];

  return (
    <div
      className="relative w-full overflow-hidden border-b border-white/10 py-3 flex items-center select-none"
      style={{ background: "var(--rj-emerald-dark, #002410)" }}
    >
      <div className="flex whitespace-nowrap min-w-full shrink-0 animate-marquee items-center gap-28 pr-16">
        {marqueeItems.map((item, index) => {
          //   const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 font-cinzel text-[10px] md:text-xs font-medium tracking-[0.15em] text-rj-gold"
            >
              {/* <IconComponent size={13} className="text-amber-400 shrink-0" /> */}
              <span>{item.text}</span>
              {item.code && (
                <span className="ml-1 bg-amber-500 text-black text-[9px] px-2 py-0.5 rounded font-mono font-extrabold tracking-wider">
                  {item.code}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Tailwind & CSS Keyframe inject layer */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
