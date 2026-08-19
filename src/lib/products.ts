import { asc, eq } from "drizzle-orm";
import { db } from "./db";
import { products as productsTable } from "./db/schema";
import { Product } from "./types";

export async function getAllProducts(): Promise<Product[]> {
  return db.select().from(productsTable).orderBy(asc(productsTable.createdAt));
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (category === "Alle") return getAllProducts();
  return db
    .select()
    .from(productsTable)
    .where(eq(productsTable.category, category))
    .orderBy(asc(productsTable.createdAt));
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
