// Site-wide settings stored as single, well-known Firestore documents under the
// "settings" collection. Currently just the homepage hero media (video or image).
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

const heroRef = () => doc(db, 'settings', 'hero')

/** @returns {Promise<{url:string, type:'image'|'video', publicId?:string}|null>} */
export async function getHeroMedia() {
  const snap = await getDoc(heroRef())
  return snap.exists() ? snap.data() : null
}

/** Replace the homepage hero media (admin only). */
export function setHeroMedia({ url, type, publicId = '' }) {
  return setDoc(heroRef(), { url, type, publicId, updatedAt: serverTimestamp() })
}
