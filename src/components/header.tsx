"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Sparkles, Menu, X } from "lucide-react";
import { useCartStore, cartItemCount } from "@/lib/cart-store";
import { categories } from "@/lib/categories";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.open);
  const count = cartItemCount(items);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <button
            className="p-2 -ml-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü umschalten"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="font-serif text-xl font-medium tracking-tight">
            NOVA<span className="text-accent">.</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {categories.map((c) => (
              <Link
                key={c}
                href={c === "Alle" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted"
            aria-label="Suchen"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-accent transition-colors hover:bg-surface-muted"
            aria-label="KI-Assistent öffnen"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
          >
            <Sparkles className="h-4.5 w-4.5" />
          </button>
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-surface-muted"
            aria-label="Warenkorb öffnen"
            onClick={openCart}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {categories.map((c) => (
            <Link
              key={c}
              href={c === "Alle" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
              className="rounded-md px-2 py-2 text-sm text-foreground/80 hover:bg-surface-muted"
              onClick={() => setMenuOpen(false)}
            >
              {c}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
