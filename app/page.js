import products from "@/data/products";
import ProductList from "./ProductList";

export default function Home() {
  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-xl font-semibold">All Products</h2>
        <ProductList products={products} />
      </main>
    </>
  );
}
