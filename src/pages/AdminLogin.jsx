import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isFirebaseConfigured } from '../lib/firebase'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err?.code === 'auth/invalid-credential'
          ? 'Incorrect email or password.'
          : err?.message || 'Login failed.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-auth">
      <form className="admin-auth-card" onSubmit={onSubmit}>
        <h1>Admin Login</h1>
        <p className="admin-auth-sub">Dawn High School — submissions dashboard</p>

        {!isFirebaseConfigured && (
          <div className="admin-warn">
            Firebase keys missing. Fill <code>.env</code> and restart the dev server.
          </div>
        )}

        <label htmlFor="admin-email">Email</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@dawnhighschool.com"
          required
          autoComplete="username"
        />

        <label htmlFor="admin-pass">Password</label>
        <input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        {error && <div className="admin-error">{error}</div>}

        <button type="submit" className="btn btn-navy" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
