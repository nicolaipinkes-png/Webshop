"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addReview } from "@/lib/reviews";
import { isLocale, defaultLocale } from "@/lib/i18n/config";

export async function submitReview(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const rawLocale = String(formData.get("locale") ?? "");
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const authorName = String(formData.get("authorName") ?? "").trim().slice(0, 60);
  const rating = Math.min(5, Math.max(1, Math.round(Number(formData.get("rating")))));
  const comment = String(formData.get("comment") ?? "").trim().slice(0, 500);

  if (!productId || !slug || !authorName || !comment) {
    redirect(`/${locale}/products/${slug}`);
  }

  await addReview({ productId, authorName, rating, comment });
  revalidatePath(`/${locale}/products/${slug}`);
  redirect(`/${locale}/products/${slug}#bewertungen`);
}
