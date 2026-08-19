import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import { products as productsTable } from "./db/schema";
import { Product } from "./types";
import { SortKey } from "./sort";

export { sortLabels, isSortKey } from "./sort";
export type { SortKey } from "./sort";

const orderByForSort: Record<SortKey, ReturnType<typeof asc>> = {
  empfehlung: asc(productsTable.createdAt),
  "preis-auf": asc(productsTable.priceCents),
  "preis-ab": desc(productsTable.priceCents),
  bewertung: desc(productsTable.rating),
};

export async function getAllProducts(): Promise<Product[]> {
  return db.select().from(productsTable).orderBy(asc(productsTable.createdAt));
}

export async function getProductsByCategory(
  category: string,
  sort: SortKey = "empfehlung"
): Promise<Product[]> {
  const orderBy = orderByForSort[sort];

  if (category === "Alle") {
    return db.select().from(productsTable).orderBy(orderBy);
  }
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category))
    .orderBy(orderBy);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, slug));
  return product;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, id));
  return product;
}
