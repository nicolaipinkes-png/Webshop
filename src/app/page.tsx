import Link from "next/link";
import { Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const perks = [
  { icon: Truck, title: "Kostenloser Versand", text: "Ab 50€ Bestellwert" },
  { icon: RotateCcw, title: "30 Tage Rückgabe", text: "Unkompliziert & kostenlos" },
  { icon: ShieldCheck, title: "Sichere Zahlung", text: "SSL-verschlüsselt" },
];

export default async function Home() {
  const products = await getAllProducts();
  const featured = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.badge === "bestseller");

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Jetzt mit KI-Beratung
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Shopping, das
              <br />
              dich versteht.
            </h1>
            <p className="mt-5 max-w-md text-base text-foreground/60">
              Kuratierte Produkte für Technik, Wohnen, Mode und Outdoor — mit
              einem KI-Assistenten, der dir hilft, genau das Richtige zu finden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Jetzt entdecken
              </Link>
              <Link
                href="/search"
                className="flex h-12 items-center justify-center rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-surface-muted"
              >
                Produkte durchsuchen
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div className="mt-8 aspect-square rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600" />
            <div className="-mt-8 aspect-square rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500" />
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600" />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {perks.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <p.icon className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-foreground/60">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Neu eingetroffen</h2>
          <Link href="/products" className="text-sm text-accent hover:underline">
            Alle ansehen
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Bestseller</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
