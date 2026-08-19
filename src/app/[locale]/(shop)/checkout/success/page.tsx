import { CheckCircle2 } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { formatPrice } from "@/lib/utils";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { ClearCart } from "./clear-cart";
import { Link } from "@/components/i18n-link";

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const dict = await getDictionary(locale);
  const { session_id } = await searchParams;

  const order = session_id
    ? (
        await db
          .select()
          .from(orders)
          .where(eq(orders.stripeSessionId, session_id))
      )[0]
    : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <ClearCart />
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{dict.checkout.successTitle}</h1>
      <p className="mt-3 text-sm text-foreground/60">
        {order
          ? dict.checkout.successWithOrder(formatPrice(order.totalCents, order.currency, locale))
          : dict.checkout.successPending}
      </p>
      <Link
        href="/products"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        {dict.checkout.continueShopping}
      </Link>
    </div>
  );
}
