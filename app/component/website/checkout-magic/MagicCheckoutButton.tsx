"use client";

import { useState } from "react";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { useMagicCheckout } from "@/app/lib/hooks/useMagicCheckout";

export default function MagicCheckoutButton() {
  const { stage, error, initiate, reset } = useMagicCheckout();
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const isBusy =
    stage === "creating_order" ||
    stage === "awaiting_payment" ||
    stage === "verifying";

  const canSubmit =
    contact.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    contact.phone.trim().length >= 10;

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      {stage === "error" && error && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl mb-6"
          style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
        >
          <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }} />
          <div className="flex-1">
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
              style={{ color: "#c0392b" }}
            >
              Checkout issue
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#7f1d1d" }}>
              {error}
            </p>
          </div>
          <button
            onClick={reset}
            style={{ color: "#fca5a5", background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-emerald)" }}
        >
          Your details
        </p>
        <input
          type="text"
          placeholder="Full name"
          value={contact.name}
          onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
          disabled={isBusy}
          className="w-full px-4 py-3 rounded-xl text-sm"
          style={{ border: "1px solid var(--rj-bone)" }}
        />
        <input
          type="email"
          placeholder="Email address"
          value={contact.email}
          onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
          disabled={isBusy}
          className="w-full px-4 py-3 rounded-xl text-sm"
          style={{ border: "1px solid var(--rj-bone)" }}
        />
        <input
          type="tel"
          placeholder="Phone number (for order updates)"
          value={contact.phone}
          onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
          disabled={isBusy}
          className="w-full px-4 py-3 rounded-xl text-sm"
          style={{ border: "1px solid var(--rj-bone)" }}
        />
      </div>

      <button
        onClick={() => initiate(contact)}
        disabled={!canSubmit || isBusy}
        className="w-full py-4 rounded-xl font-cinzel text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2"
        style={{
          background: "var(--rj-emerald)",
          color: "var(--rj-gold)",
          opacity: !canSubmit || isBusy ? 0.6 : 1,
          cursor: !canSubmit || isBusy ? "not-allowed" : "pointer",
        }}
      >
        {isBusy ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {stage === "creating_order" && "Preparing checkout…"}
            {stage === "awaiting_payment" && "Payment window open…"}
            {stage === "verifying" && "Verifying payment…"}
          </>
        ) : (
          "Pay with Magic Checkout"
        )}
      </button>

      <p
        className="flex items-center justify-center gap-1.5 mt-4 text-[10px]"
        style={{ color: "rgba(0,0,0,0.4)" }}
      >
        <ShieldCheck size={12} /> Secured by Razorpay
      </p>
    </div>
  );
}
