"use client";

import { useEffect } from "react";
import { wigzoTrack } from "@/app/lib/wigzo";
import type { Product } from "../../../types/Product.types";

export default function WigzoProductViewTracker({
  product,
}: {
  product: Product;
}) {
  useEffect(() => {
    if (product) {
      wigzoTrack("productview", {
        canonicalURL: window.location.href,
        productUrl: window.location.href,
        title: product.name,
        price: product.price,
        previousPrice: product.originalPrice || product.price,
        description: product.shortDescription || "",
        image: product.images?.[0]?.src || "",
        productId: product.id,
        category: product.category || "Jewelry",
        tags: Array.isArray(product.seoKeywords)
          ? product.seoKeywords.join(",")
          : "",
        language: "en",
      });
    }
  }, [product]);

  return null;
}
