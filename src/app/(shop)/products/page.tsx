import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import { categories } from "@/lib/categories";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category && categories.includes(category as (typeof categories)[number]) ? category : "Alle";
  const filtered = await getProductsByCategory(active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Alle Produkte</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c}
            href={c === "Alle" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              active === c
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-surface-muted"
            )}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-foreground/60">
          Keine Produkte in dieser Kategorie gefunden.
        </p>
      )}
    </div>
  );
}
