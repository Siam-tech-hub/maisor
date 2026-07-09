# Maisor — Modern Clothing Brand

A modern e-commerce storefront for **Maison**, built with Next.js 16, React 19, and Tailwind CSS v4. Brand palette: bottle green, white & black.

## Features

- 🛍️ Product catalog with category filtering (Tees, Shirts, Hoodies, Jackets, Pants)
- 🛒 Client-side cart with localStorage persistence + slide-out cart drawer
- 📱 Fully responsive, modern design
- 🟢 WhatsApp checkout (no backend / database required)
- 🚚 Delivery logic (free over ৳3000, ৳60 Dhaka / ৳130 outside)
- ⚡ Static product data — easy to edit in one file

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Customizing

| What | Where |
| --- | --- |
| Products (name, price, images, sizes) | `src/lib/products.ts` |
| WhatsApp number for orders | `src/app/checkout/page.tsx` → `WHATSAPP_NUMBER` |
| Delivery charges / free threshold | `src/app/checkout/page.tsx` |
| Brand colors | `src/app/globals.css` (`@theme`) |
| Site name / metadata | `src/app/layout.tsx` |
| Header navigation | `src/components/Header.tsx` |
| Footer social links | `src/components/Footer.tsx` |
| Product images | `public/images/` |
| Contact info | `src/app/contact/page.tsx` |

## Deploying to Vercel

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Deploy — no environment variables required

## Tech stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- TypeScript
