"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Award, RefreshCw, Package, Ruler, Info } from "lucide-react";

const TABS = [
  { id: "specs", label: "Specifications", icon: <Ruler size={13} /> },
  { id: "care", label: "Care Guide", icon: <Shield size={13} /> },
  { id: "shipping", label: "Shipping", icon: <Package size={13} /> },
  { id: "returns", label: "Returns", icon: <RefreshCw size={13} /> },
];

// ─── Content ─────────────────────────────────────────────────────
function Specifications() {
  const specs = [
    { label: "Metal", value: "22kt Yellow Gold" },
    { label: "Purity", value: "916 (91.6% Pure Gold)" },
    { label: "BIS Hallmark", value: "Yes — Certificate Included" },
    { label: "Finish", value: "Mirror Polish" },
    { label: "Clasp Type", value: "Lobster Claw (Secure)" },
    { label: "Availability", value: '16", 18", 20", 22"' },
    { label: "Approx. Weight", value: "8–12 grams (size-dependent)" },
    { label: "Country of Origin", value: "Jaipur, India" },
    { label: "Warranty", value: "Lifetime craftsmanship" },
  ];
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: "1px solid var(--rj-bone)" }}
    >
      {specs.map((s, i) => (
        <div
          key={s.label}
          className="flex items-start py-3 px-4"
          style={{
            background: i % 2 === 0 ? "#fff" : "var(--rj-ivory-dark)",
            borderBottom:
              i < specs.length - 1 ? "1px solid var(--rj-bone)" : "none",
          }}
        >
          <span
            className="font-cinzel text-[10px] tracking-widest uppercase w-40 flex-shrink-0 pt-0.5"
            style={{ color: "var(--rj-ash)" }}
          >
            {s.label}
          </span>
          <span
            className="text-sm"
            style={{
              color: "var(--rj-charcoal)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function CareGuide() {
  const tips = [
    {
      icon: "✦",
      title: "Daily Cleaning",
      desc: "Wipe with a soft, lint-free cloth after each use to remove oils and fingerprints. This maintains the mirror finish.",
    },
    {
      icon: "◈",
      title: "Deep Cleaning",
      desc: "Soak in warm (not hot) water with a drop of mild dish soap for 5–10 minutes. Gently brush with a soft toothbrush, rinse, and pat dry.",
    },
    {
      icon: "⚜",
      title: "Storage",
      desc: "Store separately in the velvet pouch provided. Avoid contact with other jewellery to prevent scratching.",
    },
    {
      icon: "♾",
      title: "Avoid Chemicals",
      desc: "Remove before swimming, bathing, applying perfume, or using cleaning products. Chlorine and harsh chemicals can damage the gold surface.",
    },
    {
      icon: "◉",
      title: "Professional Care",
      desc: "Bring it to us every 12–18 months for professional polishing and inspection. Free for life for all Rehnoor purchases.",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tips.map((t) => (
        <div
          key={t.title}
          className="flex gap-3 p-4 rounded-xl"
          style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
        >
          <span
            className="text-lg flex-shrink-0 mt-0.5"
            style={{ color: "var(--rj-gold)" }}
          >
            {t.icon}
          </span>
          <div>
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {t.title}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              {t.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Shipping() {
  const options = [
    {
      name: "Standard Delivery",
      time: "5–7 business days",
      price: "Free",
      note: "On all orders above ₹2,000",
    },
    {
      name: "Express Delivery",
      time: "2–3 business days",
      price: "₹149",
      note: "Available for most pin codes",
    },
    {
      name: "Same-Day Delivery",
      time: "Within 6–8 hours",
      price: "₹299",
      note: "Select metros only · Order before 12pm",
    },
    {
      name: "International",
      time: "10–15 business days",
      price: "₹999+",
      note: "Customs duties may apply",
    },
  ];
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <div
          key={o.name}
          className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
        >
          <div>
            <p
              className="font-cinzel text-xs font-bold mb-0.5"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {o.name}
            </p>
            <p
              className="text-[10px]"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              {o.time} · {o.note}
            </p>
          </div>
          <span
            className="font-cinzel text-sm font-bold flex-shrink-0 ml-4"
            style={{
              color:
                o.price === "Free" ? "var(--rj-emerald)" : "var(--rj-charcoal)",
            }}
          >
            {o.price}
          </span>
        </div>
      ))}
      <div
        className="p-4 rounded-xl mt-4"
        style={{
          background: "rgba(0,55,32,0.05)",
          border: "1px solid rgba(0,55,32,0.1)",
        }}
      >
        <div className="flex gap-2">
          <Info
            size={14}
            style={{ color: "var(--rj-emerald)", flexShrink: 0, marginTop: 2 }}
          />
          <p
            className="text-sm"
            style={{
              color: "var(--rj-charcoal)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            All shipments are <strong>fully insured</strong> and arrive in our
            signature velvet-lined gift box with a tamper-evident seal and BIS
            hallmark certificate.
          </p>
        </div>
      </div>
    </div>
  );
}

function Returns() {
  const steps = [
    {
      num: "01",
      title: "Initiate Return",
      desc: "Contact us within 07 days of delivery via WhatsApp or email.",
    },
    {
      num: "02",
      title: "Pack Securely",
      desc: "Place the item in the original packaging or any secure box.",
    },
    {
      num: "03",
      title: "Free Pickup",
      desc: "We arrange a free doorstep pickup within 24–48 hours.",
    },
    {
      num: "04",
      title: "Refund Processed",
      desc: "Full refund to original payment method within 5–7 business days.",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="p-4 rounded-xl"
            style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
          >
            <p
              className="font-cormorant font-light mb-1"
              style={{
                fontSize: "2rem",
                color: "var(--rj-gold)",
                lineHeight: 1,
              }}
            >
              {s.num}
            </p>
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {s.title}
            </p>
            <p
              className="text-sm"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
      <div
        className="p-4 rounded-xl"
        style={{
          background: "rgba(0,55,32,0.05)",
          border: "1px solid rgba(0,55,32,0.1)",
        }}
      >
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2"
          style={{ color: "var(--rj-emerald)" }}
        >
          ⚜ Our Promise
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "var(--rj-charcoal)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          We stand behind every piece we sell. If you're not 100% satisfied
          within 07 days — for any reason — we'll make it right. No forms, no
          hassle, no questions asked.
        </p>
      </div>
    </div>
  );
}

const TAB_CONTENT: Record<string, React.ReactNode> = {
  specs: <Specifications />,
  care: <CareGuide />,
  shipping: <Shipping />,
  returns: <Returns />,
};

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("specs");

  return (
    <section
      className="section-padding"
      style={{ background: "var(--rj-ivory-dark)" }}
    >
      <div className="container-rj">
        <p className="label-accent mb-3" style={{ color: "var(--rj-emerald)" }}>
          ✦ Product Details
        </p>
        <h2
          className="heading-md mb-8 leading-tight"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Everything you need to know
        </h2>

        {/* Tab bar */}
        <div
          className="flex gap-1 mb-8 overflow-x-auto no-scrollbar p-1 rounded-xl"
          style={{ background: "var(--rj-bone)" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all duration-200 flex-shrink-0 whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? "#fff" : "transparent",
                color:
                  activeTab === tab.id ? "var(--rj-emerald)" : "var(--rj-ash)",
                boxShadow:
                  activeTab === tab.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color:
                    activeTab === tab.id
                      ? "var(--rj-emerald)"
                      : "var(--rj-ash)",
                }}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {TAB_CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
