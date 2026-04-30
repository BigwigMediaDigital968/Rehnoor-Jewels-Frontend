import type { Metadata } from "next";

import AboutHero from "./component/AboutHero";
import OurStory from "./component/AboutStory";
import WhyTrustUs from "./component/WhyTrustUs";
import Features from "./component/Features";
import OurPartners from "./component/OurPartners";
import OurTeam from "./component/OurTeam";
import SocialFeed from "../component/website/SocialFeed";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Rehnoor Jewels | Our Story & Craftsmanship",
  description:
    "Learn about Rehnoor Jewels, a brand built on elegance, quality, and craftsmanship. Discover the passion behind every gold plated piece we create.",
  keywords: [
    "about rehnoor jewels",
    "gold jewellery brand india",
    "one gram gold jewellery brand",
    "jewellery craftsmanship",
    "rehnoor story",
  ],
  alternates: {
    canonical: "https://www.rehnoorjewels.com/about",
  },
  openGraph: {
    title: "About Rehnoor Jewels | Our Story & Craftsmanship",
    description:
      "Discover the story, values, and craftsmanship behind Rehnoor Jewels.",
    url: "https://www.rehnoorjewels.com/about",
    siteName: "Rehnoor Jewels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rehnoor Jewels",
    description:
      "Explore the story and craftsmanship behind our jewellery brand.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* SEO tags */}

      <Script
        id="about-org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Rehnoor Jewels",
            url: "https://www.rehnoorjewels.com/about",
            description:
              "Learn about Rehnoor Jewels, a brand built on elegance, quality, and craftsmanship.",
            mainEntity: {
              "@type": "Organization",
              name: "Rehnoor Jewels",
              url: "https://www.rehnoorjewels.com/",
              logo: "https://res.cloudinary.com/daw7tql02/image/upload/v1777545331/rehnoor-jewels-svg-logo_fsgs8y.svg",
              description:
                "Rehnoor Jewels redefines 1-gram gold jewellery with a fusion of heritage artistry and modern elegance.",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "10722, 4th Floor, Street 13, Pratap Nagar, Near SBI Bank",
                addressLocality: "Delhi",
                postalCode: "110007",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8448581529",
                contactType: "customer support",
                areaServed: "IN",
              },
            },
          }),
        }}
      />

      <Script
        id="about-breadcrumb"
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
                name: "About",
                item: "https://www.rehnoorjewels.com/about",
              },
            ],
          }),
        }}
      />

      <main>
        <AboutHero />
        <OurStory />
        <WhyTrustUs />
        <Features />
        {/* <OurPartners /> */}
        {/* <OurTeam /> */}
        {/* <SocialFeed /> */}
      </main>
    </>
  );
}
