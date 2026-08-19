"use client";

import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { localizeProduct } from "@/lib/product-i18n";
import { useDictionary, useLocale } from "@/lib/i18n/locale-context";
import { ProductImage } from "./product-image";
import { WishlistButton } from "./wishlist-button";
import { Link } from "./i18n-link";

export function ProductCard({ product: rawProduct }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const dict = useDictionary();
  const locale = useLocale();
  const product = localizeProduct(rawProduct, locale);

  const badgeLabel: Record<string, string> = {
    new: dict.product.badgeNew,
    bestseller: dict.product.badgeBestseller,
    sale: dict.product.badgeSale,
  };

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block">
          <ProductImage src={product.image} alt={product.name} className="aspect-square w-full" />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
              {badgeLabel[product.badge]}
            </span>
          )}
        </Link>
        <WishlistButton
          product={rawProduct}
          className="absolute right-3 top-3 h-8 w-8 border border-white/10 bg-black/50 backdrop-blur hover:border-accent"
        />
      </div>
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
          <span className="font-semibold">{formatPrice(product.priceCents, product.currency, locale)}</span>
          <button
            onClick={() => addItem(rawProduct)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
            aria-label={dict.product.addToCartLabel(product.name)}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
