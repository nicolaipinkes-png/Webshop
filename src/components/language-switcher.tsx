"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function switchTo(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    setLocaleCookie(next);
    const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    router.push(`/${next}${rest === "/" ? "" : rest}`);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Sprache wechseln / Change language"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted"
      >
        <Globe className="h-4.5 w-4.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-36 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={cn(
                "block w-full px-3.5 py-2 text-left text-sm transition-colors hover:bg-surface-muted",
                l === locale ? "text-accent" : "text-foreground"
              )}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
