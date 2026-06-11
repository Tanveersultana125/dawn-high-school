import { useCallback, useEffect, useState } from 'react'
import { SectionHead } from './common'

const REVIEWS = [
  {
    text: 'Dawn didn’t just prepare my daughter for exams — it prepared her for life. Her confidence and curiosity have grown beyond what we imagined.',
    name: 'Priya Sharma',
    role: 'Parent · Grade 9',
    grad: 'linear-gradient(160deg,#1450c8,#4f86f7)',
    initials: 'PS',
  },
  {
    text: 'The teachers genuinely care. The science labs and innovation hub made me fall in love with engineering. I’m now studying at a top university.',
    name: 'Daniel Okoye',
    role: 'Alumnus · Class of 2022',
    grad: 'linear-gradient(160deg,#0e2a5e,#2563eb)',
    initials: 'DO',
  },
  {
    text: 'From robotics club to leadership camp, every day brought something new. Dawn feels less like a school and more like a launchpad.',
    name: 'Aisha Rahman',
    role: 'Student · Grade 11',
    grad: 'linear-gradient(160deg,#103374,#4f86f7)',
    initials: 'AR',
  },
  {
    text: 'As parents, the transparency, safety, and academic rigor gave us complete peace of mind. Worth every bit of trust we placed in them.',
    name: 'Michael & Sara Bennett',
    role: 'Parents · Grade 6 & 8',
    grad: 'linear-gradient(160deg,#0a1f44,#1450c8)',
    initials: 'MB',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 5500)
    return () => clearInterval(id)
  }, [paused, index])

  const r = REVIEWS[index]

  return (
    <section className="section section-dark" id="testimonials">
      <div className="container">
        <SectionHead
          center
          eyebrow="Testimonials"
          title="Voices of the"
          accent="Dawn Family"
          lead="Parents, students, and alumni share what makes the Dawn experience truly special."
        />

        <div
          className="testi-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testi-card" key={index}>
            <div className="testi-quotemark">“</div>
            <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="testi-text reveal in">{r.text}</p>
            <div className="testi-person">
              <span className="testi-avatar" style={{ background: r.grad }}>{r.initials}</span>
              <div style={{ textAlign: 'left' }}>
                <b>{r.name}</b>
                <span>{r.role}</span>
              </div>
            </div>
          </div>

          <div className="testi-controls">
            <button className="testi-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">‹</button>
            <div className="testi-dots">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  className={`testi-dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button className="testi-arrow" onClick={() => go(1)} aria-label="Next testimonial">›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
