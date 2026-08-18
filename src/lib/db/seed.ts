import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products } from "./schema";

const client = postgres(process.env.POSTGRES_URL_NON_POOLING!);
const db = drizzle(client);

const data: (typeof products.$inferInsert)[] = [
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
    rating: 4.6,
    reviewCount: 143,
  },
];

async function main() {
  await db.insert(products).values(data).onConflictDoNothing();
  console.log(`Seeded ${data.length} products.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
