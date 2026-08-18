import { Product } from "./types";

export const categories = [
  "Alle",
  "Technik",
  "Wohnen",
  "Mode",
  "Outdoor",
  "Beauty",
] as const;

export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-kopfhoerer",
    name: "Aurora Wireless-Kopfhörer",
    description:
      "Aktives Noise Cancelling, 40h Akkulaufzeit und räumlicher Klang für den Alltag.",
    priceCents: 24900,
    currency: "EUR",
    category: "Technik",
    image: "from-indigo-500 to-purple-600",
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 328,
  },
  {
    id: "2",
    slug: "nimbus-tischleuchte",
    name: "Nimbus Tischleuchte",
    description:
      "Dimmbare LED-Leuchte mit warmweißem Licht und minimalistischem Aluminiumgehäuse.",
    priceCents: 8900,
    currency: "EUR",
    category: "Wohnen",
    image: "from-amber-400 to-orange-500",
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: "3",
    slug: "terra-rucksack",
    name: "Terra Tagesrucksack",
    description:
      "Wasserabweisendes Material, gepolstertes Laptopfach und ergonomisches Tragesystem.",
    priceCents: 6900,
    currency: "EUR",
    category: "Outdoor",
    image: "from-emerald-500 to-teal-600",
    badge: "new",
    rating: 4.8,
    reviewCount: 204,
  },
  {
    id: "4",
    slug: "flow-sneaker",
    name: "Flow Sneaker",
    description:
      "Leichter Alltagssneaker aus recyceltem Mesh mit responsiver Dämpfung.",
    priceCents: 11900,
    currency: "EUR",
    category: "Mode",
    image: "from-rose-400 to-pink-600",
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: "5",
    slug: "pure-pflegeset",
    name: "Pure Pflegeset",
    description:
      "Vegane Gesichtspflege-Routine mit Vitamin C Serum und Feuchtigkeitscreme.",
    priceCents: 4900,
    currency: "EUR",
    category: "Beauty",
    image: "from-fuchsia-400 to-purple-500",
    badge: "sale",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "6",
    slug: "sol-smartwatch",
    name: "Sol Smartwatch",
    description:
      "Fitness-Tracking, Herzfrequenzmessung und bis zu 10 Tage Akkulaufzeit.",
    priceCents: 17900,
    currency: "EUR",
    category: "Technik",
    image: "from-sky-500 to-blue-600",
    rating: 4.3,
    reviewCount: 271,
  },
  {
    id: "7",
    slug: "cascade-decke",
    name: "Cascade Kuscheldecke",
    description:
      "Extra weiche Wohndecke aus recycelter Baumwolle, waschmaschinenfest.",
    priceCents: 3900,
    currency: "EUR",
    category: "Wohnen",
    image: "from-stone-400 to-neutral-600",
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: "8",
    slug: "trail-jacke",
    name: "Trail Regenjacke",
    description:
      "Winddicht, atmungsaktiv und vollständig verschweißte Nähte für jedes Wetter.",
    priceCents: 15900,
    currency: "EUR",
    category: "Outdoor",
    image: "from-cyan-500 to-emerald-500",
    rating: 4.6,
    reviewCount: 143,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
