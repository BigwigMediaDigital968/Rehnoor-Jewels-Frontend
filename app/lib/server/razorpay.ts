// app/lib/server/razorpay.ts
//
// npm install razorpay  (server-side SDK — separate from the client-side
// magic-checkout.js script tag)
//
// Requires in .env.local:
//   RAZORPAY_KEY_ID
//   RAZORPAY_KEY_SECRET
//   RAZORPAY_WEBHOOK_SECRET
//   NEXT_PUBLIC_RAZORPAY_KEY_ID   ← same value as RAZORPAY_KEY_ID, exposed to the client

import Razorpay from "razorpay";
import crypto from "crypto";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error(
    "Missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET in environment variables.",
  );
}

export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

/**
 * Verifies the razorpay_signature returned to the client after a successful
 * payment. Uses YOUR server-side `receipt`/order id (not the client-supplied
 * one) as the source of truth.
 */
export function verifyPaymentSignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const generated = crypto
    .createHmac("sha256", keySecret as string)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generated === signature;
}

/**
 * Verifies the X-Razorpay-Signature header on incoming webhook requests.
 * `rawBody` must be the exact, unparsed request body string.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("Missing RAZORPAY_WEBHOOK_SECRET environment variable.");
  }

  const generated = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  return generated === signature;
}
