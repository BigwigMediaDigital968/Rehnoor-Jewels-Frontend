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
import RecentlyViewedFloating from "./products/[slug]/component/RecentlyViewedFloating";
import ScrollToTop from "./component/ScrollToTop";
import { Suspense } from "react";
import { CartDrawerWrapper } from "./component/website/cart/Cartdrawerwrapper";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display", // ✅ matches var(--font-display) in CSS
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rehnoor Jewels | Gold Reimagined",
    template: "%s | Rehnoor Jewels",
  },
  description:
    "Explore Rehnoor Jewels' stunning collection of gold plated jewellery and one gram gold jewellery. Elegant designs, lasting shine - shop the latest styles today.",
  keywords: [
    "men's jewellery",
    "gold jewellery India",
    "men's gold chain",
    "men's kada",
    "men's bracelet",
    "Rehnoor Jewels",
  ],
  icons: {
    icon: "/logo-green-bg.png",
  },
  authors: [{ name: "Rehnoor Jewels" }],
  creator: "Rehnoor Jewels",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rehnoorjewels.com",
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
        {/* <Script
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
        </Script> */}

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
        {/* <!-- Meta Pixel Code --> */}

<Script id="facebook-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1037782932526589');
          fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1037782932526589&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* <!-- End Meta Pixel Code --> */}

        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        {/* <DiscountPopup offerKey="welcome" /> */}
        {/* <FloatingOfferBadge offerKey="welcome" /> */}

        <CartDrawerWrapper />

        <NavbarNew />
        {children}

        <RecentlyViewedFloating />
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
