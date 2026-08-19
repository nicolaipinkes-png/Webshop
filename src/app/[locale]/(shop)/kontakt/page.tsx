import { Mail, Phone, MapPin } from "lucide-react";
import { LegalPage } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const metadata = { title: "Kontakt — NOVA" };

const copy: Record<
  Locale,
  { title: string; intro: string; labels: { email: string; phone: string; address: string } }
> = {
  de: {
    title: "Kontakt",
    intro: "Fragen zu deiner Bestellung oder unseren Produkten? Wir helfen dir gerne weiter.",
    labels: { email: "E-Mail", phone: "Telefon", address: "Adresse" },
  },
  en: {
    title: "Contact",
    intro: "Questions about your order or our products? We're happy to help.",
    labels: { email: "Email", phone: "Phone", address: "Address" },
  },
  fr: {
    title: "Contact",
    intro: "Des questions sur votre commande ou nos produits ? Nous sommes là pour vous aider.",
    labels: { email: "E-mail", phone: "Téléphone", address: "Adresse" },
  },
  es: {
    title: "Contacto",
    intro: "¿Tienes dudas sobre tu pedido o nuestros productos? Estamos encantados de ayudarte.",
    labels: { email: "Correo electrónico", phone: "Teléfono", address: "Dirección" },
  },
};

const placeholderSuffix: Record<Locale, string> = {
  de: "(Platzhalter)",
  en: "(placeholder)",
  fr: "(fictif)",
  es: "(ficticio)",
};

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  const c = copy[locale];
  const suffix = placeholderSuffix[locale];

  const items = [
    { icon: Mail, label: c.labels.email, value: `kontakt@nova-shop.example ${suffix}` },
    { icon: Phone, label: c.labels.phone, value: `+49 (0) 000 00000000 ${suffix}` },
    { icon: MapPin, label: c.labels.address, value: `Musterstraße 1, 12345 Musterstadt ${suffix}` },
  ];

  return (
    <LegalPage title={c.title} locale={locale}>
      <p>{c.intro}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border p-4">
            <item.icon className="h-4 w-4 text-accent" />
            <p className="mt-2 text-xs text-foreground-muted">{item.label}</p>
            <p className="mt-0.5 text-sm text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </LegalPage>
  );
}
