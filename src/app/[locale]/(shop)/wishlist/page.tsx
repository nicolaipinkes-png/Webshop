"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useDictionary } from "@/lib/i18n/locale-context";
import { ProductCard } from "@/components/product-card";
import { Link } from "@/components/i18n-link";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const dict = useDictionary();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.wishlist.title}</h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Heart className="h-8 w-8 text-foreground-muted" />
          <p className="mt-4 text-sm text-foreground/60">{dict.wishlist.empty}</p>
          <Link href="/products" className="mt-4 text-sm text-accent hover:underline">
            {dict.wishlist.discover}
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
