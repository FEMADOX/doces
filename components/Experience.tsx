import Image from "next/image";
import type { CSSProperties } from "react";
import experienceImage from "@/public/assets/experiencia-brigadeiro.webp";

const revealStyle = (delay: number, extra: CSSProperties = {}) =>
  ({ ...extra, "--reveal-delay": `${delay}ms` }) as CSSProperties;

export default function Experience() {
  return (
    <section
      id="experiencia"
      aria-label="A experiência PURO DOCE"
      className="relative overflow-hidden bg-caramel"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,56px) 0" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 8%, rgba(255,194,60,.28), rgba(181,101,29,0) 55%)",
        }}
      />

      <div className="relative z-[5] mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <span
          data-reveal
          className="rounded-full bg-cream px-5 py-1.5 font-display tracking-wide text-caramel"
          style={revealStyle(0, {
            "--reveal-y": "-16px",
            fontSize: "clamp(14px,1.6vw,22px)",
            boxShadow: "0 5px 0 rgba(58,28,10,.3)",
          } as CSSProperties)}
        >
          EXPERIÊNCIA
        </span>

        <h2
          data-reveal
          className="font-display text-cream"
          style={revealStyle(100, {
            fontSize: "clamp(48px,9vw,140px)",
            lineHeight: 0.92,
            marginTop: "clamp(12px,2vw,26px)",
            textShadow: "0 6px 0 rgba(58,28,10,.28)",
          })}
        >
          DOCE QUE
          <br />
          FAZ BEM
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[520px] font-body font-bold text-cream/90"
          style={revealStyle(250, { fontSize: "clamp(15px,1.6vw,19px)" })}
        >
          Feito na hora, sem pó de pudim e sem pressa. Ingrediente de verdade,
          aquele carinho de confeitaria de bairro — direto pra Curitiba.
        </p>
      </div>

      <div
        className="relative z-[4] mx-auto flex justify-center"
        style={{ marginTop: "clamp(24px,3vw,48px)", maxWidth: 1000 }}
      >
        <div
          data-reveal
          className="w-full"
          style={revealStyle(250, { "--reveal-y": "90px", "--reveal-scale": 0.85 } as CSSProperties)}
        >
          <Image
            src={experienceImage}
            alt="Brigadeiros artesanais com recheio cremoso — PURO DOCE"
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 860px"
            className="animate-floatySm ambient-mobile-off relative z-[5] mx-auto block h-auto w-full rounded-[clamp(18px,2.5vw,32px)]"
            style={{
              maxWidth: "clamp(420px,68vw,860px)",
              boxShadow: "0 30px 70px -20px rgba(58,28,10,.6)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
