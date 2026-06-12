import FutureHero from '../components/FutureHero'
import Hero from '../components/Hero'
import Distinctly from '../components/Distinctly'
import ProgramExplorer from '../components/ProgramExplorer'
import Divisions from '../components/Divisions'
import Insights from '../components/Insights'
import Library from '../components/Library'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import News from '../components/News'

export default function Home() {
  return (
    <>
      <FutureHero />
      <Hero />
      <Distinctly />
      <ProgramExplorer />
      <Divisions />
      <Insights />
      <Library alt img="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80" />
      <WhyChoose />
      <Testimonials />
      <FAQ />
      <News />
    </>
  )
}
