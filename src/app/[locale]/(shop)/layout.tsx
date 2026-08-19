import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { AiAssistant } from "@/components/ai-assistant";
import { StyleQuiz } from "@/components/style-quiz";
import { getAllProducts } from "@/lib/products";
import { isLocale, locales } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/locale-context";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const products = await getAllProducts();

  return (
    <LocaleProvider locale={locale}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <AiAssistant products={products} />
      <StyleQuiz />
    </LocaleProvider>
  );
}
