"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import ProductDetailHero from "./ProductDetailhero";
import type { Product } from "../../../types/Product.types";

interface Props {
  product: Product;
  collectionSlug?: string;
  collectionName?: string;
}

export default function ProductDetailWrapper({
  product,
  collectionSlug,
  collectionName,
}: Props) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const resetCheckout = useCheckoutStore((s) => s.reset);

  const handleAddToCart = (size: string, qty: number, variantId?: string) => {
    // Find the matching variant if one was passed
    const variant = variantId
      ? (product as any).variants?.find((v: any) => v._id === variantId)
      : null;

    // Prefer variant price (already a number); fall back to stripping ₹ from price string
    const priceNum: number = variant
      ? variant.price
      : parseInt((product.price ?? "0").replace(/[^\d]/g, ""), 10);

    const originalPriceNum: number | null = variant?.originalPrice
      ? variant.originalPrice
      : product.originalPrice
        ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
        : null;

    // Build the VariantSnapshot object if a variant or size exists
    let variantSnapshot = null;
    if (variant || size) {
      variantSnapshot = {
        variantId: variantId ?? size.toLowerCase().replace(/\s+/g, "-"),
        title: variant ? variant.title : size,
        options: { Size: size },
        price: priceNum,
        originalPrice: originalPriceNum,
        image: variant?.images?.[0]?.src ?? product.images[0]?.src ?? "",
      };
    }

    addItem({
      productId: product.id,
      name: product.name,
      subtitle: variant ? variant.title : product.subtitle,
      image: variant?.images?.[0]?.src ?? product.images[0]?.src ?? "",
      priceNum,
      originalPriceNum,
      qty,
      href: product.href,
      category: product.category,
      tag: product.tag,
      variant: variantSnapshot, // Matches VariantSnapshot | null
    });
  };

  const handleBuyNow = (size: string, qty: number, variantId?: string) => {
    resetCheckout();
    handleAddToCart(size, qty, variantId);
    router.push("/checkout");
  };

  return (
    <ProductDetailHero
      product={product}
      collectionSlug={collectionSlug}
      collectionName={collectionName}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
}
