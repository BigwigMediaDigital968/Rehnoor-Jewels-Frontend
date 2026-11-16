import { NextRequest, NextResponse } from "next/server";

// Simple in-memory cache for Shiprocket auth token (valid 10 days; refresh every 9 days)
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getShiprocketToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_API_EMAIL,
        password: process.env.SHIPROCKET_API_PASSWORD,
      }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to authenticate with Shiprocket");
  }

  const data = await res.json();
  cachedToken = data.token;
  tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000; // 9 days
  return data.token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const deliveryPincode = searchParams.get("pincode");
  const weight = searchParams.get("weight") || "0.2"; // Default 200g for jewelry
  const cod = searchParams.get("cod") || "0";

  if (!deliveryPincode || !/^\d{6}$/.test(deliveryPincode)) {
    return NextResponse.json(
      { serviceable: false, message: "Please enter a valid 6-digit pincode." },
      { status: 400 },
    );
  }

  try {
    const token = await getShiprocketToken();
    const pickupPincode = process.env.SHIPROCKET_PICKUP_PINCODE || "110001";

    const url = new URL(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
    );
    url.searchParams.set("pickup_postcode", pickupPincode);
    url.searchParams.set("delivery_postcode", deliveryPincode);
    url.searchParams.set("weight", weight);
    url.searchParams.set("cod", cod);

    const srRes = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const srData = await srRes.json();
    const couriers = srData?.data?.available_courier_companies || [];

    if (!srRes.ok || couriers.length === 0) {
      return NextResponse.json({
        serviceable: false,
        message: "Delivery is currently unavailable for this pincode.",
      });
    }

    // Pick the fastest available courier based on estimated_delivery_days
    const fastestCourier = [...couriers].sort(
      (a, b) =>
        Number(a.estimated_delivery_days || 99) -
        Number(b.estimated_delivery_days || 99),
    )[0];

    const codAvailable = couriers.some((c: { cod?: number }) => c.cod === 1);

    return NextResponse.json({
      serviceable: true,
      etd: fastestCourier.etd, // e.g. "Nov 20, 2026"
      estimatedDays: Number(fastestCourier.estimated_delivery_days),
      courierName: fastestCourier.courier_name,
      city: fastestCourier.city || "",
      state: fastestCourier.state || "",
      codAvailable,
    });
  } catch (error) {
    console.error("Shiprocket API error:", error);
    return NextResponse.json(
      {
        serviceable: false,
        message: "Unable to check delivery right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
