import { LegalPage, LegalSection } from "@/components/legal-page";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { Link } from "@/components/i18n-link";

export const metadata = { title: "Widerrufsrecht — NOVA" };

export default async function WiderrufsrechtPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "de";
  return <Content locale={locale} />;
}

function Content({ locale }: { locale: Locale }) {
  if (locale === "en") return <WiderrufEn />;
  if (locale === "fr") return <WiderrufFr />;
  if (locale === "es") return <WiderrufEs />;
  return <WiderrufDe />;
}

function WiderrufDe() {
  return (
    <LegalPage title="Widerrufsbelehrung" locale="de">
      <LegalSection title="Widerrufsrecht">
        <p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
        <p>
          Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem du oder
          ein von dir benannter Dritter, der nicht der Beförderer ist, die
          Waren in Besitz genommen hast bzw. hat.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns (Max Mustermann,
          Musterstraße 1, 12345 Musterstadt, kontakt@nova-shop.example —
          Platzhalter, siehe{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Impressum
          </Link>
          ) mittels einer eindeutigen Erklärung (z. B. ein mit der Post
          versandter Brief oder E-Mail) über deinen Entschluss, diesen
          Vertrag zu widerrufen, informieren. Du kannst dafür das unten
          stehende Muster-Widerrufsformular verwenden, das ist jedoch nicht
          vorgeschrieben.
        </p>
        <p>
          Zur Wahrung der Widerrufsfrist reicht es aus, dass du die
          Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
          Widerrufsfrist absendest.
        </p>
      </LegalSection>

      <LegalSection title="Folgen des Widerrufs">
        <p>
          Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen,
          die wir von dir erhalten haben, einschließlich der Lieferkosten
          (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben,
          dass du eine andere Art der Lieferung als die von uns angebotene,
          günstigste Standardlieferung gewählt hast), unverzüglich und
          spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
          die Mitteilung über deinen Widerruf dieses Vertrags bei uns
          eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
          Zahlungsmittel, das du bei der ursprünglichen Transaktion
          eingesetzt hast, es sei denn, mit dir wurde ausdrücklich etwas
          anderes vereinbart; in keinem Fall werden dir wegen dieser
          Rückzahlung Entgelte berechnet.
        </p>
        <p>
          Wir können die Rückzahlung verweigern, bis wir die Waren wieder
          zurückerhalten haben oder bis du den Nachweis erbracht hast, dass
          du die Waren zurückgesandt hast, je nachdem, welches der frühere
          Zeitpunkt ist.
        </p>
        <p>
          Du hast die Waren unverzüglich und in jedem Fall spätestens
          binnen vierzehn Tagen ab dem Tag, an dem du uns über den Widerruf
          dieses Vertrags unterrichtest, an uns zurückzusenden oder zu
          übergeben. Die Frist ist gewahrt, wenn du die Waren vor Ablauf der
          Frist von vierzehn Tagen absendest. Du trägst die unmittelbaren
          Kosten der Rücksendung der Waren.
        </p>
        <p>
          Du musst für einen etwaigen Wertverlust der Waren nur aufkommen,
          wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit,
          Eigenschaften und Funktionsweise der Waren nicht notwendigen
          Umgang mit ihnen zurückzuführen ist.
        </p>
      </LegalSection>

      <LegalSection title="Muster-Widerrufsformular">
        <p>(Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus und sende es zurück.)</p>
        <div className="rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground/70">
          An Max Mustermann, Musterstraße 1, 12345 Musterstadt,
          kontakt@nova-shop.example (Platzhalter):
          <br />
          <br />
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
          abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):
          <br />
          <br />
          Bestellt am (*) / erhalten am (*):
          <br />
          <br />
          Name des/der Verbraucher(s):
          <br />
          <br />
          Anschrift des/der Verbraucher(s):
          <br />
          <br />
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf
          Papier):
          <br />
          <br />
          Datum
          <br />
          <br />
          (*) Unzutreffendes streichen.
        </div>
      </LegalSection>
    </LegalPage>
  );
}

