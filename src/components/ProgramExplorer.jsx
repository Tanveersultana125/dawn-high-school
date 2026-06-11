import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from './common'

const FILTERS = ['All', 'Primary', 'Middle', 'High', 'STEM']

const PROGRAMS = [
  { cat: 'Primary', icon: '🧒', title: 'Primary School', grades: 'Grades 1 – 5', rating: 4.9, tag: 'Foundation Years', desc: 'Joyful, activity-rich foundations in literacy, numeracy, and social skills.' },
  { cat: 'Middle', icon: '📚', title: 'Middle School', grades: 'Grades 6 – 8', rating: 4.8, tag: 'Growth Years', desc: 'Inquiry-led, interdisciplinary learning that sharpens reasoning & collaboration.' },
  { cat: 'High', icon: '🎓', title: 'High School', grades: 'Grades 9 – 12', rating: 5.0, tag: 'Senior Years', desc: 'Specialised streams, honors courses, and dedicated university counselling.' },
  { cat: 'STEM', icon: '🔬', title: 'Science & Robotics', grades: 'All Levels', rating: 4.9, tag: 'Innovation Track', desc: 'Hands-on robotics, AI, and engineering in state-of-the-art smart labs.' },
  { cat: 'STEM', icon: '💻', title: 'Digital & Coding', grades: 'Grade 3+', rating: 4.8, tag: 'Smart Campus', desc: 'Coding from an early age on a connected, future-ready learning platform.' },
  { cat: 'High', icon: '📈', title: 'Commerce Stream', grades: 'Grades 11 – 12', rating: 4.7, tag: 'Career Track', desc: 'Economics, business studies & accounting with real-world case learning.' },
]

export default function ProgramExplorer() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? PROGRAMS : PROGRAMS.filter((p) => p.cat === filter)

  return (
    <section className="section section-alt" id="programs">
      <div className="container">
        <SectionHead
          center
          eyebrow="Explore Programs"
          title="Find the Right"
          accent="Path for Your Child"
          lead="Filter by stage to discover the program that fits — every pathway is designed to challenge, inspire, and empower."
        />

        <Reveal className="prog-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`prog-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="prog-grid" key={filter}>
          {shown.map((p, i) => (
            <Reveal className="prog-card" delay={(i % 3) + 1} key={p.title}>
              <div className="prog-card-top">
                <span className="prog-ic">{p.icon}</span>
                <span className="prog-rating">★ {p.rating.toFixed(1)}</span>
              </div>
              <span className="prog-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <span className="prog-grades">{p.grades}</span>
              <p>{p.desc}</p>
              <Link className="prog-link" to="/academics">
                Explore Program <i aria-hidden="true">→</i>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
