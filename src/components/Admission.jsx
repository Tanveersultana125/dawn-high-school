import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from './common'

const STEPS = [
  { num: '01', title: 'Enquire', desc: 'Submit an online enquiry form or call our admissions office to begin.' },
  { num: '02', title: 'Campus Visit', desc: 'Tour our facilities and meet faculty to experience the Dawn difference.' },
  { num: '03', title: 'Assessment', desc: 'A friendly interaction and age-appropriate assessment for the student.' },
  { num: '04', title: 'Enroll', desc: 'Receive your offer, complete registration, and welcome to the family!' },
]

export default function Admission() {
  return (
    <section className="section section-alt" id="admissions">
      <div className="container">
        <SectionHead
          center
          eyebrow="Admissions"
          title="Your Journey Starts in"
          accent="Four Simple Steps"
          lead="We’ve made joining the Dawn family seamless. Here’s how to secure your child’s place for the upcoming academic year."
        />

        <div className="admission-steps">
          {STEPS.map((s, i) => (
            <Reveal className="adm-step" delay={i + 1} key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && <span className="step-arrow">→</span>}
            </Reveal>
          ))}
        </div>

        <Reveal className="admission-cta">
          <div>
            <h3>Admissions for 2026–27 are now open</h3>
            <p>Limited seats available across all grades. Apply today to secure your child’s future.</p>
          </div>
          <Link to="/contact" className="btn btn-gold">
            Start Online Application
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
