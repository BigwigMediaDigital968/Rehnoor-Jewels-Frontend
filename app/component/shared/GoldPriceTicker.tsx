"use client";

import { useEffect, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetalApiResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    // When base=USD, the API returns USDXAU = price of 1 troy oz in USD
    USDXAU?: number; // e.g. 3293.45  → 1 troy oz = $3293.45
    USDINR?: number; // e.g. 84.12    → 1 USD = ₹84.12
    XAU?: number; // inverse: oz per USD (rarely needed)
    INR?: number; // inverse: USD per INR (rarely needed)
    [key: string]: number | undefined;
  };
}

interface GoldData {
  pricePerGram10k: number;
  pricePerGram18k: number;
  pricePerGram22k: number;
  pricePerGram24k: number;
  pricePerTola: number; // 1 tola = 11.6638 g
  pricePerSovereign: number; // 1 sovereign = 8 g
  usdInr: number;
  xauUsd: number;
  updatedAt: Date;
  changePercent: number | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_KEY = "564b1c15f0eb271be0df89b7607ed3d5";
// Request USDXAU (gold price in USD) and USDINR (rupee rate) — base=USD means
// the API returns "USDXXX" keys as the direct price of 1 USD in that currency,
// EXCEPT for metals where USDXAU = price of 1 troy oz in USD.
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU,XAG,INR`;
// Free forex fallback for USD→INR (no key needed, ~daily updated)
const FOREX_URL = `https://api.frankfurter.app/latest?from=USD&to=INR`;

const TROY_OZ_TO_GRAM = 31.1035;
const TOLA_GRAMS = 11.6638;
const SOVEREIGN_GRAMS = 8;

const PURITY: Record<string, number> = {
  "24K": 1.0,
  "22K": 22 / 24,
  "18K": 18 / 24,
  "10K": 10 / 24,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeGoldData(rates: MetalApiResponse["rates"]): GoldData | null {
  // API returns USDXAU = spot price of 1 troy oz of gold in USD
  // and USDINR = number of INR per 1 USD
  const xauUsd = rates.USDXAU ?? null;
  // Fallback: if USDINR missing, use a reasonable live-ish fallback
  // (you can swap this for a separate forex API if needed)
  const usdInr = rates.USDINR ?? 84.5;

  if (!xauUsd) return null;

  const pricePerGramInr24k =
    (xauUsd / TROY_OZ_TO_GRAM) * usdInr * PURITY["24K"];

  return {
    pricePerGram24k: pricePerGramInr24k,
    pricePerGram22k: (xauUsd / TROY_OZ_TO_GRAM) * usdInr * PURITY["22K"],
    pricePerGram18k: (xauUsd / TROY_OZ_TO_GRAM) * usdInr * PURITY["18K"],
    pricePerGram10k: (xauUsd / TROY_OZ_TO_GRAM) * usdInr * PURITY["10K"],
    pricePerTola: pricePerGramInr24k * TOLA_GRAMS,
    pricePerSovereign: pricePerGramInr24k * SOVEREIGN_GRAMS,
    usdInr,
    xauUsd,
    updatedAt: new Date(),
    changePercent: null,
  };
}

function fmt(n: number, decimals = 0): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PurityCard({
  label,
  price,
  highlight,
}: {
  label: string;
  price: number;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: highlight
          ? "var(--gradient-gold)"
          : "rgba(255,255,255,0.04)",
        border: highlight ? "none" : "1px solid rgba(252,193,81,0.15)",
        borderRadius: "0.5rem",
        padding: "1.1rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-3px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 32px rgba(252,193,81,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-accent, 'Cinzel'), Georgia, serif",
          fontSize: "0.6rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: highlight ? "var(--rj-emerald)" : "var(--rj-gold)",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily:
            "var(--font-display, 'Cormorant Garamond'), 'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
          fontWeight: 600,
          color: highlight ? "var(--rj-emerald)" : "#fff",
          lineHeight: 1.1,
        }}
      >
        ₹{fmt(price)}
      </span>
      <span
        style={{
          fontSize: "0.68rem",
          color: highlight ? "rgba(0,55,32,0.7)" : "rgba(255,255,255,0.45)",
          fontFamily: "var(--font-body, 'DM Sans'), system-ui, sans-serif",
        }}
      >
        per gram
      </span>
    </div>
  );
}

