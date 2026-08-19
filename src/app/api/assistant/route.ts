import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, convertToModelMessages, stepCountIs, UIMessage } from "ai";
import { z } from "zod";
import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { getAllProducts } from "@/lib/products";
import { findOrders } from "@/lib/orders";
import { categories } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";
import { localizeProduct } from "@/lib/product-i18n";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";

const languageNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  es: "Español",
};

export async function POST(request: Request) {
  const body = await request.json();
  const { messages }: { messages: UIMessage[] } = body;
  const rawLocale = String(body.locale ?? "");
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const catalog = await getAllProducts();
  const catalogListing = catalog
    .map((p) => {
      const localized = localizeProduct(p, locale);
      return `- slug: "${p.slug}" | ${localized.name} | Kategorie: ${p.category} | ${formatPrice(p.priceCents, p.currency)} | ${localized.description}`;
    })
    .join("\n");

  const systemPrompt = `Du bist der Einrichtungs-Assistent von NOVA, einem Online-Shop für Möbel und Wohnaccessoires.

Kategorien: ${categories.filter((c) => c !== "Alle").join(", ")}.

Das ist der VOLLSTÄNDIGE Produktkatalog (das einzige, was es im Shop gibt):
${catalogListing}

Regeln:
- Antworte IMMER auf ${languageNames[locale]} (Sprachcode: ${locale}), unabhängig von der Sprache dieser Systemanweisung. Halte den Ton kurz und freundlich.
- Nutze dein Sprachverständnis, um Kundenwünsche den passenden Produkten zuzuordnen, auch wenn der Begriff nicht wörtlich vorkommt und selbst wenn die Anfrage in einer anderen Sprache gestellt wird (z.B. "Wohnzimmertisch"/"coffee table" -> Couchtisch, "Kerzen"/"candles" -> Stumpenkerzen-Set, "Regal"/"shelf" -> gibt es nicht, ehrlich sagen). Erfinde NIEMALS Produkte, die nicht in der Liste oben stehen.
- Wenn du Produkte zeigen willst, rufe IMMER das Tool "showProducts" mit den passenden slugs auf (max. 4). Erfinde niemals Preise oder Eigenschaften – die Karten werden serverseitig mit echten Daten befüllt.
- Wenn nichts passt, sag das ehrlich und frag nach mehr Details, statt etwas zu erfinden oder ein unpassendes Produkt zu zeigen.
- Wenn der Kunde ausdrücklich sagt, dass er ein Produkt kaufen/in den Warenkorb legen möchte (z.B. "leg das in den Warenkorb", "add that to my cart"), rufe das Tool "addToCart" mit dem passenden slug auf. Frag bei Unklarheit erst nach, welches Produkt gemeint ist.
- Wenn der Kunde nach dem Status oder Verbleib einer Bestellung fragt (z.B. "Wo ist meine Bestellung?", "Where is my order?"), rufe das Tool "checkOrderStatus" auf. Frag zuerst nach der Bestellnummer (aus der Bestätigungs-E-Mail) oder der E-Mail-Adresse, falls noch keine von beidem im Gespräch genannt wurde. Erfinde niemals einen Bestellstatus – nutze ausschließlich die Daten aus dem Tool-Ergebnis.
- Halte Textantworten auf 2-3 Sätze begrenzt; die Produktkarten sprechen für sich.`;

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    providerOptions: {
      anthropic: { thinking: { type: "disabled" } },
    },
    tools: {
      showProducts: tool({
        description:
          "Zeigt Produkte als Karten im Chat an, ausgewählt per slug aus dem Katalog im System-Prompt.",
        inputSchema: z.object({
          slugs: z
            .array(z.string())
            .min(1)
            .max(4)
            .describe("Slugs der passenden Produkte aus dem Katalog"),
        }),
        execute: async ({ slugs }) => {
          const results = await db
            .select()
            .from(productsTable)
            .where(inArray(productsTable.slug, slugs));
          return results.map((p) => {
            const localized = localizeProduct(p, locale);
            return {
              id: p.id,
              slug: p.slug,
              name: localized.name,
              priceCents: p.priceCents,
              currency: p.currency,
              image: p.image,
              category: p.category,
              rating: p.rating,
            };
          });
        },
      }),
      addToCart: tool({
        description:
          "Legt ein Produkt in den Warenkorb des Kunden. Nur aufrufen, wenn der Kunde ausdrücklich einen Kauf/das Hinzufügen wünscht.",
        inputSchema: z.object({
          slug: z.string().describe("Slug des Produkts aus dem Katalog"),
          quantity: z.number().int().min(1).max(10).default(1),
        }),
      }),
      checkOrderStatus: tool({
        description:
          "Sucht den Status einer Bestellung anhand der Bestellnummer und/oder E-Mail-Adresse.",
        inputSchema: z.object({
          orderId: z
            .string()
            .optional()
            .describe("Die Bestellnummer aus der Bestätigungs-E-Mail"),
          email: z
            .string()
            .optional()
            .describe("Die E-Mail-Adresse, mit der bestellt wurde"),
        }),
        execute: async ({ orderId, email }) => {
          if (!orderId && !email) {
            return { found: false as const };
          }
          const results = await findOrders({ orderId, email });
          if (results.length === 0) {
            return { found: false as const };
          }
          return { found: true as const, orders: results };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
