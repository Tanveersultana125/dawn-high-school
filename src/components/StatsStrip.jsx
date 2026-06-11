import { Reveal, Counter } from './common'

const STATS = [
  { value: 4200, suffix: '+', label: 'Bright Students', icon: '🎓' },
  { value: 98, suffix: '%', label: 'University Placement', icon: '🏛️' },
  { value: 180, suffix: '+', label: 'Expert Educators', icon: '👩‍🏫' },
  { value: 40, suffix: '+', label: 'Years of Excellence', icon: '⭐' },
]

export default function StatsStrip() {
  return (
    <section className="section stats-section" id="stats">
      <div className="container">
        <div className="stats-strip">
          {STATS.map((s, i) => (
            <Reveal className="stat" delay={(i % 4) + 1} key={s.label}>
              <div className="stat-ic">{s.icon}</div>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
