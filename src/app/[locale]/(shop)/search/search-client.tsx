"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Product } from "@/lib/types";
import { localizeProduct } from "@/lib/product-i18n";
import { useDictionary, useLocale } from "@/lib/i18n/locale-context";
import { ProductCard } from "@/components/product-card";

export function SearchClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const dict = useDictionary();
  const locale = useLocale();

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    const localized = products.map((p) => ({ raw: p, localized: localizeProduct(p, locale) }));
    if (!q) return localized.map((p) => p.raw);
    return localized
      .filter(
        ({ localized: p }) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .map((p) => p.raw);
  }, [query, products, locale]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.search.title}</h1>

      <div className="relative mt-6 max-w-xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-foreground/40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.search.placeholder}
          className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      <p className="mt-4 text-sm text-foreground/60">{dict.search.results(results.length)}</p>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