function WiderrufEn() {
  return (
    <LegalPage title="Right of Withdrawal" locale="en">
      <LegalSection title="Right of withdrawal">
        <p>You have the right to withdraw from this contract within fourteen days without giving any reason.</p>
        <p>
          The withdrawal period will expire fourteen days from the day on
          which you, or a third party other than the carrier and indicated
          by you, acquires physical possession of the goods.
        </p>
        <p>
          To exercise the right of withdrawal, you must inform us (Max
          Mustermann, Musterstraße 1, 12345 Musterstadt, Germany,
          kontakt@nova-shop.example — placeholder, see{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Legal Notice
          </Link>
          ) of your decision to withdraw from this contract by an
          unequivocal statement (e.g. a letter sent by post or email). You
          may use the model withdrawal form below, although it is not
          obligatory.
        </p>
        <p>
          To meet the withdrawal deadline, it is sufficient for you to send
          your communication concerning your exercise of the right of
          withdrawal before the withdrawal period has expired.
        </p>
      </LegalSection>

      <LegalSection title="Effects of withdrawal">
        <p>
          If you withdraw from this contract, we shall reimburse to you all
          payments received from you, including the costs of delivery
          (except for the supplementary costs arising from your choice of a
          type of delivery other than the least expensive type of standard
          delivery offered by us), without undue delay and in any event not
          later than fourteen days from the day on which we are informed
          about your decision to withdraw from this contract. We will carry
          out such reimbursement using the same means of payment as you
          used for the initial transaction, unless you have expressly
          agreed otherwise; in any event, you will not incur any fees as a
          result of such reimbursement.
        </p>
        <p>
          We may withhold reimbursement until we have received the goods
          back or you have supplied evidence of having sent back the
          goods, whichever is the earliest.
        </p>
        <p>
          You shall send back the goods or hand them over to us without
          undue delay and in any event not later than fourteen days from
          the day on which you communicate your withdrawal from this
          contract to us. The deadline is met if you send back the goods
          before the period of fourteen days has expired. You will have to
          bear the direct cost of returning the goods.
        </p>
        <p>
          You are only liable for any diminished value of the goods
          resulting from the handling other than what is necessary to
          establish the nature, characteristics and functioning of the
          goods.
        </p>
      </LegalSection>

      <LegalSection title="Model withdrawal form">
        <p>(If you want to withdraw from the contract, please fill in this form and send it back.)</p>
        <div className="rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground/70">
          To Max Mustermann, Musterstraße 1, 12345 Musterstadt, Germany,
          kontakt@nova-shop.example (placeholder):
          <br />
          <br />
          I/We (*) hereby give notice that I/We (*) withdraw from my/our (*)
          contract of sale of the following goods (*):
          <br />
          <br />
          Ordered on (*) / received on (*):
          <br />
          <br />
          Name of consumer(s):
          <br />
          <br />
          Address of consumer(s):
          <br />
          <br />
          Signature of consumer(s) (only if this form is notified on
          paper):
          <br />
          <br />
          Date
          <br />
          <br />
          (*) Delete as appropriate.
        </div>
      </LegalSection>
    </LegalPage>
  );
}

function WiderrufFr() {
  return (
    <LegalPage title="Droit de rétractation" locale="fr">
      <LegalSection title="Droit de rétractation">
        <p>Vous disposez d’un délai de quatorze jours pour vous rétracter du présent contrat sans avoir à justifier de motifs.</p>
        <p>
          Le délai de rétractation expire quatorze jours à compter du jour
          où vous, ou un tiers autre que le transporteur et désigné par
          vous, prend physiquement possession des biens.
        </p>
        <p>
          Pour exercer le droit de rétractation, vous devez nous notifier
          (Max Mustermann, Musterstraße 1, 12345 Musterstadt, Allemagne,
          kontakt@nova-shop.example — fictif, voir{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Mentions légales
          </Link>
          ) votre décision de rétractation du présent contrat au moyen
          d’une déclaration dénuée d’ambiguïté (par exemple lettre envoyée
          par la poste ou courrier électronique). Vous pouvez utiliser le
          formulaire type de rétractation ci-dessous, sans que cela soit
          obligatoire.
        </p>
        <p>
          Pour que le délai de rétractation soit respecté, il suffit que
          vous transmettiez votre communication relative à l’exercice du
          droit de rétractation avant l’expiration du délai de
          rétractation.
        </p>
      </LegalSection>

      <LegalSection title="Effets de la rétractation">
        <p>
          En cas de rétractation de votre part, nous vous rembourserons
          tous les paiements reçus de vous, y compris les frais de
          livraison (à l’exception des frais supplémentaires découlant du
          fait que vous avez choisi, le cas échéant, un mode de livraison
          autre que le mode moins coûteux de livraison standard proposé par
          nous), sans retard excessif et, en tout état de cause, au plus
          tard quatorze jours à compter du jour où nous sommes informés de
          votre décision de rétractation du présent contrat. Nous
          procéderons au remboursement en utilisant le même moyen de
          paiement que celui que vous aurez utilisé pour la transaction
          initiale, sauf accord exprès contraire de votre part ; en tout
          état de cause, ce remboursement ne vous occasionnera aucun frais.
        </p>
        <p>
          Nous pouvons différer le remboursement jusqu’à récupération des
          biens ou jusqu’à ce que vous ayez fourni une preuve d’expédition
          de ces biens, la date retenue étant celle du premier de ces
          faits.
        </p>
        <p>
          Vous devez nous renvoyer ou nous rendre les biens, sans retard
          excessif et, en tout état de cause, au plus tard quatorze jours
          après communication de votre décision de rétractation. Ce délai
          est réputé respecté si vous renvoyez les biens avant l’expiration
          du délai de quatorze jours. Les frais directs de renvoi des biens
          sont à votre charge.
        </p>
        <p>
          Votre responsabilité n’est engagée qu’à l’égard de la
          dépréciation des biens résultant de manipulations autres que
          celles nécessaires pour établir la nature, les caractéristiques
          et le bon fonctionnement de ces biens.
        </p>
      </LegalSection>

      <LegalSection title="Formulaire type de rétractation">
        <p>(Si vous souhaitez vous rétracter du contrat, veuillez compléter et renvoyer ce formulaire.)</p>
        <div className="rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground/70">
          À l’attention de Max Mustermann, Musterstraße 1, 12345
          Musterstadt, Allemagne, kontakt@nova-shop.example (fictif) :
          <br />
          <br />
          Je/nous (*) vous notifie/notifions par la présente ma/notre (*)
          rétractation du contrat portant sur la vente des biens suivants
          (*) :
          <br />
          <br />
          Commandé le (*) / reçu le (*) :
          <br />
          <br />
          Nom du/des consommateur(s) :
          <br />
          <br />
          Adresse du/des consommateur(s) :
          <br />
          <br />
          Signature du/des consommateur(s) (uniquement en cas de
          notification du présent formulaire sur papier) :
          <br />
          <br />
          Date
          <br />
          <br />
          (*) Rayer la mention inutile.
        </div>
      </LegalSection>
    </LegalPage>
  );
}

function WiderrufEs() {
  return (
    <LegalPage title="Derecho de desistimiento" locale="es">
      <LegalSection title="Derecho de desistimiento">
        <p>Tienes derecho a desistir del presente contrato en un plazo de catorce días sin necesidad de justificación.</p>
        <p>
          El plazo de desistimiento expirará a los catorce días del día en
          que tú o un tercero por ti indicado, distinto del transportista,
          adquiera la posesión material de los bienes.
        </p>
        <p>
          Para ejercer el derecho de desistimiento, deberás notificarnos
          (Max Mustermann, Musterstraße 1, 12345 Musterstadt, Alemania,
          kontakt@nova-shop.example — ficticio, ver{" "}
          <Link href="/impressum" className="text-accent hover:underline">
            Aviso legal
          </Link>
          ) tu decisión de desistir del contrato a través de una
          declaración inequívoca (por ejemplo, una carta enviada por correo
          postal o correo electrónico). Podrás utilizar el modelo de
          formulario de desistimiento que figura más abajo, aunque su uso
          no es obligatorio.
        </p>
        <p>
          Para cumplir el plazo de desistimiento, basta con que la
          comunicación relativa al ejercicio de este derecho se envíe
          antes de que venza el plazo correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="Consecuencias del desistimiento">
        <p>
          En caso de desistimiento, te reembolsaremos todos los pagos
          recibidos, incluidos los gastos de entrega (con la excepción de
          los gastos adicionales resultantes de la elección por tu parte de
          una modalidad de entrega diferente a la modalidad estándar menos
          costosa que ofrecemos), sin ninguna demora indebida y, en todo
          caso, a más tardar catorce días después de la fecha en que se nos
          informe de tu decisión de desistir del contrato. Procederemos a
          efectuar dicho reembolso utilizando el mismo medio de pago
          empleado por ti para la transacción inicial, salvo que hayas
          dispuesto expresamente lo contrario; en cualquier caso, no
          incurrirás en ningún gasto como consecuencia del reembolso.
        </p>
        <p>
          Podremos retener el reembolso hasta haber recibido los bienes de
          vuelta o hasta que hayas presentado una prueba de la devolución
          de los mismos, según qué condición se cumpla primero.
        </p>
        <p>
          Deberás devolvernos o entregarnos los bienes sin ninguna demora
          indebida y, en cualquier caso, a más tardar en el plazo de
          catorce días desde la fecha en que nos comuniques tu decisión de
          desistimiento. Se considerará cumplido el plazo si efectúas la
          devolución de los bienes antes de que haya concluido dicho
          plazo. Los costes directos de devolución de los bienes correrán
          de tu cuenta.
        </p>
        <p>
          Solo eres responsable de la disminución de valor de los bienes
          resultante de una manipulación distinta a la necesaria para
          establecer la naturaleza, las características y el
          funcionamiento de los bienes.
        </p>
      </LegalSection>

      <LegalSection title="Modelo de formulario de desistimiento">
        <p>(Si deseas desistir del contrato, rellena y envíanos este formulario.)</p>
        <div className="rounded-2xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground/70">
          A la atención de Max Mustermann, Musterstraße 1, 12345
          Musterstadt, Alemania, kontakt@nova-shop.example (ficticio):
          <br />
          <br />
          Por la presente, el/la abajo firmante (*) comunica que desiste de
          su (*) contrato de venta de los siguientes bienes (*):
          <br />
          <br />
          Pedido el (*) / recibido el (*):
          <br />
          <br />
          Nombre del/de los consumidor(es):
          <br />
          <br />
          Dirección del/de los consumidor(es):
          <br />
          <br />
          Firma del/de los consumidor(es) (solo si el presente formulario
          se presenta en papel):
          <br />
          <br />
          Fecha
          <br />
          <br />
          (*) Táchese lo que no proceda.
        </div>
      </LegalSection>
    </LegalPage>
  );
}
