import { config } from "dotenv";
config({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products, reviews } from "./schema";

const client = postgres(process.env.POSTGRES_URL_NON_POOLING!);
const db = drizzle(client);

function unsplash(id: string) {
  return `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
}

const productTranslations: Record<
  string,
  Record<"en" | "fr" | "es", { name: string; description: string }>
> = {
  "1": {
    en: {
      name: "Luna Lounge Sofa",
      description:
        "A curved lounge sofa in heavy velvet that turns any room into a stage. Solid beech frame, removable and washable covers.",
    },
    fr: {
      name: "Canapé Lounge Luna",
      description:
        "Un canapé lounge aux lignes courbes en velours épais qui transforme n’importe quelle pièce en véritable scène. Structure en hêtre massif, housses amovibles et lavables.",
    },
    es: {
      name: "Sofá Lounge Luna",
      description:
        "Un sofá lounge de líneas curvas en terciopelo grueso que convierte cualquier estancia en un escenario. Estructura de haya maciza, fundas desenfundables y lavables.",
    },
  },
  "2": {
    en: {
      name: "Nimbus Table Lamp",
      description:
        "Warm, dimmable light in a minimalist housing of brushed aluminium and oak. Turns any corner into a place to linger.",
    },
    fr: {
      name: "Lampe de table Nimbus",
      description:
        "Une lumière chaude et modulable dans un boîtier minimaliste en aluminium brossé et chêne. Transforme n’importe quel coin en un lieu où l’on aime s’attarder.",
    },
    es: {
      name: "Lámpara de mesa Nimbus",
      description:
        "Luz cálida y regulable en una carcasa minimalista de aluminio cepillado y roble. Convierte cualquier rincón en un lugar donde apetece quedarse.",
    },
  },
  "3": {
    en: {
      name: "Suar Live-Edge Coffee Table",
      description:
        "Every table a one-off: crafted from a single slice of suar wood with visible grain and a live edge.",
    },
    fr: {
      name: "Table basse en tronc de Suar",
      description:
        "Chaque table est une pièce unique, façonnée dans une seule tranche de bois de suar au veinage apparent et au bord brut.",
    },
    es: {
      name: "Mesa de centro de tronco de Suar",
      description:
        "Cada mesa es una pieza única, tallada en una sola loncha de madera de suar con veta visible y borde natural.",
    },
  },
  "4": {
    en: {
      name: "Boaz Sideboard",
      description:
        "Plenty of storage, clean lines: solid mango wood combined with rattan fronts for a warm, natural look in the living or dining room.",
    },
    fr: {
      name: "Buffet Boaz",
      description:
        "Beaucoup de rangement, des lignes épurées : bois de manguier massif associé à des façades en rotin pour une allure chaleureuse et naturelle au salon ou dans la salle à manger.",
    },
    es: {
      name: "Aparador Boaz",
      description:
        "Mucho espacio de almacenaje y líneas depuradas: madera maciza de mango combinada con frentes de ratán para un aspecto cálido y natural en el salón o el comedor.",
    },
  },
  "5": {
    en: {
      name: "Juta Natural Fibre Rug",
      description:
        "Hand-woven from pure jute – robust, durable and with the organic touch that brings warmth to any living room.",
    },
    fr: {
      name: "Tapis en fibres naturelles Juta",
      description:
        "Tissé main en jute pure – robuste, durable, avec cette touche organique qui apporte de la chaleur à tous les salons.",
    },
    es: {
      name: "Alfombra de fibra natural Juta",
      description:
        "Tejida a mano con yute puro: robusta, duradera y con ese toque orgánico que aporta calidez a cualquier salón.",
    },
  },
  "6": {
    en: {
      name: "Terra Vase Set",
      description:
        "Three hand-thrown vases in earthy tones – eye-catching alone or as a trio on a sideboard or dining table.",
    },
    fr: {
      name: "Set de vases Terra",
      description:
        "Trois vases façonnés à la main dans des tons terreux – un vrai point d’accroche, seuls ou en trio, sur un buffet ou une table à manger.",
    },
    es: {
      name: "Set de jarrones Terra",
      description:
        "Tres jarrones de cerámica hechos a mano en tonos tierra: un punto de atención, solos o en trío, sobre un aparador o una mesa de comedor.",
    },
  },
  "7": {
    en: {
      name: "Cascade Cosy Throw",
      description:
        "Extra-soft brushed organic cotton in muted natural tones, machine-washable and pleasantly heavy – your new favourite spot on the sofa.",
    },
    fr: {
      name: "Plaid douillet Cascade",
      description:
        "Coton bio brossé extra-doux dans des tons naturels sourds, lavable en machine et agréablement dense – votre nouvel endroit préféré sur le canapé.",
    },
    es: {
      name: "Manta acogedora Cascade",
      description:
        "Algodón orgánico cepillado extra suave en tonos naturales apagados, lavable a máquina y agradablemente pesado: tu nuevo rincón favorito del sofá.",
    },
  },
  "8": {
    en: {
      name: "Foglia Pillar Candle Set",
      description:
        "Five pillar candles in muted dusty rose, made from plant-based wax – for cosy evenings and atmospheric light.",
    },
    fr: {
      name: "Set de bougies pilier Foglia",
      description:
        "Cinq bougies pilier dans un rose poudré discret, en cire végétale – pour des soirées cosy et une lumière pleine d’ambiance.",
    },
    es: {
      name: "Set de velas gruesas Foglia",
      description:
        "Cinco velas gruesas en un rosa empolvado discreto, elaboradas con cera vegetal, para veladas acogedoras y una luz llena de ambiente.",
    },
  },
  "9": {
    en: {
      name: "Rubino Cocktail Chair",
      description:
        "A statement chair in rich velvet red with slender metal legs – for anyone who isn't afraid of colour.",
    },
    fr: {
      name: "Fauteuil cocktail Rubino",
      description:
        "Un fauteuil qui a du caractère, en velours rouge profond avec des pieds métalliques fins – pour celles et ceux qui n’ont pas peur de la couleur.",
    },
    es: {
      name: "Sillón cóctel Rubino",
      description:
        "Un sillón con carácter en terciopelo rojo intenso con patas metálicas finas: para quienes no temen al color.",
    },
  },
  "10": {
    en: {
      name: "Arco Arc Lamp",
      description:
        "The overhanging arc lamp casts precise light above the sofa or dining table – a striking eye-catcher included.",
    },
    fr: {
      name: "Lampadaire arc Arco",
      description:
        "Le lampadaire arqué en surplomb diffuse une lumière ciblée au-dessus du canapé ou de la table à manger – un point d’accroche visuel garanti.",
    },
    es: {
      name: "Lámpara de arco Arco",
      description:
        "La lámpara de arco en voladizo proyecta una luz precisa sobre el sofá o la mesa de comedor: un llamativo punto focal incluido.",
    },
  },
};

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
    images: [
      unsplash("photo-1541085929911-dea736e9287b"),
      unsplash("photo-1571164860029-856acbc24b4a"),
    ],
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
    images: [
      unsplash("photo-1592195985871-2d326ada5d51"),
      unsplash("photo-1582737068804-2e7d18036fe7"),
    ],
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
    images: [
      unsplash("photo-1559662780-33af019fd570"),
      unsplash("photo-1584280795027-321f4d68e77b"),
    ],
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
    images: [
      unsplash("photo-1727819584099-772894afd8e9"),
      unsplash("photo-1644410960965-0a43b7358f70"),
    ],
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
    images: [
      unsplash("photo-1674475760738-8c7af859f821"),
      unsplash("photo-1605191353027-d21e534a419a"),
    ],
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
    images: [
      unsplash("photo-1572853566597-b83cde546912"),
      unsplash("photo-1633000116322-d7f5cb7d3ebb"),
    ],
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
    images: [
      unsplash("photo-1693382464215-2b9d3ad53086"),
      unsplash("photo-1674475762498-75310193b4f4"),
    ],
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
    images: [
      unsplash("photo-1613424777445-f93a2a48e285"),
      unsplash("photo-1665512594386-051aad8b9f68"),
    ],
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
    images: [
      unsplash("photo-1779105120112-923991ccf483"),
      unsplash("photo-1710888451601-9885aeb8afe2"),
    ],
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
    images: [
      unsplash("photo-1667312939978-64cf31718a6e"),
      unsplash("photo-1642689703534-e41f29622078"),
    ],
    badge: null,
    rating: 4.4,
    reviewCount: 27,
  },
];

const reviewData: Record<string, { authorName: string; rating: number; comment: string }[]> = {
  "1": [
    { authorName: "Meike H.", rating: 5, comment: "Der Samtbezug ist wirklich hochwertig und die Farbe genau wie auf den Fotos. Sitzt sich super gemütlich." },
    { authorName: "Jonas R.", rating: 5, comment: "Aufbau war unkompliziert, das Sofa ist ein echter Hingucker im Wohnzimmer geworden." },
    { authorName: "Corinna B.", rating: 4, comment: "Schönes Sofa, allerdings etwas fester als erwartet. Nach ein paar Wochen sitzt es sich besser ein." },
  ],
  "2": [
    { authorName: "Tobias K.", rating: 5, comment: "Warmes, gemütliches Licht und lässt sich stufenlos dimmen. Genau das, was ich gesucht habe." },
    { authorName: "Anna-Lena S.", rating: 4, comment: "Schlichtes Design, passt gut ins Schlafzimmer. Kabel könnte etwas länger sein." },
    { authorName: "Felix M.", rating: 4, comment: "Solide verarbeitet, guter Preis für die Qualität." },
  ],
  "3": [
    { authorName: "Sabine W.", rating: 5, comment: "Wirklich jedes Stück ein Unikat – die Maserung bei meinem Tisch ist wunderschön." },
    { authorName: "Daniel P.", rating: 5, comment: "Sehr massiv und schwer, top Verarbeitung. Genau das Statement-Stück für unser Wohnzimmer." },
    { authorName: "Julia F.", rating: 4, comment: "Toller Tisch, Lieferung hat etwas länger gedauert als angegeben." },
  ],
  "4": [
    { authorName: "Markus L.", rating: 5, comment: "Viel Stauraum und die Rattan-Fronten sehen live noch schöner aus als auf den Bildern." },
    { authorName: "Petra N.", rating: 4, comment: "Schönes Sideboard, der Aufbau hat etwas gedauert, aber das Ergebnis überzeugt." },
    { authorName: "Simon T.", rating: 4, comment: "Gute Qualität für den Preis, würde ich wieder kaufen." },
  ],
  "5": [
    { authorName: "Nadine G.", rating: 5, comment: "Robuster Naturfaser-Teppich, der auch bei uns mit zwei Kindern gut mitmacht." },
    { authorName: "Christian E.", rating: 5, comment: "Bringt genau die Wärme ins Wohnzimmer, die ich mir vorgestellt habe." },
    { authorName: "Lea D.", rating: 4, comment: "Schöne Optik, kratzt anfangs etwas, wird aber mit der Zeit weicher." },
  ],
  "6": [
    { authorName: "Vanessa O.", rating: 5, comment: "Die drei Vasen wirken zusammen richtig edel auf unserem Sideboard." },
    { authorName: "Michael A.", rating: 5, comment: "Handgetöpfert und man sieht die kleinen Unregelmäßigkeiten – genau das macht den Charme aus." },
    { authorName: "Katrin U.", rating: 4, comment: "Schönes Set, eine Vase kam mit einem winzigen Farbfleck an, war aber kein Problem beim Umtausch." },
  ],
  "7": [
    { authorName: "Stefan Z.", rating: 5, comment: "Unglaublich weich und trotzdem angenehm schwer. Liegt jetzt dauerhaft auf dem Sofa." },
    { authorName: "Bianca R.", rating: 5, comment: "Übersteht die Waschmaschine ohne Probleme und bleibt so flauschig wie am ersten Tag." },
    { authorName: "Oliver H.", rating: 5, comment: "Tolle Farbe, sehr hochwertige Baumwolle." },
  ],
  "8": [
    { authorName: "Carina M.", rating: 5, comment: "Wunderschöne Altrosa-Töne und angenehmer, dezenter Duft beim Abbrennen." },
    { authorName: "Patrick S.", rating: 4, comment: "Brennen gleichmäßig ab, für gemütliche Abende genau richtig." },
    { authorName: "Julia K.", rating: 5, comment: "Fünf Kerzen für den Preis sind ein faires Angebot, Farbe wie abgebildet." },
  ],
  "9": [
    { authorName: "Robert F.", rating: 5, comment: "Der Sessel setzt wirklich ein Statement – genau die Farbe, die ich gesucht habe." },
    { authorName: "Susanne V.", rating: 4, comment: "Sehr bequem, die Metallbeine wirken hochwertig und stabil." },
    { authorName: "Timo B.", rating: 4, comment: "Schöner Sessel, für sehr große Personen etwas knapp geschnitten." },
  ],
  "10": [
    { authorName: "Isabel C.", rating: 4, comment: "Setzt tolles, punktgenaues Licht über unserem Esstisch, sehr markantes Design." },
    { authorName: "Andreas W.", rating: 5, comment: "Der Standfuß ist überraschend stabil trotz der weiten Bogenform." },
    { authorName: "Melanie J.", rating: 4, comment: "Aufbau war etwas fummelig, das Ergebnis ist aber jeden Handgriff wert." },
  ],
};

async function main() {
  const base = new Date("2026-01-01T00:00:00Z").getTime();

  for (const [index, product] of data.entries()) {
    const withTimestamp = {
      ...product,
      translations: productTranslations[product.id] ?? null,
      createdAt: new Date(base + index * 60_000),
    };
    await db
      .insert(products)
      .values(withTimestamp)
      .onConflictDoUpdate({ target: products.id, set: withTimestamp });
  }
  console.log(`Seeded/updated ${data.length} products.`);

  for (const [productId, productReviews] of Object.entries(reviewData)) {
    for (const [index, review] of productReviews.entries()) {
      await db
        .insert(reviews)
        .values({
          id: `seed-${productId}-${index}`,
          productId,
          ...review,
          createdAt: new Date(base + index * 60_000),
        })
        .onConflictDoUpdate({
          target: reviews.id,
          set: review,
        });
    }

    const avg =
      productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
    await db
      .update(products)
      .set({ rating: Math.round(avg * 10) / 10, reviewCount: productReviews.length })
      .where(eq(products.id, productId));
  }
  console.log(`Seeded reviews and refreshed rating aggregates.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
