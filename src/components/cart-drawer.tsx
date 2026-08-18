"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem } = useCartStore();
  const total = cartTotalCents(items);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">Warenkorb ({items.length})</h2>
          <button onClick={close} aria-label="Warenkorb schließen" className="rounded-full p-1.5 hover:bg-surface-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-foreground/60">
              Dein Warenkorb ist leer.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 shrink-0"
                    sizes="80px"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-tight">{product.name}</span>
                      <button onClick={() => removeItem(product.id)} aria-label="Entfernen" className="text-foreground/40 hover:text-foreground">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="mt-1 text-sm text-foreground/60">
                      {formatPrice(product.priceCents, product.currency)}
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:border-accent"
                        aria-label="Menge verringern"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border hover:border-accent"
                        aria-label="Menge erhöhen"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-5 py-4">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-foreground/60">Zwischensumme</span>
            <span className="font-semibold">{formatPrice(total)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={close}
            className={cn(
              "flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground transition-opacity",
              items.length === 0 && "pointer-events-none opacity-40"
            )}
          >
            Zur Kasse
          </Link>
        </div>
      </aside>
    </>
  );
}
