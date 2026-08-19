import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { localizeProduct } from "@/lib/product-i18n";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist-button";
import { ComplementaryProducts } from "@/components/complementary-products";
import { ProductReviews } from "@/components/product-reviews";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const rawProduct = await getProductBySlug(slug);
  if (!rawProduct) return {};
  const product = localizeProduct(rawProduct, locale);

  return {
    title: `${product.name} — NOVA`,
    description: product.description,
    alternates: { canonical: `${SITE_URL}/${locale}/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

function productJsonLd(product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>, locale: string) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${locale}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
  // Prevent the JSON from prematurely closing the <script> tag.
  return JSON.stringify(json).replace(/</g, "\\u003c");
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const rawProduct = await getProductBySlug(slug);
  if (!rawProduct) notFound();
  const [product, dict] = await Promise.all([
    localizeProduct(rawProduct, locale),
    getDictionary(locale),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product, locale) }}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={[product.image, ...(product.images ?? [])]}
          alt={product.name}
        />
        <div>
          <p className="text-sm text-foreground/60">{dict.categories[product.category as keyof typeof dict.categories]}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            <span>{product.rating}</span>
            <span>· {product.reviewCount} {dict.product.reviewsSuffix}</span>
          </div>
          <p className="mt-6 text-2xl font-semibold">{formatPrice(product.priceCents, product.currency, locale)}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">{product.description}</p>

          <div className="mt-8 flex max-w-xs gap-3">
            <AddToCartButton product={rawProduct} />
            <WishlistButton
              product={rawProduct}
              className="h-12 w-12 shrink-0 border border-border hover:border-accent"
            />
          </div>

          <dl className="mt-10 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-foreground/60">{dict.product.shipping}</dt>
              <dd>{dict.product.shippingValue}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-foreground/60">{dict.product.returns}</dt>
              <dd>{dict.product.returnsValue}</dd>
            </div>
          </dl>
        </div>
      </div>

      <ComplementaryProducts product={rawProduct} locale={locale} />
      <ProductReviews product={rawProduct} locale={locale} />
    </div>
  );
}
