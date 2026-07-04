import { useEffect, useRef, useState } from 'react'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'
import { getPageImages, setPageImage, clearPageImage } from '../lib/pageImages'
import { PAGE_IMAGE_GROUPS } from '../lib/pageImageSlots'
import SmartImage from './SmartImage'

/**
 * Admin panel section: replace the images used across the public pages
 * (Home, About, Academics, Campus). Each slot uploads to Cloudinary and stores
 * the URL in Firestore; the matching page component picks it up automatically.
 */
export default function PageImagesManager() {
  const [images, setImages] = useState({}) // { [key]: {url,...} }
  const [busyKey, setBusyKey] = useState('')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const pendingKey = useRef('')

  useEffect(() => {
    getPageImages().then(setImages).catch(() => {})
  }, [])

  const openPicker = (key) => {
    pendingKey.current = key
    inputRef.current?.click()
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    const key = pendingKey.current
    if (inputRef.current) inputRef.current.value = ''
    if (!file || !key) return

    setBusyKey(key)
    setProgress(0)
    setError('')
    try {
      const up = await uploadToCloudinary(file, setProgress)
      await setPageImage(key, { url: up.url, type: 'image', publicId: up.publicId })
      setImages((m) => ({ ...m, [key]: { url: up.url, type: 'image', publicId: up.publicId } }))
    } catch (err) {
      setError(err?.message || 'Upload failed.')
    } finally {
      setBusyKey('')
    }
  }

  const onReset = async (key) => {
    if (!window.confirm('Reset this image back to the site default?')) return
    try {
      await clearPageImage(key)
      setImages((m) => {
        const next = { ...m }
        delete next[key]
        return next
      })
    } catch (err) {
      setError(err?.message || 'Could not reset.')
    }
  }

  return (
    <section className="page-images">
      <div className="page-images-head">
        <h2>Page Images</h2>
        <p>Replace the photos shown on the Home, About, Academics and Campus pages. Uploads appear on the live site instantly.</p>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {/* one shared hidden input, reused for whichever slot was clicked */}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />

      {PAGE_IMAGE_GROUPS.map((group) => (
        <div className="pi-group" key={group.page}>
          <h3 className="pi-group-title">{group.page} page</h3>
          <div className="pi-grid">
            {group.slots.map((slot) => {
              const managed = images[slot.key]?.url
              const preview = managed || slot.def
              const busy = busyKey === slot.key
              return (
                <div className={`pi-card ${managed ? 'is-custom' : ''}`} key={slot.key}>
                  <div className="pi-thumb">
                    {preview ? (
                      <SmartImage src={preview} alt={slot.label} loading="lazy" />
                    ) : (
                      <span className="pi-thumb-empty">Animated backdrop (no image)</span>
                    )}
                    {managed && <span className="pi-badge">Custom</span>}
                  </div>
                  <div className="pi-info">
                    <b>{slot.label}</b>
                    <div className="pi-actions">
                      <button
                        type="button"
                        className="btn btn-gold btn-sm"
                        disabled={!isCloudinaryConfigured || busy}
                        onClick={() => openPicker(slot.key)}
                      >
                        {busy ? `Uploading… ${progress}%` : managed ? 'Replace' : 'Upload'}
                      </button>
                      {managed && (
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onReset(slot.key)}>
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </section>
  )
}
