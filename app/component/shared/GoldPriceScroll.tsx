"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetalApiResponse {
  success: boolean;
  base: string;
  timestamp: number;
  rates: {
    USDXAU?: number;
    USDINR?: number;
    USDXAG?: number;
    XAU?: number;
    XAG?: number;
    INR?: number;
    [key: string]: number | undefined;
  };
}

interface GoldData {
  pricePerGram24k: number;
  pricePerGram22k: number;
  pricePerGram18k: number;
  pricePerGram10k: number;
  pricePerTola: number;
  pricePerSovereign: number;
  usdInr: number;
  xauUsd: number;
  xagUsd: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_KEY = "564b1c15f0eb271be0df89b7607ed3d5";
const API_URL = `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY}&base=USD&currencies=XAU,XAG,INR`;
const FOREX_URL = `https://api.frankfurter.app/latest?from=USD&to=INR`;
const TROY_OZ_TO_GRAM = 31.1035;
const TOLA_GRAMS = 11.6638;
const SOVEREIGN_GRAMS = 8;

// ─── Compute ──────────────────────────────────────────────────────────────────

function computeGoldData(rates: MetalApiResponse["rates"]): GoldData | null {
  const xauUsd = rates.USDXAU ?? null;
  const xagUsd = rates.USDXAG ?? 0;
  const usdInr = rates.USDINR ?? 84.5;
  if (!xauUsd) return null;
  const g24 = (xauUsd / TROY_OZ_TO_GRAM) * usdInr;
  return {
    pricePerGram24k: g24,
    pricePerGram22k: g24 * (22 / 24),
    pricePerGram18k: g24 * (18 / 24),
    pricePerGram10k: g24 * (10 / 24),
    pricePerTola: g24 * TOLA_GRAMS,
    pricePerSovereign: g24 * SOVEREIGN_GRAMS,
    usdInr,
    xauUsd,
    xagUsd,
  };
}

function fmt(n: number, dec = 0) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(n);
}

// ─── Ticker Items ─────────────────────────────────────────────────────────────

interface TickerItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}

