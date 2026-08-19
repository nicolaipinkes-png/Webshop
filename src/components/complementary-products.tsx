import { getComplementaryProducts } from "@/lib/recommendations";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

export async function ComplementaryProducts({ product }: { product: Product }) {
  const related = await getComplementaryProducts(product);
  if (related.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">Passt dazu</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
