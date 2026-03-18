"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: "⚜",
    title: "BIS Hallmarked",
    desc: "Every piece certified by Bureau of Indian Standards for guaranteed purity.",
  },
  {
    icon: "✦",
    title: "Master Craftsmen",
    desc: "Over 40 years of heritage passed down through generations of artisans.",
  },
  {
    icon: "♾",
    title: "Lifetime Buyback",
    desc: "Sell it back at fair value — because gold is always an investment.",
  },
  {
    icon: "◈",
    title: "Free Customization",
    desc: "Size adjustments and engravings on every piece at no extra cost.",
  },
];

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".value-item", { opacity: 0, y: 40 });
      gsap.to(".value-item", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--rj-emerald)] overflow-hidden"
    >
      <div className="container-rj">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-16">
          {/* ── Image column ── */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            className="relative pb-10 pr-10"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1613053341085-db794820ce43?w=800&q=85"
                alt="Rehnoor Jewels Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--rj-emerald-dark)]/70 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 right-0 glass-dark rounded-xl p-5 max-w-[200px]"
            >
              <p
                className="label-accent mb-1"
                style={{ color: "var(--rj-gold)" }}
              >
                Est. 1983
              </p>
              <p className="font-cormorant text-white text-2xl leading-tight">
                40+ Years of Gold
              </p>
            </motion.div>

            {/* Gold corner accent — top left of image */}
            <div
              className="absolute top-0 left-0 w-24 h-24 rounded-xl pointer-events-none"
              style={{ border: "2px solid rgba(252,193,81,0.3)" }}
            />
          </motion.div>

          {/* ── Text column ── */}
          <motion.div ref={textRef} style={{ y: textY }}>
            <p
              className="label-accent mb-5"
              style={{ color: "var(--rj-gold)" }}
            >
              ✦ Our Story
            </p>

            <h2 className="heading-lg text-white mb-6 leading-tight">
              Rooted in
              <br />
              <em className="text-gold-shimmer font-normal">heritage,</em>
              <br />
              crafted for today
            </h2>

            <p className="text-white/70 leading-relaxed mb-5">
              Rehnoor Jewels was born from a simple belief: that men deserve
              jewellery as bold and beautiful as their ambitions. Founded in
              Jaipur&apos;s ancient jewellery bazaars, we blend the finest 22kt
              gold with modern design sensibility.
            </p>

            <p className="text-white/70 leading-relaxed mb-8">
              Every piece in our collection carries the weight of tradition and
              the lightness of modern craft. From the artisan&apos;s hands to
              yours — with love, precision, and gold.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border px-4 py-2 font-cinzel text-[11px] tracking-[0.25em] uppercase transition-all duration-300 group"
              style={{ color: "var(--rj-gold)" }}
            >
              Read Our Story
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Stats */}
            <div className="stats-row grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "40+", label: "Years" },
                { value: "50K+", label: "Customers" },
                { value: "500+", label: "Designs" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-cinzel text-3xl font-bold"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Values grid ── */}
        <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <motion.div
              key={value.title}
              className="value-item glass rounded-xl p-6 group transition-all duration-500"
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(252,193,81,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "transparent")
              }
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                style={{ background: "rgba(252,193,81,0.1)" }}
              >
                <span className="text-lg" style={{ color: "var(--rj-gold)" }}>
                  {value.icon}
                </span>
              </div>
              <h3 className="font-cinzel text-white text-sm tracking-wider mb-2">
                {value.title}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