function buildItems(data: GoldData): TickerItem[] {
  return [
    {
      id: "24k",
      label: "Gold 24K",
      value: `₹${fmt(data.pricePerGram24k)}`,
      sub: "per gram",
      highlight: true,
    },
    {
      id: "22k",
      label: "Gold 22K",
      value: `₹${fmt(data.pricePerGram22k)}`,
      sub: "per gram",
    },
    {
      id: "18k",
      label: "Gold 18K",
      value: `₹${fmt(data.pricePerGram18k)}`,
      sub: "per gram",
    },
    {
      id: "10k",
      label: "Gold 10K",
      value: `₹${fmt(data.pricePerGram10k)}`,
      sub: "per gram",
    },
    {
      id: "tola",
      label: "Per Tola",
      value: `₹${fmt(data.pricePerTola)}`,
      sub: "11.66 g · 24K",
    },
    {
      id: "sov",
      label: "Sovereign",
      value: `₹${fmt(data.pricePerSovereign)}`,
      sub: "8 g · 24K",
    },
    {
      id: "10g",
      label: "10 Grams",
      value: `₹${fmt(data.pricePerGram24k * 10)}`,
      sub: "24K",
    },
    {
      id: "xau",
      label: "XAU / USD",
      value: `$${fmt(data.xauUsd, 2)}`,
      sub: "troy oz",
    },
    {
      id: "inr",
      label: "USD / INR",
      value: `₹${fmt(data.usdInr, 2)}`,
      sub: "forex",
    },
    {
      id: "xag",
      label: "Silver XAG",
      value: `$${fmt(data.xagUsd, 2)}`,
      sub: "troy oz",
    },
  ];
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ item }: { item: TickerItem }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.65rem",
        padding: "0 1.8rem",
        height: "100%",
        flexShrink: 0,
        borderRight: "1px solid rgba(252,193,81,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-accent,'Cinzel'),Georgia,serif",
          fontSize: "0.55rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: item.highlight ? "#fcc151" : "rgba(255,255,255,0.38)",
          whiteSpace: "nowrap",
        }}
      >
        {item.label}
      </span>

      <span
        style={{
          fontFamily:
            "var(--font-display,'Cormorant Garamond'),'Playfair Display',serif",
          fontSize: "1.2rem",
          fontWeight: item.highlight ? 600 : 400,
          whiteSpace: "nowrap",
          ...(item.highlight
            ? {
                background:
                  "linear-gradient(135deg,#fcc151 0%,#f5a623 50%,#e8930a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : { color: "#fff" }),
        }}
      >
        {item.value}
      </span>

      <span
        style={{
          fontFamily: "var(--font-body,'DM Sans'),system-ui,sans-serif",
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.25)",
          whiteSpace: "nowrap",
        }}
      >
        {item.sub}
      </span>

      {/* dot */}
      <span
        style={{
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          background: "rgba(252,193,81,0.25)",
          flexShrink: 0,
        }}
      />
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "2.5rem",
        padding: "0 2rem",
        height: "100%",
      }}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 56,
              height: 9,
              borderRadius: 3,
              ...shimStyle(i * 0.12),
            }}
          />
          <div
            style={{
              width: 88,
              height: 18,
              borderRadius: 3,
              ...shimStyle(i * 0.18),
            }}
          />
          <div
            style={{
              width: 44,
              height: 8,
              borderRadius: 3,
              ...shimStyle(i * 0.22),
            }}
          />
        </div>
      ))}
    </div>
  );
}
function shimStyle(delay: number) {
  return {
    background:
      "linear-gradient(90deg,rgba(255,255,255,0.05) 25%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.05) 75%)",
    backgroundSize: "600px 100%",
    animation: `shimmer 1.5s ${delay}s infinite`,
  } as React.CSSProperties;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function GoldPriceScroll() {
  const [data, setData] = useState<GoldData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [flash, setFlash] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [metalRes, forexRes] = await Promise.all([
        fetch(API_URL),
        fetch(FOREX_URL).catch(() => null),
      ]);
      if (!metalRes.ok) throw new Error(`HTTP ${metalRes.status}`);
      const json: MetalApiResponse = await metalRes.json();
      if (!json.success) throw new Error("API returned failure");
      if (forexRes?.ok) {
        const fx = await forexRes.json();
        if (fx?.rates?.INR) json.rates.USDINR = fx.rates.INR;
      }
      const computed = computeGoldData(json.rates);
      if (!computed) throw new Error("Missing rate data");
      setData(computed);
      setError(null);
      setFlash(true);
      setTimeout(() => setFlash(false), 900);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const iv = setInterval(fetchData, 60_000);
    return () => clearInterval(iv);
  }, [fetchData]);

  const items = data ? buildItems(data) : [];
  const repeated = [...items, ...items, ...items]; // 3× for seamless loop

  const timeStr = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .gt-wrap { --font-display:'Cormorant Garamond'; --font-accent:'Cinzel'; --font-body:'DM Sans'; }
        .gt-wrap * { box-sizing:border-box; }

        @keyframes shimmer {
          0%   { background-position: -600px 0  }
          100% { background-position:  600px 0  }
        }
        @keyframes ticker {
          from { transform: translateX(0)        }
          to   { transform: translateX(-33.333%) }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(1);   opacity:.9 }
          100% { transform:scale(2.6); opacity:0  }
        }
        @keyframes flash-update {
          0%,100% { opacity:1   }
          45%     { opacity:.25 }
        }
        @keyframes spin {
          to { transform:rotate(360deg) }
        }

        /* ── TOP BAR ── */
        .gt-topbar {
          width:100%;
          background:#002010;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 1.4rem;
          height:34px;
          border-bottom:1px solid rgba(252,193,81,.08);
          gap:1rem;
        }
        .gt-topbar-l { display:flex; align-items:center; gap:.55rem; }
        .gt-topbar-r { display:flex; align-items:center; gap:.9rem;  }

        .gt-badge {
          font-family:var(--font-accent,'Cinzel'),serif;
          font-size:.54rem; font-weight:700;
          letter-spacing:.22em; text-transform:uppercase;
          color:#fcc151;
        }
        .gt-live {
          width:7px; height:7px; border-radius:50%;
          background:#4ade80; position:relative; flex-shrink:0;
        }
        .gt-live::after {
          content:''; position:absolute; inset:0;
          border-radius:50%; background:#4ade80;
          animation:pulse-ring 1.9s ease-out infinite;
        }
        .gt-live-lbl {
          font-family:var(--font-accent,'Cinzel'),serif;
          font-size:.5rem; letter-spacing:.18em;
          text-transform:uppercase; color:#4ade80;
        }
        .gt-time {
          font-family:var(--font-body,'DM Sans'),sans-serif;
          font-size:.6rem; color:rgba(255,255,255,.3);
        }
        .gt-icon-btn {
          background:none; border:none; cursor:pointer;
          color:rgba(252,193,81,.45); display:flex; align-items:center;
          padding:0; transition:color .2s, transform .25s;
        }
        .gt-icon-btn:hover { color:#fcc151; transform:scale(1.15); }

        /* ── TICKER STRIP ── */
        .gt-strip {
          width:100%; overflow:hidden; position:relative;
          height:54px;
          background:linear-gradient(180deg,#003220 0%,#002618 100%);
          border-bottom:1px solid rgba(252,193,81,.08);
        }
        .gt-strip::before,.gt-strip::after {
          content:''; position:absolute; top:0; bottom:0; width:90px; z-index:2; pointer-events:none;
        }
        .gt-strip::before { left:0;  background:linear-gradient(to right,#002618,transparent); }
        .gt-strip::after  { right:0; background:linear-gradient(to left, #002618,transparent); }

        .gt-track {
          display:inline-flex; align-items:center; height:100%;
          white-space:nowrap; will-change:transform;
          animation:ticker 48s linear infinite;
        }
        .gt-track.paused { animation-play-state:paused; }
        .gt-track.flash  { animation:ticker 48s linear infinite, flash-update .8s ease; }

        /* ── STATS BAR ── */
        .gt-stats {
          width:100%;
          background:#001e10;
          display:flex; align-items:stretch;
          border-bottom:1px solid rgba(252,193,81,.06);
          overflow-x:auto;
        }
        .gt-stats::-webkit-scrollbar { display:none; }
        .gt-stats { -ms-overflow-style:none; scrollbar-width:none; }

        .gt-stat {
          flex:1; min-width:120px;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding:.65rem .4rem; gap:.12rem;
          border-right:1px solid rgba(252,193,81,.05);
          transition:background .2s; cursor:default;
        }
        .gt-stat:last-child { border-right:none; }
        .gt-stat:hover { background:rgba(252,193,81,.04); }

        .gt-sl { font-family:var(--font-accent,'Cinzel'),serif; font-size:.46rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(252,193,81,.4); }
        .gt-sv { font-family:var(--font-display,'Cormorant Garamond'),serif; font-size:1.05rem; font-weight:500; color:#fff; line-height:1; }
        .gt-sv.g { background:linear-gradient(135deg,#fcc151,#f5a623,#e8930a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-weight:600; }
        .gt-ss { font-family:var(--font-body,'DM Sans'),sans-serif; font-size:.54rem; color:rgba(255,255,255,.22); }

        /* ── FOOTER ── */
        .gt-footer {
          width:100%; background:#001a0c;
          padding:.3rem 1.4rem;
          display:flex; align-items:center; justify-content:space-between;
          border-top:1px solid rgba(252,193,81,.04);
        }
        .gt-footer span {
          font-family:var(--font-body,'DM Sans'),sans-serif;
          font-size:.52rem; color:rgba(255,255,255,.18); letter-spacing:.02em;
        }
      `}</style>

      <div className="gt-wrap">
        {/* TOP BAR */}
        <div className="gt-topbar">
          <div className="gt-topbar-l">
            <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
              <rect
                x="0"
                y="3.5"
                width="20"
                height="8"
                rx="1.5"
                fill="#fcc151"
              />
              <rect
                x="3.5"
                y="1.5"
                width="13"
                height="3.5"
                rx="1"
                fill="#f5a623"
              />
              <rect
                x="6"
                y="7.5"
                width="8"
                height="1.5"
                rx=".75"
                fill="rgba(0,55,32,.4)"
              />
            </svg>
            <span className="gt-badge">Live Gold · India</span>
            <div className="gt-live" />
            <span className="gt-live-lbl">Live</span>
          </div>

          <div className="gt-topbar-r">
            <span className="gt-time">IST {timeStr}</span>

            {/* Pause / Play */}
            <button
              className="gt-icon-btn"
              onClick={() => setPaused((p) => !p)}
              title={paused ? "Resume" : "Pause"}
            >
              {paused ? (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              ) : (
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              )}
            </button>

            {/* Refresh */}
            <button className="gt-icon-btn" onClick={fetchData} title="Refresh">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={loading ? { animation: "spin .8s linear infinite" } : {}}
              >
                <path d="M23 4v6h-6" />
                <path d="M1 20v-6h6" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </button>
          </div>
        </div>

        {/* TICKER STRIP */}
        <div className="gt-strip">
          {loading ? (
            <SkeletonRow />
          ) : error ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 2rem",
                height: "100%",
                gap: ".5rem",
                color: "#f87171",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                fontSize: ".78rem",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Failed to load: {error}
            </div>
          ) : (
            <div
              className={`gt-track${paused ? " paused" : ""}${flash ? " flash" : ""}`}
            >
              {repeated.map((item, i) => (
                <Chip key={`${item.id}-${i}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* STATS BAR */}
        {!loading && !error && data && (
          <div className="gt-stats">
            {[
              {
                l: "Gold 24K / g",
                v: `₹${fmt(data.pricePerGram24k)}`,
                s: "Pure",
                g: true,
              },
              {
                l: "Gold 22K / g",
                v: `₹${fmt(data.pricePerGram22k)}`,
                s: "Jewellery",
              },
              {
                l: "Gold 18K / g",
                v: `₹${fmt(data.pricePerGram18k)}`,
                s: "Hallmark",
              },
              {
                l: "Gold 10K / g",
                v: `₹${fmt(data.pricePerGram10k)}`,
                s: "10 Karat",
              },
              { l: "Per Tola", v: `₹${fmt(data.pricePerTola)}`, s: "11.66 g" },
              {
                l: "Sovereign",
                v: `₹${fmt(data.pricePerSovereign)}`,
                s: "8 g",
              },
              {
                l: "10 Grams 24K",
                v: `₹${fmt(data.pricePerGram24k * 10)}`,
                s: "Reference",
              },
              { l: "XAU / USD", v: `$${fmt(data.xauUsd, 2)}`, s: "Spot" },
              { l: "USD / INR", v: `₹${fmt(data.usdInr, 2)}`, s: "Forex" },
              { l: "Silver XAG", v: `$${fmt(data.xagUsd, 2)}`, s: "troy oz" },
            ].map(({ l, v, s, g }) => (
              <div key={l} className="gt-stat">
                <span className="gt-sl">{l}</span>
                <span className={`gt-sv${g ? " g" : ""}`}>{v}</span>
                <span className="gt-ss">{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div className="gt-footer">
          <span>
            Indicative rates · International spot reference · Not financial
            advice
          </span>
          <span>Auto-refreshes every 60 s</span>
        </div>
      </div>
    </>
  );
}
