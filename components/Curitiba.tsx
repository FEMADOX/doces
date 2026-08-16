import type { CSSProperties } from "react";

const neighborhoods = [
  "Batel",
  "Água Verde",
  "Centro",
  "Bigorrilho",
  "Cabral",
  "Juvevê",
  "Portão",
  "Mercês",
];

const deliveryCards = [
  { name: "WhatsApp", desc: "Peça direto com a gente", bg: "#25D366" },
  { name: "iFood", desc: "Entrega rapidinha", bg: "#EA1D2C" },
  { name: "Rappi", desc: "Combos e brownies", bg: "#FF5A0E" },
];

const revealDelay = (delay: number, extra: CSSProperties = {}) =>
  ({ ...extra, "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default function Curitiba() {
  return (
    <section
      id="curitiba"
      className="relative overflow-hidden bg-sand"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,72px)" }}
    >
      <div data-reveal className="mx-auto mb-11 max-w-[820px] text-center">
        <span className="inline-block rounded-full bg-white px-[14px] py-[7px] text-sm font-extrabold uppercase tracking-widest text-caramel">
          Curitiba
        </span>
        <h2
          className="mt-4 font-display text-cacau"
          style={{ fontSize: "clamp(34px,5vw,68px)", lineHeight: 0.98 }}
        >
          entregamos em toda Curitiba
        </h2>
        <p
          className="mx-auto mt-[18px] max-w-[560px] font-medium text-coffee"
          style={{ fontSize: "clamp(15px,1.6vw,19px)" }}
        >
          Da nossa cozinha pro seu bairro, quentinho e embalado com carinho. Peça
          pelo WhatsApp ou pelos apps de delivery.
        </p>
      </div>

      <div className="mx-auto mb-11 flex max-w-[780px] flex-wrap justify-center gap-2.5">
        {neighborhoods.map((name, index) => (
          <span
            key={name}
            data-reveal
            className="rounded-full bg-white px-5 py-2.5 text-[15px] font-bold shadow"
            style={revealDelay(index * 50, { color: "#9A5A24" })}
          >
            {name}
          </span>
        ))}
      </div>

      <div className="mx-auto grid max-w-[880px] grid-cols-1 gap-[18px] sm:grid-cols-3">
        {deliveryCards.map((card, index) => (
          <a
            key={card.name}
            href="#contato"
            data-reveal
            className="delivery-card block rounded-3xl p-[26px] text-white"
            style={revealDelay(index * 80, { backgroundColor: card.bg })}
          >
            <span className="block font-display text-[22px]">{card.name}</span>
            <p className="mt-1.5 text-sm font-semibold opacity-95">{card.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
