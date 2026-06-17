// components/RecentlyViewedTracker.tsx

"use client";

import { useEffect } from "react";

export default function RecentlyViewedTracker({
  product,
}: {
  product: {
    id: string;
    slug: string;
    name: string;
    image: string;
    price: string;
    viewedAt: number;
  };
}) {
  useEffect(() => {
    const existing = JSON.parse(
      localStorage.getItem("recent-products") || "[]",
    );

    const filtered = existing.filter((item: any) => item.id !== product.id);

    filtered.unshift({
      ...product,
      viewedAt: Date.now(),
    });

    localStorage.setItem(
      "recent-products",
      JSON.stringify(filtered.slice(0, 5)),
    );
  }, [product]);

  return null;
}
