import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import { Reveal, SectionHead } from '../components/common'

const HOURS = [
  ['Monday – Friday', '8:00 AM – 4:00 PM'],
  ['Saturday', '9:00 AM – 1:00 PM'],
  ['Sunday & Holidays', 'Closed'],
]

const DEPTS = [
  {
    ic: '🏫', t: 'Malakpet Campus', e: '+91 81076 66766',
    d: '16-3-993, Malakpet Rd, Opp. Officer Mess, Officers Colony, New Malakpet, Hyderabad – 500036',
    map: 'https://www.google.com/maps?q=16-3-993%20Malakpet%20Road%20New%20Malakpet%20Hyderabad%20500036&z=15&output=embed',
  },
  {
    ic: '🏛️', t: 'Purani Haveli Campus', e: '040 6671 4228',
    d: 'Mir Chowk Rd, Opp. ACP, Purani Haveli, Pathar Gatti, Hyderabad – 500002',
    map: 'https://www.google.com/maps?q=Purani%20Haveli%20Pathar%20Gatti%20Hyderabad%20500002&z=15&output=embed',
  },
  { ic: '💬', t: 'General Enquiries', d: 'info@dawnhighschool.com · www.dawnhighschool.com', e: 'admin@dawnhighschool.com' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="contact"
        photo="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80"
      />

      <Contact />

      {/* Office hours */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead center eyebrow="Office Hours" title="When to" accent="Reach Us" />
            <div className="date-list date-list--row">
              {HOURS.map(([day, time]) => (
                <div className="date-row" key={day}>
                  <span className="d-date">{day}</span>
                  <span className="d-label">{time}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Departments + campus maps */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead center eyebrow="Departments" title="Direct" accent="Contacts" />
          </Reveal>
          <Reveal delay={1} className="dept-list">
            {DEPTS.map((d) => (
              <div className={`card dept-card${d.map ? ' dept-card--map' : ''}`} key={d.t}>
                <div className="dept-card-info">
                  <span className="dept-ic">{d.ic}</span>
                  <div className="dept-card-text">
                    <b>{d.t}</b>
                    <p>{d.d}</p>
                    <p className="dept-contact">{d.e}</p>
                  </div>
                </div>
                {d.map && (
                  <div className="dept-map">
                    <iframe
                      title={`${d.t} location`}
                      src={d.map}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
