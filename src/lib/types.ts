export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  category: string;
  image: string;
  images: string[] | null;
  badge: string | null;
  rating: number;
  reviewCount: number;
  createdAt: Date;
};
