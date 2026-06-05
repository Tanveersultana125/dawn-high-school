import { useRef } from 'react'
import { Reveal, SectionHead } from './common'

const CAMPUS_IMG =
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=80'

// Interactive markers placed over the campus photo (x/y are % of the stage)
const HOTSPOTS = [
  { icon: '🏛️', title: 'Academic Block', desc: '60 smart classrooms across four floors.', x: '50%', y: '40%' },
  { icon: '🔬', title: 'Innovation Center', desc: 'Robotics, AI, and STEM laboratories.', x: '24%', y: '54%' },
  { icon: '📚', title: 'Library & Media', desc: 'Digital research and reading commons.', x: '76%', y: '50%' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Indoor arena, pool, and athletic fields.', x: '50%', y: '74%' },
]

const POINTS = [
  { icon: '🏛️', title: 'Academic Block', desc: '60 smart classrooms across four floors.' },
  { icon: '🔬', title: 'Innovation Center', desc: 'Robotics, AI, and STEM laboratories.' },
  { icon: '📚', title: 'Library & Media', desc: 'Digital research and reading commons.' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Indoor arena, pool, and athletic fields.' },
]

export default function Campus3D() {
  const stageRef = useRef(null)
  const imgRef = useRef(null)

  const handleMove = (e) => {
    const stage = stageRef.current
    const img = imgRef.current
    if (!stage || !img) return
    const rect = stage.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    img.style.transform = `scale(1.1) translate(${px * -22}px, ${py * -16}px)`
  }

  const handleLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = 'scale(1.1) translate(0, 0)'
  }

  return (
    <section className="section section-dark campus3d" id="campus-3d">
      <div className="container">
        <SectionHead
          center
          eyebrow="Immersive Experience"
          title="Explore Our Campus"
          accent="Up Close"
          lead="Move your cursor across the scene and hover the glowing markers to discover the spaces where your child will learn, play, and grow."
        />

        <Reveal>
          <div
            className="campus-map"
            ref={stageRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <img
              className="campus-map-img"
              ref={imgRef}
              src={CAMPUS_IMG}
              alt="Dawn High School campus"
              loading="lazy"
            />
            <div className="campus-map-overlay" aria-hidden="true" />

            {HOTSPOTS.map((h) => (
              <button className="map-pin" style={{ left: h.x, top: h.y }} key={h.title}>
                <span className="map-pin-dot" aria-hidden="true" />
                <span className="map-pin-card">
                  <span className="mp-ic">{h.icon}</span>
                  <b>{h.title}</b>
                  <small>{h.desc}</small>
                </span>
              </button>
            ))}

            <div className="campus3d-hint">
              <span>🖱️</span> Hover the markers to explore
            </div>
          </div>
        </Reveal>

        <div className="campus3d-points">
          {POINTS.map((pt, i) => (
            <Reveal className="c3d-point" delay={i + 1} key={pt.title}>
              <div className="ic">{pt.icon}</div>
              <b>{pt.title}</b>
              <p>{pt.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
