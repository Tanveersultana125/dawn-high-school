import FutureHero from '../components/FutureHero'
import Admission from '../components/Admission'
import TiltCard from '../components/TiltCard'
import { Reveal, SectionHead } from '../components/common'
import { BlocksArt, BookArt, ScienceArt, GraduateArt, CheckMark } from '../components/gradeArt'
import {
  CalendarIcon, BuildingIcon, ClipboardIcon, EnvelopeIcon, ShieldIcon,
  FormArt, CampusArt, AssessArt, LetterArt, EnrolArt,
} from '../components/keyDateArt'

const REQUIREMENTS = [
  ['Completed application form', 'Submitted online or at the admissions office.'],
  ['Birth certificate', 'A copy for age verification at the applicable grade.'],
  ['Previous school records', 'Report cards / transcripts from the last two years.'],
  ['Passport photographs', 'Two recent passport-size photographs of the student.'],
  ['Transfer certificate', 'Required for students moving from another school.'],
]

// Each card owns a step of the brand ramp — royal blue lightening into navy,
// then gold for the graduating years. `accent` colours the eyebrow, checks and
// base bar, `deep` is the shaded lower edge of that bar, and `wash` is the same
// hue at low alpha for the gradient rising inside the card.
const GRADES = [
  {
    tier: 'Play School', grade: 'Nursery – KG', art: BlocksArt,
    accent: '#4f86f7', deep: '#1d5fd1', wash: 'rgba(79, 134, 247, 0.16)',
    items: ['Play-based early learning', 'Phonics & motor skills', 'Safe, nurturing care'],
  },
  {
    tier: 'Primary', grade: 'Grades 1 – 5', art: BookArt,
    accent: '#1450c8', deep: '#0d3a97', wash: 'rgba(20, 80, 200, 0.14)',
    items: ['Strong foundations', 'Tuition & materials', 'Activity access'],
  },
  {
    tier: 'Middle', grade: 'Grades 6 – 8', art: ScienceArt,
    accent: '#0e2a5e', deep: '#061128', wash: 'rgba(14, 42, 94, 0.13)',
    items: ['STEM & labs', 'Clubs & sports', 'Critical thinking'],
  },
  {
    tier: 'High School', grade: 'Grades 9 – 12', art: GraduateArt,
    accent: '#b8860b', deep: '#8a6408', wash: 'rgba(184, 134, 11, 0.16)',
    items: ['Science & Commerce streams', 'Counselling & guidance', 'Career preparation'],
  },
]

// Key dates timeline. `lead` is the plain first line and `strong` the emphasised
// second; `accent` colours the badge, the card's left edge, the date and the
// chevron, `wash` tints the card and `glow` the halo behind the badge.
const DATES = [
  {
    month: 'Sep', year: '2025', icon: CalendarIcon, art: FormArt,
    accent: '#E09B12', wash: 'rgba(224, 155, 18, 0.13)', glow: 'rgba(224, 155, 18, 0.2)',
    lead: 'Applications open for the', strong: '2026–27 academic year',
  },
  {
    month: 'Nov', year: '2025', icon: BuildingIcon, art: CampusArt,
    accent: '#2E6BE6', wash: 'rgba(46, 107, 230, 0.12)', glow: 'rgba(46, 107, 230, 0.18)',
    lead: 'Campus open house &', strong: 'guided tours',
  },
  {
    month: 'Jan', year: '2026', icon: ClipboardIcon, art: AssessArt,
    accent: '#7256DC', wash: 'rgba(114, 86, 220, 0.12)', glow: 'rgba(114, 86, 220, 0.18)',
    lead: 'Entrance assessments &', strong: 'interactions begin',
  },
  {
    month: 'Mar', year: '2026', icon: EnvelopeIcon, art: LetterArt,
    accent: '#2FA765', wash: 'rgba(47, 167, 101, 0.12)', glow: 'rgba(47, 167, 101, 0.18)',
    lead: 'Offer letters released to', strong: 'selected families',
  },
  {
    month: 'Apr', year: '2026', icon: ShieldIcon, art: EnrolArt,
    accent: '#DC4C63', wash: 'rgba(220, 76, 99, 0.12)', glow: 'rgba(220, 76, 99, 0.18)',
    lead: 'Enrolment &', strong: 'registration closes',
  },
]

const FAQ = [
  ['What is the right age to apply?', 'Grade 1 admissions are open to children who turn 6 by the start of the academic year. Other grades are age-appropriate based on prior schooling.'],
  ['Is there an entrance test?', 'Yes — a friendly, age-appropriate interaction and assessment helps us understand each child’s needs and place them well.'],
  ['Do you offer scholarships?', 'Merit and need-based scholarships are available for eligible students across all grades. Speak to our admissions team for details.'],
  ['Are mid-year admissions possible?', 'Subject to seat availability, we accept mid-year transfers with a valid transfer certificate.'],
]

export default function AdmissionsPage() {
  return (
    <>
      <FutureHero />

      <Admission />

      {/* Requirements */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <SectionHead
                eyebrow="Eligibility"
                title="What You'll"
                accent="Need"
                lead="Have these ready to make your application quick and seamless."
              />
            </Reveal>
            <Reveal className="req-list" delay={1}>
              {REQUIREMENTS.map(([t, d]) => (
                <div className="req-item" key={t}>
                  <i>✓</i>
                  <div>
                    <b>{t}</b>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Classes offered */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow="Classes We Offer"
            title="Admissions Open Across"
            accent="Every Grade"
            lead="From our earliest learners to graduating seniors, Dawn welcomes students at every stage of their journey."
          />
          <div className="grid cols-4">
            {GRADES.map((g, i) => (
              <Reveal
                className="grade-card-wrap"
                delay={(i % 4) + 1}
                key={g.tier}
                style={{ '--gc-accent': g.accent, '--gc-deep': g.deep, '--gc-wash': g.wash }}
              >
                {/* TiltCard rotates the card in 3D under the cursor; the layers
                    inside sit at different translateZ depths so they float. */}
                <TiltCard className="grade-card" max={9}>
                  <div className="grade-head">
                    <span className="grade-art">{g.art}</span>
                    <div className="grade-headings">
                      <span className="tier">{g.tier}</span>
                      <h3 className="grade-range">{g.grade}</h3>
                    </div>
                  </div>

                  <ul className="grade-list">
                    {g.items.map((it) => (
                      <li key={it}>
                        <CheckMark />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Important dates */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Key Dates"
            title="Important"
            accent="Deadlines"
            lead="Stay updated with our important admission timeline."
          />
          <div className="kd-timeline">
            {DATES.map((d, i) => (
              <Reveal
                className="kd-row"
                delay={(i % 6) + 1}
                key={d.strong}
                style={{ '--kd-accent': d.accent, '--kd-wash': d.wash, '--kd-glow': d.glow }}
              >
                <span className="kd-badge" aria-hidden="true">{d.icon}</span>

                <div className="kd-card">
                  <div className="kd-when">
                    <span className="kd-month">{d.month}</span>
                    <span className="kd-year">{d.year}</span>
                  </div>
                  <span className="kd-divider" aria-hidden="true" />
                  <p className="kd-text">
                    {d.lead}
                    <b>{d.strong}</b>
                  </p>
                  <span className="kd-art" aria-hidden="true">{d.art}</span>
                  <span className="kd-go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead center eyebrow="FAQ" title="Questions," accent="Answered" />
          <Reveal>
            {FAQ.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
