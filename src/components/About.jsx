import { Reveal, SectionHead, Counter } from './common'

const POINTS = [
  ['Holistic Curriculum', 'A balanced blend of academics, arts, athletics, and character education.'],
  ['Globally Benchmarked', 'Standards aligned with leading international education frameworks.'],
  ['Future-Ready Skills', 'Critical thinking, coding, communication, and leadership from day one.'],
]

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 4200, suffix: '+', label: 'Student Strength' },
  { value: 320, suffix: '+', label: 'Qualified Faculty' },
  { value: 180, suffix: '+', label: 'Academic Awards' },
]

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-visual">
            <div className="about-frame">
              <img
                className="about-photo"
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1100"
                alt="Dawn High School campus building"
                loading="lazy"
                decoding="async"
              />
              <div className="about-frame-overlay" aria-hidden="true" />
              <div className="scene-tag">
                <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>Est. 2000</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', lineHeight: 1.15 }}>
                    A Legacy of Learning, A Vision for Tomorrow
                  </h3>
                </div>
              </div>
            </div>
            <div className="about-quote">
              <span className="quote-mark" aria-hidden="true">“</span>
              <p>We don&apos;t just teach subjects — we nurture leaders.</p>
              <div className="quote-author">
                <span className="qa-avatar" aria-hidden="true">EH</span>
                <span className="qa-meta">
                  <b>Dr. Eleanor Hayes</b>
                  <small>Principal</small>
                </span>
              </div>
            </div>
          </Reveal>

          <div className="about-copy">
            <SectionHead
              eyebrow="About Our School"
              title="Where Ambition Meets"
              accent="Achievement"
              lead="For over two decades, Dawn High School has been a beacon of educational excellence — combining a rich heritage with cutting-edge teaching to shape confident, compassionate, and capable global citizens."
            />
            <Reveal className="about-points" delay={2}>
              {POINTS.map(([title, desc]) => (
                <div className="about-point" key={title}>
                  <i>✓</i>
                  <div>
                    <b>{title}</b>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="stats-strip">
          {STATS.map((s, i) => (
            <Reveal className="stat" delay={i + 1} key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
