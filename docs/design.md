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

Food-like and bouncy. Two systems — **never on the same element** (both write
`transform` and fight):

### 1. CSS keyframes (`globals.css`) — ambient loops
`animate-floaty`, `animate-floatySm`, `animate-wobble`, `animate-boing`,
`animate-spinSlow`, `animate-drift`.

Tuned per element with CSS custom props in inline `style`, cast
`as React.CSSProperties`: `--dx`, `--dy`, `--r`.

### 2. Motion (`motion/react`) — reveals & springs
`whileInView` for scroll reveals (staggered delays), spring transitions, and
interactive `x`/`y`.

`prefers-reduced-motion: reduce` collapses all animation globally.

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
  letting them collide (e.g. Hero corner stickers, Header DOCES pill).
- Must hold from ~360px phones up to wide desktop.
