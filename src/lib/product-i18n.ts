import type { Locale } from "./i18n/config";
import type { Product } from "./types";

export function localizeProduct<T extends Pick<Product, "name" | "description" | "translations">>(
  product: T,
  locale: Locale
): T {
  if (locale === "de") return product;
  const t = product.translations?.[locale];
  if (!t) return product;
  return { ...product, name: t.name, description: t.description };
}
