import PageHero from '../components/PageHero'
import Academics from '../components/Academics'
import TiltCard from '../components/TiltCard'
import { Reveal, SectionHead } from '../components/common'
import SmartImage from '../components/SmartImage'
import { usePageImage } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

const PHILOSOPHY = [
  { ic: '🔍', t: 'Inquiry-Based', d: 'Students learn by questioning, exploring, and discovering — not memorising.' },
  { ic: '🎯', t: 'Personalised', d: 'Adaptive pathways and small class sizes meet every learner where they are.' },
  { ic: '🚀', t: 'Future-Ready', d: 'Coding, critical thinking, and real-world projects from an early age.' },
]

const SUBJECTS = [
  { ic: '🔢', b: 'Mathematics', s: 'Algebra · Calculus · Statistics' },
  { ic: '🧪', b: 'Sciences', s: 'Physics · Chemistry · Biology' },
  { ic: '🌐', b: 'Languages', s: 'English · Urdu · Telugu · Hindi' },
  { ic: '📜', b: 'Humanities', s: 'History · Geography · Civics' },
  { ic: '💻', b: 'Computer Science', s: 'Computer Basics · MS Office · Coding' },
  { ic: '🎨', b: 'Visual & Performing Arts', s: 'Art · Music · Theatre' },
  { ic: '📈', b: 'Commerce', s: 'Economics · Business · Accounts' },
  { ic: '⚽', b: 'Physical Education', s: 'Athletics · Wellness · Teamwork' },
]

const ASSESS = [
  { ic: '📝', t: 'Continuous Assessment', d: 'Regular feedback over high-stakes testing keeps learning on track.' },
  { ic: '🧩', t: 'Project-Based', d: 'Capstone projects and portfolios demonstrate real understanding.' },
  { ic: '📊', t: 'Data-Informed', d: 'Each student’s progress is tracked to personalise support and stretch.' },
]

export default function AcademicsPage() {
  const heroPhoto = usePageImage('academics.hero', '')
  const oxfordImg = usePageImage('academics.oxfordCurriculum', '/oxford-curriculum.png')
  const txt = usePageTextResolver()
  return (
    <>
      <PageHero
        variant="academics"
        photo={heroPhoto}
        kicker={txt('academics.hero.kicker', 'Academic Excellence')}
        title={txt('academics.hero.title', 'Programs for Every Stage of Growth')}
        subtitle={txt('academics.hero.subtitle', 'From first steps to final exams, our academic pathways challenge, inspire, and empower students at every level.')}
        crumb="Academics"
      />

      <Academics />

      {/* Oxford Curriculum Framework */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.oxford.eyebrow', 'Global Excellence, Powered by the British Curriculum')}
            title={txt('academics.oxford.title', 'Unlocking Potential with the')}
            accent={txt('academics.oxford.accent', 'Oxford Curriculum Framework')}
          />
          <div className="award-card">
            <Reveal className="award-copy">
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>{txt('academics.oxford.eyebrow2', 'UK-Based Global Curriculum')}</span>
              <h2>{txt('academics.oxford.title2', 'A World-Class British Education')}</h2>
              <p>
                {txt('academics.oxford.desc', 'Dawn High School delivers the Oxford Curriculum Framework — a UK-based, globally recognised programme designed by expert boards and refined through cutting-edge research to give every student a strong, future-ready foundation.')}
              </p>
              <ul className="award-points">
                <li><i>★</i> {txt('academics.oxford.point.1', 'UK-based, globally recognised curriculum')}</li>
                <li><i>★</i> {txt('academics.oxford.point.2', 'Designed by expert boards & top research centres')}</li>
                <li><i>★</i> {txt('academics.oxford.point.3', 'Structured for strong, measurable student growth')}</li>
                <li><i>★</i> {txt('academics.oxford.point.4', 'Refined through cutting-edge research')}</li>
                <li><i>★</i> {txt('academics.oxford.point.5', 'Future-ready skills: Robotics, Coding & STEM')}</li>
              </ul>
            </Reveal>
            <Reveal className="award-photo" delay={1}>
              <SmartImage
                src={oxfordImg}
                alt="Dawn High School — Unlocking potential with the Oxford Curriculum Framework"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Learning philosophy */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.philo.eyebrow', 'Our Approach')}
            title={txt('academics.philo.title', 'A Philosophy Built for')}
            accent={txt('academics.philo.accent', 'Real Learning')}
          />
          <div className="grid cols-3">
            {PHILOSOPHY.map((p, i) => (
              <Reveal className="philo-cell" delay={(i % 3) + 1} key={p.t}>
                <TiltCard className="card philosophy-card">
                  <div className="card-icon">{p.ic}</div>
                  <h3>{txt(`academics.philo.${i + 1}.t`, p.t)}</h3>
                  <p>{txt(`academics.philo.${i + 1}.d`, p.d)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.subjects.eyebrow', 'Curriculum')}
            title={txt('academics.subjects.title', 'Subjects We')}
            accent={txt('academics.subjects.accent', 'Offer')}
            lead={txt('academics.subjects.lead', 'A broad, balanced curriculum that lets every student discover and pursue their passion.')}
          />
          <Reveal>
            <div className="subject-grid">
              {SUBJECTS.map((s, i) => (
                <div className="subject" key={s.b}>
                  <span className="s-ic">{s.ic}</span>
                  <div>
                    <b>{txt(`academics.subject.${i + 1}.b`, s.b)}</b>
                    <span>{txt(`academics.subject.${i + 1}.s`, s.s)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Assessment */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.assess.eyebrow', 'Assessment')}
            title={txt('academics.assess.title', 'How We')}
            accent={txt('academics.assess.accent', 'Measure Growth')}
          />
          <div className="grid cols-3">
            {ASSESS.map((a, i) => (
              <Reveal className="card" delay={(i % 3) + 1} key={a.t}>
                <div className="card-icon">{a.ic}</div>
                <h3>{txt(`academics.assess.${i + 1}.t`, a.t)}</h3>
                <p>{txt(`academics.assess.${i + 1}.d`, a.d)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
