// Shared chrome for the admin pages: a fixed left sidebar with the school brand,
// icon navigation, the signed-in account and a sign-out button. Each admin page
// renders its own content as children in the main column.
import { NavLink } from 'react-router-dom'
import Crest from './Crest'
import { useAuth } from '../context/AuthContext'

// Clean line icons (stroke = currentColor).
const IC = {
  enquiries: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16v12H5.2L4 17.5V4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m5 17 4.5-4.5L13 16l3-3 3 3" />
    </svg>
  ),
  signout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 12H4" />
      <path d="m9 8-4 4 4 4" />
      <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
    </svg>
  ),
}

const TABS = [
  { to: '/admin', label: 'Enquiries', icon: IC.enquiries, end: true },
  { to: '/admin/media', label: 'Media Library', icon: IC.media, end: false },
]

export default function AdminShell({ title, subtitle, actions, children }) {
  const { user, logout } = useAuth()
  const initial = (user?.email?.[0] || 'A').toUpperCase()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Crest className="admin-crest" />
          <div>
            <b>Dawn High School</b>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin sections">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
            >
              <span className="admin-nav-ic">{t.icon}</span>
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <div className="admin-user">
            <span className="admin-avatar">{initial}</span>
            <div className="admin-user-info">
              <b>Administrator</b>
              {user?.email && <span title={user.email}>{user.email}</span>}
            </div>
          </div>
          <button type="button" className="admin-signout" onClick={logout}>
            <span className="admin-nav-ic">{IC.signout}</span>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-pagehead">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="admin-pagehead-actions">{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  )
}
