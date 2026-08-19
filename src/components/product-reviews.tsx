import { Star } from "lucide-react";
import { getReviewsByProductId } from "@/lib/reviews";
import { submitReview } from "@/app/(shop)/products/[slug]/actions";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-3.5 w-3.5", i < rating ? "fill-current text-amber-500" : "text-foreground/20")}
        />
      ))}
    </div>
  );
}

export async function ProductReviews({ product }: { product: Product }) {
  const reviews = await getReviewsByProductId(product.id);

  return (
    <section id="bewertungen" className="mt-20 border-t border-border pt-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">Bewertungen</h2>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          {reviews.length > 0 ? (
            <ul className="space-y-6">
              {reviews.map((r) => (
                <li key={r.id} className="border-b border-border pb-6">
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} />
                    <span className="text-sm font-medium">{r.authorName}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-foreground/60">
              Noch keine Bewertungen. Sei die/der Erste!
            </p>
          )}
        </div>

        <form action={submitReview} className="max-w-md space-y-4">
          <input type="hidden" name="productId" value={product.id} />
          <input type="hidden" name="slug" value={product.slug} />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground-muted">Name</label>
            <input name="authorName" required maxLength={60} className="input" />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground-muted">Bewertung</label>
            <select name="rating" defaultValue="5" className="input">
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground-muted">Kommentar</label>
            <textarea name="comment" required rows={3} maxLength={500} className="input resize-none" />
          </div>

          <button
            type="submit"
            className="h-11 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Bewertung abschicken
          </button>
        </form>
      </div>
    </section>
  );
}
