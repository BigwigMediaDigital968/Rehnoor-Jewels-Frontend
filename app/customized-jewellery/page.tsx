import type { Metadata } from "next";
import FAQs from "../component/website/FAQ";
import { customizedJewelleryFAQProps } from "../data/Faqdata";
import CustomAbout from "./component/CustomAbout";
import CustomBooking from "./component/CustomBooking";
import CustomCTA from "./component/CustomCTA";
import CustomHero from "./component/Customhero";
import CustomJewel from "./component/CustomJewels";
import CustomLeadForm from "./component/CustomLeadForm";
import CustomPricing from "./component/CustomPricing";
import CustomProcess from "./component/CustomProcess";
import Customtable from "./component/CustomTable";
import CustomTestimonial from "./component/CustomTestimonial";

// Next.js App Router Metadata Configuration
export async function generateMetadata(): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rehnoorjewels.com";
  const title = "Customized Jewellery in Gold & Diamonds";
  const description =
    "Customized Jewellery in 14K–22K gold & natural diamonds. Transparent pricing, WhatsApp consultation. Only at Rehnoor Jewels.";

  const keywords = [
    "customized jewellery",
    "customised jewellery",
    "custom gold jewellery",
    "custom diamond jewellery",
    "14K gold jewellery",
    "22K gold jewellery",
    "natural diamond jewellery",
    "certified diamond jewellery",
    "fine jewellery online India",
    "demi fine jewellery",
    "semi fine jewellery",
    "personalised jewellery India",
    "bespoke jewellery",
    "jewellery on order",
    "diamond jewellery VS SI clarity",
    "G H color diamond jewellery",
    "Rehnoor Jewels",
    "customized jewellery India",
    "gold jewellery price on request",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${siteUrl}/customized-jewellery`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/customized-jewellery`,
      siteName: "Rehnoor Jewels",
      type: "website",
      images: [
        {
          url: "/customize/custom-bg.png", // Ensure this asset paths to your dynamic public folder
          width: 1200,
          height: 630,
          alt: "Bespoke Luxury Customized Jewellery Suite by Rehnoor Jewels",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/customize/custom-bg.png"],
    },
  };
}

// ─────────────────────────────────────────────────────────────────
// PAGE COMPONENT WITH INLINE STRUCTURED SCHEMAS
// ─────────────────────────────────────────────────────────────────
export default function CustomJewelleryPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rehnoorjewels.com";

  // 1. Organization & AggregateRating Integrated Base Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Rehnoor Jewels",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://instagram.com/rehnoorjewels", // Update your active social handles here
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // 2. BreadcrumbList Structured Schema Map
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Customized Jewellery",
        item: `${siteUrl}/customized-jewellery`,
      },
    ],
  };

  // Helper function to safely extract string data from mixed string/object arrays
  const extractAnswerText = (answer: any): string => {
    if (typeof answer === "string") return answer;
    if (Array.isArray(answer)) {
      return answer
        .map((node) => {
          if (typeof node === "string") return node;
          // If it's an object created by a link/text helper, look for children, text, or fallback values
          return node?.text || node?.children || node?.props?.children || "";
        })
        .join("");
    }
    return "";
  };

  // 3. Dynamic FAQPage Generation via Faqdata Properties Mapping
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: customizedJewelleryFAQProps.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: extractAnswerText(item.answer),
      },
    })),
  };

  return (
    <>
      {/* Structural Schema Engine Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Structural Page Elements Layout Flow */}
      <CustomHero />
      <CustomAbout />
      <Customtable />
      <CustomJewel />
      <CustomProcess />
      <CustomPricing />
      <CustomTestimonial />
      <CustomBooking />
      <CustomLeadForm />
      <FAQs {...customizedJewelleryFAQProps} />
      <CustomCTA />
    </>
  );
}
