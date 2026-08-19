import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Widerrufsrecht — NOVA" };

export default function WiderrufsrechtPage() {
  return (
    <LegalPage title="Widerrufsbelehrung">
      <LegalSection title="Widerrufsrecht">
        <p>
          Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen.
        </p>
        <p>
          Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem du
          oder ein von dir benannter Dritter, der nicht der Beförderer ist,
          die Waren in Besitz genommen hast bzw. hat.
        </p>
        <p>
          Um dein Widerrufsrecht auszuüben, musst du uns (Max Mustermann,
          Musterstraße 1, 12345 Musterstadt, kontakt@nova-shop.example —
          Platzhalter, siehe{" "}
          <a href="/impressum" className="text-accent hover:underline">
            Impressum
          </a>
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
        <p>
          (Wenn du den Vertrag widerrufen willst, fülle dieses Formular aus
          und sende es zurück.)
        </p>
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
