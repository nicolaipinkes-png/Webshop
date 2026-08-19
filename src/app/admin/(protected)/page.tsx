import Link from "next/link";
import { Plus, Pencil, AlertCircle } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { DeleteProductForm } from "./delete-product-form";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Produkte</h1>
        <Link
          href="/admin/products/new"
          className="flex h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Neues Produkt
        </Link>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-8 divide-y divide-border rounded-2xl border border-border">
        {products.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4">
            <ProductImage src={p.image} alt={p.name} className="h-14 w-14 shrink-0" sizes="56px" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-xs text-foreground-muted">{p.category}</p>
            </div>
            <span className="text-sm font-medium">{formatPrice(p.priceCents, p.currency)}</span>
            <Link
              href={`/admin/products/${p.id}/edit`}
              aria-label={`${p.name} bearbeiten`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:border-accent hover:text-accent"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <DeleteProductForm id={p.id} name={p.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
