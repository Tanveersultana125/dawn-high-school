import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  fetchEnquiries,
  setEnquiryStatus,
  deleteEnquiry,
} from '../lib/enquiries'

const fmt = (ts) => {
  // Firestore Timestamp → readable date; tolerate the brief null before the
  // server timestamp resolves.
  if (!ts?.toDate) return '—'
  return ts.toDate().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setRows(await fetchEnquiries())
    } catch (err) {
      setError(err?.message || 'Could not load enquiries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onToggle = async (row) => {
    const next = row.status === 'done' ? 'new' : 'done'
    await setEnquiryStatus(row.id, next)
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: next } : r)))
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return
    await deleteEnquiry(id)
    setRows((rs) => rs.filter((r) => r.id !== id))
  }

  const shown = rows.filter((r) => filter === 'all' || r.type === filter)

  return (
    <div className="admin-dash">
      <header className="admin-dash-head">
        <div>
          <h1>Enquiries</h1>
          <p>{user?.email}</p>
        </div>
        <div className="admin-dash-actions">
          <Link className="btn btn-ghost" to="/admin/media">Media Library</Link>
          <button className="btn btn-ghost" onClick={load}>Refresh</button>
          <button className="btn btn-navy" onClick={logout}>Log out</button>
        </div>
      </header>

      <div className="admin-filters">
        {['all', 'contact', 'admission'].map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : undefined}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span className="admin-count">{shown.length} total</span>
      </div>

      {loading && <p className="admin-muted">Loading enquiries…</p>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && shown.length === 0 && (
        <p className="admin-muted">No enquiries yet.</p>
      )}

      <div className="admin-cards">
        {shown.map((r) => (
          <article key={r.id} className={`admin-card ${r.status === 'done' ? 'is-done' : ''}`}>
            <div className="admin-card-top">
              <span className={`tag tag-${r.type}`}>{r.type}</span>
              <time>{fmt(r.createdAt)}</time>
            </div>
            <h3>{r.name || 'Unknown'}</h3>
            <div className="admin-card-meta">
              {r.email && <a href={`mailto:${r.email}`}>{r.email}</a>}
              {r.phone && <span>{r.phone}</span>}
              {r.grade && <span>Grade: {r.grade}</span>}
            </div>
            {r.message && <p className="admin-card-msg">{r.message}</p>}
            {r.fileUrl && (
              <a className="admin-card-file" href={r.fileUrl} target="_blank" rel="noreferrer">
                📎 View attachment
              </a>
            )}
            <div className="admin-card-foot">
              <button onClick={() => onToggle(r)}>
                {r.status === 'done' ? '↺ Mark new' : '✓ Mark done'}
              </button>
              <button className="danger" onClick={() => onDelete(r.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
