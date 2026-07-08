"use client";

import { useRouter } from "next/navigation";
import { useCartStore, VariantSnapshot } from "@/app/store/cartStore";
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
  const { addItem, setBuyNow, openDrawer } = useCartStore();
  const resetCheckout = useCheckoutStore((s) => s.reset);
  function buildCartPayload(size: string, qty: number, variantId?: string) {
    const variant = variantId
      ? (product as any).variants?.find((v: any) => v._id === variantId)
      : null;

    const priceNum: number = variant
      ? variant.price
      : parseInt((product.price ?? "0").replace(/[^\d]/g, ""), 10);

    const originalPriceNum: number | null = variant?.originalPrice
      ? variant.originalPrice
      : product.originalPrice
        ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
        : null;

    let variantSnapshot: VariantSnapshot | null = null;
    if (variant || size) {
      variantSnapshot = {
        variantId:
          variantId ??
          (size ? size.toLowerCase().replace(/\s+/g, "-") : product.id),
        title: variant ? variant.title : size,
        options: { Size: size },
        price: priceNum,
        originalPrice: originalPriceNum,
        image: variant?.images?.[0]?.src ?? product.images?.[0]?.src ?? "",
      };
    }

    return {
      productId: product.id,
      name: product.name,
      subtitle: variant ? variant.title : product.subtitle,
      image: variant?.images?.[0]?.src ?? product.images?.[0]?.src ?? "",
      priceNum,
      originalPriceNum,
      qty,
      href: product.href,
      category: product.category,
      tag: product.tag,
      variant: variantSnapshot,
    };
  }

  const handleAddToCart = (size: string, qty: number, variantId?: string) => {
    addItem(buildCartPayload(size, qty, variantId));
    openDrawer();
  };

  const handleBuyNow = (size: string, qty: number, variantId?: string) => {
    resetCheckout();
    // NOTE: intentionally NOT calling addItem here — buy-now must not touch
    // the persistent cart, or it inflates cart qty / gets wiped on success.
    setBuyNow(buildCartPayload(size, qty, variantId));
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
