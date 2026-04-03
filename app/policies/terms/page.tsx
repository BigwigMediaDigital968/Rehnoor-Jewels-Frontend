// app/policies/terms/page.tsx
"use client";

import { AlertTriangle, Info } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
} from "../component/PolicyLayout";

export default function TermsConditionsPage() {
  return (
    <PolicyPageShell
      activeKey="terms"
      title="Terms & Conditions"
      lastUpdated="01 April 2026"
    >
      {/* ── Agreement ── */}
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
          By accessing <strong>rehnoorjewels.com</strong>, creating an account,
          or placing an order, you agree to be bound by these Terms. If you do
          not agree, please do not use our website or services.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Legal Entity", value: "Rehnoor Jewels (Proprietorship)" },
            { label: "GST Number", value: "07BFIPT1365P1ZQ" },
            {
              label: "Registered Address",
              value: "10722, Pratap Nagar, Delhi 110007",
            },
            { label: "Governing Law", value: "Laws of India" },
          ]}
        />
      </PolicySection>

      {/* ── Website Usage ── */}
      <PolicySection title="Website Usage Rules">
        <PolicyP>
          You agree to use this website only for lawful purposes and in a manner
          that does not infringe the rights of others or restrict their use of
          the website. Specifically, you must not:
        </PolicyP>
        <PolicyList
          items={[
            "Use the website in any way that violates applicable Indian or international law",
            "Transmit any unsolicited or unauthorized advertising or promotional material (spam)",
            "Attempt to gain unauthorized access to any part of the website or its servers",
            "Introduce any viruses, trojans, worms, or other malicious or harmful code",
            "Impersonate any person or misrepresent your affiliation with any entity",
            "Reproduce, distribute, or exploit any content from this website without written permission",
            "Use automated scripts, bots, or scrapers to access or extract content from the website",
            "Engage in any conduct that disrupts, disables, or interferes with the website's operation",
          ]}
        />
      </PolicySection>

      {/* ── Account Creation ── */}
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
            "We reserve the right to suspend or terminate accounts that violate these Terms",
            "One account per person — multiple accounts for fraudulent purposes are strictly prohibited",
            "You must be at least 18 years of age to create an account and place an order",
          ]}
        />
      </PolicySection>

      {/* ── Product Accuracy ── */}
      <PolicySection title="Products & Accuracy Disclaimer">
        <PolicyP>
          We make every effort to display our products as accurately as
          possible. However, we cannot guarantee that your device's display of
          colours, texture, and product details will be entirely accurate.
        </PolicyP>
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Product Accuracy Disclaimer"
          variant="gold"
        >
          Product images are for illustrative purposes only. Actual colours,
          finish, and appearance may vary slightly due to photography lighting,
          screen display settings, and the handcrafted nature of gold jewellery.
          Minor variations in appearance are inherent to the manufacturing
          process and do <strong>not</strong> constitute defects.
        </HighlightBox>
        <PolicyList
          items={[
            "Product weights and dimensions are approximate and may vary by ±5%",
            "Gold plating (100–300 mg per piece) is an average range and may vary by design",
            "Gemstone or stone embellishments may have natural variations in colour and clarity",
            "Images may show products styled with accessories not included in the listing",
            "We do not warrant that product descriptions are error-free, complete, or current",
          ]}
        />
      </PolicySection>

      {/* ── Pricing ── */}
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
          <strong>Prices are subject to change without prior notice.</strong>{" "}
          Gold jewellery prices are directly linked to the prevailing 24K gold
          market rate, which fluctuates daily based on commodity markets,
          international gold prices, and currency exchange rates. The price at
          the time of placing your order is the confirmed price — subsequent
          price changes do not affect confirmed and paid orders.
        </HighlightBox>
        <PolicyList
          items={[
            "Prices are subject to change at any time based on 24K gold market rates",
            "The confirmed order price is locked at the time of successful payment",
            "Promotional or sale prices are valid only for the specified period",
            "Shipping charges are additional and calculated at checkout",
            "COD orders carry an additional handling fee of ₹99",
            "We reserve the right to cancel orders placed at clearly erroneous or typographical prices",
          ]}
        />
      </PolicySection>

      {/* ── Payment ── */}
      <PolicySection title="Payment Terms">
        <PolicyP>
          We accept a variety of payment methods through our PCI-DSS compliant
          payment gateway, Razorpay. By making a payment, you confirm that the
          payment instrument belongs to you or that you are authorised to use
          it.
        </PolicyP>
        <PolicyList
          items={[
            "Accepted methods: UPI, Credit Cards, Debit Cards, Net Banking, Wallets, EMI",
            "Cash on Delivery (COD) available with an additional ₹99 handling fee",
            "All online payments are processed by Razorpay (PCI-DSS Level 1 certified)",
            "We do not store your card or bank account details on our servers",
            "In case of a failed payment, please do not retry before confirming with your bank",
            "Any unauthorized charges must be reported to us within 7 days of the transaction",
          ]}
        />
      </PolicySection>

      {/* ── Intellectual Property ── */}
      <PolicySection title="Intellectual Property">
        <PolicyP>
          All content on this website — including but not limited to product
          photographs, design layouts, brand logos, product descriptions,
          jewellery designs, and website code — is the exclusive intellectual
          property of Rehnoor Jewels and is protected under the{" "}
          <strong>Copyright Act, 1957</strong> and applicable Indian
          intellectual property laws.
        </PolicyP>
        <PolicyList
          items={[
            "The Rehnoor Jewels brand name, logo, and trademarks are proprietary and may not be used without written consent",
            "Product designs and photographs may not be reproduced, modified, or distributed without permission",
            "Any unauthorized use of our intellectual property will be subject to legal action",
            "User-generated content (reviews, photos) shared with us may be used in our marketing with attribution",
            "We respect third-party intellectual property and will address any copyright notices promptly",
          ]}
        />
      </PolicySection>

      {/* ── Limitation of Liability ── */}
      <PolicySection title="Limitation of Liability">
        <PolicyP>
          To the maximum extent permitted by applicable law, Rehnoor Jewels
          shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of your use of our
          website or products. Our total liability for any claim shall not
          exceed the amount you paid for the specific product giving rise to the
          claim.
        </PolicyP>
        <PolicyList
          items={[
            "We are not liable for delays caused by courier partners, natural calamities, or force majeure events",
            "We are not responsible for website downtime, technical errors, or data loss beyond our control",
            "We do not guarantee that the website will always be available, error-free, or virus-free",
            "Product descriptions and prices are subject to change without notice",
          ]}
        />
      </PolicySection>

      {/* ── Governing Law ── */}
      <PolicySection title="Governing Law & Dispute Resolution">
        <PolicyP>
          These Terms shall be governed by and construed in accordance with the
          laws of <strong>India</strong>. Any dispute arising from these Terms
          or your use of our website shall be subject to the exclusive
          jurisdiction of the courts located in{" "}
          <strong>New Delhi, India</strong>.
        </PolicyP>
        <PolicyList
          items={[
            "Governing law: The laws of India, including the Consumer Protection Act, 2019",
            "Jurisdiction: Courts of New Delhi, Delhi",
            "We encourage resolving disputes amicably through our customer support before pursuing legal action",
            "Disputes related to payment transactions are additionally governed by RBI guidelines",
            "For consumer complaints, you may also approach the National Consumer Helpline: 1800-11-4000",
          ]}
        />
      </PolicySection>

      {/* ── Changes ── */}
      <PolicySection title="Changes to Terms">
        <PolicyP>
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting on this page. Continued use of
          our website after any modifications constitutes your acceptance of the
          revised Terms. We recommend reviewing this page periodically.
        </PolicyP>
        <PolicyP>
          For any questions about these Terms, please contact us at{" "}
          <strong>hello@rehnoorjewels.com</strong>.
        </PolicyP>
      </PolicySection>
    </PolicyPageShell>
  );
}
