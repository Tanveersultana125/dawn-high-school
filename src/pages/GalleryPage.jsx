import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import { Reveal } from '../components/common'

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Gallery"
        title="A Glimpse Into Campus Moments"
        subtitle="From classrooms and labs to celebrations and championships — explore life at Dawn."
        crumb="Gallery"
      />

      <Gallery />

      <section className="section section-alt">
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h3>Experience Dawn in person</h3>
              <p>Pictures tell a story — but nothing compares to walking our campus. Book a visit today.</p>
            </div>
            <Link to="/contact" className="btn btn-gold">Schedule a Visit</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
