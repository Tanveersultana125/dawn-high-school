import PageHero from '../components/PageHero'
import CampusLife from '../components/CampusLife'
import Campus3D from '../components/Campus3D'
import Library from '../components/Library'
import TiltCard from '../components/TiltCard'
import WarpBackground from '../components/WarpBackground'
import { Reveal, SectionHead } from '../components/common'
import { usePageImage } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

const FACILITIES = [
  { ic: '🏫', t: 'Smart Classrooms', d: '60 air-conditioned rooms with interactive smart boards.' },
  { ic: '🔬', t: 'Science Laboratories', d: 'Eight fully-equipped physics, chemistry, biology & robotics labs.' },
  { ic: '📚', t: 'Library & Media Centre', d: 'A 30,000-volume library and digital research commons.' },
  { ic: '🏟️', t: 'Sports Complex', d: 'Indoor arena, swimming pool, and Olympic-grade athletic fields.' },
  { ic: '🎭', t: 'Auditorium', d: 'A 600-seat performing-arts theatre with professional staging.' },
  { ic: '🍽️', t: 'Dining Hall', d: 'Nutritious, freshly-prepared meals in a modern cafeteria.' },
  { ic: '🚌', t: 'Transport', d: 'A GPS-tracked, safe, and comfortable bus fleet across the city.' },
  { ic: '⚕️', t: 'Medical & Wellness', d: 'On-campus infirmary and full-time counselling support.' },
]

export default function CampusPage() {
  const heroPhoto = usePageImage('campus.hero', '')
  const txt = usePageTextResolver()
  return (
    <>
      <PageHero
        variant="campus"
        photo={heroPhoto}
        kicker={txt('campus.hero.kicker', 'Campus Life')}
        title={txt('campus.hero.title', 'Where Learning Extends Beyond the Classroom')}
        subtitle={txt('campus.hero.subtitle', 'A vibrant 12-acre campus where every passion finds a home — sports, arts, science, and service.')}
        crumb="Campus"
        highlights={[
          { n: '12', l: 'Acre green campus' },
          { n: '8+', l: 'World-class facilities' },
          { n: '30K', l: 'Volume library' },
        ]}
      />

      <CampusLife />

      {/* Facilities */}
      <section className="section">
        <div className="container">
          <WarpBackground
            className="warp-facilities"
            beamsPerSide={4}
            beamSize={5}
            beamDuration={3.6}
          >
            <SectionHead
              center
              eyebrow={txt('campus.fac.eyebrow', 'World-Class Facilities')}
              title={txt('campus.fac.title', 'Built for')}
              accent={txt('campus.fac.accent', 'Every Ambition')}
              lead={txt('campus.fac.lead', 'State-of-the-art infrastructure designed for safety, comfort, and inspired learning.')}
            />
            <div className="grid cols-4 fac-grid">
              {FACILITIES.map((f, i) => (
                <Reveal className="philo-cell" delay={(i % 4) + 1} key={f.t}>
                  <TiltCard className="card philosophy-card fac-card">
                    <div className="card-icon">{f.ic}</div>
                    <h3>{txt(`campus.fac.${i + 1}.t`, f.t)}</h3>
                    <p>{txt(`campus.fac.${i + 1}.d`, f.d)}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </WarpBackground>
        </div>
      </section>

      <Library alt detailed slot="campus.library" textPrefix="campus.library" />

      <Campus3D />
    </>
  )
}
