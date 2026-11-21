# DemoKart: build an online shop from an empty folder

In these notes we build DemoKart, an online shop, starting from an empty folder. You won't type the code yourself. You'll give Claude Code a prompt, read what it plans to do, approve it, and check the result. DemoKart is the same store the customer support agent in this residency works for.

By the end, your shop will have:

- a product page with 15 products, a category filter and a price sort
- an Add to cart button and a cart page with a total
- its code on GitHub
- a live link anyone can open, hosted on Vercel
- its products and carts saved in a database you can look inside

The build takes about 90 minutes, plus setup time if you still need to install tools.

## How to use these notes

Work through the steps in order, because each step builds on the one before. Most steps give you a prompt to paste into Claude Code, tell you what you should see when it finishes, and list fixes for the problems people hit most often.

Wherever you see **yourname**, use your first name in lowercase with no spaces. For example, Priya's folder is `demokart-shop-priya`. This keeps your GitHub repo, Vercel project and database names unique. If a name is still taken (for example, because you built this once before), add a number: `demokart-shop-priya-2`.

Boxes marked **Go deeper** are optional. Read them if a step feels like magic. Skip them if you already know the idea.

| Step                               | What you'll have at the end                               | Time   |
| ---------------------------------- | --------------------------------------------------------- | ------ |
| 1. Start in an empty folder        | Claude Code running in an empty project folder            | 5 min  |
| 2. Build the product page          | 15 products on your laptop                                | 10 min |
| 3. Add filter and sort             | Category filter and price sort working together           | 8 min  |
| 4. Add a cart                      | Add to cart, a cart count and a cart page with a total    | 8 min  |
| 5. Save your code on GitHub        | Your code in a public GitHub repo                         | 8 min  |
| 6. Put the shop online             | Your first live link on Vercel                            | 8 min  |
| 7. Create a database               | A Neon database inside Vercel, with its key in .env.local | 8 min  |
| 8. Move the data into the database | Product and cart rows in Vercel's Data Editor             | 10 min |
| 9. Push and go live again          | A live site that reads from the database                  | 6 min  |

## Before you start (about 15 minutes, once)

You need these tools on your laptop. Open VS Code, open its terminal (View, Terminal), and run each check. If a check passes, move to the next one.

- Node.js, the LTS version, from nodejs.org. Check: `node -v` shows v20 or higher.
- Git. Check: `git --version` shows a version number.
- GitHub CLI, from cli.github.com. Check: `gh --version` shows a version number.
- A free GitHub account.
- A free Vercel account. Sign up at vercel.com with Continue with GitHub and choose the Hobby plan.
- Claude Code, working in the VS Code terminal. Check: typing `claude` starts it.

Most installs are the same on Mac and Windows. These are the ones that differ:

| Task                      | Mac                                                                                               | Windows                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Install Git               | Run `git --version`. If a window asks to install the command line developer tools, click Install. | Download Git from git-scm.com and install it with the default options.                                      |
| Install GitHub CLI        | Download the macOS installer from cli.github.com, or run `brew install gh` if you use Homebrew.   | Download the Windows installer (.msi) from cli.github.com, or run `winget install --id GitHub.cli`          |
| After installing anything | Open a new terminal with the + in VS Code's terminal panel.                                       | Close VS Code fully and open it again. Its terminal only sees newly installed tools after VS Code restarts. |

Next, sign the GitHub CLI in to your GitHub account. Run `gh auth login` and choose:

- GitHub.com
- HTTPS
- Yes, when it asks to authenticate Git with your GitHub credentials
- Login with a web browser. Copy the one-time code it shows, press Enter, and paste the code into the browser page that opens.

Check with `gh auth status`. You should see "Logged in to github.com".

### If it breaks

- "node is not recognized" or "command not found: gh" right after installing: restart as shown in the table above, then run the check again.
- `node -v` shows a version below 20: install the current LTS version from nodejs.org. It replaces the old one.

## Working with Claude Code

Claude Code writes the code, but you stay in charge. Before it runs a command on your laptop, it shows you the command and asks for permission. Read each one before you approve it. It takes a few seconds and prevents most surprises.

Here's what to look for:

