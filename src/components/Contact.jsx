import { useState } from 'react'
import { Reveal, SectionHead } from './common'
import { submitEnquiry } from '../lib/enquiries'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'

const INFO = [
  { key: 'pin', title: 'Visit Us', text: '16-3-993, Malakpet Rd, Opposite Officer Mess, Officers Colony, New Malakpet, Hyderabad – 500036, Telangana' },
  { key: 'phone', title: 'Call Us', text: '+91 81076 66766 (Malakpet) · 040 6671 4228 (Purani Haveli)' },
  { key: 'mail', title: 'Email Us', text: 'info@dawnhighschool.com' },
  { key: 'clock', title: 'Office Hours', lines: ['Mon – Fri · 8:00 AM – 4:00 PM', 'Saturday · 9:00 AM – 1:00 PM', 'Sun & Holidays · Closed'] },
]

// Clean line icons (stroke = currentColor) for the contact cards.
const ICONS = {
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
}

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
        <h2 className="contact-page-title">Contact</h2>

        {/* Info cards — white, icon-on-top, in a row (above the heading) */}
        <Reveal className="contact-cards">
          {INFO.map((info) => (
            <div className="contact-card" key={info.title}>
              <span className="contact-card-ic">{ICONS[info.key]}</span>
              <b>{info.title}</b>
              {info.lines
                ? info.lines.map((l) => <p key={l}>{l}</p>)
                : <p>{info.text}</p>}
            </div>
          ))}
        </Reveal>

        <SectionHead
          center
          eyebrow="Get in Touch"
          title="We'd Love to"
          accent="Hear From You"
          lead="Have a question or ready to apply? Reach out and our admissions team will respond within one business day."
        />

        <div className="contact-layout">
          <Reveal className="contact-collage">
            <img src="/contact-collage-v2.png" alt="Dawn students learning and achieving together" loading="lazy" />
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
