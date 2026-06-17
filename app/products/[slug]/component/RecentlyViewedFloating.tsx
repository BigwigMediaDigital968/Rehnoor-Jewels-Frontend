"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ArrowUpRight } from "lucide-react";

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
    if (!products.length || isHovered) return;

    let timer: NodeJS.Timeout;

    if (!visible) {
      // Handles 20-second downtime after sliding away or on user click
      timer = setTimeout(() => {
        setCurrentIndex(0);
        setVisible(true);
      }, HIDE_DURATION);
    } else {
      // Standard 4-second carousel display
      timer = setTimeout(() => {
        if (currentIndex < products.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setVisible(false);
        }
      }, SHOW_INTERVAL);
    }

    return () => clearTimeout(timer);
  }, [visible, currentIndex, products, isHovered]);

  // Force-dismisses the card on user selection
  const handleCardClick = () => {
    setIsHovered(false); // Breaks hover lock instantly
    setVisible(false); // Disappears immediately and fires the 20s delay loop
  };

  const product = products[currentIndex];

  if (!product) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -100,
            y: 50,
            scale: 0.9,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="fixed bottom-6 left-6 z-[9999]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/products/${product.slug}`} onClick={handleCardClick}>
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="
                group
                w-[320px]
                overflow-hidden
                rounded-2xl
                border border-[#E8DCC3]
                bg-white/95
                backdrop-blur-xl
                shadow-[0_20px_60px_rgba(0,0,0,0.15)]
              "
            >
              <div className="flex">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      h-[110px]
                      w-[110px]
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      top-2
                      left-2
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-black/75
                      px-2
                      py-1
                      text-[10px]
                      text-white
                    "
                  >
                    <Eye size={12} />
                    Viewed
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p
                      className="
                        text-[11px]
                        uppercase
                        tracking-[0.2em]
                        text-[#9B7A47]
                      "
                    >
                      Recently Viewed
                    </p>

                    <h4
                      className="
                        mt-1
                        line-clamp-2
                        text-sm
                        font-medium
                        text-gray-900
                      "
                    >
                      {product.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="
                        text-base
                        font-semibold
                        text-[#9B7A47]
                      "
                    >
                      {product.price}
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {!isHovered && (
                <motion.div
                  key={currentIndex}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                  }}
                  className="h-[2px] bg-[#B08D57]"
                />
              )}
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
