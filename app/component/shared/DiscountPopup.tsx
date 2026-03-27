"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, Tag, Clock, Zap, Gift } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// OFFER CONFIG — swap from server/CMS
// ─────────────────────────────────────────────────────────────────
export type OfferConfig = {
  type: "welcome" | "exit_intent" | "flash" | "loyalty";
  code: string;
  discount: string; // e.g. "₹500 OFF" or "15% OFF"
  headline: string;
  sub: string;
  expiry?: Date; // undefined = no countdown
  image?: string;
  minOrder?: string;
  trigger: "delay" | "exit" | "scroll" | "manual";
  delayMs?: number;
  scrollPct?: number;
};

const OFFERS: Record<string, OfferConfig> = {
  welcome: {
    type: "welcome",
    code: "FIRST15",
    discount: "₹750 OFF",
    headline: "Welcome to Rehnoor",
    sub: "Get ₹750 off your first order of ₹3,000+",
    minOrder: "₹3,000",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
    trigger: "delay",
    delayMs: 6000,
  },
  exit_intent: {
    type: "exit_intent",
    code: "GOLD10",
    discount: "₹500 OFF",
    headline: "Wait — don't leave empty-handed",
    sub: "Use GOLD10 for ₹500 off your cart right now.",
    trigger: "exit",
  },
  flash: {
    type: "flash",
    code: "FLASH20",
    discount: "20% OFF",
    headline: "Flash Sale — 2 hours only",
    sub: "20% off all Chains and Kadas. Ends in:",
    expiry: new Date(Date.now() + 2 * 60 * 60 * 1000),
    trigger: "delay",
    delayMs: 2000,
  },
  loyalty: {
    type: "loyalty",
    code: "GOLD50",
    discount: "₹1,000 OFF",
    headline: "You're a Rehnoor Gold Member",
    sub: "As a returning customer, enjoy ₹1,000 off your next order.",
    trigger: "scroll",
    scrollPct: 50,
  },
};

