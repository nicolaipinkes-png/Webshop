import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { locales } from "@/lib/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const staticPaths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/products", changeFrequency: "daily" as const, priority: 0.9 },
    { path: "/search", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/impressum", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/datenschutz", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/agb", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/widerrufsrecht", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/kontakt", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/versand", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency,
      priority,
    }))
  );

  const categoryRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    categories
      .filter((c) => c !== "Alle")
      .map((category) => ({
        url: `${SITE_URL}/${locale}/products?category=${encodeURIComponent(category)}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  const productRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    products.map((p) => ({
      url: `${SITE_URL}/${locale}/products/${p.slug}`,
      lastModified: p.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
