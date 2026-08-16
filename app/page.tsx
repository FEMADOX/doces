import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import Gallery from "@/components/Gallery";
import Cardapio from "@/components/Cardapio";
import Experience from "@/components/Experience";
import Curitiba from "@/components/Curitiba";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import CursorTrail from "@/components/CursorTrail";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-cream text-cacau">
      <Header />
      <RevealObserver />
      <Hero />
      <Marquee />
      <Intro />
      <Gallery />
      <Cardapio />
      <Experience />
      <Curitiba />
      <CTA />
      <Footer />
      <CartDrawer />
      <CursorTrail />
    </main>
  );
}
