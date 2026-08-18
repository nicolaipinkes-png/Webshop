"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Suche</h1>

      <div className="relative mt-6 max-w-xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-foreground/40" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nach Produkten, Kategorien suchen…"
          className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-accent"
        />
      </div>

      <p className="mt-4 text-sm text-foreground/60">
        {results.length} {results.length === 1 ? "Ergebnis" : "Ergebnisse"}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
