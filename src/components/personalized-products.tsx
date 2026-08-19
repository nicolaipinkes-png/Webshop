"use client";

import { useStyleProfileStore } from "@/lib/style-profile-store";
import { personalizedProducts } from "@/lib/personalize";
import { useMounted } from "@/lib/use-mounted";
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function PersonalizedProducts({ products }: { products: Product[] }) {
  const mounted = useMounted();
  const profile = useStyleProfileStore((s) => s.profile);

  if (!mounted || !profile) return null;

  const recommended = personalizedProducts(products, profile);
  if (recommended.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Für dich empfohlen</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {recommended.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
