"use client";

import CollectionsHero from "../component/website/pages/collection/CollectionsHero";
import CollectionsGrid from "../component/website/pages/collection/CollectionsGrid";
import TestimonialsSection from "../component/website/pages/collection/TestimonialsSection";
import TrustSection from "../component/website/pages/collection/TrustSection";
import NewsletterSection from "../component/website/NewsletterSection";

export default function CollectionsPage() {
  return (
    <>
      <main>
        <CollectionsHero />
        <CollectionsGrid />
        <TestimonialsSection />
        <TrustSection />
        <NewsletterSection />
      </main>
    </>
  );
}
