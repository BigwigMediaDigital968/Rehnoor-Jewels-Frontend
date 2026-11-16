"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
} from "lucide-react";

interface PincodeCheckerProps {
  weightKg?: number;
}

interface DeliveryEstimate {
  serviceable: boolean;
  etd?: string;
  estimatedDays?: number;
  city?: string;
  state?: string;
  codAvailable?: boolean;
  message?: string;
}

export default function PincodeChecker({
  weightKg = 0.2,
}: PincodeCheckerProps) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DeliveryEstimate | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rj_user_pincode");
    if (saved && /^\d{6}$/.test(saved)) {
      setPincode(saved);
      checkDelivery(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkDelivery = async (codeToVerify = pincode) => {
    const cleaned = codeToVerify.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setResult({
        serviceable: false,
        message: "Please enter a valid 6-digit Indian pincode.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `/api/shiprocket/check-pincode?pincode=${cleaned}&weight=${weightKg}`,
      );
      const data: DeliveryEstimate = await res.json();
      setResult(data);

      if (data.serviceable) {
        localStorage.setItem("rj_user_pincode", cleaned);
      }
    } catch {
      setResult({
        serviceable: false,
        message: "Network error. Could not verify pincode.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkDelivery();
  };

  return (
    <div
      className="my-5 p-4 rounded-2xl"
      style={{
        background: "var(--rj-ivory-dark)",
        border: "1px solid var(--rj-bone)",
      }}
    >
      {/* Header Label */}
      <div className="flex items-center justify-between mb-2.5">
        <label
          htmlFor="delivery-pincode"
          className="font-cinzel text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5"
          style={{ color: "var(--rj-charcoal)" }}
        >
          <Truck size={14} style={{ color: "var(--rj-emerald)" }} />
          Check Delivery Availability
        </label>
        <span className="text-[11px]" style={{ color: "var(--rj-ash)" }}>
          Free insured shipping
        </span>
      </div>

      {/* Unified Outer Pill (No inner input border) */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-xl p-1.5 pl-3.5 transition-all duration-200 focus-within:shadow-sm"
        style={{
          background: "#FFFFFF",
          border: "1.5px solid var(--rj-bone)",
        }}
      >
        <MapPin
          size={15}
          className="shrink-0"
          style={{ color: "var(--rj-gold)" }}
        />

        <input
          id="delivery-pincode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setPincode(digitsOnly);
            if (result) setResult(null);
          }}
          placeholder="Enter 6-digit pincode"
          className="w-full bg-transparent text-sm font-medium tracking-wider border-0 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 shadow-none placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-normal"
          style={{
            color: "var(--rj-charcoal)",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading || pincode.length < 6}
          className="shrink-0 px-5 py-2.5 rounded-lg font-cinzel text-[11px] font-bold tracking-widest uppercase transition-all duration-200 active:scale-95 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background: "var(--rj-emerald)",
            color: "#FFFFFF",
          }}
        >
          {loading ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 size={13} className="animate-spin" />
              Checking
            </span>
          ) : (
            "Check"
          )}
        </button>
      </form>

      {/* Result Feedback */}
      {result && (
        <div className="mt-3">
          {result.serviceable ? (
            <div
              className="flex items-start gap-2.5 p-3 rounded-xl text-xs"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0, 55, 32, 0.16)",
                color: "var(--rj-emerald)",
              }}
            >
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold">
                  Estimated delivery by{" "}
                  <span className="underline">
                    {result.etd ||
                      `${result.estimatedDays}–${(result.estimatedDays || 3) + 2} business days`}
                  </span>
                </p>
                <p
                  className="text-[11px] flex items-center gap-1.5 flex-wrap"
                  style={{ color: "var(--rj-ash)" }}
                >
                  {result.city && (
                    <span>
                      Delivering to{" "}
                      <strong style={{ color: "var(--rj-charcoal)" }}>
                        {result.city}
                        {result.state ? `, ${result.state}` : ""}
                      </strong>
                    </span>
                  )}
                  {result.codAvailable && (
                    <span
                      className="font-medium"
                      style={{ color: "var(--rj-emerald)" }}
                    >
                      • Cash on Delivery available
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 rounded-xl text-xs bg-red-50/90 text-red-600 border border-red-100">
              <AlertCircle size={14} className="shrink-0" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
