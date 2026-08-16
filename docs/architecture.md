# Architecture

## Stack

- **Next.js 16** — App Router, Turbopack, React Server + Client Components.
- **React 19**, **TypeScript** (strict).
- **Tailwind CSS v4** — `@theme` design tokens and animation states in
  `app/globals.css`.
- **Zustand** (+ `persist`) — cart state in `localStorage`.
- **qrcode** — dormant dependency retained with the unused Pix helper.

## Structure

```
app/
  layout.tsx     # fonts, metadata, <html lang="pt-BR">
  page.tsx       # section order + small client islands
  globals.css    # tokens, keyframes, reveal/menu/cart states
components/
  <Section>.tsx               # server-rendered visual sections
  Header.tsx                  # menu/cart control client island
  RevealObserver.tsx          # one IntersectionObserver
  CursorTrail.tsx             # first-pointer dynamic loader
  CursorTrailRenderer.tsx     # requestAnimationFrame renderer
  cart/AddToCartButton.tsx    # minimal cart mutation island
  cart/DeferredCartDrawer.tsx # first-open dynamic loader
  cart/CartDrawer.tsx         # mounted CSS drawer
lib/
  products.ts    # catalog + static WebP imports
  cart-store.ts  # useCart zustand hook
  order.ts       # WhatsApp message and channel URLs
  pix.ts         # dormant mock BR Code generator
public/assets/   # optimized WebP images; mouse/ = tiny cursor cutouts
```

Imports use the `@/` alias rooted at the repo.

## Data flow

```
lib/products.ts ──> Cardapio ──> AddToCartButton ──> useCart (persisted)
                                                       │
                                     Header badge ◄────┤
                                     CartDrawer   ◄────┘
                                                       │
              lines + form ──> lib/order.ts buildWhatsappUrl ──> wa.me
                                                       │
                                         iFood/Rappi ──> link-out
```

- `products.ts` is the single catalog source and owns static image metadata.
- Server-rendered cards pass only `id`, `name`, `price`, and `badgeIcon` to each
  add-button island.
- `useCart` retains lines plus drawer actions; only lines persist under
  `puro-doce-cart`.
- The drawer dynamically loads after the first opening and stays mounted so
  later CSS transitions are immediate.
- `buildWhatsappUrl` formats the order; iFood/Rappi remain plain link-outs.
- `lib/pix.ts` and `qrcode` are dormant and absent from the route bundle.

## Rendering

`app/layout.tsx`, `app/page.tsx`, and all visual sections are Server Components.
Client JavaScript is limited to:

- Header menu/cart controls
- `AddToCartButton`
- `RevealObserver`
- `DeferredCartDrawer`
- `CursorTrail`

The drawer implementation and cursor renderer are separate dynamic chunks.
Content images use static `next/image` imports. Only the hero is preloaded;
below-the-fold images are lazy and responsive.

## Key decisions

- **Progressive reveals.** Content is visible by default. One observer enables
  and completes reveal states, then unobserves each element.
- **Composable CSS motion.** Reveal transitions use individual `translate` and
  `scale`; ambient/hover transforms use wrappers when necessary.
- **Deferred nonessential work.** The cart implementation waits for opening;
  the cursor renderer and its assets wait for fine-pointer movement.
- **Desktop-first fluid sizing.** `clamp()`/`vw` provide the base look, with
  mobile breakpoint overrides.
- **Ordering routes through `lib/order.ts`.** WhatsApp carries the cart;
  marketplaces receive link-outs only.
- **Catalog as typed data.** Product content and image metadata remain easy to
  edit or later source from a CMS/API.

## Performance contracts

- Runtime image sources ≤ 2.5 MiB.
- Hero ≤ 250 KiB; each cursor image ≤ 20 KiB and ≤ 96 px wide.
- Exactly one generated image preload.
- Initial modern JavaScript ≤ 170 KiB gzip.
- Visual sections must stay out of the client reference manifest.

## Constraints for contributors

- The user runs the dev server and previews; don't start servers or take
  screenshots.
- Run `pnpm test:performance`, `npx tsc --noEmit`, a production build, and
  `pnpm test:performance:build` for performance-sensitive changes.
