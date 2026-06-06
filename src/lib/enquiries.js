// Firestore data layer for form submissions (contact + admission enquiries).
// All submissions live in a single "enquiries" collection, tagged by `type`.
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'enquiries'

/**
 * Save a form submission to Firestore.
 * @param {object} data  the form fields (name, email, message, etc.)
 * @param {string} type  'contact' | 'admission'
 * @returns {Promise<string>} the new document id
 */
export async function submitEnquiry(data, type = 'contact') {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    type,
    status: 'new',
    createdAt: serverTimestamp(),
  })
  return ref.id
}

/** Fetch all enquiries, newest first (admin only). */
export async function fetchEnquiries() {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Mark an enquiry read/handled (admin only). */
export function setEnquiryStatus(id, status) {
  return updateDoc(doc(db, COLLECTION, id), { status })
}

/** Remove an enquiry (admin only). */
export function deleteEnquiry(id) {
  return deleteDoc(doc(db, COLLECTION, id))
}
