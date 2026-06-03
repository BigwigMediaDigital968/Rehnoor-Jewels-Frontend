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
import Link from "next/link";

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
          At Rehnoor Jewels, we want you to love every piece you receive. If for
          any reason you're not completely satisfied, we've made our return and
          refund process simple and stress-free. Return requests must be raised
          within 7 days of delivery.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Standard Return Window", value: "7 Days from Delivery" },
            {
              label: "Shop with Confidence",
              value: "Effective & Transparent",
            },
            { label: "Refund Method", value: "Provided Payment Method" },
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
              "Return request must be raised within 7 days of delivery",
              "Items must be unused, unworn, and with original packaging and tags intact",
              "An unboxing video is required for missing item claims recorded from the sealed state",
              "Minimum 2 clear images of the product are required with your return request",
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
            "Custom-made or personalised jewellery",
            "Products that have been used, worn, or altered in any way",
            "Products without original packaging, tags, or authenticity seal",
            "Items purchased during clearance or final sale (as noted on the product page)",
            "Products purchased under Buy 1 Get 1 or promotional offers are eligible for store credit only",
          ]}
        />
        {/* <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="No Custom Orders Currently"
          variant="gold"
        >
          Rehnoor Jewels does not offer custom-designed jewellery at this time.
          All products listed on our website are standard designs available for
          purchase.
        </HighlightBox> */}
      </PolicySection>

      {/* ── Extended Return ── */}
      {/* <PolicySection title="Extended Return — 6-Month Policy (50% Refund)">
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
      </PolicySection> */}

      {/* ── How to Return ── */}
      <PolicySection title="How to Initiate a Return">
        <PolicyP>
          To begin your return, reach out to us via Email or WhatsApp (details
          at the bottom of this page) with the following information:
        </PolicyP>
        <div className="flex flex-col gap-3 mt-2">
          <StepCard
            step="01"
            title="Share your Order ID &amp; contact number"
            desc="Provide your Rehnoor Jewels Order ID (beginning with RJ-YYYY) and the contact number used at the time of placing the order."
          />
          <StepCard
            step="02"
            title="Select the items you wish to return"
            desc="Mention the specific product(s) SKU ID from your order that you&#39;d like to return."
          />
          <StepCard
            step="03"
            title="Provide return details"
            desc="Share your return reason, upload a minimum of 2 clear product images, your pickup address, and your chosen refund method."
          />
          <StepCard
            step="04"
            title="Await confirmation from our team"
            desc="Our team will review your request and confirm the pickup schedule and next steps within 1–2 business days."
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
          <strong>provided payment method</strong> used at the time of
          purchase/return request. We do not issue store credit or gift card
          refunds unless specifically requested by the customer.
        </PolicyP>
        <InfoGrid
          items={[
            {
              label: "Refund processing time (post pickup & verification)",
              value: "7–10 working days",
            },
            {
              label: "Processed as per RBI guidelines",
              value: "Regulatory compliance",
            },
            {
              label: "Prepaid Orders",
              value:
                "Original Payment Method/Refunded to the card, wallet, or UPI used at the time of checkout.",
            },
            {
              label: "COD Orders",
              value:
                "UPI or Bank Transfer/Refunded to the UPI ID or bank account details provided by you during the return process.",
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
          Every Rehnoor Jewels piece is backed by a{" "}
          <strong>6-month warranty</strong> from the date of delivery.
        </PolicyP>
        <h3>What's Covered</h3>
        <PolicyList
          items={[
            "6-month warranty covering manufacturing defects from purchase date",
            "Warranty does not cover damage due to misuse, chemical exposure, or physical impact",
            "Warranty claims require the original purchase invoice — no exceptions",
            "Warranty repairs or replacements subject to product availability",
            "Gold plating warranty covers significant plating loss under normal wear conditions",
          ]}
        />
        <h3>What's Not Covered</h3>
        <PolicyList
          items={[
            "Damage caused by mishandling, accidents, or improper storage",
            "Normal wear and tear, scratches, or tarnishing from everyday use",
            "Damage resulting from exposure to chemicals, perfumes, or water",
            "Custom-made or personalised jewellery (covered separately on a case-by-case basis)",
            "Products that have been repaired or altered by a third party",
          ]}
        />
      </PolicySection>

      {/* ──How to claim Warranty ── */}
      <PolicySection title="How to Claim Your Warranty">
        <PolicyP>
          To raise a warranty claim, contact us via Email or WhatsApp within the
          6-month warranty period with:
        </PolicyP>

        <PolicyList
          items={[
            "Your Order ID (beginning with RJ-YYYY)",
            "A clear description of the defect",
            "Minimum 2 photographs clearly showing the defect",
            "Proof of purchase or delivery confirmation",
          ]}
        />

        <PolicyP>
          <strong>Warranty Resolution: </strong>Upon verification, we will offer
          a free repair, replacement, or store credit at our discretion.
          Warranty claims are processed within 5–7 business days of receiving
          the item.
        </PolicyP>
      </PolicySection>

      {/* ── Contact CTA ── */}
      <PolicySection title="Need Help? We're Here for You">
        <PolicyP>
          For any return, refund, or warranty queries, reach out to our support
          team via email or WhatsApp. We typically respond within a few hours
          during business hours.
        </PolicyP>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-4">
          <Link
            href="mailto:hello@rehnoorjewels.com"
            className="flex items-center justify-center text-center text-[var(--rj-emerald)] rounded-2xl transition-all duration-300 border border-amber-200 px-5 py-4 hover:bg-amber-300 hover:text-[var(--rj-emerald)]"
          >
            📧 hello@rehnoorjewels.com
          </Link>

          <Link
            href="https://wa.me/918448581529"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-center text-[var(--rj-emerald)] rounded-2xl transition-all duration-300 border border-amber-200 px-5 py-4 hover:bg-amber-300 hover:text-[var(--rj-emerald)]"
          >
            💬 +91 84485 81529
          </Link>
        </div>
      </PolicySection>

      {/* ── Product Certification ── */}
      {/* <PolicySection title="Product Certification">
        <PolicyP>
          All Rehnoor Jewels products are crafted with pure 24K gold plating.
          Each piece contains approximately 100–300 mg of 24K gold, ensuring
          durability, lustre, and value.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Gold Purity", value: "24K Gold Plating" },
            { label: "Gold Content per Piece", value: "100–300 mg (approx.)" },
            { label: "100%", value: "Authenticated" },
            { label: "Warranty Period", value: "6 Months from Purchase" },
          ]}
        />
      </PolicySection> */}
    </PolicyPageShell>
  );
}
