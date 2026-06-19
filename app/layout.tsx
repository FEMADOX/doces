import type { Metadata } from "next";
import { Bagel_Fat_One, Baloo_2 } from "next/font/google";
import "./globals.css";

const bagel = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
  display: "swap",
});

const baloo = Baloo_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PURO DOCE — Brigadeiro gourmet & doces em Curitiba",
  description:
    "Brigadeiro gourmet enrolado na hora, bolos, brownies e cheesecakes fresquinhos. Doce de verdade, feito à mão, desde 2015 em Curitiba. Peça pelo WhatsApp.",
  openGraph: {
    title: "PURO DOCE — doce de verdade, feito à mão",
    description: "Brigadeiro gourmet, bolo no pote, brownie e cheesecake. Entrega em toda Curitiba.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bagel.variable} ${baloo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
