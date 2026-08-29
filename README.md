# PURO DOCE 🍓

Marketing + ordering site for a Curitiba brigadeiro & doces shop. Long-scroll
landing page with a persisted cart and WhatsApp ordering flow.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` tokens)
- CSS animation + one shared IntersectionObserver for progressive reveals
- **Zustand** (persisted) for cart state
- **qrcode** retained only by the dormant Pix helper

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm build      # production build
pnpm start      # serve the build
pnpm lint       # next lint
```

## Performance checks

```bash
pnpm test:performance
pnpm build
pnpm test:performance:build
```

Budgets: runtime image sources ≤ 2.5 MiB, hero ≤ 250 KiB, each cursor image
≤ 20 KiB, exactly one image preload, and initial modern JavaScript ≤ 170 KiB
gzip.

## Structure

| Path | What |
|------|------|
| `app/` | layout, page composition, `globals.css` (theme + keyframes) |
| `components/` | one file per page section + cart drawer + cursor trail |
| `lib/` | `products.ts` catalog, `cart-store.ts` zustand store, `pix.ts` mock Pix code |
| `public/assets/` | images (`mouse/` = footer ingredient cutouts) |

Page sections render in this order: Header → Hero → Marquee → Intro → Gallery
→ Cardapio → Experience → Curitiba → CTA → Footer.

## Dormant Pix helper

`lib/pix.ts` and `qrcode` remain on disk for a possible future Pix flow, but
neither is imported by the current WhatsApp checkout.

## Notes for contributors

See [`CLAUDE.md`](./CLAUDE.md) for the design system, animation constraints,
and responsive conventions.
