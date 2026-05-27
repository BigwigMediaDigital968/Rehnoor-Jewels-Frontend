// // app/products/[slug]/component/ProductDetailWrapper.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useCartStore } from "@/app/store/cartStore";
// import { useCheckoutStore } from "@/app/store/checkoutStore";
// import ProductDetailHero from "./ProductDetailhero";
// import type { Product } from "../../../types/Product.types";

// interface Props {
//   product: Product;
//   collectionSlug?: string;
//   collectionName?: string;
// }

// export default function ProductDetailWrapper({ product }: Props) {
//   const router = useRouter();
//   const addItem = useCartStore((s) => s.addItem);
//   const resetCheckout = useCheckoutStore((s) => s.reset);

//   const handleAddToCart = (size: string, qty: number) => {
//     addItem({
//       productId: product.id,
//       name: product.name,
//       subtitle: product.subtitle,
//       image: product.images[0].src,
//       price: product.price,
//       priceNum: parseInt(product.price.replace(/[^\d]/g, ""), 10),
//       originalPrice: product.originalPrice,
//       size,
//       qty,
//       href: product.href,
//       category: product.category,
//       tag: product.tag,
//     });
//   };

//   const handleBuyNow = (size: string, qty: number) => {
//     resetCheckout();
//     handleAddToCart(size, qty);
//     router.push("/checkout");
//   };

//   return (
//     <ProductDetailHero
//       product={product}
//       onAddToCart={handleAddToCart}
//       onBuyNow={handleBuyNow}
//     />
//   );
// }

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

    const originalPriceNum: number | undefined = variant?.originalPrice
      ? variant.originalPrice
      : product.originalPrice
        ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
        : undefined;

    // Cart item id must be unique per product+variant combination
    // Using variantId when available, falling back to size label
    const variantKey = variantId ?? size;

    addItem({
      productId: product.id,
      name: product.name,
      subtitle: variant ? variant.title : product.subtitle,
      image: variant?.images?.[0]?.src ?? product.images[0]?.src ?? "",
      price: `₹${priceNum.toLocaleString("en-IN")}`,
      priceNum,
      originalPrice: originalPriceNum
        ? `₹${originalPriceNum.toLocaleString("en-IN")}`
        : product.originalPrice,
      size: variantKey, // stores variant title like '18" / Gold'
      qty,
      href: product.href,
      category: product.category,
      tag: product.tag,
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
