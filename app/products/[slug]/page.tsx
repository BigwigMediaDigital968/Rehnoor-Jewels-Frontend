// app/products/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────
// Product detail page — assembles all sections.
// Replace PRODUCT_MAP with API fetch by slug when backend is ready.
// ─────────────────────────────────────────────────────────────────
import ProductDetailHero from "./component/ProductDetailhero";
import ProductTabs from "./component/Producttabs";
import ProductReviews from "./component/Productreviews";
import RelatedProducts from "./component/Relatedproducts";
import type { Product } from "../../types/Product.types";

// ── Static product map ──────────────────────────────────────────
const PRODUCT_MAP: Record<string, Product> = {
  "nawabi-chain-22kt": {
    id: "nawabi-chain-22kt",
    name: "Nawabi Chain",
    subtitle: "22kt Yellow Gold · 18 inch",
    price: "₹8,999",
    originalPrice: "₹10,499",
    tag: "Bestseller",
    rating: 5,
    reviewCount: 248,
    category: "Chains",
    purity: "22kt",
    description:
      "A bold, hand-crafted Nawabi chain in BIS hallmarked 22kt gold. Each link is individually set and polished for a mirror finish. Iconic heritage, modern weight.",
    href: "/products/nawabi-chain-22kt",
    images: [
      {
        src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85",
        alt: "Nawabi Chain front",
      },
      {
        src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85",
        alt: "Nawabi Chain clasp",
      },
      {
        src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
        alt: "Nawabi Chain on neck",
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
  "royal-kada-heavy": {
    id: "royal-kada-heavy",
    name: "Royal Kada",
    subtitle: "22kt Yellow Gold · Adjustable",
    price: "₹12,499",
    originalPrice: "₹14,999",
    tag: "New",
    rating: 5,
    reviewCount: 189,
    category: "Kadas",
    purity: "22kt",
    description:
      "A heavy, solid Royal Kada forged in 22kt gold. Smooth cylindrical form with a brushed exterior and polished edges — the mark of a man who doesn't compromise.",
    href: "/products/royal-kada-heavy",
    images: [
      {
        src: "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=800&q=85",
        alt: "Royal Kada",
      },
      {
        src: "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=800&q=85",
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
  "signet-ring-gold": {
    id: "signet-ring-gold",
    name: "Signet Ring",
    subtitle: "22kt Yellow Gold · Men's",
    price: "₹5,299",
    originalPrice: "₹6,200",
    tag: "Popular",
    rating: 5,
    reviewCount: 312,
    category: "Rings",
    purity: "22kt",
    description:
      "A flat-top signet ring in solid 22kt gold. Free custom engraving on every order. Your name, your family crest, or a date — worn forever.",
    href: "/products/signet-ring-gold",
    images: [
      {
        src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85",
        alt: "Signet Ring",
      },
      {
        src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85",
        alt: "Signet Ring detail",
      },
    ],
    sizes: [
      { label: "18", available: true },
      { label: "20", available: true },
      { label: "22", available: true },
      { label: "24", available: true },
      { label: "26", available: false },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PRODUCT_MAP).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PRODUCT_MAP[params.slug];
  if (!p) return { title: "Product | Rehnoor Jewels" };
  return {
    title: `${p.name} | Rehnoor Jewels`,
    description: p.description,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCT_MAP[params.slug] ?? PRODUCT_MAP["nawabi-chain-22kt"];
  const collectionSlug = (product.category ?? "chains").toLowerCase();

  return (
    <>
      <main>
        {/* 1 — Hero: gallery + add to cart + trust */}
        <ProductDetailHero product={product} />

        {/* 2 — Specs / Care / Shipping / Returns tabs */}
        <ProductTabs />

        {/* 3 — Reviews + Add Review modal */}
        <ProductReviews />

        {/* 4 — Related products from same collection */}
        <RelatedProducts collectionSlug={collectionSlug} />
      </main>
    </>
  );
}
