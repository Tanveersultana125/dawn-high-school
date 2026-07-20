import { Link } from 'react-router-dom'
import GalleryHero from '../components/GalleryHero'
import Gallery from '../components/Gallery'
import VideoGallery from '../components/VideoGallery'
import BuildingBlocks from '../components/BuildingBlocks'
import { Reveal } from '../components/common'

export default function GalleryPage() {
  return (
    <>
      <GalleryHero
        image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80"
        kicker="Gallery"
        title="A Glimpse Into Campus Moments"
        subtitle="From classrooms and labs to celebrations and championships — explore life at Dawn."
        crumb="Gallery"
        ctaText="Schedule a Visit"
        ctaTo="/contact"
      />

      <BuildingBlocks
        layout="reverse"
        eyebrow="Life at Dawn"
        title="Moments That Build"
        accent="Lasting Memories"
        lead="Every photograph is a building block of the Dawn journey — first-day smiles, science fairs, championship cheers, and everything in between. Hover the blocks, then scroll on to explore the moments."
        buttonText="See Campus Life"
        to="/campus"
      />

      <Gallery />

      <VideoGallery />

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
