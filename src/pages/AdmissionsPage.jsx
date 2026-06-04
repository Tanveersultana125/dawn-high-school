import PageHero from '../components/PageHero'
import Admission from '../components/Admission'
import { Reveal, SectionHead } from '../components/common'

const REQUIREMENTS = [
  ['Completed application form', 'Submitted online or at the admissions office.'],
  ['Birth certificate', 'A copy for age verification at the applicable grade.'],
  ['Previous school records', 'Report cards / transcripts from the last two years.'],
  ['Passport photographs', 'Two recent passport-size photographs of the student.'],
  ['Transfer certificate', 'Required for students moving from another school.'],
]

const FEES = [
  { tier: 'Primary', price: '$3,200', per: '/ year', items: ['Grades 1–5', 'Tuition & materials', 'Activity access'] },
  { tier: 'Middle', price: '$4,100', per: '/ year', items: ['Grades 6–8', 'STEM & labs', 'Clubs & sports'] },
  { tier: 'High School', price: '$5,400', per: '/ year', items: ['Grades 9–12', 'AP & counselling', 'Career guidance'] },
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
      <PageHero
        kicker="Admissions"
        title="Your Journey Starts Here"
        subtitle="Admissions for 2026–27 are now open. Secure your child's place in four simple steps."
        crumb="Admissions"
      />

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

      {/* Fees */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Fee Structure" title="Transparent" accent="Pricing" />
          <div className="grid cols-3">
            {FEES.map((f, i) => (
              <Reveal className="card fee-card" delay={(i % 3) + 1} key={f.tier}>
                <span className="tier">{f.tier}</span>
                <div className="price">{f.price}<span> {f.per}</span></div>
                <ul>
                  {f.items.map((it) => <li key={it}>{it}</li>)}
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
