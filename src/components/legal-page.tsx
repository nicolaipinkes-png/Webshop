import { AlertTriangle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";

const disclaimer: Record<Locale, { label: string; text: string }> = {
  de: {
    label: "Demo-/Testprojekt:",
    text: "Diese Seite enthält Platzhalterangaben und dient nur zur Veranschaulichung. Vor einem echten Geschäftsbetrieb müssen alle Angaben durch reale, geprüfte Daten ersetzt und die Inhalte rechtlich geprüft werden.",
  },
  en: {
    label: "Demo/test project:",
    text: "This page contains placeholder information for illustration purposes only. Before real business operation, all details must be replaced with real, verified data and the content must be reviewed by a lawyer.",
  },
  fr: {
    label: "Projet démo/test :",
    text: "Cette page contient des informations fictives à titre d'illustration uniquement. Avant toute exploitation commerciale réelle, toutes les informations doivent être remplacées par des données réelles et vérifiées, et le contenu doit faire l'objet d'un contrôle juridique.",
  },
  es: {
    label: "Proyecto de demostración/prueba:",
    text: "Esta página contiene datos de ejemplo únicamente con fines ilustrativos. Antes de una explotación comercial real, todos los datos deben sustituirse por información real y verificada, y el contenido debe someterse a una revisión legal.",
  },
};

export function LegalPage({
  title,
  locale,
  children,
}: {
  title: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  const d = disclaimer[locale];
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1>

      <div className="mt-6 flex gap-3 rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3.5 text-sm text-foreground/80">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p>
          <strong className="text-foreground">{d.label}</strong> {d.text}
        </p>
      </div>

      <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
