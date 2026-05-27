// lib/api/orders.ts

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Core fetch wrapper ────────────────────────────────────────────────────────

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
  const data = await res.json();
  if (!res.ok)
    throw new ApiError(
      data?.message ?? "Something went wrong",
      res.status,
      data,
    );
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

export type PaymentMethod = "cod" | "razorpay" | "upi" | "bank_transfer";

/**
 * One item in the checkout payload.
 * variantId is required when the product has variants;
 * omit (or pass undefined) for variant-free products.
 */
export interface CheckoutItem {
  productId: string;
  variantId?: string; // server resolves price & snapshot from this
  quantity: number;
  customNote?: string;
}

export interface PlaceOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CheckoutItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  billingSameAsShipping: boolean;
  paymentMethod: PaymentMethod;
  couponCode?: string | null;
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
    pricing: {
      subtotal: number;
      shippingCharge: number;
      discountAmount: number;
      total: number;
    };
    coupon?: {
      code: string;
      discountType: string;
      discountAmount: number;
    } | null;
    paymentMethod: PaymentMethod;
    razorpayOrderId?: string;
  };
}

export interface RazorpayVerifyPayload {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// ─── Order item as returned by the API ────────────────────────────────────────

export interface OrderItemResponse {
  product: string; // product _id (populated on adminGetOrderById)
  name: string;
  slug: string;
  sku: string;
  image: string;
  category: string;
  /** Full variant snapshot — null when no variant was selected */
  variant: {
    variantId: string;
    title: string;
    sku: string;
    options: Record<string, string>;
    weightGrams: number;
    image: string;
  } | null;
  unitPrice: number;
  originalPrice: number | null;
  quantity: number;
  lineTotal: number;
  customNote: string;
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  done: boolean;
  description?: string;
}

export interface TrackOrderResponse {
  success: boolean;
  message?: string;
  data?: {
    orderNumber: string;
    status: string;
    placedAt: string;
    estimatedDeliveryDate?: string;
    customerName: string;
    items: OrderItemResponse[];
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
    timeline: TrackingEvent[];
    pricing: {
      total: number;
      currency: string;
    };
  };
}

// ─── Coupon validation ────────────────────────────────────────────────────────

export interface ValidateCouponResponse {
  success: boolean;
  message?: string;
  discountAmount?: number;
  coupon?: {
    code: string;
    name: string;
    description?: string;
    discountType: "flat" | "percent" | "free_shipping" | "buy_x_get_y";
    discountValue: number;
    maxDiscountAmount?: number | null;
  };
}

// ─── API calls ────────────────────────────────────────────────────────────────

export async function placeOrder(
  payload: PlaceOrderPayload,
): Promise<PlaceOrderResponse> {
  try {
    return await api<PlaceOrderResponse>("/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError)
      return { success: false, message: err.message };
    return { success: false, message: "Network error. Please try again." };
  }
}

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
    if (err instanceof ApiError)
      return { success: false, message: err.message };
    return { success: false, message: "Could not fetch order. Try again." };
  }
}

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
 * Server-side coupon validation.
 * Always call this before showing a discount to the user.
 * Never trust client-side discount calculation alone.
 */
export async function validateCoupon(
  code: string,
  subtotal: number,
  itemCount?: number,
  email?: string,
): Promise<ValidateCouponResponse> {
  try {
    return await api<ValidateCouponResponse>("/api/coupons/validate", {
      method: "POST",
      body: JSON.stringify({
        code,
        subtotal,
        ...(itemCount !== undefined && { itemCount }),
        ...(email && { email }),
      }),
    });
  } catch (err) {
    if (err instanceof ApiError)
      return { success: false, message: err.message };
    return { success: false, message: "Could not validate coupon." };
  }
}
