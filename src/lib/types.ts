export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  category: string;
  image: string;
  badge?: "new" | "bestseller" | "sale";
  rating: number;
  reviewCount: number;
};
