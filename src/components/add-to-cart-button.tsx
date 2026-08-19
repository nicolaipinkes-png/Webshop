"use client";

import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/lib/i18n/locale-context";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const dict = useDictionary();

  return (
    <button
      onClick={() => addItem(product)}
      className={cn(
        "flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90",
        className
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {dict.product.addToCart}
    </button>
  );
}
