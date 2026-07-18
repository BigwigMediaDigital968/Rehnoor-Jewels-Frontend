"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface OfferPopupProps {
  ringImgSrc: string;
  earringImgSrc: string;
  ringLink?: string;
  earringLink?: string;
}

export default function OfferPopups({
  ringImgSrc,
  earringImgSrc,
  ringLink = "/categories/rings",
  earringLink = "/categories/earrings",
}: OfferPopupProps) {
  const [activePopup, setActivePopup] = useState<"ring" | "earring" | null>(null);

  useEffect(() => {
    // Trigger the first popup (Rings) 2 seconds after the page loads
    const timer = setTimeout(() => {
      setActivePopup("ring");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const closeRingAndNext = () => {
    setActivePopup(null);
    // Open the Earring popup 1 second after the Ring popup is closed
    setTimeout(() => {
      setActivePopup("earring");
    }, 1000);
  };

  if (!activePopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
      {/* Ring Offer Popup */}
      {activePopup === "ring" && (
        <div className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl transform transition-all scale-100">
          <button
            onClick={closeRingAndNext}
            className="absolute top-3 cursor-pointer right-3 z-[9999] bg-black/40 bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors"
            aria-label="Close offer"
          >
            ✕
          </button>
          <a href={ringLink} onClick={() => setActivePopup(null)}>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={ringImgSrc}
                alt="Special Offer on Gold Plated Rings"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-center text-white z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY3GET2FREE</strong>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY2GET1FREE</strong>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Earring Offer Popup */}
      {activePopup === "earring" && (
        <div className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl transform transition-all scale-100">
          <button
            onClick={() => setActivePopup(null)}
            className="absolute cursor-pointer top-3 right-3 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm transition-colors"
            aria-label="Close offer"
          >
            ✕
          </button>
          <a href={earringLink} onClick={() => setActivePopup(null)}>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={earringImgSrc}
                alt="Special Offer on One Gram Gold Earrings"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 text-center text-white z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY3GET2FREE</strong>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 rounded w-full sm:w-auto">
                  <strong className="text-amber-400 font-mono tracking-wider">BUY2GET1FREE</strong>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}