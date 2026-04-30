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

export const metadata: Metadata = {
  title: "Shop Gold Plated Jewellery & One Gram Gold Jewellery",
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

export default function HomePage() {
  return (
    <>
      {/* SEO Tags */}

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
              "https://www.instagram.com/", // add real links later
              "https://www.facebook.com/",
            ],
          }),
        }}
      />

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

      {/* Page Component */}
      {/* <GoldPriceScroll /> */}
      <main>
        <HeroSection />
        <CategoriesSection />
        <Stats />
        <BestsellersSection />
        <MenWomen />
        <ProductGridCarousel />
        <BrandStorySection />
        <TestimonialsSection />
        <WhyChoose />
        {/* <HomeBlogSection /> */}
        {/* <InstagramSection /> */}
        <FAQs {...homeFAQProps} />
        {/* <PopularSearch /> */}
      </main>
    </>
  );
}
