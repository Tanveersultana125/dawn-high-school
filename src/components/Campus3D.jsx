import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Reveal, SectionHead } from './common'

// Heavy WebGL scene (three.js) — loaded only when the section nears the viewport
const Campus3DScene = lazy(() => import('./Campus3DScene'))

const POINTS = [
  { icon: '🏛️', title: 'Academic Block', desc: '60 smart classrooms across four floors.' },
  { icon: '🔬', title: 'Innovation Center', desc: 'Robotics, AI & STEM laboratories.' },
  { icon: '📚', title: 'Library & Media', desc: 'Digital research & reading commons.' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Indoor arena, pool & athletic fields.' },
]

// Cursor-following 3D tilt + spotlight for the marker cards (stateless).
const onTiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--rx', (((y - r.height / 2) / (r.height / 2)) * -9).toFixed(2) + 'deg')
  el.style.setProperty('--ry', (((x - r.width / 2) / (r.width / 2)) * 9).toFixed(2) + 'deg')
  el.style.setProperty('--gx', ((x / r.width) * 100).toFixed(1) + '%')
  el.style.setProperty('--gy', ((y / r.height) * 100).toFixed(1) + '%')
}
const onTiltEnter = (e) => e.currentTarget.classList.add('tilting')
const onTiltLeave = (e) => {
  const el = e.currentTarget
  el.classList.remove('tilting')
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

function Loader() {
  return (
    <div className="r3d-stage r3d-loading">
      <span className="r3d-spinner" aria-hidden="true" />
      <p>Loading interactive campus…</p>
    </div>
  )
}

export default function Campus3D() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  // Mount the 3D canvas once the section gets close to the viewport, so it
  // never blocks first paint or the hero experience.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section section-dark campus3d" id="campus-3d" ref={ref}>
      <div className="container">
        <SectionHead
          center
          eyebrow="Immersive Experience"
          title="Explore Our Campus in"
          accent="Interactive 3D"
          lead="Drag to spin the campus, scroll to zoom, and tap the glowing markers to discover the spaces where your child will learn, play, and grow."
        />

        <Reveal>
          {show ? (
            <Suspense fallback={<Loader />}>
              <Campus3DScene />
            </Suspense>
          ) : (
            <Loader />
          )}
        </Reveal>

        <div className="campus3d-points">
          {POINTS.map((pt, i) => (
            <Reveal
              className="c3d-point"
              delay={i + 1}
              key={pt.title}
              onMouseEnter={onTiltEnter}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <span className="c3d-glow" aria-hidden="true" />
              <div className="c3d-in">
                <div className="ic">{pt.icon}</div>
                <b>{pt.title}</b>
                <p>{pt.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