- Does it match what you asked for? If you asked for a cart, installing a package or restarting the server makes sense. A command that has nothing to do with your prompt does not.
- Does it stay inside your project folder? Commands should work in `demokart-shop-yourname`. Be careful with anything that points at other folders on your laptop.
- Does it delete anything? `rm` removes files, and `rm -rf` removes whole folders with no undo. Only approve it if you know what it deletes and why.
- Does it install something for the whole laptop? Look for `sudo` or `-g`. This build needs neither.

You'll see a few commands again and again in this build. `npx` and `npm` install and run Node.js packages, `node` runs a script, `git` saves versions of your code, and `gh` talks to GitHub.

If a command looks wrong, choose No and tell Claude Code what to do instead. While you're learning, approve commands one at a time rather than choosing the option that stops it from asking.

Two habits help at every step. When you see a red error, in the terminal or in the browser, copy the full error into Claude Code and ask it to fix it. And if Claude Code says you've reached your usage limit, it tells you when the limit resets. Wait until then and type continue.

## Step 1: Start in an empty folder (about 5 minutes)

Create a new folder called `demokart-shop-yourname`. The name must be lowercase, and the folder must be completely empty, without even a hidden `.vscode` folder inside.

Open the folder in VS Code (File, Open Folder), open the terminal (View, Terminal) and start Claude Code by typing `claude`.

From here on, every file in this folder is written by Claude Code from your prompts.

## Step 2: Build the product page (about 10 minutes)

Paste this prompt into Claude Code:

**Prompt 1**

```text
Create a new Next.js app in this empty folder. Use JavaScript (not TypeScript), the App Router and Tailwind CSS, and use the non-interactive options so setup does not stop to ask questions.

Then build the home page of an online shop called DemoKart:
- Put 15 fake products in data/products.js. Each product has id, name, category (Electronics, Fashion, Home or Books), price in rupees between 199 and 49999, and an image link from placehold.co that shows the product name, like https://placehold.co/400x300/png?text=Wireless+Mouse
- Show the products as a grid of cards with image, name, category and price in ₹
- Use plain img tags, not next/image
- Add a simple header with the DemoKart name

When done, start the dev server and give me the local link.
```

Claude Code creates the project, installs the packages it needs, writes `data/products.js` and the home page, and starts the server. Open the local link it gives you (usually localhost:3000). You should see 15 DemoKart products with images, names, categories and prices.

Your shop runs on your laptop only while this server runs. If you close VS Code, start it again later by running `npm run dev` in the terminal.

A few things just happened:

- Next.js is a toolkit for building websites. It gives us pages and server code in one project, and Vercel can run it with no setup.
- The `node_modules` folder holds code other people wrote that our project uses. It's large, and it never goes to GitHub.
- Open `data/products.js`. The products are a list inside a code file, so changing a price means editing code. Keep this in mind, because we change it in step 8.

> **Go deeper: what's inside the project**
>
> `package.json` lists the packages the project needs and the commands it can run, such as `npm run dev`. `npm install` reads this list and downloads those packages into `node_modules`. Because anyone can rebuild `node_modules` from `package.json`, it never needs to be saved or shared.
>
> The `app` folder holds your pages. `app/page.js` is the home page, and later a `cart` folder inside `app` becomes the /cart page. That's what "App Router" in the prompt means: each folder inside `app` becomes a page address. Tailwind CSS lets Claude Code style the page with short class names like `grid` or `text-lg`, instead of writing a separate style file.

### If it breaks

