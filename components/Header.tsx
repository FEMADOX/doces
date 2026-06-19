"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-store";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "#topo" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Curitiba", href: "#curitiba" },
  { label: "Contato", href: "#contato" },
];

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const toggleCart = useCart((s) => s.toggle);

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-[70] flex items-center justify-between"
        style={{ padding: "22px clamp(20px, 5vw, 56px)" }}
      >
        <a
          href="#topo"
          className="font-display text-caramel stroke-cream-thin no-underline"
          style={{ fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1 }}
        >
          DOCE
        </a>

        <div className="flex items-center gap-3">
          <a
            href="#cardapio"
            className="hidden sm:inline-block font-body font-extrabold text-sm tracking-wide text-white bg-caramel px-[22px] py-3 rounded-full no-underline"
            style={{ boxShadow: "0 5px 0 #7A4517" }}
          >
            DOCES
          </a>

          <button
            type="button"
            onClick={toggleCart}
            aria-label={`Abrir carrinho${count > 0 ? `, ${count} itens` : ""}`}
            className="relative inline-flex items-center justify-center bg-white border-2 border-sand-2 text-caramel-dark rounded-full w-12 h-12 transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 5px 0 #E8D4B6" }}
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-caramel text-white text-[11px] font-extrabold leading-none">
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="inline-flex items-center gap-2.5 bg-white border-2 border-sand-2 text-caramel-dark rounded-full px-[18px] py-3 font-body font-extrabold text-sm tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "0 5px 0 #E8D4B6" }}
          >
            MENU
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-[2.5px] rounded-full bg-caramel-dark" style={{ width: 18 }} />
              <span className="block h-[2.5px] rounded-full bg-caramel-dark" style={{ width: 18 }} />
              <span className="block h-[2.5px] rounded-full bg-caramel-dark" style={{ width: 18 }} />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-2"
            style={{ background: "linear-gradient(150deg, #B5651D, #7A4517)" }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
          >
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="absolute top-6 right-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 text-white text-2xl leading-none transition-colors hover:bg-white/25"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <nav className="flex flex-col items-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-white no-underline transition-colors hover:text-honey"
                  style={{ fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 1.05 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut", delay: 0.06 + i * 0.06 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.p
              className="mt-6 uppercase tracking-widest text-sand-2 text-xs font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32, delay: 0.06 + NAV_LINKS.length * 0.06 }}
            >
              Curitiba · Paraná · desde 2015
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
