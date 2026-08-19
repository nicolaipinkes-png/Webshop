import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Impressum — NOVA" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <LegalSection title="Angaben gemäß § 5 TMG">
        <p>
          Max Mustermann (Platzhalter)
          <br />
          NOVA Demo Shop
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection title="Kontakt">
        <p>
          E-Mail: kontakt@nova-shop.example (Platzhalter)
          <br />
          Telefon: +49 (0) 000 00000000 (Platzhalter)
        </p>
      </LegalSection>

      <LegalSection title="Umsatzsteuer-ID">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
          DE000000000 (Platzhalter)
          <br />
          Alternativ, falls zutreffend: Kein Ausweis der Umsatzsteuer gemäß
          §19 UStG (Kleinunternehmerregelung) — Platzhalter, im Einzelfall zu
          prüfen.
        </p>
      </LegalSection>

      <LegalSection title="Handelsregister">
        <p>
          Sofern eingetragen: Registergericht und Registernummer (Platzhalter
          — nur auszufüllen, falls ein Handelsregistereintrag besteht).
        </p>
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>Max Mustermann (Platzhalter), Anschrift wie oben.</p>
      </LegalSection>

      <LegalSection title="EU-Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben unter „Kontakt&quot;. Wir
          sind nicht verpflichtet und nicht bereit, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen (Platzhalter-Angabe, im Einzelfall anzupassen).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
