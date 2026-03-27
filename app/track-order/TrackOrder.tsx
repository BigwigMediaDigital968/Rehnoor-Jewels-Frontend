"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Search,
  ChevronRight,
  Check,
  Truck,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Star,
  Copy,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────
type OrderStatus =
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered";

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  done: boolean;
}

interface OrderData {
  orderId: string;
  status: OrderStatus;
  product: string;
  image: string;
  quantity: number;
  price: string;
  placedOn: string;
  estimatedDelivery: string;
  courier: string;
  courierTrackingId: string;
  timeline: TrackingEvent[];
  deliveryAddress: string;
}

// ─────────────────────────────────────────────────────────────────
// MOCK DATA — replace with real API call
// ─────────────────────────────────────────────────────────────────
const MOCK_ORDERS: Record<string, OrderData> = {
  "RJ-2025-00142": {
    orderId: "RJ-2025-00142",
    status: "shipped",
    product: "Nawabi Gold Chain · 22kt · 18 inch",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&q=80",
    quantity: 1,
    price: "₹8,999",
    placedOn: "12 Jan 2025",
    estimatedDelivery: "16 Jan 2025",
    courier: "Delhivery",
    courierTrackingId: "DL-48291038472",
    deliveryAddress: "Arjun Mehta, 14 Sector 18, Noida – 201301",
    timeline: [
      {
        status: "Order confirmed",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "12 Jan, 11:02 AM",
        done: true,
      },
      {
        status: "Quality check passed",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "12 Jan, 02:45 PM",
        done: true,
      },
      {
        status: "Packed & ready to ship",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "13 Jan, 10:00 AM",
        done: true,
      },
      {
        status: "Picked up by courier",
        location: "Delhivery Hub, Okhla",
        timestamp: "13 Jan, 04:15 PM",
        done: true,
      },
      {
        status: "In transit",
        location: "Delhivery Hub, Ghaziabad",
        timestamp: "14 Jan, 08:30 AM",
        done: true,
      },
      {
        status: "Out for delivery",
        location: "Noida Sector 18",
        timestamp: "—",
        done: false,
      },
      {
        status: "Delivered",
        location: "Your doorstep",
        timestamp: "—",
        done: false,
      },
    ],
  },
  "RJ-2025-00098": {
    orderId: "RJ-2025-00098",
    status: "delivered",
    product: "Royal Kada · 22kt · Size M",
    image:
      "https://images.unsplash.com/photo-1720528347642-ba00bbf6794d?w=200&q=80",
    quantity: 1,
    price: "₹12,499",
    placedOn: "02 Jan 2025",
    estimatedDelivery: "07 Jan 2025",
    courier: "BlueDart",
    courierTrackingId: "BD-7731928374",
    deliveryAddress: "Rohan Singhania, 8A Defence Colony, New Delhi – 110024",
    timeline: [
      {
        status: "Order confirmed",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "02 Jan, 10:15 AM",
        done: true,
      },
      {
        status: "Quality check passed",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "02 Jan, 03:00 PM",
        done: true,
      },
      {
        status: "Packed & ready to ship",
        location: "Rehnoor Jewels, Delhi",
        timestamp: "03 Jan, 09:00 AM",
        done: true,
      },
      {
        status: "Picked up by courier",
        location: "BlueDart Hub, Okhla",
        timestamp: "03 Jan, 02:30 PM",
        done: true,
      },
      {
        status: "In transit",
        location: "BlueDart Hub, Delhi",
        timestamp: "04 Jan, 07:00 AM",
        done: true,
      },
      {
        status: "Out for delivery",
        location: "Defence Colony, Delhi",
        timestamp: "06 Jan, 09:20 AM",
        done: true,
      },
      {
        status: "Delivered",
        location: "Your doorstep",
        timestamp: "06 Jan, 01:45 PM",
        done: true,
      },
    ],
  },
};

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: "Order Confirmed",
    color: "#0F6E56",
    bg: "rgba(0,55,32,0.08)",
    icon: <Check size={14} />,
  },
  processing: {
    label: "Processing",
    color: "#BA7517",
    bg: "rgba(186,117,23,0.1)",
    icon: <Package size={14} />,
  },
  shipped: {
    label: "Shipped",
    color: "#185FA5",
    bg: "rgba(24,95,165,0.08)",
    icon: <Truck size={14} />,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "#BA7517",
    bg: "rgba(186,117,23,0.1)",
    icon: <MapPin size={14} />,
  },
  delivered: {
    label: "Delivered",
    color: "#0F6E56",
    bg: "rgba(0,55,32,0.08)",
    icon: <Check size={14} />,
  },
};

