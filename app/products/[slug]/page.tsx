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
} from "@/app/lib/api/productLive";
import type { Product } from "../../types/Product.types";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

/** Handles populated object, plain string, or undefined */
function extractCollection(collection: any, category?: string) {
  if (collection && typeof collection === "object") {
    return {
      slug: collection.slug ?? slugify(collection.name ?? category ?? ""),
      name: collection.name ?? collection.label ?? category ?? "Collection",
    };
  }
  if (collection && typeof collection === "string" && collection.trim()) {
    return { slug: slugify(collection), name: collection };
  }
  if (category) {
    return { slug: slugify(category), name: category };
  }
  return { slug: "new-arrivals", name: "Collection" };
}

function toProduct(p: any): Product {
  return {
    id: p._id,
    name: p.name,
    subtitle: p.subtitle,
    price: p.priceFormatted ?? `₹${p.price.toLocaleString("en-IN")}`,
    originalPrice: p.originalPriceFormatted ?? undefined,
    tag: p.tag,
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
// STATIC PARAMS
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
  let collectionName: string;
  let rawProductId: string;
  let rawSlug: string;

  try {
    const res = await fetchProductBySlug(slug);
    if (!res.success || !res.data) return notFound();

    product = toProduct(res.data);

    // collection is a populated object: { slug, name, _id, ... }
    const col = extractCollection(res.data.collection, res.data.category);
    collectionSlug = col.slug; // "chains-for-men"
    collectionName = col.name; // "Chains for Men"

    rawProductId = res.data._id;
    rawSlug = res.data.slug;
  } catch {
    return notFound();
  }

  return (
    <main>
      <ProductDetailWrapper
        product={product}
        collectionSlug={collectionSlug}
        collectionName={collectionName}
      />
      <ProductTabs product={product} />
      <ProductReviews
        productId={rawProductId}
        productName={product.name}
        productSlug={rawSlug}
      />
      <RelatedProducts
        collectionSlug={collectionSlug}
        currentProductId={rawSlug}
        currentProductDbId={rawProductId}
      />
    </main>
  );
}
