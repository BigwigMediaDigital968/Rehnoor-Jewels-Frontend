// lib/api/orders.ts
// All HTTP calls to the order backend. Single source of truth.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface PlaceOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    quantity: number;
    sizeSelected: string;
    customNote?: string;
  }[];
  shippingAddress: Record<string, string>;
  billingAddress?: Record<string, string>;
  billingSameAsShipping: boolean;
  paymentMethod: string;
  coupon?: {
    code: string;
    discountType: string;
    discountValue: number;
    discountAmount: number;
  } | null;
  customerNote: string;
  giftMessage: string;
  isGift: boolean;
  source: string;
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  data?: {
    _id: string;
    orderNumber: string;
    status: string;
    total: number;
    paymentMethod: string;
  };
}

export async function placeOrder(
  payload: PlaceOrderPayload,
): Promise<PlaceOrderResponse> {
  const res = await fetch(`${BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Razorpay: create gateway order → get orderId + amount
export async function createRazorpayOrder(amount: number, orderNumber: string) {
  const res = await fetch(`${BASE}/api/payment/razorpay/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR", receipt: orderNumber }),
  });
  return res.json();
}

// Razorpay: verify signature after payment
export async function verifyRazorpayPayment(data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderNumber: string;
}) {
  const res = await fetch(`${BASE}/api/payment/razorpay/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Validate coupon server-side
export async function validateCoupon(code: string, subtotal: number) {
  const res = await fetch(`${BASE}/api/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, subtotal }),
  });
  return res.json();
}
