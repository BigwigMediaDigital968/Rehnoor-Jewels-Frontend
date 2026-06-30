"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ArrowUpRight, X } from "lucide-react";

interface RecentProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: string;
  viewedAt: number;
}

export default function RecentlyViewedFloating() {
  const [products, setProducts] = useState<RecentProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Initial delayed show
  useEffect(() => {
    const timer = setTimeout(
      () => {
        const items: RecentProduct[] = JSON.parse(
          localStorage.getItem("recent-products") || "[]",
        );

        const sorted = items
          .sort((a, b) => b.viewedAt - a.viewedAt)
          .slice(0, 5);

        if (sorted.length) {
          setProducts(sorted);
          setCurrentIndex(0);
          setVisible(true);
        }
      },
      Math.floor(Math.random() * 3000) + 5000,
    );

    return () => clearTimeout(timer);
  }, []);

  const SHOW_INTERVAL = 4000;
  const HIDE_DURATION = 20000;

  useEffect(() => {
    if (!products.length || isHovered || dismissed) return;

    let timer: NodeJS.Timeout;

    if (!visible) {
      timer = setTimeout(() => {
        setCurrentIndex(0);
        setVisible(true);
      }, HIDE_DURATION);
    } else {
      timer = setTimeout(() => {
        if (currentIndex < products.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setVisible(false);
        }
      }, SHOW_INTERVAL);
    }

    return () => clearTimeout(timer);
  }, [visible, currentIndex, products, isHovered, dismissed]);

  const handleCardClick = () => {
    setIsHovered(false);
    setVisible(false);
  };

  const handleCut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    setVisible(false);
  };

  const product = products[currentIndex];
  if (!product) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // Fixed positioning: safely placed at the bottom-right.
          // max-w-[calc(100vw-32px)] ensures it stays cleanly inside small mobile viewports without overflowing.
          className="fixed bottom-16 left-4 lg:bottom-6 sm:left-6 z-[9999] p-2 w-auto max-w-[calc(100vw-32px)]"
        >
          <div className="relative group w-full rounded-md border border-neutral-200 bg-white/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(155,122,71,0.15)] hover:border-[#9B7A47]/40">
            {/* ── UPGRADED SAFELY OVERLAID CLOSE BUTTON ── */}
            <button
              onClick={handleCut}
              className="absolute -top-2.5 -right-2.5 z-[100] flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-md transition-all duration-200 hover:bg-neutral-50 hover:text-neutral-900 hover:scale-105 cursor-pointer"
              aria-label="Dismiss recent products"
            >
              <X size={14} strokeWidth={2.5} />
            </button>

            {/* Clickable Card Link Container (Directly styled, no nested <a>) */}
            <Link
              href={`/products/${product.slug}`}
              onClick={handleCardClick}
              className="block overflow-hidden rounded-md no-underline"
            >
              <div className="flex items-stretch">
                {/* Left Side: Product Thumbnail */}
                <div className="relative w-[105px] h-[105px] bg-neutral-50 flex-shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-neutral-900/80 px-2 py-0.5 text-[9px] font-medium tracking-wider text-white backdrop-blur-[2px]">
                    <Eye size={10} strokeWidth={2.5} />
                    VIEWED
                  </div>
                </div>

                {/* Right Side: Details Content */}
                {/* <div className="flex flex-1 flex-col justify-between p-3 sm:p-3.5 min-w-0">
                  <div>
                    <span className="font-cinzel text-[9px] font-bold tracking-[0.2em] text-[#9B7A47] uppercase block truncate">
                      Recently Viewed
                    </span>
                    <h4 className="mt-0.5 sm:mt-1 line-clamp-2 font-cinzel text-[11px] sm:text-xs tracking-wide font-medium leading-relaxed text-neutral-800 transition-colors group-hover:text-neutral-900">
                      {product.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <span className="text-xs font-bold font-sans tracking-wide text-neutral-900">
                      {product.price}
                    </span>
                    <div className="text-[#9B7A47] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Bottom Animation Carousel Auto Timer Progress Metric */}
              {!isHovered && (
                <div className="w-full bg-neutral-100 h-[2px] overflow-hidden">
                  <motion.div
                    key={currentIndex}
                    initial={{ x: "0%" }}
                    animate={{ x: "-100%" }}
                    transition={{
                      duration: SHOW_INTERVAL / 1000,
                      ease: "linear",
                    }}
                    className="h-full bg-gradient-to-r from-[#9B7A47] to-[#C5A880] origin-left"
                  />
                </div>
              )}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
