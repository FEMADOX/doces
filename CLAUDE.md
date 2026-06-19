# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

**PURO DOCE** — marketing + ordering site for a Curitiba brigadeiro/doces shop.
Single long-scroll landing page with a Pix checkout (mock). Next.js App Router,
React 19, TypeScript strict, Tailwind v4, Motion for animation.

Originally a static HTML prototype; rebuilt as this Next.js app. The old
prototype lived in the parent `doces/` folder and has been removed.

## Commands

```bash
pnpm dev        # next dev (Turbopack)
pnpm build      # next build
pnpm start      # serve production build
pnpm lint       # next lint
npx tsc --noEmit  # typecheck (no emit)
```

> Server note: the user runs the dev server and previews themselves. Do NOT
> start dev servers or take screenshots. `npx tsc --noEmit` is fine.

## Layout

```
app/
  layout.tsx     # root: fonts (Bagel Fat One + Baloo 2), metadata, pt-BR
  page.tsx       # composes all sections in order
  globals.css    # Tailwind import, @theme tokens, keyframes, util classes
components/
  Header.tsx     # fixed top bar: logo, DOCES pill, cart, MENU overlay
  Hero.tsx       # "PURO DOCE" wordmark flanking centered cheesecake
  Marquee.tsx    # scrolling ticker strip
  Intro.tsx      # brand intro
  Gallery.tsx    # photo grid (uses PhotoSlot)
  Cardapio.tsx   # product menu -> add to cart
  Experience.tsx # full-bleed accent panel
  Curitiba.tsx   # local/delivery section
  CTA.tsx        # call to action
  Footer.tsx     # links + giant outlined wordmark + sprinkling cutouts
  CursorTrail.tsx# custom cursor effect
  PhotoSlot.tsx  # image slot helper
  cart/
    CartDrawer.tsx # slide-in cart + Pix checkout
lib/
  products.ts    # product catalog (id, name, price BRL, badge)
  cart-store.ts  # zustand store (persisted), useCart hook
  order.ts       # WhatsApp order message + iFood/Rappi links (channel config)
  pix.ts         # DORMANT mock Pix BR Code — kept on disk, not imported
public/assets/   # all images; mouse/ holds footer ingredient cutouts
```

Page order (`app/page.tsx`): Header → Hero → Marquee → Intro → Gallery →
Cardapio → Experience → Curitiba → CTA → Footer → CartDrawer → CursorTrail.

## Design system

Tokens live in `app/globals.css` `@theme` — use the Tailwind classes, not raw hex.

- Colors: `cream`, `cream-deep`, `sand`, `sand-2`, `caramel` (#B5651D),
  `caramel-dark` (#7A4517), `cacau` (#2A1810), `cacau-soft`, `coffee`,
  `honey`, `gold`, `mocha`, `toast`.
- Fonts: `font-display` (Bagel Fat One), `font-body` (Baloo 2).
- Shadows: `shadow-pop`, `shadow-soft`.
- Outlined-text helpers: `.stroke-cream`, `.stroke-cream-thin`, `.stroke-cacau`.

### Animation

Two systems — keep them separate, never on the same element:

1. **CSS keyframes** (`globals.css`): `animate-floaty`, `animate-floatySm`,
   `animate-wobble`, `animate-boing`, `animate-spinSlow`, `animate-drift`.
   Tuned per-element via CSS custom props passed as inline `style` cast
   `as React.CSSProperties` (e.g. `--dx`, `--dy`, `--r`).
2. **Motion** (`motion/react`): `whileInView`, springs, `x`/`y`. Use for
   scroll reveals and interactive springs.

> Gotcha: CSS `transform` animations and Motion's `x`/`y` both write
> `transform`. Putting both on one element fights. Pick one per element.

`prefers-reduced-motion` is honored globally in `globals.css`.

## Responsive

Desktop-first: `clamp()` + `vw` units size most things fluidly. Mobile fixes
use Tailwind breakpoint prefixes (`sm:`, `md:`) so the desktop look is left
untouched. When fixing mobile, add a breakpoint override — don't rewrite the
desktop value.

## Conventions

- `"use client"` on any component using hooks, Motion, or browser APIs.
- Imports use the `@/` alias (repo root).
- Decorative `<img>`: `alt=""` + `aria-hidden`, and an eslint-disable for
  `@next/next/no-img-element` (these cutouts intentionally bypass next/image).
- Cart state via `useCart` (zustand, localStorage-persisted).
- Checkout routes through `lib/order.ts`: WhatsApp gets the cart as a pre-filled
  `wa.me` message; iFood/Rappi are link-outs. Real number/URLs are placeholder
  TODO constants there — don't assume they're live.
- `lib/pix.ts` + the `qrcode` dep are **dormant** (kept, not imported). Don't
  wire them back in unless asked.
