import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Counter } from './common'

const COUNTERS = [
  { icon: '🏅', value: 180, suffix: '+', label: 'Awards Won' },
  { icon: '🎓', value: 540, suffix: '+', label: 'Board Toppers' },
  { icon: '🥇', value: 95, suffix: '+', label: 'Competition Wins' },
  { icon: '🏛️', value: 40, suffix: '+', label: 'University Placements' },
]

const TIMELINE = [
  { year: '2024', title: 'National STEM Champions', desc: 'Our robotics team secured first place at the National Innovation Challenge.' },
  { year: '2023', title: '100% Board Pass Rate', desc: '14 students achieved perfect scores, with 62% earning distinction.' },
  { year: '2022', title: 'Ivy & Global Admissions', desc: 'Graduates admitted to MIT, Oxford, and leading global universities.' },
  { year: '2021', title: 'Green Campus Award', desc: 'Recognized nationally for sustainability and smart-campus innovation.' },
]

export default function Achievements() {
  return (
    <section className="section section-dark" id="achievements">
      <div className="container">
        <SectionHead
          center
          eyebrow="Our Achievements"
          title="A Track Record of"
          accent="Distinction"
          lead="Excellence isn’t a goal — it’s our habit. Explore the milestones that define the Dawn legacy."
        />

        <div className="achv-counters">
          {COUNTERS.map((c, i) => (
            <Reveal className="achv-counter" delay={i + 1} key={c.label}>
              <div className="ic">{c.icon}</div>
              <Counter value={c.value} suffix={c.suffix} />
              <span>{c.label}</span>
            </Reveal>
          ))}
        </div>

        <div className="achv-layout">
          <Reveal>
            <span className="eyebrow">Milestones</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              Celebrating Years of Outstanding Results
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.74)', maxWidth: 460 }}>
              From national competitions to global university placements, our students
              continue to raise the bar — supported by faculty who believe every child
              can achieve greatness.
            </p>
            <Link to="/admissions" className="btn btn-gold" style={{ marginTop: 30 }}>
              Become Part of Our Story
            </Link>
          </Reveal>

          <Reveal className="timeline" delay={2}>
            {TIMELINE.map((t) => (
              <div className="tl-item" key={t.year}>
                <span className="tl-dot" />
                <span className="tl-year">{t.year}</span>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
