"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/locale-context";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "/";
    router.push(`/${next}${rest === "/" ? "" : rest}`);
  }

  return (
    <div className="relative flex items-center">
      <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-foreground/50" />
      <select
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        aria-label="Sprache wechseln / Change language"
        className="h-9 appearance-none rounded-full border border-border bg-background pl-8 pr-3 text-xs outline-none focus:border-accent"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
