import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, convertToModelMessages, stepCountIs, UIMessage } from "ai";
import { z } from "zod";
import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { products as productsTable } from "@/lib/db/schema";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const catalog = await getAllProducts();
  const catalogListing = catalog
    .map(
      (p) =>
        `- slug: "${p.slug}" | ${p.name} | Kategorie: ${p.category} | ${formatPrice(p.priceCents, p.currency)} | ${p.description}`
    )
    .join("\n");

  const systemPrompt = `Du bist der Einrichtungs-Assistent von NOVA, einem Online-Shop für Möbel und Wohnaccessoires.

Kategorien: ${categories.filter((c) => c !== "Alle").join(", ")}.

Das ist der VOLLSTÄNDIGE Produktkatalog (das einzige, was es im Shop gibt):
${catalogListing}

Regeln:
- Antworte kurz, freundlich und auf Deutsch.
- Nutze dein Sprachverständnis, um Kundenwünsche den passenden Produkten zuzuordnen, auch wenn der Begriff nicht wörtlich vorkommt (z.B. "Wohnzimmertisch" -> Couchtisch, "Kerzen" -> Stumpenkerzen-Set, "Regal" -> gibt es nicht, ehrlich sagen). Erfinde NIEMALS Produkte, die nicht in der Liste oben stehen.
- Wenn du Produkte zeigen willst, rufe IMMER das Tool "showProducts" mit den passenden slugs auf (max. 4). Erfinde niemals Preise oder Eigenschaften – die Karten werden serverseitig mit echten Daten befüllt.
- Wenn nichts passt, sag das ehrlich und frag nach mehr Details, statt etwas zu erfinden oder ein unpassendes Produkt zu zeigen.
- Wenn der Kunde ausdrücklich sagt, dass er ein Produkt kaufen/in den Warenkorb legen möchte (z.B. "leg das in den Warenkorb", "ich nehme die Kopfhörer"), rufe das Tool "addToCart" mit dem passenden slug auf. Frag bei Unklarheit erst nach, welches Produkt gemeint ist.
- Halte Textantworten auf 2-3 Sätze begrenzt; die Produktkarten sprechen für sich.`;

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
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
          return results.map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            priceCents: p.priceCents,
            currency: p.currency,
            image: p.image,
            category: p.category,
            rating: p.rating,
          }));
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
    },
  });

  return result.toUIMessageStreamResponse();
}
