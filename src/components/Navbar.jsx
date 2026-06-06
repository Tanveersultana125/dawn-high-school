import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Crest from './Crest'
import SearchModal from './SearchModal'

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
  const [searchOpen, setSearchOpen] = useState(false)

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
        <div className="container header-inner">
          {/* Brand on the left, spanning both rows */}
          <Link to="/" className="brand" aria-label="Dawn High School — home">
            <Crest />
            <span className="brand-text">
              <b>Dawn High School</b>
            </span>
          </Link>

          {/* Right column: utility row on top, main nav below */}
          <div className="header-right">
            <div className="utility-row">
              {UTILITY.map(([label, to]) => (
                <Link key={label} to={to} className="utility-link">{label}</Link>
              ))}
              <button
                type="button"
                className="utility-search"
                aria-label="Search the site"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                </svg>
                <span>Search</span>
              </button>
            </div>

            <div className="nav-row">
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
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
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
            Apply Now
          </Link>
        </nav>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
