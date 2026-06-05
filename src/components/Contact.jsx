import { useState } from 'react'
import { Reveal, SectionHead } from './common'

const INFO = [
  { icon: '📍', title: 'Visit Us', text: '8-2-120, Road No. 2, Banjara Hills, Hyderabad, Telangana 500034' },
  { icon: '📞', title: 'Call Us', text: '+91 40 2345 6789 · Mon–Sat, 8am–4pm' },
  { icon: '✉️', title: 'Email Us', text: 'admissions@dawnhighschool.edu.in' },
]

const SOCIALS = ['Fb', 'In', 'X', 'Yt']

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section className="section section-dark" id="contact">
      <div className="container">
        <SectionHead
          center
          eyebrow="Get in Touch"
          title="We'd Love to"
          accent="Hear From You"
          lead="Have a question or ready to apply? Reach out and our admissions team will respond within one business day."
        />

        <div className="contact-layout">
          <Reveal className="contact-aside">
            {INFO.map((info) => (
              <div className="contact-info-card" key={info.title}>
                <span className="ic">{info.icon}</span>
                <div>
                  <b>{info.title}</b>
                  <p>{info.text}</p>
                </div>
              </div>
            ))}

            <div className="contact-socials">
              {SOCIALS.map((s) => (
                <a href="#contact" key={s} aria-label={`Dawn on ${s}`}>{s}</a>
              ))}
            </div>

            <div className="contact-map" aria-label="Campus location map">
              <div className="map-grid" />
              <div className="pin-pulse" />
              <div className="pin">📍</div>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={2}>
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="jane@email.com" required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 90000 00000" />
                </div>
                <div className="field">
                  <label htmlFor="grade">Grade of Interest</label>
                  <select id="grade" name="grade" defaultValue="">
                    <option value="" disabled>Select a grade</option>
                    <option>Primary (1–5)</option>
                    <option>Middle (6–8)</option>
                    <option>High School (9–12)</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" placeholder="Tell us how we can help…" required />
              </div>
              <button type="submit" className="btn btn-navy">Send Message</button>
              {sent && (
                <div className="form-success" role="status">
                  ✓ Thank you! Your message has been received — we’ll be in touch shortly.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
