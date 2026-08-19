import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "AGB — NOVA" };

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <LegalSection title="1. Geltungsbereich">
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle über den
          NOVA Demo Shop geschlossenen Verträge zwischen Max Mustermann
          (Platzhalter, siehe{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Impressum
          </Link>
          ) und Verbraucher:innen.
        </p>
      </LegalSection>

      <LegalSection title="2. Vertragsschluss">
        <p>
          Die Darstellung der Produkte im Shop stellt kein bindendes Angebot
          dar, sondern eine Aufforderung zur Bestellung. Mit Absenden der
          Bestellung über den Checkout gibst du ein verbindliches Angebot
          ab. Der Kaufvertrag kommt durch die Bestätigung der erfolgreichen
          Zahlung zustande.
        </p>
      </LegalSection>

      <LegalSection title="3. Preise und Versandkosten">
        <p>
          Alle Preise verstehen sich inklusive der gesetzlichen
          Umsatzsteuer. Es gilt der zum Zeitpunkt der Bestellung angezeigte
          Preis. Versandkosten werden vor Abschluss der Bestellung
          ausgewiesen (siehe{" "}
          <Link href="/versand" className="text-accent hover:underline">
            Versand & Rückgabe
          </Link>
          ).
        </p>
      </LegalSection>

      <LegalSection title="4. Zahlung">
        <p>
          Die Zahlung erfolgt über den Zahlungsdienstleister Stripe mit den
          im Checkout angebotenen Zahlungsmethoden (z. B. Kreditkarte,
          weitere je nach Verfügbarkeit).
        </p>
      </LegalSection>

      <LegalSection title="5. Lieferung">
        <p>
          Die Lieferzeiten sind auf den jeweiligen Produktseiten
          angegeben. Der Versand erfolgt an die im Checkout angegebene
          Lieferadresse.
        </p>
      </LegalSection>

      <LegalSection title="6. Eigentumsvorbehalt">
        <p>
          Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser
          Eigentum.
        </p>
      </LegalSection>

      <LegalSection title="7. Gewährleistung">
        <p>
          Es gilt das gesetzliche Mängelhaftungsrecht.
        </p>
      </LegalSection>

      <LegalSection title="8. Widerrufsrecht">
        <p>
          Verbraucher:innen steht ein gesetzliches Widerrufsrecht zu.
          Einzelheiten regelt die{" "}
          <Link href="/widerrufsrecht" className="text-accent hover:underline">
            Widerrufsbelehrung
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Online-Streitbeilegung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit, abrufbar unter{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen (Platzhalter-Angabe, im Einzelfall anzupassen).
        </p>
      </LegalSection>

      <LegalSection title="10. Schlussbestimmungen">
        <p>
          Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
          des UN-Kaufrechts. Zwingende verbraucherschützende Bestimmungen
          des Landes deines gewöhnlichen Aufenthalts bleiben unberührt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
