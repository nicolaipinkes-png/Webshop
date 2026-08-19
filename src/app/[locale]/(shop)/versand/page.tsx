import { Truck, RotateCcw, Globe2 } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Link } from "@/components/i18n-link";

export const metadata = { title: "Versand & Rückgabe — NOVA" };

const copy: Record<
  Locale,
  {
    title: string;
    shippingTitle: string;
    shippingText: string;
    countriesText: string;
    returnsTitle: string;
    returnsText: string;
    returnsLinkLabel: string;
  }
> = {
  de: {
    title: "Versand & Rückgabe",
    shippingTitle: "Versand",
    shippingText:
      "Bestellungen werden in der Regel innerhalb von 1–3 Werktagen versendet. Ab einem Bestellwert von 50 € ist der Versand innerhalb Deutschlands kostenlos.",
    countriesText: "Aktuell liefern wir nach Deutschland, Österreich und in die Schweiz.",
    returnsTitle: "Rückgabe",
    returnsText: "Du hast 30 Tage Zeit, ein Produkt kostenlos zurückzusenden. Deine gesetzlichen Widerrufsrechte findest du in der",
    returnsLinkLabel: "Widerrufsbelehrung",
  },
  en: {
    title: "Shipping & returns",
    shippingTitle: "Shipping",
    shippingText:
      "Orders are usually shipped within 1–3 business days. Shipping within Germany is free from an order value of €50.",
    countriesText: "We currently deliver to Germany, Austria and Switzerland.",
    returnsTitle: "Returns",
    returnsText: "You have 30 days to return a product free of charge. You can find your statutory right of withdrawal in the",
    returnsLinkLabel: "right of withdrawal notice",
  },
  fr: {
    title: "Livraison & retours",
    shippingTitle: "Livraison",
    shippingText:
      "Les commandes sont généralement expédiées sous 1 à 3 jours ouvrés. La livraison est gratuite en Allemagne à partir de 50 € d'achat.",
    countriesText: "Nous livrons actuellement en Allemagne, en Autriche et en Suisse.",
    returnsTitle: "Retours",
    returnsText: "Vous disposez de 30 jours pour retourner gratuitement un produit. Votre droit légal de rétractation figure dans la",
    returnsLinkLabel: "notice de rétractation",
  },
  es: {
    title: "Envíos y devoluciones",
    shippingTitle: "Envío",
    shippingText:
      "Los pedidos suelen enviarse en un plazo de 1 a 3 días laborables. El envío dentro de Alemania es gratuito a partir de 50 € de compra.",
    countriesText: "Actualmente enviamos a Alemania, Austria y Suiza.",
    returnsTitle: "Devoluciones",
    returnsText: "Dispones de 30 días para devolver un producto sin coste. Tu derecho legal de desistimiento se detalla en el",
    returnsLinkLabel: "aviso de desistimiento",
  },
};

export default async function VersandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const c = copy[locale];

  return (
    <LegalPage title={c.title} locale={locale}>
      <LegalSection title={c.shippingTitle}>
        <div className="flex gap-3">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>{c.shippingText}</p>
        </div>
        <div className="flex gap-3">
          <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>{c.countriesText}</p>
        </div>
      </LegalSection>

      <LegalSection title={c.returnsTitle}>
        <div className="flex gap-3">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            {c.returnsText}{" "}
            <Link href="/widerrufsrecht" className="text-accent hover:underline">
              {c.returnsLinkLabel}
            </Link>
            .
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
