import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import TiltCard from '../components/TiltCard'
import { Reveal, SectionHead } from '../components/common'

const DEPTS = [
  {
    ic: '🏫', t: 'Malakpet Campus', name: 'Malakpet', e: '+91 81076 66766',
    mail: 'malakpet@dawnhighschool.com',
    d: '16-3-993, Malakpet Rd, Opp. Officer Mess, Officers Colony, New Malakpet, Hyderabad – 500036',
    map: 'https://www.google.com/maps?q=16-3-993%20Malakpet%20Road%20New%20Malakpet%20Hyderabad%20500036&z=15&output=embed',
    reverse: true,
  },
  {
    ic: '🏛️', t: 'Purani Haveli Campus', name: 'Purani Haveli', e: '040 6671 4228',
    mail: 'puranihaveli@dawnhighschool.com',
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

      {/* Departments + campus maps */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <SectionHead center eyebrow="Departments" title="Direct" accent="Contacts" />
          </Reveal>
          <Reveal delay={1} className="dept-list">
            {DEPTS.map((d) =>
              d.map ? (
                <div className={`campus-row${d.reverse ? ' campus-row--reverse' : ''}`} key={d.t}>
                  <div className="campus-info">
                    <h3 className="campus-title">
                      <span className="campus-title-accent">{d.name}</span>
                      <span>Campus</span>
                    </h3>

                    <ul className="campus-contacts">
                      <li>
                        <span className="campus-c-ic campus-c-ic--phone" aria-hidden>📞</span>
                        <div>
                          <small>Phone Number</small>
                          <a href={`tel:${d.e.replace(/\s/g, '')}`}>{d.e}</a>
                        </div>
                      </li>
                      <li>
                        <span className="campus-c-ic campus-c-ic--mail" aria-hidden>✉️</span>
                        <div>
                          <small>Email Address</small>
                          <a href={`mailto:${d.mail}`}>{d.mail}</a>
                        </div>
                      </li>
                    </ul>

                    <div className="campus-address">
                      <h4>Address</h4>
                      <p>{d.d}</p>
                    </div>

                    <a
                      className="btn btn-gold campus-btn"
                      href={d.map.replace('&output=embed', '')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in Maps
                    </a>
                  </div>

                  <div className="campus-card-map">
                    <iframe
                      title={`${d.t} location`}
                      src={d.map}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              ) : (
                <div className="dept-card-wrap" key={d.t}>
                  <TiltCard className="card dept-card" max={16}>
                    <div className="dept-card-info">
                      <span className="dept-ic">{d.ic}</span>
                      <div className="dept-card-text">
                        <b>{d.t}</b>
                        <p>{d.d}</p>
                        <p className="dept-contact">{d.e}</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              )
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