- Setup stops and waits for an answer: tell Claude Code "Use the non-interactive options and the default answers."
- "Folder not empty" or an error about the project name: the folder must be empty and its name lowercase. Fix it and paste Prompt 1 again.
- Port 3000 is busy: use the link the terminal prints instead, often localhost:3001.
- Images don't load: ask Claude Code "Check the placehold.co links and use plain img tags."
- On Windows, you type an npm command yourself and see "running scripts is disabled on this system": run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` in the terminal, type Y if it asks you to confirm, and try again. This lets PowerShell run the small npm script that Node.js installed.

## Step 3: Add filter and sort (about 8 minutes)

Paste this prompt into Claude Code:

**Prompt 2**

```text
On the home page, add a category filter (All, Electronics, Fashion, Home, Books) and a sort by price (Low to high, High to low). They should work together and update the products straight away, without reloading the page.
```

Now pick Electronics, and only electronics show. Sort Low to high, and prices go up. Both should work at the same time.

Filter and sort run in the browser, on products that are already on the page. Nothing goes back to a server, which is why the change is instant.

Try this: ask Claude Code "In 3 lines, explain how the filter and sort work." Asking Claude Code to explain its own code is one of the fastest ways to understand what it built.

> **Go deeper: state**
>
> Your filter and sort choices are kept in the page as state: values the page remembers while it's open. When you pick a category, the state changes and the page redraws the grid from the full product list, keeping only the matching products in the chosen price order. The full list is already in the browser, so no new data is needed. In Next.js, a file that works like this starts with `"use client"`, which tells Next.js that this part runs in the browser.

### If it breaks

- Sorting resets the filter, or the other way round: tell Claude Code "The filter and sort don't work together. Make both apply at the same time."

## Step 4: Add a cart (about 8 minutes)

Paste this prompt into Claude Code:

**Prompt 3**

```text
Add a cart:
- An Add to cart button on every product card
- A cart count in the header that links to a Cart page at /cart
- The Cart page lists each item with its quantity and price, has a Remove button, and shows the total in ₹

