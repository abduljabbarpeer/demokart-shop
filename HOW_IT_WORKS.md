# How DemoKart Works

The product list is **not** fetched from a server or database. It lives in one plain JavaScript file, and the home page reads it directly.

## Flow chart

```mermaid
flowchart TD
    A["data/products.js<br/>15 hard-coded products<br/>(id, name, category, price, image)"]
    B["app/page.js<br/>imports products and loops over them"]
    C["Product card<br/>image + name + category + ₹price"]
    D["app/layout.js<br/>page shell: fonts, title, body"]
    E["Browser<br/>http://localhost:3001"]
    F["placehold.co<br/>serves the product images"]

    A -- "import products" --> B
    B -- "products.map(...) → 15 cards" --> C
    D -- "wraps the page" --> B
    B -- "HTML sent to" --> E
    E -- "loads each image URL" --> F
```

## Same thing as a request timeline

```mermaid
sequenceDiagram
    participant U as You (browser)
    participant N as Next.js server
    participant D as data/products.js
    participant P as placehold.co

    U->>N: GET /
    N->>D: import products
    D-->>N: array of 15 products
    N-->>U: HTML with 15 cards
    U->>P: fetch image for each card
    P-->>U: PNG with product name on it
```

## What each file does

| File | Role |
|---|---|
| `data/products.js` | **The data source.** An array of 15 products. Edit this to add, remove or change products. |
| `app/page.js` | **The home page.** Imports the array, loops over it and draws one card per product. |
| `app/layout.js` | **The wrapper.** Sets the page title, fonts and background around every page. |
| `app/globals.css` | Loads Tailwind CSS for styling. |

## One product, end to end

```js
// data/products.js
{ id: 1, name: "Wireless Mouse", category: "Electronics", price: 699,
  image: "https://placehold.co/400x300/png?text=Wireless+Mouse" }
```

becomes, in `app/page.js`:

- `<img src={p.image}>` is the picture, loaded from placehold.co
- `p.name` is the title
- `p.category` is the small label
- `₹{p.price}` is the price, formatted like `₹699`

## Want real data later?

Replace the `import products from "@/data/products"` line in `app/page.js` with a database or API call. The cards stay the same.
