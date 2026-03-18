"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { trustBadges } from "../../nav-data";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const items = [...trustBadges, ...trustBadges, ...trustBadges];

  return (
    <div className="announcement-bar relative" role="banner">
      <div className="marquee-track">
        {items.map((badge, i) => (
          <span
            key={i}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <span className="text-gold text-xs">{badge.icon}</span>
            <span>{badge.label}</span>
            <span className="text-gold opacity-40 mx-2">✦</span>
          </span>
        ))}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 hover:text-gold transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={12} />
      </button>
    </div>
  );
}
