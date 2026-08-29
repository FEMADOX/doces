import type { CartLine } from './cart-store'
import { formatBRL } from './products'

/**
 * Order routing — sends the cart to the shop's real ordering channels.
 *
 * WhatsApp carries the full cart as a pre-filled message. iFood / Rappi are
 * separate marketplaces that can't receive our cart, so they're link-outs to
 * the shop's storefront on those apps.
 *
 * ⚠️ FILL THESE IN with the shop's real values before going live.
 */

// Digits only, with country code. Brazil: 55 + DDD + number.
// Shop line: 41 9543-0718  ->  55 41 95430718
export const WHATSAPP_NUMBER = '5541987329409'

// Storefront URLs on each marketplace (full https:// links).
export const IFOOD_URL = 'https://www.ifood.com.br/' // TODO: real iFood page
export const RAPPI_URL = 'https://www.rappi.com.br/' // TODO: real Rappi page

export type OrderForm = {
  name: string
  bairro: string
}

/** Build the human-readable order message sent over WhatsApp. */
export function buildOrderMessage(lines: CartLine[], form: OrderForm): string {
  const total = lines.reduce((n, l) => n + l.qty * l.price, 0)

  const items = lines
    .map((l) => `• ${l.qty}x ${l.name} — ${formatBRL(l.qty * l.price)}`)
    .join('\n')

  const details = [
    form.name.trim() && `Nome: ${form.name.trim()}`,
    form.bairro.trim() && `Bairro: ${form.bairro.trim()}`
  ]
    .filter(Boolean)
    .join('\n')

  return [
    'Olá! Quero fazer um pedido 🍓',
    '',
    details,
    '',
    items,
    '',
    `Total: ${formatBRL(total)}`
  ]
    .filter((part) => part !== undefined)
    .join('\n')
}

/** wa.me deep link with the order message pre-filled. */
export function buildWhatsappUrl(lines: CartLine[], form: OrderForm): string {
  const text = encodeURIComponent(buildOrderMessage(lines, form))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
