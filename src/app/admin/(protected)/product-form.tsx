"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/categories";
import { Product } from "@/lib/types";

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (formData: FormData) => void;
}) {
  return (
    <div>
      <Link href="/admin" className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Zurück
      </Link>

      <h1 className="mt-4 text-2xl font-medium tracking-tight">
        {product ? "Produkt bearbeiten" : "Neues Produkt"}
      </h1>

      <form action={action} className="mt-8 max-w-xl space-y-5">
        {product && <input type="hidden" name="id" value={product.id} />}

        <Field label="Name">
          <input name="name" required defaultValue={product?.name} className="input" />
        </Field>

        <Field label="Slug (URL)">
          <input name="slug" required defaultValue={product?.slug} className="input" />
        </Field>

        <Field label="Beschreibung">
          <textarea
            name="description"
            required
            rows={3}
            defaultValue={product?.description}
            className="input resize-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Preis (€)">
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              defaultValue={product ? (product.priceCents / 100).toFixed(2) : undefined}
              className="input"
            />
          </Field>
          <Field label="Kategorie">
            <select name="category" required defaultValue={product?.category} className="input">
              <option value="" disabled>
                Wählen…
              </option>
              {categories
                .filter((c) => c !== "Alle")
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </Field>
        </div>

        <Field label="Bild-URL">
          <input name="image" type="url" required defaultValue={product?.image} className="input" />
        </Field>

        <Field label="Weitere Bild-URLs (eine pro Zeile, optional)">
          <textarea
            name="images"
            rows={3}
            defaultValue={product?.images?.join("\n")}
            className="input resize-none"
          />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Badge">
            <select name="badge" defaultValue={product?.badge ?? ""} className="input">
              <option value="">Kein Badge</option>
              <option value="new">Neu</option>
              <option value="bestseller">Bestseller</option>
              <option value="sale">Sale</option>
            </select>
          </Field>
          <Field label="Bewertung">
            <input
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              required
              defaultValue={product?.rating}
              className="input"
            />
          </Field>
          <Field label="Anzahl Bewertungen">
            <input
              name="reviewCount"
              type="number"
              min="0"
              required
              defaultValue={product?.reviewCount}
              className="input"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-full bg-accent text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          {product ? "Speichern" : "Produkt anlegen"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground-muted">{label}</span>
      {children}
    </label>
  );
}
