// app/policies/returns/page.tsx
"use client";

import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
  StepCard,
} from "../component/PolicyLayout";

export default function ReturnsRefundPage() {
  return (
    <PolicyPageShell
      activeKey="returns"
      title="Return & Refund Policy"
      lastUpdated="01 April 2026"
    >
      {/* ── Overview ── */}
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
            {
              label: "Extended Return Window",
              value: "6 Months (50% Refund)",
            },
            { label: "Refund Method", value: "Original Payment Method" },
            { label: "Refund Timeline", value: "5–7 Business Days" },
          ]}
        />
      </PolicySection>

      {/* ── Eligible Returns ── */}
      <PolicySection title="Eligible Returns — Damaged Products Only">
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
              "Original invoice / bill must be included with the return",
              "Return request must be raised within 7 days of delivery date",
              "Clear photos / video of the damage must be shared at the time of request",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: "var(--rj-emerald)" }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </HighlightBox>
      </PolicySection>

      {/* ── Non-Returnable ── */}
      <PolicySection title="Non-Returnable Items">
        <PolicyP>
          The following items are <strong>not eligible</strong> for return or
          refund:
        </PolicyP>
        <PolicyList
          items={[
            "Products that have been used, worn, or altered in any way",
            "Products without original packaging, tags, or authenticity seal",
            "Products returned after 7 days of delivery (standard return window)",
            "Products damaged due to misuse, improper handling, chemical exposure, or negligence",
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

      {/* ── Extended Return ── */}
      <PolicySection title="Extended Return — 6-Month Policy (50% Refund)">
        <PolicyP>
          In addition to our standard 7-day window, Rehnoor Jewels offers an
          extended return program: customers may return any product within{" "}
          <strong>6 months of purchase</strong> with the original bill, and
          receive a <strong>50% refund</strong> on the original purchase price.
        </PolicyP>
        <PolicyList
          items={[
            "Valid within 6 months from the date of original purchase",
            "Original invoice / bill is mandatory — no exceptions",
            "Product must be in wearable condition (not damaged beyond normal wear)",
            "Refund will be 50% of the original paid price",
            "Refund processed to original payment method within 5–7 business days",
            "Return shipping charges for extended returns are borne by the customer",
          ]}
        />
      </PolicySection>

      {/* ── How to Return ── */}
      <PolicySection title="How to Initiate a Return">
        <PolicyP>
          Please follow the steps below. Do not ship any product back without
          prior written approval from our support team.
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          <StepCard
            step="01"
            title="Contact Support"
            desc="Email hello@rehnoorjewels.com or WhatsApp +91 84485 81529 with your order ID and reason for return. Attach clear photos / videos of the damage."
          />
          <StepCard
            step="02"
            title="Await Approval"
            desc="Our team will review your request within 24–48 business hours and confirm eligibility. You will receive a Return Merchandise Authorization (RMA) number."
          />
          <StepCard
            step="03"
            title="Ship the Product"
            desc="Pack the product securely in its original packaging with the original invoice. Ship to our registered address using a trackable courier. Return shipping for damaged products is borne by Rehnoor Jewels."
          />
          <StepCard
            step="04"
            title="Quality Inspection"
            desc="Once received, our team inspects the returned product within 2–3 business days and confirms the refund or replacement decision."
          />
          <StepCard
            step="05"
            title="Refund Processed"
            desc="Approved refunds are processed to the original payment method within 5–7 business days from the date of inspection approval."
          />
        </div>
      </PolicySection>

      {/* ── Refund Information ── */}
      <PolicySection title="Refund Information">
        <PolicyP>
          All approved refunds are processed to the{" "}
          <strong>original payment method</strong> used at the time of purchase.
          We do not issue store credit or gift card refunds unless specifically
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
            {
              label: "Extended Return Shipping",
              value: "Paid by Customer",
            },
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

      {/* ── Warranty ── */}
      <PolicySection title="Product Warranty">
        <PolicyP>
          All Rehnoor Jewels products come with a{" "}
          <strong>6-month warranty</strong> against manufacturing defects from
          the date of purchase. Our products feature pure 24K gold plating with
          approximately 100–300 mg of 24K gold per piece to ensure durability
          and longevity.
        </PolicyP>
        <PolicyList
          items={[
            "6-month warranty covering manufacturing defects from purchase date",
            "Warranty does not cover damage due to misuse, chemical exposure, or physical impact",
            "Warranty claims require the original purchase invoice — no exceptions",
            "Warranty repairs or replacements subject to product availability",
            "Gold plating warranty covers significant plating loss under normal wear conditions",
          ]}
        />
      </PolicySection>

      {/* ── Product Certification ── */}
      <PolicySection title="Product Certification">
        <PolicyP>
          All Rehnoor Jewels products are crafted with pure 24K gold plating.
          Each piece contains approximately 100–300 mg of 24K gold, ensuring
          durability, lustre, and value. Our products comply with BIS
          hallmarking standards applicable to gold-plated jewellery.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Gold Purity", value: "24K Gold Plating" },
            { label: "Gold Content per Piece", value: "100–300 mg (approx.)" },
            { label: "Certification", value: "BIS Hallmarked" },
            { label: "Warranty Period", value: "6 Months from Purchase" },
          ]}
        />
      </PolicySection>
    </PolicyPageShell>
  );
}
