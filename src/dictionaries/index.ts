import { de } from "./de";
import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";
import type { Locale } from "@/lib/i18n/config";

export const dictionaries: Record<Locale, typeof de> = { de, en, fr, es };
