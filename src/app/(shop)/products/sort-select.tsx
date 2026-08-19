"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { sortLabels, SortKey } from "@/lib/sort";

export function SortSelect({ active }: { active: SortKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "empfehlung") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <select
      value={active}
      onChange={(e) => handleChange(e.target.value)}
      className="h-9 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent"
      aria-label="Sortieren nach"
    >
      {Object.entries(sortLabels).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
