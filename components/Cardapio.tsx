import Image from 'next/image'
import type { CSSProperties } from 'react'
import AddToCartButton from '@/components/cart/AddToCartButton'
import { formatBRL, products } from '@/lib/products'

export default function Cardapio() {
  return (
    <section
      id="cardapio"
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(64px,9vw,120px) clamp(20px,5vw,72px)',
        background:
          'radial-gradient(120% 90% at 50% 0%, #EFE0C8 0%, #F7ECDD 60%)'
      }}
    >
      <div className="mx-auto mb-14 max-w-190 text-center" data-reveal>
        <span
          className="inline-block rounded-full bg-white px-3.5 py-1.75 text-sm font-extrabold uppercase tracking-widest text-caramel"
          style={{ boxShadow: '0 6px 18px rgba(122,69,23,0.12)' }}
        >
          Cardápio
        </span>
        <h2
          className="mt-4.5 font-display text-cacau"
          style={{ fontSize: 'clamp(38px,5.5vw,76px)', lineHeight: 0.96 }}
        >
          os <span className="text-caramel">queridinhos</span> de Curitiba
        </h2>
        <p
          className="mx-auto mt-4.5 max-w-130 font-medium text-coffee"
          style={{ fontSize: 'clamp(15px,1.6vw,19px)' }}
        >
          Do campeão de vendas aos lançamentos que viralizam no delivery. Monte
          seu pedido e finalize pelo WhatsApp.
        </p>
      </div>

      <div className="mx-auto grid max-w-280 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <article
            key={product.id}
            data-reveal
            className="product-card flex flex-col overflow-hidden rounded-[28px] border-2 border-sand-2 bg-white"
            style={
              {
                '--reveal-delay': `${index * 80}ms`,
                boxShadow: '0 14px 34px rgba(42,24,16,0.10)'
              } as CSSProperties
            }
          >
            <div className="relative h-50 overflow-hidden">
              <Image
                src={product.defaultImage}
                alt={product.name}
                fill
                loading="lazy"
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) 50vw, 360px"
                className="object-cover"
              />
              <span
                className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold text-caramel-dark"
                style={{ boxShadow: '0 4px 14px rgba(42,24,16,0.16)' }}
              >
                <span>{product.badgeIcon}</span>
                {product.badge}
              </span>
            </div>

            <div className="flex grow flex-col p-5.5 pb-6.5">
              <h3 className="font-display text-2xl leading-tight text-cacau">
                {product.name}
              </h3>
              <p className="mt-2 text-[14.5px] font-medium text-coffee">
                {product.desc}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-display text-xl text-cacau">
                  {formatBRL(product.price)}
                </span>
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    badgeIcon: product.badgeIcon
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
