// component/website/checkout/shared/Tooltip.tsx
"use client";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  content,
  children,
  position = "top",
}: Props) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const offsets = {
      top: { top: r.top - 36 + window.scrollY, left: r.left + r.width / 2 },
      bottom: {
        top: r.bottom + 8 + window.scrollY,
        left: r.left + r.width / 2,
      },
      left: { top: r.top + r.height / 2 + window.scrollY, left: r.left - 8 },
      right: { top: r.top + r.height / 2 + window.scrollY, left: r.right + 8 },
    };
    setCoords(offsets[position]);
    setShow(true);
  };

  const tip =
    show && typeof document !== "undefined"
      ? createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform:
                position === "top" || position === "bottom"
                  ? "translateX(-50%)"
                  : position === "left"
                    ? "translateX(-100%) translateY(-50%)"
                    : "translateY(-50%)",
              zIndex: 99999,
              background: "var(--rj-charcoal)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: 6,
              fontSize: "10px",
              fontFamily: "var(--font-cinzel, 'Cinzel'), serif",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {content}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        style={{ display: "inline-flex" }}
      >
        {children}
      </span>
      {tip}
    </>
  );
}
