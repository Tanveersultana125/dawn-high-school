import Hero from '../components/Hero'
import Distinctly from '../components/Distinctly'
import Recognition from '../components/Recognition'
import AnnounceTicker from '../components/AnnounceTicker'
import RecognitionRibbon from '../components/RecognitionRibbon'
import ProgramExplorer from '../components/ProgramExplorer'
import Divisions from '../components/Divisions'
import Insights from '../components/Insights'
import Library from '../components/Library'
import WhyChoose from '../components/WhyChoose'
import FAQ from '../components/FAQ'
import News from '../components/News'

export default function Home() {
  return (
    <>
      <Recognition />
      <AnnounceTicker />
      <RecognitionRibbon />
      <Hero />
      <Distinctly />
      <ProgramExplorer />
      <Divisions />
      <Insights />
      <Library alt slot="home.library" img="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80" />
      <WhyChoose />
      <FAQ />
      <News />
    </>
  )
}
