import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/website/Navbar";
import Footer from "./component/website/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display", // ✅ matches var(--font-display) in CSS
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body", // ✅ matches var(--font-body) in CSS
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-accent", // ✅ matches var(--font-accent) in CSS
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rehnoor Jewels | Gold Reimagined",
    template: "%s | Rehnoor Jewels",
  },
  description:
    "Discover India's finest men's gold jewellery. Chains, Kadas, Rings, Bracelets — crafted for the modern man. Gold Reimagined.",
  keywords: [
    "men's jewellery",
    "gold jewellery India",
    "men's gold chain",
    "men's kada",
    "men's bracelet",
    "Rehnoor Jewels",
  ],
  icons: {
    icon: "rehnoor-logo.jpeg",
  },
  authors: [{ name: "Rehnoor Jewels" }],
  creator: "Rehnoor Jewels",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rehnoorrjewels.com",
    siteName: "Rehnoor Jewels",
    title: "Rehnoor Jewels - Gold Reimagined",
    description: "India's premier destination for men's gold jewellery",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003720",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // next/font injects --font-display, --font-body, --font-accent as CSS vars on <html>
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#003720",
              color: "#fcc151",
              fontFamily: "var(--font-accent), Cinzel, Georgia, serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              border: "1px solid rgba(252,193,81,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
