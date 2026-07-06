// Shared chrome for the admin pages: a fixed left sidebar with the school brand,
// icon navigation, the signed-in account and a sign-out button. Each admin page
// renders its own content as children in the main column.
import { NavLink } from 'react-router-dom'
import Crest from './Crest'
import { useAuth } from '../context/AuthContext'

// Clean line icons (stroke = currentColor).
const S = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />
)
const IC = {
  enquiries: <S><path d="M4 4h16v12H5.2L4 17.5V4z" /><path d="M8 9h8M8 12h5" /></S>,
  home: <S><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></S>,
  about: <S><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></S>,
  academics: <S><path d="m3 8 9-4 9 4-9 4-9-4z" /><path d="M7 10.5V15c0 1.4 2.4 2.5 5 2.5s5-1.1 5-2.5v-4.5" /><path d="M21 8v5" /></S>,
  campus: <S><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9.5 21v-5h5v5" /><path d="M9 11h.01M15 11h.01" /></S>,
  faculty: <S><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" /></S>,
  admissions: <S><path d="M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" /><rect x="8" y="2" width="8" height="4" rx="1" /><path d="m9 14 2 2 4-4" /></S>,
  gallery: <S><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="m5 17 4.5-4.5L13 16l3-3 3 3" /></S>,
  contact: <S><path d="M4 4h16v12H5.2L4 17.5V4z" /><path d="m4 5 8 6 8-6" /></S>,
  signout: <S><path d="M15 12H4" /><path d="m9 8-4 4 4 4" /><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" /></S>,
}

// Grouped sidebar navigation — the "Pages" group mirrors the public site menu so
// each website section has its own editor.
const NAV_GROUPS = [
  {
    label: 'Inbox',
    tabs: [{ to: '/admin', label: 'Enquiries', icon: IC.enquiries, end: true }],
  },
  {
    label: 'Website Pages',
    tabs: [
      { to: '/admin/home', label: 'Home', icon: IC.home },
      { to: '/admin/about', label: 'About', icon: IC.about },
      { to: '/admin/academics', label: 'Academics', icon: IC.academics },
      { to: '/admin/campus', label: 'Campus', icon: IC.campus },
      { to: '/admin/faculty', label: 'Faculty', icon: IC.faculty },
      { to: '/admin/admissions', label: 'Admissions', icon: IC.admissions },
      { to: '/admin/gallery', label: 'Gallery', icon: IC.gallery },
      { to: '/admin/contact', label: 'Contact', icon: IC.contact },
    ],
  },
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
          {NAV_GROUPS.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <span className="admin-nav-group-label">{group.label}</span>
              {group.tabs.map((t) => (
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
            </div>
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
