import Image from 'next/image'
import type { CSSProperties } from 'react'
import cheesecakeImage from '@/public/assets/cheesecake.webp'

const heroDelay = (delay: number) =>
  ({ '--hero-delay': `${delay}ms` }) as CSSProperties

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative flex flex-col justify-center overflow-hidden bg-cream-deep"
      style={{
        minHeight: '96vh',
        padding: 'clamp(110px,14vw,150px) clamp(20px,5vw,56px) 56px'
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'url(/assets/brigadeiro-pattern.webp)',
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat'
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 45%, rgba(249,237,222,.42), rgba(249,237,222,.6) 55%, rgba(246,231,213,.82))'
        }}
      />

      <span
        aria-hidden
        className="animate-floaty pointer-events-none absolute rounded-full bg-honey"
        style={{
          left: '12%',
          top: '18%',
          width: 26,
          height: 26,
          boxShadow: '0 8px 14px rgba(74,42,26,.18)'
        }}
      />
      <span
        aria-hidden
        className="animate-floatySm pointer-events-none absolute rounded-full bg-toast"
        style={{
          right: '16%',
          top: '26%',
          width: 18,
          height: 18,
          boxShadow: '0 6px 12px rgba(74,42,26,.16)'
        }}
      />
      <span
        aria-hidden
        className="animate-floatySm pointer-events-none absolute rounded-full bg-mocha"
        style={{
          left: '20%',
          bottom: '20%',
          width: 14,
          height: 14,
          boxShadow: '0 6px 12px rgba(74,42,26,.16)'
        }}
      />
      <span
        aria-hidden
        className="animate-floaty pointer-events-none absolute rounded-full bg-caramel"
        style={{
          right: '11%',
          bottom: '26%',
          width: 22,
          height: 22,
          boxShadow: '0 8px 14px rgba(74,42,26,.18)'
        }}
      />

      <div
        aria-hidden
        className="hero-enter-pop pointer-events-none absolute z-20 hidden md:block"
        style={{ left: '13%', top: '24%', ...heroDelay(850) }}
      >
        <div style={{ rotate: '-13deg' }}>
          <span
            className="animate-wobble stroke-cacau block text-center font-display leading-[0.9] text-gold"
            style={{ fontSize: 'clamp(18px,2.3vw,34px)' }}
          >
            FEITO
            <br />
            FRESCO
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="hero-enter-pop pointer-events-none absolute z-20 hidden md:block"
        style={{ right: '10%', bottom: '59%', ...heroDelay(1000) }}
      >
        <div style={{ rotate: '11deg' }}>
          <span
            className="animate-wobble stroke-cacau block text-center font-display leading-[0.9] text-gold"
            style={{ fontSize: 'clamp(18px,2.3vw,34px)' }}
          >
            FEITO
            <br />
            COM AMOR
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center">
        <div
          className="relative flex w-full items-center justify-center"
          style={{ minHeight: 'clamp(360px,44vw,600px)' }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 z-[1] flex items-center justify-center"
            style={{
              gap: 'clamp(40px,12vw,220px)',
              transform: 'translateY(clamp(-215px,-13.5vw,-125px))'
            }}
          >
            <span
              className="hero-enter-left stroke-cream font-display text-cacau-soft"
              style={{
                ...heroDelay(150),
                fontSize: 'clamp(60px,12.5vw,200px)',
                lineHeight: 0.8,
                filter: 'drop-shadow(0 14px 18px rgba(74,42,26,.3))'
              }}
            >
              PURO
            </span>

            <span
              className="hero-enter-right stroke-cream font-display text-cacau-soft"
              style={{
                ...heroDelay(150),
                fontSize: 'clamp(60px,12.5vw,200px)',
                lineHeight: 0.8,
                filter: 'drop-shadow(0 14px 18px rgba(74,42,26,.3))'
              }}
            >
              DOCE
            </span>
          </div>

          <div
            className="relative z-[3]"
            style={{ transform: 'translateY(clamp(10px,2vw,32px))' }}
          >
            <div
              className="hero-enter-up"
              style={
                {
                  ...heroDelay(350),
                  '--hero-y': '90px',
                  '--hero-scale': 0.82
                } as CSSProperties
              }
            >
              <Image
                src={cheesecakeImage}
                alt="Fatia de cheesecake de chocolate com calda em espiral"
                preload
                sizes="(max-width: 768px) 95vw, (max-width: 1200px) 48vw, 680px"
                className="animate-floaty block h-auto"
                style={{
                  width: 'clamp(380px,48vw,680px)',
                  filter: 'drop-shadow(0 34px 40px rgba(74,42,26,.42))'
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex w-full max-w-[1180px] flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:text-left"
          style={{ transform: 'translateY(clamp(20px,3vw,48px))' }}
        >
          <p
            className="hero-enter-up max-w-[360px] font-body font-bold text-cacau"
            style={{
              ...heroDelay(750),
              fontSize: 'clamp(15px,1.45vw,18px)',
              textShadow: '0 1px 0 rgba(247,236,221,.9)'
            }}
          >
            Brigadeiro gourmet enrolado na hora, com leite condensado de verdade
            e aquele granulado que não acaba.
          </p>

          <p
            className="hero-enter-up max-w-[360px] font-body font-bold text-cacau md:text-right"
            style={{
              ...heroDelay(900),
              fontSize: 'clamp(15px,1.45vw,18px)',
              textShadow: '0 1px 0 rgba(247,236,221,.9)'
            }}
          >
            Bolos, brownies e cheesecakes feitos fresquinhos todo dia — do nosso
            forno pra Curitiba inteira.
          </p>
        </div>
      </div>
    </section>
  )
}
