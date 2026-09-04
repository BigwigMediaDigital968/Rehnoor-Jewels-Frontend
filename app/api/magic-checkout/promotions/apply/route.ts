// app/api/magic-checkout/promotions/apply/route.ts
//
// PUBLIC — Razorpay calls this when the customer applies a coupon code
// inside the checkout modal. Paste this URL into: Magic Checkout →
// Checkout Settings → Coupon Settings → "URL for apply promotions".
//
// "Magic Checkout automatically handles all discount calculations on the
// UI" — you just need to return the discount value; you don't need to
// re-issue a new Razorpay order.

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/server/mongodb";
import MagicOrder from "@/app/models/MagicOrder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id: receipt, code } = body; // order_id here = your `receipt`

    await dbConnect();
    const order = await MagicOrder.findOne({ receipt });

    if (!order) {
      return NextResponse.json(
        { error: { description: "Order not found." } },
        { status: 404 },
      );
    }

    // ── TODO: replace with a real lookup against your Coupon collection ─────
    const COUPONS: Record<string, { type: "percentage" | "fixed_amount"; value: number; maxDiscount?: number }> = {
      WELCOME10: { type: "percentage", value: 1000, maxDiscount: 50000 }, // 10%, capped ₹500
    };

    const coupon = COUPONS[String(code).toUpperCase()];
    if (!coupon) {
      return NextResponse.json(
        { error: { description: "This coupon code is invalid or has expired." } },
        { status: 400 },
      );
    }

    let discountPaise: number;
    if (coupon.type === "percentage") {
      discountPaise = Math.round((order.amounts.lineItemsTotal * coupon.value) / 10000);
      if (coupon.maxDiscount) discountPaise = Math.min(discountPaise, coupon.maxDiscount);
    } else {
      discountPaise = coupon.value;
    }

    order.coupon = { code, discountAmount: discountPaise };
    await order.save();

    return NextResponse.json({
      promotion: {
        reference_id: `promo_${order._id}_${code}`,
        code,
        type: "coupon",
        value: discountPaise,
        value_type: "fixed_amount",
        description: `Coupon ${code} applied`,
      },
    });
  } catch (err: any) {
    console.error("magic-checkout/promotions/apply error:", err);
    return NextResponse.json(
      { error: { description: "Could not apply coupon." } },
      { status: 500 },
    );
  }
}
