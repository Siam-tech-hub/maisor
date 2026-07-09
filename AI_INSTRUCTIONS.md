# 🤖 AI INSTRUCTIONS — READ THIS FIRST

## WHO YOU ARE HELPING

You are helping **Siam (Siam Hossain)** edit his e-commerce website called **Maisor**.

## THE WEBSITE

- **Brand Name:** Maisor (M-A-I-S-O-R, ends with **R**, never "Maison")
- **Live URL:** https://maisor.vercel.app
- **GitHub Repo:** https://github.com/Siam-tech-hub/maisor
- **Tech Stack:** Next.js 16 + React 19 + Tailwind CSS v4 (no database)
- **Owner GitHub Account:** Siam-tech-hub
- **Vercel Account:** same account as "multiple-choice-store" (under siamhossa661@gmail.com)

## ⚠️ CRITICAL: NAME SPELLING

The brand is **Maisor** — it MUST end with **R**, not N.
- ✅ Correct: Maisor
- ❌ Wrong: Maison
Never use sed/find-and-replace blindly for this — always verify with Python using ASCII codes to avoid n↔r confusion.

## WHAT YOU MUST DO (THE WORKFLOW)

### Step 1: Clone the repo

```bash
git clone https://github.com/Siam-tech-hub/maisor.git
```

### Step 2: Get a fresh GitHub Personal Access Token (user generates it)

Tell the user: "Go to https://github.com/settings/tokens/new → Note: 'maisor-edit' → Expiration: 7 days → ✅ check repo → Generate → paste it here"

### Step 3: Set git identity

```bash
git config user.email "siam-tech-hub@users.noreply.github.com"
git config user.name "Siam-tech-hub"
```

### Step 4: Make the requested changes

Read the relevant files (see KEY FILES below), make changes, then:

```bash
git add -A
git commit -m "Description of changes"
git push https://x-access-token:TOKEN@github.com/Siam-tech-hub/maisor.git main
```

If push fails with "non-fast-forward", run:
```bash
git pull --rebase https://x-access-token:TOKEN@github.com/Siam-tech-hub/maisor.git main
git push https://x-access-token:TOKEN@github.com/Siam-tech-hub/maisor.git main
```

### Step 5: Deploy to Vercel (push alone does NOT deploy — must deploy manually!)

The repo is NOT connected to Vercel's auto-deploy. After every push, deploy manually:

```bash
cd maisor
npx vercel@54 deploy --prod --yes --token VERCEL_TOKEN
```

If you don't have a Vercel token, ask the user: "Go to https://vercel.com/account/tokens → Create Token (name: 'deploy', expiry 24h or 7 days) → paste it here"

Deploy takes ~30 seconds. The live URL stays the same: https://maisor.vercel.app

### Step 6: Verify the deploy

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" -L "https://maisor.vercel.app"
curl -s -L "https://maisor.vercel.app" | grep -o "<title>[^<]*</title>"
```

### Step 7: Remind the user to delete their tokens when done

- GitHub token → https://github.com/settings/tokens → delete
- Vercel token → https://vercel.com/account/tokens → delete

## BUILD BEFORE PUSHING

Always build locally before pushing to catch errors:

```bash
cd maisor
npm install        # node_modules is NOT persisted, must reinstall each time
npm run build      # catches TypeScript errors
```

If build fails, fix the error before pushing. Never push broken code.

## CURRENT PRODUCTS

### Panjabi (category: panjabi)

| Product | Price | Slug | Images | Notes |
| --- | --- | --- | --- | --- |
| Designer Panjabi | ৳1,500 | designer-panjabi | panjabi-1-1, panjabi-1-2 | 2 photos |
| Premium Panjabi | ৳2,000 | premium-panjabi | panjabi-2-1, panjabi-2-2, panjabi-2-3 | 3 photos, Bestseller badge |
| Classic Panjabi | ৳1,200 | classic-panjabi | panjabi-3-1, panjabi-3-2 | 2 photos |
| Stylish Panjabi | ৳1,400 | stylish-panjabi | panjabi-4-1, panjabi-4-2 | 2 photos |
| Essential Panjabi | ৳1,200 | essential-panjabi | panjabi-5-1 | 1 photo |

NOTE: Siam gave these temporary names because the AI cannot see images. He may rename them later. The actual product colors (by price) are:
- ৳1,500 product = purple panjabi
- ৳2,000 product = (3 photos)
- ৳1,200 product (classic) = (2 photos)
- ৳1,400 product = (2 photos)
- ৳1,200 product (essential) = (1 photo)

## KEY FILES (where to find things)

| What to change | File |
| --- | --- |
| Add/remove/edit products | `src/lib/products.ts` (the PRODUCTS array) |
| Category list | `src/lib/products.ts` (CATEGORIES array) |
| Homepage | `src/app/page.tsx` |
| Shop page | `src/app/shop/page.tsx` |
| Product detail page | `src/app/product/[slug]/page.tsx` |
| Checkout + order form | `src/app/checkout/page.tsx` |
| Order email recipient | `src/app/checkout/page.tsx` (WEB3FORMS_ACCESS_KEY) |
| Delivery charges | `src/app/checkout/page.tsx` (search "shipping") |
| Header + navigation | `src/components/Header.tsx` |
| Footer + social links | `src/components/Footer.tsx` |
| Product card design | `src/components/ProductCard.tsx` |
| Cart drawer | `src/components/CartDrawer.tsx` |
| Cart logic | `src/components/CartProvider.tsx` |
| Add to cart form | `src/components/AddToCartForm.tsx` |
| Brand colors | `src/app/globals.css` (`@theme` block) |
| Site name / metadata | `src/app/layout.tsx` |
| Product images | `public/images/` folder |
| About page | `src/app/about/page.tsx` |
| Contact page | `src/app/contact/page.tsx` |
| 404 page | `src/app/not-found.tsx` |

## HOW TO ADD A NEW PRODUCT

1. Add product images to `public/images/` (compress with sharp first — see below)
2. Add a new entry to the PRODUCTS array in `src/lib/products.ts`
3. Include all required fields: id, name, slug, price, category, image, images, description, details, sizes, (optional: badge, featured)
4. Build, push, deploy

### Image compression (use sharp)

```javascript
import sharp from "sharp";
import { readFileSync } from "fs";

