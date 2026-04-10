// app/sitemap.ts
import { MetadataRoute } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rehnoorjewels.com";

// 👉 Maintain all static app routes here
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

  try {
    const res = await fetch(`${API_BASE}/api/blogs`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      blogs = data?.data || [];
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // ✅ Static + App Routes
  const staticRoutes: MetadataRoute.Sitemap = APP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // ✅ Dynamic Blog Routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
