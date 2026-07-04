// Admin-managed images for specific page sections (Home, About, Academics,
// Campus…). Every slot is keyed by a stable string (e.g. 'about.hero') and the
// whole map lives in a single Firestore document so a public page needs just one
// read to resolve all of its images. When a key is absent the component falls
// back to the image hard-coded in the source.
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const ref = () => doc(db, 'settings', 'pageImages')

/**
 * Fetch every admin-managed page image.
 * @returns {Promise<Record<string, {url:string, type:'image', publicId?:string}>>}
 */
export async function getPageImages() {
  if (!db) return {} // No Firebase config → pages use their built-in defaults.
  const snap = await getDoc(ref())
  return snap.exists() ? (snap.data().images || {}) : {}
}

/** Set (or replace) the image for a single slot key (admin only). */
export function setPageImage(key, { url, type = 'image', publicId = '' }) {
  return setDoc(
    ref(),
    { images: { [key]: { url, type, publicId } }, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

/**
 * Remove a slot so the page reverts to its built-in default image.
 * Firestore has no field-path delete via merge, so we read → drop → write.
 */
export async function clearPageImage(key) {
  const snap = await getDoc(ref())
  if (!snap.exists()) return
  const images = { ...(snap.data().images || {}) }
  delete images[key]
  return setDoc(ref(), { images, updatedAt: serverTimestamp() })
}
