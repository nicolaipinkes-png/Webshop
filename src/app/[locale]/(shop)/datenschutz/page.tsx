import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Link } from "@/components/i18n-link";

export const metadata = { title: "Datenschutzerklärung — NOVA" };

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  return <Content locale={locale} />;
}

function Content({ locale }: { locale: Locale }) {
  if (locale === "en") return <DatenschutzEn />;
  if (locale === "fr") return <DatenschutzFr />;
  if (locale === "es") return <DatenschutzEs />;
  return <DatenschutzDe />;
}

function DatenschutzDe() {
  return (
    <LegalPage title="Datenschutzerklärung" locale="de">
      <LegalSection title="1. Verantwortlicher">
        <p>
          Max Mustermann (Platzhalter), Musterstraße 1, 12345 Musterstadt,
          Deutschland — kontakt@nova-shop.example (Platzhalter). Details
          siehe{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Impressum
          </Link>
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
            <strong className="text-foreground">
              Stripe Payments Europe, Ltd.
            </strong>{" "}
            — Zahlungsabwicklung. Zahlungsdaten (z. B. Kartendaten) werden
            ausschließlich von Stripe verarbeitet und laufen nicht über
            unsere eigenen Server.
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
          Der Inhalt deines Warenkorbs wird technisch notwendig im lokalen
          Speicher deines Browsers (localStorage) abgelegt, damit er beim
          erneuten Besuch erhalten bleibt. Diese Daten verlassen dein Gerät
          nicht, bis du den Bestellvorgang startest.
        </p>
      </LegalSection>

      <LegalSection title="4. Bestellung und Zahlung">
        <p>
          Zur Abwicklung deiner Bestellung erheben wir die für den
          Kaufvertrag notwendigen Daten (u. a. Liefer- und
          Rechnungsadresse, E-Mail-Adresse) und übermitteln sie an Stripe
          zur Zahlungsabwicklung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO (Vertragserfüllung).
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

function DatenschutzEn() {
  return (
    <LegalPage title="Privacy Policy" locale="en">
      <LegalSection title="1. Controller">
        <p>
          Max Mustermann (placeholder), Musterstraße 1, 12345 Musterstadt,
          Germany — kontakt@nova-shop.example (placeholder). Details see{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Legal Notice
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Overview of processing">
        <p>To operate this shop, we work with the following service providers, who process personal data on our behalf:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Vercel Inc.</strong> (USA) —
            website hosting, server logs (incl. IP address, timestamp,
            page accessed) for technical provisioning and security.
          </li>
          <li>
            <strong className="text-foreground">Supabase Inc.</strong>{" "}
            (database hosted in Frankfurt, EU) — storage of product and
            order data.
          </li>
          <li>
            <strong className="text-foreground">
              Stripe Payments Europe, Ltd.
            </strong>{" "}
            — payment processing. Payment data (e.g. card details) is
            processed exclusively by Stripe and never passes through our
            own servers.
          </li>
          <li>
            <strong className="text-foreground">Anthropic, PBC</strong>{" "}
            (USA) — processing of your inputs in the AI shopping assistant
            to generate product recommendations.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Cart (local storage)">
        <p>
          The contents of your cart are technically necessarily stored in
          your browser’s local storage (localStorage) so they persist on
          return visits. This data does not leave your device until you
          start the checkout process.
        </p>
      </LegalSection>

      <LegalSection title="4. Order and payment">
        <p>
          To process your order, we collect the data required for the
          purchase contract (incl. delivery and billing address, email
          address) and transmit it to Stripe for payment processing. The
          legal basis is Art. 6 (1)(b) GDPR (performance of a contract).
        </p>
      </LegalSection>

      <LegalSection title="5. AI shopping assistant">
        <p>
          When you use the chat assistant, your messages are transmitted
          to Anthropic to generate a response. Only use the assistant with
          information necessary for your product search. The legal basis
          is Art. 6 (1)(a) GDPR (consent through active use).
        </p>
      </LegalSection>

      <LegalSection title="6. Your rights">
        <p>
          You have the right to access, rectify, erase, restrict
          processing, data portability and object with regard to your
          personal data, as well as the right to lodge a complaint with a
          data protection supervisory authority.
        </p>
      </LegalSection>

      <LegalSection title="7. Retention period">
        <p>
          Order data is stored for the duration of statutory retention
          obligations. Server logs are automatically deleted after a few
          days (placeholder — to be adjusted to the actual configuration).
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function DatenschutzFr() {
  return (
    <LegalPage title="Politique de confidentialité" locale="fr">
      <LegalSection title="1. Responsable du traitement">
        <p>
          Max Mustermann (fictif), Musterstraße 1, 12345 Musterstadt,
          Allemagne — kontakt@nova-shop.example (fictif). Détails voir{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Mentions légales
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Aperçu des traitements">
        <p>Pour exploiter cette boutique, nous faisons appel aux prestataires suivants, qui traitent des données personnelles pour notre compte :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Vercel Inc.</strong>{" "}
            (États-Unis) — hébergement du site, journaux serveur (dont
            adresse IP, horodatage, page consultée) à des fins de mise à
            disposition technique et de sécurisation.
          </li>
          <li>
            <strong className="text-foreground">Supabase Inc.</strong>{" "}
            (base de données hébergée à Francfort, UE) — stockage des
            données produits et commandes.
          </li>
          <li>
            <strong className="text-foreground">
              Stripe Payments Europe, Ltd.
            </strong>{" "}
            — traitement des paiements. Les données de paiement (par ex.
            données de carte) sont traitées exclusivement par Stripe et ne
            transitent jamais par nos propres serveurs.
          </li>
          <li>
            <strong className="text-foreground">Anthropic, PBC</strong>{" "}
            (États-Unis) — traitement de vos saisies dans l’assistant
            d’achat IA afin de générer des recommandations de produits.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Panier (stockage local)">
        <p>
          Le contenu de votre panier est stocké, par nécessité technique,
          dans la mémoire locale de votre navigateur (localStorage) afin
          d’être conservé lors d’une prochaine visite. Ces données ne
          quittent pas votre appareil tant que vous n’avez pas démarré le
          processus de commande.
        </p>
      </LegalSection>

      <LegalSection title="4. Commande et paiement">
        <p>
          Pour traiter votre commande, nous collectons les données
          nécessaires à l’exécution du contrat de vente (dont adresse de
          livraison et de facturation, adresse e-mail) et les transmettons
          à Stripe pour le traitement du paiement. La base juridique est
          l’art. 6 § 1 b) du RGPD (exécution d’un contrat).
        </p>
      </LegalSection>

      <LegalSection title="5. Assistant d’achat IA">
        <p>
          Lorsque vous utilisez l’assistant conversationnel, vos messages
          sont transmis à Anthropic afin de générer une réponse. N’utilisez
          donc l’assistant qu’avec des informations nécessaires à votre
          recherche de produits. La base juridique est l’art. 6 § 1 a) du
          RGPD (consentement par l’utilisation active).
        </p>
      </LegalSection>

      <LegalSection title="6. Vos droits">
        <p>
          Vous disposez d’un droit d’accès, de rectification,
          d’effacement, de limitation du traitement, de portabilité des
          données et d’opposition concernant vos données personnelles,
          ainsi que du droit d’introduire une réclamation auprès d’une
          autorité de contrôle en matière de protection des données.
        </p>
      </LegalSection>

      <LegalSection title="7. Durée de conservation">
        <p>
          Les données de commande sont conservées pendant la durée des
          obligations légales de conservation. Les journaux serveur sont
          automatiquement supprimés après quelques jours (fictif — à
          adapter selon la configuration réelle).
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function DatenschutzEs() {
  return (
    <LegalPage title="Política de privacidad" locale="es">
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          Max Mustermann (ficticio), Musterstraße 1, 12345 Musterstadt,
          Alemania — kontakt@nova-shop.example (ficticio). Más detalles en
          el{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Aviso legal
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Resumen de los tratamientos">
        <p>Para operar esta tienda, trabajamos con los siguientes proveedores, que tratan datos personales por nuestra cuenta:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-foreground">Vercel Inc.</strong> (EE.
            UU.) — alojamiento del sitio web, registros del servidor
            (incl. dirección IP, fecha y hora, página visitada) para la
            prestación técnica y la seguridad.
          </li>
          <li>
            <strong className="text-foreground">Supabase Inc.</strong>{" "}
            (base de datos alojada en Fráncfort, UE) — almacenamiento de
            los datos de productos y pedidos.
          </li>
          <li>
            <strong className="text-foreground">
              Stripe Payments Europe, Ltd.
            </strong>{" "}
            — procesamiento de pagos. Los datos de pago (por ejemplo, datos
            de la tarjeta) son tratados exclusivamente por Stripe y nunca
            pasan por nuestros propios servidores.
          </li>
          <li>
            <strong className="text-foreground">Anthropic, PBC</strong> (EE.
            UU.) — tratamiento de tus mensajes en el asistente de compras
            con IA para generar recomendaciones de productos.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Carrito (almacenamiento local)">
        <p>
          El contenido de tu carrito se guarda, por necesidad técnica, en
          el almacenamiento local de tu navegador (localStorage) para que
          se conserve en futuras visitas. Estos datos no salen de tu
          dispositivo hasta que inicias el proceso de compra.
        </p>
      </LegalSection>

      <LegalSection title="4. Pedido y pago">
        <p>
          Para tramitar tu pedido, recabamos los datos necesarios para el
          contrato de compraventa (incl. dirección de envío y facturación,
          correo electrónico) y los transmitimos a Stripe para el
          procesamiento del pago. La base jurídica es el art. 6, apdo. 1,
          letra b) del RGPD (ejecución de un contrato).
        </p>
      </LegalSection>

      <LegalSection title="5. Asistente de compras con IA">
        <p>
          Cuando utilizas el asistente de chat, tus mensajes se transmiten
          a Anthropic para generar una respuesta. Utiliza el asistente
          únicamente con información necesaria para tu búsqueda de
          productos. La base jurídica es el art. 6, apdo. 1, letra a) del
          RGPD (consentimiento mediante el uso activo).
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>
          Tienes derecho de acceso, rectificación, supresión, limitación
          del tratamiento, portabilidad de los datos y oposición respecto
          a tus datos personales, así como derecho a presentar una
          reclamación ante una autoridad de control en materia de
          protección de datos.
        </p>
      </LegalSection>

      <LegalSection title="7. Plazo de conservación">
        <p>
          Los datos de los pedidos se conservan durante el plazo de las
          obligaciones legales de conservación. Los registros del servidor
          se eliminan automáticamente al cabo de unos días (ficticio — a
          adaptar según la configuración real).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
