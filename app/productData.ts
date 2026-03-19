// products-data.ts
// Real product data for Rehnoor Jewels — 22kt gold men's jewellery
// All images from Unsplash (replace with actual product photos)

import type { Product } from "./component/website/pages/product/ProductCard";

export const products: Product[] = [
  // ── CHAINS ──────────────────────────────────────────────────────
  {
    id: "nawabi-chain-22kt",
    name: "Nawabi Chain",
    subtitle: "22kt Yellow Gold · 18 inch",
    price: "₹8,999",
    originalPrice: "₹10,499",
    tag: "Bestseller",
    rating: 5,
    reviewCount: 248,
    category: "Chains",
    description:
      "A bold, hand-crafted Nawabi chain in BIS hallmarked 22kt gold. Each link is individually set and polished for a mirror finish. Iconic heritage, modern weight.",
    href: "/products/nawabi-chain-22kt",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        alt: "Nawabi Chain 22kt Gold",
      },
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
        alt: "Nawabi Chain clasp detail",
      },
    ],
    sizes: [
      { label: '16"', available: true },
      { label: '18"', available: true },
      { label: '20"', available: true },
      { label: '22"', available: false },
      { label: '24"', available: true },
    ],
  },
  {
    id: "cuban-link-chain",
    name: "Cuban Link Chain",
    subtitle: "22kt Yellow Gold · 20 inch",
    price: "₹11,299",
    tag: "Trending",
    rating: 5,
    reviewCount: 134,
    category: "Chains",
    description:
      "Street-ready Cuban link crafted in solid 22kt gold. Thick, interlocking links with a high-polish finish. The chain that commands attention.",
    href: "/products/cuban-link-chain",
    images: [
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
        alt: "Cuban Link Chain",
      },
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        alt: "Cuban Link Chain detail",
      },
    ],
    sizes: [
      { label: '18"', available: true },
      { label: '20"', available: true },
      { label: '22"', available: true },
      { label: '24"', available: false },
    ],
  },
  {
    id: "rope-chain-gold",
    name: "Rope Chain",
    subtitle: "22kt Yellow Gold · 22 inch",
    price: "₹7,499",
    tag: "New",
    rating: 4,
    reviewCount: 67,
    category: "Chains",
    description:
      "A timeless twisted rope chain in 22kt BIS hallmarked gold. Lightweight enough for daily wear, substantial enough to stack.",
    href: "/products/rope-chain-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
        alt: "Rope Chain gold",
      },
    ],
    sizes: [
      { label: '18"', available: true },
      { label: '20"', available: true },
      { label: '22"', available: true },
      { label: '24"', available: true },
    ],
  },

  // ── KADAS ────────────────────────────────────────────────────────
  {
    id: "royal-kada-heavy",
    name: "Royal Kada",
    subtitle: "22kt Yellow Gold · Adjustable",
    price: "₹12,499",
    tag: "New",
    rating: 5,
    reviewCount: 189,
    category: "Kadas",
    description:
      "A heavy, solid Royal Kada forged in 22kt gold. Smooth cylindrical form with a brushed exterior and polished edges — the mark of a man who doesn't compromise.",
    href: "/products/royal-kada-heavy",
    images: [
      {
        src: "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=600&q=80",
        alt: "Royal Kada 22kt Gold",
      },
      {
        src: "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=600&q=80",
        alt: "Royal Kada on wrist",
      },
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
  },
  {
    id: "moghul-kada-carved",
    name: "Moghul Kada",
    subtitle: "22kt Yellow Gold · Carved",
    price: "₹15,999",
    tag: "Exclusive",
    rating: 5,
    reviewCount: 56,
    category: "Kadas",
    description:
      "Inspired by Mughal court jewellery, each Moghul Kada takes 48 hours of hand-carving by master artisans in Jaipur. Heritage you can wear.",
    href: "/products/moghul-kada-carved",
    images: [
      {
        src: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=80",
        alt: "Moghul Kada carved gold",
      },
    ],
    sizes: [
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
    ],
  },

  // ── RINGS ─────────────────────────────────────────────────────────
  {
    id: "signet-ring-gold",
    name: "Signet Ring",
    subtitle: "22kt Yellow Gold · Men's",
    price: "₹5,299",
    tag: "Popular",
    rating: 5,
    reviewCount: 312,
    category: "Rings",
    description:
      "A flat-top signet ring in solid 22kt gold. Free custom engraving on every order. Your name, your family crest, or a date — worn forever.",
    href: "/products/signet-ring-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
        alt: "Signet Ring Gold",
      },
      {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        alt: "Signet Ring detail",
      },
    ],
    sizes: [
      { label: "18", available: true },
      { label: "20", available: true },
      { label: "22", available: true },
      { label: "24", available: true },
      { label: "26", available: false },
      { label: "28", available: true },
    ],
  },
  {
    id: "band-ring-plain",
    name: "Classic Band Ring",
    subtitle: "22kt Yellow Gold · Plain",
    price: "₹3,499",
    tag: "Bestseller",
    rating: 4,
    reviewCount: 445,
    category: "Rings",
    description:
      "A plain, weighty band ring in 22kt BIS hallmarked gold. Simple. Pure. Eternal. Free sizing included.",
    href: "/products/band-ring-plain",
    images: [
      {
        src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
        alt: "Classic Band Ring",
      },
    ],
    sizes: [
      { label: "18", available: true },
      { label: "20", available: true },
      { label: "22", available: true },
      { label: "24", available: true },
      { label: "26", available: true },
    ],
  },

  // ── BRACELETS ─────────────────────────────────────────────────────
  {
    id: "link-bracelet-gold",
    name: "Link Bracelet",
    subtitle: "22kt Yellow Gold · 8 inch",
    price: "₹7,199",
    tag: "Limited",
    rating: 5,
    reviewCount: 98,
    category: "Bracelets",
    description:
      "Rectangular flat links in 22kt gold, connected by a smooth pivot hinge. A modern statement for the man who layers.",
    href: "/products/link-bracelet-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=600&q=80",
        alt: "Link Bracelet Gold",
      },
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80",
        alt: "Link Bracelet clasp",
      },
    ],
    sizes: [
      { label: '7"', available: true },
      { label: '8"', available: true },
      { label: '9"', available: false },
    ],
  },
  {
    id: "cord-bracelet-gold",
    name: "Cord Bracelet",
    subtitle: "22kt Yellow Gold · Minimal",
    price: "₹3,899",
    tag: "Bestseller",
    rating: 4,
    reviewCount: 567,
    category: "Bracelets",
    description:
      "Our thinnest, most wearable bracelet. A fine twisted cord in 22kt gold — perfect for daily wear or layering with a Kada.",
    href: "/products/cord-bracelet-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&q=80",
        alt: "Cord Bracelet Gold",
      },
    ],
    sizes: [
      { label: '7"', available: true },
      { label: '8"', available: true },
      { label: '9"', available: true },
    ],
  },

  // ── PENDANTS ──────────────────────────────────────────────────────
  {
    id: "sol-pendant-gold",
    name: "Sol Pendant",
    subtitle: "22kt Yellow Gold · Unisex",
    price: "₹4,499",
    tag: "New",
    rating: 5,
    reviewCount: 143,
    category: "Pendants",
    description:
      "A circular sun motif pendant in 22kt BIS hallmarked gold. Lightweight, flat, and refined — wears equally well on a Nawabi chain or a thin cord.",
    href: "/products/sol-pendant-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
        alt: "Sol Pendant Gold",
      },
    ],
    sizes: [{ label: "Free", available: true }],
  },
  {
    id: "om-pendant-22kt",
    name: "Om Pendant",
    subtitle: "22kt Yellow Gold · Sacred",
    price: "₹5,899",
    originalPrice: "₹6,499",
    tag: "Popular",
    rating: 5,
    reviewCount: 278,
    category: "Pendants",
    description:
      "A detailed Om symbol hand-carved in 22kt gold. One of our most beloved pieces — worn by men across generations as a symbol of strength and devotion.",
    href: "/products/om-pendant-22kt",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
        alt: "Om Pendant Gold",
      },
      {
        src: "https://images.unsplash.com/photo-1613053341085-db794820ce43?w=600&q=80",
        alt: "Om Pendant detail",
      },
    ],
    sizes: [{ label: "Free", available: true }],
  },
];

// ── Category list (auto-derived) ──────────────────────────────────
export const PRODUCT_CATEGORIES = [
  "All",
  ...Array.from(
    new Set(products.map((p) => p.category).filter(Boolean) as string[]),
  ),
];

// ── Tag list ──────────────────────────────────────────────────────
export const PRODUCT_TAGS = [
  "All",
  ...Array.from(
    new Set(products.map((p) => p.tag).filter(Boolean) as string[]),
  ),
];
