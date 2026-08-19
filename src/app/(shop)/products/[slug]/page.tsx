import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { WishlistButton } from "@/components/wishlist-button";
import { ComplementaryProducts } from "@/components/complementary-products";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — NOVA`,
    description: product.description,
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

function productJsonLd(product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product) }}
      />
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImage
          src={product.image}
          alt={product.name}
          className="aspect-square w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
        <div>
          <p className="text-sm text-foreground/60">{product.category}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-foreground/60">
            <Star className="h-4 w-4 fill-current text-amber-500" />
            <span>{product.rating}</span>
            <span>· {product.reviewCount} Bewertungen</span>
          </div>
          <p className="mt-6 text-2xl font-semibold">{formatPrice(product.priceCents, product.currency)}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/70">{product.description}</p>

          <div className="mt-8 flex max-w-xs gap-3">
            <AddToCartButton product={product} />
            <WishlistButton
              product={product}
              className="h-12 w-12 shrink-0 border border-border hover:border-accent"
            />
          </div>

          <dl className="mt-10 space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <dt className="text-foreground/60">Versand</dt>
              <dd>1–3 Werktage</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-foreground/60">Rückgabe</dt>
              <dd>30 Tage kostenlos</dd>
            </div>
          </dl>
        </div>
      </div>

      <ComplementaryProducts product={product} />
    </div>
  );
}
