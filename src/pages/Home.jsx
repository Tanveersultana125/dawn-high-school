import Hero from '../components/Hero'
import Distinctly from '../components/Distinctly'
import Divisions from '../components/Divisions'
import Library from '../components/Library'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import News from '../components/News'

export default function Home() {
  return (
    <>
      <Hero />
      <Distinctly />
      <Divisions />
      <Library alt img="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80" />
      <WhyChoose />
      <Testimonials />
      <News />
    </>
  )
}
