# PURO DOCE Performance Optimization Design

**Date:** 2026-08-16

**Status:** Approved design, pending written-spec review

## Problem

The landing page is statically generated, but its browser workload is much larger than necessary:

- `public/assets` contains 24.96 MiB of PNG images.
- The generated page preloads 11.32 MiB of images, including below-the-fold and invisible cursor assets.
- `PhotoSlot` inserts another 13.41 MiB of eager images after hydration.
- Full-size image decoding represents roughly 83.5 MiB of RGBA memory before compositor copies.
- Five 1536×1024 cursor images are displayed at only 24–38 px.
- Most sections are Client Components because they import Motion.
- The initial modern JavaScript payload is about 190 KiB gzip, and the whole long page hydrates.
- The page runs approximately 16 continuous CSS animations, while the cursor drives ten chained Motion springs.
- Some elements combine Motion transforms with CSS transform animations.

The route has no API or database waterfall. The dominant problems are image transfer, image decoding, broad hydration, and continuous animation work.

## Goals

1. Preserve the current page structure, brand styling, cart flow, and desktop personality.
2. Reduce initial image transfer so only the hero is high-priority.
3. Reduce runtime image source weight from 24.96 MiB to no more than 2.5 MiB.
4. Eliminate public photo replacement and its synchronous localStorage/base64 path.
5. Make static page sections Server Components.
6. Reduce initial JavaScript and avoid loading cursor/cart implementation before needed.
7. Keep animations adaptive: full balanced treatment on capable desktops, reduced treatment on mobile, and no nonessential motion for reduced-motion users.
8. Add repeatable performance-contract checks that catch regressions.

## Non-goals

- Redesigning the page or changing section order.
- Changing product catalog content, prices, cart semantics, or WhatsApp checkout.
- Adding an admin image editor or CMS.
- Adding analytics or real-user monitoring in this change.
- Reintroducing Pix or changing iFood/Rappi routing.

## Selected approach

Use a hybrid performance refactor:

- Generate right-sized WebP source assets locally.
- Serve responsive content images through `next/image` on Vercel.
- Replace `PhotoSlot` with fixed server-rendered images.
- Convert static sections to Server Components.
- Keep interactivity in small Client Components.
- Replace broad Motion usage with CSS transitions and one shared reveal observer.
- Defer a lightweight requestAnimationFrame-based cursor trail until first fine-pointer movement.

This addresses network, memory, hydration, and runtime costs together while preserving the intended experience.

## Rendering architecture

`app/page.tsx` remains a statically generated Server Component and keeps the existing section order.

The following sections become Server Components:

- `Hero`
- `Marquee`
- `Intro`
- `Gallery`
- `Cardapio`
- `Experience`
- `Curitiba`
- `CTA`
- `Footer`

Small Client Components own browser behavior:

- header menu and cart controls
- product add-to-cart button
- deferred cart drawer loader
- one shared reveal observer
- deferred cursor trail loader and cursor renderer

The cart store and persistence key remain unchanged. Static product cards render on the server, while each add button receives only the product data needed by the cart action.

Motion is removed from the route and from project dependencies. CSS handles menu, cart, reveal, hover, press, and ambient transitions; the cursor uses its dedicated animation-frame loop.

## Reveal and animation behavior

A single Client Component observes all elements marked with `data-reveal`:

1. Content is visible by default in base CSS.
2. On supported browsers, the controller adds a root `reveal-enabled` class and creates one `IntersectionObserver`; only that root class allows unrevealed elements to become hidden.
3. Each element receives a revealed class when it enters the viewport.
4. Revealed elements are immediately unobserved.
5. If JavaScript or `IntersectionObserver` is unavailable, the root class is never added and content remains visible.
6. Under `prefers-reduced-motion: reduce`, content is visible without reveal transitions.

Hero entrance and ambient movement use CSS only. Interactive hover and press effects also use CSS transforms and shadows. CSS and JavaScript animation systems never write `transform` on the same element.

Mobile receives fewer or paused ambient loops. Desktop retains the marquee, hero movement, gallery hover treatment, and cursor personality.

## Cursor trail

The cursor feature is nonessential and must never delay shopping functionality.

