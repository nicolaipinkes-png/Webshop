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
    <div className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted">
      <Globe className="pointer-events-none h-4.5 w-4.5" />
      <select
        value={locale}
        onChange={(e) => switchTo(e.target.value as Locale)}
        aria-label="Sprache wechseln / Change language"
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0 outline-none"
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
