// Provides the current admin auth state across the app. Login is Google-only
// and locked to a single authorized email — any other account is signed out.
import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

// Only this Google account may access the admin panel.
export const ALLOWED_EMAIL = 'dgionemployee03@gmail.com'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // No Firebase config yet → skip auth wiring so the public site still loads.
    if (!auth) {
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      // Reject any restored session that isn't the authorized account.
      if (u && u.email !== ALLOWED_EMAIL) {
        await signOut(auth)
        setUser(null)
      } else {
        setUser(u)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    const cred = await signInWithPopup(auth, provider)
    if (cred.user.email !== ALLOWED_EMAIL) {
      await signOut(auth)
      throw new Error('This Google account is not authorized to access the admin panel.')
    }
    return cred
  }

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout: () => signOut(auth),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
