# PURO DOCE Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce initial transfer, decoded image memory, hydration, and cursor animation work while preserving the page design, cart behavior, and balanced desktop motion.

**Architecture:** Keep the long page statically generated and move visual sections back to Server Components. Serve right-sized WebP files through `next/image`, isolate cart/menu controls into small client islands, use one IntersectionObserver for reveals, and dynamically mount a requestAnimationFrame cursor trail after fine-pointer interaction.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4, Zustand, Node test runner, Python 3 with Pillow WebP support, Vercel Image Optimization.

## Global Constraints

- Preserve section order, brand styling, product content, cart semantics, persistence key `puro-doce-cart`, and WhatsApp checkout behavior.
- Public visitors cannot upload or replace photos.
- Fixed gallery images are Brigadeiro, Brownie, and Cheesecake.
- Runtime image sources must total no more than 2.5 MiB.
- The hero source must be no more than 250 KiB.
- Each cursor source must be no more than 20 KiB and at most 96 px wide.
- Generated `/` HTML must contain exactly one image preload.
- Initial modern JavaScript must be no more than 170 KiB gzip; `nomodule` chunks are excluded.
- Only the hero is preloaded; all below-the-fold images are lazy.
- Static sections remain Server Components.
- Content remains visible when JavaScript, IntersectionObserver, or cursor loading is unavailable.
- Honor `prefers-reduced-motion`; simplify ambient effects on mobile.
- Do not start a development/preview server or take screenshots.
- Use `@/` imports, design tokens, TypeScript strict mode, and existing responsive conventions.

---

## File Structure

### New files

- `scripts/optimize-images.py` — deterministic source-to-WebP conversion and output-size validation.
- `tests/performance-contract.test.mjs` — source, architecture, dependency, and asset budgets.
- `tests/build-performance.test.mjs` — generated HTML preload and compressed JavaScript budgets.
- `components/cart/AddToCartButton.tsx` — minimal client cart mutation island.
- `components/cart/DeferredCartDrawer.tsx` — loads the drawer only after the cart first opens.
- `components/RevealObserver.tsx` — one observer for all server-rendered reveal markers.
- `components/CursorTrailRenderer.tsx` — deferred ref-based cursor animation loop.

### Removed files

- `components/PhotoSlot.tsx` — public image editing and localStorage data URLs are removed.
- All `public/assets/**/*.png` files after validated WebP replacements exist.

### Modified files

- `package.json`, `pnpm-lock.yaml`, `package-lock.json` — performance scripts and Motion removal.
- `app/page.tsx` — shared observer and deferred cart/cursor islands.
- `app/globals.css` — reveal, entry, menu, drawer, interaction, mobile-motion, and cursor styles.
- `lib/products.ts` — static WebP imports and a serializable cart-product type.
- `lib/cart-store.ts` — accept the narrowed cart-product type.
- `components/Header.tsx` — CSS menu transition; no Motion.
- `components/Hero.tsx` — server-rendered optimized hero with the sole preload.
- `components/Marquee.tsx` — Server Component.
- `components/Intro.tsx` — fixed server-rendered image.
- `components/Gallery.tsx` — fixed gallery images and CSS interactions.
- `components/Cardapio.tsx` — server-rendered cards with client add buttons.
- `components/Experience.tsx` — optimized server-rendered image.
- `components/Curitiba.tsx` — data-driven server markup and reveal markers.
- `components/CTA.tsx` — Server Component and CSS reveal.
- `components/Footer.tsx` — Server Component and CSS reveal.
- `components/cart/CartDrawer.tsx` — mounted CSS drawer state; no Motion.
- `components/CursorTrail.tsx` — first-pointer dynamic loader.
- `README.md` — performance test commands and budgets.

---

### Task 1: Add the red performance contract

**Files:**
- Create: `tests/performance-contract.test.mjs`
- Create: `tests/build-performance.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `pnpm test:performance` for source/assets and `pnpm test:performance:build` for `.next` output.
- Consumes: repository files and `.next/server/app/index.html`; no application imports.

- [ ] **Step 1: Add test scripts**

Add these scripts without changing existing build/start scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test:performance": "node --test tests/performance-contract.test.mjs",
    "test:performance:build": "node --test tests/build-performance.test.mjs"
  }
}
```

