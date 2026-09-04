// app/api/magic-checkout/promotions/get/route.ts
//
// PUBLIC — Razorpay calls this to populate the coupon list shown inside the
// checkout modal. Paste this URL into: Magic Checkout → Checkout Settings →
// Coupon Settings → "URL for get promotions".

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // body: { order_id, contact, email }  — order_id is your `receipt`

    // ── TODO: replace with a real lookup against your Coupon collection ─────
    // For the trial, return a couple of static example coupons so you can
    // see the widget render. Wire this to your actual coupon data before
    // going further than a demo.
    const promotions = [
      {
        code: "WELCOME10",
        summary: "10% off on your order",
        description: "Get 10% off, up to ₹500, on your first order.",
      },
    ];

    return NextResponse.json({ promotions });
  } catch (err: any) {
    console.error("magic-checkout/promotions/get error:", err);
    return NextResponse.json({ promotions: [] });
  }
}
