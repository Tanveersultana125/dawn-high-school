import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import VideoGallery from '../components/VideoGallery'
import BuildingBlocks from '../components/BuildingBlocks'
import { Reveal } from '../components/common'

export default function GalleryPage() {
  return (
    <>
      <BuildingBlocks
        layout="reverse"
        sectionClassName="blocks-first"
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
