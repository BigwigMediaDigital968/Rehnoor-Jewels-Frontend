import type { Metadata } from "next";

import CollectionsHero from "../component/website/pages/collection/CollectionsHero";
import CollectionsGrid from "../component/website/pages/collection/CollectionsGrid";
import TestimonialsSection from "../component/website/pages/collection/TestimonialsSection";
import TrustSection from "../component/website/pages/collection/TrustSection";
import NewsletterSection from "../component/website/NewsletterSection";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Explore All Jewellery Collections",
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
      {/* SEO Schema */}

      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Jewellery Collections – Rehnoor Jewels",
            description:
              "Browse all collections including chains, rings, bracelets, kadas, pendants and more at Rehnoor Jewels.",
            url: "https://www.rehnoorjewels.com/collections",
            mainEntity: {
              "@type": "ItemList",
              itemListOrder: "http://schema.org/ItemListOrderAscending",
              numberOfItems: 12,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Chains for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-chains-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Kadas for Men",
                  url: "https://www.rehnoorjewels.com/collections/kada-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Rings for Men",
                  url: "https://www.rehnoorjewels.com/collections/rings-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Bracelets for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-bracelets-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Pendants for Men",
                  url: "https://www.rehnoorjewels.com/collections/pendants-for-men",
                },
                // {
                //   "@type": "ListItem",
                //   position: 6,
                //   name: "New Arrivals",
                //   url: "https://www.rehnoorjewels.com/collections/new-arrivals",
                // },
                {
                  "@type": "ListItem",
                  position: 7,
                  name: "Chains for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-chains-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  name: "Rings for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-rings-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 9,
                  name: "Pendants for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-pendants-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 10,
                  name: "Mangalsutra",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-mangalsutra-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 11,
                  name: "Rani Haar",
                  url: "https://www.rehnoorjewels.com/collections/rani-haar-designed-for-every-women",
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
