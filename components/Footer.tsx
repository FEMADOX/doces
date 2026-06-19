"use client";

import { motion } from "motion/react";

const menuLinks = [
  { label: "Início", href: "#topo" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Curitiba", href: "#curitiba" },
];

const contactLinks = [
  { label: "WhatsApp", href: "#contato" },
  { label: "Instagram", href: "#contato" },
  { label: "iFood · Rappi", href: "#contato" },
];

export default function Footer() {
  return (
    <motion.footer
      id="contato"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-cacau"
      style={{
        color: "#F6ECDB",
        padding: "clamp(48px,7vw,90px) clamp(20px,5vw,72px) 0",
      }}
    >
      {/* Top row */}
      <div className="flex flex-wrap gap-6 justify-between items-start max-w-[1100px] mx-auto">
        {/* Left */}
        <div>
          <div
            className="font-display text-[42px] leading-none"
            style={{ color: "#D08A3C" }}
          >
            DOCE
          </div>
          <p
            className="text-[15px] mt-2.5 max-w-[300px]"
            style={{ color: "#C3A985" }}
          >
            Brigadeiro na hora · brownie · bolo no pote · cheesecake. Desde 2015
            em Curitiba.
          </p>
        </div>

        {/* Right */}
        <div
          className="flex flex-wrap"
          style={{ gap: "clamp(28px,6vw,72px)" }}
        >
          <div>
            <span
              className="font-extrabold uppercase text-[13px] tracking-widest"
              style={{ color: "#D08A3C" }}
            >
              Menu
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="no-underline font-semibold hover:text-white transition-colors"
                    style={{ color: "#E2D2B6" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span
              className="font-extrabold uppercase text-[13px] tracking-widest"
              style={{ color: "#D08A3C" }}
            >
              Contato
            </span>
            <ul className="mt-3 flex flex-col gap-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="no-underline font-semibold hover:text-white transition-colors"
                    style={{ color: "#E2D2B6" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="mt-10 pt-[22px] text-center text-sm"
        style={{
          borderTop: "2px solid rgba(255,255,255,.12)",
          color: "#A8906C",
        }}
      >
        © 2026 PURO DOCE — Curitiba, Paraná · feito com muito amor 🍓
      </div>

      {/* Giant outlined wordmark zone */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(60px,9vw,130px)",
          paddingBottom: "clamp(20px,3vw,44px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 18, duration: 0.7 }}
          className="font-display text-caramel stroke-cream text-center leading-tight"
          style={{
            fontSize: "clamp(70px,17vw,260px)",
            lineHeight: 0.9,
            whiteSpace: "nowrap",
          }}
        >
          PURO DOCE
        </motion.div>
      </div>
    </motion.footer>
  );
}
