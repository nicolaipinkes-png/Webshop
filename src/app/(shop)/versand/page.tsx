import Link from "next/link";
import { Truck, RotateCcw, Globe2 } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Versand & Rückgabe — NOVA" };

export default function VersandPage() {
  return (
    <LegalPage title="Versand & Rückgabe">
      <LegalSection title="Versand">
        <div className="flex gap-3">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Bestellungen werden in der Regel innerhalb von 1–3 Werktagen
            versendet. Ab einem Bestellwert von 50 € ist der Versand
            innerhalb Deutschlands kostenlos.
          </p>
        </div>
        <div className="flex gap-3">
          <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Aktuell liefern wir nach Deutschland, Österreich und in die
            Schweiz.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Rückgabe">
        <div className="flex gap-3">
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Du hast 30 Tage Zeit, ein Produkt kostenlos zurückzusenden.
            Deine gesetzlichen Widerrufsrechte findest du in der{" "}
            <Link href="/widerrufsrecht" className="text-accent hover:underline">
              Widerrufsbelehrung
            </Link>
            .
          </p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
