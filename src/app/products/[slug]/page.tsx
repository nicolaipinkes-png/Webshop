import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { ProductCard } from "@/components/product-card";
import { AddToCartButton } from "@/components/add-to-cart-button";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImage gradient={product.image} className="aspect-square w-full" />
        <div>
          <p className="text-sm text-foreground/60">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            <span>{product.rating}</span>
            <span>· {product.reviewCount} Bewertungen</span>
          </div>
          <p className="mt-6 text-2xl font-semibold">{formatPrice(product.priceCents, product.currency)}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">{product.description}</p>

          <AddToCartButton product={product} />

          <dl className="mt-10 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-foreground/60">Versand</dt>
              <dd>1–3 Werktage</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-foreground/60">Rückgabe</dt>
              <dd>30 Tage kostenlos</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-xl font-semibold tracking-tight">Das könnte dir auch gefallen</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
