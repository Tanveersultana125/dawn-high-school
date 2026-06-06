// Shared chrome for the admin pages: a sticky top bar with the school brand,
// tabbed navigation, the signed-in account, and a logout button. Each admin
// page renders its own content as children.
import { NavLink } from 'react-router-dom'
import Crest from './Crest'
import { useAuth } from '../context/AuthContext'

const TABS = [
  { to: '/admin', label: 'Enquiries', end: true },
  { to: '/admin/media', label: 'Media Library', end: false },
]

export default function AdminShell({ title, subtitle, actions, children }) {
  const { user, logout } = useAuth()

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand">
          <Crest className="admin-crest" />
          <div>
            <b>Dawn High School</b>
            <span>Admin</span>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Admin sections">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-account">
          {user?.email && <span className="admin-email" title={user.email}>{user.email}</span>}
          <button type="button" className="admin-logout" onClick={logout}>Log out</button>
        </div>
      </header>

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
