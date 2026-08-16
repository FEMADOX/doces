# Design

The look-and-feel reference. Tokens live in `app/globals.css` `@theme` — use
the Tailwind classes, never raw hex in components.

## Color

The product's own colors: caramel, cacau, cream.

| Token | Hex | Use |
|-------|-----|-----|
| `cream` | #F7ECDD | page background |
| `cream-deep` | #F4E6D2 | hero background |
| `sand` / `sand-2` | #EFE0C8 / #E9D6B8 | borders, soft fills |
| `caramel` | #B5651D | primary brand / buttons |
| `caramel-dark` | #7A4517 | shadows, deep accents |
| `cacau` | #2A1810 | text, dark sections |
| `cacau-soft` | #3A2014 | wordmark fill |
| `honey` / `gold` | #EEBB55 / #FFC23C | highlights, stickers |
| `mocha` / `toast` / `coffee` | — | dot/detail accents |

Dominant warm browns with sharp honey/gold accents — not an evenly spread
palette.

## Typography

- **Display** — `font-display` = Bagel Fat One. Fat, rounded, loud. Wordmarks
  and headlines only.
- **Body** — `font-body` = Baloo 2 (weights 400–800). Friendly, readable.

Outlined-text helpers: `.stroke-cream`, `.stroke-cream-thin`, `.stroke-cacau`
(use `-webkit-text-stroke` + `paint-order: stroke`).

## Motion

Food-like and bouncy, implemented without a general animation runtime:

### Ambient and entrance CSS

`animate-floaty`, `animate-floatySm`, and `animate-wobble` provide ambient
loops. `hero-enter-left`, `hero-enter-right`, `hero-enter-up`, and
`hero-enter-pop` provide one-time hero entrances.

If an element needs both entrance and ambient motion, put them on nested
wrappers. Two keyframes that both write `transform` must never share an
element.

### Scroll reveals

Static section markup uses `data-reveal`. One `RevealObserver` adds
`.is-revealed` and unobserves each node. Reveal CSS uses the individual
`translate` and `scale` properties, allowing card hover `transform` values to
compose without conflicts. Content is visible by default when JavaScript or
IntersectionObserver is unavailable.

### Cursor trail

The desktop cursor trail loads after the first fine-pointer movement. One
sleeping `requestAnimationFrame` loop updates five refs; it does not set React
state per frame. It is absent for coarse pointers and reduced-motion users.

`prefers-reduced-motion: reduce` collapses animation globally. Nonessential
mobile loops use `.ambient-mobile-off`.

## Shadows

`shadow-pop` (chunky offset, candy-button feel) and `shadow-soft` (diffuse
lift). Defined as theme tokens.

## Spatial style

Big overlapping wordmarks, elements that drift over edges, asymmetric stickers
("FEITO FRESCO" / "FEITO COM AMOR"). Bold and grid-breaking, not boxed-in.

## Responsive rules

- Desktop-first: `clamp()` + `vw` for fluid base sizing.
- Fix mobile with Tailwind `sm:`/`md:` overrides — add a breakpoint value,
  don't rewrite the desktop one.
- Hide overlap-prone decorations on phones (`hidden md:block`) rather than
  letting them collide.
- Must hold from ~360px phones up to wide desktop.
