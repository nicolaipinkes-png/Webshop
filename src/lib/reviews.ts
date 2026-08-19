import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { reviews as reviewsTable, products as productsTable } from "./db/schema";

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  return db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.productId, productId))
    .orderBy(desc(reviewsTable.createdAt));
}

export async function addReview({
  productId,
  authorName,
  rating,
  comment,
}: {
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
}) {
  await db.insert(reviewsTable).values({
    id: crypto.randomUUID(),
    productId,
    authorName,
    rating,
    comment,
  });

  const all = await db
    .select({ rating: reviewsTable.rating })
    .from(reviewsTable)
    .where(eq(reviewsTable.productId, productId));

  const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;

  await db
    .update(productsTable)
    .set({ rating: Math.round(avg * 10) / 10, reviewCount: all.length })
    .where(eq(productsTable.id, productId));
}
