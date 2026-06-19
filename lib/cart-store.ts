"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  badgeIcon: string;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (p) =>
        set((s) => {
          const existing = s.lines.find((l) => l.id === p.id);
          if (existing) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                l.id === p.id ? { ...l, qty: l.qty + 1 } : l
              ),
            };
          }
          return {
            isOpen: true,
            lines: [
              ...s.lines,
              { id: p.id, name: p.name, price: p.price, qty: 1, badgeIcon: p.badgeIcon },
            ],
          };
        }),
      remove: (id) => set((s) => ({ lines: s.lines.filter((l) => l.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      total: () => get().lines.reduce((n, l) => n + l.qty * l.price, 0),
    }),
    { name: "puro-doce-cart", partialize: (s) => ({ lines: s.lines }) }
  )
);