const STEPS: OrderStatus[] = [
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
];

// ─────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────
function StatusProgressBar({ status }: { status: OrderStatus }) {
  const currentIdx = STEPS.indexOf(status);
  const labels = [
    "Confirmed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* connecting line */}
        <div
          className="absolute top-4 left-4 right-4 h-0.5"
          style={{ background: "var(--rj-bone)" }}
        />
        <motion.div
          className="absolute top-4 left-4 h-0.5"
          style={{ background: "var(--gradient-gold)" }}
          initial={{ width: 0 }}
          animate={{ width: `${(currentIdx / (STEPS.length - 1)) * 94}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
        {STEPS.map((step, i) => {
          const done = i <= currentIdx;
          const current = i === currentIdx;
          return (
            <div
              key={step}
              className="relative flex flex-col items-center z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: done
                    ? current
                      ? "var(--gradient-gold)"
                      : "var(--rj-emerald)"
                    : "#fff",
                  border: done ? "none" : "1.5px solid var(--rj-bone)",
                  boxShadow: current
                    ? "0 0 0 4px rgba(252,193,81,0.2)"
                    : "none",
                }}
              >
                {done ? (
                  <Check
                    size={13}
                    style={{ color: current ? "var(--rj-emerald)" : "#fff" }}
                  />
                ) : (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--rj-bone)" }}
                  />
                )}
              </motion.div>
              <span
                className="font-cinzel text-[8px] tracking-wider mt-1.5 text-center hidden sm:block"
                style={{
                  color: done ? "var(--rj-emerald)" : "var(--rj-ash)",
                  fontWeight: current ? 700 : 400,
                  maxWidth: 70,
                  lineHeight: 1.3,
                }}
              >
                {labels[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────
function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <div className="relative flex flex-col gap-0">
      {events.map((ev, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          className="flex gap-4 relative"
        >
          {/* vertical line */}
          {i < events.length - 1 && (
            <div
              className="absolute left-[11px] top-8 bottom-0 w-px"
              style={{
                background: ev.done ? "var(--rj-emerald)" : "var(--rj-bone)",
                opacity: ev.done ? 0.3 : 0.5,
              }}
            />
          )}
          {/* dot */}
          <div className="flex-shrink-0 mt-1 relative z-10">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: ev.done ? "var(--rj-emerald)" : "#fff",
                border: `1.5px solid ${ev.done ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
              }}
            >
              {ev.done ? (
                <Check size={11} style={{ color: "#fff" }} />
              ) : (
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--rj-bone)" }}
                />
              )}
            </div>
          </div>
          {/* content */}
          <div className="pb-5 flex-1">
            <p
              className="font-cinzel text-xs font-bold"
              style={{
                color: ev.done ? "var(--rj-charcoal)" : "var(--rj-bone)",
              }}
            >
              {ev.status}
            </p>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span
                className="text-xs flex items-center gap-1"
                style={{
                  color: ev.done ? "var(--rj-ash)" : "var(--rj-bone)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                <MapPin size={10} /> {ev.location}
              </span>
              {ev.done && ev.timestamp !== "—" && (
                <span
                  className="text-xs flex items-center gap-1"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  <Clock size={10} /> {ev.timestamp}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RESULT PANEL
// ─────────────────────────────────────────────────────────────────
function OrderResult({ order }: { order: OrderData }) {
  const statusCfg = STATUS_CONFIG[order.status];
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(order.courierTrackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Status pill + order id ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-cinzel text-xs font-bold"
            style={{ background: statusCfg.bg, color: statusCfg.color }}
          >
            {statusCfg.icon} {statusCfg.label}
          </div>
          <span
            className="font-cinzel text-xs tracking-wider"
            style={{ color: "var(--rj-ash)" }}
          >
            {order.orderId}
          </span>
        </div>
        {order.status !== "delivered" && (
          <div
            className="flex items-center gap-1.5 font-cinzel text-[10px] tracking-wider"
            style={{ color: "var(--rj-emerald)" }}
          >
            <Clock size={11} /> Est. {order.estimatedDelivery}
          </div>
        )}
      </div>

      {/* ── Product summary ── */}
      <div
        className="flex items-center gap-4 p-4 rounded-xl mb-6"
        style={{
          background: "var(--rj-ivory-dark)",
          border: "1px solid var(--rj-bone)",
        }}
      >
        <div
          className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
          style={{ background: "var(--rj-bone)" }}
        >
          <img
            src={order.image}
            alt={order.product}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="font-cormorant font-light leading-snug line-clamp-2"
            style={{ fontSize: "1rem", color: "var(--rj-charcoal)" }}
          >
            {order.product}
          </p>
          <p
            className="font-cinzel text-[10px] tracking-wider mt-0.5"
            style={{ color: "var(--rj-ash)" }}
          >
            Qty: {order.quantity} · Placed {order.placedOn}
          </p>
        </div>
        <p
          className="font-cinzel font-bold flex-shrink-0"
          style={{ color: "var(--rj-emerald)", fontSize: "1rem" }}
        >
          {order.price}
        </p>
      </div>

      {/* ── Progress bar ── */}
      <div className="mb-8 px-2">
        <StatusProgressBar status={order.status} />
      </div>

      {/* ── Main layout: timeline + details ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Timeline — 3 cols */}
        <div className="md:col-span-3">
          <p
            className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-4"
            style={{ color: "var(--rj-charcoal)" }}
          >
            Tracking Timeline
          </p>
          <TrackingTimeline events={order.timeline} />
        </div>

        {/* Details — 2 cols */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Courier info */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
          >
            <p
              className="font-cinzel text-[9px] tracking-widest uppercase mb-3"
              style={{ color: "var(--rj-ash)" }}
            >
              Courier details
            </p>
            <p
              className="font-cinzel text-sm font-bold mb-1"
              style={{ color: "var(--rj-charcoal)" }}
            >
              {order.courier}
            </p>
            <div className="flex items-center gap-2">
              <p
                className="font-cinzel text-[10px] tracking-wider"
                style={{ color: "var(--rj-ash)" }}
              >
                {order.courierTrackingId}
              </p>
              <button
                onClick={copyId}
                className="flex items-center gap-1 font-cinzel text-[9px] tracking-wider uppercase transition-opacity hover:opacity-60"
                style={{
                  color: copied ? "var(--rj-emerald)" : "var(--rj-ash)",
                  cursor: "pointer",
                }}
              >
                {copied ? (
                  <>
                    <Check size={10} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={10} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Delivery address */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "#fff", border: "1px solid var(--rj-bone)" }}
          >
            <p
              className="font-cinzel text-[9px] tracking-widest uppercase mb-2"
              style={{ color: "var(--rj-ash)" }}
            >
              Delivering to
            </p>
            <div className="flex items-start gap-2">
              <MapPin
                size={13}
                style={{
                  color: "var(--rj-emerald)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--rj-charcoal)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {order.deliveryAddress}
              </p>
            </div>
          </div>

          {/* Help links */}
          <div
            className="p-4 rounded-xl"
            style={{
              background: "rgba(0,55,32,0.05)",
              border: "1px solid rgba(0,55,32,0.1)",
            }}
          >
            <p
              className="font-cinzel text-[9px] tracking-widest uppercase mb-3"
              style={{ color: "var(--rj-emerald)" }}
            >
              Need help?
            </p>
            {[
              {
                label: "Contact support",
                href: "/contact",
                icon: <Phone size={11} />,
              },
              {
                label: "Start a return",
                href: "/account/returns",
                icon: <RefreshCw size={11} />,
              },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="flex items-center gap-2 py-1.5 font-cinzel text-[10px] tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
              >
                {l.icon} {l.label} <ArrowRight size={10} className="ml-auto" />
              </Link>
            ))}
          </div>

          {/* Delivered — leave a review */}
          {order.status === "delivered" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 rounded-xl text-center"
              style={{ background: "var(--gradient-gold)", cursor: "default" }}
            >
              <Star
                size={18}
                style={{ color: "var(--rj-emerald)", margin: "0 auto 8px" }}
              />
              <p
                className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-1"
                style={{ color: "var(--rj-emerald)" }}
              >
                Enjoying your piece?
              </p>
              <p
                className="text-xs mb-3"
                style={{
                  color: "rgba(0,55,32,0.7)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                Leave a review and earn 50 reward points
              </p>
              <Link
                href="/account/orders"
                className="inline-block font-cinzel text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{
                  background: "var(--rj-emerald)",
                  color: "var(--rj-gold)",
                  cursor: "pointer",
                }}
              >
                Write a Review
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function TrackOrderPage() {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (id?: string) => {
    const query = (id ?? input).trim().toUpperCase();
    if (!query) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    await new Promise((r) => setTimeout(r, 900));
    const found = MOCK_ORDERS[query];
    if (found) {
      setOrder(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      {/* ── Header ── */}
      <div
        style={{
          background: "var(--rj-emerald)",
          paddingTop: "6rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-5">
            {["Home", "Track Order"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href="/"
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                      }}
                    >
                      {c}
                    </Link>
                    <ChevronRight
                      size={10}
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <p className="label-accent mb-3" style={{ color: "var(--rj-gold)" }}>
            ✦ Order status
          </p>
          <h1 className="heading-lg text-white mb-3">Track Your Order</h1>
          <p
            className="font-cinzel text-xs tracking-widest max-w-sm"
            style={{ color: "rgba(255,255,255,0.4)", lineHeight: 2 }}
          >
            Enter your order ID from your confirmation email to see real-time
            shipping status.
          </p>
        </div>
      </div>

      <div className="container-rj py-12">
        {/* ── Search input ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: input ? "var(--rj-emerald)" : "var(--rj-ash)" }}
              />
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setNotFound(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="e.g. RJ-2025-00142"
                className="w-full pl-10 pr-4 py-3.5 font-cinzel text-sm tracking-wider outline-none rounded-xl transition-all duration-200"
                style={{
                  background: "#fff",
                  border: `1.5px solid ${notFound ? "#fca5a5" : input ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                  color: "var(--rj-charcoal)",
                  boxShadow: input ? "0 0 0 3px rgba(0,55,32,0.06)" : "none",
                }}
              />
            </div>
            <button
              onClick={() => handleTrack()}
              disabled={!input.trim() || loading}
              className="px-6 py-3.5 rounded-xl font-cinzel text-[11px] tracking-widest uppercase font-bold transition-all duration-250 disabled:opacity-40"
              style={{
                background: "var(--rj-emerald)",
                color: "var(--rj-gold)",
                cursor: input.trim() ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "…" : "Track"}
            </button>
          </div>

          {/* Demo chips */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span
              className="font-cinzel text-[9px] tracking-widest uppercase"
              style={{ color: "var(--rj-ash)" }}
            >
              Try:
            </span>
            {Object.keys(MOCK_ORDERS).map((id) => (
              <button
                key={id}
                onClick={() => {
                  setInput(id);
                  handleTrack(id);
                }}
                className="font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full transition-all hover:opacity-70"
                style={{
                  background: "rgba(0,55,32,0.07)",
                  color: "var(--rj-emerald)",
                  border: "1px solid rgba(0,55,32,0.12)",
                  cursor: "pointer",
                }}
              >
                {id}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Loading ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-16 gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              >
                <Package
                  size={32}
                  style={{ color: "var(--rj-emerald)", opacity: 0.5 }}
                />
              </motion.div>
              <p
                className="font-cinzel text-xs tracking-widest uppercase"
                style={{ color: "var(--rj-ash)" }}
              >
                Fetching your order…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Not found ── */}
        <AnimatePresence>
          {notFound && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto flex flex-col items-center text-center py-12"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "#fef2f2", border: "1px solid #fca5a5" }}
              >
                <AlertCircle size={24} style={{ color: "#ef4444" }} />
              </div>
              <h3
                className="font-cormorant text-xl font-light mb-2"
                style={{ color: "var(--rj-charcoal)" }}
              >
                Order not found
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{
                  color: "var(--rj-ash)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                We couldn't find an order matching{" "}
                <strong
                  className="font-normal"
                  style={{ color: "var(--rj-charcoal)" }}
                >
                  "{input}"
                </strong>
                . Check your confirmation email for the correct order ID, or
                contact support.
              </p>
              <Link
                href="/contact"
                className="flex items-center gap-2 font-cinzel text-[10px] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all hover:opacity-90"
                style={{
                  background: "var(--rj-emerald)",
                  color: "var(--rj-gold)",
                  cursor: "pointer",
                }}
              >
                <Phone size={11} /> Contact Support
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result ── */}
        <AnimatePresence>
          {order && !loading && (
            <div className="max-w-4xl mx-auto">
              <OrderResult order={order} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
