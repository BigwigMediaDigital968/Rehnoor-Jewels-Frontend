import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./component/website/Footer";
import DiscountPopup, {
  FloatingOfferBadge,
} from "./component/shared/DiscountPopup";
import NavbarNew from "./component/website/NavbarNew";
import Script from "next/script";

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
    icon: "rehnoor-jewels-svg-logo.svg",
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
  verification: {
    google: "xZ5KrWq2226rPvsPhIi-8jMOjyaqb_qBk9Mb5_SCz4E",
  },
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WBLXS066M3"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WBLXS066M3');
    `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wios29204d");
  `}
        </Script>

        {/* <DiscountPopup offerKey="welcome" /> */}
        <FloatingOfferBadge offerKey="welcome" />
        <NavbarNew />
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
