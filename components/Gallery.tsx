import Image, { type StaticImageData } from 'next/image'
import type { CSSProperties } from 'react'
import mascotImage from '@/public/assets/brigadeiro-mascot.webp'
import brigadeiroImage from '@/public/assets/pega/brigadeiro.webp'
import brownieImage from '@/public/assets/pega/brownie.webp'
import cheesecakeImage from '@/public/assets/pega/cheesecake.webp'

type CardConfig = {
  image: StaticImageData
  alt: string
  baseRotate: number
  baseY: number
  zIndex: number
  shadow: string
  cardClassName: string
  boxClassName: string
}

const cards: CardConfig[] = [
  {
    image: brigadeiroImage,
    alt: 'Brigadeiro gourmet coberto com granulado',
    baseRotate: -6,
    baseY: 0,
    zIndex: 1,
    shadow: '0 30px 56px -22px rgba(90,52,20,.55)',
    cardClassName: 'bg-white p-[14px] pb-[18px] rounded-2xl',
    boxClassName: 'w-[clamp(220px,25vw,340px)] h-[clamp(280px,31vw,420px)]'
  },
  {
    image: brownieImage,
    alt: 'Brownie de chocolate artesanal',
    baseRotate: 2,
    baseY: -14,
    zIndex: 3,
    shadow: '0 38px 62px -22px rgba(90,52,20,.6)',
    cardClassName: 'bg-white p-4 pb-[22px] rounded-[18px]',
    boxClassName: 'w-[clamp(260px,30vw,420px)] h-[clamp(320px,35vw,470px)]'
  },
  {
    image: cheesecakeImage,
    alt: 'Cheesecake cremoso de chocolate',
    baseRotate: 7,
    baseY: 0,
    zIndex: 1,
    shadow: '0 30px 56px -22px rgba(90,52,20,.55)',
    cardClassName: 'bg-white p-[14px] pb-[18px] rounded-2xl',
    boxClassName: 'w-[clamp(220px,25vw,340px)] h-[clamp(280px,31vw,420px)]'
  }
]

export default function Gallery() {
  return (
    <section
      id="galeria"
      aria-label="Peça agora"
      className="relative overflow-hidden bg-cream-deep"
      style={{
        padding:
          'clamp(56px,8vw,110px) clamp(20px,5vw,72px) clamp(64px,9vw,120px)'
      }}
    >
      <div
        className="flex justify-center"
        style={{ marginBottom: 'clamp(28px,4vw,54px)' }}
        data-reveal
      >
        <a
          href="#cardapio"
          className="press-button inline-block rounded-full bg-caramel px-12 py-4 font-display tracking-wide text-[#FFF6EA]"
          style={
            {
              '--button-shadow': '0 9px 0 #7A4517',
              fontSize: 'clamp(20px,2.4vw,30px)'
            } as CSSProperties
          }
        >
          PEÇA AGORA
        </a>
      </div>

      <div
        className="relative mx-auto flex max-w-[1260px] flex-wrap items-center justify-center"
        style={{ gap: 'clamp(10px,1.8vw,30px)' }}
      >
        <div
          data-reveal
          aria-hidden
          className="pointer-events-none absolute z-[7] hidden md:block"
          style={
            {
              '--reveal-scale': 0.4,
              left: 'clamp(-40px,-2vw,-8px)',
              top: 'clamp(-150px,-14vw,-96px)',
              width: 'clamp(130px,15vw,210px)'
            } as CSSProperties
          }
        >
          <Image
            src={mascotImage}
            alt=""
            loading="lazy"
            sizes="(max-width: 767px) 0px, 210px"
            className="animate-floaty ambient-mobile-off block h-auto w-full"
            style={{ filter: 'drop-shadow(0 14px 22px rgba(90,52,20,.35))' }}
          />
        </div>

        {cards.map((card, index) => (
          <article
            key={card.alt}
            data-reveal
            className={`gallery-card relative ${card.cardClassName}`}
            style={
              {
                '--card-rotate': `${card.baseRotate}deg`,
                '--card-y': `${card.baseY}px`,
                '--reveal-delay': `${index * 120}ms`,
                boxShadow: card.shadow,
                zIndex: card.zIndex
              } as CSSProperties
            }
          >
            <div
              className={`relative overflow-hidden rounded-[10px] bg-[#F1ECE4] ${card.boxClassName}`}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 390px"
                className="object-cover"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
