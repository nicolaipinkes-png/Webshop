import { AlertTriangle } from "lucide-react";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1>

      <div className="mt-6 flex gap-3 rounded-2xl border border-accent/30 bg-accent-soft px-4 py-3.5 text-sm text-foreground/80">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p>
          <strong className="text-foreground">Demo-/Testprojekt:</strong> Diese
          Seite enthält Platzhalterangaben und dient nur zur Veranschaulichung.
          Vor einem echten Geschäftsbetrieb müssen alle Angaben durch reale,
          geprüfte Daten ersetzt und die Inhalte rechtlich geprüft werden.
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
