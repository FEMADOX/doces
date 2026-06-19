"use client";

import { motion } from "motion/react";
import { products, formatBRL } from "@/lib/products";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-store";
import PhotoSlot from "@/components/PhotoSlot";

export default function Cardapio() {
  const add = useCart((s) => s.add);

  return (
    <section
      id="cardapio"
      className="relative overflow-hidden"
      style={{
        padding: "clamp(64px,9vw,120px) clamp(20px,5vw,72px)",
        background:
          "radial-gradient(120% 90% at 50% 0%, #EFE0C8 0%, #F7ECDD 60%)",
      }}
    >
      {/* Header */}
      <div className="max-w-[760px] mx-auto mb-14 text-center">
        <span
          className="inline-block font-extrabold tracking-widest uppercase text-sm text-caramel bg-white px-[14px] py-[7px] rounded-full"
          style={{ boxShadow: "0 6px 18px rgba(122,69,23,0.12)" }}
        >
          Cardápio
        </span>
        <h2
          className="font-display text-cacau mt-[18px]"
          style={{ fontSize: "clamp(38px,5.5vw,76px)", lineHeight: 0.96 }}
        >
          os <span className="text-caramel">queridinhos</span> de Curitiba
        </h2>
        <p
          className="max-w-[520px] mx-auto mt-[18px] text-coffee font-medium"
          style={{ fontSize: "clamp(15px,1.6vw,19px)" }}
        >
          Do campeão de vendas aos lançamentos que viralizam no delivery. Monte
          seu pedido e finalize pelo WhatsApp.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 max-w-[1120px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p: Product, i: number) => (
          <motion.div
            key={p.id}
            className="bg-white rounded-[28px] overflow-hidden border-2 border-sand-2 flex flex-col"
            style={{ boxShadow: "0 14px 34px rgba(42,24,16,0.10)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            {/* Photo + badge */}
            <div className="relative h-[200px]">
              <PhotoSlot
                slotId={`cardapio-${p.id}`}
                placeholder="Arraste a foto"
                className="h-full w-full"
                rounded={false}
                defaultSrc={p.defaultImage}
              />
              <span
                className="absolute top-3 left-3 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 font-extrabold text-[13px] text-caramel-dark"
                style={{ boxShadow: "0 4px 14px rgba(42,24,16,0.16)" }}
              >
                <span>{p.badgeIcon}</span>
                {p.badge}
              </span>
            </div>

            {/* Body */}
            <div className="p-[22px] pb-[26px] flex flex-col grow">
              <h3 className="font-display text-2xl text-cacau leading-tight">
                {p.name}
              </h3>
              <p className="text-coffee text-[14.5px] font-medium mt-2">
                {p.desc}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-display text-xl text-cacau">
                  {formatBRL(p.price)}
                </span>
                <motion.button
                  type="button"
                  onClick={() => add(p)}
                  whileTap={{ y: 2 }}
                  className="font-body font-extrabold text-sm text-white bg-caramel px-5 py-2.5 rounded-full"
                  style={{ boxShadow: "0 4px 0 #7A4517" }}
                >
                  + Adicionar
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
