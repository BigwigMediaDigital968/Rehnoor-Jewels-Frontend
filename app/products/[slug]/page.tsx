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
import RecentlyViewedTracker from "./component/RecentlyViewedTracker";

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

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
    collection: p.collection?.name ?? p.collection ?? null,

    description: p.longDescription || "",
    shortDescription: p.shortDescription || "",

    href: `/products/${p.slug}`,

    images: p.images || [],
    variants: p.variants || [],
    options: p.options || [],

    sku: p.sku,
    stock: p.stock,

    weightGrams: p.weightGrams != null ? Number(p.weightGrams) : undefined,

    purity: p.purity,
    bisNumber: p.bisNumber,

    offerBannerImage: p.offerBannerImage,
    sizeChartImage: p.sizeChartImage,

    sizes: p.sizes || [],

    arrivedAt: p.arrivedAt,

    ourPromise: p.ourPromise,

    specifications: p.specifications || [],

    // SEO Fallbacks
    seoTitle: p.seoTitle || p.name || "",
    seoDescription: p.seoDescription || p.shortDescription || "",
    seoKeywords: p.seoKeywords || [],
  };
}

export async function generateStaticParams() {
  const slugs = await fetchAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO METADATA & OPEN GRAPH / TWITTER CARDS
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rehnoorjewels.com";

  try {
    const res = await fetchProductBySlug(slug);
    if (res.success && res.data) {
      const p = res.data;
      const title = p.seoTitle || `${p.name} | Rehnoor Jewels`;
      const description = p.seoDescription || p.shortDescription || "";
      const shareImage = p.images?.[0]?.src
        ? [{ url: p.images[0].src, alt: p.name }]
        : [];

      // Safe fallback formatting for the raw numeric value
      const priceAmount = String(p.price || "");
      const currencyCode = p.currency || "INR";

      return {
        title,
        description,
        keywords:
          p.seoKeywords && p.seoKeywords.length > 0
            ? p.seoKeywords
            : [p.name, p.category, "Jewelry"],
        alternates: {
          canonical: `${siteUrl}/products/${slug}`,
        },
        openGraph: {
          title,
          description,
          url: `${siteUrl}/products/${slug}`,
          siteName: "Rehnoor Jewels",
          type: "website", // Resetting to a valid standard built-in type
          images: shareImage,
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: p.images?.[0]?.src ? [p.images[0].src] : [],
        },
        // Inject custom or extended spec meta tags safely here:
        other: {
          "og:type": "product",
          "product:price:amount": priceAmount,
          "product:price:currency": currencyCode,
          "product:availability": p.stock && p.stock > 0 ? "instock" : "oos",
          "product:condition": "new",
        },
      };
    }
  } catch (err) {
    console.error("Metadata generation error:", err);
  }

  return { title: "Product | Rehnoor Jewels" };
}

// ─────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://rehnoorjewels.com";

  let product: Product;
  let collectionSlug: string;
  let collectionName: string;
  let rawProductId: string;
  let rawSlug: string;
  let rawData: any;

  try {
    const res = await fetchProductBySlug(slug);
    if (!res.success || !res.data) return notFound();

    rawData = res.data;
    product = toProduct(rawData);

    const col = extractCollection(rawData.collection, rawData.category);
    collectionSlug = col.slug;
    collectionName = col.name;

    rawProductId = rawData._id;
    rawSlug = rawData.slug;
  } catch {
    return notFound();
  }

  // ───────────────────────────────────────────────────────────────
  // JSON-LD STRUCTURED SCHEMAS
  // ───────────────────────────────────────────────────────────────

  // 1. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: collectionName,
        item: `${siteUrl}/collections/${collectionSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${rawSlug}`,
      },
    ],
  };

  // 2. Product Details & Offer Schema
  const productPriceNumber = Number(rawData.price) || 0;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.src),
    description: product.description || product.shortDescription,
    sku: product.sku || rawProductId,
    mpn: product.sku || rawProductId,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Rehnoor Jewels",
    },
    // Optional metrics mapping conditionally if reviews/ratings live inside the item base
    ...(product.rating && product.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${rawSlug}`,
      priceCurrency: rawData.currency || "INR",
      price: productPriceNumber,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.stock && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Rehnoor Jewels",
      },
    },
  };
  console.log("product",product );

  return (
    <main>
      {/* Structural Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <RecentlyViewedTracker
        product={{
          id: rawProductId,
          slug: rawSlug,
          name: product.name,
          image: product.images?.[0]?.src || "",
          price: product.price,
          viewedAt: Date.now(),
        }}
      />

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
