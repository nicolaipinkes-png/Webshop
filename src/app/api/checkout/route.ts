import { NextRequest, NextResponse } from "next/server";
import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { orderItems, orders, products as productsTable } from "@/lib/db/schema";
import { stripe } from "@/lib/stripe";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/product-i18n";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const items: { productId: string; quantity: number }[] = body.items;
  const rawLocale = String(body.locale ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Warenkorb ist leer." }, { status: 400 });
  }

  const productIds = items.map((i) => i.productId);
  const dbProducts = await db
    .select()
    .from(productsTable)
    .where(inArray(productsTable.id, productIds));

  const lineItems = items.map((item) => {
    const product = dbProducts.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Produkt ${item.productId} nicht gefunden.`);
    }
    return {
      product,
      quantity: Math.max(1, Math.min(item.quantity, 20)),
    };
  });

  const totalCents = lineItems.reduce(
    (sum, i) => sum + i.product.priceCents * i.quantity,
    0
  );
  const currency = lineItems[0].product.currency;

  const orderId = crypto.randomUUID();

  const origin = request.nextUrl.origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale,
    line_items: lineItems.map((i) => ({
      price_data: {
        currency: i.product.currency.toLowerCase(),
        unit_amount: i.product.priceCents,
        product_data: { name: localizeProduct(i.product, locale).name },
      },
      quantity: i.quantity,
    })),
    success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/checkout`,
    client_reference_id: orderId,
    metadata: { orderId },
    shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] },
    allow_promotion_codes: true,
  });

  await db.insert(orders).values({
    id: orderId,
    stripeSessionId: session.id,
    status: "pending",
    totalCents,
    currency,
  });

  await db.insert(orderItems).values(
    lineItems.map((i) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: i.product.id,
      name: i.product.name,
      priceCents: i.product.priceCents,
      quantity: i.quantity,
    }))
  );

  return NextResponse.json({ url: session.url });
}
