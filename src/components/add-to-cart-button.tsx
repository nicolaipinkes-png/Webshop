"use client";

import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-8 flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
    >
      <ShoppingBag className="h-4 w-4" />
      In den Warenkorb
    </button>
  );
}
