import { Product } from "./types";
import { StyleProfile } from "./style-profile-store";

const styleCategory: Record<StyleProfile["style"], string> = {
  warm: "Textilien",
  modern: "Beleuchtung",
  natural: "Deko",
};

const budgetRange: Record<StyleProfile["budget"], [number, number]> = {
  low: [0, 10000],
  mid: [10000, 40000],
  high: [40000, Infinity],
};

export function personalizedProducts(
  products: Product[],
  profile: StyleProfile,
  limit = 4
): Product[] {
  const [min, max] = budgetRange[profile.budget];
  const secondaryCategory = styleCategory[profile.style];

  return products
    .map((product) => {
      let score = 0;
      if (product.category === profile.category) score += 3;
      if (product.category === secondaryCategory) score += 1;
      if (product.priceCents >= min && product.priceCents <= max) score += 2;
      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
}
