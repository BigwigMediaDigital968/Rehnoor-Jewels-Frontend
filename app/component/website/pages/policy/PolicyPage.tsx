// app/policies/page.tsx  — All Policy Pages for Rehnoor Jewels
// Single file, tab-based navigation between all 5 policy documents.
// Matches the Rehnoor brand: emerald / gold / ivory, Cinzel + Cormorant fonts.
// Compliant with: Google Merchant Center, Razorpay KYC, Indian Consumer Law.
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  RefreshCw,
  Truck,
  Lock,
  FileText,
  XCircle,
  Package,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────
type PolicyKey = "shipping" | "returns" | "privacy" | "terms" | "cancellation";

// ─── Policy Tab Config ────────────────────────────────────────────
const TABS: { key: PolicyKey; label: string; icon: React.ReactNode }[] = [
  { key: "shipping", label: "Shipping Policy", icon: <Truck size={14} /> },
  { key: "returns", label: "Return & Refund", icon: <RefreshCw size={14} /> },
  { key: "privacy", label: "Privacy Policy", icon: <Lock size={14} /> },
  { key: "terms", label: "Terms & Conditions", icon: <FileText size={14} /> },
  {
    key: "cancellation",
    label: "Cancellation Policy",
    icon: <XCircle size={14} />,
  },
];

