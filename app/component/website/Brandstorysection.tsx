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
    title: "Skin-Friendly Finish",
    desc: "Crafted with care to ensure a comfortable wearing experience for everyday use. Designed to be gentle on skin while maintaining a premium gold-like shine.",
  },
  {
    icon: "✦",
    title: "Premium Gold Plating",
    desc: "Our jewellery features high-quality gold plating, giving you the look of real gold with lasting brilliance and durability.",
  },
  {
    icon: "♾",
    title: "Elegant & Durable",
    desc: "Each piece is designed to combine style with strength, so you can enjoy beauty that lasts beyond occasions.",
  },
  {
    icon: "◈",
    title: "Timeless Design",
    desc: "Blending classic artistry with modern aesthetics to create pieces that never go out of style.",
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
      gsap.set(".value-item", { opacity: 0.5, y: 40 });
      gsap.to(".value-item", {
        y: 0,
        opacity: 1,
        duration: 0.2,
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
                Est. 2020
              </p>
              <p className="font-cormorant text-white text-2xl leading-tight">
                Crafted with Precision & Care
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
              Rooted in{" "}
              <em className="text-gold-shimmer font-normal">heritage,</em>
              <br />
              crafted for modern jewellery lovers
            </h2>

            <p className="text-white/70 leading-relaxed mb-5">
              Rehnoor Jewels was born from a simple belief that jewellery should
              be bold, elegant, and accessible. Inspired by India’s rich
              heritage, we create gold-plated designs that reflect timeless
              beauty with a modern touch.
            </p>

            <p className="text-white/70 leading-relaxed mb-8">
              Each piece is thoughtfully crafted to offer the look of real gold,
              combining tradition with contemporary style. From everyday wear to
              special occasions, our jewellery is designed to complement every
              moment with effortless elegance.
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
                {
                  value: "1000+",
                  label: "Orders Delivered",
                  caption: "Across India",
                },
                {
                  value: "Premium",
                  label: "Quality Finish",
                  caption: "Real gold-like shine",
                },
                {
                  value: "500+",
                  label: "Unique Designs",
                  caption: "Curated collections",
                },
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
                  <p className="text-white/50 text-xs tracking-widest mt-1">
                    {stat.caption}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex mb-3">
          <h2 className="heading-sm text-[var(--rj-gold)]">
            SHOP WITH CONFIDENCE
          </h2>
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
