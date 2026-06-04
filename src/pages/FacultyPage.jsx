import PageHero from '../components/PageHero'
import Faculty from '../components/Faculty'
import { Reveal, SectionHead, Counter } from '../components/common'

const STATS = [
  { value: 320, suffix: '+', label: 'Qualified Educators' },
  { value: 15, suffix: ' yrs', label: 'Average Experience' },
  { value: 18, prefix: '1:', label: 'Student–Teacher Ratio' },
  { value: 45, suffix: '+', label: 'PhDs & Specialists' },
]

const DEPARTMENTS = [
  { ic: '🧪', t: 'Science & Technology', d: '38 specialists across physics, chemistry, biology, and computer science.' },
  { ic: '🔢', t: 'Mathematics', d: '24 educators making numbers intuitive, logical, and fun.' },
  { ic: '🌐', t: 'Languages', d: 'Native and certified teachers in English, French, and Spanish.' },
  { ic: '📜', t: 'Humanities', d: 'Bringing history, geography, and civics to life through inquiry.' },
  { ic: '🎨', t: 'Arts & Music', d: 'Professional artists, musicians, and performers mentoring talent.' },
  { ic: '⚽', t: 'Physical Education', d: 'Certified coaches building fitness, discipline, and teamwork.' },
]

export default function FacultyPage() {
  return (
    <>
      <PageHero
        kicker="Our Faculty"
        title="Mentors Who Inspire Greatness"
        subtitle="Behind every great student is a great teacher. Meet the educators shaping tomorrow’s leaders."
        crumb="Faculty"
      />

      {/* Faculty stats */}
      <section className="section">
        <div className="container">
          <div className="stats-strip">
            {STATS.map((s, i) => (
              <Reveal className="stat" delay={i + 1} key={s.label}>
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faculty />

      {/* Departments */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Departments"
            title="Expertise Across"
            accent="Every Discipline"
            lead="Our faculty is organised into specialised departments, each led by experienced heads."
          />
          <div className="grid cols-3">
            {DEPARTMENTS.map((d, i) => (
              <Reveal className="card" delay={(i % 3) + 1} key={d.t}>
                <div className="card-icon">{d.ic}</div>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
