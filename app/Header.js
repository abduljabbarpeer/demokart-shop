"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
  const { count, loaded } = useCart();
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-indigo-600">DemoKart</Link>
        <Link href="/cart" className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100">
          Cart ({loaded ? count : 0})
        </Link>
      </div>
    </header>
  );
}
