import type { Metadata } from "next";
import { getProductsByCategory, isSortKey } from "@/lib/products";
import { categories } from "@/lib/categories";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/components/i18n-link";
import { cn } from "@/lib/utils";
import { SortSelect } from "./sort-select";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const dict = await getDictionary(locale);
  const { category } = await searchParams;
  const active =
    category && categories.includes(category as (typeof categories)[number])
      ? (category as (typeof categories)[number])
      : undefined;

  return {
    title: active ? `${dict.categories[active]} — NOVA` : `${dict.footer.allProducts} — NOVA`,
    description: active
      ? `${dict.home.newArrivals}: ${dict.categories[active]} — NOVA.`
      : "Sofas, Möbel, Beleuchtung, Textilien und Deko bei NOVA.",
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const dict = await getDictionary(locale);
  const { category, sort } = await searchParams;
  const active = category && categories.includes(category as (typeof categories)[number]) ? category : "Alle";
  const activeSort = isSortKey(sort) ? sort : "empfehlung";
  const filtered = await getProductsByCategory(active, activeSort);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.footer.allProducts}</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
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
              {dict.categories[c]}
            </Link>
          ))}
        </div>
        <SortSelect active={activeSort} />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-foreground/60">
          {dict.search.results(0)}
        </p>
      )}
    </div>
  );
}
