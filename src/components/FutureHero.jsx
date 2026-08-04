import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageImage } from '../context/PageImagesContext'

// Heavy WebGL blobs — loaded after the headline so text paints instantly
const FutureHeroScene = lazy(() => import('./FutureHeroScene'))

export default function FutureHero() {
  const sectionRef = useRef(null)
  // Optional admin-managed photo layered softly behind the 3D scene.
  const bgPhoto = usePageImage('admissions.hero', '')

  // Scroll cue at the foot of the hero — moves to whatever section follows it.
  const toNextSection = (e) => {
    e.preventDefault()
    const target = sectionRef.current?.nextElementSibling
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="future-hero" id="future" ref={sectionRef}>
      {bgPhoto && (
        <div
          className="future-hero-photo"
          aria-hidden="true"
          style={{ backgroundImage: `url('${bgPhoto}')` }}
        />
      )}
      <div className="future-hero-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <FutureHeroScene />
        </Suspense>
      </div>
      <div className="future-hero-veil" aria-hidden="true" />

      <div className="container future-hero-inner">
        <span className="fh-badge">✦ Welcome to Dawn High School</span>
        <h1 className="fh-title">
          Unlock the <span className="fh-script">Future</span>
          <br />
          of Education
        </h1>
        <p className="fh-sub">
          Where curiosity meets innovation — a world-class British curriculum that
          shapes confident, creative, and future-ready leaders.
        </p>
        <div className="fh-actions">
          {/* This hero only ever renders on /admissions, so linking to
              /admissions did nothing on click. The application form lives on
              /contact — the same place this page's "Start Online Application"
              CTA points to. */}
          <Link to="/contact" className="btn btn-gold">Apply Now</Link>
          {/* The campus films live in the gallery's video section. This used to
              look for a #home anchor, which doesn't exist on this page. */}
          <Link to="/gallery#videos" className="fh-btn-line">▶ Watch Campus Film</Link>
        </div>
      </div>

      {/* floating UI cards (decorative) */}
      <div className="fh-card fh-card-vid" aria-hidden="true">
        <span className="fh-card-av">👩‍🏫</span>
        <div>
          <b>Good morning, students 👋</b>
          <small>Live class · Room 204</small>
        </div>
      </div>
      <div className="fh-card fh-card-stat" aria-hidden="true">
        <span className="fh-dot" />
        <div>
          <b>4,200+</b>
          <small>Bright learners</small>
        </div>
      </div>

      <a href="#admissions" onClick={toNextSection} className="fh-scroll" aria-label="Scroll to the next section">
        <span className="fh-scroll-line" />
        Scroll
      </a>
    </section>
  )
}
