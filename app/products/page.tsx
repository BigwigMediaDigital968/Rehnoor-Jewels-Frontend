import ProductGrid from "../component/website/pages/product/ProductGrid";
import ProductsHero from "../component/website/pages/product/ProductHero";
import ProductTestimonials from "../component/website/pages/product/ProductTestimonial";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description:
    "Browse Rehnoor Jewels' full range of gold plated jewellery. Lightweight, anti-tarnish designs crafted for every style and occasion.",

  keywords: [
    "Rehnoor Jewels",
    "gold plated jewellery",
    "anti tarnish jewelry",
    "lightweight jewellery India",
    "fashion jewellery online",
    "jewellery shop Delhi",
    "buy jewellery online India",
  ],

  metadataBase: new URL("https://www.rehnoorjewels.com"),

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Shop All Jewellery – Rehnoor Jewels",
    description:
      "Explore our complete collection of gold plated, anti-tarnish jewellery designed for every occasion.",
    url: "https://www.rehnoorjewels.com/products",
    siteName: "Rehnoor Jewels",
    images: [
      {
        url: "https://www.rehnoorjewels.com/rehnoor-jewels-svg-logo.svg",
        width: 1200,
        height: 630,
        alt: "Rehnoor Jewels Jewellery Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop All Jewellery – Rehnoor Jewels",
    description:
      "Discover stylish, lightweight, anti-tarnish jewellery for every occasion.",
    images: ["https://www.rehnoorjewels.com/rehnoor-jewels-svg-logo.svg"],
  },

  category: "Jewelry",
};

export default function ProductsPage() {
  return (
    <main>
      <ProductsHero />
      <ProductGrid />
      <ProductTestimonials />
    </main>
  );
}
