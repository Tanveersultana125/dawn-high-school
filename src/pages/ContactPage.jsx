import { useState } from 'react'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import CurvedInput from '../components/CurvedInput'
import { Reveal, SectionHead } from '../components/common'
import { usePageImage } from '../context/PageImagesContext'
import { submitEnquiry } from '../lib/enquiries'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  // The curved bar on the General Enquiries card is a one-field shortcut into
  // the same Firestore "enquiries" collection the full contact form writes to.
  const sendEnquiry = async (address) => {
    const clean = address.trim()
    if (!EMAIL_RE.test(clean)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry(
        {
          name: '',
          email: clean,
          phone: '',
          grade: '',
          message: 'General enquiry — sent from the Direct Contacts card.',
        },
        'contact'
      )
      setStatus('sent')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  const heroPhoto = usePageImage(
    'contact.hero',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80'
  )
  return (
    <>
      <PageHero variant="contact" photo={heroPhoto} />

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
                /* Not a TiltCard: it holds a live form, and a card that swings
                   under the cursor makes the field hard to aim at (it also
                   throws off the SVG caret's screen-space maths). */
                <div className="dept-card-wrap" key={d.t}>
                  <div className="card dept-card dept-card--form">
                    <div className="dept-card-info">
                      <span className="dept-ic">{d.ic}</span>
                      <div className="dept-card-text">
                        <b>{d.t}</b>
                        <p>{d.d}</p>
                        <p className="dept-contact">{d.e}</p>
                      </div>
                    </div>

                    {/* The bar spans the whole card, so the arc reads across the
                        full box rather than as a small detail in one corner. */}
                    <div className="dept-card-form">
                      <CurvedInput
                        width="100%"
                        bend={26}
                        height={72}
                        fontSize={16}
                        cornerRadius={26}
                        shadowSize="md"
                        theme="light"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        buttonText={status === 'sending' ? 'Sending…' : 'Send'}
                        ariaLabel="Email address for a general enquiry"
                        value={email}
                        onChange={(v) => {
                          setEmail(v)
                          if (status !== 'idle') setStatus('idle')
                        }}
                        onSubmit={sendEnquiry}
                        backgroundColor="#ffffff"
                        textColor="#0a1f44"
                        placeholderColor="#9aa0b6"
                        borderColor="rgba(16, 51, 116, 0.24)"
                        buttonColor="#1450c8"
                        buttonTextColor="#ffffff"
                        iconColor="#1450c8"
                        shadowColor="#0a1f44"
                      />
                      <p
                        className={`dept-card-note ${status === 'error' ? 'dept-card-note--error' : ''}`}
                        role="status"
                      >
                        {status === 'sent'
                          ? 'Thanks — we’ll reply to that address shortly.'
                          : status === 'error'
                            ? error
                            : 'Drop your email and we’ll get back to you.'}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
