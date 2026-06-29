import { useInView, useCountUp } from '../hooks/useScrollReveal'

/**
 * Trust band that bridges the Recognition slider and the hero below.
 * A clean row of key stats. All counters start together the moment the band
 * scrolls into view, so the count-up animation is always visible.
 */

const STATS = [
  { icon: '🏆', value: 25, suffix: '+', label: 'Years of Excellence' },
  { icon: '🎓', value: 4200, suffix: '+', label: 'Bright Students' },
  { icon: '👩‍🏫', value: 180, suffix: '+', label: 'Expert Educators' },
  { icon: '🌍', value: 100, suffix: '%', label: 'University Pathways' },
]

function Stat({ icon, value, suffix, label, active, delay }) {
  const n = useCountUp(value, active)
  return (
    <div className="trust-item" style={{ transitionDelay: `${delay}ms` }}>
      <span className="trust-ic" aria-hidden="true">{icon}</span>
      <span className="trust-meta">
        <b>
          {n.toLocaleString()}
          <span className="suffix">{suffix}</span>
        </b>
        <small>{label}</small>
      </span>
    </div>
  )
}

export default function RecognitionRibbon() {
  const [ref, inView] = useInView({ once: true, threshold: 0.35 })

  return (
    <section className={`trust ${inView ? 'in' : ''}`} ref={ref} aria-label="Key highlights">
      <div className="container">
        <div className="trust-row">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} active={inView} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  )
}
