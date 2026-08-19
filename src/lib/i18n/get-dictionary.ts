import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "@/dictionaries/de";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("@/dictionaries/de").then((m) => m.de),
  en: () => import("@/dictionaries/en").then((m) => m.en),
  fr: () => import("@/dictionaries/fr").then((m) => m.fr),
  es: () => import("@/dictionaries/es").then((m) => m.es),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
