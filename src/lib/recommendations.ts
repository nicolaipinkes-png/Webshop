import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import { unstable_cache } from "next/cache";
import { getAllProducts } from "./products";
import { Product } from "./types";
import { formatPrice } from "./utils";

const recommendationSchema = z.object({
  slugs: z.array(z.string()).min(1).max(4),
});

async function computeComplementarySlugs(
  productId: string,
  productName: string,
  productCategory: string,
  productDescription: string
): Promise<string[]> {
  const catalog = await getAllProducts();
  const others = catalog.filter((p) => p.id !== productId);
  if (others.length === 0) return [];

  const catalogListing = others
    .map(
      (p) =>
        `- slug: "${p.slug}" | ${p.name} | Kategorie: ${p.category} | ${formatPrice(p.priceCents, p.currency)} | ${p.description}`
    )
    .join("\n");

  try {
    const { object } = await generateObject({
      model: anthropic("claude-sonnet-5"),
      schema: recommendationSchema,
      abortSignal: AbortSignal.timeout(8000),
      prompt: `Ein Kunde schaut sich gerade dieses Produkt an:
Name: ${productName}
Kategorie: ${productCategory}
Beschreibung: ${productDescription}

Hier ist der restliche Produktkatalog:
${catalogListing}

Wähle bis zu 4 Produkte aus dem Katalog, die wirklich gut dazu passen und den Look sinnvoll ergänzen würden (z.B. zu einem Couchtisch passende Vasen oder Kerzen, zu einem Sofa passende Kissen oder eine Leuchte) — keine reinen Duplikate aus derselben Kategorie. Gib ausschließlich slugs aus der Liste oben zurück.`,
    });
    return object.slugs;
  } catch {
    return [];
  }
}

const getCachedComplementarySlugs = unstable_cache(
  computeComplementarySlugs,
  ["complementary-products"],
  { revalidate: 3600 }
);

export async function getComplementaryProducts(product: Product): Promise<Product[]> {
  const slugs = await getCachedComplementarySlugs(
    product.id,
    product.name,
    product.category,
    product.description
  );

  const catalog = await getAllProducts();
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));
  const recommended = slugs
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Product => !!p && p.id !== product.id);

  if (recommended.length > 0) return recommended.slice(0, 4);

  return catalog
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}
