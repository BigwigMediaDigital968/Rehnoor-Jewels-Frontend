// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import BlogDetailLayout from "./BlogDetails";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Generate metadata from blog API for SEO ──
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return { title: "Blog | Rehnoor Jewels" };

    const { data } = await res.json();

    return {
      title: data.metaTitle || data.title || "Blog | Rehnoor Jewels",
      description: data.metaDescription || data.excerpt || "",
      keywords: data.metaKeywords?.join(", ") || "",
      robots: {
        index: !data.noIndex,
        follow: !data.noFollow,
      },
      openGraph: {
        title: data.ogTitle || data.metaTitle || data.title,
        description: data.ogDescription || data.metaDescription || data.excerpt,
        images:
          data.ogImage || data.coverImage
            ? [{ url: data.ogImage || data.coverImage }]
            : [],
        type: "article",
        publishedTime: data.publishedAt ?? undefined,
        authors: [data.author?.name ?? "Rehnoor Team"],
      },
      alternates: data.canonicalUrl
        ? { canonical: data.canonicalUrl }
        : undefined,
    };
  } catch {
    return { title: "Blog | Rehnoor Jewels" };
  }
}

// ── Page Component with JSON-LD Schemas ──
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let data: any = null;

  try {
    const res = await fetch(`${API_BASE}/api/blogs/${slug}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      data = json.data;
    }
  } catch (err) {
    console.error(err);
  }

  // ── Article Schema ──
  const articleSchema = data && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.metaDescription || data.excerpt,
    image: data.coverImage || data.ogImage,
    author: {
      "@type": "Person",
      name: data.author?.name || "Rehnoor Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Rehnoor Jewels",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png", // update with real logo URL
      },
    },
    datePublished: data.publishedAt,
    dateModified: data.updatedAt || data.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.canonicalUrl || `${API_BASE}/blogs/${slug}`,
    },
  };

  // ── Breadcrumb Schema ──
  const breadcrumbSchema = data && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${API_BASE}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${API_BASE}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: data.canonicalUrl || `${API_BASE}/blogs/${slug}`,
      },
    ],
  };

  // ── FAQ Schema (only if FAQs exist) ──
  const faqSchema =
    data?.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* JSON-LD Schemas */}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
      )}

      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      {/* Page UI */}
      <BlogDetailLayout slug={slug} />
    </>
  );
}
