export type Product = {
  id: string;
  name: string;
  desc: string;
  badge: string;
  badgeIcon: string;
  price: number; // in BRL
  defaultImage?: string;
};

export const products: Product[] = [
  {
    id: "brigadeiro",
    name: "Brigadeiro gourmet",
    desc: "O rei das vendas no Brasil. Produto destaque em várias confeitarias e um dos mais recomendados.",
    badge: "Mais vendido",
    badgeIcon: "🥇",
    price: 4.5,
    defaultImage: "/assets/pega/brigadeiro.png",
  },
  {
    id: "brownie",
    name: "Brownie",
    desc: "Queridinho do Rappi e do iFood. Tem loja com seção inteira só de brownies e combos.",
    badge: "Top delivery",
    badgeIcon: "🥈",
    price: 12.0,
    defaultImage: "/assets/pega/brownie.png",
  },
  {
    id: "bolo-no-pote",
    name: "Bolo no pote",
    desc: "O formato que mais cresce: fácil de levar e com ótima margem. Entre os mais pedidos.",
    badge: "Em alta",
    badgeIcon: "🥉",
    price: 18.0,
    defaultImage: "/assets/pega/bolo-no-pote.png",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    desc: "Presença certa nas confeitarias premium de Curitiba. Vendido na fatia ou inteiro.",
    badge: "Premium",
    badgeIcon: "🏅",
    price: 22.0,
    defaultImage: "/assets/pega/cheesecake.png",
  },
  {
    id: "cupcake",
    name: "Cupcake",
    desc: "Especialmente os de brigadeiro e doce de leite. Perfeitos pra lanche e festinhas.",
    badge: "Pra festa",
    badgeIcon: "🧁",
    price: 9.0,
    defaultImage: "/assets/pega/cupcake.png",
  },
  {
    id: "bolo-recheado",
    name: "Bolo recheado",
    desc: "Morango, chocolate e pistache estão entre os sabores mais pedidos do momento.",
    badge: "Sabores do momento",
    badgeIcon: "🍰",
    price: 89.0,
    defaultImage: "/assets/pega/bolo-recheado.png",
  },
];

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
