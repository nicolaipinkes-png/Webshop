import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Link } from "@/components/i18n-link";

export const metadata = { title: "AGB — NOVA" };

export default async function AgbPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  return <Content locale={locale} />;
}

function Content({ locale }: { locale: Locale }) {
  if (locale === "en") return <AgbEn />;
  if (locale === "fr") return <AgbFr />;
  if (locale === "es") return <AgbEs />;
  return <AgbDe />;
}

function AgbDe() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen" locale="de">
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
          Die Lieferzeiten sind auf den jeweiligen Produktseiten angegeben.
          Der Versand erfolgt an die im Checkout angegebene Lieferadresse.
        </p>
      </LegalSection>
      <LegalSection title="6. Eigentumsvorbehalt">
        <p>Die gelieferte Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>
      </LegalSection>
      <LegalSection title="7. Gewährleistung">
        <p>Es gilt das gesetzliche Mängelhaftungsrecht.</p>
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
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
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

function AgbEn() {
  return (
    <LegalPage title="Terms & Conditions" locale="en">
      <LegalSection title="1. Scope">
        <p>
          These General Terms and Conditions apply to all contracts
          concluded via the NOVA Demo Shop between Max Mustermann
          (placeholder, see{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Legal Notice
          </Link>
          ) and consumers.
        </p>
      </LegalSection>
      <LegalSection title="2. Conclusion of contract">
        <p>
          The presentation of products in the shop does not constitute a
          binding offer, but an invitation to order. By submitting your
          order via checkout, you make a binding offer. The purchase
          contract is concluded upon confirmation of successful payment.
        </p>
      </LegalSection>
      <LegalSection title="3. Prices and shipping costs">
        <p>
          All prices include statutory VAT. The price displayed at the
          time of ordering applies. Shipping costs are shown before you
          complete your order (see{" "}
          <Link href="/versand" className="text-accent hover:underline">
            Shipping & returns
          </Link>
          ).
        </p>
      </LegalSection>
      <LegalSection title="4. Payment">
        <p>
          Payment is processed via the payment provider Stripe using the
          payment methods offered at checkout (e.g. credit card, others
          depending on availability).
        </p>
      </LegalSection>
      <LegalSection title="5. Delivery">
        <p>
          Delivery times are stated on the respective product pages.
          Shipping is made to the delivery address provided at checkout.
        </p>
      </LegalSection>
      <LegalSection title="6. Retention of title">
        <p>The delivered goods remain our property until paid in full.</p>
      </LegalSection>
      <LegalSection title="7. Warranty">
        <p>Statutory liability for defects applies.</p>
      </LegalSection>
      <LegalSection title="8. Right of withdrawal">
        <p>
          Consumers have a statutory right of withdrawal. Details are set
          out in the{" "}
          <Link href="/widerrufsrecht" className="text-accent hover:underline">
            Right of Withdrawal notice
          </Link>
          .
        </p>
      </LegalSection>
      <LegalSection title="9. Online dispute resolution">
        <p>
          The European Commission provides a platform for online dispute
          resolution (ODR), available at{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            ec.europa.eu/consumers/odr
          </a>
          . We are not obliged and not willing to participate in dispute
          resolution proceedings before a consumer arbitration board
          (placeholder statement, to be adapted case by case).
        </p>
      </LegalSection>
      <LegalSection title="10. Final provisions">
        <p>
          The law of the Federal Republic of Germany applies, excluding the
          UN Convention on Contracts for the International Sale of Goods.
          Mandatory consumer protection provisions of your country of
          habitual residence remain unaffected.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function AgbFr() {
  return (
    <LegalPage title="Conditions générales de vente" locale="fr">
      <LegalSection title="1. Champ d’application">
        <p>
          Les présentes conditions générales s’appliquent à tous les
          contrats conclus via la boutique de démonstration NOVA entre Max
          Mustermann (fictif, voir{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Mentions légales
          </Link>
          ) et les consommateur·rice·s.
        </p>
      </LegalSection>
      <LegalSection title="2. Conclusion du contrat">
        <p>
          La présentation des produits dans la boutique ne constitue pas
          une offre contraignante, mais une invitation à commander. En
          validant votre commande via le tunnel de paiement, vous
          formulez une offre contraignante. Le contrat de vente est conclu
          dès confirmation du paiement effectué avec succès.
        </p>
      </LegalSection>
      <LegalSection title="3. Prix et frais de livraison">
        <p>
          Tous les prix s’entendent TVA légale incluse. Le prix affiché au
          moment de la commande fait foi. Les frais de livraison sont
          indiqués avant la validation de la commande (voir{" "}
          <Link href="/versand" className="text-accent hover:underline">
            Livraison & retours
          </Link>
          ).
        </p>
      </LegalSection>
      <LegalSection title="4. Paiement">
        <p>
          Le paiement s’effectue via le prestataire Stripe, avec les
          moyens de paiement proposés lors du tunnel de commande (par ex.
          carte bancaire, autres selon disponibilité).
        </p>
      </LegalSection>
      <LegalSection title="5. Livraison">
        <p>
          Les délais de livraison sont indiqués sur les pages produits
          correspondantes. La livraison s’effectue à l’adresse renseignée
          lors de la commande.
        </p>
      </LegalSection>
      <LegalSection title="6. Réserve de propriété">
        <p>La marchandise livrée reste notre propriété jusqu’au paiement intégral.</p>
      </LegalSection>
      <LegalSection title="7. Garantie">
        <p>Le régime légal de garantie des vices s’applique.</p>
      </LegalSection>
      <LegalSection title="8. Droit de rétractation">
        <p>
          Les consommateur·rice·s disposent d’un droit de rétractation
          légal. Les modalités sont précisées dans la{" "}
          <Link href="/widerrufsrecht" className="text-accent hover:underline">
            notice de rétractation
          </Link>
          .
        </p>
      </LegalSection>
      <LegalSection title="9. Règlement en ligne des litiges">
        <p>
          La Commission européenne met à disposition une plateforme de
          règlement en ligne des litiges (RLL), accessible à l’adresse{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            ec.europa.eu/consumers/odr
          </a>
          . Nous ne sommes ni tenus ni disposés à participer à une
          procédure de règlement des litiges devant un organisme de
          médiation de la consommation (mention fictive, à adapter au cas
          par cas).
        </p>
      </LegalSection>
      <LegalSection title="10. Dispositions finales">
        <p>
          Le droit de la République fédérale d’Allemagne s’applique, à
          l’exclusion de la Convention des Nations Unies sur les contrats
          de vente internationale de marchandises. Les dispositions
          impératives de protection des consommateurs de votre pays de
          résidence habituelle restent réservées.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function AgbEs() {
  return (
    <LegalPage title="Términos y condiciones" locale="es">
      <LegalSection title="1. Ámbito de aplicación">
        <p>
          Los presentes términos y condiciones se aplican a todos los
          contratos celebrados a través de la tienda de demostración NOVA
          entre Max Mustermann (ficticio, ver{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Aviso legal
          </Link>
          ) y los consumidores.
        </p>
      </LegalSection>
      <LegalSection title="2. Celebración del contrato">
        <p>
          La presentación de los productos en la tienda no constituye una
          oferta vinculante, sino una invitación a realizar un pedido. Al
          enviar tu pedido a través del proceso de compra, formulas una
          oferta vinculante. El contrato de compraventa se perfecciona con
          la confirmación del pago realizado con éxito.
        </p>
      </LegalSection>
      <LegalSection title="3. Precios y gastos de envío">
        <p>
          Todos los precios incluyen el IVA legal. Se aplica el precio
          mostrado en el momento del pedido. Los gastos de envío se
          indican antes de finalizar el pedido (ver{" "}
          <Link href="/versand" className="text-accent hover:underline">
            Envíos y devoluciones
          </Link>
          ).
        </p>
      </LegalSection>
      <LegalSection title="4. Pago">
        <p>
          El pago se realiza a través del proveedor de pagos Stripe,
          mediante los métodos de pago ofrecidos en el proceso de compra
          (por ejemplo, tarjeta de crédito, otros según disponibilidad).
        </p>
      </LegalSection>
      <LegalSection title="5. Entrega">
        <p>
          Los plazos de entrega se indican en las páginas de cada
          producto. El envío se realiza a la dirección indicada durante el
          proceso de compra.
        </p>
      </LegalSection>
      <LegalSection title="6. Reserva de dominio">
        <p>La mercancía entregada seguirá siendo de nuestra propiedad hasta su pago íntegro.</p>
      </LegalSection>
      <LegalSection title="7. Garantía">
        <p>Se aplica el régimen legal de garantía por defectos.</p>
      </LegalSection>
      <LegalSection title="8. Derecho de desistimiento">
        <p>
          Los consumidores disponen de un derecho de desistimiento legal.
          Los detalles se regulan en el{" "}
          <Link href="/widerrufsrecht" className="text-accent hover:underline">
            aviso de desistimiento
          </Link>
          .
        </p>
      </LegalSection>
      <LegalSection title="9. Resolución de litigios en línea">
        <p>
          La Comisión Europea ofrece una plataforma de resolución de
          litigios en línea (RLL), disponible en{" "}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            ec.europa.eu/consumers/odr
          </a>
          . No estamos obligados ni dispuestos a participar en
          procedimientos de resolución de litigios ante un organismo de
          arbitraje de consumo (indicación ficticia, a adaptar según el
          caso).
        </p>
      </LegalSection>
      <LegalSection title="10. Disposiciones finales">
        <p>
          Se aplica el derecho de la República Federal de Alemania, con
          exclusión de la Convención de las Naciones Unidas sobre los
          Contratos de Compraventa Internacional de Mercaderías. Las
          disposiciones imperativas de protección al consumidor de tu país
          de residencia habitual no se ven afectadas.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
