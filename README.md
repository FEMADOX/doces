# PURO DOCE 🍓

Marketing + ordering site for a Curitiba brigadeiro & doces shop. Long-scroll
landing page with a mock Pix checkout.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme` tokens)
- **Motion** (`motion/react`) for animation
- **Zustand** (persisted) for cart state
- **qrcode** for the Pix QR

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

## Structure

| Path | What |
|------|------|
| `app/` | layout, page composition, `globals.css` (theme + keyframes) |
| `components/` | one file per page section + cart drawer + cursor trail |
| `lib/` | `products.ts` catalog, `cart-store.ts` zustand store, `pix.ts` mock Pix code |
| `public/assets/` | images (`mouse/` = footer ingredient cutouts) |

Page sections render in this order: Header → Hero → Marquee → Intro → Gallery
→ Cardapio → Experience → Curitiba → CTA → Footer.

## Pix checkout

`lib/pix.ts` generates a well-formed EMV-MPM "BR Code" with a valid CRC16
checksum, so the QR scans correctly — but the key is **fictional and demo
only**. No real charge is created.

## Notes for contributors

See [`CLAUDE.md`](./CLAUDE.md) for the design system (color tokens, fonts, the
two animation systems and how to keep them apart) and responsive conventions.
