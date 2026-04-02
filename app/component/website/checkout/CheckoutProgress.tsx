// component/website/checkout/shared/CheckoutProgress.tsx
"use client";
import { CheckoutStep } from "@/app/store/checkoutStore";
import { motion } from "framer-motion";
import {
  Check,
  User,
  MapPin,
  Truck,
  CreditCard,
  ClipboardList,
} from "lucide-react";

const STEPS = [
  { n: 1 as CheckoutStep, label: "Contact", icon: <User size={13} /> },
  { n: 2 as CheckoutStep, label: "Address", icon: <MapPin size={13} /> },
  { n: 3 as CheckoutStep, label: "Shipping", icon: <Truck size={13} /> },
  { n: 4 as CheckoutStep, label: "Payment", icon: <CreditCard size={13} /> },
  { n: 5 as CheckoutStep, label: "Review", icon: <ClipboardList size={13} /> },
];

export default function CheckoutProgress({
  current,
  onStep,
}: {
  current: CheckoutStep;
  onStep: (s: CheckoutStep) => void;
}) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* connecting line */}
        <div
          className="absolute top-4 left-4 right-4 h-0.5"
          style={{ background: "var(--rj-bone)" }}
        />
        <motion.div
          className="absolute top-4 left-4 h-0.5"
          style={{ background: "var(--gradient-gold)" }}
          animate={{ width: `${((current - 1) / 4) * 94}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {STEPS.map((s) => {
          const done = s.n < current;
          const active = s.n === current;
          const canClick = s.n < current;

          return (
            <div
              key={s.n}
              className="relative flex flex-col items-center z-10"
              style={{ cursor: canClick ? "pointer" : "default" }}
              onClick={() => canClick && onStep(s.n)}
              title={canClick ? `Go back to ${s.label}` : s.label}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: done
                    ? "var(--rj-emerald)"
                    : active
                      ? "var(--gradient-gold)"
                      : "#fff",
                  border:
                    done || active ? "none" : "1.5px solid var(--rj-bone)",
                  boxShadow: active ? "0 0 0 4px rgba(252,193,81,0.2)" : "none",
                }}
              >
                {done ? (
                  <Check size={13} style={{ color: "#fff" }} />
                ) : (
                  <span
                    style={{
                      color: active ? "var(--rj-emerald)" : "var(--rj-ash)",
                    }}
                  >
                    {s.icon}
                  </span>
                )}
              </motion.div>
              <span
                className="font-cinzel text-[8px] tracking-wider uppercase mt-1.5 hidden sm:block"
                style={{
                  color: done
                    ? "var(--rj-emerald)"
                    : active
                      ? "var(--rj-charcoal)"
                      : "var(--rj-bone)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
