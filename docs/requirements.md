# Requirements

## Functional

### Content & sections
- [x] Single long-scroll page composed of ordered sections: Header, Hero,
      Marquee, Intro, Gallery, Cardapio, Experience, Curitiba, CTA, Footer.
- [x] Hero with the "PURO DOCE" wordmark flanking a centered cheesecake.
- [x] Product menu (Cardapio) driven by a catalog in `lib/products.ts`.
- [x] Local/delivery info (Curitiba) — WhatsApp, Instagram, iFood/Rappi links.

### Cart
- [x] Add a product to the cart from the menu.
- [x] Change quantity, remove a line, clear the cart.
- [x] Cart count badge in the header.
- [x] Cart persists across reloads (localStorage via zustand persist).
- [x] Slide-in cart drawer with line items and total.

### Checkout (order routing)
- [x] Collect customer name + bairro (form step). Customer does NOT enter a
      phone — the message goes to the shop's own WhatsApp.
- [x] Build a pre-filled order message (name, bairro, line items, total) and
      open WhatsApp via `wa.me` deep link — customer just hits send.
- [x] Alternative channel buttons: iFood / Rappi (link-out to the shop's
      storefront — they can't receive the cart).
- [x] Confirmation step after sending.
- [x] Shop WhatsApp wired: `554195430718` (41 9543-0718) in `lib/order.ts`.
- [ ] Real iFood/Rappi URLs — still placeholders in `lib/order.ts`.
- Pix is **dormant**: `lib/pix.ts` + the `qrcode` dep remain on disk but are
  no longer wired into the flow. See [roadmap](./roadmap.md).

### Navigation
- [x] Header logo + DOCES pill + cart button + MENU.
- [x] Full-screen MENU overlay with anchored section links.

## Non-functional

### Responsive
- Must look intentional on phones (~360px) through wide desktop.
- Desktop-first fluid sizing (`clamp()` + `vw`); mobile handled via Tailwind
  `sm:`/`md:` overrides without disturbing desktop values.

### Performance
- Next.js App Router, Turbopack. Google fonts via `next/font` with `swap`.
- Static visual sections remain Server Components; interactivity uses small
  client islands.
- Runtime image sources ≤ 2.5 MiB; hero ≤ 250 KiB; cursor files ≤ 20 KiB each.
- Exactly one generated image preload and ≤ 170 KiB gzip initial modern JS.
- Below-the-fold images are responsive and lazy; cursor assets load only after
  fine-pointer interaction.
- `overflow-x: hidden` prevents horizontal scroll from oversized art.

### Accessibility
- Decorative images: `alt=""` + `aria-hidden`.
- MENU overlay is a labelled modal dialog.
- `prefers-reduced-motion` disables animation globally.
- Page language `pt-BR`.

### SEO / sharing
- Title + description + Open Graph metadata in `app/layout.tsx` (Portuguese).

### Quality
- TypeScript strict; `npx tsc --noEmit` must pass clean.

## Out of scope (for now)
- Real payment processing / order persistence / admin backend.
- User accounts, auth.
- Multi-language (page is pt-BR only).
