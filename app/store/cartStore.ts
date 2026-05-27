// store/cartStore.ts
// Zustand store for cart + wishlist.
// CartItem now carries full variant snapshot so the checkout API gets
// productId + variantId instead of the old sizeSelected string.

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface VariantSnapshot {
  variantId: string;
  title: string; // "18\" / Rose Gold"
  options: Record<string, string>; // { Size: "18\"", Metal: "Rose Gold" }
  price: number;
  originalPrice?: number | null;
  sku?: string;
  weightGrams?: number;
  image?: string; // variant-specific image (if any)
}

export interface CartItem {
  /** Unique key: `productId-variantId` when variant exists, else `productId` */
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  /** Primary display image — variant image takes precedence over product gallery */
  image: string;
  priceNum: number;
  originalPriceNum?: number | null;
  qty: number;
  href: string;
  category?: string;
  tag?: string;
  customNote?: string;
  /** Full variant snapshot — null when product has no variants */
  variant: VariantSnapshot | null;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  image: string;
  priceNum: number;
  originalPriceNum?: number | null;
  href: string;
  category?: string;
  tag?: string;
  addedAt: number;
  /** Available variants — shown in picker before moving to cart */
  variants?: VariantSnapshot[];
  noVariants?: boolean;
}

// ─── Formatters ────────────────────────────────────────────────────────────────

export function fmtPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

// ─── Cart Store ────────────────────────────────────────────────────────────────

interface CouponState {
  code: string | null;
  discountAmount: number;
  discountType: "flat" | "percent" | "free_shipping" | "buy_x_get_y" | null;
  discountValue: number;
  validatedAt: number | null;
}

interface CartState {
  items: CartItem[];
  coupon: CouponState;
  /**
   * Buy-now mode: when set, checkout sends only these item(s).
   * Full cart items are preserved. Cleared after checkout or cancel.
   */
  buyNowItems: CartItem[] | null;

  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  updateNote: (id: string, note: string) => void;
  clearCart: () => void;
  setBuyNow: (item: Omit<CartItem, "id">) => void;
  clearBuyNow: () => void;
  applyCoupon: (c: Omit<CouponState, "validatedAt">) => void;
  removeCoupon: () => void;

  checkoutItems: () => CartItem[];
  totalItems: () => number;
  subtotal: () => number;
  buyNowSubtotal: () => number;
  savings: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItems: null,
      coupon: {
        code: null,
        discountAmount: 0,
        discountType: null,
        discountValue: 0,
        validatedAt: null,
      },

      addItem: (incoming) => {
        const id = incoming.variant
          ? `${incoming.productId}-${incoming.variant.variantId}`
          : incoming.productId;
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + incoming.qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...incoming, id }] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQty: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        }));
      },

      updateNote: (id, note) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, customNote: note } : i,
          ),
        })),

      clearCart: () =>
        set({
          items: [],
          buyNowItems: null,
          coupon: {
            code: null,
            discountAmount: 0,
            discountType: null,
            discountValue: 0,
            validatedAt: null,
          },
        }),

      setBuyNow: (incoming) => {
        const id = incoming.variant
          ? `${incoming.productId}-${incoming.variant.variantId}`
          : incoming.productId;
        set({ buyNowItems: [{ ...incoming, id, qty: 1 }] });
      },

      clearBuyNow: () => set({ buyNowItems: null }),

      applyCoupon: (c) => set({ coupon: { ...c, validatedAt: Date.now() } }),

      removeCoupon: () =>
        set({
          coupon: {
            code: null,
            discountAmount: 0,
            discountType: null,
            discountValue: 0,
            validatedAt: null,
          },
        }),

      checkoutItems: () => get().buyNowItems ?? get().items,
      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () =>
        get()
          .checkoutItems()
          .reduce((s, i) => s + i.priceNum * i.qty, 0),
      buyNowSubtotal: () =>
        (get().buyNowItems ?? []).reduce((s, i) => s + i.priceNum * i.qty, 0),
      savings: () =>
        get()
          .checkoutItems()
          .reduce((s, i) => {
            if (!i.originalPriceNum) return s;
            return s + (i.originalPriceNum - i.priceNum) * i.qty;
          }, 0),
      grandTotal: () =>
        Math.max(0, get().subtotal() - (get().coupon?.discountAmount ?? 0)),
    }),
    { name: "rj-cart" },
  ),
);

// ─── Wishlist Store ────────────────────────────────────────────────────────────

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "addedAt">) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, "addedAt">) => void;
  isWishlisted: (id: string) => boolean;
  moveToCart: (
    wishlistId: string,
    variantSnapshot: VariantSnapshot | null,
    addToCart: CartState["addItem"],
  ) => void;
  clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) return state;
          return { items: [{ ...item, addedAt: Date.now() }, ...state.items] };
        });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      toggleItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) get().removeItem(item.id);
        else get().addItem(item);
      },

      isWishlisted: (id) => !!get().items.find((i) => i.id === id),

      moveToCart: (wishlistId, variantSnapshot, addToCart) => {
        const item = get().items.find((i) => i.id === wishlistId);
        if (!item) return;
        addToCart({
          productId: item.productId,
          name: item.name,
          subtitle: item.subtitle,
          image: variantSnapshot?.image || item.image,
          priceNum: variantSnapshot?.price ?? item.priceNum,
          originalPriceNum:
            variantSnapshot?.originalPrice ?? item.originalPriceNum,
          qty: 1,
          href: item.href,
          category: item.category,
          tag: item.tag,
          variant: variantSnapshot,
        });
        get().removeItem(wishlistId);
      },

      clearAll: () => set({ items: [] }),
    }),
    { name: "rj-wishlist" },
  ),
);
