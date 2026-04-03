// app/policies/privacy/page.tsx
"use client";

import { Shield, Info } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
} from "../component/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      activeKey="privacy"
      title="Privacy Policy"
      lastUpdated="01 April 2026"
    >
      {/* ── Introduction ── */}
      <PolicySection title="Introduction">
        <PolicyP>
          Rehnoor Jewels ("we", "us", "our") is committed to protecting your
          personal information and your right to privacy. This Privacy Policy
          describes how we collect, use, store, and share your information when
          you visit <strong>rehnoorjewels.com</strong> or make a purchase from
          us.
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

      {/* ── Data Collected ── */}
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
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs flex items-center gap-1.5"
                    style={{
                      color: "var(--rj-ash)",
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                    }}
                  >
                    <span style={{ color: "var(--rj-gold)" }}>◆</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PolicySection>

      {/* ── How We Use Data ── */}
      <PolicySection title="How We Use Your Information">
        <PolicyP>
          We use the information we collect for the following purposes:
        </PolicyP>
        <PolicyList
          items={[
            "Processing and fulfilling your orders, including payment processing and shipping coordination",
            "Sending order confirmations, shipping updates, and delivery notifications via email and WhatsApp",
            "Providing customer support and responding to queries, complaints, and return requests",
            "Sending marketing communications, offers, and promotions (with your consent)",
            "Improving our website, products, and services through analytics and feedback",
            "Preventing fraud, unauthorized access, and ensuring the security of our platform",
            "Complying with applicable Indian laws, GST tax obligations, and regulatory requirements",
            "Conducting outbound calls post-order for coordination and gathering customer feedback",
          ]}
        />
      </PolicySection>

      {/* ── Third-Party Services ── */}
      <PolicySection title="Third-Party Services & Data Sharing">
        <PolicyP>
          We work with trusted third-party service providers to operate our
          business. These providers have access to your personal data only as
          necessary to perform their services and are bound by confidentiality
          obligations.
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          {[
            {
              provider: "Razorpay",
              purpose: "Payment Processing",
              data: "Transaction data and billing details. Razorpay is PCI-DSS Level 1 certified. We do not store your card details on our servers.",
            },
            {
              provider: "ShipRocket",
              purpose: "Logistics & Shipping",
              data: "Name, phone number, and delivery address for shipment execution and order tracking.",
            },
            {
              provider: "Google Analytics",
              purpose: "Website Analytics",
              data: "Anonymised usage data, page views, and session duration. Used to understand and improve our website experience.",
            },
            {
              provider: "Facebook Pixel",
              purpose: "Marketing & Retargeting",
              data: "Browsing behaviour for relevant ad targeting on Meta platforms. You can opt out via your Facebook ad preferences settings.",
            },
            {
              provider: "Email Marketing Tools",
              purpose: "Marketing Emails",
              data: "Email address and name for promotional communications. Every marketing email includes an unsubscribe option.",
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
              <div className="sm:w-36 flex-shrink-0">
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

      {/* ── Cookies ── */}
      <PolicySection title="Cookies & Tracking Technologies">
        <PolicyP>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience, analyse site traffic, and personalise
          content. Please review our dedicated{" "}
          <a
            href="/policies/cookies"
            style={{ color: "var(--rj-emerald)", fontWeight: 600 }}
          >
            Cookie Policy
          </a>{" "}
          for complete details on the types of cookies we use and how to manage
          them.
        </PolicyP>
        <PolicyList
          items={[
            "Essential Cookies: Required for the website to function (cart, login sessions)",
            "Analytics Cookies: Google Analytics cookies to understand site usage",
            "Marketing Cookies: Facebook Pixel for targeted advertising",
            "Preference Cookies: Remember your settings and preferences",
            "You can disable cookies in your browser settings; some features may not function correctly",
          ]}
        />
      </PolicySection>

      {/* ── Data Security ── */}
      <PolicySection title="Data Security">
        <PolicyP>
          We implement appropriate technical and organisational measures to
          protect your personal data against unauthorised access, alteration,
          disclosure, or destruction. Our website uses SSL/TLS encryption
          (HTTPS) for all data transmissions.
        </PolicyP>
        <PolicyList
          items={[
            "256-bit SSL encryption for all data transmitted through our website",
            "Razorpay PCI-DSS Level 1 compliance for all payment transactions",
            "Access to personal data restricted to authorised personnel only",
            "Regular security audits and vulnerability assessments",
            "We do not store complete credit/debit card numbers on our servers",
          ]}
        />
      </PolicySection>

      {/* ── Your Rights ── */}
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

      {/* ── Data Retention ── */}
      <PolicySection title="Data Retention">
        <PolicyP>
          We retain your personal data for as long as necessary to fulfil the
          purposes outlined in this policy, including legal, accounting, or
          reporting requirements. Order data is retained for a minimum of{" "}
          <strong>7 years</strong> as required by Indian GST and income tax
          laws.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Order Records", value: "7 Years (GST Compliance)" },
            { label: "Account Data", value: "Duration of Account Activity" },
            { label: "Marketing Data", value: "Until Consent Withdrawn" },
            { label: "Technical Logs", value: "90 Days" },
          ]}
        />
      </PolicySection>

      {/* ── Changes ── */}
      <PolicySection title="Changes to This Policy">
        <PolicyP>
          We reserve the right to update this Privacy Policy at any time.
          Changes will be posted on this page with an updated revision date.
          Continued use of our website after any changes constitutes your
          acceptance of the updated policy.
        </PolicyP>
        <HighlightBox
          icon={<Info size={14} />}
          title="Privacy Questions?"
          variant="green"
        >
          For any privacy-related questions, data access requests, or concerns,
          please contact our support team at{" "}
          <strong>hello@rehnoorjewels.com</strong>. We aim to respond to all
          privacy requests within 10 business days.
        </HighlightBox>
      </PolicySection>
    </PolicyPageShell>
  );
}
