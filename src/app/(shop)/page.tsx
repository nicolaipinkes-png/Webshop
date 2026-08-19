import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
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
      <section className="relative flex min-h-[85vh] items-end overflow-hidden sm:min-h-[90vh]">
        <Image
          src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=2000&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />

        <div className="animate-in relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Jetzt mit KI-Beratung
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            Zuhause ankommen,
            <br />
            neu entdeckt.
          </h1>
          <p className="mt-5 max-w-md text-base text-foreground/70">
            Kuratierte Dekoration, Technik, Mode und Outdoor-Ausstattung — mit
            einem KI-Assistenten, der dir hilft, genau das Richtige zu finden.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              Jetzt entdecken
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-black/25"
            >
              Produkte durchsuchen
            </Link>
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
                <p className="text-xs text-foreground-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Neu eingetroffen</h2>
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

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1601804590276-e19ce20343da?w=1600&q=80&auto=format&fit=crop"
            alt=""
            width={1600}
            height={700}
            className="h-[22rem] w-full object-cover sm:h-[26rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-md px-8 sm:px-12">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                Saisonstart
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                Gemütlich durch den Herbst
              </h2>
              <p className="mt-4 text-sm text-foreground/70">
                Warme Decken, sanftes Licht und Textilien zum Verlieben —
                entdeck unsere Wohnen-Kollektion.
              </p>
              <Link
                href="/products?category=Wohnen"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Kollektion ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">Bestseller</h2>
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
