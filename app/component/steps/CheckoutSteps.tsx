// component/website/checkout/steps/  — all 5 steps in one file
// Split into separate files per the folder structure guide.
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Info,
  Truck,
  CreditCard,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  useCheckoutStore,
  type Address,
  type ShippingMethod,
  type PaymentMethod,
} from "@/app/store/checkoutStore";
import Tooltip from "@/app/component/shared/Tooltip";

// ─────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ─────────────────────────────────────────────────────────────────
function inputCls(err?: boolean) {
  return {
    background: "#fff",
    border: `1px solid ${err ? "#fca5a5" : "var(--rj-bone)"}`,
    borderRadius: "10px",
    color: "var(--rj-charcoal)",
    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  } as React.CSSProperties;
}

function FieldLabel({
  text,
  required,
  tip,
}: {
  text: string;
  required?: boolean;
  tip?: string;
}) {
  return (
    <label
      className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1.5"
      style={{ color: "var(--rj-charcoal)" }}
    >
      {text}
      {required && <span style={{ color: "#ef4444" }}>*</span>}
      {tip && (
        <Tooltip content={tip}>
          <Info size={11} style={{ color: "var(--rj-ash)", cursor: "help" }} />
        </Tooltip>
      )}
    </label>
  );
}

function ErrMsg({ msg }: { msg?: string }) {
  return msg ? (
    <p className="font-cinzel text-[9px] mt-1" style={{ color: "#ef4444" }}>
      {msg}
    </p>
  ) : null;
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continue",
  loading = false,
  disabled = false,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mt-8">
      {onBack && (
        <Tooltip content="Go back to previous step">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-5 py-3 transition-all hover:opacity-70 hover:border-amber-600 hover:border-2"
            style={{
              border: "1.5px solid var(--rj-bone)",
              color: "var(--rj-ash)",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </Tooltip>
      )}
      <Tooltip
        content={disabled ? "Please fill all required fields" : nextLabel}
      >
        <button
          onClick={onNext}
          disabled={disabled || loading}
          className="btn-primary inline-flex group"
          style={{
            display: "inline-flex",
            background: "var(--gradient-gold)",
            color: "var(--rj-emerald)",
          }}
        >
          {loading ? (
            "Please wait…"
          ) : (
            <>
              {nextLabel} <ChevronRight size={13} />
            </>
          )}
        </button>
      </Tooltip>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP 1 — CONTACT
// ─────────────────────────────────────────────────────────────────
export function StepContact({ onNext }: { onNext: () => void }) {
  const { contact, setContact } = useCheckoutStore();
  const [errs, setErrs] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!contact.name.trim()) e.name = "Full name is required";
    if (!contact.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(contact.email))
      e.email = "Enter a valid email";
    if (!contact.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    onNext();
  };

  const set =
    (k: keyof typeof contact) => (ev: React.ChangeEvent<HTMLInputElement>) => {
      setContact({ [k]: ev.target.value });
      if (errs[k as string])
        setErrs((p) => {
          const n = { ...p };
          delete n[k as string];
          return n;
        });
    };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2
        className="font-cormorant text-2xl font-light mb-6"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Contact details
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <FieldLabel
            text="Full Name"
            required
            tip="Name as it should appear on the delivery label"
          />
          <input
            value={contact.name}
            onChange={set("name")}
            placeholder="Arjun Mehta"
            style={inputCls(!!errs.name)}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--rj-emerald)";
              e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = errs.name
                ? "#fca5a5"
                : "var(--rj-bone)";
              e.target.style.boxShadow = "none";
            }}
          />
          <ErrMsg msg={errs.name} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel
              text="Email"
              required
              tip="Order confirmation will be sent here"
            />
            <input
              type="email"
              value={contact.email}
              onChange={set("email")}
              placeholder="arjun@email.com"
              style={inputCls(!!errs.email)}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--rj-emerald)";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errs.email
                  ? "#fca5a5"
                  : "var(--rj-bone)";
                e.target.style.boxShadow = "none";
              }}
            />
            <ErrMsg msg={errs.email} />
          </div>
          <div>
            <FieldLabel
              text="Mobile Number"
              required
              tip="10-digit Indian mobile. We'll send tracking updates on WhatsApp."
            />
            <input
              type="tel"
              value={contact.phone}
              onChange={set("phone")}
              placeholder="98765 43210"
              style={inputCls(!!errs.phone)}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--rj-emerald)";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,55,32,0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errs.phone
                  ? "#fca5a5"
                  : "var(--rj-bone)";
                e.target.style.boxShadow = "none";
              }}
            />
            <ErrMsg msg={errs.phone} />
          </div>
        </div>
        <NavButtons onNext={handleNext} nextLabel="Continue to Address" />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP 2 — ADDRESS
