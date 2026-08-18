export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  category: string;
  image: string;
  badge: string | null;
  rating: number;
  reviewCount: number;
};
