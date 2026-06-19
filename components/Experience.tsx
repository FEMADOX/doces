"use client";

import { motion } from "motion/react";

/**
 * EXPERIENCE — bold accent break section.
 *
 * Inspired by the CRAV "FOOD THAT FEELS GOOD" panel: a saturated full-bleed
 * color block with a big headline, corner mascot stickers, and a hero treat
 * peeking up from the bottom with googly cartoon eyes + two grabbing hands.
 *
 * Assets are our own (brigadeiro mascot + cheesecake). Swap freely later.
 */

export default function Experience() {
  return (
    <section
      id="experiencia"
      aria-label="A experiência PURO DOCE"
      className="relative overflow-hidden bg-caramel"
      style={{
        padding: "clamp(64px,9vw,120px) clamp(20px,5vw,56px) 0",
      }}
    >
      {/* warm radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 8%, rgba(255,194,60,.28), rgba(181,101,29,0) 55%)",
        }}
      />

      {/* headline */}
      <div className="relative z-[5] mx-auto flex max-w-[1180px] flex-col items-center text-center">
        <motion.span
          className="rounded-full bg-cream px-5 py-1.5 font-display tracking-wide text-caramel"
          style={{ fontSize: "clamp(14px,1.6vw,22px)", boxShadow: "0 5px 0 rgba(58,28,10,.3)" }}
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          EXPERIÊNCIA
        </motion.span>

        <motion.h2
          className="font-display text-cream"
          style={{
            fontSize: "clamp(48px,9vw,140px)",
            lineHeight: 0.92,
            marginTop: "clamp(12px,2vw,26px)",
            textShadow: "0 6px 0 rgba(58,28,10,.28)",
          }}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          DOCE QUE
          <br />
          FAZ BEM
        </motion.h2>

        <motion.p
          className="mt-5 max-w-[520px] font-body font-bold text-cream/90"
          style={{ fontSize: "clamp(15px,1.6vw,19px)" }}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        >
          Feito na hora, sem pó de pudim e sem pressa. Ingrediente de verdade,
          aquele carinho de confeitaria de bairro — direto pra Curitiba.
        </motion.p>
      </div>

      {/* big hero treat */}
      <div
        className="relative z-[4] mx-auto flex justify-center"
        style={{ marginTop: "clamp(24px,3vw,48px)", maxWidth: 1000 }}
      >
        <motion.img
          src="/assets/experiencia-brigadeiro.png"
          alt="Brigadeiros artesanais com recheio cremoso — PURO DOCE"
          className="animate-floatySm relative z-[5] block h-auto w-full rounded-[clamp(18px,2.5vw,32px)]"
          style={{
            maxWidth: "clamp(420px,68vw,860px)",
            boxShadow: "0 30px 70px -20px rgba(58,28,10,.6)",
          }}
          initial={{ opacity: 0, y: 90, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        />
      </div>
    </section>
  );
}
