# Roadmap

## Done
- Migrated the old static HTML prototype to Next.js (App Router) + Tailwind v4
  + Motion.
- All page sections built and ordered.
- Cart: add / qty / remove / clear, header badge, persisted drawer.
- WhatsApp ordering: cart → form → pre-filled `wa.me` message + iFood/Rappi
  link-outs. Pix retired to dormant (`lib/pix.ts` + `qrcode` kept on disk).
- Mobile pass: stacked Hero paragraphs, hidden overlap-prone stickers, fixed
  Header overflow.
- Footer ingredient cutouts removed — wordmark zone is clean now.

## Next
- **Fill real channel values** in `lib/order.ts`: `WHATSAPP_NUMBER`,
  `IFOOD_URL`, `RAPPI_URL` (all placeholders today).
- **Order persistence.** Optionally log orders (DB / backend) instead of only
  firing a WhatsApp message.
- **Live menu source.** Move `lib/products.ts` to a CMS/API so the shop can
  edit the menu without a deploy.

## Known gaps / watch
- Hero cake min-width is `clamp(380px,...)`; on ~360px phones it nearly touches
  the edges. Shrinking risks exposing the swirl collision the cake covers —
  pending a preview decision.
- `lib/order.ts` ships placeholder number/URLs — orders go nowhere until set.
- Header/footer contact links still point at `#contato` placeholders.
- Pix code is dormant, not deleted — remove fully if Pix is never coming back.

## Constraints
- The user runs the dev server / previews. Don't start servers or take
  screenshots. Use `npx tsc --noEmit` to verify.