For now, keep the cart in the browser using localStorage.
```

You should see an Add to cart button on every card, a cart count in the header, and a /cart page with items, quantities, a Remove button and the total.

Try this: add 2 items. Then open localhost:3000 in a private (incognito) window. The cart there is empty.

That's because the cart is saved in this one browser, using something called localStorage. Another browser or another laptop can't see it, and if a customer switches phones, their cart is gone. A real shop keeps the cart on its server. We move it there in step 8.

> **Go deeper: localStorage**
>
> localStorage is a small storage space the browser gives each website. It keeps text values after you close the tab, but only in that browser on that device. It suits small preferences, like a light or dark theme. Anything that must follow the customer or be seen by the shop, like a cart or an order, has to live on a server.

### If it breaks

- The cart count only changes after you refresh the page: tell Claude Code "The cart count in the header only updates after a refresh. Make it update straight away."
- A red error that mentions "hydration" appears: copy the full error into Claude Code and ask it to fix it. It happens when the server and the browser draw the page differently, because only the browser can see localStorage.

## Step 5: Save your code on GitHub (about 8 minutes)

Git saves versions of your code on your laptop. Each saved version is a commit, with a message that says what changed. GitHub keeps a copy of those versions online. Teams work from it, and Vercel will read our code from it in the next step.

A file called `.gitignore` lists what must never be saved: `node_modules`, and `.env` files that hold secret keys.

Change yourname in this prompt to your name, then paste it into Claude Code:

**Prompt 4**

```text
Explain in 3 short lines what Git, a commit and GitHub are. Then:
1. Check that .gitignore keeps out node_modules and all .env files
2. Commit all the work so far with a clear message
3. Use the GitHub CLI to create a public repo called demokart-shop-yourname on my account and push the code
4. Give me the repo link
```

Claude Code checks `.gitignore`, makes a commit, creates the repo with gh and pushes your code. Open the repo link: your files and your commit history are on GitHub.

Your repo is public, so anyone with the link can read your code. That's fine for this project, and it's also why secret keys must never sit inside code. We come back to this in step 7.

> **Go deeper: why commits matter**
>
> Each commit is a snapshot you can go back to. If a later prompt breaks something, you can ask Claude Code to "show me what changed since the last commit" or to "undo the changes since the last commit". Committing after each step that works gives you safe points to return to.

### If it breaks

- gh says you're not logged in: run `gh auth login` in the terminal, sign in through the browser, then ask Claude Code to try again.
- The push asks for a password or says permission denied: run `gh auth setup-git` in the terminal, then ask Claude Code to push again.
- The repo name is taken: ask for `demokart-shop-yourname-2`.
- git is not found: install it as shown in Before you start, restart, and try again.

## Step 6: Put the shop online with Vercel (about 8 minutes)

There's no prompt in this step. We do it in the Vercel website, so you see each screen.

1. Go to vercel.com and choose Add New, then Project.
2. Under Import Git Repository, pick `demokart-shop-yourname`. If it isn't in the list, click Adjust GitHub App Permissions and allow this repo.
3. Vercel detects Next.js. Change nothing and click Deploy.
4. Watch the build log. When it finishes, open your .vercel.app link.
5. Open the same link in a private window. You see the same products and an empty cart.

Vercel copied your code from GitHub, built it, and now serves it from its own servers. The link works for anyone, anywhere. If the short link is already taken, Vercel adds a few letters to it. That's normal.

From now on, every push to GitHub makes Vercel build and publish your site again by itself.

> **Go deeper: what "build" means**
>
> Visitors don't get your code exactly as Claude Code wrote it. Vercel installs the packages and runs the build, which turns your project into files a browser can load quickly, plus small pieces of server code. The build log shows each part of that. When a build works on your laptop but fails on Vercel, the cause is usually a file that was never pushed or a setting that only your laptop has.

### If it breaks

- The build failed: open the build log, copy the red error into Claude Code ("Fix this Vercel build error: ..."), then ask it to commit and push again. Vercel starts a new build by itself.
- Vercel asks you to pick a plan: choose Hobby, the free plan.

## Step 7: Create a database (about 8 minutes)

Right now our products live in a code file, and our cart lives in one browser. A database keeps data on a server, in tables that work like sheets with fixed columns. The data stays when the browser closes, and every visitor reads the same data.

We create the database inside Vercel, so there's no new signup. Vercel sets it up with Neon, a Postgres database service.

1. In your `demokart-shop-yourname` project on Vercel, open the Storage tab, click Create Database, choose Neon (Serverless Postgres) and click Continue.
2. Pick the free plan and the region closest to you (from India, Singapore if it's listed). Name it `demokart-db-yourname` and click Create.
3. Connect it to your `demokart-shop-yourname` project for all environments. Vercel adds `DATABASE_URL` to your project's environment variables by itself.
4. On the database page, open the .env.local snippet, click Show secret and copy it. If you don't see the snippet, copy `DATABASE_URL` from your project's Settings, Environment Variables.
5. In VS Code, create a file called `.env.local` in your project folder, next to `package.json`, and paste.

Vercel changes its screens from time to time, so a button may have a slightly different name. Pick the closest match.

### Keep the key secret

The value you just pasted works like a password for your database. Anyone who has it can read, change or delete your data. It lives in two places only: `.env.local` on your laptop and your project's settings in Vercel. `.gitignore` already keeps `.env` files out of GitHub.

- Never paste it into a chat, a message or a document.
- Don't let it show on screen when you share your screen or take a screenshot. Close `.env.local` first.

### If the key leaks

If the key ends up anywhere public, such as GitHub or a screenshot, reset it straight away. The old key stops working the moment you reset it.

1. In Vercel, open the Storage tab, open `demokart-db-yourname` and click Open in Neon.
2. In Neon, click Connect, then Reset password, then Reset.
3. Back in Vercel, check that `DATABASE_URL` in your project's Settings, Environment Variables has changed. Then open Deployments, click the three dots next to the latest deployment and choose Redeploy.
4. Copy the new .env.local snippet into your `.env.local` file, then restart your dev server.
5. If the key was pushed to GitHub, ask Claude Code: "Remove .env.local from Git tracking but keep the file on my laptop, make sure .gitignore blocks it, then commit and push." Removing the file doesn't erase it from your repo's history, which is why resetting the key comes first.

> **Go deeper: environment variables**
>
> An environment variable is a setting that lives outside your code, like `DATABASE_URL`. Your code asks for `process.env.DATABASE_URL` and gets the value from wherever it runs: `.env.local` on your laptop, or Vercel's settings on the live site. The same code works in both places, and the secret never sits inside the code.

### If it breaks

- `.env.local` looks greyed out in VS Code's file list: VS Code greys out files that Git ignores. That's expected.
- The app can't find the file: the name must be exactly `.env.local`, with the dot at the start and nothing after it, like .txt. Creating it with New File in VS Code avoids this.

## Step 8: Move products and the cart into the database (about 10 minutes)

Paste this prompt into Claude Code:

**Prompt 5**

```text
Connect this app to the Postgres database. The connection string is DATABASE_URL in .env.local. Use the @neondatabase/serverless package.
1. Write a seed script at scripts/seed.js that creates a products table and a cart_items table (cart_id, product_id, quantity), and fills products with the same 15 products from data/products.js. Add it as "npm run seed", make it load .env.local, and run it once.
2. Make the home page read products from the database on every visit, with no caching. Filter and sort must still work.
3. Move the cart into the database: give each browser a random cart ID saved in a cookie, and add, update and remove cart items through API routes. The cart count and the Cart page should read from the database.
4. Restart the dev server and check that the home page and the cart work.
```

Claude Code installs the database package, writes `scripts/seed.js`, runs `npm run seed`, changes the home page and the cart, and restarts the server. The shop looks the same as before, but its data now comes from the database.

Let's look inside the database:

1. In Vercel, open Storage, then `demokart-db-yourname`, then Browser, then Data Editor.
2. Open the products table: 15 rows. Open cart_items: empty.
3. Add 2 items to your cart on localhost, then refresh cart_items: 2 rows with a cart ID.

The customer sees the same shop. What changed is where the data lives: products and carts are on the server now, not in a code file and not in one browser.

- The seed script runs once. It creates the tables and fills them with the starting products.
- Each browser gets its own cart ID, so carts don't mix.

> **Go deeper: tables, cookies and API routes**
>
> The products table has one row per product. The cart_items table has one row per item in a cart: which cart (cart_id), which product (product_id) and how many (quantity).
>
> A cookie is a small value the browser sends to your site with every request, so the server knows which cart is yours. API routes are addresses on your own site, such as /api/cart, that the page calls to add, change or remove cart items. The server code behind them is the only part that talks to the database, so the key never reaches the browser.

### If it breaks

- "DATABASE_URL is missing": check that `.env.local` sits next to `package.json`, then restart the dev server. For the seed script, ask Claude Code to run it with `node --env-file=.env.local`.
- There's no Browser section in Vercel: it shows only to the account owner, so use your own account.
- You see 30 products instead of 15: the seed ran twice. Tell Claude Code "The products table has duplicates. Make the seed script clear the tables before it adds products, then run it again."
- The page shows a database error: copy the full error into Claude Code and ask it to fix it.

## Step 9: Push and go live again (about 6 minutes)

Paste this prompt into Claude Code:

**Prompt 6**

```text
Commit these changes with a clear message and push to GitHub.
```

In Vercel, open Deployments. A new deployment starts by itself and shows Ready in about a minute.

First, check that your key stayed private. Open your repo on GitHub and look at the file list. You should not see `.env.local` there. If you do, follow "If the key leaks" in step 7 now.

Now try your live shop:

- On your live link, add 2 items. Refresh cart_items in the Data Editor: you see new rows with a new cart ID.
- Open the live link in a private window and add 1 item: a row appears with another cart ID.
- Change one product's price in the Data Editor and save. Refresh the live site, and the new price shows with no code changed.

Push to GitHub and Vercel publishes. Change data in the database and the site shows it, with no new code.

In this build, your laptop and your live site share one database, so a cart you fill on localhost lands in the same table. Real teams keep a separate database for testing.

### If it breaks

- The build fails: same as step 6. Copy the red error into Claude Code, then ask it to commit and push the fix.
- The live site shows a database error but localhost works: in Vercel, check that `DATABASE_URL` is listed under your project's Settings, Environment Variables, for Production. Then redeploy from Deployments (three dots, Redeploy).

## What you built

Here's the path your shop took, from prompt to live site:

1. You write a prompt.
2. Claude Code writes the code on your laptop.
3. Git saves versions of it.
4. GitHub keeps the code online.
5. Vercel builds it and gives you a live link.
6. The database inside Vercel keeps products and carts.

Two things moved along the way: the products went from a code file into the database, and the cart went from one browser to the server.

## You're done when

- Your live link works in a private window.
- It shows products from the database.
- Add to cart on the live link creates a row in the Data Editor.
- Your code is on GitHub, and `.env.local` is not.

## Go further

Finished early? Add one of these features, then push and check it on your live link. There's no ready prompt this time. Writing the prompt is the exercise.

- A search box that filters products by name.
- Sort by rating. Each product needs a rating, in the database too.
- Plus and minus buttons for quantity on the Cart page.
- A Checkout button that shows an order summary, with no payment.

A good prompt tells Claude Code:

- what you want, in one sentence
- where it goes on the page
- how it should behave, including odd cases, such as what the search shows when nothing matches
- what must keep working, such as the filter, the sort and the cart
- how to check it, such as restarting the server and testing the page

If your feature changes the database, as a rating does, say so in your prompt. Ask Claude Code to update the table and the seed script without deleting the rows already in cart_items.