// ─── Shared Layout Helpers ────────────────────────────────────────
function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2
        className="font-cormorant font-light mb-4 pb-3"
        style={{
          fontSize: "1.5rem",
          color: "var(--rj-charcoal)",
          borderBottom: "1px solid var(--rj-bone)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function PolicyP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-sm leading-relaxed"
      style={{
        color: "var(--rj-ash)",
        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
        lineHeight: "1.8",
      }}
    >
      {children}
    </p>
  );
}

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle
            size={13}
            style={{ color: "var(--rj-emerald)", flexShrink: 0, marginTop: 3 }}
          />
          <span
            className="text-sm leading-relaxed"
            style={{
              color: "var(--rj-ash)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function HighlightBox({
  icon,
  title,
  children,
  variant = "green",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  variant?: "green" | "gold" | "red";
}) {
  const colors = {
    green: {
      bg: "rgba(0,55,32,0.05)",
      border: "rgba(0,55,32,0.12)",
      icon: "var(--rj-emerald)",
    },
    gold: {
      bg: "rgba(252,193,81,0.08)",
      border: "rgba(252,193,81,0.25)",
      icon: "#a07800",
    },
    red: {
      bg: "rgba(239,68,68,0.05)",
      border: "rgba(239,68,68,0.2)",
      icon: "#ef4444",
    },
  };
  const c = colors[variant];
  return (
    <div
      className="flex gap-3 p-4 rounded-xl"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <div style={{ color: c.icon, flexShrink: 0, marginTop: 2 }}>{icon}</div>
      <div>
        <p
          className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
          style={{ color: c.icon }}
        >
          {title}
        </p>
        <div
          className="text-sm leading-relaxed"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function InfoGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="p-3.5 rounded-xl"
          style={{
            background: "var(--rj-ivory-dark)",
            border: "1px solid var(--rj-bone)",
          }}
        >
          <p
            className="font-cinzel text-[8px] tracking-widest uppercase mb-1"
            style={{ color: "var(--rj-ash)" }}
          >
            {item.label}
          </p>
          <p
            className="font-cinzel text-xs font-bold"
            style={{ color: "var(--rj-charcoal)" }}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// POLICY CONTENT COMPONENTS
// ─────────────────────────────────────────────────────────────────

function ShippingPolicy() {
  return (
    <div>
      <PolicySection title="Overview">
        <PolicyP>
          At Rehnoor Jewels, we are committed to delivering your precious gold
          jewellery safely and promptly across India. All shipments are handled
          with utmost care and dispatched through our trusted courier partner.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Courier Partner", value: "ShipRocket Network" },
            { label: "Delivery Coverage", value: "Pan India" },
            { label: "Order Processing", value: "24–48 Hours" },
            { label: "Support Hours", value: "10:00 AM – 6:00 PM" },
          ]}
        />
      </PolicySection>

      <PolicySection title="Shipping Destinations">
        <PolicyP>
          We currently ship to all serviceable pin codes across India.
          International shipping is not available at this time. For pin code
          serviceability, please enter your delivery address at checkout.
        </PolicyP>
        <HighlightBox
          icon={<Truck size={14} />}
          title="India-Wide Delivery"
          variant="green"
        >
          We deliver to all major cities, towns, and serviceable rural pin codes
          through the ShipRocket logistics network, covering 29,000+ pin codes
          across India.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Order Processing Time">
        <PolicyP>
          All orders placed on Rehnoor Jewels are processed within{" "}
          <strong>24–48 business hours</strong> from the time of order
          confirmation. Orders placed on weekends or public holidays will be
          processed on the next working business day.
        </PolicyP>
        <PolicyList
          items={[
            "Orders confirmed before 12:00 PM are processed the same day",
            "Orders confirmed after 12:00 PM are processed the next business day",
            "Processing time excludes Sundays and national public holidays",
            "You will receive a shipping confirmation email with tracking details once dispatched",
          ]}
        />
      </PolicySection>

      <PolicySection title="Delivery Timelines">
        <PolicyP>
          Delivery timelines depend on the courier partner's Turn Around Time
          (TAT) and your delivery location. Estimated delivery windows are as
          follows:
        </PolicyP>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          {[
            {
              zone: "Metro Cities",
              time: "3–5 Business Days",
              cities: "Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata",
            },
            {
              zone: "Tier 2 & 3 Cities",
              time: "5–7 Business Days",
              cities: "Jaipur, Surat, Lucknow, Nagpur, Indore, etc.",
            },
            {
              zone: "Remote Areas",
              time: "7–10 Business Days",
              cities: "Northeast India, remote PIN codes, hilly regions",
            },
          ].map((z) => (
            <div
              key={z.zone}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(0,55,32,0.04)",
                border: "1px solid rgba(0,55,32,0.1)",
              }}
            >
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
                style={{ color: "var(--rj-emerald)" }}
              >
                {z.zone}
              </p>
              <p
                className="font-cinzel text-sm font-bold mb-1"
                style={{ color: "var(--rj-charcoal)" }}
              >
                {z.time}
              </p>
              <p
                className="text-xs"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {z.cities}
              </p>
            </div>
          ))}
        </div>
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Please Note"
          variant="gold"
        >
          Delivery timelines are estimates provided by the courier partner and
          may vary due to factors beyond our control including festivals,
          extreme weather, strikes, or natural calamities. Rehnoor Jewels is not
          liable for delays caused by courier partners or force majeure events.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Shipping Charges">
        <PolicyP>
          Shipping charges are calculated at checkout based on the order weight,
          dimensions, and delivery destination as determined by our courier
          partner ShipRocket. The exact shipping fee will be displayed before
          you complete your payment.
        </PolicyP>
        <PolicyList
          items={[
            "Shipping charges are calculated dynamically based on delivery partner rates",
            "Charges are displayed transparently at the checkout page before payment",
            "COD orders carry an additional handling fee of ₹99",
            "In case of any shipping charge discrepancy, please contact support before placing the order",
          ]}
        />
      </PolicySection>

      <PolicySection title="Packaging & Safety">
        <PolicyP>
          All Rehnoor Jewels products are dispatched in our signature
          tamper-evident packaging. Each order is carefully inspected, wrapped
          in anti-tarnish material, and placed in our branded gift box before
          being securely packed for transit.
        </PolicyP>
        <PolicyList
          items={[
            "Tamper-evident sealed outer packaging for all shipments",
            "Anti-tarnish inner wrapping to preserve gold plating quality",
            "Signature Rehnoor Jewels branded gift box included with every order",
            "Fragile sticker and handling instructions on all parcels",
            "Product quality inspection conducted before dispatch",
          ]}
        />
      </PolicySection>

      <PolicySection title="Tracking Your Order">
        <PolicyP>
          Once your order is dispatched, you will receive a tracking number via
          email and WhatsApp. You can track your shipment directly on the
          ShipRocket portal or through the tracking link provided in your
          confirmation message.
        </PolicyP>
        <PolicyList
          items={[
            "Tracking details sent via email and WhatsApp after dispatch",
            "Real-time tracking available on ShipRocket partner portal",
            "Use your order ID on our Track Order page at rehnoorjewels.com/track-order",
            "Contact support if tracking is not updated within 48 hours of dispatch",
          ]}
        />
      </PolicySection>

      <PolicySection title="Failed Delivery & Re-attempts">
        <PolicyP>
          If a delivery attempt fails due to the customer being unavailable, the
          courier partner will make up to 3 delivery attempts. After 3 failed
          attempts, the package will be returned to our warehouse. In such
          cases, re-shipping charges will apply.
        </PolicyP>
        <HighlightBox
          icon={<Info size={14} />}
          title="Important"
          variant="gold"
        >
          Please ensure your delivery address and phone number are accurate at
          the time of placing your order. Rehnoor Jewels is not responsible for
          delays or failed deliveries caused by incorrect address information
          provided by the customer.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Contact for Shipping Queries">
        <InfoGrid
          items={[
            { label: "Email", value: "hello@rehnoorjewels.com" },
            { label: "WhatsApp", value: "+91 84485 81529" },
            { label: "Support Hours", value: "Mon–Sat, 10:00 AM – 6:00 PM" },
            { label: "Response Time", value: "Within 24 Business Hours" },
          ]}
        />
      </PolicySection>
    </div>
  );
}

