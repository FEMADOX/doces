# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

**PURO DOCE** — marketing + ordering site for a Curitiba brigadeiro/doces shop.
Single long-scroll landing page with a persisted cart and WhatsApp ordering flow.
Next.js App Router, React 19, TypeScript strict, Tailwind v4, CSS animation.

Originally a static HTML prototype; rebuilt as this Next.js app. The old
prototype lived in the parent `doces/` folder and has been removed.

## Commands

```bash
pnpm dev        # next dev (Turbopack)
pnpm build      # next build
pnpm start      # serve production build
pnpm lint       # next lint
npx tsc --noEmit  # typecheck (no emit)
pnpm test:performance        # source + asset performance contracts
pnpm test:performance:build  # post-build HTML + JS budgets
```

> Server note: the user runs the dev server and previews themselves. Do NOT
> start dev servers or take screenshots. `npx tsc --noEmit` is fine.

## Layout

```
app/
  layout.tsx     # root: fonts (Bagel Fat One + Baloo 2), metadata, pt-BR
  page.tsx       # composes all sections and client islands
  globals.css    # Tailwind import, @theme tokens, keyframes, reveal/UI states
components/
  Header.tsx     # top bar, cart control, CSS MENU overlay
  Hero.tsx       # "PURO DOCE" wordmark flanking centered cheesecake
  Marquee.tsx    # scrolling ticker strip
  Intro.tsx      # brand intro
  Gallery.tsx    # fixed photo grid
  Cardapio.tsx   # server-rendered product menu
  Experience.tsx # full-bleed accent panel
  Curitiba.tsx   # local/delivery section
  CTA.tsx        # call to action
  Footer.tsx     # links + giant outlined wordmark
  RevealObserver.tsx      # shared scroll-reveal client island
  CursorTrail.tsx         # first-pointer cursor loader
  CursorTrailRenderer.tsx # requestAnimationFrame cursor effect
  cart/
    AddToCartButton.tsx    # small cart mutation client island
    DeferredCartDrawer.tsx # loads the drawer after first opening
    CartDrawer.tsx         # CSS slide-in cart + WhatsApp checkout
lib/
  products.ts    # product catalog + static WebP imports
  cart-store.ts  # zustand store (persisted), useCart hook
  order.ts       # WhatsApp order message + iFood/Rappi links
  pix.ts         # DORMANT mock Pix BR Code — kept on disk, not imported
public/assets/   # optimized WebPs; mouse/ contains tiny cursor cutouts
```

Page order (`app/page.tsx`): Header → Hero → Marquee → Intro → Gallery →
Cardapio → Experience → Curitiba → CTA → Footer → deferred cart → CursorTrail.

## Design system

Tokens live in `app/globals.css` `@theme` — use the Tailwind classes, not raw hex.

- Colors: `cream`, `cream-deep`, `sand`, `sand-2`, `caramel` (#B5651D),
  `caramel-dark` (#7A4517), `cacau` (#2A1810), `cacau-soft`, `coffee`,
  `honey`, `gold`, `mocha`, `toast`.
- Fonts: `font-display` (Bagel Fat One), `font-body` (Baloo 2).
- Shadows: `shadow-pop`, `shadow-soft`.
- Outlined-text helpers: `.stroke-cream`, `.stroke-cream-thin`, `.stroke-cacau`.

### Animation

- **CSS keyframes** drive ambient loops and hero entrance: `animate-floaty`,
  `animate-floatySm`, `animate-wobble`, and the `hero-enter-*` classes.
- **Scroll reveals** use `data-reveal` plus one `RevealObserver`. Reveal CSS
  animates individual `translate`/`scale` properties so card hover `transform`
  values compose safely.
- **Cursor trail** uses one sleeping `requestAnimationFrame` loop in
  `CursorTrailRenderer`; it loads only after fine-pointer movement.

Never put two `transform` animations on one element. Use a wrapper when entry
motion and an ambient loop both apply. `prefers-reduced-motion` is honored
globally, and nonessential mobile loops use `.ambient-mobile-off`.

## Responsive

Desktop-first: `clamp()` + `vw` units size most things fluidly. Mobile fixes
use Tailwind breakpoint prefixes (`sm:`, `md:`) so the desktop look is left
untouched. When fixing mobile, add a breakpoint override — don't rewrite the
desktop value.

## Performance contracts

- Runtime image sources ≤ 2.5 MiB.
- Hero source ≤ 250 KiB; cursor sources ≤ 20 KiB each.
- Exactly one generated image preload (hero only).
- Initial modern JavaScript ≤ 170 KiB gzip.
- Static visual sections must not become Client Components.

## Conventions

- `"use client"` only on components using hooks or browser APIs; visual page
  sections stay Server Components.
- Imports use the `@/` alias (repo root).
- Content images use static `next/image` imports and explicit `sizes`; only the
  hero is preloaded. Tiny deferred cursor `<img>` elements use `alt=""`,
  `aria-hidden`, and an eslint disable.
- Cart state uses `useCart` (zustand, localStorage-persisted).
- Checkout routes through `lib/order.ts`: WhatsApp gets the cart as a pre-filled
  `wa.me` message; iFood/Rappi are link-outs. The WhatsApp number is configured;
  iFood/Rappi URLs remain placeholders.
- `lib/pix.ts` + the `qrcode` dep are **dormant** (kept, not imported). Don't
  wire them back in unless asked.