// ─────────────────────────────────────────────────────────────────
// COUNTDOWN
// ─────────────────────────────────────────────────────────────────
function Countdown({ expiry }: { expiry: Date }) {
  const [remaining, setRemaining] = useState(
    Math.max(0, expiry.getTime() - Date.now()),
  );
  useEffect(() => {
    const id = setInterval(
      () => setRemaining((r) => Math.max(0, r - 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-2 justify-center mt-2">
      {[
        { v: h, l: "hr" },
        { v: m, l: "min" },
        { v: s, l: "sec" },
      ].map((u, i) => (
        <div key={u.l} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center font-cormorant font-light"
              style={{
                background: "rgba(0,55,32,0.08)",
                fontSize: "1.5rem",
                color: "var(--rj-emerald)",
                lineHeight: 1,
              }}
            >
              {pad(u.v)}
            </div>
            <span
              className="font-cinzel text-[8px] tracking-wider mt-0.5"
              style={{ color: "var(--rj-ash)" }}
            >
              {u.l}
            </span>
          </div>
          {i < 2 && (
            <span
              className="font-cormorant text-xl font-light"
              style={{ color: "var(--rj-bone)", marginBottom: 12 }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// POPUP INNER
// ─────────────────────────────────────────────────────────────────
function PopupInner({
  offer,
  onClose,
}: {
  offer: OfferConfig;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    if (!email.trim()) return;
    setClaimed(true);
  };

  const typeIcon = {
    welcome: <Gift size={16} />,
    exit_intent: <Zap size={16} />,
    flash: <Clock size={16} />,
    loyalty: <Tag size={16} />,
  }[offer.type];
  const typeBg = {
    welcome: "rgba(252,193,81,0.1)",
    exit_intent: "rgba(239,68,68,0.1)",
    flash: "rgba(239,68,68,0.1)",
    loyalty: "rgba(0,55,32,0.08)",
  }[offer.type];
  const typeColor = {
    welcome: "var(--rj-gold)",
    exit_intent: "#ef4444",
    flash: "#ef4444",
    loyalty: "var(--rj-emerald)",
  }[offer.type];

  return (
    <div className="relative w-full" style={{ maxWidth: 420 }}>
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:rotate-90"
        style={{ background: "rgba(0,0,0,0.08)", cursor: "pointer" }}
      >
        <X size={13} style={{ color: "var(--rj-charcoal)" }} />
      </button>

      {/* Product image strip */}
      {offer.image && (
        <div
          className="relative w-full overflow-hidden"
          style={{ height: 160 }}
        >
          <img
            src={offer.image}
            alt="Offer"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,36,16,0.1), rgba(0,36,16,0.6))",
            }}
          />
          {/* Discount badge */}
          <div className="absolute bottom-3 left-3">
            <div
              className="px-3 py-1.5 rounded-full font-cinzel text-sm font-bold"
              style={{
                background: "var(--gradient-gold)",
                color: "var(--rj-emerald)",
              }}
            >
              {offer.discount}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Type pill */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold"
            style={{ background: typeBg, color: typeColor }}
          >
            {typeIcon}
            <span>
              {offer.type === "exit_intent"
                ? "Exclusive offer"
                : offer.type.replace("_", " ")}
            </span>
          </div>
        </div>

        {!claimed ? (
          <>
            <h2
              className="font-cormorant font-light leading-tight mb-1.5"
              style={{
                fontSize: "clamp(1.2rem,4vw,1.6rem)",
                color: "var(--rj-charcoal)",
              }}
            >
              {offer.headline}
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              {offer.sub}
            </p>

            {/* Countdown */}
            {offer.expiry && <Countdown expiry={offer.expiry} />}

            {/* Code box */}
            {!offer.image && (
              <div
                className="flex items-center gap-2 mb-5 mt-4"
                style={{
                  background: "var(--rj-ivory-dark)",
                  borderRadius: 10,
                  padding: "10px 14px",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--rj-emerald)" }}
                />
                <span
                  className="font-cinzel text-sm font-bold tracking-widest flex-1"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {offer.code}
                </span>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-60"
                  style={{
                    color: copied ? "var(--rj-emerald)" : "var(--rj-ash)",
                    cursor: "pointer",
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={10} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={10} /> Copy
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Email claim (welcome / loyalty) */}
            {(offer.type === "welcome" || offer.type === "loyalty") && (
              <div className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3.5 py-2.5 font-cinzel text-xs tracking-wider outline-none rounded-lg"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--rj-bone)",
                    color: "var(--rj-charcoal)",
                  }}
                />
                <button
                  onClick={handleClaim}
                  className="px-4 py-2.5 rounded-lg font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "var(--rj-emerald)",
                    cursor: "pointer",
                  }}
                >
                  Claim
                </button>
              </div>
            )}

            {/* Direct CTA for exit / flash */}
            {(offer.type === "exit_intent" || offer.type === "flash") && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    copyCode();
                    onClose();
                  }}
                  className="w-full py-3 rounded-full font-cinzel text-[11px] tracking-widest uppercase font-bold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "var(--rj-emerald)",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(252,193,81,0.3)",
                  }}
                >
                  <Copy size={12} /> Copy Code &amp; Shop
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-50"
                  style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            )}

            {offer.minOrder && (
              <p
                className="font-cinzel text-[8px] tracking-wider text-center mt-3"
                style={{ color: "var(--rj-ash)" }}
              >
                Minimum order: {offer.minOrder} · One use per customer
              </p>
            )}
          </>
        ) : (
          // ── Success state ──
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Check size={24} style={{ color: "var(--rj-emerald)" }} />
            </motion.div>
            <h3
              className="font-cormorant text-xl font-light mb-1"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Code sent to your email!
            </h3>
            <p
              className="font-cinzel text-[10px] tracking-widest mb-1"
              style={{ color: "var(--rj-ash)" }}
            >
              Use{" "}
              <strong style={{ color: "var(--rj-emerald)" }}>
                {offer.code}
              </strong>{" "}
              at checkout
            </p>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full mt-3 mb-5"
              style={{ background: "rgba(0,55,32,0.06)" }}
            >
              <span
                className="font-cinzel text-sm font-bold tracking-widest"
                style={{ color: "var(--rj-emerald)" }}
              >
                {offer.code}
              </span>
              <button onClick={copyCode} style={{ cursor: "pointer" }}>
                {copied ? (
                  <Check size={12} style={{ color: "var(--rj-emerald)" }} />
                ) : (
                  <Copy size={12} style={{ color: "var(--rj-ash)" }} />
                )}
              </button>
            </div>
            <button
              onClick={onClose}
              className="font-cinzel text-[10px] tracking-widest uppercase px-6 py-2.5 rounded-full transition-all hover:opacity-90"
              style={{
                background: "var(--rj-emerald)",
                color: "var(--rj-gold)",
                cursor: "pointer",
              }}
            >
              Start Shopping
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DISCOUNT POPUP WRAPPER — handles all trigger logic
// ─────────────────────────────────────────────────────────────────
export default function DiscountPopup({
  offerKey = "welcome",
}: {
  offerKey?: keyof typeof OFFERS;
}) {
  const offer = OFFERS[offerKey];
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || shownRef.current) return;
    // Check sessionStorage so it only shows once per session
    const key = `rj_offer_${offerKey}_shown`;
    if (sessionStorage.getItem(key)) return;

    if (offer.trigger === "delay") {
      const id = setTimeout(() => {
        setVisible(true);
        shownRef.current = true;
        sessionStorage.setItem(key, "1");
      }, offer.delayMs ?? 4000);
      return () => clearTimeout(id);
    }

    if (offer.trigger === "exit") {
      const handler = (e: MouseEvent) => {
        if (e.clientY <= 0 && !shownRef.current) {
          setVisible(true);
          shownRef.current = true;
          sessionStorage.setItem(key, "1");
        }
      };
      document.addEventListener("mouseleave", handler);
      return () => document.removeEventListener("mouseleave", handler);
    }

    if (offer.trigger === "scroll") {
      const handler = () => {
        const pct =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        if (pct >= (offer.scrollPct ?? 50) && !shownRef.current) {
          setVisible(true);
          shownRef.current = true;
          sessionStorage.setItem(key, "1");
        }
      };
      window.addEventListener("scroll", handler, { passive: true });
      return () => window.removeEventListener("scroll", handler);
    }
  }, [mounted, offer, offerKey]);

  const close = () => setVisible(false);

  if (!mounted) return null;

  const modal = (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end sm:items-center justify-center"
          style={{
            zIndex: 9998,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            cursor: "pointer",
          }}
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md overflow-hidden"
            style={{
              background: "#fff",
              borderRadius: "20px 20px 0 0",
              maxHeight: "92vh",
              overflowY: "auto",
              cursor: "default",
            }}
            data-popup="inner"
          >
            <style>{`@media(min-width:640px){[data-popup="inner"]{border-radius:20px!important;margin:1rem;}}`}</style>
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: "var(--rj-bone)" }}
              />
            </div>
            <PopupInner offer={offer} onClose={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

// ─────────────────────────────────────────────────────────────────
// FLOATING OFFER BADGE  (mini persistent entry point)
// Shows after popup is dismissed — always visible in corner
// ─────────────────────────────────────────────────────────────────
export function FloatingOfferBadge({
  offerKey = "welcome",
}: {
  offerKey?: keyof typeof OFFERS;
}) {
  const offer = OFFERS[offerKey];
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const badge = (
    <>
      {/* Mini badge */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, delay: 8 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[9997] flex items-center gap-2 px-4 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold shadow-xl"
            style={{
              background: "var(--gradient-gold)",
              color: "var(--rj-emerald)",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(252,193,81,0.35)",
            }}
          >
            <Tag size={12} />
            {offer.discount}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Inline popup when badge clicked */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-end sm:items-center justify-center"
            style={{
              zIndex: 9998,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-md overflow-hidden"
              style={{
                background: "#fff",
                borderRadius: "20px 20px 0 0",
                maxHeight: "90vh",
                overflowY: "auto",
                cursor: "default",
              }}
              data-popup="badge-inner"
            >
              <style>{`@media(min-width:640px){[data-popup="badge-inner"]{border-radius:20px!important;margin:1rem;}}`}</style>
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div
                  className="w-10 h-1 rounded-full"
                  style={{ background: "var(--rj-bone)" }}
                />
              </div>
              <PopupInner offer={offer} onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return createPortal(badge, document.body);
}

// ─────────────────────────────────────────────────────────────────
// USAGE GUIDE (exported for reference — don't render this)
// ─────────────────────────────────────────────────────────────────
// In layout.tsx or any page:
//
//   import DiscountPopup, { FloatingOfferBadge } from "./DiscountPopup";
//
//   // Welcome popup — fires 6 s after page load, once per session
//   <DiscountPopup offerKey="welcome" />
//
//   // Exit intent popup — fires when cursor leaves the browser window
//   <DiscountPopup offerKey="exit_intent" />
//
//   // Flash sale popup — fires 2 s after load with live countdown
//   <DiscountPopup offerKey="flash" />
//
//   // Floating badge (always visible after 8 s) — reopens popup on click
//   <FloatingOfferBadge offerKey="welcome" />