- A small loader listens for the first pointer movement only when `(pointer: fine)` matches and reduced motion is not requested.
- The cursor renderer and its image assets are not present in server HTML.
- Five ingredient files are resized to at most 96 px and limited to 20 KiB each.
- One `requestAnimationFrame` loop updates five element refs using interpolation; React state is not updated per frame.
- The loop sleeps once the trail converges and resumes on pointer movement.
- Listeners are passive where applicable and are removed during cleanup.
- If loading fails, the normal pointer and all page functions remain unaffected.

## Image pipeline

Public photo replacement is removed. `PhotoSlot.tsx` and its localStorage/base64 code are deleted.

Fixed gallery images are:

1. Brigadeiro
2. Brownie
3. Cheesecake

Right-sized WebP assets are generated from the current PNG sources:

- hero cheesecake: up to 1024 px
- product cards: at most 800×600
- experience image: at most 1280 px wide
- mascot: up to approximately 420 px wide
- cursor ingredients: at most 96 px
- background pattern: existing dimensions, WebP encoded
- intro image: existing dimensions, WebP encoded

Unused PNG copies are deleted after output validation. Git history remains the source archive.

Content images use static `next/image` imports with explicit `sizes`, dimensions supplied by the imports, and existing meaningful alt text. Only the above-the-fold hero uses image preload/high fetch priority. All below-the-fold content images use lazy loading. Tiny deferred cursor images use plain image elements to avoid optimizer overhead.

## Performance budgets

Automated checks enforce:

| Budget | Limit |
| --- | ---: |
| Total runtime image source files | ≤ 2.5 MiB |
| Hero source image | ≤ 250 KiB |
| Each cursor image | ≤ 20 KiB |
| Image preloads in generated route HTML | Exactly 1 |
| Initial modern JavaScript | ≤ 170 KiB gzip |

The JavaScript budget excludes `nomodule` compatibility chunks and includes every modern script referenced by the generated `/` HTML.

## Cart and navigation behavior

These behaviors must remain unchanged:

- Header cart count reflects persisted lines.
- Adding an item opens the cart.
- Quantity, removal, clear, and total calculations retain current semantics.
- The cart persists under `puro-doce-cart`.
- Checkout collects name and bairro, opens the existing WhatsApp URL, clears the cart, and shows confirmation.
- Menu links continue targeting the same section anchors.
- iFood and Rappi links retain their existing configuration.

Menu and cart visual transitions move from Motion to CSS. The cart implementation loads on first opening, remains mounted afterward, and toggles CSS state classes so subsequent openings are immediate. A lightweight loading state covers only the first dynamic import.

## Resilience and accessibility

- Static imports make missing content images a build failure rather than a silent runtime failure.
- Content remains readable if reveal JavaScript fails.
- Cursor failure has no impact on navigation, cart, or checkout.
- Existing `prefers-reduced-motion` behavior is strengthened rather than removed.
- Decorative images keep empty alt text and `aria-hidden` where appropriate.
- Meaningful food images retain descriptive alt text.
- Fixed image dimensions prevent layout shift.
- Existing keyboard and dialog semantics are preserved during the menu/cart refactor.

## Testing strategy

Use Node's built-in test runner so the optimization adds no test framework dependency.

### Performance contract tests

Tests are written before implementation and initially fail against the current application. They verify:

- runtime image source total and per-file limits
- hero and cursor file budgets
- no runtime source references to the removed PNG assets
- no `PhotoSlot` imports or component file
- no `motion/react` imports after migration
- designated static sections do not contain `"use client"`
- generated route HTML contains exactly one image preload
- generated route JavaScript meets the gzip target

Source-level checks run without a build. Generated-output checks run after a production build.

### Regression verification

Run:

1. performance contract tests
2. `npx tsc --noEmit`
3. a fresh production build
4. post-build performance checks
5. Git diff/status inspection

Record before-and-after transfer, preload, decoded-source, and JavaScript figures in the implementation summary. Lighthouse and field Core Web Vitals are validated against the Vercel preview because this repository's workflow does not permit the agent to start a preview server or take screenshots.

## Expected result

The first response remains static HTML, but the browser discovers only the optimized hero as a high-priority image. Below-the-fold images load responsively near the viewport. The invisible cursor contributes no initial requests or decoded memory. Most visual content requires no hydration, and continuous pointer work is reduced to a small deferred animation loop. Shopping behavior remains unchanged.
