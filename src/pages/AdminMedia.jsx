import { useEffect, useRef, useState } from 'react'
import AdminShell from '../components/AdminShell'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'
import { addMedia, fetchMedia, deleteMedia } from '../lib/media'
import { getHeroMedia, setHeroMedia } from '../lib/settings'
import SmartImage from '../components/SmartImage'
import PageImagesManager from '../components/PageImagesManager'

const CATEGORIES = ['Campus', 'Academics', 'Athletics', 'Arts', 'Events', 'Innovation']

const stripExt = (name) => name.replace(/\.[^/.]+$/, '')

export default function AdminMedia() {
  const fileRef = useRef(null)
  const heroRef = useRef(null)
  const [category, setCategory] = useState('Campus')
  const [queue, setQueue] = useState([]) // { name, progress, status, error }
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Homepage hero media (single video/image).
  const [hero, setHero] = useState(null)
  const [heroBusy, setHeroBusy] = useState(false)
  const [heroProgress, setHeroProgress] = useState(0)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setMedia(await fetchMedia())
    } catch (err) {
      setError(err?.message || 'Could not load media.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    getHeroMedia().then((m) => m && setHero(m)).catch(() => {})
  }, [])

  const onHeroFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setHeroBusy(true)
    setHeroProgress(0)
    try {
      const type = file.type.startsWith('video/') ? 'video' : 'image'
      const up = await uploadToCloudinary(file, setHeroProgress)
      await setHeroMedia({ url: up.url, type, publicId: up.publicId })
      setHero({ url: up.url, type, publicId: up.publicId })
    } catch (err) {
      setError(err?.message || 'Hero upload failed.')
    } finally {
      setHeroBusy(false)
      if (heroRef.current) heroRef.current.value = ''
    }
  }

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Seed the progress queue so the user sees each file immediately.
    const seeded = files.map((f) => ({ name: f.name, progress: 0, status: 'uploading', error: '' }))
    setQueue((q) => [...seeded, ...q])

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const isVideo = file.type.startsWith('video/')
      try {
        const up = await uploadToCloudinary(file, (pct) => {
          setQueue((q) =>
            q.map((item) => (item.name === file.name && item.status === 'uploading' ? { ...item, progress: pct } : item))
          )
        })
        await addMedia({
          url: up.url,
          publicId: up.publicId,
          type: isVideo ? 'video' : 'image',
          title: stripExt(file.name),
          category,
          format: up.format,
          bytes: up.bytes,
        })
        setQueue((q) => q.map((item) => (item.name === file.name && item.status === 'uploading' ? { ...item, progress: 100, status: 'done' } : item)))
      } catch (err) {
        setQueue((q) => q.map((item) => (item.name === file.name && item.status === 'uploading' ? { ...item, status: 'error', error: err?.message || 'Failed' } : item)))
      }
    }

    if (fileRef.current) fileRef.current.value = ''
    await load()
    // Clear finished items shortly after.
    setTimeout(() => setQueue((q) => q.filter((item) => item.status === 'uploading')), 2500)
  }

  const onDelete = async (id) => {
    if (!window.confirm('Remove this item from the gallery?')) return
    await deleteMedia(id)
    setMedia((m) => m.filter((x) => x.id !== id))
  }

  return (
    <AdminShell
      title="Media Library"
      subtitle="Upload images & videos for the public gallery"
    >
      {!isCloudinaryConfigured && (
        <div className="admin-warn">
          Cloudinary is not configured. Set <code>VITE_CLOUDINARY_CLOUD_NAME</code> and{' '}
          <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> in <code>.env</code>, then restart the dev server.
        </div>
      )}

      {/* Homepage hero */}
      <section className="hero-manager">
        <div className="hero-manager-info">
          <h2>Homepage Hero</h2>
          <p>The big video or image at the top of the homepage. Upload a new file to replace it.</p>
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => heroRef.current?.click()}
            disabled={!isCloudinaryConfigured || heroBusy}
          >
            {heroBusy ? `Uploading… ${heroProgress}%` : hero ? 'Replace hero media' : 'Upload hero media'}
          </button>
          <input
            ref={heroRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={onHeroFile}
          />
        </div>
        <div className="hero-manager-preview">
          {hero?.type === 'video' ? (
            <video src={hero.url} muted loop autoPlay playsInline />
          ) : hero?.type === 'image' ? (
            <SmartImage src={hero.url} alt="Current hero" />
          ) : (
            <span className="hero-preview-empty">Using default video</span>
          )}
        </div>
      </section>

      {/* Per-page section images (Home / About / Academics / Campus) */}
      <PageImagesManager />

      {/* Gallery upload box */}
      <div className="media-upload">
        <div className="media-upload-row">
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <button
            type="button"
            className="btn btn-gold"
            onClick={() => fileRef.current?.click()}
            disabled={!isCloudinaryConfigured}
          >
            + Choose images / videos
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={onFiles}
          />
        </div>

        {queue.length > 0 && (
          <ul className="media-queue">
            {queue.map((item, i) => (
              <li key={item.name + i} className={`mq-${item.status}`}>
                <span className="mq-name">{item.name}</span>
                {item.status === 'uploading' && (
                  <span className="mq-bar"><span style={{ width: `${item.progress}%` }} /></span>
                )}
                <span className="mq-state">
                  {item.status === 'done' ? '✓ Uploaded' : item.status === 'error' ? `⚠ ${item.error}` : `${item.progress}%`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Existing media */}
      <div className="admin-filters">
        <span className="admin-count">{media.length} item{media.length === 1 ? '' : 's'}</span>
      </div>

      {loading && <p className="admin-muted">Loading media…</p>}
      {error && <div className="admin-error">{error}</div>}
      {!loading && !error && media.length === 0 && (
        <p className="admin-muted">No media yet — upload some above.</p>
      )}

      <div className="media-grid">
        {media.map((m) => (
          <figure key={m.id} className="media-card">
            <div className="media-thumb">
              {m.type === 'video' ? (
                <video src={m.url} muted playsInline preload="metadata" />
              ) : (
                <SmartImage src={m.url} alt={m.title} loading="lazy" />
              )}
              <span className={`tag tag-${m.type}`}>{m.type}</span>
            </div>
            <figcaption>
              <b>{m.title || 'Untitled'}</b>
              <span>{m.category}</span>
            </figcaption>
            <button className="media-del" onClick={() => onDelete(m.id)} aria-label="Delete">✕</button>
          </figure>
        ))}
      </div>
    </AdminShell>
  )
}
