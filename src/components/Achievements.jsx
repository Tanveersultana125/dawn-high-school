import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Counter } from './common'

// Shared 3D tilt + cursor spotlight for the stat cards (stateless handlers).
const onTiltMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--rx', (((y - r.height / 2) / (r.height / 2)) * -8).toFixed(2) + 'deg')
  el.style.setProperty('--ry', (((x - r.width / 2) / (r.width / 2)) * 8).toFixed(2) + 'deg')
  el.style.setProperty('--glow-x', ((x / r.width) * 100).toFixed(1) + '%')
  el.style.setProperty('--glow-y', ((y / r.height) * 100).toFixed(1) + '%')
}
const onTiltEnter = (e) => e.currentTarget.classList.add('tilting')
const onTiltLeave = (e) => {
  const el = e.currentTarget
  el.classList.remove('tilting')
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

// Clean line-icons (lucide-style) for a formal, consistent look — no emoji.
const ICONS = {
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>
  ),
  cap: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10l7-5 7 5v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 11h.01M15 11h.01" />
    </>
  ),
}

const COUNTERS = [
  { icon: 'award', value: 180, suffix: '+', label: 'Awards Won' },
  { icon: 'cap', value: 540, suffix: '+', label: 'Board Toppers' },
  { icon: 'trophy', value: 95, suffix: '+', label: 'Competition Wins' },
  { icon: 'building', value: 40, suffix: '+', label: 'University Placements' },
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
            <Reveal
              className="achv-counter"
              delay={i + 1}
              key={c.label}
              onMouseEnter={onTiltEnter}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <span className="achv-top" aria-hidden="true" />
              <div className="achv-counter-in">
                <div className="achv-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {ICONS[c.icon]}
                  </svg>
                </div>
                <Counter value={c.value} suffix={c.suffix} />
                <span className="achv-divider" aria-hidden="true" />
                <span className="achv-label">{c.label}</span>
              </div>
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
