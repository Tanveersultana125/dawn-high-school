// Central Firebase setup. Reads config from Vite env vars (VITE_FIREBASE_*).
// If keys are missing we log a clear warning instead of crashing, so the site
// still renders during development before the .env is filled in.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// True only when every required key is present and non-empty.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
)

if (!isFirebaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] Missing config. Copy .env.example → .env and fill the VITE_FIREBASE_* keys, then restart the dev server.'
  )
}

// Only initialize when configured. Calling initializeApp/getAuth with empty
// values throws (auth/invalid-api-key) and crashes the whole app, so we guard
// it and export nulls until a real .env is provided.
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null

export const db = app ? getFirestore(app) : null
export const auth = app ? getAuth(app) : null
export default app
