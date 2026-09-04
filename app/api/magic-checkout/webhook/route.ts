// app/api/magic-checkout/webhook/route.ts
//
// PUBLIC — configure this URL in Razorpay Dashboard → Account & Settings →
// Webhooks, with the same secret you put in RAZORPAY_WEBHOOK_SECRET.
// Subscribe at least to: payment.captured, order.paid
//
// Why this matters for Magic Checkout specifically: "If no API call is made
// within 45 seconds [of payment], our background job will assume there is a
// network drop off and will proceed to place the order" — the webhook is
// what lets your DB find out about that order even if the customer's
// browser never returns to your site (e.g. closed the tab, phone died).

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/server/mongodb";
import { verifyWebhookSignature } from "@/app/lib/server/razorpay";
import MagicOrder from "@/app/models/MagicOrder";

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // must read as raw text BEFORE any JSON parsing
  const signature = req.headers.get("x-razorpay-signature") || "";

  let isValid = false;
  try {
    isValid = verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error("Webhook signature check errored:", err);
  }

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event;

  try {
    await dbConnect();

    if (event === "payment.captured" || event === "order.paid") {
      const razorpayOrderId =
        payload.payload?.payment?.entity?.order_id ||
        payload.payload?.order?.entity?.id;
      const paymentId = payload.payload?.payment?.entity?.id;
      const amount = payload.payload?.payment?.entity?.amount;
      const method = payload.payload?.payment?.entity?.method;

      if (razorpayOrderId) {
        const order = await MagicOrder.findOne({ razorpayOrderId });
        if (order && order.status !== "paid" && order.status !== "placed") {
          order.status = method === "cod" ? "placed" : "paid";
          if (paymentId) order.razorpayPaymentId = paymentId;
          if (amount) order.amounts.total = Number(amount);
          if (method) order.paymentMethod = method === "cod" ? "cod" : "razorpay";
          await order.save();
        }
      }
    }

    // Always 200 quickly so Razorpay doesn't retry unnecessarily.
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("magic-checkout/webhook error:", err);
    // Still 200 — log and investigate manually rather than causing retries
    // that could double-process the same event.
    return NextResponse.json({ received: true, warning: "processing error" });
  }
}
