"use client";

import { motion } from "motion/react";
import PhotoSlot from "@/components/PhotoSlot";

const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.1 },
  }),
};

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
      {/* LEFT */}
      <div>
        <motion.span
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="inline-block rounded-full bg-[#EDDCC2] px-[14px] py-[7px] text-sm font-extrabold uppercase tracking-widest text-caramel"
        >
          Os clássicos
        </motion.span>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-[18px] font-display text-cacau"
          style={{ fontSize: "clamp(38px,5.5vw,76px)", lineHeight: 0.96 }}
        >
          cremoso <span className="text-caramel">fofinho</span> recheado
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-5 max-w-[480px] font-medium text-coffee"
          style={{ fontSize: "clamp(15px,1.6vw,19px)" }}
        >
          Nascemos em Curitiba em 2015 com uma ideia simples: doce de verdade,
          feito à mão, todo dia. O brigadeiro gourmet enrolado na hora —
          quentinho, cremoso e fresquinho.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <a
            href="#cardapio"
            className="mt-[26px] inline-block rounded-full bg-cacau px-8 py-[14px] text-lg font-extrabold text-white transition-all duration-150 hover:translate-y-[4px]"
            style={{ boxShadow: "0 7px 0 #160B05" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 3px 0 #160B05";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 7px 0 #160B05";
            }}
          >
            Ver cardápio
          </a>
        </motion.div>
      </div>

      {/* RIGHT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[560px] rounded-[36px] p-[14px]"
        style={{
          background: "linear-gradient(135deg,#EFE0C8,#E7D2AE)",
          boxShadow: "0 30px 60px -30px rgba(90,52,20,.5)",
        }}
      >
        {/* Decorative dots */}
        <span
          className="animate-floatySm absolute -top-[10px] right-[24px] rounded-full bg-honey"
          style={{ width: 18, height: 18 }}
          aria-hidden
        />
        <span
          className="animate-floaty absolute -bottom-[8px] left-[30px] rounded-full bg-toast"
          style={{ width: 16, height: 16 }}
          aria-hidden
        />

        <div className="aspect-[4/3] w-full overflow-hidden rounded-[26px]">
          <PhotoSlot
            slotId="intro-spread"
            placeholder="Arraste uma foto dos seus doces"
            defaultSrc="/assets/choco-cake.png"
            radius={26}
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