- [ ] **Step 2: Write the source and asset contract**

Create `tests/performance-contract.test.mjs` with recursive file helpers and these exact assertions:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const assetRoot = join(root, "public/assets");
const sourceRoots = ["app", "components", "lib"].map((path) => join(root, path));
const staticSections = [
  "Hero.tsx",
  "Marquee.tsx",
  "Intro.tsx",
  "Gallery.tsx",
  "Cardapio.tsx",
  "Experience.tsx",
  "Curitiba.tsx",
  "CTA.tsx",
  "Footer.tsx",
];
const cursorNames = ["morango", "cacau", "coco", "castanhas", "tamara"];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function sourceText() {
  return sourceRoots
    .flatMap(walk)
    .filter((path) => /\.(?:ts|tsx|css)$/.test(path))
    .map((path) => `${relative(root, path)}\n${readFileSync(path, "utf8")}`)
    .join("\n");
}

function webpDimensions(buffer) {
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  for (let offset = 12; offset + 8 <= buffer.length;) {
    const type = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (type === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(data + 4, 3),
        height: 1 + buffer.readUIntLE(data + 7, 3),
      };
    }
    if (type === "VP8 ") {
      return {
        width: buffer.readUInt16LE(data + 6) & 0x3fff,
        height: buffer.readUInt16LE(data + 8) & 0x3fff,
      };
    }
    offset = data + size + (size % 2);
  }
  throw new Error("unsupported WebP container");
}

test("optimized WebP assets meet source budgets", () => {
  const webpFiles = walk(assetRoot).filter((path) => extname(path) === ".webp");
  assert.ok(webpFiles.length >= 16, "all sixteen runtime images must have WebP outputs");
  const total = webpFiles.reduce((bytes, path) => bytes + statSync(path).size, 0);
  assert.ok(total <= 2.5 * 1024 * 1024, `WebP sources use ${total} bytes`);

  const hero = join(assetRoot, "cheesecake.webp");
  assert.ok(existsSync(hero), "optimized hero is missing");
  assert.ok(statSync(hero).size <= 250 * 1024, "hero exceeds 250 KiB");

  for (const name of cursorNames) {
    const path = join(assetRoot, "mouse", `${name}.webp`);
    assert.ok(existsSync(path), `${name}.webp is missing`);
    assert.ok(statSync(path).size <= 20 * 1024, `${name}.webp exceeds 20 KiB`);
    const { width } = webpDimensions(readFileSync(path));
    assert.ok(width <= 96, `${name}.webp is ${width}px wide`);
  }
});

test("runtime image tree contains no PNG files", () => {
  const pngFiles = walk(assetRoot).filter((path) => extname(path).toLowerCase() === ".png");
  assert.deepEqual(pngFiles, []);
});

test("public photo editor is removed", () => {
  assert.equal(existsSync(join(root, "components/PhotoSlot.tsx")), false);
  assert.doesNotMatch(sourceText(), /PhotoSlot|puro-doce-photo:|FileReader/);
});

test("visual sections are server components", () => {
  for (const file of staticSections) {
    const text = readFileSync(join(root, "components", file), "utf8");
    assert.doesNotMatch(text, /^"use client"/m, `${file} is still a Client Component`);
    assert.doesNotMatch(text, /motion\/react/, `${file} still imports Motion`);
  }
});

test("Motion is absent from runtime source and dependencies", () => {
  assert.doesNotMatch(sourceText(), /motion\/react|useSpring|useMotionValue/);
  const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(packageJson.dependencies.motion, undefined);
});

