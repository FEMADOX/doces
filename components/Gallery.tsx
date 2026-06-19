"use client";

import { motion } from "motion/react";
import PhotoSlot from "@/components/PhotoSlot";

type CardConfig = {
  slotId: string;
  baseRotate: number;
  baseY: number;
  zIndex: number;
  shadow: string;
  cardClassName: string;
  boxClassName: string;
};

const cardSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
};

const cards: CardConfig[] = [
  {
    slotId: "galeria-1",
    baseRotate: -6,
    baseY: 0,
    zIndex: 1,
    shadow: "0 30px 56px -22px rgba(90,52,20,.55)",
    cardClassName: "bg-white p-[14px] pb-[18px] rounded-2xl",
    boxClassName: "w-[clamp(220px,25vw,340px)] h-[clamp(280px,31vw,420px)]",
  },
  {
    slotId: "galeria-2",
    baseRotate: 2,
    baseY: -14,
    zIndex: 3,
    shadow: "0 38px 62px -22px rgba(90,52,20,.6)",
    cardClassName: "bg-white p-4 pb-[22px] rounded-[18px]",
    boxClassName: "w-[clamp(260px,30vw,420px)] h-[clamp(320px,35vw,470px)]",
  },
  {
    slotId: "galeria-3",
    baseRotate: 7,
    baseY: 0,
    zIndex: 1,
    shadow: "0 30px 56px -22px rgba(90,52,20,.55)",
    cardClassName: "bg-white p-[14px] pb-[18px] rounded-2xl",
    boxClassName: "w-[clamp(220px,25vw,340px)] h-[clamp(280px,31vw,420px)]",
  },
];

export default function Gallery() {
  return (
    <section
      id="galeria"
      aria-label="Peça agora"
      className="relative overflow-hidden bg-cream-deep"
      style={{
        padding:
          "clamp(56px,8vw,110px) clamp(20px,5vw,72px) clamp(64px,9vw,120px)",
      }}
    >
      <div
        className="flex justify-center"
        style={{ marginBottom: "clamp(28px,4vw,54px)" }}
      >
        <motion.a
          href="#cardapio"
          className="inline-block rounded-full bg-caramel px-12 py-4 font-display tracking-wide text-[#FFF6EA]"
          style={{
            fontSize: "clamp(20px,2.4vw,30px)",
            boxShadow: "0 9px 0 #7A4517",
          }}
          whileHover={{ y: 4, boxShadow: "0 5px 0 #7A4517" }}
          whileTap={{ y: 7, boxShadow: "0 2px 0 #7A4517" }}
          transition={cardSpring}
        >
          PEÇA AGORA
        </motion.a>
      </div>

      <div
        className="relative mx-auto flex max-w-[1260px] flex-wrap items-center justify-center"
        style={{ gap: "clamp(10px,1.8vw,30px)" }}
      >
        {/* Mascot taking a selfie — sticker pops in over the photo cards. */}
        <motion.img
          src="/assets/brigadeiro-mascot.png"
          alt=""
          aria-hidden="true"
          className="animate-floaty pointer-events-none absolute z-[7]"
          style={{
            left: "clamp(-40px,-2vw,-8px)",
            top: "clamp(-150px,-14vw,-96px)",
            width: "clamp(130px,15vw,210px)",
            filter: "drop-shadow(0 14px 22px rgba(90,52,20,.35))",
          }}
          initial={{ opacity: 0, scale: 0.4, rotate: -16 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 280, damping: 14 }}
        />

        {cards.map((card, index) => (
          <motion.div
            key={card.slotId}
            className={`relative cursor-pointer ${card.cardClassName}`}
            style={{ boxShadow: card.shadow, zIndex: card.zIndex }}
            initial={{ opacity: 0, scale: 0.85, rotate: card.baseRotate, y: card.baseY }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: card.baseRotate,
              y: card.baseY,
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...cardSpring, delay: index * 0.12 }}
            whileHover={{
              rotate: 0,
              y: -18,
              scale: 1.05,
              zIndex: 10,
              boxShadow: "0 48px 80px -20px rgba(90,52,20,.7)",
              transition: cardSpring,
            }}
          >
            <div className={card.boxClassName}>
              <PhotoSlot
                slotId={card.slotId}
                placeholder="Arraste uma foto"
                radius={10}
                className="h-full w-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
