import Image from "next/image";
import type { CSSProperties } from "react";
import chocoCakeImage from "@/public/assets/choco-cake.webp";

const revealStyle = (delay: number, extra: CSSProperties = {}) =>
  ({ ...extra, "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default function Intro() {
  return (
    <section
      id="sobre"
      className="grid grid-cols-1 items-center overflow-hidden bg-cream md:grid-cols-2"
      style={{
        gap: "clamp(24px,5vw,64px)",
        padding: "clamp(80px,11vw,160px) clamp(20px,5vw,72px)",
      }}
    >
      <div>
        <span
          data-reveal
          className="inline-block rounded-full bg-[#EDDCC2] px-[14px] py-[7px] text-sm font-extrabold uppercase tracking-widest text-caramel"
          style={revealStyle(0)}
        >
          Os clássicos
        </span>

        <h2
          data-reveal
          className="mt-[18px] font-display text-cacau"
          style={revealStyle(100, {
            fontSize: "clamp(38px,5.5vw,76px)",
            lineHeight: 0.96,
          })}
        >
          cremoso <span className="text-caramel">fofinho</span> recheado
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[480px] font-medium text-coffee"
          style={revealStyle(200, { fontSize: "clamp(15px,1.6vw,19px)" })}
        >
          Nascemos em Curitiba em 2015 com uma ideia simples: doce de verdade,
          feito à mão, todo dia. O brigadeiro gourmet enrolado na hora —
          quentinho, cremoso e fresquinho.
        </p>

        <div data-reveal style={revealStyle(300)}>
          <a
            href="#cardapio"
            className="press-button mt-[26px] inline-block rounded-full bg-cacau px-8 py-[14px] text-lg font-extrabold text-white"
            style={{ "--button-shadow": "0 7px 0 #160B05" } as CSSProperties}
          >
            Ver cardápio
          </a>
        </div>
      </div>

      <div
        data-reveal
        className="relative mx-auto w-full max-w-[560px] rounded-[36px] p-[14px]"
        style={revealStyle(100, {
          "--reveal-scale": 0.92,
          background: "linear-gradient(135deg,#EFE0C8,#E7D2AE)",
          boxShadow: "0 30px 60px -30px rgba(90,52,20,.5)",
        } as CSSProperties)}
      >
        <span
          className="animate-floatySm ambient-mobile-off absolute -top-[10px] right-[24px] rounded-full bg-honey"
          style={{ width: 18, height: 18 }}
          aria-hidden
        />
        <span
          className="animate-floaty ambient-mobile-off absolute -bottom-[8px] left-[30px] rounded-full bg-toast"
          style={{ width: 16, height: 16 }}
          aria-hidden
        />

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[26px]">
          <Image
            src={chocoCakeImage}
            alt="Bolo de chocolate artesanal da PURO DOCE"
            fill
            loading="lazy"
            sizes="(max-width: 768px) calc(100vw - 68px), 532px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
