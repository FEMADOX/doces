"use client";

import type { CartProduct } from "@/lib/products";
import { useCart } from "@/lib/cart-store";

export default function AddToCartButton({ product }: { product: CartProduct }) {
  const add = useCart((state) => state.add);

  return (
    <button
      type="button"
      onClick={() => add(product)}
      className="product-add-button rounded-full bg-caramel px-5 py-2.5 font-body text-sm font-extrabold text-white"
    >
      + Adicionar
    </button>
  );
}
