"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Sparkles, X, Send, Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/cart-store";
import { ProductImage } from "./product-image";

type RecommendedProduct = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  image: string;
  category: string;
  rating: number;
};

export function AiAssistant({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const { messages, sendMessage, status, addToolResult } = useChat({
    transport: new DefaultChatTransport({ api: "/api/assistant" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName !== "addToCart") return;
      const { slug, quantity } = toolCall.input as {
        slug: string;
        quantity: number;
      };
      const product = products.find((p) => p.slug === slug);
      if (!product) {
        addToolResult({
          tool: "addToCart",
          toolCallId: toolCall.toolCallId,
          state: "output-error",
          errorText: "Produkt nicht gefunden.",
        });
        return;
      }
      for (let i = 0; i < quantity; i++) addItem(product);
      addToolResult({
        tool: "addToCart",
        toolCallId: toolCall.toolCallId,
        output: { name: product.name, quantity },
      });
    },
  });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-ai-assistant", handler);
    return () => window.removeEventListener("open-ai-assistant", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const pending = status === "submitted" || status === "streaming";

  function send() {
    const text = input.trim();
    if (!text || pending) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105",
          open && "scale-0"
        )}
        aria-label="KI-Assistent öffnen"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-[32rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl transition-all",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Shopping-Assistent</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Schließen" className="rounded-full p-1 hover:bg-surface-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
          <div className="max-w-[85%] rounded-2xl bg-surface-muted px-3.5 py-2 text-sm leading-relaxed text-foreground">
            Hi! Ich bin dein Shopping-Assistent. Beschreib mir, wonach du suchst — z.B. &quot;eine leichte Jacke für Herbstwanderungen&quot; — und ich helfe dir bei der Auswahl. Sag einfach &quot;leg das in den Warenkorb&quot;, wenn du etwas kaufen willst.
          </div>

          {messages.map((m) => (
            <div key={m.id} className={cn("space-y-2", m.role === "user" && "flex flex-col items-end")}>
              {m.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                        m.role === "user"
                          ? "ml-auto bg-accent text-accent-foreground"
                          : "bg-surface-muted text-foreground"
                      )}
                    >
                      {part.text}
                    </div>
                  );
                }
                if (part.type === "tool-showProducts" && part.state === "output-available") {
                  const products = part.output as RecommendedProduct[];
                  if (products.length === 0) return null;
                  return (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      {products.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="rounded-xl border border-border p-2 transition-colors hover:border-accent"
                        >
                          <ProductImage src={p.image} alt={p.name} className="aspect-square w-full" sizes="140px" />
                          <p className="mt-1.5 line-clamp-1 text-xs font-medium">{p.name}</p>
                          <div className="mt-0.5 flex items-center justify-between">
                            <span className="flex items-center gap-0.5 text-[10px] text-foreground/60">
                              <Star className="h-2.5 w-2.5 fill-current text-amber-500" />
                              {p.rating}
                            </span>
                            <span className="text-xs font-semibold">
                              {formatPrice(p.priceCents, p.currency)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                }
                if (part.type === "tool-addToCart" && part.state === "output-available") {
                  const output = part.output as { name: string; quantity: number };
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-2xl bg-surface-muted px-3.5 py-2 text-sm text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      {output.quantity}× {output.name} in den Warenkorb gelegt
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {pending && (
            <div className="w-fit rounded-2xl bg-surface-muted px-3.5 py-2 text-sm text-foreground/50">
              …
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-border p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Frag nach einer Empfehlung…"
            className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-accent"
          />
          <button
            onClick={send}
            disabled={pending}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground disabled:opacity-50"
            aria-label="Senden"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
