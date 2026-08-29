'use client'

import { type CSSProperties, useState } from 'react'
import { useCart } from '@/lib/cart-store'

type NavLink = { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: 'Início', href: '#topo' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Curitiba', href: '#curitiba' },
  { label: 'Contato', href: '#contato' }
]

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const count = useCart((state) =>
    state.lines.reduce((total, line) => total + line.qty, 0)
  )
  const toggleCart = useCart((state) => state.toggle)

  return (
    <>
      <header
        className="absolute top-0 right-0 left-0 z-[70] flex items-center justify-between"
        style={{ padding: '22px clamp(20px, 5vw, 56px)' }}
      >
        <a
          href="#topo"
          className="stroke-cream-thin font-display text-caramel no-underline"
          style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', lineHeight: 1 }}
        >
          DOCE
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#cardapio"
            className="hidden rounded-full bg-caramel px-[22px] py-3 font-body text-sm font-extrabold tracking-wide text-white no-underline sm:inline-block"
            style={{ boxShadow: '0 5px 0 #7A4517' }}
          >
            DOCES
          </a>

          <button
            type="button"
            onClick={toggleCart}
            aria-label={`Abrir carrinho${count > 0 ? `, ${count} itens` : ''}`}
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-sand-2 bg-white text-caramel-dark transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: '0 5px 0 #E8D4B6' }}
          >
            <CartIcon />
            {count > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-caramel px-1 text-[11px] leading-none font-extrabold text-white">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-sand-2 bg-white px-[18px] py-3 font-body text-sm font-extrabold tracking-wide text-caramel-dark transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: '0 5px 0 #E8D4B6' }}
          >
            MENU
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              {[0, 1, 2].map((line) => (
                <span
                  key={line}
                  className="block h-[2.5px] w-[18px] rounded-full bg-caramel-dark"
                />
              ))}
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`menu-overlay fixed inset-0 z-[95] flex flex-col items-center justify-center gap-2 ${
          menuOpen ? 'is-open' : ''
        }`}
        style={{ background: 'linear-gradient(150deg, #B5651D, #7A4517)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
          className="absolute top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white transition-colors hover:bg-white/25"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <nav className="flex flex-col items-center gap-2">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-white no-underline hover:text-honey"
              style={
                {
                  '--menu-index': index,
                  fontSize: 'clamp(40px, 7vw, 76px)',
                  lineHeight: 1.05
                } as CSSProperties
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="menu-kicker mt-6 text-xs font-bold tracking-widest text-sand-2 uppercase">
          Curitiba · Paraná · desde 2015
        </p>
      </div>
    </>
  )
}
