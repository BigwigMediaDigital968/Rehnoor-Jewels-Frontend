// app/policies/cookies/page.tsx
"use client";

import { Cookie, Shield, Info, AlertTriangle } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
} from "../component/PolicyLayout";

// ─── Cookie Type Card ─────────────────────────────────────────────────────────
function CookieTypeCard({
  name,
  type,
  purpose,
  examples,
  canDisable,
}: {
  name: string;
  type: "essential" | "analytics" | "marketing" | "preference";
  purpose: string;
  examples: string[];
  canDisable: boolean;
}) {
  const typeColors = {
    essential: {
      bg: "rgba(0,55,32,0.05)",
      border: "rgba(0,55,32,0.15)",
      badge: "var(--rj-emerald)",
      label: "Essential",
    },
    analytics: {
      bg: "rgba(59,130,246,0.05)",
      border: "rgba(59,130,246,0.15)",
      badge: "#3b82f6",
      label: "Analytics",
    },
    marketing: {
      bg: "rgba(239,68,68,0.05)",
      border: "rgba(239,68,68,0.15)",
      badge: "#ef4444",
      label: "Marketing",
    },
    preference: {
      bg: "rgba(252,193,81,0.07)",
      border: "rgba(252,193,81,0.25)",
      badge: "#a07800",
      label: "Preference",
    },
  };
  const c = typeColors[type];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${c.border}` }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ background: c.bg }}
      >
        <div className="flex items-center gap-3">
          <Cookie size={14} style={{ color: c.badge }} />
          <p
            className="font-cinzel text-xs font-bold"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {name}
          </p>
          <span
            className="font-cinzel text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full font-bold"
            style={{ background: c.badge, color: "#fff" }}
          >
            {c.label}
          </span>
        </div>
        <span
          className="font-cinzel text-[9px] tracking-wider"
          style={{
            color: canDisable ? "var(--rj-ash)" : "var(--rj-emerald)",
            fontWeight: canDisable ? 400 : 700,
          }}
        >
          {canDisable ? "Optional" : "Required"}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 bg-white">
        <p
          className="text-sm mb-3"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            lineHeight: "1.7",
          }}
        >
          {purpose}
        </p>
        <div>
          <p
            className="font-cinzel text-[8px] tracking-widest uppercase mb-1.5"
            style={{ color: "var(--rj-ash)" }}
          >
            Examples
          </p>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <span
                key={ex}
                className="font-cinzel text-[8px] tracking-wider px-2 py-1 rounded-full"
                style={{
                  background: "var(--rj-ivory-dark)",
                  color: "var(--rj-ash)",
                  border: "1px solid var(--rj-bone)",
                }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CookiePolicyPage() {
  return (
    <PolicyPageShell
      activeKey="cookies"
      title="Cookie Policy"
      lastUpdated="01 April 2026"
    >
      {/* ── Introduction ── */}
      <PolicySection title="What Are Cookies?">
        <PolicyP>
          Cookies are small text files that are placed on your device (computer,
          smartphone, or tablet) when you visit a website. They are widely used
          to make websites work more efficiently, to remember your preferences,
          and to provide information to the website owners.
        </PolicyP>
        <PolicyP>
          This Cookie Policy explains how <strong>Rehnoor Jewels</strong> uses
          cookies and similar tracking technologies on{" "}
          <strong>rehnoorjewels.com</strong>. It should be read alongside our{" "}
          <a
            href="/policies/privacy"
            style={{ color: "var(--rj-emerald)", fontWeight: 600 }}
          >
            Privacy Policy
          </a>
          .
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Website", value: "rehnoorjewels.com" },
            { label: "Business", value: "Rehnoor Jewels, Delhi" },
            { label: "Cookie Types Used", value: "4 Categories" },
            { label: "Third-Party Cookies", value: "Google, Meta, Razorpay" },
          ]}
        />
      </PolicySection>

      {/* ── How We Use Cookies ── */}
      <PolicySection title="How We Use Cookies">
        <PolicyP>We use cookies for the following main purposes:</PolicyP>
        <PolicyList
          items={[
            "To enable core website functionality such as shopping cart, checkout, and user sessions",
            "To remember your preferences and settings for a better browsing experience",
            "To understand how visitors interact with our website through analytics",
            "To serve relevant advertisements on third-party platforms like Meta (Facebook/Instagram)",
            "To ensure the security of our website and prevent fraudulent activity",
            "To process payments securely through our payment gateway Razorpay",
          ]}
        />
      </PolicySection>

      {/* ── Cookie Types ── */}
      <PolicySection title="Types of Cookies We Use">
        <PolicyP>
          We use four categories of cookies on our website. Below is a detailed
          breakdown of each type, their purpose, and whether they can be
          disabled.
        </PolicyP>
        <div className="flex flex-col gap-4 mt-2">
          <CookieTypeCard
            name="Strictly Necessary Cookies"
            type="essential"
            purpose="These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences, logging in, adding items to your cart, or filling in forms. Without these cookies, the website cannot function properly."
            examples={[
              "Session ID",
              "Cart contents",
              "CSRF tokens",
              "Login state",
              "Checkout session",
            ]}
            canDisable={false}
          />

          <CookieTypeCard
            name="Analytics & Performance Cookies"
            type="analytics"
            purpose="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website. They help us understand which pages are the most and least popular and how visitors move around the site. All information collected is aggregated and anonymous."
            examples={[
              "_ga (Google Analytics)",
              "_gid",
              "_gat",
              "Google Tag Manager",
            ]}
            canDisable={true}
          />

          <CookieTypeCard
            name="Marketing & Targeting Cookies"
            type="marketing"
            purpose="These cookies may be set through our website by our advertising partners, primarily Meta (Facebook/Instagram). They may be used to build a profile of your interests and show you relevant advertisements on other sites. They work by uniquely identifying your browser and device."
            examples={[
              "_fbp (Facebook Pixel)",
              "_fbc",
              "fr (Facebook)",
              "Meta Conversions API",
            ]}
            canDisable={true}
          />

          <CookieTypeCard
            name="Preference / Functional Cookies"
            type="preference"
            purpose="These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages. If you disable these cookies, some or all of these services may not function properly."
            examples={[
              "Language preference",
              "Currency setting",
              "Recently viewed",
              "Wishlist state",
            ]}
            canDisable={true}
          />
        </div>
      </PolicySection>

      {/* ── Third-Party Cookies ── */}
      <PolicySection title="Third-Party Cookies">
        <PolicyP>
          In addition to our own cookies, third-party services we use may also
          set cookies on your device. We do not control these third-party
          cookies and they are governed by the respective third party's privacy
          policy.
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          {[
            {
              provider: "Google Analytics",
              cookies: "_ga, _gid, _gat",
              purpose:
                "Measures website traffic and user behaviour anonymously to help us improve our site experience.",
              optOut: "tools.google.com/dlpage/gaoptout",
            },
            {
              provider: "Meta (Facebook Pixel)",
              cookies: "_fbp, _fbc, fr",
              purpose:
                "Tracks website actions for ad targeting, measurement, and optimisation on Facebook and Instagram.",
              optOut: "facebook.com/settings → Ads → Ad Preferences",
            },
            {
              provider: "Razorpay",
              cookies: "Payment session cookies",
              purpose:
                "Securely processes payments and prevents fraudulent transactions. Essential for checkout.",
              optOut: "Cannot be disabled — required for payment processing",
            },
          ].map((t) => (
            <div
              key={t.provider}
              className="p-4 rounded-xl"
              style={{
                background: "var(--rj-ivory-dark)",
                border: "1px solid var(--rj-bone)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {t.provider}
                </p>
                <span
                  className="font-cinzel text-[8px] tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{
                    background: "rgba(0,55,32,0.08)",
                    color: "var(--rj-emerald)",
                  }}
                >
                  {t.cookies}
                </span>
              </div>
              <p
                className="text-xs mb-2"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {t.purpose}
              </p>
              <div className="flex items-start gap-1.5">
                <span
                  className="font-cinzel text-[8px] tracking-widest uppercase flex-shrink-0 mt-0.5"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Opt-Out:
                </span>
                <span
                  className="font-cinzel text-[9px]"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {t.optOut}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* ── Cookie Duration ── */}
      <PolicySection title="Cookie Duration">
        <PolicyP>Cookies we use fall into two duration categories:</PolicyP>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(0,55,32,0.04)",
              border: "1px solid rgba(0,55,32,0.1)",
            }}
          >
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2"
              style={{ color: "var(--rj-emerald)" }}
            >
              Session Cookies
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              These are temporary cookies that expire when you close your
              browser. They are used to maintain your session while you browse —
              for example, keeping items in your cart during a visit.
            </p>
          </div>
          <div
            className="p-5 rounded-xl"
            style={{
              background: "rgba(252,193,81,0.06)",
              border: "1px solid rgba(252,193,81,0.2)",
            }}
          >
            <p
              className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2"
              style={{ color: "#a07800" }}
            >
              Persistent Cookies
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
              }}
            >
              These remain on your device for a set period (days to years) or
              until you delete them. They are used to remember your preferences
              across multiple visits and for analytics and marketing purposes.
            </p>
          </div>
        </div>
        <div className="mt-3">
          <InfoGrid
            items={[
              { label: "Session Cookies", value: "Expire on browser close" },
              { label: "Google Analytics", value: "2 years (_ga cookie)" },
              { label: "Facebook Pixel", value: "90 days (_fbp cookie)" },
              { label: "Preference Cookies", value: "1 year typically" },
            ]}
          />
        </div>
      </PolicySection>

      {/* ── How to Manage ── */}
      <PolicySection title="How to Manage & Control Cookies">
        <PolicyP>
          You have the right to decide whether to accept or reject optional
          cookies. You can exercise your cookie preferences through the
          following methods:
        </PolicyP>

        <HighlightBox
          icon={<Info size={14} />}
          title="Browser Cookie Settings"
          variant="green"
        >
          Most web browsers allow you to control cookies through their settings.
          You can usually find cookie settings under "Privacy", "Security", or
          "Site Settings" in your browser's preferences menu.
        </HighlightBox>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {[
            {
              browser: "Google Chrome",
              path: "Settings → Privacy and Security → Cookies and other site data",
            },
            {
              browser: "Mozilla Firefox",
              path: "Options → Privacy & Security → Cookies and Site Data",
            },
            {
              browser: "Safari (iOS/Mac)",
              path: "Settings → Safari → Privacy & Security → Block All Cookies",
            },
            {
              browser: "Microsoft Edge",
              path: "Settings → Cookies and site permissions → Cookies and site data",
            },
          ].map((b) => (
            <div
              key={b.browser}
              className="p-3.5 rounded-xl"
              style={{
                background: "var(--rj-ivory-dark)",
                border: "1px solid var(--rj-bone)",
              }}
            >
              <p
                className="font-cinzel text-[10px] font-bold mb-1"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {b.browser}
              </p>
              <p
                className="text-xs"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {b.path}
              </p>
            </div>
          ))}
        </div>

        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Impact of Disabling Cookies"
          variant="gold"
        >
          Please note that disabling cookies may affect the functionality of our
          website. In particular, disabling essential cookies will prevent you
          from adding items to your cart and completing a purchase. Disabling
          optional cookies will not affect your ability to browse or buy from
          Rehnoor Jewels.
        </HighlightBox>
      </PolicySection>

      {/* ── Opt-Out Links ── */}
      <PolicySection title="Opt-Out from Third-Party Tracking">
        <PolicyP>
          You can opt out of third-party tracking cookies through the following
          official opt-out tools:
        </PolicyP>
        <PolicyList
          items={[
            "Google Analytics Opt-Out: Install the Google Analytics Opt-out Browser Add-on from tools.google.com/dlpage/gaoptout",
            "Facebook/Meta Ad Preferences: Visit facebook.com/settings → Ads → Ad Preferences to manage your ad data",
            "Your Online Choices (EU): Visit youronlinechoices.eu to manage interest-based advertising",
            "Network Advertising Initiative: Visit optout.networkadvertising.org",
            "Digital Advertising Alliance: Visit aboutads.info/choices",
          ]}
        />
      </PolicySection>

      {/* ── Do Not Track ── */}
      <PolicySection title="Do Not Track (DNT) Signals">
        <PolicyP>
          Some browsers include a "Do Not Track" (DNT) feature that signals to
          websites that you do not wish to be tracked. Currently, there is no
          universal standard for how websites should respond to DNT signals. At
          this time, our website does not respond differently to DNT signals,
          but we remain committed to providing transparent cookie controls as
          described in this policy.
        </PolicyP>
      </PolicySection>

      {/* ── Changes ── */}
      <PolicySection title="Changes to This Cookie Policy">
        <PolicyP>
          We may update this Cookie Policy from time to time to reflect changes
          in the cookies we use or for other operational, legal, or regulatory
          reasons. Any changes will be posted on this page with an updated
          revision date.
        </PolicyP>
        <PolicyP>
          For any questions about our use of cookies, please contact us at{" "}
          <strong>hello@rehnoorjewels.com</strong>.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Email", value: "hello@rehnoorjewels.com" },
            { label: "WhatsApp", value: "+91 84485 81529" },
            { label: "Response Time", value: "Within 24 Business Hours" },
            { label: "Support Hours", value: "Mon–Sat, 10 AM – 6 PM" },
          ]}
        />
      </PolicySection>
    </PolicyPageShell>
  );
}
