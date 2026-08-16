"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { formatBRL } from "@/lib/products";
import { buildWhatsappUrl, IFOOD_URL, RAPPI_URL } from "@/lib/order";

type View = "cart" | "form" | "done";

export default function CartDrawer() {
  const isOpen = useCart((state) => state.isOpen);
  const close = useCart((state) => state.close);
  const lines = useCart((state) => state.lines);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty * line.price, 0),
    [lines],
  );
  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  const [view, setView] = useState<View>("cart");
  const [form, setForm] = useState({ name: "", bairro: "" });

  useEffect(() => {
    if (isOpen) setView("cart");
  }, [isOpen]);

  const sendWhatsapp = () => {
    if (lines.length === 0) return;
    window.open(buildWhatsappUrl(lines, form), "_blank", "noopener");
    setView("done");
    clear();
  };

  return (
    <div
      className={`cart-layer ${isOpen ? "is-open" : ""}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="cart-backdrop"
        aria-label="Fechar carrinho"
        onClick={close}
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        className="cart-panel z-[100] flex h-full flex-col bg-cream shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho"
        inert={!isOpen}
      >
        <div className="flex items-center justify-between border-b-2 border-sand-2 px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-caramel">
              {view === "done" ? "Pedido feito!" : "Seu pedido"}
            </span>
            {view === "cart" && count > 0 ? (
              <span className="rounded-full bg-caramel px-2 py-0.5 text-xs font-extrabold text-white">
                {count}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-sand-2 bg-white text-lg text-cacau transition hover:bg-sand"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {view === "cart" ? (
            <CartView lines={lines} setQty={setQty} remove={remove} />
          ) : null}
          {view === "form" ? <FormView form={form} setForm={setForm} /> : null}
          {view === "done" ? <DoneView name={form.name} /> : null}
        </div>

        <div className="border-t-2 border-sand-2 bg-cream px-6 py-5">
          {view === "cart" ? (
            <>
              <Row label="Total" value={formatBRL(total)} big />
              <ActionButton
                disabled={lines.length === 0}
                onClick={() => setView("form")}
              >
                Fazer pedido
              </ActionButton>
              <OtherChannels />
            </>
          ) : null}

          {view === "form" ? (
            <>
              <Row label="Total" value={formatBRL(total)} big />
              <ActionButton
                disabled={form.name.trim().length < 2}
                onClick={sendWhatsapp}
              >
                Enviar pedido pelo WhatsApp
              </ActionButton>
              <OtherChannels />
              <button
                type="button"
                onClick={() => setView("cart")}
                className="mt-3 w-full text-sm font-bold text-coffee/70 hover:text-coffee"
              >
                ← Voltar ao carrinho
              </button>
            </>
          ) : null}

          {view === "done" ? (
            <ActionButton onClick={close}>Voltar à loja</ActionButton>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function CartView({
  lines,
  setQty,
  remove,
}: {
  lines: ReturnType<typeof useCart.getState>["lines"];
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
}) {
  if (lines.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
        <span className="text-5xl">🍫</span>
        <p className="font-display text-xl text-cacau">Carrinho vazio</p>
        <p className="max-w-[240px] text-sm text-coffee/80">
          Escolha seus doces no cardápio e eles aparecem aqui.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {lines.map((line) => (
        <li
          key={line.id}
          className="flex items-center gap-3 rounded-2xl border-2 border-sand-2 bg-white p-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sand text-2xl">
            {line.badgeIcon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[15px] leading-tight text-cacau">
              {line.name}
            </p>
            <p className="text-sm font-bold text-caramel">{formatBRL(line.price)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Stepper onClick={() => setQty(line.id, line.qty - 1)}>−</Stepper>
            <span className="w-5 text-center font-extrabold text-cacau">
              {line.qty}
            </span>
            <Stepper onClick={() => setQty(line.id, line.qty + 1)}>+</Stepper>
          </div>
          <button
            type="button"
            onClick={() => remove(line.id)}
            aria-label={`Remover ${line.name}`}
            className="ml-1 text-coffee/40 transition hover:text-caramel"
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

function FormView({
  form,
  setForm,
}: {
  form: { name: string; bairro: string };
  setForm: (form: { name: string; bairro: string }) => void;
}) {
  const field =
    "w-full rounded-2xl border-2 border-sand-2 bg-white px-4 py-3 font-medium text-cacau outline-none transition focus:border-caramel";

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-coffee/80">
        Preencha e mande o pedido pelo WhatsApp — a gente confirma tudo por lá.
        Entrega em toda Curitiba.
      </p>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold tracking-wide text-coffee uppercase">
          Nome*
        </span>
        <input
          className={field}
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          placeholder="Seu nome"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-bold tracking-wide text-coffee uppercase">
          Bairro
        </span>
        <input
          className={field}
          value={form.bairro}
          onChange={(event) => setForm({ ...form, bairro: event.target.value })}
          placeholder="Batel, Água Verde…"
        />
      </label>
    </div>
  );
}

function OtherChannels() {
  const link =
    "flex flex-1 items-center justify-center rounded-full border-2 border-sand-2 bg-white px-4 py-3 text-sm font-extrabold text-cacau no-underline transition hover:border-caramel hover:text-caramel";

  return (
    <div className="mt-3">
      <p className="mb-2 text-center text-xs font-bold tracking-wide text-coffee/70 uppercase">
        ou peça pelo app
      </p>
      <div className="flex gap-2">
        <a href={IFOOD_URL} target="_blank" rel="noopener" className={link}>
          🛵 iFood
        </a>
        <a href={RAPPI_URL} target="_blank" rel="noopener" className={link}>
          🛵 Rappi
        </a>
      </div>
    </div>
  );
}

function DoneView({ name }: { name: string }) {
  return (
    <div className="cart-confirmation flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-4xl text-white">
        ✓
      </span>
      <p className="font-display text-2xl text-cacau">
        Pedido enviado{name ? `, ${name.split(" ")[0]}` : ""}! 🍓
      </p>
      <p className="max-w-[280px] text-sm text-coffee/80">
        Abrimos o WhatsApp com seu pedido — é só apertar enviar. A gente
        confirma os detalhes e o pagamento por lá.
      </p>
    </div>
  );
}

function Stepper({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-sand-2 bg-white font-extrabold text-cacau transition hover:border-caramel hover:text-caramel"
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <span className="font-bold text-coffee">{label}</span>
      <span className={big ? "font-display text-2xl text-cacau" : "font-bold text-cacau"}>
        {value}
      </span>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cart-action-button w-full rounded-full bg-caramel px-6 py-4 font-display text-lg tracking-wide text-white transition disabled:cursor-not-allowed disabled:opacity-40"
      style={{ boxShadow: disabled ? "none" : "0 6px 0 #7A4517" }}
    >
      {children}
    </button>
  );
}
