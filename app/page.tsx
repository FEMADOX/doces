import Cardapio from '@/components/Cardapio'
import CTA from '@/components/CTA'
import Curitiba from '@/components/Curitiba'
import CursorTrail from '@/components/CursorTrail'
import DeferredCartDrawer from '@/components/cart/DeferredCartDrawer'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Marquee from '@/components/Marquee'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-cream text-cacau">
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
      <DeferredCartDrawer />
      <CursorTrail />
    </main>
  )
}
