# PURO DOCE — Design Specification

This document defines the product experience and visual language for PURO
DOCE. It is the high-level reference for design decisions. The implementation
tokens and motion details remain in `app/globals.css` and `docs/design.md`.

## 1. Product intent

PURO DOCE is a mobile-first storefront for a handmade confectionery in
Curitiba. The page has two jobs:

1. Create appetite and affection immediately.
2. Turn that interest into a simple order through WhatsApp, iFood, or Rappi.

The experience should feel warm, playful, generous, and handcrafted. It must
not resemble a corporate dashboard or a generic ecommerce template.

## 2. Experience principles

- **Food first.** Product imagery and product names should dominate the page.
- **Warm and human.** Rounded type, imperfect compositions, and conversational
  Portuguese reinforce the handmade character.
- **Bold, not noisy.** Large wordmarks and stickers create personality, while
  spacing and a limited palette preserve clarity.
- **Ordering without friction.** The path from product discovery to WhatsApp
  should require as little input as possible.
- **Mobile is the primary journey.** The interface must remain clear and
  touch-friendly from 360 px upward.

## 3. Brand personality

The brand voice is affectionate, direct, and local. It should communicate:

- doce de verdade;
- feito à mão;
- feito fresco;
- ingredients and care over industrial shortcuts;
- familiarity with Curitiba and its neighborhoods.

Avoid technical language, aggressive sales copy, artificial urgency, and
claims that are not supported by the business.

## 4. Visual direction

The visual system combines confectionery warmth with editorial scale:

- oversized, overlapping wordmarks;
- asymmetrical compositions and floating product imagery;
- rounded cards, pills, and buttons;
- offset shadows with a tactile candy-button feel;
- stickers such as “FEITO FRESCO” and “FEITO COM AMOR”;
- cream surfaces with concentrated caramel, cacao, honey, and gold accents.

Decorations may cross container edges on large screens, but they must never
obscure content, controls, or prices.

## 5. Color system

Use the Tailwind theme tokens declared in `app/globals.css`. Do not introduce
raw color values inside components when an existing token expresses the same
role.

| Token | Value | Primary role |
| --- | --- | --- |
| `cream` | `#F7ECDD` | Main page background |
| `cream-deep` | `#F4E6D2` | Hero and warm section surfaces |
| `sand`, `sand-2` | `#EFE0C8`, `#E9D6B8` | Borders and quiet fills |
| `caramel` | `#B5651D` | Primary actions and brand emphasis |
| `caramel-dark` | `#7A4517` | Pressed states, shadows, deep accents |
| `cacau` | `#2A1810` | Main text and dark sections |
| `cacau-soft` | `#3A2014` | Wordmarks and secondary dark surfaces |
| `honey`, `gold` | `#EEBB55`, `#FFC23C` | Stickers and small highlights |
| `coffee`, `mocha`, `toast` | Theme tokens | Supporting decorative details |

Cream and cacao should carry most of the interface. Gold is an accent, not a
large-area background color.

## 6. Typography

### Display

`font-display` uses Bagel Fat One. Reserve it for wordmarks, section headlines,
prices that need emphasis, and short decorative phrases. It should feel loud
and rounded, not dense.

### Body

`font-body` uses Baloo 2 in weights 400–800. Use it for navigation, paragraphs,
product information, labels, forms, and buttons.

### Scale

- Use fluid sizes with `clamp()` for major headlines and wordmarks.
- Keep paragraphs within readable line lengths, normally 45–70 characters.
- Preserve strong contrast between display copy, supporting copy, and labels.
- Use outlined text helpers only for short display elements.

## 7. Spatial system

- Center primary content in a generous maximum-width container.
- Use fluid horizontal padding based on viewport width.
- Give each page section enough vertical space to read as a distinct scene.
- Prefer deliberate overlap to arbitrary negative margins.
- Keep interactive controls inside predictable, stable hit areas.
- Use `shadow-pop` for tactile actions and `shadow-soft` for elevated cards.

The composition may break the grid visually, but the reading order and
interactive structure must remain simple.

## 8. Page composition

The homepage follows this narrative order:

