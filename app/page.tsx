import HeroSection from "@/app/component/website/Herosection";
import CategoriesSection from "@/app/component/website/Categoriessection";
import BestsellersSection from "@/app/component/website/Bestsellerssection";
import BrandStorySection from "@/app/component/website/Brandstorysection";
import TestimonialsSection from "@/app/component/website/Testimonialssection";
import InstagramSection from "@/app/component/website/Instagramsection";
import ProductGridCarousel from "./component/website/Productgridcarousel";
import GoldPriceScroll from "./component/shared/GoldPriceScroll";
import HomeBlogSection from "./component/website/Homeblogsection";
import Stats from "./component/Stats";
import MenWomen from "./component/website/MenWomen";
import FAQs from "./component/website/FAQ";
import { homeFAQProps } from "./data/Faqdata";
import WhyChoose from "./component/website/WhyChoose";
import PopularSearch from "./component/website/PopularSearch";

import type { Metadata } from "next";
import Script from "next/script";
import OfferPopups, { OfferSlide } from "./component/website/OfferPopups.tsx";
import OfferPopup from "./component/website/OfferPopups.tsx";

export const metadata: Metadata = {
  title: "Shop Gold Plated Jewellery & One Gram Gold Jewellery ",
  description:
    "Explore Rehnoor Jewels' stunning collection of gold plated jewellery and one gram gold jewellery. Elegant designs, lasting shine - shop the latest styles today.",
  keywords: [
    "gold plated jewellery",
    "one gram gold jewellery",
    "imitation jewellery",
    "affordable gold jewellery",
    "rehnoor jewels",
  ],
  openGraph: {
    title: "Shop Gold Plated Jewellery & One Gram Gold Jewellery",
    description:
      "Explore Rehnoor Jewels' stunning collection of gold plated jewellery and one gram gold jewellery. Elegant designs, lasting shine - shop the latest styles today.",
    url: "https://www.rehnoorjewels.com/",
    images:
      "https://res.cloudinary.com/daw7tql02/image/upload/v1777545331/rehnoor-jewels-svg-logo_fsgs8y.svg",
    siteName: "Rehnoor Jewels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Gold Plated Jewellery & One Gram Gold Jewellery",
    description:
      "Explore Rehnoor Jewels' stunning collection of gold plated jewellery and one gram gold jewellery.",
    images:
      "https://res.cloudinary.com/daw7tql02/image/upload/v1777545331/rehnoor-jewels-svg-logo_fsgs8y.svg",
  },

  alternates: {
    canonical: "https://www.rehnoorjewels.com/",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.rehnoorjewels.com/#website",
  url: "https://www.rehnoorjewels.com/",
  name: "Rehnoor Jewels",
  description:
    "Shop gold plated jewellery and one gram gold jewellery collections for men and women.",
  publisher: {
    "@id": "https://www.rehnoorjewels.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://www.rehnoorjewels.com/products?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const ACTIVE_PROMOTIONS: OfferSlide[] = [
  {
    id: "promo-rings",
    imgSrc: "/ring2.png", // Replace with your target asset pathway
    alt: "Special Offer on Luxury Gold Plated Customization Rings Collection",
    link: "/collections/gold-plated-rings-for-women",
    coupons: ["BUY3GET2FREE", "BUY2GET1FREE"],
  },
  {
    id: "promo-earrings",
    imgSrc: "/Earring2.png",
    alt: "Bespoke One Gram Gold Layered Architectural Earring Articles Offer",
    link: "/collections/gold-plated-earrings-for-women",
    coupons: ["BUY3GET2FREE", "REHNOOR10"],
  },
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.rehnoorjewels.com/#organization",
  name: "Rehnoor Jewels",
  url: "https://www.rehnoorjewels.com/",
  logo: "https://www.rehnoorjewels.com/logo.png",

  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "8",
    bestRating: "5",
    worstRating: "1",
  },

  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Priya Sharma",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Really loved the gold-plated necklace. The shine is beautiful, and it looks very close to real gold. Perfect for both daily wear and small occasions.",
      itemReviewed: {
        "@type": "Product",
        name: "Gold-Plated Necklace",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Aman Verma",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Bought a bracelet and I'm happy with the quality. It's stylish, lightweight, and goes well with most outfits.",
      itemReviewed: {
        "@type": "Product",
        name: "Bracelet",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Neha Kapoor",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "The earrings I ordered are elegant and comfortable to wear. I received compliments the first time I wore them.",
      itemReviewed: {
        "@type": "Product",
        name: "Earrings",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Rahul Mehta",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Great collection for men. The chain I purchased looks premium, and the finishing is impressive.",
      itemReviewed: {
        "@type": "Product",
        name: "Men's Chain",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Simran Kaur",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Affordable yet high-end jewellery with great designs that give a luxurious look.",
      itemReviewed: {
        "@type": "Product",
        name: "Luxury Jewellery Collection",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Karan Malhotra",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "The ring looks classy and well-made. Even with daily wear, the shine remains.",
      itemReviewed: {
        "@type": "Product",
        name: "Premium Ring",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Anjali Gupta",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Ordered a jewellery gift set, and it arrived beautifully packaged. Excellent quality.",
      itemReviewed: {
        "@type": "Product",
        name: "Jewellery Gift Set",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Rohit Singh",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody:
        "Good quality jewellery that pairs perfectly with ethnic wear. Delivery was quick.",
      itemReviewed: {
        "@type": "Product",
        name: "Ethnic Jewellery Collection",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Website Schema */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Rehnoor Jewels",
            url: "https://www.rehnoorjewels.com/",
            logo: "https://www.rehnoorjewels.com/logo.png", // update if needed
            description:
              "Rehnoor Jewels redefines 1-gram gold jewellery - a fusion of heritage artistry and contemporary boldness.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8448581529",
              contactType: "customer service",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "10722, 4th Floor, Street 13, Pratap Nagar, Near SBI Bank",
              addressLocality: "Delhi",
              postalCode: "110007",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.instagram.com/rehnoorjewels",
              "https://www.facebook.com/profile.php?id=61572567415162",
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
            mainEntity: homeFAQProps.items.map((faq) => ({
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

      {/* Review Schema */}
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />

      {/* Page Component */}
      {/* <GoldPriceScroll /> */}
      <main>
        <OfferPopup slides={ACTIVE_PROMOTIONS} delaySeconds={2} />

        <HeroSection />
        {/* <CategoriesSection /> */}
        {/* <BestsellersSection /> */}
        <MenWomen />
        <Stats />
        <ProductGridCarousel />
        <BrandStorySection />
        <TestimonialsSection />
        <WhyChoose />
        <HomeBlogSection />
        {/* <InstagramSection /> */}
        <FAQs {...homeFAQProps} />
        {/* <PopularSearch /> */}
      </main>
    </>
  );
}
