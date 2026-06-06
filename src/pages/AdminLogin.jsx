import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, ALLOWED_EMAIL } from '../context/AuthContext'
import { isFirebaseConfigured } from '../lib/firebase'

const GoogleMark = () => (
  <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.6l6.3 5.2C41.4 35.6 44 30.2 44 24c0-1.3-.1-2.3-.4-3.5z" />
  </svg>
)

export default function AdminLogin() {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onLogin = async () => {
    setError('')
    setBusy(true)
    try {
      await loginWithGoogle()
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err?.code === 'auth/popup-closed-by-user'
          ? 'Sign-in cancelled.'
          : err?.message || 'Login failed.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-auth-card">
        <h1>Admin Login</h1>
        <p className="admin-auth-sub">Dawn High School — submissions &amp; media</p>

        {!isFirebaseConfigured && (
          <div className="admin-warn">
            Firebase keys missing. Fill <code>.env</code> and restart the dev server.
          </div>
        )}

        <button type="button" className="google-btn" onClick={onLogin} disabled={busy}>
          <GoogleMark />
          {busy ? 'Signing in…' : 'Sign in with Google'}
        </button>

        {error && <div className="admin-error">{error}</div>}

        <p className="admin-auth-note">
          Only <b>{ALLOWED_EMAIL}</b> can access the admin panel.
        </p>
      </div>
    </div>
  )
}
