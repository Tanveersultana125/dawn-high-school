// Gate for admin-only routes. Redirects to /admin/login when not signed in.
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="admin-loading">Loading…</div>
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}
