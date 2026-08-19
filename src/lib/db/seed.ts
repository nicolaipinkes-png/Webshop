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
    slug: "luna-loungesofa",
    name: "Luna Loungesofa",
    description:
      "Ein geschwungenes Loungesofa aus schwerem Samt, das jeden Raum zur Bühne macht. Gestell aus massivem Buchenholz, herausnehmbare und waschbare Bezüge.",
    priceCents: 179900,
    currency: "EUR",
    category: "Sofas",
    image: unsplash("photo-1768946131549-f03cafef7bc1"),
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 96,
  },
  {
    id: "2",
    slug: "nimbus-tischleuchte",
    name: "Nimbus Tischleuchte",
    description:
      "Warmes, dimmbares Licht in einem minimalistischen Gehäuse aus gebürstetem Aluminium und Eichenholz. Verwandelt jede Ecke in einen Ort zum Verweilen.",
    priceCents: 8900,
    currency: "EUR",
    category: "Beleuchtung",
    image: unsplash("photo-1517991104123-1d56a6e81ed9"),
    badge: null,
    rating: 4.5,
    reviewCount: 112,
  },
  {
    id: "3",
    slug: "suar-baumstamm-couchtisch",
    name: "Suar Baumstamm-Couchtisch",
    description:
      "Jeder Tisch ein Unikat: gefertigt aus einer einzigen Suarholz-Baumscheibe mit sichtbarer Maserung und lebendiger Kante.",
    priceCents: 34900,
    currency: "EUR",
    category: "Möbel",
    image: unsplash("photo-1566921895456-1cee64031c33"),
    badge: "new",
    rating: 4.9,
    reviewCount: 58,
  },
  {
    id: "4",
    slug: "boaz-sideboard",
    name: "Boaz Sideboard",
    description:
      "Viel Stauraum, klare Linien: Mango-Massivholz kombiniert mit Rattan-Fronten für einen warmen, natürlichen Look im Wohn- oder Esszimmer.",
    priceCents: 39900,
    currency: "EUR",
    category: "Möbel",
    image: unsplash("photo-1563371557-d98db5294563"),
    badge: "sale",
    rating: 4.5,
    reviewCount: 73,
  },
  {
    id: "5",
    slug: "juta-naturfaser-teppich",
    name: "Juta Naturfaser-Teppich",
    description:
      "Handgewebt aus reiner Jute – robust, langlebig und mit dem organischen Touch, der jedem Wohnzimmer Wärme gibt.",
    priceCents: 17900,
    currency: "EUR",
    category: "Textilien",
    image: unsplash("photo-1583847268964-b28dc8f51f92"),
    badge: "bestseller",
    rating: 4.7,
    reviewCount: 134,
  },
  {
    id: "6",
    slug: "terra-vasen-set",
    name: "Terra Vasen-Set",
    description:
      "Drei handgetöpferte Vasen in erdigen Tönen – einzeln oder als Trio ein Blickfang auf Sideboard oder Esstisch.",
    priceCents: 5900,
    currency: "EUR",
    category: "Deko",
    image: unsplash("photo-1631125915597-adf46a94e436"),
    badge: "new",
    rating: 4.8,
    reviewCount: 45,
  },
  {
    id: "7",
    slug: "cascade-decke",
    name: "Cascade Kuscheldecke",
    description:
      "Extra weich gebürstete Bio-Baumwolle in gedeckten Naturtönen, waschmaschinenfest und angenehm schwer – dein neuer Lieblingsplatz auf dem Sofa.",
    priceCents: 3900,
    currency: "EUR",
    category: "Textilien",
    image: unsplash("photo-1600369672770-985fd30004eb"),
    badge: null,
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: "8",
    slug: "foglia-stumpenkerzen-set",
    name: "Foglia Stumpenkerzen-Set",
    description:
      "Fünf Stumpenkerzen in gedecktem Altrosa, aus pflanzlichem Wachs – für gemütliche Abende und stimmungsvolles Licht.",
    priceCents: 2900,
    currency: "EUR",
    category: "Deko",
    image: unsplash("photo-1603005674328-5123ec30fc53"),
    badge: null,
    rating: 4.6,
    reviewCount: 88,
  },
  {
    id: "9",
    slug: "rubino-cocktailsessel",
    name: "Rubino Cocktailsessel",
    description:
      "Ein Statement-Sessel in sattem Samtrot mit schlanken Metallbeinen – für alle, die vor Farbe nicht zurückschrecken.",
    priceCents: 44900,
    currency: "EUR",
    category: "Sofas",
    image: unsplash("photo-1617582907226-c49e2d8200d9"),
    badge: "new",
    rating: 4.6,
    reviewCount: 41,
  },
  {
    id: "10",
    slug: "arco-bogenleuchte",
    name: "Arco Bogenleuchte",
    description:
      "Die überhängende Bogenleuchte spendet punktgenaues Licht über dem Sofa oder Esstisch – markanter Blickfang inklusive.",
    priceCents: 24900,
    currency: "EUR",
    category: "Beleuchtung",
    image: unsplash("photo-1761864293821-033e75c1eba3"),
    badge: null,
    rating: 4.4,
    reviewCount: 27,
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