test("runtime source references only optimized image extensions", () => {
  assert.doesNotMatch(sourceText(), /\/assets\/[A-Za-z0-9_./-]+\.png/);
});
```

- [ ] **Step 3: Write the generated-output contract**

Create `tests/build-performance.test.mjs`:

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";

const root = resolve(import.meta.dirname, "..");
const htmlPath = resolve(root, ".next/server/app/index.html");

function routeHtml() {
  assert.ok(existsSync(htmlPath), "run a production build before this test");
  return readFileSync(htmlPath, "utf8");
}

test("generated route preloads only one image", () => {
  const html = routeHtml();
  const preloads = html.match(/<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*>/gi) ?? [];
  assert.equal(preloads.length, 1, `found ${preloads.length} image preloads`);
  assert.doesNotMatch(html, /\/assets\/mouse\//);
});

test("initial modern JavaScript stays within 170 KiB gzip", () => {
  const html = routeHtml();
  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/gi)]
    .filter((match) => !/\bnomodule\b/i.test(match[0]))
    .map((match) => match[1]);
  const uniqueScripts = [...new Set(scripts)];
  const gzipBytes = uniqueScripts.reduce((total, source) => {
    const outputPath = resolve(root, ".next", source.replace(/^\/_next\//, ""));
    return total + gzipSync(readFileSync(outputPath), { level: 9 }).byteLength;
  }, 0);
  console.log(`initial modern JavaScript: ${(gzipBytes / 1024).toFixed(1)} KiB gzip`);
  assert.ok(gzipBytes <= 170 * 1024, `${gzipBytes} gzip bytes exceeds the budget`);
});
```

- [ ] **Step 4: Run the baseline tests and verify red state**

Run:

```bash
node --test tests/performance-contract.test.mjs
node --test tests/build-performance.test.mjs
```

Expected: failures report missing WebP outputs, remaining PNGs/PhotoSlot/Motion/client sections, more than one image preload, and JavaScript above 170 KiB gzip.

- [ ] **Step 5: Commit the verified red contract**

```bash
git add package.json tests/performance-contract.test.mjs tests/build-performance.test.mjs
git commit -m "test: define performance budgets"
```

---

### Task 2: Generate optimized WebP assets

**Files:**
- Create: `scripts/optimize-images.py`
- Create: `public/assets/**/*.webp`
- Test: `tests/performance-contract.test.mjs`

**Interfaces:**
- Produces: WebP files at the same relative paths and base names as current PNG files.
- Consumes: Pillow `Image.open`, current PNG sources, maximum width/height tuples.

- [ ] **Step 1: Confirm the asset test still fails for missing outputs**

Run:

```bash
node --test --test-name-pattern="optimized WebP assets" tests/performance-contract.test.mjs
```

Expected: FAIL with `all sixteen runtime images must have WebP outputs`.

- [ ] **Step 2: Create the deterministic Pillow encoder**

Create `scripts/optimize-images.py`:

```python
#!/usr/bin/env python3
from pathlib import Path

try:
    from PIL import Image
except ImportError as error:
    raise SystemExit("Pillow is required: python3 -m pip install Pillow") from error

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
JOBS = {
    "brigadeiro-pattern.png": (360, 360, 80),
    "cheesecake.png": (1024, 1024, 82),
    "choco-cake.png": (686, 386, 82),
    "brigadeiro-mascot.png": (420, 630, 82),
    "experiencia-brigadeiro.png": (1280, 854, 82),
    "pega/brigadeiro.png": (800, 600, 82),
    "pega/brownie.png": (800, 600, 82),
    "pega/bolo-no-pote.png": (800, 600, 82),
    "pega/cheesecake.png": (800, 600, 82),
    "pega/cupcake.png": (800, 600, 82),
    "pega/bolo-recheado.png": (800, 600, 82),
    "mouse/morango.png": (96, 96, 80),
    "mouse/cacau.png": (96, 96, 80),
    "mouse/coco.png": (96, 96, 80),
    "mouse/castanhas.png": (96, 96, 80),
    "mouse/tamara.png": (96, 96, 80),
}

for relative_path, (max_width, max_height, quality) in JOBS.items():
    source = ASSETS / relative_path
    destination = source.with_suffix(".webp")
    with Image.open(source) as opened:
        image = opened.convert("RGBA" if "A" in opened.getbands() else "RGB")
        image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=quality, method=6, exact=True)
        print(f"{destination.relative_to(ROOT)} {image.width}x{image.height} {destination.stat().st_size} bytes")
```

- [ ] **Step 3: Generate all outputs**

Run:

