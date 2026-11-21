"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Books"];

export default function ProductList({ products }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");
  const { addToCart } = useCart();

  const visible = products
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) =>
      sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0
    );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5"
          >
            <option value="none">Featured</option>
            <option value="asc">Price: Low to high</option>
            <option value="desc">Price: High to low</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <img src={p.image} alt={p.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-medium uppercase text-gray-500">{p.category}</p>
              <h3 className="mt-1 font-semibold text-gray-900">{p.name}</h3>
              <p className="mt-2 text-lg font-bold text-gray-900">₹{p.price.toLocaleString("en-IN")}</p>
              <button
                onClick={() => addToCart(p.id)}
                className="mt-3 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
