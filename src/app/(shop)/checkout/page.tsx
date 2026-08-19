"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = cartTotalCents(items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout konnte nicht gestartet werden.");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Da ist etwas schiefgelaufen. Bitte versuch es erneut.");
      setLoading(false);
    }
  }

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
            <h2 className="text-sm font-medium">Lieferadresse & Zahlung</h2>
            <p className="mt-2 text-sm text-foreground/60">
              Adresse, Zahlungsmethode und Rechnung erfasst du im nächsten Schritt sicher bei Stripe.
            </p>
          </div>
        </div>
        <div>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-sm font-medium">Bestellübersicht</h2>
            <ul className="mt-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-3">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 shrink-0"
                    sizes="48px"
                  />
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
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Jetzt kostenpflichtig bestellen
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
