"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function CustomCTA() {
  const destinationWhatsAppLine = "918595814465";
  const startInquiryMessage =
    "Hello Rehnoor Jewels team,\n\nI read about your custom design capabilities and would love to begin a conversation regarding a bespoke jewellery piece.";

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://wa.me/${destinationWhatsAppLine}?text=${encodeURIComponent(startInquiryMessage)}`,
      "_blank",
    );
  };

  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center bg-neutral-900 overflow-hidden py-20">
      {/* ── BACKGROUND CONTROLLER: Fixed Image Overlay System ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/customize/custom-bg.png')", // Utilizing your existing high-res asset
          backgroundAttachment: "fixed", // Parallax effect across scrolling viewports
        }}
      />

      {/* Decorative radial brand ambient highlight glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,10,0.8)_100%)] pointer-events-none" />

      {/* ── GLASS CONTAINER BODY FOR METRICS & ACTIONS ── */}
      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 bg-neutral-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 lg:p-14 shadow-2xl"
        >
          {/* Tagline Heading Context */}
          <div className="space-y-2">
            <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.3em] font-bold text-amber-500/90 uppercase block">
              ✦ Crafting the Irreplaceable ✦
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Your Dream Design Is <br />
              <em className="text-amber-400 font-normal italic">
                One Conversation Away
              </em>
            </h2>
          </div>

          {/* Context Explainer Block */}
          <p className="font-light text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Whether you have a clear vision or just a feeling you want to
            capture, our team at
            <strong className="font-medium text-white">
              {" "}
              Rehnoor Jewels
            </strong>{" "}
            is here to bring it to life. Our Customized Jewellery, Customized
            Gold Jewellery, and Customized Diamond Jewellery services exist for
            those who believe that what they wear should mean something.
          </p>

          {/* Highlight Brand Accent Line */}
          <blockquote className="border-l-2 border-r-2 border-amber-500/40 px-4 max-w-lg mx-auto">
            <p className="font-cormorant text-base sm:text-lg text-neutral-200 tracking-wide italic">
              &ldquo;Every piece begins with your idea. Every piece ends with
              something irreplaceable.&rdquo;
            </p>
          </blockquote>

          {/* Interactive Trigger Area */}
          <div className="pt-2 space-y-4">
            <p className="font-cinzel text-xs tracking-widest uppercase font-bold text-neutral-400">
              Ready to Begin?
            </p>

            <motion.button
              onClick={handleWhatsAppRedirect}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-cinzel text-xs tracking-widest uppercase font-bold text-neutral-900 transition-all duration-300 shadow-xl cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
                boxShadow: "0 10px 30px rgba(245, 158, 11, 0.25)",
              }}
            >
              <MessageCircle size={15} className="fill-current" />
              Customize This Design
            </motion.button>

            <p className="text-xs text-neutral-400 font-light">
              Connect with us and begin your Customized Jewellery journey today.
            </p>
          </div>

          {/* Horizontal Layout Separator Rule */}
          <hr className="border-white/10 max-w-md mx-auto" />

          {/* Footer Metadata Brand Suite Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-center text-neutral-300">
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] tracking-wider text-amber-500/80 uppercase font-semibold">
                Gold Standard
              </p>
              <p className="text-xs font-light text-white">
                14K & 22K Solid Gold
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] tracking-wider text-amber-500/80 uppercase font-semibold">
                Gem Selection
              </p>
              <p className="text-xs font-light text-white">
                VS/SI Natural Diamonds
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] tracking-wider text-amber-500/80 uppercase font-semibold">
                Pricing Model
              </p>
              <p className="text-xs font-light text-white">
                100% Transparent Costs
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="font-cinzel text-[10px] tracking-wider text-amber-500/80 uppercase font-semibold">
                Experience
              </p>
              <p className="text-xs font-light text-white">
                WhatsApp-First Service
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
