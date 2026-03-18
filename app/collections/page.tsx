"use client";

import CollectionsHero from "../component/website/pages/collection/CollectionsHero";
import Navbar from "../component/website/Navbar";
import CollectionsGrid from "../component/website/pages/collection/CollectionsGrid";
import TestimonialsSection from "../component/website/pages/collection/TestimonialsSection";
import TrustSection from "../component/website/pages/collection/TrustSection";
import NewsletterSection from "../component/website/NewsletterSection";
import Footer from "../component/website/Footer";

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <CollectionsHero />
        <CollectionsGrid />
        <TestimonialsSection />
        <TrustSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
