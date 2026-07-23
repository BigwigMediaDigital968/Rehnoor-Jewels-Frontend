import type { Metadata } from "next";

import CollectionsHero from "../component/website/pages/collection/CollectionsHero";
import CollectionsGrid from "../component/website/pages/collection/CollectionsGrid";
import TestimonialsSection from "../component/website/pages/collection/TestimonialsSection";
import TrustSection from "../component/website/pages/collection/TrustSection";
import NewsletterSection from "../component/website/NewsletterSection";
import Script from "next/script";
import { collectionFAQProps } from "../data/Faqdata";

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
                  name: "Gold Plated Chains for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-chains-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Gold Plated Kadas for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-kada-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Gold Plated Rings for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-rings-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Gold Plated Bracelets for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-bracelets-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Gold Plated Pendants for Men",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-pendants-for-men",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Gold Plated Chains for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-chains-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 7,
                  name: "Gold Plated Rings for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-rings-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 8,
                  name: "Gold Plated Pendants for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-pendants-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 9,
                  name: "Gold Plated Mangalsutra",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-mangalsutra-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 10,
                  name: "Gold Plated Necklaces for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-necklaces-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 11,
                  name: "Gold Plated Ear-rings for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-earrings-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 12,
                  name: "Gold Plated Bracelet for Women",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-bracelets-for-women",
                },
                {
                  "@type": "ListItem",
                  position: 13,
                  name: "Gold Plated Necklace with Ear-rings",
                  url: "https://www.rehnoorjewels.com/collections/gold-plated-necklace-with-earrings",
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

      {/* FAQ Schema */}

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: collectionFAQProps.items.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
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
