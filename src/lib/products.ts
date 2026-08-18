import { eq, ilike, or } from "drizzle-orm";
import { db } from "./db";
import { products as productsTable } from "./db/schema";
import { Product } from "./types";

export async function getAllProducts(): Promise<Product[]> {
  return db.select().from(productsTable);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (category === "Alle") return getAllProducts();
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category));
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

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim();
  if (!q) return getAllProducts();
  const pattern = `%${q}%`;
  return db
    .select()
    .from(productsTable)
    .where(
      or(
        ilike(productsTable.name, pattern),
        ilike(productsTable.description, pattern),
        ilike(productsTable.category, pattern)
      )
    );
}
