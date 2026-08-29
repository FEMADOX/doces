import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { gzipSync } from 'node:zlib'

const root = resolve(import.meta.dirname, '..')
const htmlPath = resolve(root, '.next/server/app/index.html')

function routeHtml() {
  assert.ok(existsSync(htmlPath), 'run a production build before this test')
  return readFileSync(htmlPath, 'utf8')
}

test('generated route preloads only one image', () => {
  const html = routeHtml()
  const preloads =
    html.match(
      /<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*>/gi
    ) ?? []
  assert.equal(preloads.length, 1, `found ${preloads.length} image preloads`)
  assert.doesNotMatch(html, /\/assets\/mouse\//)
})

test('initial modern JavaScript stays within 170 KiB gzip', () => {
  const html = routeHtml()
  const scripts = [
    ...html.matchAll(/<script\b[^>]*\bsrc="([^"]+\.js)"[^>]*>/gi)
  ]
    .filter((match) => !/\bnomodule\b/i.test(match[0]))
    .map((match) => match[1])
  const uniqueScripts = [...new Set(scripts)]
  const gzipBytes = uniqueScripts.reduce((total, source) => {
    const outputPath = resolve(root, '.next', source.replace(/^\/_next\//, ''))
    return total + gzipSync(readFileSync(outputPath), { level: 9 }).byteLength
  }, 0)
  console.log(
    `initial modern JavaScript: ${(gzipBytes / 1024).toFixed(1)} KiB gzip`
  )
  assert.ok(
    gzipBytes <= 170 * 1024,
    `${gzipBytes} gzip bytes exceeds the budget`
  )
})
