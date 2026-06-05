import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import { Reveal, SectionHead } from '../components/common'

const HOURS = [
  ['Monday – Friday', '8:00 AM – 4:00 PM'],
  ['Saturday', '9:00 AM – 1:00 PM'],
  ['Sunday & Holidays', 'Closed'],
]

const DEPTS = [
  { ic: '🎓', t: 'Admissions Office', d: 'admissions@dawnhighschool.edu.in', e: '+91 40 2345 6789' },
  { ic: '💬', t: 'General Enquiries', d: 'info@dawnhighschool.edu.in', e: '+91 40 2345 6700' },
  { ic: '🧾', t: 'Accounts & Fees', d: 'accounts@dawnhighschool.edu.in', e: '+91 40 2345 6710' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Get in Touch"
        title="We'd Love to Hear From You"
        subtitle="Have a question or ready to apply? Our team responds within one business day."
        crumb="Contact"
      />

      <Contact />

      {/* Office hours + departments */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <Reveal>
              <SectionHead eyebrow="Office Hours" title="When to" accent="Reach Us" />
              <div className="date-list">
                {HOURS.map(([day, time]) => (
                  <div className="date-row" key={day}>
                    <span className="d-date">{day}</span>
                    <span className="d-label">{time}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1}>
              <SectionHead eyebrow="Departments" title="Direct" accent="Contacts" />
              <div className="grid" style={{ gap: 16 }}>
                {DEPTS.map((d) => (
                  <div className="card" key={d.t} style={{ padding: 22 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <span style={{ fontSize: '1.6rem' }}>{d.ic}</span>
                      <div style={{ minWidth: 0 }}>
                        <b style={{ color: 'var(--navy-800)', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{d.t}</b>
                        <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem', overflowWrap: 'anywhere' }}>{d.d}</p>
                        <p style={{ color: 'var(--royal-600)', fontSize: '0.88rem', fontWeight: 600 }}>{d.e}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
