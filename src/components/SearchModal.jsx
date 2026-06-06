import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Lightweight client-side search across the site's pages. Each entry carries
// extra keywords so related terms (e.g. "fees" → Admissions) still match.
const SEARCH_INDEX = [
  { title: 'Home', path: '/', keywords: 'home dawn high school welcome hero campus film' },
  { title: 'About Us', path: '/about', keywords: 'about history mission vision values leadership principal story' },
  { title: 'Academics', path: '/academics', keywords: 'academics curriculum subjects courses programs cbse learning classes results' },
  { title: 'Campus', path: '/campus', keywords: 'campus facilities library labs sports infrastructure ground tour' },
  { title: 'Faculty', path: '/faculty', keywords: 'faculty teachers staff educators professors mentors' },
  { title: 'Gallery', path: '/gallery', keywords: 'gallery photos images pictures events campus life moments' },
  { title: 'Admissions', path: '/admissions', keywords: 'admissions apply enroll application fees admission form join process' },
  { title: 'Contact', path: '/contact', keywords: 'contact address phone email location map reach inquiry visit' },
]

// Quick links shown before the visitor types anything.
const POPULAR = [
  { label: 'Admissions', path: '/admissions' },
  { label: 'Academics', path: '/academics' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Campus Tour', path: '/campus' },
  { label: 'Contact Us', path: '/contact' },
]

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
)

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Reset + focus the field each time it opens, and lock background scroll.
  useEffect(() => {
    if (!open) return
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 40)
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const q = query.trim().toLowerCase()
  const results = q
    ? SEARCH_INDEX.filter(
        (it) => it.title.toLowerCase().includes(q) || it.keywords.includes(q)
      )
    : []

  const go = (path) => {
    onClose()
    navigate(path)
    window.scrollTo({ top: 0 })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (results[0]) go(results[0].path)
  }

  return (
    <div
      className="search-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      onClick={onClose}
    >
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-bar-row">
          <span className="search-label">Search</span>
          <form className="search-field" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              aria-label="Search the site"
            />
            <button type="submit" className="search-go" aria-label="Search">
              <SearchIcon />
            </button>
          </form>
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {q ? (
          <ul className="search-results">
            {results.length === 0 && (
              <li className="search-empty">No results for “{query}”</li>
            )}
            {results.map((it) => (
              <li key={it.path}>
                <button type="button" onClick={() => go(it.path)}>
                  <span className="sr-title">{it.title}</span>
                  <span className="sr-path">{it.path}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-popular">
            <h3>Popular Searches</h3>
            <div className="popular-grid">
              {POPULAR.map((p) => (
                <button type="button" key={p.path + p.label} onClick={() => go(p.path)}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
