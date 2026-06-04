import { useRef } from 'react'
import { Reveal, SectionHead } from './common'

const BUILDINGS = [
  { cls: 'main', icon: '🏛️' },
  { cls: 'left', icon: '🔬' },
  { cls: 'right', icon: '📚' },
  { cls: 'back', icon: '🏢' },
  { cls: 'front', icon: '⚽' },
]

const POINTS = [
  { icon: '🏛️', title: 'Academic Block', desc: '60 smart classrooms across four floors.' },
  { icon: '🔬', title: 'Innovation Center', desc: 'Robotics, AI, and STEM laboratories.' },
  { icon: '📚', title: 'Library & Media', desc: 'Digital research and reading commons.' },
  { icon: '⚽', title: 'Sports Complex', desc: 'Indoor arena, pool, and athletic fields.' },
]

export default function Campus3D() {
  const stageRef = useRef(null)
  const worldRef = useRef(null)

  const handleMove = (e) => {
    const stage = stageRef.current
    const world = worldRef.current
    if (!stage || !world) return
    const rect = stage.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    world.style.transform = `rotateX(${8 - py * 14}deg) rotateY(${px * 26}deg)`
  }

  const handleLeave = () => {
    if (worldRef.current) worldRef.current.style.transform = 'rotateX(8deg) rotateY(0deg)'
  }

  return (
    <section className="section section-dark campus3d" id="campus-3d">
      <div className="container">
        <SectionHead
          center
          eyebrow="Immersive Experience"
          title="Explore Our Campus in"
          accent="3D"
          lead="Move your cursor across the scene to glide through a living model of the Dawn campus — a glimpse of the world your child will learn and grow in."
        />

        <Reveal>
          <div
            className="campus3d-stage"
            ref={stageRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
          >
            <div className="campus3d-floor" aria-hidden="true" />
            <div className="campus3d-world" ref={worldRef} style={{ transform: 'rotateX(8deg)' }}>
              {BUILDINGS.map((b) => (
                <div
                  key={b.cls}
                  className={`b3d ${b.cls} float-y`}
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                >
                  <span className="b3d-label">{b.icon}</span>
                </div>
              ))}
            </div>
            <div className="campus3d-hint">
              <span>🖱️</span> Move your mouse to explore
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
