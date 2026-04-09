// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailWrapper from "./component/ProductDetailWrapper";
import ProductTabs from "./component/Producttabs";
import ProductReviews from "./component/Productreviews";
import RelatedProducts from "./component/Relatedproducts";
import {
  fetchProductBySlug,
  fetchAllProductSlugs,
  type ApiProduct,
} from "@/app/lib/api/productLive";
import type { Product } from "../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// ADAPTER — ApiProduct → Product (what the existing client components expect)
// ─────────────────────────────────────────────────────────────────
function toProduct(p: ApiProduct): Product {
  return {
    id: p._id,
    name: p.name,
    subtitle: p.subtitle,

    price: p.priceFormatted ?? `₹${p.price.toLocaleString("en-IN")}`,
    originalPrice: p.originalPriceFormatted ?? undefined,

    tag: p.tag as Product["tag"],
    rating: p.rating,
    reviewCount: p.reviewCount,
    category: p.category,

    description: p.shortDescription || p.longDescription || "",

    href: `/products/${p.slug}`,

    images: p.images,
    sizes: p.sizes,

    offerBannerImage: p.offerBannerImage,
    sizeChartImage: p.sizeChartImage,

    ourPromise: p.ourPromise,
    specifications: p.specifications || [],
  };
}

// ─────────────────────────────────────────────────────────────────
// STATIC PARAMS — pre-render known slugs at build time
// ─────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await fetchAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetchProductBySlug(slug);
    if (res.success && res.data) {
      return {
        title: `${res.data.name} | Rehnoor Jewels`,
        description: res.data.seoDescription,
        openGraph: {
          images: res.data.images[0] ? [{ url: res.data.images[0].src }] : [],
        },
      };
    }
  } catch {}
  return { title: "Product | Rehnoor Jewels" };
}

// ─────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product;
  let collectionSlug: string;
  let rawProductId: string;
  let rawSlug: string;

  try {
    const res = await fetchProductBySlug(slug);
    if (!res.success || !res.data) return notFound();
    product = toProduct(res.data);
    collectionSlug =
      res.data.collection ?? (res.data.category ?? "chains").toLowerCase();
    // Keep raw _id and slug for the reviews API
    rawProductId = res.data._id;
    rawSlug = res.data.slug;
  } catch {
    return notFound();
  }

  console.log(product);

  return (
    <main>
      {/* Hero — cart / wishlist logic lives inside the wrapper */}
      <ProductDetailWrapper product={product} />

      {/* Specs, details, etc. */}
      <ProductTabs product={product} />

      {/* ── Reviews — fully wired to live API ── */}
      <ProductReviews
        productId={rawProductId}
        productName={product.name}
        productSlug={rawSlug}
      />

      {/* Related products from same collection */}
      <RelatedProducts
        collectionSlug={collectionSlug}
        currentProductId={product.id}
      />
    </main>
  );
}
