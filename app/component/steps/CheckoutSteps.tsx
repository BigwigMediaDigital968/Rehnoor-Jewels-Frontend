// app/component/steps/CheckoutSections.tsx
//
// Single-page version of the checkout wizard.

"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { Info, Truck, Shield, CheckCircle, AlertCircle } from "lucide-react";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

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

function SectionShell({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl p-6 sm:p-8 mb-6"
      style={{
        background: "#fff",
        border: "1px solid var(--rj-bone)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="font-cinzel text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--rj-emerald)", color: "var(--rj-gold)" }}
        >
          {index}
        </span>
        <h2
          className="font-cormorant text-2xl font-light"
          style={{ color: "var(--rj-charcoal)" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

export type SectionHandle = {
  validate: () => boolean;
};

// ─────────────────────────────────────────────────────────────────
// SECTION 1 — CONTACT
// ─────────────────────────────────────────────────────────────────
export const ContactSection = forwardRef<SectionHandle, { index: number }>(
  function ContactSection({ index }, ref) {
    const { contact, setContact } = useCheckoutStore();
    const [errs, setErrs] = useState<Record<string, string>>({});

    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const setupRecaptcha = () => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" },
        );
      }
    };

    const sendOtp = async () => {
      try {
        const phone = contact.phone.replace(/\D/g, "");
        if (!/^[6-9]\d{9}$/.test(phone)) {
          setErrs((prev) => ({
            ...prev,
            phone: "Enter a valid 10-digit mobile number",
          }));
          return;
        }
        setOtpLoading(true);
        setupRecaptcha();
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          `+91${phone}`,
          window.recaptchaVerifier,
        );
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
      } catch (error) {
        console.error(error);
        alert("Failed to send OTP");
      } finally {
        setOtpLoading(false);
      }
    };

    const verifyOtp = async () => {
      try {
        setOtpLoading(true);
        const result = await window.confirmationResult.confirm(otp);
        if (result.user) setPhoneVerified(true);
      } catch (error) {
        console.error(error);
        alert("Invalid OTP");
      } finally {
        setOtpLoading(false);
      }
    };

    const runValidate = () => {
      const e: Record<string, string> = {};
      if (!contact.name.trim()) e.name = "Full name is required";
      if (!contact.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(contact.email))
        e.email = "Enter a valid email";
      if (!contact.phone.trim()) e.phone = "Phone number is required";
      else if (!/^[6-9]\d{9}$/.test(contact.phone.replace(/\s/g, "")))
        e.phone = "Enter a valid 10-digit Indian mobile number";
      if (!phoneVerified) e.phone = "Please verify your mobile number";
      setErrs(e);
      return Object.keys(e).length === 0;
    };

    useImperativeHandle(ref, () => ({ validate: runValidate }));

    const set =
      (k: keyof typeof contact) =>
      (ev: React.ChangeEvent<HTMLInputElement>) => {
        setContact({ [k]: ev.target.value });
        if (errs[k as string])
          setErrs((p) => {
            const n = { ...p };
            delete n[k as string];
            return n;
          });
      };

    return (
      <SectionShell index={index} title="Contact details">
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
                tip="We'll use this number for order updates and delivery notifications."
              />
              <div className="space-y-3">
                <div className="flex items-stretch gap-2">
                  <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[var(--rj-bone)] bg-white transition-all duration-200 focus-within:border-[var(--rj-emerald)] focus-within:shadow-[0_0_0_3px_rgba(0,55,32,0.06)]">
                    <div className="flex h-12 items-center border-r border-[var(--rj-bone)] px-4 text-sm font-medium text-slate-600">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setContact({ phone: value });
                        if (errs.phone)
                          setErrs((p) => {
                            const n = { ...p };
                            delete n.phone;
                            return n;
                          });
                      }}
                      placeholder="98765 43210"
                      maxLength={10}
                      className="h-12 flex-1 bg-transparent px-4 text-sm outline-none"
                    />
                  </div>

                  {!phoneVerified && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpLoading || contact.phone.length !== 10}
                      className="h-12 min-w-[110px] rounded-xl px-4 text-sm font-medium text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      style={{ background: "var(--rj-emerald)" }}
                    >
                      {otpLoading
                        ? "Sending..."
                        : otpSent
                          ? "Resend"
                          : "Send OTP"}
                    </button>
                  )}
                </div>

                <ErrMsg msg={errs.phone} />

                {otpSent && !phoneVerified && (
                  <div className="flex items-stretch gap-2">
                    <input
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter 6-digit OTP"
                      className="h-12 flex-1 rounded-xl border border-[var(--rj-bone)] px-4 text-sm outline-none transition-all duration-200 focus:border-[var(--rj-emerald)] focus:shadow-[0_0_0_3px_rgba(0,55,32,0.06)]"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={otp.length < 6}
                      className="h-12 min-w-[110px] rounded-xl px-4 text-sm font-medium text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      style={{ background: "var(--rj-charcoal)" }}
                    >
                      Verify
                    </button>
                  </div>
                )}

                {phoneVerified && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <svg
                      className="h-5 w-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-emerald-700">
                      Mobile number verified successfully
                    </span>
                  </div>
                )}

                <div id="recaptcha-container" />
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    );
  },
);

