import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Crest from './Crest'

const LINKS = [
  ['About', '/about'],
  ['Academics', '/academics'],
  ['Campus', '/campus'],
  ['Faculty', '/faculty'],
  ['Gallery', '/gallery'],
  ['Admissions', '/admissions'],
  ['Contact', '/contact'],
]

const UTILITY = [
  ['Student Portal', '/'],
  ['Parents', '/contact'],
  ['Calendar', '/admissions'],
  ['Alumni', '/about'],
  ['Careers', '/contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        {/* Utility bar */}
        <div className="topbar">
          <div className="container topbar-inner">
            <div className="topbar-left">
              <a href="https://maps.google.com/?q=Banjara+Hills+Hyderabad" target="_blank" rel="noreferrer">
                📍 Banjara Hills, Hyderabad, Telangana
              </a>
              <span className="topbar-dot">·</span>
              <a href="tel:+914023456789">📞 +91 40 2345 6789</a>
            </div>
            <div className="topbar-right">
              {UTILITY.map(([label, to]) => (
                <Link key={label} to={to}>{label}</Link>
              ))}
              <span className="topbar-sep" />
              <form className="topbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <input type="search" placeholder="Search…" aria-label="Search the site" />
              </form>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="mainbar">
          <div className="container mainbar-inner">
            <Link to="/" className="brand" aria-label="Dawn High School — home">
              <Crest />
              <span className="brand-text">
                <b>Dawn High School</b>
                <small>Hyderabad, India · Est. 2000</small>
              </span>
            </Link>

            <nav className="nav-links" aria-label="Primary">
              {LINKS.map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="nav-cta">
              <Link to="/admissions" className="btn btn-gold">Admissions Open</Link>
              <button
                className={`nav-toggle ${open ? 'open' : ''}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <nav className="mobile-menu" aria-label="Mobile">
          {LINKS.map(([label, to], i) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              <span className="idx">0{i + 1}</span>{label}
            </Link>
          ))}
          <Link to="/admissions" className="btn btn-gold" onClick={() => setOpen(false)}>
            Admissions Open
          </Link>
        </nav>
      )}
    </>
  )
}
