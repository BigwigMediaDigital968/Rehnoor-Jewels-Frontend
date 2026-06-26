"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface JewelryItem {
  id: string;
  code: string;
  title: string;
  type: string;
  imageSrc: string; // Public folder local paths: e.g., "/gallery/item-1.jpg"
  gWt: string; // Gross Weight
  dWt: string; // Diamond Weight
  cSt: string; // Colored Stones info
  nWt: string; // Net Weight / Metal base info
  description: string;
}

// ─── RAW EXPLICIT ARRAY OF 19 UNIQUE ARTICLES ─────────────────────────────────
const GALLERY_ITEMS: JewelryItem[] = [
  {
    id: "jwl-1",
    code: "DUGH",
    title: "Floral Diamond Cluster Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-1.webp",
    gWt: "5.310 g",
    dWt: "0.990 ct",
    cSt: "None",
    nWt: "5.112 g",
    description:
      "An elegant 14KT rose gold ring featuring an intricate floral cluster design meticulously set with brilliant diamonds.",
  },
  {
    id: "jwl-2",
    code: "DUGH",
    title: "Peacock Motif Diamond & Emerald Necklace",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-2.webp",
    gWt: "25.110 g",
    dWt: "2.790 ct / 376 pcs",
    cSt: "0.470 ct",
    nWt: "24.458 g",
    description:
      "An exquisite 14KT rose gold necklace featuring a sweeping, elaborate design reminiscent of a stylized peacock feather, adorned with a brilliant cascade of diamonds and a vibrant green emerald accent.",
  },
  {
    id: "jwl-3",
    code: "DUGH",
    title: "Pear Emerald and Diamond Halo Drop Earrings",
    type: "14KT Yellow Gold",
    imageSrc: "/customization/custom-3.webp",
    gWt: "4.570 g",
    dWt: "0.530 / 58",
    cSt: "1.800",
    nWt: "4.104 g",
    description:
      "Elegant 14KT yellow gold drop earrings featuring vibrant pear-shaped emerald centers enclosed in a sparkling diamond halo, suspended from a diamond-accented leverback closure.",
  },
  {
    id: "jwl-4",
    code: "IJVS",
    title: "Geometric Diamond & Emerald Drop Necklace",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-4.webp",
    gWt: "15.920 g",
    dWt: "1.270 ct",
    cSt: "0.880 ct",
    nWt: "15.490 g",
    description:
      "A stunning 14KT rose gold necklace combining intricate geometric framework with sparkling diamond clusters, punctuated by vibrant green emerald drops.",
  },
  {
    id: "jwl-5",
    code: "HIVS",
    title: "Spike Solitaire Diamond Crown Bangle",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-5.webp",
    gWt: "29.830 g",
    dWt: "8.300 ct",
    cSt: "None",
    nWt: "28.170 g",
    description:
      "A striking 14KT rose gold bangle featuring an outward-facing crown design, set with prominent, brilliant-cut solitaire diamonds on elevated prong settings.",
  },
  {
    id: "jwl-6",
    code: "DUGH",
    title: "Blue Sapphire & Diamond Halo Stud Earrings",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-6.webp",
    gWt: "5.230 g",
    dWt: "0.630 ct",
    cSt: "7.760 ct",
    nWt: "3.552 g",
    description:
      "A striking pair of 14KT rose gold stud earrings, each showcasing a deep, blue gemstone highlighted by a floating diamond halo frame.",
  },
  {
    id: "jwl-7",
    code: "HIVS",
    title: "Multi-Band Diamond Halo Statement Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-7.webp",
    gWt: "6.444 g",
    dWt: "1.540 ct",
    cSt: "None",
    nWt: "6.136 g",
    description:
      "A bold 14KT rose gold statement ring featuring multiple pavé-set diamond bands that converge into a prominent, glittering circular diamond halo cluster centerpiece.",
  },
  {
    id: "jwl-8",
    code: "DUGH",
    title: "Shield-Cut Sapphire & Marquise Diamond Crown Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-8.webp",
    gWt: "7.570 g",
    dWt: "0.880 ct / 88 pcs",
    cSt: "7.120 ct",
    nWt: "5.970 g",
    description:
      "A spectacular 14KT rose gold cocktail ring showcasing a prominent shield-cut deep blue sapphire, dramatized by a radiating tiara crown of brilliant round and marquise-cut diamonds.",
  },
  {
    id: "jwl-9",
    code: "DUGH",
    title: "Geometric Multi-Row Diamond Halo Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-9.webp",
    gWt: "5.390 g",
    dWt: "1.290 ct / 93 pcs",
    cSt: "None",
    nWt: "5.132 g",
    description:
      "A sophisticated 14KT rose gold band featuring multiple horizontal rows structured with square-clustered and pavé-set diamonds, centered by a brilliant circular diamond halo cluster centerpiece.",
  },
  {
    id: "jwl-10",
    code: "DUGH",
    title: "Custom Monogram Diamond Stud Earrings",
    type: "14KT Yellow Gold",
    imageSrc: "/customization/custom-10.webp",
    gWt: "3.480 g",
    dWt: "0.540 ct / 52 pcs",
    cSt: "None",
    nWt: "3.372 g",
    description:
      "A personalized pair of 14KT yellow gold stud earrings shaped into custom initials, beautifully embellished with shimmering pavé-set diamonds.",
  },
  {
    id: "jwl-11",
    code: "DUGH",
    title: "Multi-Layer Heart Diamond Halo Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-11.webp",
    gWt: "5.140 g",
    dWt: "1.730 ct / 132 pcs",
    cSt: "None",
    nWt: "4.794 g",
    description:
      "An exquisite 14KT rose gold ring featuring an ornate, wide-band design with layered concentric diamond halos shaped into romantic hearts.",
  },
  {
    id: "jwl-12",
    code: "DUFG",
    title: "Floral Marquise Diamond Cluster Stud Earrings",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-12.webp",
    gWt: "4.140 g",
    dWt: "1.020 ct",
    cSt: "None",
    nWt: "3.936 g",
    description:
      "A gorgeous pair of 14KT rose gold stud earrings featuring a detailed floral cluster design, ornately set with shimmering round and marquise-cut diamonds.",
  },
  {
    id: "jwl-13",
    code: "DUGH",
    title: "Men's Two-Tone Textured Diamond Band Ring",
    type: "14KT Yellow & White Gold",
    imageSrc: "/customization/custom-13.webp",
    gWt: "3.910 g",
    dWt: "0.730 ct / 25 pcs",
    cSt: "None",
    nWt: "3.764 g",
    description:
      "A bold men's statement ring crafted in 14KT yellow gold featuring openwork grooved shoulders, centered with a prominent rectangular pave-set white gold diamond grid cluster.",
  },
  {
    id: "jwl-14",
    code: "DUGH",
    title: "Double Heart Diamond Halo Stud Earrings",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-14.webp",
    gWt: "3.740 g",
    dWt: "0.850 ct / 130 pcs",
    cSt: "None",
    nWt: "3.568 g",
    description:
      "A romantic pair of 14KT rose gold stud earrings featuring a tiered double-heart silhouette, brilliantly pavé-set with shimmering diamond clusters.",
  },
  {
    id: "jwl-15",
    code: "DUGH",
    title: "Openwork Floral Diamond Halo Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-15.webp",
    gWt: "5.310 g",
    dWt: "0.990 ct",
    cSt: "None",
    nWt: "5.112 g",
    description:
      "An elegant 14KT rose gold ring showcasing an expansive, openwork split-shoulder silhouette decorated with scrolling pavé elements and a glittering circular diamond cluster centerpiece.",
  },
  {
    id: "jwl-16",
    code: "DUGH",
    title: "Eternity Diamond Cluster Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-16.webp",
    gWt: "13.680 g",
    dWt: "2.140 ct / 185 pcs",
    cSt: "None",
    nWt: "13.252 g",
    description:
      "A refined 14KT rose gold eternity-style ring uniformly lined with continuous, glittering floral-inspired round diamond clusters.",
  },
  {
    id: "jwl-17",
    code: "DUGH",
    title: "Geometric Square Diamond Cluster Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-17.webp",
    gWt: "4.00 g",
    dWt: "0.890 / 18",
    cSt: "None",
    nWt: "3.822 g",
    description:
      "A striking 14KT rose gold statement ring featuring a multi-layered shield silhouette centered by a prominent, glittering square diamond cluster centerpiece surrounded by pavé-set accents.",
  },
  {
    id: "jwl-18",
    code: "DUPG",
    title: "Angled Chevron Diamond Cluster Band Ring",
    type: "14KT Rose Gold",
    imageSrc: "/customization/custom-18.webp",
    gWt: "3.930 g",
    dWt: "0.750 / 24",
    cSt: "None",
    nWt: "3.780 g",
    description:
      "A sophisticated 14KT rose gold band featuring a modern, slightly angled chevron-inspired face pavé-set with a brilliant cluster of 24 diamonds that catch the light from every angle.",
  },
  {
    id: "jwl-19",
    code: "DUGH",
    title: "Pear Emerald and Diamond Halo Drop Earrings",
    type: "14KT Yellow Gold",
    imageSrc: "/customization/custom-3.webp",
    gWt: "4.570 g",
    dWt: "0.530 / 58",
    cSt: "1.800",
    nWt: "4.104 g",
    description:
      "Elegant 14KT yellow gold drop earrings featuring vibrant pear-shaped emerald centers enclosed in a sparkling diamond halo, suspended from a diamond-accented leverback closure.",
  },
];

