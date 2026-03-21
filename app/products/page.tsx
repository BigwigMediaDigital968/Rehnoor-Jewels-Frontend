"use client";

import ProductGrid from "../component/website/pages/product/ProductGrid";
import ProductsHero from "../component/website/pages/product/ProductHero";
import ProductTestimonials from "../component/website/pages/product/ProductTestimonial";

export default function ProductsPage() {
  return (
    <>
      <main>
        <ProductsHero />
        <ProductGrid />
        <ProductTestimonials />
      </main>
    </>
  );
}
