// Firestore data layer for gallery media (images + videos). The actual file
// lives on Cloudinary; here we store only its URL + metadata so the public
// Gallery and the admin panel can list it.
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'media'

/**
 * Save an uploaded media item.
 * @param {{url:string, publicId:string, type:'image'|'video', title?:string,
 *          category?:string, format?:string, bytes?:number}} item
 * @returns {Promise<string>} new doc id
 */
export async function addMedia(item) {
  const ref = await addDoc(collection(db, COLLECTION), {
    title: '',
    category: 'Campus',
    ...item,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Fetch all media, newest first. */
export async function fetchMedia() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Delete a media item (admin only). Note: removes the Firestore record only,
 *  not the Cloudinary asset (that needs a signed/server call). */
export function deleteMedia(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
