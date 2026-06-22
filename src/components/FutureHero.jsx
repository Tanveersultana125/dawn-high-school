import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'

// Heavy WebGL blobs — loaded after the headline so text paints instantly
const FutureHeroScene = lazy(() => import('./FutureHeroScene'))

export default function FutureHero() {
  const sectionRef = useRef(null)

  const toVideo = (e) => {
    e.preventDefault()
    // Prefer the page's #home anchor; otherwise scroll to whatever follows the hero.
    const target = document.getElementById('home') || sectionRef.current?.nextElementSibling
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="future-hero" id="future" ref={sectionRef}>
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
          <Link to="/admissions" className="btn btn-gold">Apply Now</Link>
          <a href="#home" onClick={toVideo} className="fh-btn-line">▶ Watch Campus Film</a>
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

      <a href="#home" onClick={toVideo} className="fh-scroll" aria-label="Scroll to campus film">
        <span className="fh-scroll-line" />
        Scroll
      </a>
    </section>
  )
}
