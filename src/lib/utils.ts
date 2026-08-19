import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const intlLocales: Record<string, string> = {
  de: "de-DE",
  en: "en-US",
  fr: "fr-FR",
  es: "es-ES",
};

export function formatPrice(cents: number, currency = "EUR", locale = "de") {
  return new Intl.NumberFormat(intlLocales[locale] ?? "de-DE", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
