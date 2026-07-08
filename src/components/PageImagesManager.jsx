import { useEffect, useRef, useState } from 'react'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'
import { getPageImages, setPageImage, clearPageImage, hidePageImage, setPageImagePosition } from '../lib/pageImages'
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
  const [showRemoved, setShowRemoved] = useState(false) // reveal deleted cards
  const [editKey, setEditKey] = useState('') // slot whose framing is being adjusted
  const [pos, setPos] = useState({ x: 50, y: 50 }) // live focal point while editing (%)
  const [savingPos, setSavingPos] = useState(false)
  const inputRef = useRef(null)
  const pendingKey = useRef('')

  // Parse a stored object-position ("50% 30%") back into {x, y} percentages.
  const parsePos = (str) => {
    const [x, y] = String(str || '').split(/\s+/)
    const px = parseFloat(x), py = parseFloat(y)
    return { x: Number.isFinite(px) ? px : 50, y: Number.isFinite(py) ? py : 50 }
  }

  // Open the framing adjuster for a slot, seeded with its current position.
  const openEditor = (key) => {
    setPos(parsePos(images[key]?.pos))
    setEditKey(key)
  }

  const savePos = async (key) => {
    const value = `${Math.round(pos.x)}% ${Math.round(pos.y)}%`
    setSavingPos(true)
    setError('')
    try {
      await setPageImagePosition(key, value)
      setImages((m) => ({ ...m, [key]: { ...(m[key] || {}), pos: value } }))
      setEditKey('')
    } catch (err) {
      setError(err?.message || 'Could not save the framing.')
    } finally {
      setSavingPos(false)
    }
  }

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
      setImages((m) => ({
        ...m,
        [key]: { ...(m[key] || {}), url: up.url, type: 'image', publicId: up.publicId, hidden: false },
      }))
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

  // A "deleted" card is one that's been hidden. Hide such cards from the panel
  // entirely; the "Show removed items" toggle brings them back for restoring.
  const isRemoved = (key) => !!images[key]?.hidden
  const removedCount = groups.reduce(
    (n, g) => n + g.slots.filter((s) => isRemoved(s.key)).length,
    0
  )

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

      {removedCount > 0 && (
        <div className="pi-toolbar">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowRemoved((v) => !v)}
          >
            {showRemoved
              ? `Hide removed items (${removedCount})`
              : `Show removed items (${removedCount})`}
          </button>
        </div>
      )}

      {/* one shared hidden input, reused for whichever slot was clicked */}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />

      {groups.map((group) => {
        // Drop deleted cards unless the user is peeking at removed items.
        const slots = group.slots.filter((s) => showRemoved || !isRemoved(s.key))
        if (slots.length === 0) return null
        return (
        <div className="pi-group" key={group.page}>
          {!page && <h3 className="pi-group-title">{group.page} page</h3>}
          <div className="pi-grid">
            {slots.map((slot) => {
              const entry = images[slot.key]
              const hidden = !!entry?.hidden
              const managed = !hidden && !!entry?.url
              const preview = hidden ? '' : (entry?.url || slot.def)
              const busy = busyKey === slot.key
              const editing = editKey === slot.key
              // Live focal point while adjusting this slot; else its saved value.
              const thumbPos = editing ? `${pos.x}% ${pos.y}%` : entry?.pos || undefined
              return (
                <div className={`pi-card ${managed ? 'is-custom' : ''} ${hidden ? 'is-hidden' : ''} ${editing ? 'is-editing' : ''}`} key={slot.key}>
                  <div className="pi-thumb">
                    {hidden ? (
                      <span className="pi-thumb-empty">Removed — not shown on the site</span>
                    ) : preview ? (
                      <SmartImage src={preview} alt={slot.label} loading="lazy" style={{ objectPosition: thumbPos }} />
                    ) : (
                      <span className="pi-thumb-empty">Animated backdrop (no image)</span>
                    )}
                    {managed && <span className="pi-badge">Custom</span>}
                    {hidden && <span className="pi-badge pi-badge-off">Removed</span>}
                  </div>
                  <div className="pi-info">
                    <b>{slot.label}</b>

                    {editing ? (
                      /* Framing adjuster: drag the sliders to move the photo inside the frame. */
                      <div className="pi-adjust">
                        <p className="pi-adjust-hint">Move the photo so the important part is visible.</p>
                        <label className="pi-slider">
                          <span>Up / Down</span>
                          <input
                            type="range" min="0" max="100" value={pos.y}
                            onChange={(e) => setPos((p) => ({ ...p, y: +e.target.value }))}
                          />
                        </label>
                        <label className="pi-slider">
                          <span>Left / Right</span>
                          <input
                            type="range" min="0" max="100" value={pos.x}
                            onChange={(e) => setPos((p) => ({ ...p, x: +e.target.value }))}
                          />
                        </label>
                        <div className="pi-actions">
                          <button type="button" className="btn btn-gold btn-sm" disabled={savingPos} onClick={() => savePos(slot.key)}>
                            {savingPos ? 'Saving…' : 'Save framing'}
                          </button>
                          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setPos({ x: 50, y: 50 })}>
                            Center
                          </button>
                          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditKey('')}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                    <div className="pi-actions">
                      <button
                        type="button"
                        className="btn btn-gold btn-sm"
                        disabled={!isCloudinaryConfigured || busy}
                        onClick={() => openPicker(slot.key)}
                      >
                        {busy ? `Uploading… ${progress}%` : managed ? 'Replace' : 'Upload'}
                      </button>
                      {/* Edit: adjust how the photo is framed so it isn't cut off. */}
                      {!hidden && preview && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={busy}
                          onClick={() => openEditor(slot.key)}
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
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        )
      })}
    </section>
  )
}
