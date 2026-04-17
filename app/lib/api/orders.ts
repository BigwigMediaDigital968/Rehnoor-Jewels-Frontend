// // lib/api/orders.ts
// // All HTTP calls to the order backend. Single source of truth.

// const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// export interface PlaceOrderPayload {
//   customerName: string;
//   customerEmail: string;
//   customerPhone: string;
//   items: {
//     productId: string;
//     quantity: number;
//     sizeSelected: string;
//     customNote?: string;
//   }[];
//   shippingAddress: Record<string, string>;
//   billingAddress?: Record<string, string>;
//   billingSameAsShipping: boolean;
//   paymentMethod: string;
//   coupon?: {
//     code: string;
//     discountType: string;
//     discountValue: number;
//     discountAmount: number;
//   } | null;
//   customerNote: string;
//   giftMessage: string;
//   isGift: boolean;
//   source: string;
// }

// export interface PlaceOrderResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     _id: string;
//     orderNumber: string;
//     status: string;
//     total: number;
//     paymentMethod: string;
//   };
// }

// export async function placeOrder(
//   payload: PlaceOrderPayload,
// ): Promise<PlaceOrderResponse> {
//   const res = await fetch(`${BASE}/api/orders`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return res.json();
// }

// // Razorpay: create gateway order → get orderId + amount
// export async function createRazorpayOrder(amount: number, orderNumber: string) {
//   const res = await fetch(`${BASE}/api/payment/razorpay/create`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ amount, currency: "INR", receipt: orderNumber }),
//   });
//   return res.json();
// }

// // Razorpay: verify signature after payment
// export async function verifyRazorpayPayment(data: {
//   razorpay_order_id: string;
//   razorpay_payment_id: string;
//   razorpay_signature: string;
//   orderNumber: string;
// }) {
//   const res = await fetch(`${BASE}/api/payment/razorpay/verify`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// }

// // Validate coupon server-side
// export async function validateCoupon(code: string, subtotal: number) {
//   const res = await fetch(`${BASE}/api/coupons/validate`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ code, subtotal }),
//   });
//   return res.json();
// }

// lib/api/orders.ts
// Single source of truth for all order-related HTTP calls.
// Never call fetch() for orders anywhere else in the app.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function authHeader(): Record<string, string> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("rj_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
      ...(options.headers ?? {}),
    },
  });

  // Clone so we can read body regardless of status
  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message ?? "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  quantity: number;
  sizeSelected: string;
  customNote?: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark?: string;
}

export interface CouponPayload {
  code: string;
  discountType: "flat" | "percent";
  discountValue: number;
  discountAmount: number;
}

export type PaymentMethod = "cod" | "razorpay" | "upi" | "bank_transfer";

export interface PlaceOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  billingSameAsShipping: boolean;
  paymentMethod: PaymentMethod;
  coupon?: CouponPayload | null;
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
    paymentMethod: PaymentMethod;
    // Only present when paymentMethod === "razorpay"
    razorpayOrderId?: string;
  };
}

export interface RazorpayVerifyPayload {
  orderId: string; // our MongoDB _id
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Tracking
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  done: boolean;
  description?: string;
}

export interface TrackOrderResponse {
  success: boolean;
  data?: {
    orderNumber: string;
    status: string;
    placedAt: string;
    estimatedDeliveryDate?: string;
    customerName: string;
    // Product snapshot
    items: {
      name: string;
      image: string;
      purity: string;
      quantity: number;
      lineTotal: number;
    }[];
    // Shipping from Shiprocket
    shipping: {
      carrier?: string;
      courierName?: string;
      trackingNumber?: string;
      awbCode?: string;
      trackingUrl?: string;
      method: string;
      shippedAt?: string;
      deliveredAt?: string;
      estimatedDeliveryDate?: string;
    };
    shippingAddress: {
      fullName: string;
      addressLine1: string;
      city: string;
      state: string;
      pincode: string;
    };
    // Live events from Shiprocket
    timeline: TrackingEvent[];
    pricing: {
      total: number;
      currency: string;
    };
  };
  message?: string;
}

// ─── Order API calls ──────────────────────────────────────────────────────────

/**
 * Step 1 of checkout: create order record + get Razorpay gateway order ID.
 * For COD this is the only call needed.
 */
export async function placeOrder(
  payload: PlaceOrderPayload,
): Promise<PlaceOrderResponse> {
  try {
    return await api<PlaceOrderResponse>("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Network error. Please try again." };
  }
}

/**
 * Step 2 (Razorpay only): verify payment signature after the modal closes.
 * Marks the order as confirmed on the backend.
 */
export async function verifyRazorpayPayment(
  payload: RazorpayVerifyPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    return await api("/api/payments/razorpay/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError)
      return { success: false, message: err.message };
    return { success: false, message: "Verification failed. Contact support." };
  }
}

/**
 * Public order tracking — no auth required.
 * Hits Shiprocket live tracking if AWB is available, otherwise returns
 * status history from our own DB.
 */
export async function trackOrder(
  orderNumber: string,
  email?: string,
): Promise<TrackOrderResponse> {
  try {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    return await api<TrackOrderResponse>(
      `/api/orders/track/${encodeURIComponent(orderNumber)}${email ? `?${params}` : ""}`,
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Could not fetch order. Try again." };
  }
}

/**
 * Customer's own orders (requires auth token).
 */
export async function getMyOrders(): Promise<{
  success: boolean;
  data?: PlaceOrderResponse["data"][];
}> {
  try {
    return await api("/api/orders/my");
  } catch {
    return { success: false };
  }
}

/**
 * Validate a coupon code server-side before applying it.
 */
export async function validateCoupon(
  code: string,
  subtotal: number,
): Promise<{
  success: boolean;
  discount?: number;
  type?: "flat" | "percent";
  message?: string;
}> {
  try {
    return await api("/api/coupons/validate", {
      method: "POST",
      body: JSON.stringify({ code, subtotal }),
    });
  } catch (err) {
    if (err instanceof ApiError)
      return { success: false, message: err.message };
    return { success: false, message: "Could not validate coupon." };
  }
}
