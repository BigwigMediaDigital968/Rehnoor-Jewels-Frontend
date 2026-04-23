import { notFound } from "next/navigation";
import CollectionHero from "./component/CollectionHero";
import CollectionProductGrid from "./component/CollectionProductGrid";
import CollectionTestimonials from "./component/Collectiontestimonials";
import type { CollectionMeta } from "./component/CollectionHero";
import {
  fetchCollectionBySlug,
  fetchPublicCollections,
} from "@/app/lib/api/collections";
import { ApiProduct } from "@/app/lib/api/productLive";
import { Product } from "@/app/types/Product.types";
import CollectionIntroStrip from "./component/Collectionintrostrip";
import ChainForMenPage from "./custom/ChainForMen";
import BraceletForMen from "./custom/BraceletForMen";
import KadaForMen from "./custom/KadaForMen";

const EXTRA_SECTIONS: Record<string, React.FC<{ meta: CollectionMeta }>> = {
  "chains-for-men": ChainForMenPage,
  "bracelet-for-men": BraceletForMen,
  "kada-for-men": KadaForMen,
};

function toMeta(
  col: Awaited<ReturnType<typeof fetchCollectionBySlug>>["data"],
): CollectionMeta {
  if (!col) throw new Error("No collection data");
  return {
    id: col.slug,
    label: col.label || col.name,
    tagline: col.tagline,
    description: col.description,
    heroImage: col.heroImage,
    accentColor: col.accentColor || "rgba(0,36,16,0.88)",
    productCount: col.productCount,
    purity: "22kt",
    tag: col.tag || undefined,
    breadcrumb: ["Home", "Collections", col.label || col.name],
    products: col.products,
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetchPublicCollections({ limit: 100 });
    if (res.success) return res.data.map((c) => ({ slug: c.slug }));
  } catch {}
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const res = await fetchCollectionBySlug(slug);
    if (res.success && res.data) {
      return {
        title: `${res.data.seoTitle || res.data.label} | Rehnoor Jewels`,
        description: res.data.seoDescription || res.data.description,
      };
    }
  } catch {}

  return { title: "Collection | Rehnoor Jewels" };
}

function normalizeProducts(raw: ApiProduct[]): Product[] {
  return raw.map((p) => ({
    id: p._id,
    name: p.name,
    subtitle: p.subtitle?.trim() ?? "",
    price: p.priceFormatted ?? `₹${Number(p.price).toLocaleString("en-IN")}`,
    originalPrice:
      p.originalPriceFormatted ??
      (p.originalPrice != null
        ? `₹${Number(p.originalPrice).toLocaleString("en-IN")}`
        : undefined),
    tag: p.tag || undefined,
    // rating: p.rating,
    // reviewCount: p.reviewCount,
    category: p.category,
    href: `/products/${p.slug}`,
    images: p.images?.length
      ? p.images
      : [
          {
            src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
            alt: p.name,
          },
        ],
    sizes: p.sizes ?? [],
  }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let meta: CollectionMeta;

  try {
    const res = await fetchCollectionBySlug(slug);
    if (!res.success || !res.data) return notFound();
    meta = toMeta(res.data);
  } catch {
    return notFound();
  }

  // col.products arrives as populated objects at runtime — cast away the
  // incorrect string[] type that the generated type gives us
  const products = normalizeProducts(
    (meta.products as unknown as ApiProduct[]).filter(
      (p): p is ApiProduct => !!p && typeof p === "object" && "_id" in p,
    ),
  );

  const ExtraSection = EXTRA_SECTIONS[slug];

  return (
    <main>
      <CollectionHero meta={meta} />

      <CollectionProductGrid
        collectionSlug={slug}
        products={products}
        loading={false}
        error={null}
      />
      <CollectionIntroStrip meta={meta} />

      {ExtraSection && <ExtraSection meta={meta} />}

      {/* <CollectionTestimonials /> */}
    </main>
  );
}
