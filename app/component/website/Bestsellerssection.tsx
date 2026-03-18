"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, ArrowRight, Star } from "lucide-react";

const filters = ["All", "Chains", "Kadas", "Rings", "Bracelets", "Pendants"];

const products = [
  {
    id: 1,
    name: "Nawabi Gold Chain",
    category: "Chains",
    price: 12999,
    originalPrice: 16999,
    weight: "10.2g",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=85",
    rating: 4.9,
    reviews: 234,
    badge: "Bestseller",
    isNew: false,
    karat: "22kt",
  },
  {
    id: 2,
    name: "Jaguar Rhodium Kada",
    category: "Kadas",
    price: 8999,
    originalPrice: 11999,
    weight: "22g",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    rating: 4.8,
    reviews: 189,
    badge: "New",
    isNew: true,
    karat: "Gold Plated",
  },
  {
    id: 3,
    name: "Signet Band Ring",
    category: "Rings",
    price: 4999,
    originalPrice: 6499,
    weight: "6.1g",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85",
    rating: 4.7,
    reviews: 145,
    badge: null,
    isNew: false,
    karat: "18kt",
  },
  {
    id: 4,
    name: "Link Gold Bracelet",
    category: "Bracelets",
    price: 9499,
    originalPrice: 12999,
    weight: "15.5g",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=85",
    rating: 4.9,
    reviews: 98,
    badge: "Trending",
    isNew: true,
    karat: "22kt",
  },
  {
    id: 5,
    name: "Rope Chain Necklace",
    category: "Chains",
    price: 7499,
    originalPrice: 9999,
    weight: "8.4g",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=85",
    rating: 4.6,
    reviews: 167,
    badge: null,
    isNew: false,
    karat: "22kt",
  },
  {
    id: 6,
    name: "Om Gold Pendant",
    category: "Pendants",
    price: 3999,
    originalPrice: 4999,
    weight: "4.2g",
    image:
      "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    rating: 4.8,
    reviews: 212,
    badge: "Bestseller",
    isNew: false,
    karat: "22kt",
  },
  {
    id: 7,
    name: "Biscuit Gold Ring",
    category: "Rings",
    price: 5999,
    originalPrice: 7499,
    weight: "7.8g",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=85",
    rating: 4.5,
    reviews: 88,
    badge: "New",
    isNew: true,
    karat: "22kt",
  },
  {
    id: 8,
    name: "Franco Chain",
    category: "Chains",
    price: 15999,
    originalPrice: 19999,
    weight: "18.7g",
    image:
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=85",
    hoverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85",
    rating: 5.0,
    reviews: 43,
    badge: "Premium",
    isNew: true,
    karat: "22kt",
  },
];

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="card-product group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="card-product-image">
        <AnimatePresence mode="wait">
          <motion.div
            key={hovered ? "hover" : "default"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={hovered ? product.hoverImage : product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && <span className="badge-gold">{product.badge}</span>}
          {discount > 0 && <span className="badge-emerald">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            size={14}
            className={`transition-all duration-300 cursor-pointer ${
              wishlisted ? "fill-red-500 text-red-500" : "text-[var(--rj-ash)]"
            }`}
          />
        </button>

        {/* Quick actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-[var(--rj-emerald)] text-[var(--rj-gold)] py-2 text-[10px] font-cinzel tracking-wider uppercase hover:bg-[var(--rj-emerald-light)] transition-colors cursor-pointer">
            <ShoppingBag size={12} />
            Add to Cart
          </button>
          <button className="w-9 flex items-center justify-center bg-white text-[var(--rj-charcoal)] hover:bg-[var(--rj-gold)] hover:text-[var(--rj-emerald)] transition-colors cursor-pointer">
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="label-accent text-[var(--rj-ash)] text-[9px] mb-1">
          {product.karat} · {product.weight}
        </p>

        <h3 className="font-cormorant text-[var(--rj-charcoal)] text-lg leading-tight mb-2 group-hover:text-[var(--rj-emerald)] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-[var(--rj-gold)] text-[var(--rj-gold)]"
                    : "text-[var(--rj-bone)]"
                }
              />
            ))}
          </div>
          <span className="text-[var(--rj-ash)] text-[10px]">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="price-tag text-[var(--rj-emerald)]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="price-original">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BestsellersSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section className="section-padding bg-white">
      <div className="container-rj">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="label-accent text-[var(--rj-emerald)] mb-3">
            ✦ Bestsellers
          </p>
          <h2 className="heading-lg text-[var(--rj-charcoal)] mb-4">
            The Gold Standard
          </h2>
          <p className="text-[var(--rj-ash)] max-w-md mx-auto">
            Our most-loved pieces - loved by thousands, crafted for the bold.
          </p>
          <div className="divider-gold-center mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 font-cinzel font-semibold text-[12px] tracking-[0.2em] uppercase cursor-pointer transition-all duration-300 ${
                activeFilter === f
                  ? "bg-[var(--rj-emerald)] text-[var(--rj-gold)] shadow-lg"
                  : "bg-transparent border border-[var(--rj-bone)] text-[var(--rj-ash)] hover:border-[var(--rj-emerald)] hover:text-[var(--rj-emerald)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/collections" className="btn-primary inline-flex group">
            View All Products
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
