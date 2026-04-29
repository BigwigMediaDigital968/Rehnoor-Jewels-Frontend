import { MetadataRoute } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rehnoorjewels.com";

// Static routes
const APP_ROUTES = [
  "",
  "/about",
  "/contact",
  "/blogs",
  "/collections",
  "/products",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs: any[] = [];
  let products: any[] = [];
  let collections: any[] = [];

  try {
    const [blogRes, productRes, collectionRes] = await Promise.all([
      fetch(`${API_BASE}/api/blogs`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_BASE}/api/products`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_BASE}/api/collections`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (blogRes.ok) {
      const data = await blogRes.json();
      blogs = data?.data || [];
    }

    if (productRes.ok) {
      const data = await productRes.json();
      products = data?.data || [];
    }

    if (collectionRes.ok) {
      const data = await collectionRes.json();
      collections = data?.data || [];
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = APP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Product Routes
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Collection Routes
  const collectionRoutes: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${SITE_URL}/collections/${collection.slug}`,
      lastModified: collection.updatedAt
        ? new Date(collection.updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

  return [
    ...staticRoutes,
    ...collectionRoutes,
    // ...productRoutes,
    ...blogRoutes,
  ];
}
