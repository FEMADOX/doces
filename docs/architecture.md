# Architecture

## Stack

- **Next.js 16** — App Router, Turbopack, React Server + Client Components.
- **React 19**, **TypeScript** (strict).
- **Tailwind CSS v4** — `@theme` design tokens in `app/globals.css`.
- **Motion** (`motion/react`) — scroll reveals, springs, interactive motion.
- **Zustand** (+ `persist`) — cart state in `localStorage`.
- **qrcode** — renders the Pix QR.

## Structure

```
app/
  layout.tsx     # fonts, metadata, <html lang="pt-BR">
  page.tsx       # imports + orders all sections
  globals.css    # @theme tokens, keyframes, util classes, reduced-motion
components/
  <Section>.tsx  # one component per page section
  cart/CartDrawer.tsx
  PhotoSlot.tsx  CursorTrail.tsx
lib/
  products.ts    # catalog
  cart-store.ts  # useCart zustand hook
  pix.ts         # mock BR Code generator
public/assets/   # images; mouse/ = footer cutouts
```

Imports use the `@/` alias rooted at the repo.

## Data flow

```
lib/products.ts ──> Cardapio ──(add)──> useCart (zustand, persisted)
                                            │
                          Header badge ◄────┤
                          CartDrawer   ◄────┘
                                            │
              lines + form ──> lib/order.ts buildWhatsappUrl ──> wa.me deep link
                                            │
                              iFood / Rappi ──> storefront link-out
```

- `products.ts` is the single source of truth for the menu.
- `useCart` holds lines, open/close state, and derived `count()` / `total()`.
  It's persisted, so a cart survives reloads.
- At checkout, the cart lines + form go to `buildWhatsappUrl` (`lib/order.ts`),
  which formats a human-readable order message and opens a `wa.me` deep link.
  iFood/Rappi buttons are plain link-outs to the shop's storefront.
- `lib/pix.ts` (mock BR Code + CRC16) and the `qrcode` dep are **dormant** —
  kept on disk, no longer imported, in case Pix returns.

## Rendering

- Page sections are mostly Client Components (`"use client"`) because they use
  Motion / hooks / browser APIs.
- `app/layout.tsx` and `app/page.tsx` are server components that just compose.

## Key decisions

- **Two animation systems, kept apart.** CSS keyframes for ambient looping
  motion (drift, float); Motion for scroll-triggered and spring
  interactions. They never share an element — both write `transform` and would
  fight. See [design.md](./design.md).
- **Desktop-first fluid sizing.** `clamp()`/`vw` for the base look; mobile is
  corrected with Tailwind breakpoint overrides so desktop is never disturbed.
- **Ordering routes through `lib/order.ts`.** WhatsApp carries the cart as a
  pre-filled message; iFood/Rappi are link-outs (separate marketplaces can't
  receive our cart). Channel number/URLs are config constants in one file.
  Pix is kept dormant (`pix.ts`) should it return.
- **Catalog as plain data.** `products.ts` is a typed array, trivial to edit or
  later source from a CMS/API.

## Constraints for contributors

- The user runs the dev server and previews; don't start servers or take
  screenshots. `npx tsc --noEmit` is the allowed check.
