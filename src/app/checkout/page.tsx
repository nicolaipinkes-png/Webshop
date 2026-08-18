"use client";

import Link from "next/link";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = cartTotalCents(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dein Warenkorb ist leer</h1>
        <Link href="/products" className="mt-4 inline-block text-sm text-accent hover:underline">
          Weiter einkaufen
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Kasse</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-sm font-medium">Lieferadresse</h2>
            <p className="mt-2 text-sm text-foreground/60">
              Zahlungsanbieter (Stripe/PayPal) und Adressformular werden im nächsten Schritt angebunden.
            </p>
          </div>
        </div>
        <div>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-sm font-medium">Bestellübersicht</h2>
            <ul className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <ProductImage gradient={product.image} className="h-12 w-12 shrink-0" />
                  <div className="flex-1 text-sm">
                    <p className="leading-tight">{product.name}</p>
                    <p className="text-foreground/50">Menge: {quantity}</p>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(product.priceCents * quantity, product.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold">
              <span>Gesamt</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
