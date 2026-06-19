"use client";

import { motion } from "motion/react";

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
  {
    name: "WhatsApp",
    desc: "Peça direto com a gente",
    bg: "#25D366",
  },
  {
    name: "iFood",
    desc: "Entrega rapidinha",
    bg: "#EA1D2C",
  },
  {
    name: "Rappi",
    desc: "Combos e brownies",
    bg: "#FF5A0E",
  },
];

export default function Curitiba() {
  return (
    <section
      id="curitiba"
      className="bg-sand relative overflow-hidden"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,72px)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[820px] mx-auto mb-11 text-center"
      >
        <span className="inline-block uppercase tracking-widest text-sm font-extrabold text-caramel bg-white px-[14px] py-[7px] rounded-full">
          Curitiba
        </span>
        <h2
          className="font-display text-cacau mt-4"
          style={{ fontSize: "clamp(34px,5vw,68px)", lineHeight: 0.98 }}
        >
          entregamos em toda Curitiba
        </h2>
        <p
          className="max-w-[560px] mx-auto mt-[18px] text-coffee font-medium"
          style={{ fontSize: "clamp(15px,1.6vw,19px)" }}
        >
          Da nossa cozinha pro seu bairro, quentinho e embalado com carinho. Peça
          pelo WhatsApp ou pelos apps de delivery.
        </p>
      </motion.div>

      {/* Neighborhood pills */}
      <div className="flex flex-wrap gap-2.5 justify-center max-w-[780px] mx-auto mb-11">
        {neighborhoods.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
            className="bg-white font-bold text-[15px] px-5 py-2.5 rounded-full shadow"
            style={{ color: "#9A5A24" }}
          >
            {name}
          </motion.span>
        ))}
      </div>

      {/* Delivery cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[18px] max-w-[880px] mx-auto">
        {deliveryCards.map((card, i) => (
          <motion.a
            key={card.name}
            href="#contato"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: "0 18px 34px rgba(0,0,0,.22)" }}
            className="text-white rounded-3xl p-[26px] block"
            style={{ backgroundColor: card.bg }}
          >
            <span className="font-display text-[22px] block">{card.name}</span>
            <p className="font-semibold text-sm mt-1.5 opacity-95">{card.desc}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
