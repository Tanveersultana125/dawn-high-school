import FutureHero from '../components/FutureHero'
import Admission from '../components/Admission'
import { Reveal, SectionHead } from '../components/common'
import { BlocksArt, BookArt, ScienceArt, GraduateArt, CheckMark } from '../components/gradeArt'

const REQUIREMENTS = [
  ['Completed application form', 'Submitted online or at the admissions office.'],
  ['Birth certificate', 'A copy for age verification at the applicable grade.'],
  ['Previous school records', 'Report cards / transcripts from the last two years.'],
  ['Passport photographs', 'Two recent passport-size photographs of the student.'],
  ['Transfer certificate', 'Required for students moving from another school.'],
]

// `accent` drives the card's number, eyebrow, checks and base bar; `wash` is the
// same hue at low alpha for the soft gradient inside the card's lower half.
const GRADES = [
  {
    tier: 'Play School', grade: 'Nursery – KG', art: BlocksArt,
    accent: '#6C5CE7', wash: 'rgba(108, 92, 231, 0.14)',
    items: ['Play-based early learning', 'Phonics & motor skills', 'Safe, nurturing care'],
  },
  {
    tier: 'Primary', grade: 'Grades 1 – 5', art: BookArt,
    accent: '#12A594', wash: 'rgba(18, 165, 148, 0.14)',
    items: ['Strong foundations', 'Tuition & materials', 'Activity access'],
  },
  {
    tier: 'Middle', grade: 'Grades 6 – 8', art: ScienceArt,
    accent: '#1450c8', wash: 'rgba(20, 80, 200, 0.13)',
    items: ['STEM & labs', 'Clubs & sports', 'Critical thinking'],
  },
  {
    tier: 'High School', grade: 'Grades 9 – 12', art: GraduateArt,
    accent: '#C97A0B', wash: 'rgba(201, 122, 11, 0.15)',
    items: ['Science & Commerce streams', 'Counselling & guidance', 'Career preparation'],
  },
]

const DATES = [
  ['Sep 2025', 'Applications open for the 2026–27 academic year'],
  ['Nov 2025', 'Campus open house & guided tours'],
  ['Jan 2026', 'Entrance assessments & interactions begin'],
  ['Mar 2026', 'Offer letters released to selected families'],
  ['Apr 2026', 'Enrolment & registration closes'],
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
                className="grade-card"
                delay={(i % 4) + 1}
                key={g.tier}
                style={{ '--gc-accent': g.accent, '--gc-wash': g.wash }}
              >
                <span className="grade-num" aria-hidden="true">{`0${i + 1}`}</span>

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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Important dates */}
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Key Dates" title="Important" accent="Deadlines" />
          <Reveal className="date-list">
            {DATES.map(([d, label]) => (
              <div className="date-row" key={label}>
                <span className="d-date">{d}</span>
                <span className="d-label">{label}</span>
              </div>
            ))}
          </Reveal>
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
