"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const footerLinks = {
  collections: [
    { label: "Chains", href: "/collections/chains" },
    { label: "Kadas", href: "/collections/kadas" },
    { label: "Rings", href: "/collections/rings" },
    { label: "Bracelets", href: "/collections/bracelets" },
    { label: "Pendants", href: "/collections/pendants" },
    { label: "New Arrivals", href: "/collections/new-arrivals" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Franchise", href: "/franchise" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Track Order", href: "/track-order" },
    { label: "Return Policy", href: "/returns" },
    { label: "Shipping Info", href: "/shipping" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Gold Buyback Policy", href: "/buyback" },
    { label: "Hallmarking Info", href: "/hallmarking" },
  ],
};

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com" },
];

const certifications = [
  { label: "BIS Hallmarked", icon: "⚜" },
  { label: "ISO Certified", icon: "✓" },
  { label: "GIA Partner", icon: "◈" },
  { label: "SSL Secured", icon: "🔒" },
];

const payments = [
  { payProfile: "/upi.png", name: "UPI" },
  { payProfile: "/google-pay.png", name: "Google Pay" },
  { payProfile: "/master-card.png", name: "MasterCard" },
  { payProfile: "/net-banking.png", name: "Net Banking" },
  { payProfile: "/visa-card.png", name: "Visa" },
  { payProfile: "/card.png", name: "Credit Card" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[var(--rj-emerald)] text-white">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="container-rj py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-6">
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                sub: "On orders above ₹999",
              },
              {
                icon: "♾",
                title: "Lifetime Buyback",
                sub: "50% gold buyback guaranteed",
              },
              {
                icon: "↩",
                title: "Easy Returns",
                sub: "30-day hassle-free returns",
              },
              {
                icon: "⚜",
                title: "Quality Assured",
                sub: "Premium craftsmanship, BIS hallmarked",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-cinzel text-[var(--rj-gold)] text-xs tracking-widest uppercase">
                    {item.title}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-rj py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-6">
              <span className="font-cinzel font-black text-white text-2xl tracking-[0.3em]">
                REHNOOR
              </span>
              <br />
              <span className="font-cinzel text-[var(--rj-gold)] text-[9px] tracking-[0.4em]">
                JEWELS
              </span>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Rehnoor Jewels redefines men&apos;s gold jewellery - where
              heritage craftsmanship meets bold modern design. Every piece is
              BIS hallmarked and crafted to last a lifetime.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="font-cinzel text-[var(--rj-gold)] text-[10px] tracking-[0.25em] uppercase mb-3">
                Stay in the gold
              </p>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[var(--rj-gold)] text-sm font-medium"
                >
                  ✦ You&apos;re on the list. Welcome to Rehnoor.
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--rj-gold)] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--rj-gold)] text-[var(--rj-emerald)] px-4 py-2.5 hover:bg-[var(--rj-gold-light)] transition-colors flex items-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-[var(--rj-gold)] hover:text-[var(--rj-gold)] transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {(
              [
                { title: "Collections", links: footerLinks.collections },
                { title: "Company", links: footerLinks.company },
                { title: "Support", links: footerLinks.support },
                { title: "Legal", links: footerLinks.policies },
              ] as const
            ).map((col) => (
              <div key={col.title}>
                <p className="font-cinzel text-[var(--rj-gold)] text-[10px] tracking-[0.25em] uppercase mb-5">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/60 text-sm hover:text-white transition-colors duration-200 hover-gold-line"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              text: "123, Jewellers Lane, Jaipur, Rajasthan - 302001",
            },
            { icon: Phone, text: "+91 98765 43210" },
            { icon: Mail, text: "care@rehnoorrjewels.com" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <item.icon
                size={15}
                className="text-[var(--rj-gold)] mt-0.5 flex-shrink-0"
              />
              <span className="text-white/60 text-xs leading-relaxed">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="border-t border-white/10">
        <div className="container-rj py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {certifications.map((cert) => (
                <div key={cert.label} className="flex items-center gap-1.5">
                  <span className="text-[var(--rj-gold)] text-sm">
                    {cert.icon}
                  </span>
                  <span className="text-white/40 text-[10px] font-cinzel tracking-[0.15em] uppercase">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {payments.map((pay) => (
                <span
                  key={pay.name}
                  className="px-2 py-1 text-[9px] font-mono tracking-wider flex items-center justify-center"
                >
                  <Image
                    src={pay.payProfile}
                    alt={pay.name}
                    width={32}
                    height={20}
                    className="object-contain"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[var(--rj-emerald-dark)] py-4">
        <div className="container-rj">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/30 text-xs font-cinzel tracking-widest">
              © {new Date().getFullYear()} REHNOOR JEWELS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-white/20 text-xs">Crafted with ✦ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
