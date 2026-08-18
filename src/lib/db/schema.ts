import { integer, pgTable, real, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  priceCents: integer("price_cents").notNull(),
  currency: text("currency").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  badge: text("badge"),
  rating: real("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
});
