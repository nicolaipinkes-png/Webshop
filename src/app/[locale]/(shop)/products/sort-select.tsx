"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SortKey } from "@/lib/sort";
import { useDictionary, useLocale } from "@/lib/i18n/locale-context";

export function SortSelect({ active }: { active: SortKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dict = useDictionary();
  const locale = useLocale();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "empfehlung") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/${locale}/products?${params.toString()}`);
  }

  return (
    <select
      value={active}
      onChange={(e) => handleChange(e.target.value)}
      className="h-9 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent"
      aria-label={dict.sort.empfehlung}
    >
      {(Object.keys(dict.sort) as SortKey[]).map((key) => (
        <option key={key} value={key}>
          {dict.sort[key]}
        </option>
      ))}
    </select>
  );
}
