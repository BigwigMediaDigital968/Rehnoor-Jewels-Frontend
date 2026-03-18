"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  {
    id: "chains",
    label: "Chains",
    tagline: "Bold, layered, iconic",
    image:
      "https://images.unsplash.com/photo-1613498510372-8901cad084a2/?w=800&q=80",
    href: "/collections/chains",
    count: "120+ Designs",
  },
  {
    id: "kadas",
    label: "Kadas",
    tagline: "Power on your wrist",
    image:
      "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d/?w=600&q=80",
    href: "/collections/kadas",
    count: "80+ Designs",
  },
  {
    id: "rings",
    label: "Rings",
    tagline: "Wear your statement",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    href: "/collections/rings",
    count: "60+ Designs",
  },
  {
    id: "bracelets",
    label: "Bracelets",
    tagline: "Layered perfection",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    href: "/collections/bracelets",
    count: "45+ Designs",
  },
  {
    id: "pendants",
    label: "Pendants",
    tagline: "Close to the heart",
    image:
      "https://images.unsplash.com/photo-1667843622980-a528280e6e0d?w=800&q=80",
    href: "/collections/pendants",
    count: "30+ Designs",
  },
];

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <Link
        href={cat.href}
        className="group relative overflow-hidden rounded-xl bg-neutral-900 w-full h-full block"
      >
        {/* Image — scale on hover via group */}
        <Image
          src={cat.image}
          alt={cat.label}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
        />

        {/* Persistent bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Emerald tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: "var(--rj-emerald)" }}
        />

        {/* Count badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge-gold" style={{ fontSize: "0.55rem" }}>
            {cat.count}
          </span>
        </div>

        {/* Text content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p
            className="label-accent mb-1"
            style={{
              color: "var(--rj-gold)",
              fontSize: "0.6rem",
              opacity: 0.85,
            }}
          >
            {cat.tagline}
          </p>
          <h3
            className="font-cormorant text-white font-light leading-tight mb-2"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)" }}
          >
            {cat.label}
          </h3>

          {/* Shop Now — slides up on hover using group */}
          <div className="h-4 overflow-hidden">
            <div
              className="flex items-center gap-1 font-cinzel uppercase tracking-widest text-white/75 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
              style={{ fontSize: "0.6rem" }}
            >
              Shop Now <ArrowRight size={9} />
            </div>
          </div>
        </div>

        {/* Gold border on hover */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent group-hover:border-[var(--rj-gold)]/50 transition-all duration-500" />
      </Link>
    </motion.div>
  );
}

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".cat-heading", { opacity: 0, y: 40 });
      gsap.to(".cat-heading", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cat-heading",
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--rj-ivory)]">
      <div className="container-rj">
        {/* Heading row */}
        <div className="cat-heading flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="label-accent mb-3"
              style={{ color: "var(--rj-emerald)" }}
            >
              ✦ Shop By Category
            </p>
            <h2
              className="heading-lg leading-tight"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Crafted for
              <br />
              <em className="text-gold-shimmer font-normal">the modern man</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="group flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase transition-colors"
            style={{ color: "var(--rj-emerald)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--rj-gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--rj-emerald)")
            }
          >
            View All
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "280px 280px",
          }}
        >
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            <CategoryCard cat={categories[0]} index={0} />
          </div>
          <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
            <CategoryCard cat={categories[1]} index={1} />
          </div>
          <div style={{ gridColumn: "4 / 5", gridRow: "1 / 2" }}>
            <CategoryCard cat={categories[2]} index={2} />
          </div>
          <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
            <CategoryCard cat={categories[3]} index={3} />
          </div>
          <div style={{ gridColumn: "4 / 5", gridRow: "2 / 3" }}>
            <CategoryCard cat={categories[4]} index={4} />
          </div>
        </div>

        {/*
          ── MOBILE / TABLET (below lg) ───────────────────
          2-col grid, Chains spans full width on top row
        */}
        <div
          className="lg:hidden grid gap-3"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div style={{ gridColumn: "1 / 3", height: "260px" }}>
            <CategoryCard cat={categories[0]} index={0} />
          </div>
          {categories.slice(1).map((cat, i) => (
            <div key={cat.id} style={{ height: "200px" }}>
              <CategoryCard cat={cat} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
