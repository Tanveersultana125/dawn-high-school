import { useEffect, useRef, useState } from 'react'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'
import { getPageImages, setPageImage, clearPageImage, hidePageImage } from '../lib/pageImages'
import { PAGE_IMAGE_GROUPS } from '../lib/pageImageSlots'
import SmartImage from './SmartImage'

/**
 * Admin panel section: replace the images used across the public pages.
 * Each slot uploads to Cloudinary and stores the URL in Firestore; the matching
 * page component picks it up automatically.
 *
 * Pass `page` (e.g. "About") to show only that one page's slots — used by the
 * per-page editors in the admin sidebar. With no `page` prop it shows every
 * group (legacy all-in-one view).
 */
export default function PageImagesManager({ page }) {
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
      setImages((m) => ({ ...m, [key]: { url: up.url, type: 'image', publicId: up.publicId, hidden: false } }))
    } catch (err) {
      setError(err?.message || 'Upload failed.')
    } finally {
      setBusyKey('')
    }
  }

  // Delete = remove this image from the public site (hide it).
  const onDelete = async (key) => {
    if (!window.confirm('Remove this image from the website? You can restore the default later.')) return
    try {
      await hidePageImage(key)
      setImages((m) => ({ ...m, [key]: { url: '', type: 'image', publicId: '', hidden: true } }))
    } catch (err) {
      setError(err?.message || 'Could not remove the image.')
    }
  }

  // Restore = drop any custom/hidden override so the built-in default returns.
  const onRestore = async (key) => {
    try {
      await clearPageImage(key)
      setImages((m) => {
        const next = { ...m }
        delete next[key]
        return next
      })
    } catch (err) {
      setError(err?.message || 'Could not restore the default.')
    }
  }

  // When a single page is requested, render just that group; otherwise all.
  const groups = page
    ? PAGE_IMAGE_GROUPS.filter((g) => g.page === page)
    : PAGE_IMAGE_GROUPS

  return (
    <section className="page-images">
      {!page && (
        <div className="page-images-head">
          <h2>Page Images</h2>
          <p>Replace the photos shown across the public pages. Uploads appear on the live site instantly.</p>
        </div>
      )}

      {error && <div className="admin-error">{error}</div>}

      {groups.length === 0 && (
        <p className="admin-muted">No editable images on this page yet.</p>
      )}

      {/* one shared hidden input, reused for whichever slot was clicked */}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />

      {groups.map((group) => (
        <div className="pi-group" key={group.page}>
          {!page && <h3 className="pi-group-title">{group.page} page</h3>}
          <div className="pi-grid">
            {group.slots.map((slot) => {
              const entry = images[slot.key]
              const hidden = !!entry?.hidden
              const managed = !hidden && !!entry?.url
              const preview = hidden ? '' : (entry?.url || slot.def)
              const busy = busyKey === slot.key
              return (
                <div className={`pi-card ${managed ? 'is-custom' : ''} ${hidden ? 'is-hidden' : ''}`} key={slot.key}>
                  <div className="pi-thumb">
                    {hidden ? (
                      <span className="pi-thumb-empty">Removed — not shown on the site</span>
                    ) : preview ? (
                      <SmartImage src={preview} alt={slot.label} loading="lazy" />
                    ) : (
                      <span className="pi-thumb-empty">Animated backdrop (no image)</span>
                    )}
                    {managed && <span className="pi-badge">Custom</span>}
                    {hidden && <span className="pi-badge pi-badge-off">Removed</span>}
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
                      {/* Edit: same as upload — pick a new image to swap in. Shown when something is visible. */}
                      {!hidden && (managed || slot.def) && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={!isCloudinaryConfigured || busy}
                          onClick={() => openPicker(slot.key)}
                        >
                          Edit
                        </button>
                      )}
                      {/* Delete: hide from the site. Shown when something is currently visible. */}
                      {!hidden && (managed || slot.def) && (
                        <button type="button" className="btn btn-ghost btn-sm pi-del" onClick={() => onDelete(slot.key)}>
                          Delete
                        </button>
                      )}
                      {/* Restore the built-in default (undo a custom upload or a delete). */}
                      {(managed || hidden) && (
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onRestore(slot.key)}>
                          Restore default
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
