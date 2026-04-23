"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  // ADD THESE STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // UPDATE HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSubmitted(true);
      setEmail(""); // reset input
    } catch (err: any) {
      setError(err.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--rj-charcoal)" }}
    >
      {/* Background decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[600, 800, 1000].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.03]"
            style={{ width: size, height: size }}
          />
        ))}
        <div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(252,193,81,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-rj relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "backOut",
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{
              background: "rgba(252,193,81,0.1)",
              border: "1px solid rgba(252,193,81,0.2)",
            }}
          >
            <Sparkles size={28} style={{ color: "var(--rj-gold)" }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="label-accent mb-4"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ Join the Rehnoor's inner Circle
            </p>
            <h2 className="heading-lg text-white leading-tight mb-4">
              Be the first to see
              <em className="text-gold-shimmer font-normal pe-2">
                {" "}
                what’s new
              </em>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
              Get early access to our latest designs, special offers, and simple
              tips to keep your jewellery looking its best.
            </p>
          </motion.div>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <div className="relative flex-1">
                  <Mail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{
                      color: focused ? "var(--rj-gold)" : "var(--rj-ash)",
                      transition: "color 0.3s",
                    }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3.5 font-cinzel text-sm outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${focused ? "rgba(252,193,81,0.5)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "0",
                      color: "white",
                      boxShadow: focused
                        ? "0 0 0 3px rgba(252,193,81,0.08)"
                        : "none",
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-shrink-0"
                  style={{
                    display: "inline-flex",
                    background: "var(--gradient-gold)",
                    color: "var(--rj-emerald)",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  // FIX: same issue — use "backOut" not "back.out(1.7)"
                  ease: "backOut",
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full"
                style={{
                  background: "rgba(252,193,81,0.1)",
                  border: "1px solid rgba(252,193,81,0.3)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Check size={12} style={{ color: "var(--rj-emerald)" }} />
                </div>
                <p
                  className="font-cinzel text-sm tracking-wider"
                  style={{ color: "var(--rj-gold)" }}
                >
                  You're in the inner circle ✦
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
          )}

          {/* Fine print */}
          <p
            className="text-xs mt-6"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            No spam. Unsubscribe anytime. We respect your inbox like we respect
            our gold - with care.
          </p>

          {/* Perks */}
          <div
            className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {[
              "Early Access",
              "Exclusive Drops",
              "Member Discounts",
              "Gold Care Tips",
            ].map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: "var(--rj-gold)" }}
                />
                <span className="font-cinzel text-[10px] tracking-wider text-white/40 uppercase">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
