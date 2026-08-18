"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const INITIAL: Message = {
  role: "assistant",
  content:
    "Hi! Ich bin dein Shopping-Assistent. Beschreib mir, wonach du suchst — z.B. \"eine leichte Jacke für Herbstwanderungen unter 100€\" — und ich helfe dir bei der Auswahl.",
};

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-ai-assistant", handler);
    return () => window.removeEventListener("open-ai-assistant", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || pending) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setPending(true);

    // TODO: replace with a real call to /api/assistant once an LLM backend is wired up
    await new Promise((r) => setTimeout(r, 600));
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content:
          "Diese Antwort ist aktuell simuliert — sobald die KI-API angebunden ist, bekommst du hier echte, produktbasierte Empfehlungen.",
      },
    ]);
    setPending(false);
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
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "ml-auto bg-accent text-accent-foreground"
                  : "bg-surface-muted text-foreground"
              )}
            >
              {m.content}
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
