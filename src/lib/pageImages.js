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
    { images: { [key]: { url, type, publicId, hidden: false } }, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

/**
 * Save the focal position (CSS object-position, e.g. "50% 30%") for a slot so the
 * admin can control how a `cover`-cropped image is framed. Merges into the entry,
 * preserving the url / hidden flags.
 */
export function setPageImagePosition(key, pos) {
  return setDoc(
    ref(),
    { images: { [key]: { pos } }, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

/**
 * Hide a slot so nothing shows on the public site (a "delete"), even if the page
 * has a built-in default. Stored as a marker the resolver honours; `clearPageImage`
 * removes it and brings the default back.
 */
export function hidePageImage(key) {
  return setDoc(
    ref(),
    { images: { [key]: { url: '', type: 'image', publicId: '', hidden: true } }, updatedAt: serverTimestamp() },
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
