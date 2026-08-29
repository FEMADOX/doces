import type { CSSProperties } from 'react'

const menuLinks = [
  { label: 'Início', href: '#topo' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Curitiba', href: '#curitiba' }
]

const contactLinks = [
  { label: 'WhatsApp', href: '#contato' },
  { label: 'Instagram', href: '#contato' },
  { label: 'iFood · Rappi', href: '#contato' }
]

export default function Footer() {
  return (
    <footer
      id="contato"
      data-reveal
      className="bg-cacau"
      style={{
        color: '#F6ECDB',
        padding: 'clamp(48px,7vw,90px) clamp(20px,5vw,72px) 0'
      }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-start justify-between gap-6">
        <div>
          <div
            className="font-display text-[42px] leading-none"
            style={{ color: '#D08A3C' }}
          >
            DOCE
          </div>
          <p
            className="mt-2.5 max-w-[300px] text-[15px]"
            style={{ color: '#C3A985' }}
          >
            Brigadeiro na hora · brownie · bolo no pote · cheesecake. Desde 2015
            em Curitiba.
          </p>
        </div>

        <div className="flex flex-wrap" style={{ gap: 'clamp(28px,6vw,72px)' }}>
          <FooterLinks title="Menu" links={menuLinks} />
          <FooterLinks title="Contato" links={contactLinks} />
        </div>
      </div>

      <div
        className="mt-10 pt-[22px] text-center text-sm"
        style={{
          borderTop: '2px solid rgba(255,255,255,.12)',
          color: '#A8906C'
        }}
      >
        © 2026 PURO DOCE — Curitiba, Paraná · feito com muito amor 🍓
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: 'clamp(60px,9vw,130px)',
          paddingBottom: 'clamp(20px,3vw,44px)'
        }}
      >
        <div
          data-reveal
          className="stroke-cream text-center font-display leading-tight text-caramel"
          style={
            {
              '--reveal-y': '60px',
              fontSize: 'clamp(70px,17vw,260px)',
              lineHeight: 0.9,
              whiteSpace: 'nowrap'
            } as CSSProperties
          }
        >
          PURO DOCE
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({
  title,
  links
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <span
        className="text-[13px] font-extrabold uppercase tracking-widest"
        style={{ color: '#D08A3C' }}
      >
        {title}
      </span>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-semibold no-underline transition-colors hover:text-white"
              style={{ color: '#E2D2B6' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
