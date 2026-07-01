import { Reveal, Counter } from './common'
import AnimatedGradient from './AnimatedGradient'

// On-brand navy → gold live gradient that sits behind the stat cards.
const STATS_GRADIENT = {
  preset: 'custom',
  color1: '#061128', // navy-900
  color2: '#0e2a5e', // navy-700
  color3: '#d4af37', // gold-500
  rotation: -40,
  proportion: 24,
  scale: 0.42,
  speed: 14,
  distortion: 3,
  swirl: 48,
  swirlIterations: 6,
  softness: 100,
  offset: -120,
  shape: 'Edge',
  shapeSize: 40,
}

const STATS = [
  { value: 4200, suffix: '+', label: 'Bright Students', icon: '🎓' },
  { value: 98, suffix: '%', label: 'University Placement', icon: '🏛️' },
  { value: 180, suffix: '+', label: 'Expert Educators', icon: '👩‍🏫' },
  { value: 40, suffix: '+', label: 'Years of Excellence', icon: '⭐' },
]

export default function StatsStrip() {
  return (
    <section className="section stats-section stats-section--live" id="stats">
      <AnimatedGradient config={STATS_GRADIENT} noise={{ opacity: 0.35 }} />
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
