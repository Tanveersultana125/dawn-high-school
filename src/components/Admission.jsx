import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from './common'
import { CardSpotlight } from './CardSpotlight'
import { EnquireIcon, CampusIcon, AssessIcon, EnrollIcon } from './admissionIcons'

// The four steps walk the brand ramp — royal blue deepening into navy, then
// gold at enrolment — the same progression the grade cards use, so the two
// sections read as one family. `accent` and `deep` are the two ends of each
// card's gradient (badge, ribbon); `wash` is the same hue at low alpha for the
// tint at the foot of the card.
const STEPS = [
  {
    num: '01', title: 'Enquire', icon: EnquireIcon,
    accent: '#4f86f7', deep: '#1d5fd1', wash: 'rgba(79, 134, 247, 0.13)',
    desc: 'Submit an online enquiry form or call our admissions office to begin.',
  },
  {
    num: '02', title: 'Campus Visit', icon: CampusIcon,
    accent: '#1450c8', deep: '#0d3a97', wash: 'rgba(20, 80, 200, 0.12)',
    desc: 'Tour our facilities and meet faculty to experience the Dawn difference.',
  },
  {
    num: '03', title: 'Assessment', icon: AssessIcon,
    accent: '#0e2a5e', deep: '#061128', wash: 'rgba(14, 42, 94, 0.12)',
    desc: 'A friendly interaction and age-appropriate assessment for the student.',
  },
  {
    num: '04', title: 'Enroll', icon: EnrollIcon,
    accent: '#b8860b', deep: '#8a6408', wash: 'rgba(184, 134, 11, 0.14)',
    desc: 'Receive your offer, complete registration, and welcome to the family!',
  },
]

const CHECKLIST = [
  'Completed online application form',
  "Student's birth certificate copy",
  'Previous school report cards',
  'Two passport-size photographs',
  'Parent / guardian ID proof',
]

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="card-spotlight__check"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
)

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
            <Reveal
              className="adm-step"
              delay={i + 1}
              key={s.num}
              style={{ '--st-accent': s.accent, '--st-deep': s.deep, '--st-wash': s.wash }}
            >
              <span className="step-ribbon" aria-hidden="true">{s.num}</span>

              {/* Badge and title share a row. */}
              <div className="step-head">
                <span className="step-badge" aria-hidden="true">{s.icon}</span>
                <h3>{s.title}</h3>
              </div>

              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="admission-spotlight-wrap">
          <CardSpotlight className="admission-spotlight">
            <p className="card-spotlight__title">What you'll need to apply</p>
            <ul className="card-spotlight__list">
              {CHECKLIST.map((item) => (
                <li className="card-spotlight__item" key={item}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="card-spotlight__note">
              Have everything ready and our admissions team will guide you through the rest.
            </p>
          </CardSpotlight>
        </Reveal>

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
