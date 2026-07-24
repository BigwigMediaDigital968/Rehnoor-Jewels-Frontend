"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  Copy,
  Check,
  ShoppingBag,
  Truck,
} from "lucide-react";

interface OrderData {
  orderNumber: string;
  total: number;
  paymentMethod: string;
}

export default function ThankYouPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rj_last_order");
      if (raw) {
        setOrder(JSON.parse(raw));
        sessionStorage.removeItem("rj_last_order");
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && !order) {
      router.replace("/");
    }
  }, [loaded, order, router]);

  if (!order) return null;

  const { orderNumber, total, paymentMethod } = order;
  const isCod = paymentMethod === "cod";

  const copyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "var(--rj-ivory)" }}
    >
      <div className="max-w-md w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
          style={{ background: "var(--gradient-gold)" }}
        >
          <CheckCircle size={44} style={{ color: "var(--rj-emerald)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <p className="label-accent mb-2" style={{ color: "var(--rj-emerald)" }}>
            ✦ Order placed successfully
          </p>
          <h1
            className="font-cormorant text-3xl font-light mb-3"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Thank you for your order!
          </h1>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "var(--rj-ash)", fontFamily: "var(--font-body,'DM Sans'),sans-serif" }}
          >
            {isCod
              ? "Your order is confirmed. Our team will prepare your jewellery and dispatch it shortly. Please keep the exact amount ready at delivery."
              : "Payment confirmed. Your gold is being prepared with care and will be dispatched soon."}
          </p>

          {isCod && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-4 text-left"
              style={{ background: "rgba(186,117,23,0.08)", border: "1px solid rgba(186,117,23,0.2)" }}
            >
              <Truck size={16} style={{ color: "#BA7517", flexShrink: 0, marginTop: 2 }} />
              <div>
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
                  style={{ color: "#BA7517" }}
                >
                  Cash on Delivery
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--rj-ash)", fontFamily: "var(--font-body,'DM Sans'),sans-serif" }}
                >
                  Please keep{" "}
                  <strong style={{ color: "var(--rj-charcoal)" }}>
                    ₹{(total ?? 0).toLocaleString("en-IN")}
                  </strong>{" "}
                  ready at the time of delivery.
                </p>
              </div>
            </div>
          )}

          <div
            className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl mb-6"
            style={{ background: "rgba(0,55,32,0.06)", border: "1px solid rgba(0,55,32,0.12)" }}
          >
            <div className="text-left">
              <p className="font-cinzel text-[9px] tracking-widest uppercase" style={{ color: "var(--rj-ash)" }}>
                Order ID
              </p>
              <p className="font-cinzel font-bold text-sm" style={{ color: "var(--rj-emerald)" }}>
                {orderNumber}
              </p>
            </div>
            <button
              onClick={copyOrder}
              className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-60"
              style={{ color: copied ? "var(--rj-emerald)" : "var(--rj-ash)", cursor: "pointer" }}
            >
              {copied ? (
                <>
                  <Check size={11} /> Copied
                </>
              ) : (
                <>
                  <Copy size={11} /> Copy
                </>
              )}
            </button>
          </div>

          <p className="font-cinzel text-[10px] tracking-widest mb-8" style={{ color: "var(--rj-ash)" }}>
            Order total:{" "}
            <span className="font-bold" style={{ color: "var(--rj-charcoal)" }}>
              ₹{(total ?? 0).toLocaleString("en-IN")}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href={`/track-order?id=${orderNumber}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
              style={{ background: "var(--gradient-gold)", color: "var(--rj-emerald)", cursor: "pointer" }}
            >
              <Package size={12} /> Track Order
            </Link>
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-cinzel text-[10px] tracking-widest uppercase font-bold transition-all hover:opacity-70"
              style={{ border: "1.5px solid var(--rj-bone)", color: "var(--rj-ash)", cursor: "pointer" }}
            >
              <ShoppingBag size={12} /> Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}