import { useRef } from 'react'
import { Counter } from './common'
import AnimatedGradient from './AnimatedGradient'
import { MagicCard, MagicSpotlight } from './MagicGlow'

// Soft, airy live gradient that sits behind the stat cards.
const STATS_GRADIENT = {
  preset: 'custom',
  color1: '#eaf1fb', // light blue tint
  color2: '#f3e2a9', // soft light gold
  color3: '#ffffff', // white
  rotation: -40,
  proportion: 34,
  scale: 0.42,
  speed: 12,
  distortion: 3,
  swirl: 46,
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
  const stripRef = useRef(null)

  return (
    <section className="section stats-section stats-section--live" id="stats">
      <AnimatedGradient config={STATS_GRADIENT} noise={{ opacity: 0.35 }} />
      <div className="container">
        <MagicSpotlight gridRef={stripRef} />
        <div className="stats-strip" ref={stripRef}>
          {STATS.map((s, i) => (
            <MagicCard className="stat" delay={(i % 4) + 1} key={s.label}>
              <div className="stat-ic">{s.icon}</div>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  )
}
