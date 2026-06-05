import { Reveal } from './common'

const BG =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80'

export default function Statement() {
  return (
    <section className="statement" id="statement">
      <div className="statement-bg" style={{ backgroundImage: `url(${BG})` }} aria-hidden="true" />
      <div className="statement-overlay" aria-hidden="true" />

      <div className="container statement-inner">
        <Reveal className="statement-copy">
          <span className="statement-kicker">At Dawn High School</span>
          <h2 className="statement-title">Every Day is an Exploration</h2>
          <p className="statement-text">
            It is our scale and spirit that let us offer a robust curriculum and rich,
            hands-on learning experiences — yet it is the strength of our close-knit
            community that fosters independence and emboldens young minds to thrive
            far beyond their comfort zone.
          </p>
        </Reveal>
      </div>

      <a href="#about" className="statement-scroll" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}
