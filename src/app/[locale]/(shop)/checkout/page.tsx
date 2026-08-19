"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useCartStore, cartTotalCents } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { localizeProduct } from "@/lib/product-i18n";
import { useDictionary, useLocale } from "@/lib/i18n/locale-context";
import { ProductImage } from "@/components/product-image";
import { Link } from "@/components/i18n-link";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = cartTotalCents(items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dict = useDictionary();
  const locale = useLocale();

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
          locale,
        }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError(dict.checkout.errorGeneric);
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">{dict.checkout.emptyTitle}</h1>
        <Link href="/products" className="mt-4 inline-block text-sm text-accent hover:underline">
          {dict.checkout.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">{dict.checkout.title}</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-sm font-medium">{dict.checkout.addressTitle}</h2>
            <p className="mt-2 text-sm text-foreground/60">{dict.checkout.addressText}</p>
          </div>
        </div>
        <div>
          <div className="rounded-2xl border border-border p-6">
            <h2 className="text-sm font-medium">{dict.checkout.summaryTitle}</h2>
            <ul className="mt-4 space-y-3">
              {items.map(({ product: rawProduct, quantity }) => {
                const product = localizeProduct(rawProduct, locale);
                return (
                  <li key={product.id} className="flex items-center gap-3">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 shrink-0"
                      sizes="48px"
                    />
                    <div className="flex-1 text-sm">
                      <p className="leading-tight">{product.name}</p>
                      <p className="text-foreground/50">
                        {dict.checkout.quantity}: {quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(product.priceCents * quantity, product.currency, locale)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm font-semibold">
              <span>{dict.checkout.total}</span>
              <span>{formatPrice(total, "EUR", locale)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {dict.checkout.submit}
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
