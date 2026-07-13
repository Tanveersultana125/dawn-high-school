import { useState } from 'react'
import { Link } from 'react-router-dom'
import Crest from './Crest'

const QUICK = [
  ['About Us', '/about'],
  ['Academics', '/academics'],
  ['Campus Life', '/campus'],
  ['Faculty', '/faculty'],
  ['Gallery', '/gallery'],
]

const RESOURCES = [
  ['Admissions', '/admissions'],
  ['News & Events', '/contact'],
  ['Achievements', '/admissions'],
  ['Contact', '/contact'],
  ['Careers', '/contact'],
]

const ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.95 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.44 1.27 4.89L2 22l5.25-1.38A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.13c-1.55 0-3.06-.42-4.38-1.2l-.31-.19-3.12.82.83-3.04-.2-.31A8.12 8.12 0 0 1 3.87 12 8.13 8.13 0 1 1 12 20.13z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
}

const SOCIALS = [
  ['Facebook', 'facebook', 'https://www.facebook.com/DawnHighSchoolOfficial'],
  ['Instagram', 'instagram', 'https://www.instagram.com/dawnhighschoolofficial'],
  ['WhatsApp', 'whatsapp', 'https://wa.me/918107666766'],
  ['Location', 'location', 'https://www.google.com/maps/search/?api=1&query=Dawn+High+School+Malakpet+Hyderabad'],
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <Crest />
              <span className="brand-text">
                <b>Dawn High School</b>
                <small>New Malakpet, Hyderabad</small>
              </span>
            </Link>
            <p className="footer-about">
              Shaping future leaders through excellence in education since 2000.
              A premier institution committed to academic distinction, character,
              and innovation.
            </p>
            <div className="footer-socials">
              {SOCIALS.map(([name, key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`soc soc--${key}`}
                  aria-label={`Dawn High School on ${name}`}
                >
                  {ICONS[key]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5>Explore</h5>
            <ul className="footer-links">
              {QUICK.map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Resources</h5>
            <ul className="footer-links">
              {RESOURCES.map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-newsletter">
            <h5>Stay Updated</h5>
            <p>Subscribe to our newsletter for the latest news, events, and admissions updates.</p>
            <form onSubmit={onSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                required
                value={email}
                /* strip any spaces as they type so the browser doesn't reject it */
                onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
              />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
            {subscribed && <p className="footer-sub-ok">✓ Thanks for subscribing!</p>}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dawn High School. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 22 }}>
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Use</a>
            <a href="#home">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
