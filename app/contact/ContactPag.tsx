"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  ChevronDown,
  Check,
  Send,
  ArrowRight,
  Star,
  Package,
  RefreshCw,
  Shield,
  Ruler,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: <Phone size={18} />,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 10 AM – 7 PM IST",
    action: "tel:+919876543210",
    color: "var(--rj-emerald)",
  },
  {
    icon: <Mail size={18} />,
    label: "Email Us",
    value: "hello@rehnoorjewels.com",
    sub: "Reply within 24 hours",
    action: "mailto:hello@rehnoorjewels.com",
    color: "var(--rj-emerald)",
  },
  {
    icon: <MessageCircle size={18} />,
    label: "WhatsApp",
    value: "+91 98765 43210",
    sub: "Instant reply, 9 AM – 9 PM",
    action: "https://wa.me/919876543210",
    color: "#25D366",
  },
  {
    icon: <Instagram size={18} />,
    label: "Instagram DM",
    value: "@rehnoorjewels",
    sub: "Tag us in your gold looks",
    action: "https://instagram.com/rehnoorjewels",
    color: "#E1306C",
  },
];

const STORE_HOURS = [
  { day: "Monday – Friday", time: "10:00 AM – 7:30 PM" },
  { day: "Saturday", time: "10:00 AM – 8:00 PM" },
  { day: "Sunday", time: "11:00 AM – 6:00 PM" },
  { day: "Public Holidays", time: "Closed" },
];

const SUBJECT_OPTIONS = [
  "Order enquiry",
  "Product customisation",
  "Sizing help",
  "BIS hallmark certificate",
  "Return / exchange",
  "Wholesale enquiry",
  "Other",
];

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5–7 business days across India. Express (2–3 days) and same-day delivery (select metros, order before 12 PM) are also available. All orders are fully insured and arrive in our signature gift box.",
    icon: <Package size={14} />,
  },
  {
    q: "Is your gold BIS hallmarked?",
    a: "Yes, every piece we sell is BIS hallmarked as per Bureau of Indian Standards norms. Your order includes a physical hallmark certificate. You can verify the hallmark number on the BIS official website.",
    icon: <Shield size={14} />,
  },
  {
    q: "Can I return or exchange my order?",
    a: "Absolutely. We offer a 30-day no-questions-asked return and free exchange policy. Simply contact us within 30 days of delivery, and we will arrange a free doorstep pickup. Refunds process within 5–7 business days.",
    icon: <RefreshCw size={14} />,
  },
  {
    q: "How does free sizing work?",
    a: "Every jewellery purchase comes with one complimentary resizing. For chains and bracelets, we offer up to 2 inch length adjustments. For rings and kadas, we adjust up or down 2 sizes. Just contact us after your order arrives.",
    icon: <Ruler size={14} />,
  },
  {
    q: "Do you offer custom / personalised pieces?",
    a: "Yes — we offer engraving, custom weight, and fully bespoke designs. Personalised pieces take 7–14 business days. Contact us via WhatsApp or email with your requirements and we will send you a quote within 24 hours.",
    icon: <Star size={14} />,
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major UPI apps (GPay, PhonePe, Paytm), net banking, all credit and debit cards, and EMI on select cards (0% EMI available). Cash on delivery is available for orders up to ₹5,000.",
    icon: <Shield size={14} />,
  },
];

const HELP_TOPICS = [
  {
    label: "Track my order",
    href: "/account/orders",
    icon: <Package size={13} />,
  },
  {
    label: "Start a return",
    href: "/account/returns",
    icon: <RefreshCw size={13} />,
  },
  { label: "Size guide", href: "/size-guide", icon: <Ruler size={13} /> },
  { label: "BIS hallmark info", href: "/hallmark", icon: <Shield size={13} /> },
];