1. **Header** — navigation, mobile menu, and cart status.
2. **Hero** — immediate brand recognition and a strong food image.
3. **Marquee** — rhythm, product language, and brand energy.
4. **Intro** — handmade story and value proposition.
5. **Gallery** — appetite-building product imagery.
6. **Cardápio** — browsable catalog, prices, and add-to-cart actions.
7. **Experience** — emotional and craft-focused proof.
8. **Curitiba** — local context and delivery information.
9. **CTA** — decisive route toward ordering.
10. **Footer** — contact and brand closure.

Do not reorder sections without considering the funnel from desire to
selection to order.

## 9. Component behavior

### Header

- Remains easy to scan over decorative backgrounds.
- Exposes the cart count clearly.
- Collapses into a touch-friendly mobile menu.
- Uses anchor navigation to the page’s major sections.

### Product cards

- Product image, name, description, price, and add action must be immediately
  distinguishable.
- Price and add-to-cart affordance should remain visible without hover.
- Hover states may lift a card, but must not shift surrounding layout.

### Cart drawer

- Opens as a focused side panel without losing the current page context.
- Supports quantity changes, line removal, clearing, and total review.
- Presents customer name and bairro only when advancing to the order step.
- Makes WhatsApp the primary completion path and iFood/Rappi secondary paths.
- Provides a clear close action and restores body interaction when dismissed.

### Buttons and links

- Primary actions use caramel with high-contrast text and a tactile shadow.
- Pressed states reduce the shadow and translate the control slightly.
- Text links remain visually identifiable without relying only on color.
- Every interactive target should be at least 44 × 44 px on touch devices.

## 10. Imagery

- Use optimized WebP assets from `public/assets`.
- Preserve natural product proportions; do not stretch food photography.
- Use `next/image` for responsive rendering when the image participates in
  layout.
- Limit eager loading and priority to the essential hero image.
- Decorative images must use empty alternative text or be hidden from
  assistive technology.

## 11. Motion

Motion should feel soft, bouncy, and food-like, never mechanical.

- Hero entrances happen once and establish hierarchy.
- Scroll reveals use the shared `RevealObserver` and `data-reveal` contract.
- Ambient float and wobble loops are limited to decorative elements.
- Hover motion must not interfere with entrance transforms.
- The cursor trail is desktop-only, loads after first fine-pointer movement,
  and remains nonessential.
- `prefers-reduced-motion: reduce` must disable or collapse decorative motion.

Avoid adding a general animation runtime for effects that CSS can express.

## 12. Responsive behavior

- Design and test from 360 px phones to wide desktop displays.
- Use fluid `clamp()` and viewport sizing for the base composition.
- Apply Tailwind breakpoint overrides for specific collisions or layout shifts.
- Hide nonessential decorations on narrow screens instead of shrinking them
  until they become visual noise.
- Product cards and cart controls must remain usable without hover.
- Prevent horizontal overflow at every breakpoint.

## 13. Accessibility

- Maintain visible keyboard focus for links, buttons, forms, and drawer
  controls.
- Keep heading levels sequential and section landmarks meaningful.
- Provide labels for form controls and accessible names for icon buttons.
- Ensure foreground/background combinations preserve readable contrast.
- Do not encode meaning exclusively through color, motion, or position.
- Keep content visible when JavaScript or IntersectionObserver is unavailable.
- Lock and restore focus appropriately when the cart drawer is modal.

## 14. Content rules

- Customer-facing copy is Brazilian Portuguese.
- Product names and prices come from `lib/products.ts`.
- Currency uses Brazilian real formatting.
- WhatsApp order copy must include customer name, bairro, items, quantities,
  and total.
- Contact, delivery, marketplace, and business claims must remain accurate.

## 15. Implementation rules

- Prefer Server Components for static visual sections.
- Add Client Components only for state, browser APIs, or direct interaction.
- Reuse design tokens and existing CSS utilities before introducing new ones.
- Keep catalog data out of visual components.
- Preserve the persisted Zustand cart contract.
- Do not couple optional decoration failures to the ordering experience.
- Run Biome, tests, and the production build after significant design changes.

## 16. Design review checklist

Before approving a UI change, verify:

- Does it strengthen the handmade, warm, playful identity?
- Is the food or ordering journey still the visual priority?
- Does it work at 360 px without overlap or horizontal scrolling?
- Are controls readable, keyboard accessible, and touch-friendly?
- Does reduced-motion mode remain comfortable?
- Are existing tokens and patterns reused consistently?
- Does the cart-to-WhatsApp flow still work without unnecessary steps?
- Does the page remain fast enough for mobile traffic?

