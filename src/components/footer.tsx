import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="font-serif text-xl font-medium tracking-tight">
              NOVA<span className="text-accent">.</span>
            </h4>
            <p className="mt-2 text-sm text-foreground/60">
              Modernes Einkaufen, kuratiert mit KI.
            </p>
          </div>
          <div>
            <h5 className="text-sm font-medium">Shop</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/products" className="hover:text-foreground">Alle Produkte</Link></li>
              <li><Link href="/search" className="hover:text-foreground">Suche</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium">Unternehmen</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/impressum" className="hover:text-foreground">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-foreground">AGB</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium">Support</h5>
            <ul className="mt-3 space-y-2 text-sm text-foreground/60">
              <li><Link href="/kontakt" className="hover:text-foreground">Kontakt</Link></li>
              <li><Link href="/versand" className="hover:text-foreground">Versand & Rückgabe</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-foreground/50">
          © {new Date().getFullYear()} NOVA. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
