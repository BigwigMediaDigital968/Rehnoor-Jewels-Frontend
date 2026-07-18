// app/lib/metaPixel.ts

interface PixelEventProps {
  id: string | string[];
  price: number;
  currency?: string;
}

/**
 * Tracks when a user views a product detail page
 */
export const trackViewContent = ({ id, price, currency = "INR" }: PixelEventProps) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "ViewContent", {
      content_ids: Array.isArray(id) ? id : [id],
      content_type: "product",
      value: price,
      currency: currency,
    });
  }
};

/**
 * Tracks when a user adds an item to their shopping cart
 */
export const trackAddToCart = ({ id, price, currency = "INR" }: PixelEventProps) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "AddToCart", {
      content_ids: Array.isArray(id) ? id : [id],
      content_type: "product",
      value: price,
      currency: currency,
    });
  }
};

/**
 * Tracks when a user successfully completes a purchase
 */
export const trackPurchase = ({ id, price, currency = "INR" }: PixelEventProps) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Purchase", {
      content_ids: Array.isArray(id) ? id : [id],
      content_type: "product",
      value: price,
      currency: currency,
    });
  }
};