// ─────────────────────────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

function AddressForm({
  addr,
  setAddr,
  prefix,
  errs,
  setErrs,
}: {
  addr: Address;
  setAddr: (a: Partial<Address>) => void;
  prefix?: string;
  errs: Record<string, string>;
  setErrs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const k = (field: string) => (prefix ? `${prefix}_${field}` : field);
  const set =
    (field: keyof Address) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setAddr({ [field]: ev.target.value });
      if (errs[k(field as string)])
        setErrs((p) => {
          const n = { ...p };
          delete n[k(field as string)];
          return n;
        });
    };

  const inp = (field: keyof Address, err: boolean): React.CSSProperties => ({
    ...inputCls(err),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel text="Full Name" required />
          <input
            value={addr.fullName}
            onChange={set("fullName")}
            placeholder="Arjun Mehta"
            style={inp("fullName", !!errs[k("fullName")])}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errs[k("fullName")]
                ? "#fca5a5"
                : "var(--rj-bone)")
            }
          />
          <ErrMsg msg={errs[k("fullName")]} />
        </div>
        <div>
          <FieldLabel text="Phone" required />
          <input
            value={addr.phone}
            onChange={set("phone")}
            placeholder="98765 43210"
            style={inp("phone", !!errs[k("phone")])}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errs[k("phone")]
                ? "#fca5a5"
                : "var(--rj-bone)")
            }
          />
          <ErrMsg msg={errs[k("phone")]} />
        </div>
      </div>
      <div>
        <FieldLabel text="Address Line 1" required />
        <input
          value={addr.addressLine1}
          onChange={set("addressLine1")}
          placeholder="Flat / Building / Street"
          style={inp("addressLine1", !!errs[k("addressLine1")])}
          onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
          onBlur={(e) =>
            (e.target.style.borderColor = errs[k("addressLine1")]
              ? "#fca5a5"
              : "var(--rj-bone)")
          }
        />
        <ErrMsg msg={errs[k("addressLine1")]} />
      </div>
      <div>
        <FieldLabel
          text="Address Line 2"
          tip="Optional — Colony, Area, Landmark direction"
        />
        <input
          value={addr.addressLine2}
          onChange={set("addressLine2")}
          placeholder="Colony / Area (optional)"
          style={inputCls()}
          onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
          <FieldLabel text="City" required />
          <input
            value={addr.city}
            onChange={set("city")}
            placeholder="New Delhi"
            style={inp("city", !!errs[k("city")])}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errs[k("city")]
                ? "#fca5a5"
                : "var(--rj-bone)")
            }
          />
          <ErrMsg msg={errs[k("city")]} />
        </div>
        <div>
          <FieldLabel text="Pincode" required />
          <input
            value={addr.pincode}
            onChange={set("pincode")}
            placeholder="110001"
            maxLength={6}
            style={inp("pincode", !!errs[k("pincode")])}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errs[k("pincode")]
                ? "#fca5a5"
                : "var(--rj-bone)")
            }
          />
          <ErrMsg msg={errs[k("pincode")]} />
        </div>
        <div>
          <FieldLabel text="State" required />
          <select
            value={addr.state}
            onChange={set("state")}
            style={{
              ...inp("state", !!errs[k("state")]),
              cursor: "pointer",
              appearance: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) =>
              (e.target.style.borderColor = errs[k("state")]
                ? "#fca5a5"
                : "var(--rj-bone)")
            }
          >
            <option value="">State</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ErrMsg msg={errs[k("state")]} />
        </div>
      </div>
      <div>
        <FieldLabel
          text="Landmark"
          tip="Helps the delivery agent find your location"
        />
        <input
          value={addr.landmark}
          onChange={set("landmark")}
          placeholder="Near metro station / school (optional)"
          style={inputCls()}
          onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
        />
      </div>
    </div>
  );
}

