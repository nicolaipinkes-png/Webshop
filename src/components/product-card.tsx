"use client";

import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { ProductImage } from "./product-image";

const badgeLabel: Record<string, string> = {
  new: "Neu",
  bestseller: "Bestseller",
  sale: "Sale",
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative">
          <ProductImage src={product.image} alt={product.name} className="aspect-square w-full" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {badgeLabel[product.badge]}
            </span>
          )}
        </div>
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-foreground/60">
          <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold">{formatPrice(product.priceCents, product.currency)}</span>
          <button
            onClick={() => addItem(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
            aria-label={`${product.name} in den Warenkorb legen`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