const buf = readFileSync("/path/to/input.jpeg");
const meta = await sharp(buf).metadata();
let pipeline = sharp(buf).resize(1200, 1600, { fit: "inside", withoutEnlargement: true });
if (meta.orientation && meta.orientation > 1) {
  pipeline = pipeline.rotate();  // fix phone rotation
}
await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile("/path/to/output.jpg");
```

Run with: `node script.mjs` (must be inside the maisor folder where sharp is installed)

## OWNER / BRAND DETAILS

- **Owner name:** Siam (Siam Hossain)
- **Order email:** siamhossai5599@gmail.com (order notifications go here via Web3Forms)
- **Web3Forms Access Key:** 67b975da-a7b9-40b8-b643-94b59e2002c2 (this is safe to be public — it's an alias to the email)
- **Phone:** 01337303324
- **Facebook:** https://www.facebook.com/share/1HZmCaEBZk/
- **Instagram:** https://www.instagram.com/maisor_official

## ORDER FLOW

When a customer places an order:
1. The order details are sent via **email** to siamhossai5599@gmail.com (using Web3Forms API)
2. The customer sees a **success page** ("Order placed!")
3. There is **NO WhatsApp redirect** — Siam removed that intentionally. Do not add it back unless he asks.
4. The email subject is: "🛍️ New Maison Order MAI-XXXXXX — ৳X,XXX"

## DELIVERY SETTINGS

- **Free delivery over:** ৳3,000
- **Dhaka:** ৳60
- **Outside Dhaka:** ৳130
- Payment methods: Cash on Delivery, bKash, Nagad

## BRAND COLORS (Matte Bottle Green)

The green is intentionally **matte/desaturated** (not shiny/vivid). Defined in `src/app/globals.css`:
- bottle-900: #121f19 (primary dark green)
- bottle-950: #080f0c (darkest)
- bottle-700: #23392e
- bottle-300: #7a9a85 (light accent)
- ink: #0a0a0a (near-black)
- cream: #faf9f6 (off-white background)

## TROUBLESHOOTING

| Problem | Fix |
| --- | --- |
| Build fails with "Property 'sizes' is missing" | Every product in products.ts MUST have a `sizes` array |
| Push fails "non-fast-forward" | Run `git pull --rebase` then push again |
| vercel@latest not found | Use `npx vercel@54` (version 55 doesn't exist) |
| next: not found | Run `npm install` first (node_modules not persisted) |
| Images rotated wrong | Re-process with sharp `.rotate()` |
| Old version showing in browser | Tell user to hard-refresh (Ctrl+Shift+R) or use incognito |
| Email not arriving | Check spam folder; mark first email as "Not spam" |
| "maison" (N) appears somewhere | Replace with Python using explicit ASCII codes |

## IMPORTANT RULES

- ALWAYS use `npx vercel@54` for deploys (not `vercel` or `vercel@55`)
- ALWAYS `npm install` before `npm run build` (dependencies not persisted between sessions)
- ALWAYS set git config user.email and user.name before committing
- NEVER leave tokens in .git/config — after push, reset remote to clean URL
- The repo does NOT auto-deploy to Vercel — you must deploy manually after every push
- If you can't see images, ask Siam to describe/match them to products
- Brand name is **Maisor** (R) — verify carefully, never write "Maison"

---

_Last updated: July 9, 2026_
