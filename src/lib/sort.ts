export const sortLabels = {
  empfehlung: "Empfehlung",
  "preis-auf": "Preis: aufsteigend",
  "preis-ab": "Preis: absteigend",
  bewertung: "Beste Bewertung",
} as const;

export type SortKey = keyof typeof sortLabels;

export function isSortKey(value: unknown): value is SortKey {
  return typeof value === "string" && value in sortLabels;
}
