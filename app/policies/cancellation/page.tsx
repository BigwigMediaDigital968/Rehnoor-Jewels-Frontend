// app/policies/cancellation/page.tsx
"use client";

import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import {
  PolicyPageShell,
  PolicySection,
  PolicyP,
  PolicyList,
  HighlightBox,
  InfoGrid,
} from "../component/PolicyLayout";

export default function CancellationPolicyPage() {
  return (
    <PolicyPageShell
      activeKey="cancellation"
      title="Cancellation Policy"
      lastUpdated="01 April 2026"
    >
      {/* ── Overview ── */}
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

      {/* ── Before Dispatch ── */}
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
            "Include your Order ID and reason for cancellation in the request",
            "Cancellations are processed on a best-effort basis during business hours (Mon–Sat, 10 AM – 6 PM)",
            "If the order has already been dispatched when your request is received, cancellation is not possible",
            "For pre-paid orders, a full refund will be processed upon successful cancellation confirmation",
          ]}
        />
      </PolicySection>

      {/* ── After Dispatch ── */}
      <PolicySection title="After Dispatch — Cancellation Not Possible">
        <PolicyP>
          Once an order has been dispatched by our courier partner ShipRocket,
          we are unable to cancel or intercept the shipment. In such cases, your
          available options are:
        </PolicyP>
        <PolicyList
          items={[
            "Refuse delivery at the door — the package will be returned to our warehouse",
            "Accept delivery and raise a return request within 7 days (if the product is damaged)",
            "Accept delivery and initiate an extended return within 6 months (50% refund with original bill)",
            "Note: Original shipping charges may not be refunded for refused deliveries",
          ]}
        />
        <HighlightBox
          icon={<AlertTriangle size={14} />}
          title="Post-Dispatch Important Note"
          variant="red"
        >
          If you refuse delivery of an undamaged product without a valid reason,
          return shipping costs may be deducted from your refund. We encourage
          contacting us before refusing delivery so our team can assist you with
          the best solution.
        </HighlightBox>
      </PolicySection>

      {/* ── Refund for Cancelled Orders ── */}
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
              note: "Refunded to the card used. May take an additional 2–3 days to reflect depending on your bank.",
            },
            {
              method: "Razorpay Wallet / EMI",
              timeline: "5–7 Business Days",
              note: "Refunded to the Razorpay wallet or EMI adjusted as per payment terms",
            },
            {
              method: "Cash on Delivery (COD)",
              timeline: "Not Applicable",
              note: "No payment was collected. No charge applies for COD orders cancelled before dispatch.",
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

      {/* ── Cancellation by Rehnoor ── */}
      <PolicySection title="Order Cancellation by Rehnoor Jewels">
        <PolicyP>
          In certain circumstances, we may need to cancel your order. This may
          occur if:
        </PolicyP>
        <PolicyList
          items={[
            "The product is out of stock or no longer available at the time of fulfilment",
            "There is a pricing error or technical error in the product listing",
            "Payment verification fails or the transaction is flagged as potentially fraudulent",
            "The delivery address is unserviceable by our courier partners",
            "The order does not comply with our terms and conditions",
            "Force majeure circumstances prevent timely fulfilment",
          ]}
        />
        <PolicyP>
          In all such cases, we will notify you promptly via email and provide a{" "}
          <strong>full refund</strong> within 5–7 business days. We sincerely
          apologise for any inconvenience caused.
        </PolicyP>
      </PolicySection>

      {/* ── How to Request ── */}
      <PolicySection title="How to Request a Cancellation">
        <PolicyP>
          To request an order cancellation, please contact us through any of the
          following channels during our business hours:
        </PolicyP>
        <InfoGrid
          items={[
            { label: "Email", value: "hello@rehnoorjewels.com" },
            { label: "WhatsApp", value: "+91 84485 81529" },
            { label: "Phone (Alternate)", value: "+91 85958 14465" },
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
    </PolicyPageShell>
  );
}
