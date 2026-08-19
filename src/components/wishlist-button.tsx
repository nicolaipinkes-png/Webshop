"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/wishlist-store";

export function WishlistButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const saved = useWishlistStore((s) => s.isSaved(product.id));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-label={saved ? `${product.name} von der Merkliste entfernen` : `${product.name} merken`}
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
