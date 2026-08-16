"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
  loading: () => (
    <div className="fixed top-5 right-5 z-[100] rounded-full bg-cream px-4 py-2 text-sm font-bold text-cacau shadow-lg">
      Abrindo carrinho…
    </div>
  ),
});

export default function DeferredCartDrawer() {
  const isOpen = useCart((state) => state.isOpen);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setHasOpened(true);
  }, [isOpen]);

  return hasOpened ? <CartDrawer /> : null;
}