// Seeded static layout adjustments to prevent hydration visual shifting bugs
const ROTATIONS = [
  "-rotate-6",
  "-rotate-3",
  "rotate-2",
  "rotate-6",
  "rotate-3",
  "-rotate-2",
  "rotate-4",
  "-rotate-4",
];
const SHIFT_Y = [
  "-translate-y-2",
  "translate-y-1",
  "translate-y-0",
  "-translate-y-1",
  "translate-y-2",
];
const SPAN_VARIANTS = [
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 md:col-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export default function CustomGallery() {
  const [selectedItem, setSelectedItem] = useState<JewelryItem | null>(null);

  const triggerWhatsApp = (item: JewelryItem) => {
    const phoneNumber = "919999999999"; // Replace with your company's actual WhatsApp business number
    const baseMessage = `Hello! I am highly interested in your custom showcase collection. Let's discuss this specific design asset:
    
• Design Code: ${item.code}
• Style Type: ${item.type}
• Gross Wt: ${item.gWt}
• Diamond Wt: ${item.dWt}

Do you have slots open to recreate this exact same design for me?`;

    const encodedText = encodeURIComponent(baseMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
  };

  return (
    <section className="relative bg-amber-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Ambient Diamond Lattice Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fcc151_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Luxury Brand Header Section */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <span className="text-[#fcc151] font-serif tracking-[0.3em] text-xs uppercase block mb-3">
          Rehnoor Atelier Archive
        </span>
        <h2 className="font-cormorant font-light text-neutral-900 leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl mb-4">
          Customization Showcase
        </h2>
        <p className="text-sm md:text-base font-light text-neutral-500 leading-relaxed">
          Explore a visual universe of rare micro-photography capturing our
          finest custom gold-plated and natural conflict-free diamond articles.
        </p>
      </div>

      {/* ─── SCATTERED MICRO-PREVIEW COLLAGE MESH GRID (19 UNIQUE OBJECTS) ─── */}
      <div className="relative max-w-8xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 auto-rows-[140px] sm:auto-rows-[180px]">
        {GALLERY_ITEMS.map((item, i) => {
          const rotation = ROTATIONS[i % ROTATIONS.length];
          const shiftY = SHIFT_Y[i % SHIFT_Y.length];
          const span = SPAN_VARIANTS[i % SPAN_VARIANTS.length];

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`${span} ${rotation} ${shiftY} group relative bg-[#002615] rounded-lg overflow-hidden border border-white/5 shadow-xl cursor-pointer transform hover:scale-110 hover:rotate-0 hover:-translate-y-4 hover:z-30 hover:border-[#fcc151]/40 transition-all duration-500 ease-out`}
            >
              {/* Media Container Box Frame */}
              <div className="w-full h-full relative bg-[#001c0f]">
                {/* Visual Overlay Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00140a] via-transparent to-transparent opacity-60 z-10 group-hover:opacity-20 transition-opacity duration-300" />

                {/* Fallback code text display overlay if local images are resolving asynchronously */}
                <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/20 font-mono select-none">
                  {item.code}
                </div>

                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 select-none pointer-events-none"
                  onError={(e) => {
                    // Graceful failover layout handler if image file doesn't exist yet locally
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>

              {/* Minimalist Grid Badge Hover Trigger */}
              <div className="absolute bottom-2 left-2 right-2 z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
                <p className="text-[9px] font-mono text-[#fcc151] bg-[#00140a]/90 py-1 px-2 rounded backdrop-blur-sm truncate border border-[#fcc151]/10 text-center">
                  Check Details!
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── PREMIUM DETAILS POPUP MODAL ────────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md bg-black/80 transition-all duration-500 animate-fadeIn">
          {/* Main Card Modal Frame */}
          <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#002615] to-[#00170c] rounded-2xl border border-[#fcc151]/20 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[unset] overflow-y-auto md:overflow-hidden transform scale-100 transition-transform duration-500">
            {/* Close Floating Handle */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-40 bg-[#00140a]/80 text-white/70 hover:text-[#fcc151] p-2 rounded-full border border-white/10 hover:border-[#fcc151]/30 transition-all duration-200 backdrop-blur-sm cursor-pointer"
              aria-label="Close dialog modal"
            >
              <X size={18} />
            </button>

            {/* Left Box: High-res Preview Asset Display Frame */}
            <div className="md:col-span-6 relative h-[300px] md:h-[520px] bg-[#00140a] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
              <div className="absolute font-mono text-xs text-white/10 tracking-widest uppercase">
                {selectedItem.code}
              </div>
              <img
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                className="w-full h-full object-cover relative z-10"
              />
              <span className="absolute bottom-4 left-4 z-20 text-[10px] font-mono bg-[#fcc151] text-[#002615] px-2.5 py-1 rounded-full font-bold tracking-wider uppercase shadow-md">
                {selectedItem.type}
              </span>
            </div>

            {/* Right Box: Technical Metadata & Interactivity Form */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-transparent to-black/30">
              <div>
                {/* Meta Identifiers */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#fcc151] tracking-widest uppercase bg-[#fcc151]/5 border border-[#fcc151]/10 px-2 py-0.5 rounded">
                    Code: {selectedItem.code}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-white tracking-wide mb-3">
                  {selectedItem.title}
                </h3>

                <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {/* ── TECHNICAL MATRIX SPECIFICATION TABLE ── */}
                <div className="border border-white/5 rounded-xl bg-black/20 p-4 mb-8">
                  <h4 className="text-[10px] font-mono text-white/40 tracking-wider uppercase mb-3 border-b border-white/5 pb-1.5">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-tight">
                        G. Wt. (Gross Weight)
                      </span>
                      <span className="text-sm font-sans font-medium text-white/90">
                        {selectedItem.gWt}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-tight">
                        D. Wt. (Diamond Carat)
                      </span>
                      <span className="text-sm font-sans font-medium text-white/90">
                        {selectedItem.dWt}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-tight">
                        C. St. (Colored Stones)
                      </span>
                      <span className="text-sm font-sans font-medium text-white/90 truncate block">
                        {selectedItem.cSt}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-tight">
                        N. Wt. (Net / Base Weight)
                      </span>
                      <span className="text-sm font-sans font-medium text-white/90">
                        {selectedItem.nWt}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── PREMIUM CONNECT WHATSAPP CTA LINK ── */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-center md:text-left text-[11px] text-gray-400 font-sans mb-3.5 italic">
                  Do you also want the same bespoke design configuration?
                </p>
                <button
                  onClick={() => triggerWhatsApp(selectedItem)}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#fcc151] text-[#001a0d] hover:bg-white hover:text-black font-sans font-semibold text-xs tracking-wider uppercase py-3.5 px-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <MessageCircle size={15} strokeWidth={2.5} />
                  Connect With Us On WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
