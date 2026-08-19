import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductForm } from "../../../product-form";
import { updateProduct } from "../../../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return <ProductForm product={product} action={updateProduct} />;
}
