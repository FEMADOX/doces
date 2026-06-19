"use client";

import { motion } from "motion/react";

/**
 * HERO — "PURO DOCE"
 *
 * The wordmark ("PURO" + "DOCE") flanks a centered cheesecake image. The
 * wordmark row is lifted higher than the cake so the letters clear the
 * chocolate swirl that pokes up from the top of the slice (the original
 * design had them overlapping / "trapping" the swirl).
 */
export default function Hero() {
  return (
    <section
      id="topo"
      className="relative flex flex-col justify-center overflow-hidden bg-cream-deep"
      style={{
        minHeight: "96vh",
        padding:
          "clamp(110px,14vw,150px) clamp(20px,5vw,56px) 56px",
      }}
    >
      {/* background pattern layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/assets/brigadeiro-pattern.png)",
          backgroundSize: "300px 300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* softening overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 45%, rgba(249,237,222,.42), rgba(249,237,222,.6) 55%, rgba(246,231,213,.82))",
        }}
      />

      {/* floating bead dots */}
      <span
        aria-hidden
        className="animate-floaty pointer-events-none absolute rounded-full bg-honey"
        style={{
          left: "12%",
          top: "18%",
          width: 26,
          height: 26,
          boxShadow: "0 8px 14px rgba(74,42,26,.18)",
        }}
      />
      <span
        aria-hidden
        className="animate-floatySm pointer-events-none absolute rounded-full bg-toast"
        style={{
          right: "16%",
          top: "26%",
          width: 18,
          height: 18,
          boxShadow: "0 6px 12px rgba(74,42,26,.16)",
        }}
      />
      <span
        aria-hidden
        className="animate-floatySm pointer-events-none absolute rounded-full bg-mocha"
        style={{
          left: "20%",
          bottom: "20%",
          width: 14,
          height: 14,
          boxShadow: "0 6px 12px rgba(74,42,26,.16)",
        }}
      />
      <span
        aria-hidden
        className="animate-floaty pointer-events-none absolute rounded-full bg-caramel"
        style={{
          right: "11%",
          bottom: "26%",
          width: 22,
          height: 22,
          boxShadow: "0 8px 14px rgba(74,42,26,.18)",
        }}
      />

      {/* sticker top-left */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 hidden md:block"
        style={{ left: "13%", top: "24%", rotate: "-13deg" }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 320, damping: 14 }}
      >
        <span
          className="animate-wobble stroke-cacau block text-center font-display leading-[0.9] text-gold"
          style={{ fontSize: "clamp(18px,2.3vw,34px)" }}
        >
          FEITO
          <br />
          FRESCO
        </span>
      </motion.div>

      {/* sticker bottom-right */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 hidden md:block"
        style={{ right: "10%", bottom: "59%", rotate: "11deg" }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 320, damping: 14 }}
      >
        <span
          className="animate-wobble stroke-cacau block text-center font-display leading-[0.9] text-gold"
          style={{ fontSize: "clamp(18px,2.3vw,34px)" }}
        >
          FEITO
          <br />
          COM AMOR
        </span>
      </motion.div>

      {/* CENTER STAGE */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center">
        <div
          className="relative flex w-full items-center justify-center"
          style={{ minHeight: "clamp(360px,44vw,600px)" }}
        >
          {/* wordmark — lifted AND sitting BEHIND the cake (lower z), words
              pulled together so the cheesecake (higher z) covers their inner
              edges and the swirl collision */}
          <div
            className="pointer-events-none absolute inset-x-0 z-[1] flex items-center justify-center"
            style={{
              gap: "clamp(40px,12vw,220px)",
              transform: "translateY(clamp(-215px,-13.5vw,-125px))",
            }}
          >
            <motion.span
              className="stroke-cream font-display text-cacau-soft"
              style={{
                fontSize: "clamp(60px,12.5vw,200px)",
                lineHeight: 0.8,
                filter: "drop-shadow(0 14px 18px rgba(74,42,26,.3))",
              }}
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              PURO
            </motion.span>

            <motion.span
              className="stroke-cream font-display text-cacau-soft"
              style={{
                fontSize: "clamp(60px,12.5vw,200px)",
                lineHeight: 0.8,
                filter: "drop-shadow(0 14px 18px rgba(74,42,26,.3))",
              }}
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              DOCE
            </motion.span>
          </div>

          {/* cheesecake — IN FRONT (higher z), overlapping the wordmark */}
          <motion.div
            className="relative z-[3]"
            style={{ transform: "translateY(clamp(10px,2vw,32px))" }}
            initial={{ opacity: 0, y: 90, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/cheesecake.png"
              alt="Fatia de cheesecake de chocolate com calda em espiral"
              className="animate-floaty block h-auto"
              style={{
                width: "clamp(380px,48vw,680px)",
                filter: "drop-shadow(0 34px 40px rgba(74,42,26,.42))",
              }}
            />
          </motion.div>
        </div>

        {/* flanking paragraphs */}
        <div
          className="mt-10 flex w-full max-w-[1180px] flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:text-left"
          style={{ transform: "translateY(clamp(20px,3vw,48px))" }}
        >
          <motion.p
            className="max-w-[360px] font-body font-bold text-cacau"
            style={{
              fontSize: "clamp(15px,1.45vw,18px)",
              textShadow: "0 1px 0 rgba(247,236,221,.9)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
          >
            Brigadeiro gourmet enrolado na hora, com leite condensado de
            verdade e aquele granulado que não acaba.
          </motion.p>

          <motion.p
            className="max-w-[360px] font-body font-bold text-cacau md:text-right"
            style={{
              fontSize: "clamp(15px,1.45vw,18px)",
              textShadow: "0 1px 0 rgba(247,236,221,.9)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          >
            Bolos, brownies e cheesecakes feitos fresquinhos todo dia — do
            nosso forno pra Curitiba inteira.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
