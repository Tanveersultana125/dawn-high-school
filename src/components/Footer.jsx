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

const SOCIALS = [
  ['Facebook', 'Fb', 'https://www.facebook.com/DawnHighSchoolOfficial'],
  ['Instagram', 'In', 'https://www.instagram.com/dawnhighschoolofficial'],
  ['WhatsApp', 'Wa', 'https://wa.me/918107666766'],
  ['Website', 'Web', 'https://dawnhighschool.com'],
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
              {SOCIALS.map(([name, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Dawn High School on ${name}`}
                >
                  {label}
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
