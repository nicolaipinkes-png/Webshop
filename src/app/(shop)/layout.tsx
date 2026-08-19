import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { AiAssistant } from "@/components/ai-assistant";
import { StyleQuiz } from "@/components/style-quiz";
import { getAllProducts } from "@/lib/products";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <AiAssistant products={products} />
      <StyleQuiz />
    </>
  );
}
