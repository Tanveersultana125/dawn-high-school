// Admin-managed text for specific page sections (headings, descriptions,
// labels…). Every string is keyed by a stable slug (e.g. 'home.awards.1.title')
// and the whole map lives in a single Firestore document so a public page needs
// just one read to resolve all of its copy. When a key is absent the component
// falls back to the text hard-coded in the source.
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const ref = () => doc(db, 'settings', 'pageText')

/**
 * Fetch every admin-managed text override.
 * @returns {Promise<Record<string, string>>}
 */
export async function getPageText() {
  if (!db) return {} // No Firebase config → pages use their built-in defaults.
  const snap = await getDoc(ref())
  return snap.exists() ? (snap.data().text || {}) : {}
}

/** Set (or replace) the text for a single slot key (admin only). */
export function setPageText(key, value) {
  return setDoc(
    ref(),
    { text: { [key]: value }, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

/**
 * Remove a slot so the page reverts to its built-in default text.
 * Firestore has no field-path delete via merge, so we read → drop → write.
 */
export async function clearPageText(key) {
  const snap = await getDoc(ref())
  if (!snap.exists()) return
  const text = { ...(snap.data().text || {}) }
  delete text[key]
  return setDoc(ref(), { text, updatedAt: serverTimestamp() })
}
