"use client";

import { motion } from "motion/react";

export default function CTA() {
  return (
    <section
      className="relative text-white text-center overflow-hidden"
      style={{
        padding: "clamp(72px,11vw,150px) clamp(20px,5vw,72px)",
        background: "linear-gradient(135deg,#B5651D,#7A4517)",
      }}
    >
      {/* Floating decorative dots */}
      <span
        aria-hidden
        className="absolute animate-floaty z-[1] rounded-full bg-honey"
        style={{ width: 22, height: 22, top: "12%", left: "8%" }}
      />
      <span
        aria-hidden
        className="absolute animate-floatySm z-[1] rounded-full bg-toast"
        style={{ width: 18, height: 18, top: "18%", right: "10%" }}
      />
      <span
        aria-hidden
        className="absolute animate-floatySm z-[1] rounded-full bg-mocha"
        style={{ width: 20, height: 20, bottom: "14%", left: "12%" }}
      />
      <span
        aria-hidden
        className="absolute animate-floaty z-[1] rounded-full bg-white"
        style={{ width: 18, height: 18, bottom: "16%", right: "9%" }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-[2]"
      >
        <span className="font-extrabold tracking-[.18em] uppercase text-sm text-sand-2">
          Sente
        </span>
        <h2
          className="font-display mt-3"
          style={{
            fontSize: "clamp(44px,8vw,120px)",
            lineHeight: 0.9,
            textShadow: "4px 5px 0 rgba(0,0,0,.12)",
          }}
        >
          sinta a doçura
        </h2>
        <p
          className="max-w-[560px] mx-auto mt-[22px] font-medium text-sand"
          style={{ fontSize: "clamp(16px,1.7vw,20px)" }}
        >
          Feito pra quem ama doce de verdade, aqui em Curitiba. Cada camada
          cremosa derrete na boca.
        </p>
        <a
          href="#cardapio"
          className="mt-[30px] inline-block font-body font-extrabold text-[21px] text-caramel bg-white px-11 py-[17px] rounded-full transition-colors hover:bg-honey active:translate-y-[6px]"
          style={{ boxShadow: "0 9px 0 #7A4517" }}
        >
          Pega Agora!
        </a>
      </motion.div>
    </section>
  );
}
