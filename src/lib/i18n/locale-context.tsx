"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./config";
import { dictionaries } from "@/dictionaries";
import type { Dictionary } from "@/dictionaries/de";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (ctx === null) throw new Error("useLocale/useDictionary must be used within LocaleProvider");
  return ctx;
}

export function useDictionary(): Dictionary {
  return dictionaries[useLocale()];
}
