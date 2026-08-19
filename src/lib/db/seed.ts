import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products } from "./schema";

const client = postgres(process.env.POSTGRES_URL_NON_POOLING!);
const db = drizzle(client);

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
}

const data: (typeof products.$inferInsert)[] = [
  {
    id: "1",
    slug: "aurora-kopfhoerer",
    name: "Aurora Wireless-Kopfhörer",
    description:
      "Aktives Noise Cancelling, 40 Stunden Akkulaufzeit und ein satter, räumlicher Klang – für konzentriertes Arbeiten genauso wie für laute Städte. Präzise verarbeitet, angenehm leicht auf dem Kopf.",
    priceCents: 24900,
    currency: "EUR",
    category: "Technik",
    image: unsplash("photo-1505740420928-5e560c06d30e"),
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 328,
  },
  {
    id: "2",
    slug: "nimbus-tischleuchte",
    name: "Nimbus Tischleuchte",
    description:
      "Warmes, dimmbares Licht in einem minimalistischen Gehäuse aus gebürstetem Aluminium und Eichenholz. Verwandelt jede Ecke in einen Ort zum Verweilen.",
    priceCents: 8900,
    currency: "EUR",
    category: "Wohnen",
    image: unsplash("photo-1517991104123-1d56a6e81ed9"),
    badge: null,
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: "3",
    slug: "terra-rucksack",
    name: "Terra Tagesrucksack",
    description:
      "Wasserabweisendes Recycling-Material, ein gepolstertes 15-Zoll-Laptopfach und ein ergonomisches Tragesystem, das sich an deinen Rücken anpasst – für Pendelweg und Wochenendtrip gleichermaßen.",
    priceCents: 6900,
    currency: "EUR",
    category: "Outdoor",
    image: unsplash("photo-1553062407-98eeb64c6a62"),
    badge: "new",
    rating: 4.8,
    reviewCount: 204,
  },
  {
    id: "4",
    slug: "flow-sneaker",
    name: "Flow Sneaker",
    description:
      "Handgefertigt aus recyceltem Canvas, mit responsiver Dämpfung und einer Silhouette, die zu jedem Outfit passt. Leicht genug, um den ganzen Tag vergessen zu werden.",
    priceCents: 11900,
    currency: "EUR",
    category: "Mode",
    image: unsplash("photo-1525966222134-fcfa99b8ae77"),
    badge: null,
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: "5",
    slug: "pure-pflegeset",
    name: "Pure Pflegeset",
    description:
      "Eine vegane Drei-Schritte-Routine mit Vitamin-C-Serum, Feuchtigkeitscreme und sanftem Reinigungsgel – klinisch getestet, ohne Mikroplastik, in nachfüllbaren Flaschen.",
    priceCents: 4900,
    currency: "EUR",
    category: "Beauty",
    image: unsplash("photo-1571781926291-c477ebfd024b"),
    badge: "sale",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "6",
    slug: "sol-smartwatch",
    name: "Sol Smartwatch",
    description:
      "Herzfrequenz, Schlaf und über 40 Sportarten im Blick, bis zu 10 Tage Akkulaufzeit und ein Always-on-Display, das auch bei Sonnenlicht gestochen scharf bleibt.",
    priceCents: 17900,
    currency: "EUR",
    category: "Technik",
    image: unsplash("photo-1508685096489-7aacd43bd3b1"),
    badge: null,
    rating: 4.3,
    reviewCount: 271,
  },
  {
    id: "7",
    slug: "cascade-decke",
    name: "Cascade Kuscheldecke",
    description:
      "Extra weich gebürstete Bio-Baumwolle in gedeckten Naturtönen, waschmaschinenfest und angenehm schwer – dein neuer Lieblingsplatz auf dem Sofa.",
    priceCents: 3900,
    currency: "EUR",
    category: "Wohnen",
    image: unsplash("photo-1600369672770-985fd30004eb"),
    badge: null,
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: "8",
    slug: "trail-jacke",
    name: "Trail Regenjacke",
    description:
      "Winddicht, atmungsaktiv und mit vollständig verschweißten Nähten für Regionen, in denen sich das Wetter im Minutentakt ändert. Verstaut sich in der eigenen Tasche.",
    priceCents: 15900,
    currency: "EUR",
    category: "Outdoor",
    image: unsplash("photo-1567955465154-078c60ff5c9e"),
    badge: null,
    rating: 4.6,
    reviewCount: 143,
  },
];

async function main() {
  const base = new Date("2026-01-01T00:00:00Z").getTime();

  for (const [index, product] of data.entries()) {
    const withTimestamp = { ...product, createdAt: new Date(base + index * 60_000) };
    await db
      .insert(products)
      .values(withTimestamp)
      .onConflictDoUpdate({ target: products.id, set: withTimestamp });
  }
  console.log(`Seeded/updated ${data.length} products.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
