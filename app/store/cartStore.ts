// store/cartStore.ts
// Zustand store for cart + wishlist — shared across all pages.
// Import { useCartStore } or { useWishlistStore } wherever needed.

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
export interface CartItem {
  id: string; // unique: productId + size
  productId: string;
  name: string;
  subtitle: string;
  image: string;
  price: string; // "₹8,999"
  priceNum: number; // 8999
  originalPrice?: string;
  size: string;
  qty: number;
  href: string;
  category?: string;
  tag?: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  image: string;
  price: string;
  priceNum: number;
  originalPrice?: string;
  href: string;
  category?: string;
  tag?: string;
  addedAt: number; // timestamp
}

// ─────────────────────────────────────────────────────────────────
// CART STORE
// ─────────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  coupon: string | null;
  couponDiscount: number; // flat amount off in ₹

  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Computed (derived, call as functions)
  totalItems: () => number;
  subtotal: () => number;
  savings: () => number;
  grandTotal: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  GOLD10: 500,
  REHNOOR20: 1000,
  FIRST15: 750,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponDiscount: 0,

      addItem: (item) => {
        const id = `${item.productId}-${item.size}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, id }] };
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

      clearCart: () => set({ items: [], coupon: null, couponDiscount: 0 }),

      applyCoupon: (code) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (discount) {
          set({ coupon: code.toUpperCase(), couponDiscount: discount });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ coupon: null, couponDiscount: 0 }),

      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.priceNum * i.qty, 0),
      savings: () =>
        get().items.reduce((s, i) => {
          if (!i.originalPrice) return s;
          const orig = parseInt(i.originalPrice.replace(/[^\d]/g, ""), 10);
          return s + (orig - i.priceNum) * i.qty;
        }, 0),
      grandTotal: () => Math.max(0, get().subtotal() - get().couponDiscount),
    }),
    { name: "rj-cart" },
  ),
);

// ─────────────────────────────────────────────────────────────────
// WISHLIST STORE
// ─────────────────────────────────────────────────────────────────
interface WishlistState {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "addedAt">) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, "addedAt">) => void;
  isWishlisted: (id: string) => boolean;
  moveToCart: (
    id: string,
    size: string,
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

      moveToCart: (id, size, addToCart) => {
        const item = get().items.find((i) => i.id === id);
        if (!item) return;
        addToCart({
          productId: item.productId,
          name: item.name,
          subtitle: item.subtitle,
          image: item.image,
          price: item.price,
          priceNum: item.priceNum,
          originalPrice: item.originalPrice,
          size,
          qty: 1,
          href: item.href,
          category: item.category,
          tag: item.tag,
        });
        get().removeItem(id);
      },

      clearAll: () => set({ items: [] }),
    }),
    { name: "rj-wishlist" },
  ),
);
