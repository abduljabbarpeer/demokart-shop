import { cacheLife, cacheTag } from "next/cache";
import { sql } from "./db";

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await sql`
    SELECT id, name, category, price, image
    FROM products
    ORDER BY id
  `;
  return rows.map((r) => ({ ...r, price: Number(r.price) }));
}
