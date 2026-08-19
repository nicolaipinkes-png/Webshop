import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Datenschutzerklärung — NOVA" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <LegalSection title="1. Verantwortlicher">
        <p>
          Max Mustermann (Platzhalter), Musterstraße 1, 12345 Musterstadt,
          Deutschland — kontakt@nova-shop.example (Platzhalter). Details
          siehe{" "}
          <a href="/impressum" className="text-accent hover:underline">
            Impressum
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Übersicht der Verarbeitungen">
        <p>
          Beim Betrieb dieses Shops arbeiten wir mit folgenden
          Dienstleistern zusammen, die dabei personenbezogene Daten für uns
          verarbeiten:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Vercel Inc.</strong> (USA) —
            Hosting der Website, Server-Logs (u. a. IP-Adresse, Zeitpunkt,
            aufgerufene Seite) zur technischen Bereitstellung und
            Absicherung.
          </li>
          <li>
            <strong className="text-foreground">Supabase Inc.</strong>{" "}
            (Datenbank gehostet in Frankfurt, EU) — Speicherung der
            Produkt- und Bestelldaten.
          </li>
          <li>
            <strong className="text-foreground">Stripe Payments Europe,
            Ltd.</strong> — Zahlungsabwicklung. Zahlungsdaten (z. B.
            Kartendaten) werden ausschließlich von Stripe verarbeitet und
            laufen nicht über unsere eigenen Server.
          </li>
          <li>
            <strong className="text-foreground">Anthropic, PBC</strong> (USA)
            — Verarbeitung deiner Eingaben im KI-Shopping-Assistenten, um
            Produktempfehlungen zu erzeugen.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Warenkorb (lokale Speicherung)">
        <p>
          Der Inhalt deines Warenkorbs wird technisch notwendig im
          lokalen Speicher deines Browsers (localStorage) abgelegt, damit er
          beim erneuten Besuch erhalten bleibt. Diese Daten verlassen dein
          Gerät nicht, bis du den Bestellvorgang startest.
        </p>
      </LegalSection>

      <LegalSection title="4. Bestellung und Zahlung">
        <p>
          Zur Abwicklung deiner Bestellung erheben wir die für den
          Kaufvertrag notwendigen Daten (u. a. Liefer- und
          Rechnungsadresse, E-Mail-Adresse) und übermitteln sie an Stripe zur
          Zahlungsabwicklung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (Vertragserfüllung).
        </p>
      </LegalSection>

      <LegalSection title="5. KI-Shopping-Assistent">
        <p>
          Wenn du den Chat-Assistenten nutzt, werden deine Nachrichten zur
          Erzeugung einer Antwort an Anthropic übermittelt. Nutze den
          Assistenten daher nur mit Informationen, die für die
          Produktsuche notwendig sind. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. a DSGVO (Einwilligung durch aktive Nutzung).
        </p>
      </LegalSection>

      <LegalSection title="6. Deine Rechte">
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und
          Widerspruch bezüglich deiner personenbezogenen Daten sowie das
          Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
        </p>
      </LegalSection>

      <LegalSection title="7. Speicherdauer">
        <p>
          Bestelldaten werden für die Dauer gesetzlicher
          Aufbewahrungspflichten gespeichert. Server-Logs werden nach
          wenigen Tagen automatisch gelöscht (Platzhalter — je nach
          tatsächlicher Konfiguration anzupassen).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
