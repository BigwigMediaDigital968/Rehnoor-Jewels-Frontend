// app/policies/shipping/page.tsx
"use client";

import { Truck, AlertTriangle, Info } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
} from "../component/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyPageShell
      activeKey="shipping"
      title="Shipping Policy"
      lastUpdated="01 April 2026"
    >
      {/* ── Overview ── */}
      <PolicySection title="Overview">
        <PolicyP>
          At Rehnoor Jewels, we are committed to delivering your precious gold
          jewellery safely and promptly across India. All shipments are handled
          with utmost care and dispatched through our trusted courier partner
          ShipRocket.
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Courier Partner", value: "ShipRocket Network" },
            { label: "Delivery Coverage", value: "Pan India" },
            { label: "Order Processing", value: "24–48 Hours" },
            { label: "Support Hours", value: "Mon–Sat, 10 AM – 6 PM" },
          ]}
        />
      </PolicySection>

      {/* ── Destinations ── */}
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

      {/* ── Processing Time ── */}
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

      {/* ── Delivery Timelines ── */}
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

      {/* ── Shipping Charges ── */}
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
            "Charges are displayed transparently at checkout before payment",
            "COD orders carry an additional handling fee of ₹99",
            "In case of any shipping charge discrepancy, please contact support before placing the order",
          ]}
        />
      </PolicySection>

      {/* ── Packaging ── */}
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
            "Anti-tarnish inner wrapping to preserve 24K gold plating quality",
            "Signature Rehnoor Jewels branded gift box included with every order",
            "Fragile sticker and handling instructions on all parcels",
            "Product quality inspection conducted before dispatch",
          ]}
        />
      </PolicySection>

      {/* ── Tracking ── */}
      <PolicySection title="Tracking Your Order">
        <PolicyP>
          Once your order is dispatched, you will receive a tracking number via
          email and WhatsApp. You can track your shipment on the ShipRocket
          portal or through the tracking link in your confirmation message.
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

      {/* ── Failed Delivery ── */}
      <PolicySection title="Failed Delivery & Re-attempts">
        <PolicyP>
          If a delivery attempt fails, the courier partner will make up to 3
          delivery attempts. After 3 failed attempts, the package will be
          returned to our warehouse. Re-shipping charges will apply for
          re-dispatch.
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

      {/* ── Contact ── */}
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
    </PolicyPageShell>
  );
}
