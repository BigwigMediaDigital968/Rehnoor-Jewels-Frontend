import CollectionHero from "./component/CollectionHero";
import CollectionProductGrid from "./component/CollectionProductGrid";
import CollectionTestimonials from "./component/Collectiontestimonials";
import type { CollectionMeta } from "./component/CollectionHero";

// ── Static collection map — swap for API fetch by slug later ─────
const COLLECTION_MAP: Record<string, CollectionMeta> = {
  chains: {
    id: "chains",
    label: "Chains",
    tagline: "Bold, layered, iconic",
    description:
      "Every Rehnoor chain is hand-forged in 22kt BIS hallmarked gold by master artisans in Jaipur. Wear one. Stack them. Either way, be noticed.",
    heroImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=85",
    accentColor: "rgba(0,36,16,0.88)",
    productCount: 24,
    purity: "22kt",
    tag: "Bestseller",
    breadcrumb: ["Home", "Collections", "Chains"],
  },
  kadas: {
    id: "kadas",
    label: "Kadas",
    tagline: "Power on your wrist",
    description:
      "Solid, heavy, commanding. Each Rehnoor Kada is cast in 22kt gold and polished by hand. A statement that needs no words.",
    heroImage:
      "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=1600&q=85",
    accentColor: "rgba(26,10,0,0.88)",
    productCount: 18,
    purity: "22kt",
    tag: "New",
    breadcrumb: ["Home", "Collections", "Kadas"],
  },
  rings: {
    id: "rings",
    label: "Rings",
    tagline: "Wear your statement",
    description:
      "From bold signet rings to minimal bands — each piece in 22kt gold with free custom engraving on every order.",
    heroImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=85",
    accentColor: "rgba(45,26,0,0.88)",
    productCount: 32,
    purity: "22kt",
    tag: "Popular",
    breadcrumb: ["Home", "Collections", "Rings"],
  },
  bracelets: {
    id: "bracelets",
    label: "Bracelets",
    tagline: "Layered perfection",
    description:
      "Link, cord, bangle — our bracelet collection spans every aesthetic. All in 22kt gold. All BIS hallmarked. All made to last.",
    heroImage:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=85",
    accentColor: "rgba(10,26,46,0.88)",
    productCount: 15,
    purity: "22kt",
    tag: "Limited",
    breadcrumb: ["Home", "Collections", "Bracelets"],
  },
  pendants: {
    id: "pendants",
    label: "Pendants",
    tagline: "Close to the heart",
    description:
      "Symbols of devotion, identity, and style. Each pendant is hand-carved in 22kt gold — wear what matters.",
    heroImage:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85",
    accentColor: "rgba(26,10,46,0.88)",
    productCount: 28,
    purity: "22kt",
    tag: "New",
    breadcrumb: ["Home", "Collections", "Pendants"],
  },
};

// ── Static params for build-time pre-rendering ────────────────────
export function generateStaticParams() {
  return Object.keys(COLLECTION_MAP).map((slug) => ({ slug }));
}

// ── SEO metadata per collection ───────────────────────────────────
export function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = COLLECTION_MAP[params.slug];
  if (!meta) return { title: "Collection | Rehnoor Jewels" };
  return {
    title: `${meta.label} Collection | Rehnoor Jewels`,
    description: meta.description,
  };
}

// ── Page component — Next.js injects params automatically ─────────
// This is a Server Component. params arrives from the URL segment.
// No need to pass params as a prop — Next.js does it automatically
// when this file is the route's page.tsx.
export default function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fall back to "chains" if slug doesn't match any collection
  const meta = COLLECTION_MAP[params.slug] ?? COLLECTION_MAP.chains;

  return (
    <>
      <main>
        <CollectionHero meta={meta} />
        <CollectionProductGrid />
        <CollectionTestimonials />
      </main>
    </>
  );
}
