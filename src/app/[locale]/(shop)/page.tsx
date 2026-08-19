import Image from "next/image";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ProductCard } from "@/components/product-card";
import { PersonalizedProducts } from "@/components/personalized-products";
import { Link } from "@/components/i18n-link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const [products, dict] = await Promise.all([getAllProducts(), getDictionary(locale)]);
  const featured = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.badge === "bestseller");

  const perks = [
    { icon: Truck, title: dict.home.perkShippingTitle, text: dict.home.perkShippingText },
    { icon: RotateCcw, title: dict.home.perkReturnTitle, text: dict.home.perkReturnText },
    { icon: ShieldCheck, title: dict.home.perkPaymentTitle, text: dict.home.perkPaymentText },
  ];

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
            {dict.home.badge}
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {dict.home.heroTitle1}
            <br />
            {dict.home.heroTitle2}
          </h1>
          <p className="mt-5 max-w-md text-base text-foreground/70">{dict.home.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              {dict.home.ctaDiscover}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="flex h-12 items-center justify-center rounded-full border border-white/20 bg-black/10 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-black/25"
            >
              {dict.home.ctaSearch}
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

      <PersonalizedProducts products={products} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{dict.home.newArrivals}</h2>
          <Link href="/products" className="text-sm text-accent hover:underline">
            {dict.home.viewAll}
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
                {dict.home.seasonLabel}
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                {dict.home.seasonTitle}
              </h2>
              <p className="mt-4 text-sm text-foreground/70">{dict.home.seasonText}</p>
              <Link
                href="/products?category=Textilien"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {dict.home.seasonCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{dict.home.bestsellers}</h2>
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
