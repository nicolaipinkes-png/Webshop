import { getComplementaryProducts } from "@/lib/recommendations";
import { Product } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ProductCard } from "@/components/product-card";

export async function ComplementaryProducts({ product, locale }: { product: Product; locale: Locale }) {
  const [related, dict] = await Promise.all([
    getComplementaryProducts(product),
    getDictionary(locale),
  ]);
  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{dict.product.complementary}</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