```bash
python3 scripts/optimize-images.py
```

Expected: sixteen output lines. The hero is at most 250 KiB and every cursor file is at most 20 KiB. If an output exceeds its contract, lower only that job's quality by two points and rerun before continuing.

- [ ] **Step 4: Verify the optimized-output test passes**

Run:

```bash
node --test --test-name-pattern="optimized WebP assets" tests/performance-contract.test.mjs
```

Expected: PASS. Other contract tests remain red until their corresponding refactors.

- [ ] **Step 5: Commit generated assets and encoder**

```bash
git add scripts/optimize-images.py public/assets
git commit -m "perf: add optimized WebP assets"
```

---

### Task 3: Replace PhotoSlot and render fixed optimized content images

**Files:**
- Create: `components/cart/AddToCartButton.tsx`
- Modify: `lib/products.ts`
- Modify: `lib/cart-store.ts`
- Modify: `components/Hero.tsx`
- Modify: `components/Intro.tsx`
- Modify: `components/Gallery.tsx`
- Modify: `components/Cardapio.tsx`
- Modify: `components/Experience.tsx`
- Modify: `app/globals.css`
- Delete: `components/PhotoSlot.tsx`
- Delete: non-cursor PNG files after reference migration
- Test: `tests/performance-contract.test.mjs`

**Interfaces:**
- Produces: `CartProduct`, `{ product: CartProduct }` for `AddToCartButton`, and static `next/image` markup.
- Consumes: `useCart.add(product: CartProduct)`, generated WebP static imports, existing product catalog.

- [ ] **Step 1: Verify the photo-editor contract is red**

Run:

```bash
node --test --test-name-pattern="public photo editor" tests/performance-contract.test.mjs
```

Expected: FAIL because `components/PhotoSlot.tsx` exists and source imports it.

- [ ] **Step 2: Narrow product data passed to the cart**

In `lib/products.ts`, statically import all six `pega/*.webp` files, change `defaultImage` to required `StaticImageData`, and define:

```ts
import type { StaticImageData } from "next/image";

export type CartProduct = Pick<Product, "id" | "name" | "price" | "badgeIcon">;

export type Product = {
  id: string;
  name: string;
  desc: string;
  badge: string;
  badgeIcon: string;
  price: number;
  defaultImage: StaticImageData;
};
```

In `lib/cart-store.ts`, replace the type-only `Product` import and `add` signature with `CartProduct`. Do not change store actions, persistence, count, or total logic.

- [ ] **Step 3: Create the minimal add-button island**

Create `components/cart/AddToCartButton.tsx`:

```tsx
"use client";

import type { CartProduct } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export default function AddToCartButton({ product }: { product: CartProduct }) {
  const add = useCart((state) => state.add);
  return (
    <button
      type="button"
      onClick={() => add(product)}
      className="product-add-button font-body font-extrabold text-sm text-white bg-caramel px-5 py-2.5 rounded-full"
    >
      + Adicionar
    </button>
  );
}
```

- [ ] **Step 4: Convert content sections to static images**

For `Hero`, `Intro`, `Gallery`, `Cardapio`, and `Experience`:

- remove `"use client"`, Motion imports, and Motion props
- import `Image` from `next/image`
- statically import local WebP files
- replace `PhotoSlot`, raw images, and `motion.img` with `Image`
- use `loading="lazy"` for every image except the hero
- set `preload` only on the hero
- provide these `sizes` values:

```tsx
// Hero
sizes="(max-width: 768px) 95vw, (max-width: 1200px) 48vw, 680px"

// Intro
sizes="(max-width: 768px) calc(100vw - 68px), 532px"

// Gallery cards
sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 390px"

// Mascot
sizes="(max-width: 768px) 0px, 210px"

// Product card
sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 50vw, 360px"

// Experience
sizes="(max-width: 768px) 92vw, 860px"
```

In `Cardapio`, pass only serializable cart fields:

```tsx
<AddToCartButton
  product={{ id: product.id, name: product.name, price: product.price, badgeIcon: product.badgeIcon }}
/>
```

In `Gallery`, bind the fixed images in order: Brigadeiro, Brownie, Cheesecake. Add meaningful Portuguese alt text to the three food images and keep the mascot decorative.

