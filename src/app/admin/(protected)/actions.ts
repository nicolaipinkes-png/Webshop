"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

function readProductForm(formData: FormData) {
  const badge = String(formData.get("badge") ?? "");
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    priceCents: Math.round(Number(formData.get("price")) * 100),
    currency: "EUR",
    category: String(formData.get("category") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    badge: badge === "" ? null : badge,
    rating: Number(formData.get("rating")),
    reviewCount: Number(formData.get("reviewCount")),
  };
}

function revalidateShop() {
  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath("/admin");
}

export async function createProduct(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");

  const data = readProductForm(formData);
  await db.insert(products).values({ id: crypto.randomUUID(), ...data });

  revalidateShop();
  redirect("/admin");
}

export async function updateProduct(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");

  const id = String(formData.get("id"));
  const data = readProductForm(formData);
  await db.update(products).set(data).where(eq(products.id, id));

  revalidateShop();
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");

  const id = String(formData.get("id"));
  try {
    await db.delete(products).where(eq(products.id, id));
  } catch {
    redirect(
      "/admin?error=" +
        encodeURIComponent(
          "Produkt kann nicht gelöscht werden, es existieren bereits Bestellungen dafür."
        )
    );
  }

  revalidateShop();
  redirect("/admin");
}
