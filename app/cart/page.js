"use client";

import Link from "next/link";
import products from "@/data/products";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { cart, loaded, removeFromCart } = useCart();
  const items = products
    .filter((p) => cart[p.id])
    .map((p) => ({ ...p, qty: cart[p.id] }));
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <h2 className="mb-6 text-xl font-semibold">Your Cart</h2>
      {!loaded ? null : items.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{" "}
          <Link href="/" className="text-indigo-600 underline">Continue shopping</Link>
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 p-4">
                <img src={i.image} alt={i.name} className="h-16 w-20 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-semibold">{i.name}</p>
                  <p className="text-sm text-gray-500">
                    {fmt(i.price)} × {i.qty}
                  </p>
                </div>
                <p className="font-bold">{fmt(i.price * i.qty)}</p>
                <button
                  onClick={() => removeFromCart(i.id)}
                  className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-right text-xl font-bold">Total: {fmt(total)}</p>
        </>
      )}
    </main>
  );
}