Update the hero background URL to `/assets/brigadeiro-pattern.webp`.

- [ ] **Step 5: Delete PhotoSlot and migrated content PNGs**

Run:

```bash
rm components/PhotoSlot.tsx
find public/assets -type f -name '*.png' ! -path 'public/assets/mouse/*' -delete
```

- [ ] **Step 6: Add CSS equivalents for removed image interactions**

Add stable classes to `app/globals.css`:

```css
.product-add-button { box-shadow: 0 4px 0 var(--color-caramel-dark); transition: transform 150ms ease, box-shadow 150ms ease; }
.product-add-button:active { transform: translateY(2px); box-shadow: 0 2px 0 var(--color-caramel-dark); }
.gallery-card { transition: transform 300ms cubic-bezier(.22,1,.36,1), box-shadow 300ms ease; transform: translateY(var(--card-y, 0)) rotate(var(--card-rotate, 0deg)); }
@media (hover: hover) and (pointer: fine) {
  .gallery-card:hover { transform: translateY(-18px) rotate(0) scale(1.05); z-index: 10; box-shadow: 0 48px 80px -20px rgba(90,52,20,.7) !important; }
}
```

Cards set `--card-y` and `--card-rotate` through typed `React.CSSProperties` custom properties.

- [ ] **Step 7: Verify editor removal and type safety**

Run:

```bash
node --test --test-name-pattern="public photo editor|runtime source references" tests/performance-contract.test.mjs
npx tsc --noEmit
./node_modules/.bin/next build
```

Expected: targeted tests PASS, typecheck PASS, production build PASS. Full performance contract remains red for cursor PNGs, remaining client sections, and Motion.

- [ ] **Step 8: Commit fixed image rendering**

```bash
git add app/globals.css components lib public/assets
git commit -m "perf: render fixed responsive images"
```

---

### Task 4: Move visual sections to the server and add one reveal observer