// ─────────────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────
function FaqItem({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${open ? "rgba(0,55,32,0.2)" : "var(--rj-bone)"}`,
        transition: "border-color 0.25s",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 p-5 text-left"
        style={{
          background: open ? "rgba(0,55,32,0.04)" : "#fff",
          cursor: "pointer",
          transition: "background 0.25s",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(0,55,32,0.07)",
              color: "var(--rj-emerald)",
            }}
          >
            {faq.icon}
          </div>
          <span
            className="font-cinzel text-xs tracking-wider font-bold"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {faq.q}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={16} style={{ color: "var(--rj-ash)" }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                borderTop: "1px solid var(--rj-bone)",
                paddingTop: "1rem",
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputBase: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--rj-bone)",
    borderRadius: "10px",
    color: "var(--rj-charcoal)",
    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate API call
    setLoading(false);
    setSubmitted(true);
  };

  const set =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key])
        setErrors((err) => {
          const n = { ...err };
          delete n[key];
          return n;
        });
    };

  const focusStyle = (key: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: errors[key] ? "#fca5a5" : "var(--rj-bone)",
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 20,
            delay: 0.15,
          }}
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "var(--gradient-gold)" }}
        >
          <Check size={28} style={{ color: "var(--rj-emerald)" }} />
        </motion.div>
        <h3
          className="font-cormorant text-2xl font-light mb-2"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Message received!
        </h3>
        <p
          className="font-cinzel text-xs tracking-widest uppercase mb-2"
          style={{ color: "var(--rj-ash)" }}
        >
          We'll reply to {form.email} within 24 hours
        </p>
        <p
          className="text-sm"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          For urgent help, WhatsApp us at +91 98765 43210
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            });
          }}
          className="mt-8 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5 block"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Full Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Arjun Mehta"
            value={form.name}
            onChange={set("name")}
            style={focusStyle("name")}
            onFocus={(e) => (
              (e.target.style.borderColor = "var(--rj-emerald)"),
              (e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)")
            )}
            onBlur={(e) => (
              (e.target.style.borderColor = errors.name
                ? "#fca5a5"
                : "var(--rj-bone)"),
              (e.target.style.boxShadow = "none")
            )}
          />
          {errors.name && (
            <p
              className="font-cinzel text-[9px] mt-1"
              style={{ color: "#ef4444" }}
            >
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5 block"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Email <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="email"
            placeholder="arjun@email.com"
            value={form.email}
            onChange={set("email")}
            style={focusStyle("email")}
            onFocus={(e) => (
              (e.target.style.borderColor = "var(--rj-emerald)"),
              (e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)")
            )}
            onBlur={(e) => (
              (e.target.style.borderColor = errors.email
                ? "#fca5a5"
                : "var(--rj-bone)"),
              (e.target.style.boxShadow = "none")
            )}
          />
          {errors.email && (
            <p
              className="font-cinzel text-[9px] mt-1"
              style={{ color: "#ef4444" }}
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5 block"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={set("phone")}
            style={inputBase}
            onFocus={(e) => (
              (e.target.style.borderColor = "var(--rj-emerald)"),
              (e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)")
            )}
            onBlur={(e) => (
              (e.target.style.borderColor = "var(--rj-bone)"),
              (e.target.style.boxShadow = "none")
            )}
          />
        </div>
        <div>
          <label
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5 block"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Subject <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={form.subject}
            onChange={set("subject")}
            style={{
              ...focusStyle("subject"),
              cursor: "pointer",
              appearance: "none",
            }}
            onFocus={(e) => (
              (e.target.style.borderColor = "var(--rj-emerald)"),
              (e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)")
            )}
            onBlur={(e) => (
              (e.target.style.borderColor = errors.subject
                ? "#fca5a5"
                : "var(--rj-bone)"),
              (e.target.style.boxShadow = "none")
            )}
          >
            <option value="">Select a subject…</option>
            {SUBJECT_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p
              className="font-cinzel text-[9px] mt-1"
              style={{ color: "#ef4444" }}
            >
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5 block"
          style={{ color: "var(--rj-charcoal)" }}
        >
          Message <span style={{ color: "#ef4444" }}>*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Tell us how we can help…"
          value={form.message}
          onChange={set("message")}
          style={{
            ...focusStyle("message"),
            resize: "vertical",
            minHeight: 120,
          }}
          onFocus={(e) => (
            (e.target.style.borderColor = "var(--rj-emerald)"),
            (e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)")
          )}
          onBlur={(e) => (
            (e.target.style.borderColor = errors.message
              ? "#fca5a5"
              : "var(--rj-bone)"),
            (e.target.style.boxShadow = "none")
          )}
        />
        {errors.message && (
          <p
            className="font-cinzel text-[9px] mt-1"
            style={{ color: "#ef4444" }}
          >
            {errors.message}
          </p>
        )}
        <p
          className="font-cinzel text-[9px] mt-1 text-right"
          style={{ color: "var(--rj-ash)" }}
        >
          {form.message.length} / 1000
        </p>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center gap-2 py-3.5 rounded-full font-cinzel text-[11px] tracking-widest uppercase font-bold transition-all duration-300 disabled:opacity-60"
        style={{
          background: "var(--gradient-gold)",
          color: "var(--rj-emerald)",
          cursor: loading ? "wait" : "pointer",
          boxShadow: "0 4px 20px rgba(252,193,81,0.3)",
        }}
      >
        {loading ? (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ◌
          </motion.span>
        ) : (
          <Send size={13} />
        )}
        {loading ? "Sending…" : "Send Message"}
      </motion.button>

      <p
        className="font-cinzel text-[9px] tracking-wider text-center"
        style={{ color: "var(--rj-ash)" }}
      >
        We respect your privacy. Your details are never shared with third
        parties.
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────
// EMBEDDED MAP PLACEHOLDER
// Replace the iframe src with your actual Google Maps embed URL
// from: maps.google.com → Share → Embed a map → copy src
// ─────────────────────────────────────────────────────────────────
function StoreMap() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        aspectRatio: "16/9",
        border: "1px solid var(--rj-bone)",
        minHeight: 260,
      }}
    >
      <iframe
        title="Rehnoor Jewels store location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.345!2d77.209!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0, position: "absolute", inset: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Map overlay — store name pill */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "var(--rj-emerald)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
          }}
        >
          <MapPin size={12} style={{ color: "var(--rj-gold)" }} />
          <span
            className="font-cinzel text-[9px] tracking-widest uppercase"
            style={{ color: "var(--rj-gold)" }}
          >
            Rehnoor Jewels
          </span>
        </div>
      </div>
      {/* Directions CTA */}
      <a
        href="https://maps.google.com/?q=Rehnoor+Jewels+Connaught+Place+New+Delhi"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
        style={{
          background: "#fff",
          color: "var(--rj-emerald)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
      >
        Get Directions <ArrowRight size={10} />
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main style={{ background: "var(--rj-ivory)" }}>
      {/* ══════════════════════════════════════
          HERO HEADER
      ══════════════════════════════════════ */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "6rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-5 flex-wrap">
            {["Home", "Contact"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href="/"
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </Link>
                    <span
                      style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 }}
                    >
                      ›
                    </span>
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p
                className="label-accent mb-3"
                style={{ color: "var(--rj-gold)" }}
              >
                ✦ We're here to help
              </p>
              <h1 className="heading-lg text-white leading-tight">
                Get in Touch
              </h1>
              <p
                className="mt-3 font-cinzel text-xs tracking-widest max-w-md"
                style={{ color: "rgba(255,255,255,0.45)", lineHeight: 2 }}
              >
                Questions about an order, a custom piece, or just want to say
                hello? Our team typically responds within 2 hours on weekdays.
              </p>
            </div>

            {/* Response time pills */}
            <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
              {[
                { label: "~2 hr", sub: "Email reply" },
                { label: "~15 min", sub: "WhatsApp reply" },
                { label: "24/7", sub: "Order tracking" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p
                    className="font-cormorant font-light"
                    style={{
                      fontSize: "1.4rem",
                      color: "var(--rj-gold)",
                      lineHeight: 1,
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="font-cinzel text-[9px] tracking-wider mt-0.5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          QUICK HELP TOPICS
      ══════════════════════════════════════ */}
      <div style={{ background: "var(--rj-charcoal)" }}>
        <div className="container-rj py-8">
          <div className="flex flex-wrap gap-2 items-center">
            <p
              className="font-cinzel text-[9px] tracking-widest uppercase mr-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Quick help:
            </p>
            {HELP_TOPICS.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                }}
              >
                <span style={{ color: "var(--rj-gold)" }}>{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CONTACT CARDS + FORM GRID
      ══════════════════════════════════════ */}
      <div className="container-rj section-padding py-14 md:py-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
          {/* ── LEFT: Contact details ── */}
          <div className="flex flex-col gap-4">
            <div className="mb-2">
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                ✦ Reach us
              </p>
              <h2
                className="font-cormorant text-2xl font-light leading-tight"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Multiple ways
                <br />
                <em className="text-gold-shimmer font-normal">to connect</em>
              </h2>
            </div>

            {CONTACT_DETAILS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.action}
                target={c.action.startsWith("http") ? "_blank" : undefined}
                rel={
                  c.action.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-start gap-3.5 p-4 rounded-xl group transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${c.color}12`, color: c.color }}
                >
                  {c.icon}
                </div>
                <div>
                  <p
                    className="font-cinzel text-[9px] tracking-widest uppercase mb-0.5"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="font-cinzel text-sm font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {c.value}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    {c.sub}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="ml-auto flex-shrink-0 mt-3 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--rj-bone)" }}
                />
              </motion.a>
            ))}

            {/* Store hours */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="p-4 rounded-xl"
              style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(0,55,32,0.07)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  <Clock size={18} />
                </div>
                <div>
                  <p
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    Store Hours
                  </p>
                  <p
                    className="font-cinzel text-sm font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Connaught Place, Delhi
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                {STORE_HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between"
                  >
                    <span
                      className="font-cinzel text-[10px] tracking-wider"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="font-cinzel text-[10px] tracking-wider font-bold"
                      style={{
                        color:
                          h.time === "Closed" ? "#ef4444" : "var(--rj-emerald)",
                      }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Form (spans 2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 rounded-2xl p-6 sm:p-8 md:mt-28"
            style={{
              background: "#fff",
              border: "1px solid var(--rj-bone)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            <p
              className="label-accent mb-2"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Send a message
            </p>
            <h2
              className="font-cormorant text-2xl font-light mb-6"
              style={{ color: "var(--rj-charcoal)" }}
            >
              We'll get back to you
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAP + STORE ADDRESS
      ══════════════════════════════════════ */}
      <div style={{ background: "var(--rj-ivory-dark)" }}>
        <div className="container-rj py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Map — takes 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <p
                className="label-accent mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                ✦ Find us
              </p>
              <h2
                className="font-cormorant text-2xl font-light mb-5"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Visit our store
              </h2>
              <StoreMap />
            </motion.div>

            {/* Address + what to expect — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 flex flex-col gap-5"
            >
              {/* Address card */}
              <div
                className="p-5 rounded-2xl md:mt-20"
                style={{
                  background: "#fff",
                  border: "1px solid var(--rj-bone)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(0,55,32,0.07)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <p
                    className="font-cinzel text-xs font-bold tracking-wider"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Store Address
                  </p>
                </div>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: "var(--rj-charcoal)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  Shop 14, Block F, Connaught Place
                  <br />
                  New Delhi – 110001
                  <br />
                  Near Rajiv Chowk Metro Station
                </p>
                <a
                  href="https://maps.google.com/?q=Connaught+Place+New+Delhi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                >
                  Get directions <ArrowRight size={11} />
                </a>
              </div>

              {/* What to expect */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "var(--rj-emerald)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase mb-4"
                  style={{ color: "var(--rj-gold)" }}
                >
                  ✦ What to expect in-store
                </p>
                {[
                  "Try on the full collection",
                  "Complimentary gold consultation",
                  "On-the-spot BIS verification",
                  "Same-day engraving available",
                  "Complimentary chai & water",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 mb-3 last:mb-0"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                      style={{ background: "rgba(252,193,81,0.15)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--rj-gold)" }}
                      />
                    </div>
                    <p
                      className="text-sm"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FAQs
      ══════════════════════════════════════ */}
      <div className="container-rj section-padding py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16 items-start">
          {/* FAQ heading — sticky on desktop */}
          <div className="lg:sticky lg:top-28">
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Common questions
            </p>
            <h2
              className="heading-md leading-tight mb-4"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Frequently
              <br />
              <em className="text-gold-shimmer font-normal">asked</em>
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              Can't find what you're looking for? Drop us a message using the
              form above or WhatsApp us directly.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
              style={{
                background: "#25D366",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <MessageCircle size={13} /> Chat on WhatsApp
            </a>
          </div>

          {/* FAQ accordion — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════════════════ */}
      <div style={{ background: "var(--rj-charcoal)" }}>
        <div className="container-rj py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="label-accent mb-1"
                style={{ color: "var(--rj-gold)" }}
              >
                ✦ Still need help?
              </p>
              <p
                className="font-cormorant text-xl font-light"
                style={{ color: "#fff" }}
              >
                Our team is one message away
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--rj-emerald)",
                  cursor: "pointer",
                }}
              >
                <Phone size={12} /> Call Now
              </a>
              <a
                href="mailto:hello@rehnoorjewels.com"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              >
                <Mail size={12} /> Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
