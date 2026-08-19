import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/search`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/agb`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/widerrufsrecht`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/kontakt`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/versand`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c !== "Alle")
    .map((category) => ({
      url: `${SITE_URL}/products?category=${encodeURIComponent(category)}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
