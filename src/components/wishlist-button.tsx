"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/wishlist-store";
import { localizeProduct } from "@/lib/product-i18n";
import { useDictionary, useLocale } from "@/lib/i18n/locale-context";

export function WishlistButton({
  product: rawProduct,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const saved = useWishlistStore((s) => s.isSaved(rawProduct.id));
  const toggle = useWishlistStore((s) => s.toggle);
  const dict = useDictionary();
  const locale = useLocale();
  const name = localizeProduct(rawProduct, locale).name;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(rawProduct);
      }}
      aria-label={saved ? dict.product.wishlistRemoveLabel(name) : dict.product.wishlistAddLabel(name)}
      aria-pressed={saved}
      className={cn(
        "flex items-center justify-center rounded-full transition-colors",
        className
      )}
    >
      <Heart className={cn("h-4 w-4 transition-colors", saved ? "fill-accent text-accent" : "text-foreground")} />
    </button>
  );
}
