"use client";

import { useState } from "react";

interface CertificateLogo {
  id: string;
  name: string;
  altText: string;
  imageSrc: string;
}

const CERTIFICATE_LOGOS: CertificateLogo[] = [
  {
    id: "cert-1",
    name: "BIS Hallmark",
    altText: "Bureau of Indian Standards Government Authenticated Gold Seal",
    imageSrc: "/bis-logo.jpg",
  },
  {
    id: "cert-2",
    name: "HUID Unique ID",
    altText: "Government Traceable 6-digit HUID Code Certification",
    imageSrc: "/igi-logo.jpg",
  },
  {
    id: "cert-3",
    name: "IGI Certified",
    altText:
      "International Gemological Institute Diamond Laboratory Verification",
    imageSrc: "/igi-logo.jpg",
  },
  {
    id: "cert-4",
    name: "GIA Standards",
    altText:
      "Gemological Institute of America Natural Diamond Evaluation Authority",
    imageSrc: "/igi-logo.jpg",
  },
  {
    id: "cert-5",
    name: "100% Conflict-Free",
    altText: "Ethically Sourced Responsibly Mined Natural Diamond Guarantee",
    imageSrc: "/igi-logo.jpg",
  },
];

export default function CertificationMarquee() {
  const [paused, setPaused] = useState(false);

  // Triple items list to provide seamless infinite loop continuity over long viewports
  const repeatedLogos = [
    ...CERTIFICATE_LOGOS,
    ...CERTIFICATE_LOGOS,
    ...CERTIFICATE_LOGOS,
  ];

  return (
    <div className="w-full bg-[#fcc151] py-9 border-b border-black/10 select-none">
      {/* Dynamic Keyframe Injection for Infinite Loop */}
      <style>{`
        @keyframes twMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        .animate-twMarquee {
          animation: twMarquee 26s linear infinite;
        }
      `}</style>

      {/* Header Label */}
      <h3 className="font-serif text-[11px] font-bold tracking-[0.22em] text-center uppercase text-[#00140a] mb-5 opacity-90">
        Guaranteed Trust & Certification Standards
      </h3>

      {/* Main Marquee Scroller Frame */}
      <div
        className="w-full overflow-hidden relative bg-black/[0.03] border-y border-black/10 h-[90px] flex items-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Left & Right Ambient Blurring Vignettes */}
        <div className="absolute inset-y-0 left-0 w-[60px] sm:w-[140px] bg-gradient-to-r from-[#fcc151] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[60px] sm:w-[140px] bg-gradient-to-l from-[#fcc151] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div
          className={`inline-flex items-center whitespace-nowrap will-change-transform animate-twMarquee ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {repeatedLogos.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="inline-flex items-center justify-center px-9 sm:px-16 h-[90px] border-r border-black/[0.06] group cursor-pointer"
              title={logo.altText}
            >
              <img
                src={logo.imageSrc}
                alt={logo.altText}
                className="h-[42px] w-auto object-contain opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 ease-out"
                loading={i > 5 ? "lazy" : "eager"}
                onError={(e) => {
                  // Fallback to show text if a local file is missing or disconnected
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextSibling as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              {/* Fallback Text Badge */}
              <span className="hidden text-xs font-mono font-bold tracking-wider text-[#00140a]/40 uppercase bg-black/[0.05] px-3 py-1.5 rounded border border-black/5">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