**Files:**
- Create: `components/RevealObserver.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `components/Marquee.tsx`
- Modify: `components/Curitiba.tsx`
- Modify: `components/CTA.tsx`
- Modify: `components/Footer.tsx`
- Modify: visual sections from Task 3 to add reveal markers and CSS entrance classes
- Test: `tests/performance-contract.test.mjs`

**Interfaces:**
- Produces: `data-reveal`, `.reveal-enabled`, and `.is-revealed` behavior.
- Consumes: static server markup; no section imports browser APIs.

- [ ] **Step 1: Verify server-component contract is red**

Run:

```bash
node --test --test-name-pattern="visual sections are server components" tests/performance-contract.test.mjs
```

Expected: FAIL for Marquee, Curitiba, CTA, and Footer before refactoring.

- [ ] **Step 2: Create the shared observer**

Create `components/RevealObserver.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (elements.length === 0) return;

    const root = document.documentElement;
    root.classList.add("reveal-enabled");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-enabled");
    };
  }, []);

  return null;
}
```

- [ ] **Step 3: Add progressive reveal CSS**

Add:

```css
[data-reveal] { opacity: 1; translate: none; scale: 1; }
@media (prefers-reduced-motion: no-preference) {
  .reveal-enabled [data-reveal] {
    opacity: 0;
    translate: 0 var(--reveal-y, 24px);
    scale: var(--reveal-scale, 1);
    transition: opacity 550ms ease-out var(--reveal-delay, 0ms), translate 550ms cubic-bezier(.22,1,.36,1) var(--reveal-delay, 0ms), scale 550ms cubic-bezier(.22,1,.36,1) var(--reveal-delay, 0ms);
  }
  .reveal-enabled [data-reveal].is-revealed { opacity: 1; translate: none; scale: 1; }
}
```

Using individual `translate` and `scale` properties keeps reveal transitions independent from hover/ambient `transform` animations. Hero entrance wrappers are not marked `data-reveal`; add `.hero-enter-left`, `.hero-enter-right`, `.hero-enter-up`, and `.hero-enter-pop` classes with 700–850ms CSS keyframes matching the current x/y/scale directions. Apply ambient float/wobble classes only to nested children, never to those entrance wrappers.

- [ ] **Step 4: Convert the remaining visual sections**

Remove `"use client"` and Motion from `Marquee`, `Curitiba`, `CTA`, and `Footer`. Replace each `motion.*` node with its semantic HTML equivalent and apply `data-reveal` plus custom properties for stagger delays. Use CSS `:hover` and `:active` transitions for delivery cards and CTA controls.

Mount `<RevealObserver />` once in `app/page.tsx` immediately after `<Header />`.

- [ ] **Step 5: Add adaptive ambient-motion rules**

Append:

```css
@media (max-width: 767px) {
  .animate-floaty, .animate-floatySm { animation-duration: 9s; }
  .ambient-mobile-off { animation: none !important; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
}
```

Mark nonessential below-the-fold dots and mascot loops with `ambient-mobile-off`; keep the marquee and hero cake movement balanced on desktop.

- [ ] **Step 6: Verify all visual sections are server-rendered**

Run:

```bash
node --test --test-name-pattern="visual sections are server components" tests/performance-contract.test.mjs
npx tsc --noEmit
./node_modules/.bin/next build
```

Expected: targeted test PASS, typecheck PASS, build PASS.

- [ ] **Step 7: Commit server rendering and reveal behavior**

```bash
git add app components
git commit -m "perf: server render visual sections"
```

---

### Task 5: Remove Motion from menu and cart, and defer the drawer

**Files:**
- Create: `components/cart/DeferredCartDrawer.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/cart/CartDrawer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/performance-contract.test.mjs`

**Interfaces:**
- Produces: `DeferredCartDrawer`, `.menu-overlay.is-open`, and `.cart-layer.is-open`.
- Consumes: unchanged `useCart` selectors/actions and existing cart subviews.

- [ ] **Step 1: Confirm Motion contract remains red**

Run:

```bash
node --test --test-name-pattern="Motion is absent" tests/performance-contract.test.mjs
```

Expected: FAIL because Header, CartDrawer, and CursorTrail still import Motion.

- [ ] **Step 2: Refactor Header to a persistent CSS overlay**

Remove `AnimatePresence` and Motion. Keep the menu overlay mounted with:

```tsx
<div
  className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
  role="dialog"
  aria-modal="true"
  aria-label="Menu de navegação"
  aria-hidden={!menuOpen}
  inert={!menuOpen}
>
```

Use ordinary anchors with `style={{ "--menu-index": index } as React.CSSProperties}` for staggered CSS delays. Preserve all labels, links, cart count, close behavior, and semantic controls.

- [ ] **Step 3: Refactor CartDrawer to mounted CSS state**

Remove Motion and AnimatePresence. Return a `.cart-layer` wrapper whenever the deferred module is mounted. Its first child is a full-screen button with `className="cart-backdrop"`, `aria-label="Fechar carrinho"`, `onClick={close}`, and `tabIndex={isOpen ? 0 : -1}`. Its second child is the existing aside with `className="cart-panel"`, `aria-label="Carrinho"`, and `inert={!isOpen}`; keep the current header, body, and footer JSX directly inside that aside. Set the wrapper to `className={`cart-layer ${isOpen ? "is-open" : ""}`}` and `aria-hidden={!isOpen}`.

Replace Motion buttons and confirmation wrappers with ordinary elements and CSS `:active`/entry classes. Keep form, channel links, totals, clear-after-WhatsApp, and all store selectors unchanged.

- [ ] **Step 4: Create the deferred loader**

Create `components/cart/DeferredCartDrawer.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), { ssr: false });

