import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool, convertToModelMessages, stepCountIs, UIMessage } from "ai";
import { z } from "zod";
import { searchProducts } from "@/lib/products";
import { categories } from "@/lib/categories";

const SYSTEM_PROMPT = `Du bist der Shopping-Assistent von NOVA, einem Online-Shop für Technik, Wohnen, Mode, Outdoor und Beauty.

Kategorien: ${categories.filter((c) => c !== "Alle").join(", ")}.

Regeln:
- Antworte kurz, freundlich und auf Deutsch.
- Wenn du Produkte empfiehlst, rufe IMMER zuerst das Tool "recommendProducts" auf. Erfinde niemals Produktnamen, Preise oder Eigenschaften – nutze ausschließlich die Ergebnisse des Tools.
- Wenn keine passenden Produkte gefunden werden, sag das ehrlich und frag nach mehr Details statt etwas zu erfinden.
- Halte Textantworten auf 2-3 Sätze begrenzt; die Produktkarten sprechen für sich.`;

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(3),
    tools: {
      recommendProducts: tool({
        description:
          "Durchsucht den echten Produktkatalog nach passenden Artikeln. Immer verwenden, bevor Produkte empfohlen werden.",
        inputSchema: z.object({
          query: z
            .string()
            .describe(
              "Suchbegriff basierend auf dem Kundenwunsch, z.B. 'leichte Regenjacke' oder 'Kopfhörer'"
            ),
        }),
        execute: async ({ query }) => {
          const results = await searchProducts(query);
          return results.slice(0, 4).map((p) => ({
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
    },
  });

  return result.toUIMessageStreamResponse();
}
