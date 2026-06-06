import { useState } from 'react'
import { Reveal, SectionHead } from './common'
import { submitEnquiry } from '../lib/enquiries'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'

const INFO = [
  { icon: '📍', title: 'Visit Us', text: '16-3-993, Malakpet Rd, Opposite Officer Mess, Officers Colony, New Malakpet, Hyderabad – 500036, Telangana' },
  { icon: '📞', title: 'Call Us', text: '+91 81076 66766 (Malakpet) · 040 6671 4228 (Purani Haveli)' },
  { icon: '✉️', title: 'Email Us', text: 'info@dawnhighschool.com' },
]

const SOCIALS = ['Fb', 'In', 'X', 'Yt']

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)

    const form = e.target
    const fd = new FormData(form)
    const file = fd.get('attachment')

    try {
      // Optional file → Cloudinary first, store the resulting URL with the doc.
      let fileUrl = ''
      if (file && file.size > 0 && isCloudinaryConfigured) {
        const up = await uploadToCloudinary(file)
        fileUrl = up.url
      }

      await submitEnquiry(
        {
          name: fd.get('name')?.toString().trim() || '',
          email: fd.get('email')?.toString().trim() || '',
          phone: fd.get('phone')?.toString().trim() || '',
          grade: fd.get('grade')?.toString() || '',
          message: fd.get('message')?.toString().trim() || '',
          fileUrl,
        },
        'contact'
      )

      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
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

            <div className="contact-map">
              <iframe
                title="Dawn Model High School location"
                src="https://www.google.com/maps?q=17.36875,78.501016&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
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
              {isCloudinaryConfigured && (
                <div className="field">
                  <label htmlFor="attachment">Attachment (optional)</label>
                  <input id="attachment" name="attachment" type="file" accept="image/*,.pdf" />
                </div>
              )}
              <button type="submit" className="btn btn-navy" disabled={busy}>
                {busy ? 'Sending…' : 'Send Message'}
              </button>
              {sent && (
                <div className="form-success" role="status">
                  ✓ Thank you! Your message has been received — we’ll be in touch shortly.
                </div>
              )}
              {error && (
                <div className="form-error" role="alert">⚠ {error}</div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