// ─────────────────────────────────────────────────────────────────
// SECTION 2 — ADDRESS
// ─────────────────────────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

function AddressForm({
  contact,
  addr,
  setAddr,
  prefix,
  errs,
  setErrs,
}: {
  contact?: any;
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

  useEffect(() => {
    if (!contact) return;
    setAddr({ fullName: contact.name ?? "", phone: contact.phone ?? "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* <div>
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
        </div> */}
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

export const AddressSection = forwardRef<SectionHandle, { index: number }>(
  function AddressSection({ index }, ref) {
    const {
      address,
      contact,
      setAddress,
      billingDiff,
      setBillingDiff,
      billingAddress,
      setBillingAddress,
    } = useCheckoutStore();
    const [errs, setErrs] = useState<Record<string, string>>({});

    const runValidate = () => {
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

      if (billingDiff) {
        const breq = (field: keyof Address, key: string, label: string) => {
          if (!billingAddress[field]?.trim())
            e[`billing_${key}`] = `${label} is required`;
        };
        breq("fullName", "fullName", "Full name");
        breq("phone", "phone", "Phone");
        breq("addressLine1", "addressLine1", "Address");
        breq("city", "city", "City");
        breq("pincode", "pincode", "Pincode");
        breq("state", "state", "State");
        if (billingAddress.pincode && !/^\d{6}$/.test(billingAddress.pincode))
          e.billing_pincode = "Enter a valid 6-digit pincode";
      }

      setErrs(e);
      return Object.keys(e).length === 0;
    };

    useImperativeHandle(ref, () => ({ validate: runValidate }));

    return (
      <SectionShell index={index} title="Shipping address">
        <AddressForm
          contact={contact}
          addr={address}
          setAddr={setAddress}
          errs={errs}
          setErrs={setErrs}
        />

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
      </SectionShell>
    );
  },
);

// ─────────────────────────────────────────────────────────────────
// SECTION 3 — SHIPPING METHOD
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
    price: 129,
    icon: <Truck size={16} />,
    badge: "Free",
  },
];

export const ShippingSection = forwardRef<SectionHandle, { index: number }>(
  function ShippingSection({ index }, ref) {
    const { shippingMethod, setShipping } = useCheckoutStore();

    // Nothing required — a default is always selected — but the handle is
    // still exposed for a consistent interface and future rules.
    useImperativeHandle(ref, () => ({ validate: () => !!shippingMethod }));

    return (
      <SectionShell index={index} title="Shipping method">
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
                      boxShadow: active
                        ? "0 0 0 1px rgba(0,55,32,0.08)"
                        : "none",
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
        <p
          className="font-cinzel text-[9px] tracking-wider mt-3"
          style={{ color: "var(--rj-ash)" }}
        >
          All orders are fully secured and arrive in our signature gift box
          with tamper-evident seal.
        </p>
      </SectionShell>
    );
  },
);

// ─────────────────────────────────────────────────────────────────
// SECTION 4 — PAYMENT METHOD
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
    value: "cod",
    label: "Cash on Delivery",
    sub: "Pay when your order arrives · up to ₹5,000",
    icon: "💵",
  },
];

export const PaymentSection = forwardRef<SectionHandle, { index: number }>(
  function PaymentSection({ index }, ref) {
    const { paymentMethod, setPayment } = useCheckoutStore();

    useImperativeHandle(ref, () => ({ validate: () => !!paymentMethod }));

    return (
      <SectionShell index={index} title="Payment method">
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
            All payments are processed through PCI-DSS compliant gateways.
            Your card details are never stored by Rehnoor Jewels.
          </p>
        </div>
      </SectionShell>
    );
  },
);

// ─────────────────────────────────────────────────────────────────
// SECTION 5 — REVIEW & NOTES (no validation, no button — the page
// footer / summary panel owns the single "Place Order" button)
// ─────────────────────────────────────────────────────────────────
export function ReviewSection({
  index,
  error,
}: {
  index: number;
  error?: string;
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
    <SectionShell index={index} title="Review your order">
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
    </SectionShell>
  );
}