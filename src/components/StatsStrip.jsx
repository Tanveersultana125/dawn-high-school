import { useRef } from 'react'
import { Counter } from './common'
import AnimatedGradient from './AnimatedGradient'
import { MagicCard, MagicSpotlight } from './MagicGlow'

// Soft, airy live gradient that sits behind the stat cards — warm cream + gold
// so it matches the cards' gold accents (star, suffixes, glow).
const STATS_GRADIENT = {
  preset: 'custom',
  color1: '#f6efda', // warm cream
  color2: '#ecd9a3', // soft gold
  color3: '#dbe7fb', // soft royal-blue tint
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

// Brand gold (--gold-500 #d4af37) so the glow matches the section's gold accents.
const STAT_GLOW = '212, 175, 55'

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
        <MagicSpotlight gridRef={stripRef} glowColor={STAT_GLOW} />
        <div className="stats-strip" ref={stripRef}>
          {STATS.map((s, i) => (
            <MagicCard className="stat" delay={(i % 4) + 1} glowColor={STAT_GLOW} key={s.label}>
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
