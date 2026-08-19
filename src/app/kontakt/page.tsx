import { Mail, Phone, MapPin } from "lucide-react";
import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Kontakt — NOVA" };

const items = [
  { icon: Mail, label: "E-Mail", value: "kontakt@nova-shop.example (Platzhalter)" },
  { icon: Phone, label: "Telefon", value: "+49 (0) 000 00000000 (Platzhalter)" },
  { icon: MapPin, label: "Adresse", value: "Musterstraße 1, 12345 Musterstadt (Platzhalter)" },
];

export default function KontaktPage() {
  return (
    <LegalPage title="Kontakt">
      <p>
        Fragen zu deiner Bestellung oder unseren Produkten? Wir helfen dir
        gerne weiter.
      </p>
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