export function StepAddress({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const {
    address,
    setAddress,
    billingDiff,
    setBillingDiff,
    billingAddress,
    setBillingAddress,
  } = useCheckoutStore();
  const [errs, setErrs] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    const req = (field: keyof Address, key: string, label: string) => {
      if (!address[field]?.trim()) e[key] = `${label} is required`;
    };
    req("fullName", "fullName", "Full name");
    req("phone", "phone", "Phone");
    req("addressLine1", "addressLine1", "Address");
    req("city", "city", "City");
    req("pincode", "pincode", "Pincode");
    req("state", "state", "State");
    if (address.pincode && !/^\d{6}$/.test(address.pincode))
      e.pincode = "Enter a valid 6-digit pincode";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrs(e);
      return;
    }
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2
        className="font-cormorant text-2xl font-light mb-6"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Shipping address
      </h2>
      <AddressForm
        addr={address}
        setAddr={setAddress}
        errs={errs}
        setErrs={setErrs}
      />

      {/* Billing address toggle */}
      <div className="mt-5">
        <Tooltip content="Uncheck if your billing address is different">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={!billingDiff}
              onChange={(e) => setBillingDiff(!e.target.checked)}
              style={{
                accentColor: "var(--rj-emerald)",
                width: 16,
                height: 16,
                cursor: "pointer",
              }}
            />
            <span
              className="font-cinzel text-xs tracking-wider"
              style={{ color: "var(--rj-charcoal)" }}
            >
              Billing address same as shipping
            </span>
          </label>
        </Tooltip>
      </div>

      {billingDiff && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-5 pt-5 overflow-hidden"
          style={{ borderTop: "1px solid var(--rj-bone)" }}
        >
          <h3
            className="font-cinzel text-xs tracking-widest uppercase font-bold mb-4"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Billing address
          </h3>
          <AddressForm
            addr={billingAddress}
            setAddr={setBillingAddress}
            prefix="billing"
            errs={errs}
            setErrs={setErrs}
          />
        </motion.div>
      )}

      <NavButtons
        onBack={onBack}
        onNext={handleNext}
        nextLabel="Continue to Shipping"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP 3 — SHIPPING METHOD
// ─────────────────────────────────────────────────────────────────
const SHIPPING_OPTIONS: {
  value: ShippingMethod;
  label: string;
  sub: string;
  price: number;
  icon: React.ReactNode;
  badge?: string;
}[] = [
  {
    value: "standard",
    label: "Standard Delivery",
    sub: "5–7 business days",
    price: 0,
    icon: <Truck size={16} />,
    badge: "Free",
  },
  {
    value: "express",
    label: "Express Delivery",
    sub: "2–3 business days",
    price: 149,
    icon: <Zap size={16} />,
  },
  {
    value: "same_day",
    label: "Same Day Delivery",
    sub: "Order before 12 PM · Select metros only",
    price: 299,
    icon: <Clock size={16} />,
    badge: "Fastest",
  },
];

