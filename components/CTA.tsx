import type { CSSProperties } from "react";

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden text-center text-white"
      style={{
        padding: "clamp(72px,11vw,150px) clamp(20px,5vw,72px)",
        background: "linear-gradient(135deg,#B5651D,#7A4517)",
      }}
    >
      <span
        aria-hidden
        className="animate-floaty ambient-mobile-off absolute z-[1] rounded-full bg-honey"
        style={{ width: 22, height: 22, top: "12%", left: "8%" }}
      />
      <span
        aria-hidden
        className="animate-floatySm ambient-mobile-off absolute z-[1] rounded-full bg-toast"
        style={{ width: 18, height: 18, top: "18%", right: "10%" }}
      />
      <span
        aria-hidden
        className="animate-floatySm ambient-mobile-off absolute z-[1] rounded-full bg-mocha"
        style={{ width: 20, height: 20, bottom: "14%", left: "12%" }}
      />
      <span
        aria-hidden
        className="animate-floaty ambient-mobile-off absolute z-[1] rounded-full bg-white"
        style={{ width: 18, height: 18, bottom: "16%", right: "9%" }}
      />

      <div data-reveal className="relative z-[2]">
        <span className="text-sm font-extrabold uppercase tracking-[.18em] text-sand-2">
          Sente
        </span>
        <h2
          className="mt-3 font-display"
          style={{
            fontSize: "clamp(44px,8vw,120px)",
            lineHeight: 0.9,
            textShadow: "4px 5px 0 rgba(0,0,0,.12)",
          }}
        >
          sinta a doçura
        </h2>
        <p
          className="mx-auto mt-[22px] max-w-[560px] font-medium text-sand"
          style={{ fontSize: "clamp(16px,1.7vw,20px)" }}
        >
          Feito pra quem ama doce de verdade, aqui em Curitiba. Cada camada
          cremosa derrete na boca.
        </p>
        <a
          href="#cardapio"
          className="press-button mt-[30px] inline-block rounded-full bg-white px-11 py-[17px] font-body text-[21px] font-extrabold text-caramel hover:bg-honey"
          style={{ "--button-shadow": "0 9px 0 #7A4517" } as CSSProperties}
        >
          Pega Agora!
        </a>
      </div>
    </section>
  );
}
