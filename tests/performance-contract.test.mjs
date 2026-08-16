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
    .filter((path) => /\.(?:[cm]?js|ts|tsx|css)$/.test(path))
    .map((path) => `${relative(root, path)}\n${readFileSync(path, "utf8")}`)
    .join("\n");
}

function webpDimensions(buffer) {
  assert.equal(buffer.toString("ascii", 0, 4), "RIFF");
  assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
  for (let offset = 12; offset + 8 <= buffer.length; ) {
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

test("gallery mascot is excluded from mobile rendering", () => {
  const gallery = readFileSync(join(root, "components/Gallery.tsx"), "utf8");
  assert.match(gallery, /className="[^"]*hidden[^"]*md:block[^"]*"/);
  assert.match(gallery, /sizes="\(max-width: 767px\) 0px, 210px"/);
});

test("visual sections are server components", () => {
  for (const file of staticSections) {
    const text = readFileSync(join(root, "components", file), "utf8");
    assert.doesNotMatch(text, /^["']use client["'];?/m, `${file} is still a Client Component`);
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