export function StepShipping({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { shippingMethod, setShipping } = useCheckoutStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2
        className="font-cormorant text-2xl font-light mb-6"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Shipping method
      </h2>
      <div className="flex flex-col gap-3">
        {SHIPPING_OPTIONS.map((opt) => {
          const active = shippingMethod === opt.value;
          return (
            <Tooltip
              key={opt.value}
              content={`Select ${opt.label} — ₹${opt.price === 0 ? "Free" : opt.price}`}
            >
              <button
                onClick={() => setShipping(opt.value)}
                className="w-full text-left"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{
                    border: `2px solid ${active ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    background: active ? "rgba(0,55,32,0.04)" : "#fff",
                    boxShadow: active ? "0 0 0 1px rgba(0,55,32,0.08)" : "none",
                  }}
                >
                  {/* Radio circle */}
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `2px solid ${active ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    }}
                  >
                    {active && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "var(--rj-emerald)" }}
                      />
                    )}
                  </div>
                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: active
                        ? "rgba(0,55,32,0.1)"
                        : "var(--rj-ivory-dark)",
                      color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                    }}
                  >
                    {opt.icon}
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="font-cinzel text-xs font-bold"
                        style={{
                          color: active
                            ? "var(--rj-emerald)"
                            : "var(--rj-charcoal)",
                        }}
                      >
                        {opt.label}
                      </p>
                      {opt.badge && (
                        <span
                          className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              opt.value === "same_day"
                                ? "rgba(239,68,68,0.1)"
                                : "rgba(0,55,32,0.08)",
                            color:
                              opt.value === "same_day"
                                ? "#ef4444"
                                : "var(--rj-emerald)",
                          }}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      }}
                    >
                      {opt.sub}
                    </p>
                  </div>
                  {/* Price */}
                  <p
                    className="font-cinzel font-bold flex-shrink-0"
                    style={{
                      color:
                        opt.price === 0
                          ? "var(--rj-emerald)"
                          : "var(--rj-charcoal)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {opt.price === 0 ? "Free" : `₹${opt.price}`}
                  </p>
                </div>
              </button>
            </Tooltip>
          );
        })}
      </div>
      <p
        className="font-cinzel text-[9px] tracking-wider mt-3"
        style={{ color: "var(--rj-ash)" }}
      >
        All orders are fully insured and arrive in our signature gift box with
        tamper-evident seal.
      </p>
      <NavButtons
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continue to Payment"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP 4 — PAYMENT METHOD
// ─────────────────────────────────────────────────────────────────
const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  sub: string;
  icon: string;
  badge?: string;
}[] = [
  {
    value: "razorpay",
    label: "Cards / Net Banking / UPI",
    sub: "Razorpay — all major cards, UPI, wallets, EMI",
    icon: "💳",
    badge: "Recommended",
  },
  {
    value: "upi",
    label: "UPI Direct",
    sub: "GPay, PhonePe, Paytm, BHIM",
    icon: "📱",
  },
  {
    value: "cod",
    label: "Cash on Delivery",
    sub: "Pay when your order arrives · up to ₹5,000",
    icon: "💵",
  },
];