function StatPill({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(252,193,81,0.12)",
        borderRadius: "0.5rem",
        padding: "0.9rem 1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-accent, 'Cinzel'), Georgia, serif",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(252,193,81,0.6)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily:
            "var(--font-display,'Cormorant Garamond'),'Playfair Display',Georgia,serif",
          fontSize: "1.15rem",
          fontWeight: 500,
          color: "#fff",
        }}
      >
        {value}
      </span>
      {sub && (
        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-body,'DM Sans'),system-ui,sans-serif",
          }}
        >
          {sub}
        </span>
      )}
    </div>
  );
}

// ─── Shimmer Skeleton ─────────────────────────────────────────────────────────

function Skeleton({ w = "100%", h = "1rem" }: { w?: string; h?: string }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: "0.25rem",
        background:
          "linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.06) 75%)",
        backgroundSize: "1000px 100%",
        animation: "shimmer 1.6s infinite",
      }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GoldPriceTicker() {
  const [data, setData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [pulse, setPulse] = useState(false);
  const [tab, setTab] = useState<"purity" | "india">("purity");

  const fetchData = useCallback(async () => {
    try {
      // Parallel fetch: gold spot + USD/INR forex
      const [metalRes, forexRes] = await Promise.all([
        fetch(API_URL),
        fetch(FOREX_URL).catch(() => null), // non-blocking — fall back to hardcoded
      ]);

      if (!metalRes.ok) throw new Error(`HTTP ${metalRes.status}`);
      const json: MetalApiResponse = await metalRes.json();
      if (!json.success) throw new Error("API returned failure");

      // Inject USDINR from frankfurter if available
      if (forexRes?.ok) {
        const forexJson = await forexRes.json();
        if (forexJson?.rates?.INR) {
          json.rates.USDINR = forexJson.rates.INR;
        }
      }

      const computed = computeGoldData(json.rates);
      if (!computed) throw new Error("Missing rate data");
      setData(computed);
      setLastRefreshed(new Date());
      setError(null);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000); // refresh every 60s
    return () => clearInterval(interval);
  }, [fetchData]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <div
        className="gold-widget"
        style={{
          background: "var(--gradient-emerald)",
          borderRadius: "1rem",
          padding: "0",
          overflow: "hidden",
          maxWidth: "680px",
          width: "100%",
          margin: "0 auto",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(252,193,81,0.15)",
          animation: "fade-up 0.6s ease both",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: "rgba(0,0,0,0.25)",
            padding: "1.2rem 1.6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(252,193,81,0.1)",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {/* Gold bar icon */}
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "var(--gradient-gold)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="8"
                  width="20"
                  height="8"
                  rx="1.5"
                  fill="var(--rj-emerald)"
                />
                <rect
                  x="5"
                  y="6"
                  width="14"
                  height="3"
                  rx="1"
                  fill="rgba(0,55,32,0.6)"
                />
                <rect
                  x="7"
                  y="13"
                  width="10"
                  height="1.5"
                  rx="0.75"
                  fill="rgba(0,55,32,0.4)"
                />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-accent, 'Cinzel'), serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  color: "var(--rj-gold)",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Live Gold Rate
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-display, 'Cormorant Garamond'), serif",
                  fontSize: "1.35rem",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                India · MCX Reference
              </div>
            </div>
          </div>

          {/* Live + Refresh */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <span className="live-dot" />
              <span
                style={{
                  fontFamily: "var(--font-accent,'Cinzel'),serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  color: "#4ade80",
                  textTransform: "uppercase",
                }}
              >
                Live
              </span>
            </div>
            <button
              className="refresh-btn"
              onClick={fetchData}
              title="Refresh prices"
              style={{ color: "rgba(252,193,81,0.6)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                style={
                  loading ? { animation: "spin-slow 1s linear infinite" } : {}
                }
              >
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Hero Price (24K / gram) ── */}
        <div
          style={{
            padding: "1.6rem 1.6rem 0",
            textAlign: "center",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <Skeleton w="200px" h="3.5rem" />
              <Skeleton w="140px" h="1rem" />
            </div>
          ) : error ? (
            <div
              style={{
                color: "#f87171",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                fontSize: "0.85rem",
                padding: "1rem",
                background: "rgba(248,113,113,0.08)",
                borderRadius: "0.5rem",
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              ⚠ Failed to load: {error}
            </div>
          ) : data ? (
            <div>
              <div
                style={{
                  fontFamily: "var(--font-accent,'Cinzel'),serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.28em",
                  color: "rgba(252,193,81,0.65)",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                24 Karat · Per Gram
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display,'Cormorant Garamond'),serif",
                  fontSize: "clamp(2.8rem,8vw,5rem)",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  animation: pulse ? "price-flash 0.6s ease" : "none",
                }}
              >
                <span
                  style={{
                    background: "var(--gradient-gold)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ₹{fmt(data.pricePerGram24k)}
                </span>
              </div>
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                Updated {timeStr}
              </div>
            </div>
          ) : null}
        </div>

        {/* ── Tabs ── */}
        {!loading && !error && data && (
          <>
            <div
              style={{
                display: "flex",
                gap: "0",
                margin: "1.4rem 1.6rem 0",
                borderBottom: "1px solid rgba(252,193,81,0.12)",
              }}
            >
              {(["purity", "india"] as const).map((t) => (
                <button
                  key={t}
                  className="tab-btn"
                  onClick={() => setTab(t)}
                  style={{
                    padding: "0.55rem 1.1rem",
                    fontFamily: "var(--font-accent,'Cinzel'),serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color:
                      tab === t ? "var(--rj-gold)" : "rgba(255,255,255,0.38)",
                    borderBottom:
                      tab === t
                        ? "2px solid var(--rj-gold)"
                        : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {t === "purity" ? "By Purity" : "India Units"}
                </button>
              ))}
            </div>

            {/* ── Purity Grid ── */}
            {tab === "purity" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.75rem",
                  padding: "1.2rem 1.6rem",
                  animation: "fade-up 0.35s ease both",
                }}
              >
                <PurityCard
                  label="24 Karat"
                  price={data.pricePerGram24k}
                  highlight
                />
                <PurityCard label="22 Karat" price={data.pricePerGram22k} />
                <PurityCard label="18 Karat" price={data.pricePerGram18k} />
                <PurityCard label="10 Karat" price={data.pricePerGram10k} />
              </div>
            )}

            {/* ── India Units ── */}
            {tab === "india" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "0.75rem",
                  padding: "1.2rem 1.6rem",
                  animation: "fade-up 0.35s ease both",
                }}
              >
                <StatPill
                  label="Per Tola (11.66g)"
                  value={fmtCurrency(data.pricePerTola)}
                  sub="24K pure gold"
                />
                <StatPill
                  label="Per Sovereign (8g)"
                  value={fmtCurrency(data.pricePerSovereign)}
                  sub="South India unit"
                />
                <StatPill
                  label="Per 10 Grams"
                  value={fmtCurrency(data.pricePerGram24k * 10)}
                  sub="24K reference"
                />
                <StatPill
                  label="Per 100 Grams"
                  value={fmtCurrency(data.pricePerGram24k * 100)}
                  sub="Wholesale lot"
                />
              </div>
            )}

            {/* ── Forex Footer ── */}
            <div
              style={{
                margin: "0 1.6rem 1.6rem",
                padding: "0.9rem 1.1rem",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "0.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "0.5rem",
                borderTop: "1px solid rgba(252,193,81,0.08)",
              }}
            >
              {[
                { label: "XAU/USD", value: `$${fmt(data.xauUsd, 2)}` },
                { label: "USD/INR", value: `₹${fmt(data.usdInr, 2)}` },
                {
                  label: "XAU/INR",
                  value: `₹${fmt((data.xauUsd * data.usdInr) / 100, 0)}`,
                  sub: "per 1/100 oz",
                },
              ].map(({ label, value, sub }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-accent,'Cinzel'),serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.18em",
                      color: "rgba(252,193,81,0.45)",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {value}
                  </div>
                  {sub && (
                    <div
                      style={{
                        fontSize: "0.58rem",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {sub}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Disclaimer ── */}
            <div
              style={{
                padding: "0 1.6rem 1.2rem",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.22)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: 1.5,
                textAlign: "center",
              }}
            >
              Indicative prices based on international spot rates. Actual retail
              prices may vary. Auto-refreshes every 60 seconds.
            </div>
          </>
        )}
      </div>
    </>
  );
}
