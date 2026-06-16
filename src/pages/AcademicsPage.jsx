import PageHero from '../components/PageHero'
import Academics from '../components/Academics'
import TiltCard from '../components/TiltCard'
import { Reveal, SectionHead } from '../components/common'
import SmartImage from '../components/SmartImage'

const PHILOSOPHY = [
  { ic: '🔍', t: 'Inquiry-Based', d: 'Students learn by questioning, exploring, and discovering — not memorising.' },
  { ic: '🎯', t: 'Personalised', d: 'Adaptive pathways and small class sizes meet every learner where they are.' },
  { ic: '🚀', t: 'Future-Ready', d: 'Coding, critical thinking, and real-world projects from an early age.' },
]

const SUBJECTS = [
  { ic: '🔢', b: 'Mathematics', s: 'Algebra · Calculus · Statistics' },
  { ic: '🧪', b: 'Sciences', s: 'Physics · Chemistry · Biology' },
  { ic: '🌐', b: 'Languages', s: 'English · French · Spanish' },
  { ic: '📜', b: 'Humanities', s: 'History · Geography · Civics' },
  { ic: '💻', b: 'Computer Science', s: 'Coding · AI · Robotics' },
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
  return (
    <>
      <PageHero
        kicker="Academic Excellence"
        title="Programs for Every Stage of Growth"
        subtitle="From first steps to final exams, our academic pathways challenge, inspire, and empower students at every level."
        crumb="Academics"
      />

      <Academics />

      {/* Oxford Curriculum Framework */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow="Global Excellence, Powered by the British Curriculum"
            title="Unlocking Potential with the"
            accent="Oxford Curriculum Framework"
          />
          <div className="award-card">
            <Reveal className="award-copy">
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>UK-Based Global Curriculum</span>
              <h2>A World-Class British Education</h2>
              <p>
                Dawn High School delivers the Oxford Curriculum Framework — a UK-based,
                globally recognised programme designed by expert boards and refined through
                cutting-edge research to give every student a strong, future-ready foundation.
              </p>
              <ul className="award-points">
                <li><i>★</i> UK-based, globally recognised curriculum</li>
                <li><i>★</i> Designed by expert boards &amp; top research centres</li>
                <li><i>★</i> Structured for strong, measurable student growth</li>
                <li><i>★</i> Refined through cutting-edge research</li>
                <li><i>★</i> Future-ready skills: Robotics, Coding &amp; STEM</li>
              </ul>
            </Reveal>
            <Reveal className="award-photo" delay={1}>
              <SmartImage
                src="/oxford-curriculum.png"
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
            eyebrow="Our Approach"
            title="A Philosophy Built for"
            accent="Real Learning"
          />
          <div className="grid cols-3">
            {PHILOSOPHY.map((p, i) => (
              <Reveal className="philo-cell" delay={(i % 3) + 1} key={p.t}>
                <TiltCard className="card philosophy-card">
                  <div className="card-icon">{p.ic}</div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
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
            eyebrow="Curriculum"
            title="Subjects We"
            accent="Offer"
            lead="A broad, balanced curriculum that lets every student discover and pursue their passion."
          />
          <Reveal>
            <div className="subject-grid">
              {SUBJECTS.map((s) => (
                <div className="subject" key={s.b}>
                  <span className="s-ic">{s.ic}</span>
                  <div>
                    <b>{s.b}</b>
                    <span>{s.s}</span>
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
          <SectionHead center eyebrow="Assessment" title="How We" accent="Measure Growth" />
          <div className="grid cols-3">
            {ASSESS.map((a, i) => (
              <Reveal className="card" delay={(i % 3) + 1} key={a.t}>
                <div className="card-icon">{a.ic}</div>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
