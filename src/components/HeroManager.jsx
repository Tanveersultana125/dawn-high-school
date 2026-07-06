import { useEffect, useRef, useState } from 'react'
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary'
import { getHeroMedia, setHeroMedia } from '../lib/settings'
import SmartImage from './SmartImage'

/**
 * Admin panel section for the big homepage hero (a single video or image at the
 * very top of the homepage). Uploads to Cloudinary and stores the reference in
 * Firestore settings; the homepage picks it up automatically.
 */
export default function HeroManager() {
  const heroRef = useRef(null)
  const [hero, setHero] = useState(null)
  const [heroBusy, setHeroBusy] = useState(false)
  const [heroProgress, setHeroProgress] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    getHeroMedia().then((m) => m && setHero(m)).catch(() => {})
  }, [])

  const onHeroFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setHeroBusy(true)
    setHeroProgress(0)
    setError('')
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

  return (
    <section className="hero-manager">
      <div className="hero-manager-info">
        <h2>Homepage Hero</h2>
        <p>The big video or image at the top of the homepage. Upload a new file to replace it.</p>
        {error && <div className="admin-error">{error}</div>}
        <button
          type="button"
          className="btn btn-gold"
          onClick={() => heroRef.current?.click()}
          disabled={!isCloudinaryConfigured || heroBusy}
        >
          {heroBusy ? `Uploading… ${heroProgress}%` : hero ? 'Replace hero media' : 'Upload hero media'}
        </button>
        <input ref={heroRef} type="file" accept="image/*,video/*" hidden onChange={onHeroFile} />
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
  )
}
