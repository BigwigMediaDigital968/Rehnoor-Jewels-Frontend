// store/checkoutStore.ts
// Zustand store for multi-step checkout state.
// Persists to sessionStorage so refresh doesn't wipe the form.
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ShippingMethod = "standard" | "express" | "same_day";
export type PaymentMethod = "cod" | "razorpay" | "upi" | "stripe";

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark: string;
}

export interface CheckoutContact {
  name: string;
  email: string;
  phone: string;
}

export type CheckoutStep = 1 | 2 | 3 | 4 | 5;
// 1=Contact 2=Address 3=Shipping 4=Payment 5=Review

const BLANK_ADDRESS: Address = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  landmark: "",
};

interface CheckoutState {
  step: CheckoutStep;
  contact: CheckoutContact;
  address: Address;
  billingDiff: boolean;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  couponCode: string;
  couponApplied: boolean;
  couponDiscount: number;
  customerNote: string;
  giftMessage: string;
  isGift: boolean;

  // Actions
  setStep: (s: CheckoutStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setContact: (c: Partial<CheckoutContact>) => void;
  setAddress: (a: Partial<Address>) => void;
  setBillingDiff: (v: boolean) => void;
  setBillingAddress: (a: Partial<Address>) => void;
  setShipping: (m: ShippingMethod) => void;
  setPayment: (m: PaymentMethod) => void;
  setCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
  setNote: (v: string) => void;
  setGift: (msg: string, isGift: boolean) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      step: 1,
      contact: { name: "", email: "", phone: "" },
      address: { ...BLANK_ADDRESS },
      billingDiff: false,
      billingAddress: { ...BLANK_ADDRESS },
      shippingMethod: "standard",
      paymentMethod: "razorpay",
      couponCode: "",
      couponApplied: false,
      couponDiscount: 0,
      customerNote: "",
      giftMessage: "",
      isGift: false,

      setStep: (s) => set({ step: s }),
      nextStep: () =>
        set((st) => ({ step: Math.min(5, st.step + 1) as CheckoutStep })),
      prevStep: () =>
        set((st) => ({ step: Math.max(1, st.step - 1) as CheckoutStep })),
      setContact: (c) => set((st) => ({ contact: { ...st.contact, ...c } })),
      setAddress: (a) => set((st) => ({ address: { ...st.address, ...a } })),
      setBillingDiff: (v) => set({ billingDiff: v }),
      setBillingAddress: (a) =>
        set((st) => ({ billingAddress: { ...st.billingAddress, ...a } })),
      setShipping: (m) => set({ shippingMethod: m }),
      setPayment: (m) => set({ paymentMethod: m }),
      setCoupon: (code, discount) =>
        set({
          couponCode: code,
          couponApplied: true,
          couponDiscount: discount,
        }),
      clearCoupon: () =>
        set({ couponCode: "", couponApplied: false, couponDiscount: 0 }),
      setNote: (v) => set({ customerNote: v }),
      setGift: (msg, isGift) => set({ giftMessage: msg, isGift }),
      reset: () =>
        set({
          step: 1,
          contact: { name: "", email: "", phone: "" },
          address: { ...BLANK_ADDRESS },
          billingDiff: false,
          billingAddress: { ...BLANK_ADDRESS },
          shippingMethod: "standard",
          paymentMethod: "razorpay",
          couponCode: "",
          couponApplied: false,
          couponDiscount: 0,
          customerNote: "",
          giftMessage: "",
          isGift: false,
        }),
    }),
    {
      name: "rj-checkout",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
