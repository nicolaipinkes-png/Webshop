import { getAllProducts } from "@/lib/products";
import { SearchClient } from "./search-client";

export default async function SearchPage() {
  const products = await getAllProducts();
  return <SearchClient products={products} />;
}
