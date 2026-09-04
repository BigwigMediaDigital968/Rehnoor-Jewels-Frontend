// app/api/magic-checkout/verify/route.ts
//
// Called from useMagicCheckout.ts right after the Razorpay modal reports
// success. Mirrors the verification step your existing
// useRazorpayCheckout.ts already does.

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/server/mongodb";
import { verifyPaymentSignature, razorpay } from "@/app/lib/server/razorpay";
import MagicOrder from "@/app/models/MagicOrder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      magicOrderId,
      razorpay_order_id: clientRazorpayOrderId,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    await dbConnect();
    const order = await MagicOrder.findById(magicOrderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 },
      );
    }

    // Use the order id WE stored on our server, not the one the client sent —
    // this is what stops a tampered client payload from forging a signature.
    const trustedRazorpayOrderId = order.razorpayOrderId;

    if (!trustedRazorpayOrderId || trustedRazorpayOrderId !== clientRazorpayOrderId) {
      return NextResponse.json(
        { success: false, message: "Order id mismatch." },
        { status: 400 },
      );
    }

    const isValid = verifyPaymentSignature({
      orderId: trustedRazorpayOrderId,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      order.status = "failed";
      await order.save();
      return NextResponse.json(
        { success: false, message: "Payment signature verification failed." },
        { status: 400 },
      );
    }

    // Double-check against Razorpay directly for the actual captured amount
    // and method (covers COD-placed orders too).
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    order.status = payment.status === "captured" || payment.method === "cod" ? "paid" : "placed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paymentMethod = payment.method === "cod" ? "cod" : "razorpay";
    order.amounts.total = Number(payment.amount);
    await order.save();

    return NextResponse.json({
      success: true,
      data: {
        orderId: String(order._id),
        orderNumber: order.receipt,
        total: order.amounts.total / 100,
        paymentMethod: order.paymentMethod,
      },
    });
  } catch (err: any) {
    console.error("magic-checkout/verify error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Verification failed." },
      { status: 500 },
    );
  }
}
