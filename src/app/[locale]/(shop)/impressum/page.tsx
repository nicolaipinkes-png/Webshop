import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";

export const metadata = { title: "Impressum — NOVA" };

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  return <Content locale={locale} />;
}

function Content({ locale }: { locale: Locale }) {
  if (locale === "en") return <ImpressumEn />;
  if (locale === "fr") return <ImpressumFr />;
  if (locale === "es") return <ImpressumEs />;
  return <ImpressumDe />;
}

function ImpressumDe() {
  return (
    <LegalPage title="Impressum" locale="de">
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

function ImpressumEn() {
  return (
    <LegalPage title="Legal Notice" locale="en">
      <LegalSection title="Information pursuant to § 5 TMG (German Telemedia Act)">
        <p>
          Max Mustermann (placeholder)
          <br />
          NOVA Demo Shop
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Germany
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Email: kontakt@nova-shop.example (placeholder)
          <br />
          Phone: +49 (0) 000 00000000 (placeholder)
        </p>
      </LegalSection>

      <LegalSection title="VAT ID">
        <p>
          VAT identification number pursuant to §27a of the German VAT Act:
          DE000000000 (placeholder)
          <br />
          Alternatively, if applicable: no VAT shown pursuant to §19 UStG
          (small business regulation) — placeholder, to be reviewed on a
          case-by-case basis.
        </p>
      </LegalSection>

      <LegalSection title="Commercial register">
        <p>
          If registered: registry court and registration number (placeholder
          — only to be filled in if a commercial register entry exists).
        </p>
      </LegalSection>

      <LegalSection title="Responsible for content pursuant to § 18 (2) MStV">
        <p>Max Mustermann (placeholder), address as above.</p>
      </LegalSection>

      <LegalSection title="EU dispute resolution">
        <p>
          The European Commission provides a platform for online dispute
          resolution (ODR):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . You can find our email address above under &quot;Contact&quot;.
          We are not obliged and not willing to participate in dispute
          resolution proceedings before a consumer arbitration board
          (placeholder statement, to be adapted case by case).
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function ImpressumFr() {
  return (
    <LegalPage title="Mentions légales" locale="fr">
      <LegalSection title="Informations selon § 5 TMG (loi allemande sur les télémédias)">
        <p>
          Max Mustermann (fictif)
          <br />
          NOVA Demo Shop
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Allemagne
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          E-mail : kontakt@nova-shop.example (fictif)
          <br />
          Téléphone : +49 (0) 000 00000000 (fictif)
        </p>
      </LegalSection>

      <LegalSection title="Numéro de TVA">
        <p>
          Numéro d’identification à la TVA selon §27a de la loi allemande sur
          la TVA : DE000000000 (fictif)
          <br />
          Le cas échéant : pas de TVA affichée selon §19 UStG (régime des
          petites entreprises) — fictif, à vérifier au cas par cas.
        </p>
      </LegalSection>

      <LegalSection title="Registre du commerce">
        <p>
          Le cas échéant : tribunal d’immatriculation et numéro
          d’enregistrement (fictif — à compléter uniquement en cas
          d’inscription au registre du commerce).
        </p>
      </LegalSection>

      <LegalSection title="Responsable du contenu selon § 18 al. 2 MStV">
        <p>Max Mustermann (fictif), adresse identique à celle ci-dessus.</p>
      </LegalSection>

      <LegalSection title="Règlement européen des litiges">
        <p>
          La Commission européenne met à disposition une plateforme de
          règlement en ligne des litiges (RLL) :{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Notre adresse e-mail figure ci-dessus sous « Contact ». Nous ne
          sommes ni tenus ni disposés à participer à une procédure de
          règlement des litiges devant un organisme de médiation de la
          consommation (mention fictive, à adapter au cas par cas).
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function ImpressumEs() {
  return (
    <LegalPage title="Aviso legal" locale="es">
      <LegalSection title="Información según el § 5 TMG (Ley alemana de telemedios)">
        <p>
          Max Mustermann (ficticio)
          <br />
          NOVA Demo Shop
          <br />
          Musterstraße 1
          <br />
          12345 Musterstadt
          <br />
          Alemania
        </p>
      </LegalSection>

      <LegalSection title="Contacto">
        <p>
          Correo electrónico: kontakt@nova-shop.example (ficticio)
          <br />
          Teléfono: +49 (0) 000 00000000 (ficticio)
        </p>
      </LegalSection>

      <LegalSection title="NIF-IVA">
        <p>
          Número de identificación fiscal a efectos del IVA según el §27a de
          la Ley del IVA alemana: DE000000000 (ficticio)
          <br />
          En su caso: sin mención del IVA conforme al §19 UStG (régimen de
          pequeñas empresas) — ficticio, a comprobar en cada caso.
        </p>
      </LegalSection>

      <LegalSection title="Registro mercantil">
        <p>
          En su caso: juzgado de registro y número de inscripción (ficticio —
          solo debe completarse si existe una inscripción en el registro
          mercantil).
        </p>
      </LegalSection>

      <LegalSection title="Responsable del contenido según el § 18 apdo. 2 MStV">
        <p>Max Mustermann (ficticio), dirección igual a la anterior.</p>
      </LegalSection>

      <LegalSection title="Resolución de litigios de la UE">
        <p>
          La Comisión Europea ofrece una plataforma de resolución de litigios
          en línea (RLL):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Nuestra dirección de correo electrónico figura arriba, en
          «Contacto». No estamos obligados ni dispuestos a participar en
          procedimientos de resolución de litigios ante un organismo de
          arbitraje de consumo (indicación ficticia, a adaptar según el
          caso).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
