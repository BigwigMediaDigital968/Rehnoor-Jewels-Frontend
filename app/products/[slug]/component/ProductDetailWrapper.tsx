// app/products/[slug]/component/ProductDetailWrapper.tsx
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

export default function ProductDetailWrapper({ product }: Props) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const resetCheckout = useCheckoutStore((s) => s.reset);

  // Builds the CartItem shape from the product + selection
  // selectedSize and qty come from inside ProductDetailHero,
  // so we pass callbacks that accept them (see hero changes below)
  const handleAddToCart = (size: string, qty: number) => {
    addItem({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0].src,
      price: product.price,
      priceNum: parseInt(product.price.replace(/[^\d]/g, ""), 10),
      originalPrice: product.originalPrice,
      size,
      qty,
      href: product.href,
      category: product.category,
      tag: product.tag,
    });
  };

  const handleBuyNow = (size: string, qty: number) => {
    resetCheckout();
    handleAddToCart(size, qty);
    router.push("/checkout");
  };

  return (
    <ProductDetailHero
      product={product}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
}
