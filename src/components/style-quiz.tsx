"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { useStyleProfileStore, StyleProfile } from "@/lib/style-profile-store";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

const categoryOptions: { value: StyleProfile["category"]; label: string }[] = [
  { value: "Sofas", label: "Sofas & Sessel" },
  { value: "Möbel", label: "Möbel" },
  { value: "Beleuchtung", label: "Beleuchtung" },
  { value: "Textilien", label: "Textilien" },
  { value: "Deko", label: "Deko" },
];

const styleOptions: { value: StyleProfile["style"]; label: string }[] = [
  { value: "warm", label: "Warm & gemütlich" },
  { value: "modern", label: "Klar & minimalistisch" },
  { value: "natural", label: "Natürlich & organisch" },
];

const budgetOptions: { value: StyleProfile["budget"]; label: string }[] = [
  { value: "low", label: "Bis 100 €" },
  { value: "mid", label: "100–400 €" },
  { value: "high", label: "Ab 400 €" },
];

export function StyleQuiz() {
  const mounted = useMounted();
  const profile = useStyleProfileStore((s) => s.profile);
  const dismissed = useStyleProfileStore((s) => s.dismissed);
  const setProfile = useStyleProfileStore((s) => s.setProfile);
  const dismiss = useStyleProfileStore((s) => s.dismiss);

  const [category, setCategory] = useState<StyleProfile["category"] | null>(null);
  const [style, setStyle] = useState<StyleProfile["style"] | null>(null);
  const [budget, setBudget] = useState<StyleProfile["budget"] | null>(null);

  if (!mounted || dismissed || profile) return null;

  const canSubmit = category && style && budget;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl sm:p-8">
        <button
          onClick={dismiss}
          aria-label="Schließen"
          className="absolute right-4 top-4 rounded-full p-1 text-foreground/60 hover:bg-surface-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-accent">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-widest">Style-Quiz</span>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight">
          Finde deinen Einrichtungsstil
        </h2>
        <p className="mt-1 text-sm text-foreground/60">
          Drei kurze Fragen – wir zeigen dir dann passende Produkte auf der Startseite.
        </p>

        <div className="mt-6 space-y-5">
          <QuizGroup
            label="Wonach suchst du hauptsächlich?"
            value={category}
            options={categoryOptions}
            onChange={setCategory}
          />
          <QuizGroup
            label="Welcher Stil beschreibt dein Zuhause am besten?"
            value={style}
            options={styleOptions}
            onChange={setStyle}
          />
          <QuizGroup
            label="Dein Budget pro Stück?"
            value={budget}
            options={budgetOptions}
            onChange={setBudget}
          />
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={dismiss}
            className="text-sm text-foreground/60 hover:text-foreground"
          >
            Überspringen
          </button>
          <button
            disabled={!canSubmit}
            onClick={() => {
              if (category && style && budget) setProfile({ category, style, budget });
            }}
            className="h-11 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Empfehlungen anzeigen
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-foreground-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              value === o.value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border text-foreground/70 hover:border-accent"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
