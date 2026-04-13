"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ApiCollection } from "@/app/lib/api/collections";
import { useCollections } from "@/app/lib/hooks/useCollections";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Skeleton card ──────────────────────────────────────────────────────────
function SkeletonCard({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`w-full h-full rounded-xl bg-neutral-200 animate-pulse overflow-hidden relative ${tall ? "" : ""}`}
    >
      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="h-2 w-16 rounded bg-neutral-300" />
        <div className="h-4 w-24 rounded bg-neutral-300" />
      </div>
    </div>
  );
}

// ── Category card ──────────────────────────────────────────────────────────
function CategoryCard({ cat, index }: { cat: ApiCollection; index: number }) {
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
        href={`/collections/${cat.slug}`}
        className="group relative overflow-hidden rounded-xl bg-neutral-900 w-full h-full block"
      >
        {cat?.heroImage && (
          <Image
            src={cat.heroImage}
            alt={cat.label}
            fill
            priority
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
          />
        )}

        {/* Persistent bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Accent tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
          style={{ background: "var(--rj-emerald)" }}
        />

        {/* Count badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge-gold" style={{ fontSize: "0.55rem" }}>
            {cat.productCount}+ Designs
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

          {/* Shop Now — slides up on hover */}
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

// ── Error state ────────────────────────────────────────────────────────────
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <p className="font-cinzel text-sm tracking-widest uppercase text-red-500/80">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 font-cinzel text-[11px] tracking-widest uppercase transition-colors"
        style={{ color: "var(--rj-emerald)" }}
      >
        <RefreshCw size={12} /> Retry
      </button>
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────
export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { results, loading, error, reload } = useCollections({
    initialSort: "sortOrder",
  });

  // Slice to top 5 for the layout (already sorted by sortOrder asc from hook)
  const featured = results.slice(0, 5);

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

        {/* Error */}
        {error && !loading && <ErrorState message={error} onRetry={reload} />}

        {/* ── Desktop grid (lg+): same 4-col, 2-row layout ── */}
        {!error && (
          <>
            <div
              className="hidden lg:grid gap-4"
              style={{
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "280px 280px",
              }}
            >
              {loading ? (
                <>
                  <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
                    <SkeletonCard tall />
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        gridColumn: `${(i % 2) + 3} / ${(i % 2) + 4}`,
                        gridRow: `${Math.floor(i / 2) + 1} / ${Math.floor(i / 2) + 2}`,
                      }}
                    >
                      <SkeletonCard />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
                    {featured[0] && (
                      <CategoryCard cat={featured[0]} index={0} />
                    )}
                  </div>
                  <div style={{ gridColumn: "3 / 4", gridRow: "1 / 2" }}>
                    {featured[1] && (
                      <CategoryCard cat={featured[1]} index={1} />
                    )}
                  </div>
                  <div style={{ gridColumn: "4 / 5", gridRow: "1 / 2" }}>
                    {featured[2] && (
                      <CategoryCard cat={featured[2]} index={2} />
                    )}
                  </div>
                  <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
                    {featured[3] && (
                      <CategoryCard cat={featured[3]} index={3} />
                    )}
                  </div>
                  <div style={{ gridColumn: "4 / 5", gridRow: "2 / 3" }}>
                    {featured[4] && (
                      <CategoryCard cat={featured[4]} index={4} />
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── Mobile / tablet grid ── */}
            <div
              className="lg:hidden grid gap-3"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              {loading ? (
                <>
                  <div style={{ gridColumn: "1 / 3", height: "260px" }}>
                    <SkeletonCard tall />
                  </div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i} style={{ height: "200px" }}>
                      <SkeletonCard />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div style={{ gridColumn: "1 / 3", height: "260px" }}>
                    {featured[0] && (
                      <CategoryCard cat={featured[0]} index={0} />
                    )}
                  </div>
                  {featured.slice(1).map((cat, i) => (
                    <div key={cat._id} style={{ height: "200px" }}>
                      <CategoryCard cat={cat} index={i + 1} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
