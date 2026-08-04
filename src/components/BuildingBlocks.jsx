import { Link } from 'react-router-dom'
import { Reveal } from './common'
import SmartImage from './SmartImage'

// Photo mosaic beside the copy. `span` is how many of the grid's twelve columns
// a tile takes, so the rows read wide/narrow, wide/narrow, then even.
const MOSAIC = [
  { id: 'photo-1562774053-701939374585', span: 7, alt: 'The Dawn campus' },
  { id: 'photo-1497486751825-1233686d5d80', span: 5, alt: 'Students working together in the library' },
  { id: 'photo-1523240795612-9a054b0db644', span: 7, alt: 'A teacher guiding a student in class' },
  { id: 'photo-1461896836934-ffe607ba8211', span: 5, alt: 'The sports field' },
  { id: 'photo-1511671782779-c97d3d27a1d4', span: 6, alt: 'Music practice' },
  { id: 'photo-1532094349884-543bc11b234d', span: 6, alt: 'Students in the art and science block' },
]

const CapIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" strokeLinejoin="round" />
    <path d="M6.5 10.8v4.4c0 1.9 2.5 3.4 5.5 3.4s5.5-1.5 5.5-3.4v-4.4" strokeLinecap="round" />
    <path d="M21.5 8.5v5" strokeLinecap="round" />
  </svg>
)
const TeacherIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
  </svg>
)
const TrophyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" strokeLinejoin="round" />
    <path d="M7 5.5H4.5v1A3.5 3.5 0 0 0 8 10M17 5.5h2.5v1A3.5 3.5 0 0 1 16 10" strokeLinecap="round" />
    <path d="M12 14v3.5M8.5 20.5h7M10 17.5h4l.6 3h-5.2l.6-3Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CampusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 20V7l6-3 6 3v13" strokeLinejoin="round" />
    <path d="M16 11h4v9M2.5 20h19" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 11h1.5M8 14.5h1.5M11.5 11H13M11.5 14.5H13" strokeLinecap="round" />
  </svg>
)

// The school's own figures, not the mockup's — 4,200 students and 180 educators
// match the stats strip on the About page, and there really are two campuses.
const STATS = [
  { icon: CapIcon, value: '4,200+', label: 'Bright Students' },
  { icon: TeacherIcon, value: '180+', label: 'Expert Educators' },
  { icon: TrophyIcon, value: '40+', label: 'Years of Excellence' },
  { icon: CampusIcon, value: '2', label: 'Campuses' },
]

/** Introductory band for a photo section — copy, a photo mosaic and a stats bar. */
export default function BuildingBlocks({
  eyebrow = 'Innovation at Dawn',
  title = 'Building Blocks of a',
  accent = 'Brighter Future',
  lead = 'Every lesson, lab, and project is a building block — layered together to shape confident, curious, future-ready learners.',
  buttonText = 'Explore Academics',
  to = '/academics',
  sectionClassName = '',
}) {
  return (
    <section className={`section section-dark blocks-section ${sectionClassName}`} id="innovation">
      <div className="container">
        <div className="blocks-layout">
          <Reveal className="blocks-copy">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title">
              {title} <span className="accent">{accent}</span>
            </h2>
            <p className="section-lead">{lead}</p>
            {buttonText && (
              <Link to={to} className="btn btn-gold blocks-btn">
                {buttonText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
            <span className="blocks-dots" aria-hidden="true" />
          </Reveal>

          <Reveal className="blocks-mosaic" delay={1}>
            {MOSAIC.map((m) => (
              <div className="bm-tile" key={m.id} style={{ '--span': m.span }}>
                <SmartImage
                  src={`https://images.unsplash.com/${m.id}?auto=format&fit=crop&w=760&q=78`}
                  alt={m.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="blocks-stats" delay={2}>
          {STATS.map((s) => (
            <div className="bs-item" key={s.label}>
              <span className="bs-ic" aria-hidden="true">{s.icon}</span>
              <div>
                <b>{s.value}</b>
                <small>{s.label}</small>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
