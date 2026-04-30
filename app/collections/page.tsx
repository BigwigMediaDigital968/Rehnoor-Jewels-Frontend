import type { Metadata } from "next";

import CollectionsHero from "../component/website/pages/collection/CollectionsHero";
import CollectionsGrid from "../component/website/pages/collection/CollectionsGrid";
import TestimonialsSection from "../component/website/pages/collection/TestimonialsSection";
import TrustSection from "../component/website/pages/collection/TrustSection";
import NewsletterSection from "../component/website/NewsletterSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Explore All Jewellery Collections | Rehnoor Jewels",
  description:
    "Discover Rehnoor Jewels' curated collections of gold plated jewellery for every occasion. From bracelets to necklaces, find your perfect piece today.",
  keywords: [
    "jewellery collections",
    "gold plated collections",
    "one gram gold jewellery",
    "bracelets",
    "necklaces",
    "rings",
    "rehnoor jewels collections",
  ],
  alternates: {
    canonical: "https://www.rehnoorjewels.com/collections",
  },
  openGraph: {
    title: "Explore All Jewellery Collections | Rehnoor Jewels",
    description:
      "Discover curated gold plated jewellery collections for every occasion.",
    images:
      "https://res.cloudinary.com/daw7tql02/image/upload/v1777545331/rehnoor-jewels-svg-logo_fsgs8y.svg",
    url: "https://www.rehnoorjewels.com/collections",
    siteName: "Rehnoor Jewels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore All Jewellery Collections | Rehnoor Jewels",
    description:
      "Browse bracelets, necklaces, rings and more from Rehnoor Jewels.",
    images:
      "https://res.cloudinary.com/daw7tql02/image/upload/v1777545331/rehnoor-jewels-svg-logo_fsgs8y.svg",
  },
};

export default function CollectionsPage() {
  return (
    <>
      {/* SEO Tags */}

      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Jewellery Collections",
            description:
              "Explore all gold plated jewellery collections from Rehnoor Jewels.",
            url: "https://www.rehnoorjewels.com/collections",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Chains",
                  url: "https://www.rehnoorjewels.com/collections/chains",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Rings",
                  url: "https://www.rehnoorjewels.com/collections/rings",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Bracelets",
                  url: "https://www.rehnoorjewels.com/collections/bracelets",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Kadas",
                  url: "https://www.rehnoorjewels.com/collections/kadas",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Pendants",
                  url: "https://www.rehnoorjewels.com/collections/pendants",
                },
              ],
            },
          }),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.rehnoorjewels.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collections",
                item: "https://www.rehnoorjewels.com/collections",
              },
            ],
          }),
        }}
      />

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
