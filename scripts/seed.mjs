// Usage: node --env-file=.env.local scripts/seed.mjs
import { neon } from "@neondatabase/serverless";
import products from "../data/products.js";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS products (
    id       integer PRIMARY KEY,
    name     text    NOT NULL,
    category text    NOT NULL,
    price    integer NOT NULL,
    image    text    NOT NULL
  )
`;

for (const p of products) {
  await sql`
    INSERT INTO products (id, name, category, price, image)
    VALUES (${p.id}, ${p.name}, ${p.category}, ${p.price}, ${p.image})
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name, category = EXCLUDED.category,
      price = EXCLUDED.price, image = EXCLUDED.image
  `;
}

const [{ count }] = await sql`SELECT count(*) FROM products`;
console.log(`Seeded. products table now has ${count} rows.`);
