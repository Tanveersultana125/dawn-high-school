import { Link } from 'react-router-dom'
import { Reveal, SectionHead } from './common'
import { EnquireIcon, CampusIcon, AssessIcon, EnrollIcon } from './admissionIcons'
import {
  FormIcon, CertIcon, ReportIcon, PhotoIcon, IdIcon,
  ClipboardBadge, ShieldBadge, FolderArt,
} from './applyArt'

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
  { label: 'Completed online application form', icon: FormIcon },
  { label: "Student's birth certificate copy", icon: CertIcon },
  { label: 'Previous school report cards', icon: ReportIcon },
  { label: 'Two passport-size photographs', icon: PhotoIcon },
  { label: 'Parent / guardian ID proof', icon: IdIcon },
]

const CheckMark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="m6 12.4 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
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

        <Reveal className="apply-panel">
          <div className="ap-head">
            <span className="ap-head-ic" aria-hidden="true">{ClipboardBadge}</span>
            <h3>
              What you&apos;ll need
              <span>to apply</span>
            </h3>
          </div>

          <div className="ap-body">
            <ul className="ap-list">
              {CHECKLIST.map((item) => (
                <li key={item.label}>
                  <span className="ap-check" aria-hidden="true"><CheckMark /></span>
                  <span className="ap-tile" aria-hidden="true">{item.icon}</span>
                  <span className="ap-label">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="ap-art" aria-hidden="true">{FolderArt}</div>
          </div>

          <div className="ap-note">
            <span className="ap-note-ic" aria-hidden="true">{ShieldBadge}</span>
            <p>
              Have everything ready and our admissions team will <b>guide you</b> through
              the rest.
            </p>
          </div>
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