export function StepPayment({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { paymentMethod, setPayment } = useCheckoutStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2
        className="font-cormorant text-2xl font-light mb-6"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Payment method
      </h2>
      <div className="flex flex-col gap-3 mb-6">
        {PAYMENT_OPTIONS.map((opt) => {
          const active = paymentMethod === opt.value;
          return (
            <Tooltip key={opt.value} content={`Pay with ${opt.label}`}>
              <button
                onClick={() => setPayment(opt.value)}
                className="w-full text-left"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                  style={{
                    border: `2px solid ${active ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    background: active ? "rgba(0,55,32,0.04)" : "#fff",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      border: `2px solid ${active ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                    }}
                  >
                    {active && (
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: "var(--rj-emerald)" }}
                      />
                    )}
                  </div>
                  <span style={{ fontSize: 22 }}>{opt.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p
                        className="font-cinzel text-xs font-bold"
                        style={{
                          color: active
                            ? "var(--rj-emerald)"
                            : "var(--rj-charcoal)",
                        }}
                      >
                        {opt.label}
                      </p>
                      {opt.badge && (
                        <span
                          className="font-cinzel text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(0,55,32,0.08)",
                            color: "var(--rj-emerald)",
                          }}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs mt-0.5"
                      style={{
                        color: "var(--rj-ash)",
                        fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      }}
                    >
                      {opt.sub}
                    </p>
                  </div>
                </div>
              </button>
            </Tooltip>
          );
        })}
      </div>
      {/* Security note */}
      <div
        className="flex items-start gap-2.5 p-3.5 rounded-xl"
        style={{
          background: "rgba(0,55,32,0.04)",
          border: "1px solid rgba(0,55,32,0.1)",
        }}
      >
        <Shield
          size={14}
          style={{ color: "var(--rj-emerald)", flexShrink: 0, marginTop: 2 }}
        />
        <p
          className="text-xs leading-relaxed"
          style={{
            color: "var(--rj-ash)",
            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
          }}
        >
          All payments are processed through PCI-DSS compliant gateways. Your
          card details are never stored by Rehnoor Jewels.
        </p>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Review Order" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP 5 — REVIEW & PLACE ORDER
// ─────────────────────────────────────────────────────────────────
export function StepReview({
  onBack,
  onPlaceOrder,
  loading,
  error,
}: {
  onBack: () => void;
  onPlaceOrder: () => void;
  loading: boolean;
  error: string;
}) {
  const {
    contact,
    address,
    shippingMethod,
    paymentMethod,
    customerNote,
    setNote,
    giftMessage,
    isGift,
    setGift,
  } = useCheckoutStore();

  const shipLabel: Record<string, string> = {
    standard: "Standard (5–7 days)",
    express: "Express (2–3 days)",
    same_day: "Same Day",
  };
  const payLabel: Record<string, string> = {
    razorpay: "Cards / Net Banking / UPI",
    upi: "UPI Direct",
    cod: "Cash on Delivery",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h2
        className="font-cormorant text-2xl font-light mb-6"
        style={{ color: "var(--rj-charcoal)" }}
      >
        Review your order
      </h2>

      {/* Summary rows */}
      {[
        {
          label: "Contact",
          value: `${contact.name} · ${contact.email} · ${contact.phone}`,
        },
        {
          label: "Ship to",
          value: `${address.fullName}, ${address.addressLine1}, ${address.city} – ${address.pincode}`,
        },
        { label: "Shipping", value: shipLabel[shippingMethod] },
        { label: "Payment", value: payLabel[paymentMethod] },
      ].map((row) => (
        <div
          key={row.label}
          className="flex gap-4 py-3"
          style={{ borderBottom: "1px solid var(--rj-bone)" }}
        >
          <span
            className="font-cinzel text-[10px] tracking-widest uppercase w-20 flex-shrink-0 pt-0.5"
            style={{ color: "var(--rj-ash)" }}
          >
            {row.label}
          </span>
          <span
            className="text-sm flex-1"
            style={{
              color: "var(--rj-charcoal)",
              fontFamily: "var(--font-body,'DM Sans'),sans-serif",
            }}
          >
            {row.value}
          </span>
        </div>
      ))}

      {/* Order note */}
      <div className="mt-5">
        <FieldLabel
          text="Order note"
          tip="Special instructions for packing or delivery"
        />
        <textarea
          rows={2}
          value={customerNote}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Any special instructions… (optional)"
          style={{ ...inputCls(), resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
        />
      </div>

      {/* Gift toggle */}
      <div className="mt-3">
        <Tooltip content="Add a personal gift message inside the box">
          <label className="flex items-center gap-2.5 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={isGift}
              onChange={(e) => setGift(giftMessage, e.target.checked)}
              style={{
                accentColor: "var(--rj-emerald)",
                width: 16,
                height: 16,
                cursor: "pointer",
              }}
            />
            <span
              className="font-cinzel text-xs tracking-wider"
              style={{ color: "var(--rj-charcoal)" }}
            >
              This is a gift — add a message
            </span>
          </label>
        </Tooltip>
        {isGift && (
          <textarea
            rows={2}
            value={giftMessage}
            onChange={(e) => setGift(e.target.value, true)}
            placeholder="Your personal gift message…"
            style={{ ...inputCls(), resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "var(--rj-emerald)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--rj-bone)")}
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2 mt-4 p-3 rounded-xl"
          style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
        >
          <AlertCircle size={14} style={{ color: "#ef4444", flexShrink: 0 }} />
          <p
            className="font-cinzel text-[10px] tracking-wider"
            style={{ color: "#ef4444" }}
          >
            {error}
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mt-8">
        <Tooltip content="Go back to payment method">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-widest uppercase px-5 py-3 rounded-full transition-all hover:opacity-70"
            style={{
              border: "1.5px solid var(--rj-bone)",
              color: "var(--rj-ash)",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </Tooltip>
        <Tooltip
          content={
            loading
              ? "Placing your order…"
              : "Place order and proceed to payment"
          }
        >
          <button
            onClick={onPlaceOrder}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-cinzel text-[12px] tracking-widest uppercase font-bold transition-all duration-300 active:scale-95 disabled:opacity-50"
            style={{
              background: "var(--rj-emerald)",
              color: "var(--rj-gold)",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 24px rgba(0,55,32,0.25)",
            }}
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ◌
                </motion.span>{" "}
                Placing order…
              </>
            ) : (
              <>
                <CheckCircle size={14} /> Place Order
              </>
            )}
          </button>
        </Tooltip>
      </div>
      <p
        className="font-cinzel text-[9px] tracking-wider text-center mt-3"
        style={{ color: "var(--rj-ash)" }}
      >
        By placing this order you agree to our Terms &amp; Conditions and Return
        Policy.
      </p>
    </motion.div>
  );
}
