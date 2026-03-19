"use client";

import Footer from "../component/website/Footer";
import Navbar from "../component/website/Navbar";
import ProductGrid from "../component/website/pages/product/ProductGrid";
import ProductsHero from "../component/website/pages/product/ProductHero";
import ProductTestimonials from "../component/website/pages/product/ProductTestimonial";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsHero />
        <ProductGrid />
        <ProductTestimonials />
      </main>
      <Footer />
    </>
  );
}
