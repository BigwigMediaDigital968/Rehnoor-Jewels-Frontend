// store/cartStore.ts
// Zustand store for cart + wishlist.
// CartItem now carries full variant snapshot so the checkout API gets
// productId + variantId instead of the old sizeSelected string.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { trackAddToCart } from "../lib/metaPixel";
import { autoApplyCoupon } from "../lib/api/orders";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface VariantSnapshot {
  variantId: string;
  title: string | null; // "18\" / Rose Gold"
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
  /**
   * True when this coupon was applied automatically (isAutoApply on the
   * backend), not typed in by the customer. Auto-applied coupons can be
   * silently replaced or removed as the cart changes; manually-entered
   * coupons never are — the customer's explicit choice always wins.
   */
  autoApplied: boolean;
}

const emptyCoupon: CouponState = {
  code: null,
  discountAmount: 0,
  discountType: null,
  discountValue: 0,
  validatedAt: null,
  autoApplied: false,
};

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
  applyCoupon: (
    c: Omit<CouponState, "validatedAt" | "autoApplied">,
    autoApplied?: boolean,
  ) => void;
  removeCoupon: () => void;
  /**
   * Asks the backend for the best isAutoApply coupon that currently
   * qualifies for checkoutItems(), and applies/replaces/clears it.
   * Never touches a coupon the customer entered manually.
   */
  syncAutoApplyCoupon: () => Promise<void>;

  checkoutItems: () => CartItem[];
  totalItems: () => number;
  subtotal: () => number;
  buyNowSubtotal: () => number;
  savings: () => number;
  grandTotal: () => number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

// Debounce auto-apply network calls so rapid qty +/- clicks or repeated
// addItem calls don't fire a request per keystroke — only once things settle.
let autoApplySyncTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleAutoApplySync() {
  if (typeof window === "undefined") return; // no-op during SSR
  if (autoApplySyncTimer) clearTimeout(autoApplySyncTimer);
  autoApplySyncTimer = setTimeout(() => {
    useCartStore.getState().syncAutoApplyCoupon();
  }, 350);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItems: null,
      coupon: emptyCoupon,

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

        trackAddToCart({
          id: incoming.productId,
          price: incoming.priceNum,
        });

        scheduleAutoApplySync();
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          // if the removed item was the active buy-now selection, clear that too
          buyNowItems: state.buyNowItems?.[0]?.id === id ? null : state.buyNowItems,
        }));
        scheduleAutoApplySync();
      },

      updateQty: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id); // removeItem already schedules a sync
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        }));
        scheduleAutoApplySync();
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
          coupon: emptyCoupon,
        }),

      setBuyNow: (incoming) => {
        const id = incoming.variant
          ? `${incoming.productId}-${incoming.variant.variantId}`
          : incoming.productId;
        set({ buyNowItems: [{ ...incoming, id }] }); // preserve incoming.qty, don't force 1
        scheduleAutoApplySync();
      },

      clearBuyNow: () => {
        set({ buyNowItems: null });
        scheduleAutoApplySync();
      },

      applyCoupon: (c, autoApplied = false) =>
        set({ coupon: { ...c, validatedAt: Date.now(), autoApplied } }),

      removeCoupon: () => set({ coupon: emptyCoupon }),

      syncAutoApplyCoupon: async () => {
        const state = get();
        const current = state.coupon;

        // Never override a coupon the customer typed in themselves.
        if (current.code && !current.autoApplied) return;

        const items = state.checkoutItems();
        if (items.length === 0) {
          if (current.autoApplied) get().removeCoupon();
          return;
        }

        try {

          const result = await autoApplyCoupon(
            state.subtotal(),
            state.totalItems(),
            state.items,
          );
          console.log("auto apply", result);

          if (result.applied) {
            state.applyCoupon({
              code: result.code ?? null,
              discountAmount: result.discountAmount ?? 0,
              discountType: (result.discountType as any) ?? null,
              discountValue: result.discountValue ?? 0,
            });
          } else {
            state.removeCoupon();
          }
        } catch (err) {
          console.error("Auto-apply coupon sync failed:", err);
        }
      },

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

      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
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