function ReturnsPolicy() {
  return (
    <div>
      <PolicySection title="Overview">
        <PolicyP>
          At Rehnoor Jewels, we take pride in the quality of every product we
          deliver. We have a clear and fair return and refund policy to ensure
          your complete satisfaction. Please read this policy carefully before
          making a purchase.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Standard Return Window", value: "7 Days from Delivery" },
            { label: "Extended Return Window", value: "6 Months (50% Refund)" },
            { label: "Refund Method", value: "Original Payment Method" },
            { label: "Refund Timeline", value: "5–7 Business Days" },
          ]}
        />
      </PolicySection>

      <PolicySection title="Eligible Returns — Damaged Products">
        <PolicyP>
          We accept returns{" "}
          <strong>only for products that arrive damaged or defective</strong>.
          If you receive a product that is damaged in transit or has a
          manufacturing defect, you are eligible for a full refund or
          replacement within <strong>7 days of delivery</strong>.
        </PolicyP>
        <HighlightBox
          icon={<CheckCircle size={14} />}
          title="Return Eligibility Criteria"
          variant="green"
        >
          To be eligible for a return, your item must meet ALL of the following
          conditions:
          <ul className="mt-2 flex flex-col gap-1">
            {[
              "Product must be in unused, unworn condition",
              "Original packaging, tags, and authenticity seal must be intact",
              "Original invoice/bill must be included with the return",
              "Return request must be raised within 7 days of delivery date",
              "Clear photos/video of the damage must be shared at the time of request",
            ].map((i, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span style={{ color: "var(--rj-emerald)" }}>✓</span> {i}
              </li>
            ))}
          </ul>
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Non-Returnable Items">
        <PolicyP>
          The following items are not eligible for return or refund:
        </PolicyP>
        <PolicyList
          items={[
            "Products that have been used, worn, or altered",
            "Products without original packaging, tags, or authenticity seal",
            "Products returned after 7 days of delivery (standard return window)",
            "Products damaged due to misuse, improper handling, or negligence",
            "Products purchased during special sale or clearance events (unless damaged on delivery)",
            "Digital downloads, gift cards, or store credits",
          ]}
        />
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="No Custom Orders Currently"
          variant="gold"
        >
          Rehnoor Jewels does not offer custom-designed jewellery at this time.
          All products listed on our website are standard designs available for
          purchase.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Extended Return — 6-Month Policy (50% Refund)">
        <PolicyP>
          In addition to our standard 7-day return window, Rehnoor Jewels offers
          an extended return program: customers may return any product within{" "}
          <strong>6 months of purchase</strong> with the original bill, and
          receive a <strong>50% refund</strong> on the original purchase price.
        </PolicyP>
        <PolicyList
          items={[
            "Valid within 6 months from the date of original purchase",
            "Original invoice/bill is mandatory — no exceptions",
            "Product must be in wearable condition (not damaged beyond normal wear)",
            "Refund will be 50% of the original paid price",
            "Refund processed to original payment method within 5–7 business days",
            "Return shipping charges for extended returns are borne by the customer",
          ]}
        />
      </PolicySection>

      <PolicySection title="How to Initiate a Return">
        <PolicyP>
          To initiate a return, please follow the steps below. Do not ship any
          product back without prior approval from our support team.
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          {[
            {
              step: "01",
              title: "Contact Support",
              desc: "Email hello@rehnoorjewels.com or WhatsApp +91 84485 81529 with your order ID and reason for return. Attach clear photos/videos of the damage.",
            },
            {
              step: "02",
              title: "Await Approval",
              desc: "Our team will review your request within 24–48 business hours and confirm eligibility. You will receive a Return Merchandise Authorization (RMA) number.",
            },
            {
              step: "03",
              title: "Ship the Product",
              desc: "Pack the product securely in its original packaging with the original invoice. Ship to our registered address using a trackable courier. Return shipping is borne by Rehnoor Jewels for damaged product returns.",
            },
            {
              step: "04",
              title: "Quality Inspection",
              desc: "Once received, our team will inspect the returned product within 2–3 business days and confirm the refund or replacement.",
            },
            {
              step: "05",
              title: "Refund Processed",
              desc: "Approved refunds are processed to the original payment method within 5–7 business days from the date of inspection approval.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="flex gap-4 p-4 rounded-xl"
              style={{
                background: "var(--rj-ivory-dark)",
                border: "1px solid var(--rj-bone)",
              }}
            >
              <div
                className="font-cormorant text-3xl font-light flex-shrink-0"
                style={{ color: "var(--rj-gold)", lineHeight: 1 }}
              >
                {s.step}
              </div>
              <div>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {s.title}
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PolicySection>

      <PolicySection title="Refund Information">
        <PolicyP>
          All approved refunds are processed to the{" "}
          <strong>original payment method</strong> used at the time of purchase.
          We do not offer store credit or gift card refunds unless specifically
          requested by the customer.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Refund Method", value: "Original Payment Source" },
            { label: "Refund Timeline", value: "5–7 Business Days" },
            {
              label: "Damaged Return Shipping",
              value: "Paid by Rehnoor Jewels",
            },
            { label: "Extended Return Shipping", value: "Paid by Customer" },
          ]}
        />
        <HighlightBox
          icon={<Info size={14} />}
          title="Bank Processing Times"
          variant="gold"
        >
          Once we initiate the refund, it may take an additional 2–5 business
          days for the amount to reflect in your bank account or on your card
          statement, depending on your bank's processing time. This is outside
          our control.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Warranty">
        <PolicyP>
          All Rehnoor Jewels products come with a{" "}
          <strong>6-month warranty</strong> against manufacturing defects from
          the date of purchase. Our products feature pure 24K gold plating with
          approximately 100–300 mg of 24K gold per piece to ensure durability
          and longevity.
        </PolicyP>
        <PolicyList
          items={[
            "6-month warranty covering manufacturing defects",
            "Warranty does not cover damage due to misuse, improper handling, exposure to chemicals, or physical damage",
            "Warranty claims require original purchase invoice",
            "Warranty repairs or replacements are subject to product availability",
            "Gold plating warranty covers significant plating loss under normal wear conditions",
          ]}
        />
      </PolicySection>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div>
      <PolicySection title="Introduction">
        <PolicyP>
          Rehnoor Jewels ("we", "us", "our") is committed to protecting your
          personal information and your right to privacy. This Privacy Policy
          describes how we collect, use, store, and share your information when
          you visit our website <strong>rehnoorjewels.com</strong> or make a
          purchase from us.
        </PolicyP>
        <PolicyP>
          By using our website or services, you agree to the collection and use
          of information in accordance with this policy. If you do not agree
          with any part of this policy, please discontinue use of our website.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Business Name", value: "Rehnoor Jewels" },
            { label: "GST Number", value: "07BFIPT1365P1ZQ" },
            { label: "Data Controller", value: "Rehnoor Jewels, Delhi" },
            {
              label: "Governing Law",
              value: "Information Technology Act, 2000 (India)",
            },
          ]}
        />
      </PolicySection>

      <PolicySection title="Information We Collect">
        <PolicyP>
          We collect various types of information in connection with the
          services we provide. The categories of personal data we collect
          include:
        </PolicyP>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {[
            {
              cat: "Personal Identification",
              items: [
                "Full name",
                "Email address",
                "Phone number",
                "WhatsApp number",
              ],
            },
            {
              cat: "Address Information",
              items: [
                "Shipping address",
                "Billing address",
                "City, state, pincode",
                "Landmark details",
              ],
            },
            {
              cat: "Transaction Data",
              items: [
                "Order history",
                "Products purchased",
                "Payment method used",
                "Invoice details",
              ],
            },
            {
              cat: "Technical Data",
              items: [
                "IP address",
                "Browser type & version",
                "Pages visited",
                "Time spent on site",
              ],
            },
          ].map((c) => (
            <div
              key={c.cat}
              className="p-4 rounded-xl"
              style={{
                background: "rgba(0,55,32,0.04)",
                border: "1px solid rgba(0,55,32,0.1)",
              }}
            >
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-2"
                style={{ color: "var(--rj-emerald)" }}
              >
                {c.cat}
              </p>
              <ul className="flex flex-col gap-1">
                {c.items.map((i) => (
                  <li
                    key={i}
                    className="text-xs flex items-center gap-1.5"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    <span style={{ color: "var(--rj-gold)" }}>◆</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PolicySection>

      <PolicySection title="How We Use Your Information">
        <PolicyP>
          We use the information we collect for the following purposes:
        </PolicyP>
        <PolicyList
          items={[
            "Processing and fulfilling your orders, including payment processing and shipping coordination",
            "Sending order confirmations, shipping updates, and delivery notifications via email and WhatsApp",
            "Providing customer support and responding to your queries, complaints, and return requests",
            "Sending marketing communications, offers, and promotions (with your consent)",
            "Improving our website, products, and services through analytics and feedback",
            "Preventing fraud, unauthorized access, and ensuring the security of our platform",
            "Complying with applicable Indian laws, tax obligations (GST), and regulatory requirements",
            "Conducting post-order calls for coordination and gathering customer feedback",
          ]}
        />
      </PolicySection>

      <PolicySection title="Third-Party Services & Data Sharing">
        <PolicyP>
          We work with trusted third-party service providers to operate our
          business. These providers have access to your personal data only as
          necessary to perform services on our behalf and are bound by
          confidentiality obligations.
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          {[
            {
              provider: "Razorpay",
              purpose: "Payment Processing",
              data: "Transaction data, billing details. Razorpay is PCI-DSS Level 1 compliant. We do not store your card details.",
              link: "razorpay.com/privacy",
            },
            {
              provider: "ShipRocket",
              purpose: "Logistics & Shipping",
              data: "Name, phone, delivery address for shipment execution and tracking.",
              link: "shiprocket.in/privacy-policy",
            },
            {
              provider: "Google Analytics",
              purpose: "Website Analytics",
              data: "Anonymized usage data, page views, session duration. Used to improve our website experience.",
              link: "policies.google.com/privacy",
            },
            {
              provider: "Facebook Pixel",
              purpose: "Marketing & Retargeting",
              data: "Browsing behaviour for relevant ad targeting on Meta platforms. You can opt out via Facebook ad settings.",
              link: "facebook.com/privacy",
            },
            {
              provider: "Email Marketing Tools",
              purpose: "Marketing Emails",
              data: "Email address and name for promotional communications. Unsubscribe option available in every email.",
              link: "",
            },
          ].map((t) => (
            <div
              key={t.provider}
              className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl"
              style={{
                background: "var(--rj-ivory-dark)",
                border: "1px solid var(--rj-bone)",
              }}
            >
              <div className="sm:w-32 flex-shrink-0">
                <p
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {t.provider}
                </p>
                <p
                  className="font-cinzel text-[9px] tracking-wider mt-0.5"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {t.purpose}
                </p>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {t.data}
              </p>
            </div>
          ))}
        </div>
        <HighlightBox
          icon={<Shield size={14} />}
          title="We Do Not Sell Your Data"
          variant="green"
        >
          Rehnoor Jewels does not sell, rent, or trade your personal information
          to any third party for their own marketing purposes. Data is only
          shared with service providers necessary to fulfil your order and
          improve your experience.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Cookies & Tracking Technologies">
        <PolicyP>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience, analyse site traffic, and personalise
          content. Cookies are small data files stored on your device.
        </PolicyP>
        <PolicyList
          items={[
            "Essential Cookies: Required for the website to function correctly (cart, login sessions)",
            "Analytics Cookies: Google Analytics cookies to understand how visitors use our site",
            "Marketing Cookies: Facebook Pixel cookies for targeted advertising",
            "Preference Cookies: Remember your settings such as currency and language",
            "You can disable cookies through your browser settings, though some features may not function correctly",
          ]}
        />
      </PolicySection>

      <PolicySection title="Data Security">
        <PolicyP>
          We implement appropriate technical and organizational measures to
          protect your personal data against unauthorized access, alteration,
          disclosure, or destruction. Our website uses SSL/TLS encryption
          (HTTPS) for all data transmissions.
        </PolicyP>
        <PolicyList
          items={[
            "256-bit SSL encryption for all data transmitted through our website",
            "Razorpay PCI-DSS Level 1 compliance for all payment transactions",
            "Access to personal data restricted to authorized personnel only",
            "Regular security audits and vulnerability assessments",
            "We do not store complete credit/debit card numbers on our servers",
          ]}
        />
      </PolicySection>

      <PolicySection title="Your Rights">
        <PolicyP>
          Under the Information Technology Act, 2000 and applicable Indian
          privacy regulations, you have the following rights regarding your
          personal data:
        </PolicyP>
        <PolicyList
          items={[
            "Right to Access: Request a copy of the personal data we hold about you",
            "Right to Correction: Request correction of inaccurate or incomplete data",
            "Right to Deletion: Request deletion of your personal data (subject to legal retention requirements)",
            "Right to Withdraw Consent: Opt out of marketing communications at any time",
            "Right to Data Portability: Request your data in a structured, machine-readable format",
            "To exercise any of these rights, contact us at hello@rehnoorjewels.com",
          ]}
        />
      </PolicySection>

      <PolicySection title="Data Retention">
        <PolicyP>
          We retain your personal data for as long as necessary to fulfil the
          purposes outlined in this policy, including for the purposes of
          satisfying any legal, accounting, or reporting requirements. Order
          data is retained for a minimum of 7 years as required by Indian GST
          and tax laws.
        </PolicyP>
      </PolicySection>

      <PolicySection title="Changes to This Policy">
        <PolicyP>
          We reserve the right to update this Privacy Policy at any time. Any
          changes will be posted on this page with an updated revision date. We
          encourage you to review this policy periodically. Continued use of our
          website after any changes constitutes your acceptance of the updated
          policy.
        </PolicyP>
        <PolicyP>
          For any privacy-related questions or concerns, please contact us at{" "}
          <strong>hello@rehnoorjewels.com</strong>.
        </PolicyP>
      </PolicySection>
    </div>
  );
}

function TermsConditions() {
  return (
    <div>
      <PolicySection title="Agreement to Terms">
        <PolicyP>
          These Terms and Conditions ("Terms") constitute a legally binding
          agreement between you ("User", "Customer") and{" "}
          <strong>Rehnoor Jewels</strong>, a proprietorship firm registered
          under Indian law, operating at 10722, 4th Floor, Street 13, Pratap
          Nagar, Near SBI Bank, Pratap Nagar, Delhi – 110007 (GST:
          07BFIPT1365P1ZQ).
        </PolicyP>
        <PolicyP>
          By accessing our website <strong>rehnoorjewels.com</strong>, creating
          an account, or placing an order, you agree to be bound by these Terms.
          If you do not agree, please do not use our website or services.
        </PolicyP>
      </PolicySection>

      <PolicySection title="Website Usage Rules">
        <PolicyP>
          You agree to use this website only for lawful purposes and in a manner
          that does not infringe the rights of others or restrict their use of
          the website. Specifically, you must not:
        </PolicyP>
        <PolicyList
          items={[
            "Use the website in any way that violates applicable Indian or international law",
            "Transmit any unsolicited or unauthorized advertising or promotional material",
            "Attempt to gain unauthorized access to any part of the website or its servers",
            "Introduce any viruses, trojans, worms, or other malicious code",
            "Impersonate any person or misrepresent your affiliation with any entity",
            "Reproduce, distribute, or exploit any content from this website without written permission",
            "Use automated scripts, bots, or scrapers to access the website",
            "Engage in any conduct that disrupts or interferes with the website's operation",
          ]}
        />
      </PolicySection>

      <PolicySection title="Account Creation">
        <PolicyP>
          Users may create an account on Rehnoor Jewels to enjoy features
          including adding products to a cart, saving wishlists, and comparing
          products for informed purchasing decisions. Account creation is
          optional for browsing but required for completing a purchase.
        </PolicyP>
        <PolicyList
          items={[
            "You must provide accurate, complete, and current account information",
            "You are responsible for maintaining the confidentiality of your login credentials",
            "You must notify us immediately of any unauthorized use of your account",
            "We reserve the right to terminate accounts that violate these Terms",
            "One account per person — multiple accounts for fraudulent purposes are prohibited",
          ]}
        />
      </PolicySection>

      <PolicySection title="Products & Accuracy Disclaimer">
        <PolicyP>
          We make every effort to display our products as accurately as
          possible. However, we cannot guarantee that your device's display of
          colours and product details will be exactly accurate. The following
          disclaimers apply to all products listed on our website:
        </PolicyP>
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Product Accuracy Disclaimer"
          variant="gold"
        >
          Product images are for illustrative purposes only. Actual colours,
          finish, and appearance may vary slightly due to photography lighting,
          display settings, and the handcrafted nature of gold jewellery. Minor
          variations in appearance are inherent to the manufacturing process and
          do not constitute defects.
        </HighlightBox>
        <PolicyList
          items={[
            "Product weights and dimensions are approximate and may vary by ±5%",
            "Gold plating thickness (100–300 mg per piece) is an average range and may vary by design",
            "Gemstone or stone embellishments may have natural variations in colour and clarity",
            "Images may show products styled with other items not included in the listing",
            "We do not warrant that product descriptions are error-free, complete, or current",
          ]}
        />
      </PolicySection>

      <PolicySection title="Pricing Policy">
        <PolicyP>
          All prices on Rehnoor Jewels are displayed in Indian Rupees (₹) and
          are inclusive of applicable GST unless stated otherwise.
        </PolicyP>
        <HighlightBox
          icon={<Info size={14} />}
          title="Dynamic Gold Pricing"
          variant="gold"
        >
          <strong>Prices are subject to change without notice.</strong> Gold
          jewellery prices are directly linked to the prevailing 24K gold market
          rate, which fluctuates daily based on commodity markets, international
          gold prices, and currency exchange rates. The price at the time of
          placing your order is the confirmed price — subsequent price changes
          do not affect confirmed orders.
        </HighlightBox>
        <PolicyList
          items={[
            "Prices are subject to change at any time based on 24K gold market rates",
            "The confirmed order price is locked at the time of payment — no retrospective changes",
            "Promotional or sale prices are valid only for the specified period",
            "Shipping charges are additional and calculated at checkout",
            "Cash on Delivery orders carry an additional COD handling fee of ₹99",
            "We reserve the right to cancel orders placed at erroneous prices",
          ]}
        />
      </PolicySection>

      <PolicySection title="Intellectual Property">
        <PolicyP>
          All content on this website — including but not limited to product
          photographs, design layouts, brand logos, product descriptions,
          jewellery designs, and website code — is the exclusive intellectual
          property of Rehnoor Jewels and is protected under the Copyright Act,
          1957 and applicable Indian intellectual property laws.
        </PolicyP>
        <PolicyList
          items={[
            "The Rehnoor Jewels brand name, logo, and trademarks are proprietary and may not be used without written consent",
            "Product designs and photographs may not be reproduced, modified, or distributed without permission",
            "Any unauthorized use of our intellectual property will be subject to legal action",
            "User-generated content (reviews, photos) shared with us may be used in our marketing with attribution",
            "We respect third-party intellectual property and will address any DMCA notices promptly",
          ]}
        />
      </PolicySection>

      <PolicySection title="Limitation of Liability">
        <PolicyP>
          To the maximum extent permitted by applicable law, Rehnoor Jewels
          shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of your use of our
          website or products. Our total liability for any claim shall not
          exceed the amount you paid for the specific product giving rise to the
          claim.
        </PolicyP>
      </PolicySection>

      <PolicySection title="Governing Law & Dispute Resolution">
        <PolicyP>
          These Terms shall be governed by and construed in accordance with the
          laws of
          <strong> India</strong>. Any dispute arising from these Terms or your
          use of our website shall be subject to the exclusive jurisdiction of
          the courts located in
          <strong> New Delhi, India</strong>.
        </PolicyP>
        <PolicyList
          items={[
            "Governing law: The laws of India, including the Consumer Protection Act, 2019",
            "Jurisdiction: Courts of New Delhi, Delhi",
            "We encourage resolving disputes amicably through our customer support before legal action",
            "Disputes related to payment transactions are additionally governed by RBI guidelines",
          ]}
        />
      </PolicySection>

      <PolicySection title="Changes to Terms">
        <PolicyP>
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting on this page. Continued use of
          our website after any modifications constitutes your acceptance of the
          revised Terms. We recommend reviewing this page periodically.
        </PolicyP>
      </PolicySection>
    </div>
  );
}

function CancellationPolicy() {
  return (
    <div>
      <PolicySection title="Overview">
        <PolicyP>
          We understand that circumstances may change after placing an order.
          Our cancellation policy is designed to be fair to both customers and
          our fulfilment operations. Please read this policy carefully before
          placing your order.
        </PolicyP>
        <InfoGrid
          items={[
            {
              label: "Cancellation Window",
              value: "Before Dispatch (24–48 hrs)",
            },
            { label: "Refund Timeline", value: "5–7 Business Days" },
            { label: "Refund Method", value: "Original Payment Method" },
            {
              label: "COD Cancellation",
              value: "No Charge if Before Dispatch",
            },
          ]}
        />
      </PolicySection>

      <PolicySection title="Order Cancellation — Before Dispatch">
        <PolicyP>
          Orders may be cancelled <strong>before they are dispatched</strong>{" "}
          from our warehouse. Since orders are processed within 24–48 hours of
          placement, cancellation requests must be submitted as soon as possible
          after placing the order.
        </PolicyP>
        <HighlightBox
          icon={<CheckCircle size={14} />}
          title="Eligible for Cancellation"
          variant="green"
        >
          Your order is eligible for cancellation if it has not yet been
          dispatched from our warehouse. You will be notified via email and
          WhatsApp when your order is dispatched. Once the dispatch notification
          is sent, cancellation is no longer possible.
        </HighlightBox>
        <PolicyList
          items={[
            "Contact us immediately at hello@rehnoorjewels.com or WhatsApp +91 84485 81529",
            "Include your order ID and reason for cancellation in the request",
            "Cancellations are processed on a best-effort basis during business hours (10 AM – 6 PM, Mon–Sat)",
            "If the order has already been dispatched when your request is received, cancellation is not possible",
            "For pre-paid orders, a full refund will be processed upon successful cancellation",
          ]}
        />
      </PolicySection>

      <PolicySection title="After Dispatch — No Cancellation">
        <PolicyP>
          Once an order has been dispatched by our courier partner ShipRocket,
          we are unable to cancel or intercept the shipment. In such cases, you
          may:
        </PolicyP>
        <PolicyList
          items={[
            "Refuse delivery at the door — the package will be returned to us",
            "Accept delivery and then raise a return request within 7 days (if product is damaged)",
            "Accept delivery and initiate an extended return within 6 months (50% refund with original bill)",
            "Note: Shipping charges may not be refunded for refused deliveries",
          ]}
        />
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Post-Dispatch Note"
          variant="red"
        >
          If you refuse delivery of an undamaged product without a valid reason,
          return shipping costs may be deducted from your refund. We encourage
          contacting us before refusing delivery so we can assist you better.
        </HighlightBox>
      </PolicySection>

      <PolicySection title="Refund for Cancelled Orders">
        <PolicyP>
          For orders successfully cancelled before dispatch, refunds are
          processed as follows:
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          {[
            {
              method: "UPI / Net Banking",
              timeline: "5–7 Business Days",
              note: "Refunded directly to the source bank account",
            },
            {
              method: "Credit / Debit Card",
              timeline: "5–7 Business Days",
              note: "Refunded to the card used. May take additional 2–3 days to reflect depending on your bank.",
            },
            {
              method: "Razorpay Wallet / EMI",
              timeline: "5–7 Business Days",
              note: "Refunded to the Razorpay wallet or EMI adjusted as per payment terms",
            },
            {
              method: "Cash on Delivery (COD)",
              timeline: "Not Applicable",
              note: "COD orders cancelled before dispatch have no charge. No payment was collected.",
            },
          ].map((m) => (
            <div
              key={m.method}
              className="grid grid-cols-3 gap-3 p-4 rounded-xl items-start"
              style={{
                background: "var(--rj-ivory-dark)",
                border: "1px solid var(--rj-bone)",
              }}
            >
              <div>
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase mb-1"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Method
                </p>
                <p
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  {m.method}
                </p>
              </div>
              <div>
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase mb-1"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Timeline
                </p>
                <p
                  className="font-cinzel text-xs font-bold"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {m.timeline}
                </p>
              </div>
              <div>
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase mb-1"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Note
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {m.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PolicySection>

      <PolicySection title="Order Cancellation by Rehnoor Jewels">
        <PolicyP>
          In certain circumstances, we may cancel your order. This may occur if:
        </PolicyP>
        <PolicyList
          items={[
            "The product is out of stock or no longer available",
            "There is a pricing error or technical error in the product listing",
            "Payment verification fails or the transaction is flagged as fraudulent",
            "The delivery address is unserviceable by our courier partners",
            "The order does not comply with our terms and conditions",
          ]}
        />
        <PolicyP>
          In all such cases, we will notify you via email and provide a full
          refund within 5–7 business days. We sincerely apologise for any
          inconvenience caused.
        </PolicyP>
      </PolicySection>

      <PolicySection title="How to Request Cancellation">
        <PolicyP>
          To request an order cancellation, please contact us through any of the
          following channels during our business hours (Monday to Saturday,
          10:00 AM – 6:00 PM):
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Email", value: "hello@rehnoorjewels.com" },
            { label: "WhatsApp", value: "+91 84485 81529" },
            { label: "Phone (Alt)", value: "+91 85958 14465" },
            { label: "Business Hours", value: "Mon–Sat, 10 AM – 6 PM" },
          ]}
        />
        <HighlightBox
          icon={<Info size={14} />}
          title="Include in Your Request"
          variant="green"
        >
          Please include the following in your cancellation request:{" "}
          <strong>Order ID</strong>, registered email address, reason for
          cancellation, and your preferred refund method (if different from
          original payment). This helps us process your request faster.
        </HighlightBox>
      </PolicySection>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function PolicyPages() {
  const [activeTab, setActiveTab] = useState<PolicyKey>("shipping");

  const contentMap: Record<PolicyKey, React.ReactNode> = {
    shipping: <ShippingPolicy />,
    returns: <ReturnsPolicy />,
    privacy: <PrivacyPolicy />,
    terms: <TermsConditions />,
    cancellation: <CancellationPolicy />,
  };

  const lastUpdated: Record<PolicyKey, string> = {
    shipping: "01 April 2026",
    returns: "01 April 2026",
    privacy: "01 April 2026",
    terms: "01 April 2026",
    cancellation: "01 April 2026",
  };

  const currentTab = TABS.find((t) => t.key === activeTab)!;

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Hero Header ── */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container-rj">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-6 flex-wrap">
            {["Home", "Policies"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href="/"
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {c}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase mb-2"
                style={{ color: "rgba(252,193,81,0.7)" }}
              >
                ✦ Legal & Policies
              </p>
              <h1
                className="font-cormorant font-light text-white leading-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {currentTab.label}
              </h1>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1">
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Last Updated
              </p>
              <p
                className="font-cinzel text-xs font-bold"
                style={{ color: "var(--rj-gold)" }}
              >
                {lastUpdated[activeTab]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Business Info Strip ── */}
      <div
        style={{
          background: "rgba(0,55,32,0.06)",
          borderBottom: "1px solid var(--rj-bone)",
        }}
      >
        <div className="container-rj py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            {[
              {
                icon: <MapPin size={10} />,
                text: "10722, Pratap Nagar, Delhi 110007",
              },
              { icon: <Mail size={10} />, text: "hello@rehnoorjewels.com" },
              { icon: <Phone size={10} />, text: "+91 84485 81529" },
              { icon: <Clock size={10} />, text: "Mon–Sat, 10 AM – 6 PM" },
            ].map((i) => (
              <div key={i.text} className="flex items-center gap-1.5">
                <span style={{ color: "var(--rj-emerald)" }}>{i.icon}</span>
                <span
                  className="font-cinzel text-[9px] tracking-wider"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {i.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid var(--rj-bone)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="container-rj">
          <div className="flex overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const active = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex items-center gap-2 px-4 py-4 font-cinzel text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={{
                    color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                    borderBottom: active
                      ? "2px solid var(--rj-emerald)"
                      : "2px solid transparent",
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    background: "transparent",
                  }}
                >
                  <span
                    style={{
                      color: active ? "var(--rj-emerald)" : "var(--rj-bone)",
                    }}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-rj py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main content */}
          <div className="lg:col-span-3">{contentMap[activeTab]}</div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-4">
              {/* Quick Links */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--rj-bone)" }}
              >
                <div
                  className="px-5 py-4"
                  style={{ background: "var(--rj-emerald)" }}
                >
                  <p
                    className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    ✦ All Policies
                  </p>
                </div>
                <div className="p-2">
                  {TABS.map((tab) => {
                    const active = tab.key === activeTab;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{
                          background: active
                            ? "rgba(0,55,32,0.06)"
                            : "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            color: active
                              ? "var(--rj-emerald)"
                              : "var(--rj-bone)",
                          }}
                        >
                          {tab.icon}
                        </span>
                        <span
                          className="font-cinzel text-[9px] tracking-wider"
                          style={{
                            color: active
                              ? "var(--rj-emerald)"
                              : "var(--rj-ash)",
                            fontWeight: active ? 700 : 400,
                          }}
                        >
                          {tab.label}
                        </span>
                        {active && (
                          <ChevronRight
                            size={10}
                            style={{
                              color: "var(--rj-emerald)",
                              marginLeft: "auto",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Card */}
              <div
                className="rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  background: "rgba(0,55,32,0.05)",
                  border: "1px solid rgba(0,55,32,0.12)",
                }}
              >
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  Need Help?
                </p>
                {[
                  {
                    icon: <Mail size={12} />,
                    label: "Email Us",
                    value: "hello@rehnoorjewels.com",
                  },
                  {
                    icon: <Phone size={12} />,
                    label: "WhatsApp",
                    value: "+91 84485 81529",
                  },
                  {
                    icon: <Clock size={12} />,
                    label: "Hours",
                    value: "Mon–Sat, 10 AM – 6 PM",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-2.5">
                    <span style={{ color: "var(--rj-emerald)", marginTop: 1 }}>
                      {c.icon}
                    </span>
                    <div>
                      <p
                        className="font-cinzel text-[8px] tracking-wider uppercase"
                        style={{ color: "var(--rj-ash)" }}
                      >
                        {c.label}
                      </p>
                      <p
                        className="font-cinzel text-[10px] font-bold"
                        style={{ color: "var(--rj-charcoal)" }}
                      >
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(252,193,81,0.06)",
                  border: "1px solid rgba(252,193,81,0.2)",
                }}
              >
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-3"
                  style={{ color: "#a07800" }}
                >
                  ✦ Our Commitment
                </p>
                {[
                  "BIS Hallmarked Jewellery",
                  "Pure 24K Gold Plating",
                  "100–300 mg Gold Per Piece",
                  "6-Month Warranty",
                  "Secure Razorpay Payments",
                  "GST: 07BFIPT1365P1ZQ",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 py-1.5"
                    style={{ borderBottom: "1px solid rgba(252,193,81,0.15)" }}
                  >
                    <CheckCircle
                      size={11}
                      style={{ color: "#a07800", flexShrink: 0 }}
                    />
                    <span
                      className="font-cinzel text-[9px] tracking-wider"
                      style={{ color: "#a07800" }}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Strip ── */}
      <div style={{ background: "var(--rj-emerald)", padding: "2rem 0" }}>
        <div className="container-rj">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-cormorant text-2xl font-light text-white">
                Rehnoor Jewels
              </p>
              <p
                className="font-cinzel text-[9px] tracking-widest uppercase mt-0.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Pure Gold · Timeless Craft · Delhi, India
              </p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center sm:justify-end">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="font-cinzel text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
                  style={{
                    color:
                      activeTab === tab.key
                        ? "var(--rj-gold)"
                        : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p
              className="font-cinzel text-[8px] tracking-wider text-center"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              © {new Date().getFullYear()} Rehnoor Jewels · GST: 07BFIPT1365P1ZQ
              · 10722, Pratap Nagar, Delhi 110007 · All Rights Reserved ·
              Governed by Laws of India
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
