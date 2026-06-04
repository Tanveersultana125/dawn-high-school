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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <Crest />
              <span className="brand-text">
                <b>Dawn Model High School</b>
                <small>Excellence in Education</small>
              </span>
            </Link>
            <p className="footer-about">
              Shaping future leaders through excellence in education since 2000.
              A premier institution committed to academic distinction, character,
              and innovation.
            </p>
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
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" aria-label="Email address" required />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dawn Model High School. All rights reserved.</span>
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
