// app/api/magic-checkout/shipping-info/route.ts
//
// PUBLIC — Razorpay's servers call this directly while the checkout modal is
// open, so it must NOT sit behind your normal auth middleware.
//
// Paste this route's full URL into: Razorpay Dashboard → Magic Checkout →
// Checkout Settings → Shipping Setup → "URL for shipping info".
// While testing locally, expose it with: ngrok http 3000

import { NextRequest, NextResponse } from "next/server";

interface AddressIn {
  id: string;
  zipcode: string;
  state_code?: string;
  country: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const addresses: AddressIn[] = body.addresses || [];

    // ── TODO: replace this stub with your real serviceability/rate logic ────
    // e.g. look up a Pincode/Zone collection, or call an existing shipping
    // service you already use in your Node.js backend.
    const FLAT_SHIPPING_FEE = 0; // paise — 0 = free shipping for the trial
    const COD_FEE = 4000; // paise — ₹40 COD handling fee
    const COD_ENABLED = true;
    const NON_SERVICEABLE_PREFIXES = ["19", "79"]; // example placeholder rule

    const addressesOut = addresses.map((addr) => {
      const serviceable = !NON_SERVICEABLE_PREFIXES.some((p) =>
        addr.zipcode?.startsWith(p),
      );

      return {
        id: addr.id,
        zipcode: addr.zipcode,
        country: addr.country,
        shipping_methods: [
          {
            id: "standard",
            name: "Standard Delivery",
            description: "5-7 business days",
            serviceable,
            shipping_fee: serviceable ? FLAT_SHIPPING_FEE : 0,
            cod: serviceable && COD_ENABLED,
            cod_fee: serviceable && COD_ENABLED ? COD_FEE : 0,
          },
        ],
      };
    });

    return NextResponse.json({ addresses: addressesOut });
  } catch (err: any) {
    console.error("magic-checkout/shipping-info error:", err);
    return NextResponse.json(
      { message: "Could not resolve shipping info." },
      { status: 500 },
    );
  }
}
