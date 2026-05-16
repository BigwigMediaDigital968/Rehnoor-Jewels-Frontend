// app/contact/page.tsx

import ContactPage from "./ContactPag";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach out for order enquiries, sizing help, or custom jewelry pieces. Visit Rehnoor Jewels in Connaught Place, New Delhi, or connect online.",

  keywords: [
    "Rehnoor Jewels contact",
    "Contact Rehnoor Jewels",
    "jewelry store Delhi contact",
    "custom jewelry India",
    "gold jewelry Delhi",
  ],

  metadataBase: new URL("https://www.rehnoorjewels.com"),

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Rehnoor Jewels",
    description:
      "Get in touch for custom jewelry, orders, and support. Visit our Connaught Place store or contact us online.",
    url: "https://www.rehnoorjewels.com/contact",
    siteName: "Rehnoor Jewels",
    images: [
      {
        url: "https://www.rehnoorjewels.com/rehnoor-jewels-svg-logo.svg",
        width: 1200,
        height: 630,
        alt: "Rehnoor Jewels Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Rehnoor Jewels",
    description:
      "Reach out for jewelry enquiries, custom designs, or store visits in Delhi.",
    images: ["https://www.rehnoorjewels.com/rehnoor-jewels-svg-logo.svg"],
  },

  category: "Jewelry",
};

export default function Contact() {
  return <ContactPage />;
}
