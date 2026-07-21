"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Loader2,
  Send,
  MessageSquareCode,
  Layers,
  Ruler,
  ChevronDown,
} from "lucide-react";

interface ModalState {
  type: "idle" | "success" | "error";
  message?: string;
  email?: string;
  name?: string;
}

const SUBJECT_OPTIONS = [
  "Custom Gold Jewellery Inquiry",
  "Custom Natural Diamond Inquiry",
  "Bespoke Bridal Design Suite",
  "Catalog Item Sizing Modification",
];

const GOLD_PURITIES = [
  "14K Gold",
  "16K Gold",
  "18K Gold",
  "20K Gold",
  "22K Gold",
  "Design Dependent / Uncertain",
];

const GOLD_FINISHES = [
  "High-Polish Shine",
  "Understated Matte",
  "Contemporary Textured",
];

export default function CustomLeadForm() {
  // Configured exactly like your working model to prevent API mapping conflicts
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Custom Gold Jewellery Inquiry", // Defaults to a valid option to satisfy backend
    designCode: "",
    sizeDetails: "",
    goldPurity: "14K Gold",
    goldFinish: "High-Polish Shine",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<ModalState>({ type: "idle" });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.phone.trim()) e.phone = "Phone number is required for tracking";
    if (!form.designCode.trim())
      e.designCode = "Design code reference is required";
    if (!form.sizeDetails.trim()) e.sizeDetails = "Size guidance is required";
    if (!form.message.trim()) e.message = "Please enter specific modifications";
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
    try {
      // Using the Render production API endpoint from your error log as fallback
      const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://rehnoor-jewels-backend-7d5n.onrender.com";

      // Fixed: Exact payload syntax matching your working reference (phone checked for fallback)
      const res = await fetch(`${API_BASE}/api/leads/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone.trim() || undefined,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json();

      // console.log(data);

      if (!res.ok || !data.success) {
        const serverMsg =
          data?.message ||
          "Unable to save parameters down to backend. Please try again.";
        setModal({ type: "error", message: serverMsg });
        return;
      }

      setModal({ type: "success", email: form.email, name: form.fullName });

      const destinationWhatsAppLine = "918595814465";

      // Decorated layout sent seamlessly over to WhatsApp interface
      const waTemplateMessage = `Hello Rehnoor Jewels team,\n\nI have submitted a Custom Jewellery configuration request. Here are my structural selections:\n\n✨ *Client Name:* ${form.fullName}\n📱 *Contact:* ${form.phone}\n📋 *Inquiry Category:* ${form.subject}\n\n🔱 *Gold Purity:* ${form.goldPurity}\n🎨 *Surface Finish:* ${form.goldFinish}\n🏷️ *Design Code/Ref:* ${form.designCode}\n📏 *Size Details:* ${form.sizeDetails}\n\n📝 *Specific Modifications & Notes:* ${form.message}\n\nPlease review these live parameters and provide quote ranges based on today's rates.`;

      window.open(
        `https://wa.me/${destinationWhatsAppLine}?text=${encodeURIComponent(waTemplateMessage)}`,
        "_blank",
      );

      // Clean Reset
      setForm({
        fullName: "",
        email: "",
        phone: "",
        subject: "Custom Gold Jewellery Inquiry",
        designCode: "",
        sizeDetails: "",
        goldPurity: "14K Gold",
        goldFinish: "High-Polish Shine",
        message: "",
      });
      setErrors({});
    } catch {
      setModal({
        type: "error",
        message:
          "We couldn't reach our database servers. Please verify your internet link or check your WhatsApp parameters directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSetter =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((err) => {
          const updated = { ...err };
          delete updated[key];
          return updated;
        });
      }
    };

  const inputBase: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--rj-bone, #e5e5e5)",
    borderRadius: "10px",
    color: "var(--rj-charcoal, #171717)",
    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const getDynamicStyle = (key: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: errors[key] ? "#ef4444" : "var(--rj-bone, #e5e5e5)",
  });

  return (
    <section
      id="leadform"
      className="w-full bg-[#faf9f6] py-10 md:py-16 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-2xl border border-neutral-200/60 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
          {/* ── LEFT COLUMN: LEAD DESIGN CONFIGURATION FORM ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-center lg:text-left">
              <span className="font-cinzel text-[10px] tracking-[0.25em] font-bold text-neutral-400 uppercase">
                ✦ Send a message
              </span>
              <h2 className="font-cormorant text-2xl sm:text-3xl font-light text-neutral-900 mt-1">
                We&apos;ll get back to you <br className="sm:hidden" />
                <em className="text-amber-600 font-normal italic">
                  with direct quotes
                </em>
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Arjun Mehta"
                    value={form.fullName}
                    onChange={handleSetter("fullName")}
                    style={getDynamicStyle("fullName")}
                    className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                  />
                  {errors.fullName && (
                    <p className="text-rose-500 text-[10px] mt-0.5">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="arjun@email.com"
                    value={form.email}
                    onChange={handleSetter("email")}
                    style={getDynamicStyle("email")}
                    className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                  />
                  {errors.email && (
                    <p className="text-rose-500 text-[10px] mt-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Inquiry Dropdown Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700">
                    WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 85958 14465"
                    value={form.phone}
                    onChange={handleSetter("phone")}
                    style={getDynamicStyle("phone")}
                    className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                  />
                  {errors.phone && (
                    <p className="text-rose-500 text-[10px] mt-0.5">
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700">
                    Inquiry Type <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.subject}
                      onChange={handleSetter("subject")}
                      style={getDynamicStyle("subject")}
                      className="focus:border-amber-500 appearance-none pr-10 cursor-pointer"
                    >
                      {SUBJECT_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Reference & Sizing Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700 flex items-center gap-1">
                    <MessageSquareCode size={11} className="text-amber-600" />
                    Design Code / Ref Reference{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Code RC-2026"
                    value={form.designCode}
                    onChange={handleSetter("designCode")}
                    style={getDynamicStyle("designCode")}
                    className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                  />
                  {errors.designCode && (
                    <p className="text-rose-500 text-[10px] mt-0.5">
                      {errors.designCode}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700 flex items-center gap-1">
                    <Ruler size={11} className="text-amber-600" />
                    Size Requirements <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ring Size 14 / 2.4 Kada"
                    value={form.sizeDetails}
                    onChange={handleSetter("sizeDetails")}
                    style={getDynamicStyle("sizeDetails")}
                    className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                  />
                  {errors.sizeDetails && (
                    <p className="text-rose-500 text-[10px] mt-0.5">
                      {errors.sizeDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Custom Selects Frame */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700 flex items-center gap-1">
                    <Layers size={11} className="text-amber-600" />
                    Preferred Gold Purity
                  </label>
                  <div className="relative">
                    <select
                      value={form.goldPurity}
                      onChange={handleSetter("goldPurity")}
                      style={getDynamicStyle("goldPurity")}
                      className="focus:border-amber-500 appearance-none pr-10 cursor-pointer"
                    >
                      {GOLD_PURITIES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700 flex items-center gap-1">
                    🎨 Preferred Surface Finish
                  </label>
                  <div className="relative">
                    <select
                      value={form.goldFinish}
                      onChange={handleSetter("goldFinish")}
                      style={getDynamicStyle("goldFinish")}
                      className="focus:border-amber-500 appearance-none pr-10 cursor-pointer"
                    >
                      {GOLD_FINISHES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>

              {/* Textarea modifications input */}
              <div>
                <label className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1 block text-neutral-700">
                  Specific Modifications / Preferences{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us how we can help configure this luxury design asset..."
                  value={form.message}
                  onChange={handleSetter("message")}
                  style={{ ...getDynamicStyle("message"), resize: "none" }}
                  className="focus:border-amber-500 focus:ring-4 focus:ring-amber-500/5"
                />
                {errors.message && (
                  <p className="text-rose-500 text-[10px] mt-0.5">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submission Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-cinzel text-[11px] tracking-widest uppercase font-bold transition-all duration-300 bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 disabled:opacity-60 shadow-md"
                style={{ cursor: loading ? "wait" : "pointer" }}
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                {loading ? "Registering Parameters..." : "Submit Enquiry"}
              </motion.button>
            </form>
          </div>

          {/* ── RIGHT COLUMN: BRAND ART DISPLAY FRAME ── */}
          <div className="lg:col-span-6 relative w-full h-full min-h-[520px] rounded-xl overflow-hidden bg-neutral-50 shadow-inner">
            <Image
              src="/customize/lead-form-image.png"
              alt="Rehnoor Jewels custom luxury bridal design workstation parameters"
              fill
              sizes="35vw"
              priority
              className="object-cover object-center transition-transform duration-[6000ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Pop-up feedback frame */}
      {modal.type !== "idle" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-xl p-6 text-center shadow-2xl border border-neutral-100">
            <div
              className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3 ${modal.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
            >
              {modal.type === "success" ? "✓" : "✕"}
            </div>
            <h4 className="font-cormorant font-bold text-lg text-neutral-900 mb-1">
              {modal.type === "success"
                ? "Specifications Logged"
                : "Action Paused"}
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-5">
              {modal.type === "success"
                ? "Your details are tracked inside the CRM database. Forwarding selection payload directly over to client WhatsApp panel."
                : modal.message}
            </p>
            <button
              onClick={() => setModal({ type: "idle" })}
              className="px-5 py-1.5 border rounded-full font-cinzel text-[9px] tracking-wider uppercase font-bold text-neutral-600 hover:bg-neutral-50 cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