export default function DeferredCartDrawer() {
  const isOpen = useCart((state) => state.isOpen);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  return hasOpened ? <CartDrawer /> : null;
}
```

Replace the direct CartDrawer import in `app/page.tsx` with this component.

- [ ] **Step 5: Add CSS transition states**

Add these state rules, retaining the existing colors, sizing, and z-index utilities in component class names:

```css
.menu-overlay { opacity: 0; visibility: hidden; pointer-events: none; transform: translate3d(0,-14px,0); transition: opacity 280ms ease-out, transform 280ms ease-out, visibility 0s linear 280ms; }
.menu-overlay.is-open { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition-delay: 0s; }
.menu-overlay nav a { opacity: 0; transform: translate3d(0,16px,0); transition: opacity 320ms ease-out, transform 320ms ease-out; }
.menu-overlay.is-open nav a { opacity: 1; transform: none; transition-delay: calc(var(--menu-index) * 60ms + 60ms); }
.cart-layer { position: fixed; inset: 0; z-index: 90; visibility: hidden; pointer-events: none; transition: visibility 0s linear 360ms; }
.cart-layer.is-open { visibility: visible; pointer-events: auto; transition-delay: 0s; }
.cart-backdrop { position: absolute; inset: 0; width: 100%; border: 0; background: color-mix(in srgb, var(--color-cacau) 45%, transparent); opacity: 0; transition: opacity 240ms ease; }
.cart-layer.is-open .cart-backdrop { opacity: 1; }
.cart-panel { position: absolute; inset-block: 0; right: 0; width: min(100%,440px); transform: translate3d(100%,0,0); transition: transform 360ms cubic-bezier(.22,1,.36,1); }
.cart-layer.is-open .cart-panel { transform: none; }
```

Do not animate width, height, top, right, or other layout properties.

- [ ] **Step 6: Verify build and unchanged cart types**

Run:

```bash
npx tsc --noEmit
./node_modules/.bin/next build
```

Expected: both PASS. The Motion contract remains red only because the old cursor still imports Motion and the dependency remains declared.

- [ ] **Step 7: Commit deferred CSS interactions**

```bash
git add app/page.tsx app/globals.css components/Header.tsx components/cart
git commit -m "perf: defer cart and replace Motion transitions"
```

---

### Task 6: Replace cursor springs, remove PNGs, and remove Motion

**Files:**
- Create: `components/CursorTrailRenderer.tsx`
- Modify: `components/CursorTrail.tsx`
- Modify: `app/globals.css`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `package-lock.json`
- Delete: `public/assets/mouse/*.png`
- Test: `tests/performance-contract.test.mjs`

**Interfaces:**
- Produces: `CursorTrailRenderer({ initialX, initialY })` and five dynamically loaded cursor nodes.
- Consumes: first fine-pointer coordinates and `/assets/mouse/*.webp`.

- [ ] **Step 1: Verify cursor and final PNG contracts are red**

Run:

```bash
node --test --test-name-pattern="Motion is absent|runtime image tree contains no PNG" tests/performance-contract.test.mjs
```

Expected: FAIL for CursorTrail Motion imports/dependency and remaining cursor PNG files.

- [ ] **Step 2: Turn CursorTrail into a first-pointer loader**

Rewrite `components/CursorTrail.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CursorTrailRenderer = dynamic(() => import("@/components/CursorTrailRenderer"), { ssr: false });

type Point = { x: number; y: number };

export default function CursorTrail() {
  const [initialPoint, setInitialPoint] = useState<Point | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    const activate = (event: PointerEvent) => {
      if (event.pointerType !== "touch") setInitialPoint({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("pointermove", activate, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", activate);
  }, []);

  return initialPoint ? <CursorTrailRenderer initialX={initialPoint.x} initialY={initialPoint.y} /> : null;
}
```

- [ ] **Step 3: Implement one sleeping animation-frame loop**

Create `components/CursorTrailRenderer.tsx` with five `<img>` refs, a target ref, and a point array initialized from props. Use this frame algorithm:

```tsx
const factors = [0.28, 0.24, 0.21, 0.18, 0.16];

const animate = () => {
  let leader = target.current;
  let unsettled = false;
  points.current.forEach((point, index) => {
    point.x += (leader.x - point.x) * factors[index];
    point.y += (leader.y - point.y) * factors[index];
    if (Math.abs(leader.x - point.x) > 0.1 || Math.abs(leader.y - point.y) > 0.1) unsettled = true;
    nodes.current[index]?.style.setProperty("transform", `translate3d(${point.x}px, ${point.y}px, 0)`);
    leader = point;
  });
  frame.current = unsettled ? requestAnimationFrame(animate) : null;
};
```

The passive `pointermove` handler updates `target.current` and starts a frame only when `frame.current` is null. Cleanup removes the listener and cancels any pending frame. Render sources in this order: morango, cacau, coco, castanhas, tamara. Apply widths 38, 34, 31, 28, and 24 px; use `height: auto`, empty alt text, `aria-hidden`, and no React state inside the frame loop.

- [ ] **Step 4: Delete all remaining PNG files**

Run:

```bash
find public/assets -type f -name '*.png' -delete
```

- [ ] **Step 5: Remove Motion from dependency metadata**

Run:

```bash
pnpm remove motion --ignore-scripts
npm install --package-lock-only --ignore-scripts
```

Verify `motion` is absent from `package.json`, `pnpm-lock.yaml`, and `package-lock.json`. If pnpm creates an untracked policy placeholder, remove that placeholder before staging; do not commit package-manager policy changes.

- [ ] **Step 6: Run the full source/assets contract**

Run:

```bash
node --test tests/performance-contract.test.mjs
npx tsc --noEmit
```

Expected: every source/assets test PASS and typecheck PASS.

- [ ] **Step 7: Commit the deferred cursor and dependency removal**

```bash
git add app/globals.css components/CursorTrail.tsx components/CursorTrailRenderer.tsx package.json pnpm-lock.yaml package-lock.json public/assets
git commit -m "perf: defer lightweight cursor trail"
```

---

### Task 7: Enforce production budgets and document results

**Files:**
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-08-16-performance-optimization-design.md`
- Test: `tests/build-performance.test.mjs`

**Interfaces:**
- Produces: reproducible verification commands and measured before/after results.
- Consumes: fresh `.next` production output from all previous tasks.

- [ ] **Step 1: Build fresh production output**

Run:

```bash
rm -rf .next
NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next build
```

Expected: static `/` route build completes successfully.

- [ ] **Step 2: Run generated-output budgets**

Run:

```bash
node --test tests/build-performance.test.mjs
```

Expected: exactly one image preload, no cursor asset in server HTML, and initial modern JavaScript no more than 170 KiB gzip.

- [ ] **Step 3: Inspect the generated client manifest**

Run:

```bash
rg -n 'components/(Hero|Marquee|Intro|Gallery|Cardapio|Experience|Curitiba|CTA|Footer)\.tsx' .next/server/app/page_client-reference-manifest.js
```

Expected: no matches. The server-only sections must not appear as client modules.

- [ ] **Step 4: Document commands and measured budgets**

Add a concise Performance section to `README.md` containing:

````markdown
## Performance checks

```bash
pnpm test:performance
pnpm build
pnpm test:performance:build
```

Budgets: runtime image sources ≤ 2.5 MiB, hero ≤ 250 KiB, each cursor image ≤ 20 KiB, exactly one image preload, and initial modern JavaScript ≤ 170 KiB gzip.
````

Change the design document status from `Approved for implementation` to `Approved and implemented`.

- [ ] **Step 5: Run complete verification**

Run:

```bash
node --test tests/performance-contract.test.mjs
npx tsc --noEmit
rm -rf .next
NEXT_TELEMETRY_DISABLED=1 ./node_modules/.bin/next build
node --test tests/build-performance.test.mjs
git diff --check
git status --short
```

Expected: tests PASS, typecheck PASS, build PASS, build budgets PASS, no whitespace errors, and only intended README/spec changes remain unstaged.

- [ ] **Step 6: Commit documentation and final verified state**

```bash
git add README.md docs/superpowers/specs/2026-08-16-performance-optimization-design.md
git commit -m "docs: record performance budgets"
```

- [ ] **Step 7: Report before/after evidence**

Include these baseline values and measured final values in the completion summary:

- runtime image sources: 24.96 MiB → measured optimized total
- eager image preloads: 11.32 MiB across eight images → one optimized hero
- theoretical full RGBA source decode: 83.5 MiB → measured optimized source dimensions
- initial modern JavaScript: about 190 KiB gzip → measured final gzip
- client architecture: twelve direct page-level Client Components → remaining interactive islands

Do not claim Lighthouse or field Core Web Vitals improvements until the Vercel preview is measured.
