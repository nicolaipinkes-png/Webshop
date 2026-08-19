"use client";

import { useDictionary } from "@/lib/i18n/locale-context";
import { Link } from "./i18n-link";

export function Footer() {
  const dict = useDictionary();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-serif text-xl font-medium tracking-tight">
              NOVA<span className="text-accent">.</span>
            </h4>
            <p className="mt-2 text-sm text-foreground/60">{dict.footer.tagline}</p>
          </div>
          <div>
            <h5 className="text-sm font-medium">{dict.footer.shop}</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/products" className="hover:text-foreground">{dict.footer.allProducts}</Link></li>
              <li><Link href="/search" className="hover:text-foreground">{dict.footer.search}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium">{dict.footer.company}</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/impressum" className="hover:text-foreground">{dict.footer.impressum}</Link></li>
              <li><Link href="/datenschutz" className="hover:text-foreground">{dict.footer.datenschutz}</Link></li>
              <li><Link href="/agb" className="hover:text-foreground">{dict.footer.agb}</Link></li>
              <li><Link href="/widerrufsrecht" className="hover:text-foreground">{dict.footer.widerrufsrecht}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium">{dict.footer.support}</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/kontakt" className="hover:text-foreground">{dict.footer.kontakt}</Link></li>
              <li><Link href="/versand" className="hover:text-foreground">{dict.footer.versand}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-foreground/50">
          © {new Date().getFullYear()} NOVA. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
