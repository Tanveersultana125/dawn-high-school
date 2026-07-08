import { useCallback, useEffect, useState } from 'react'
import { Reveal, SectionHead } from './common'
import { fetchMedia } from '../lib/media'
import { isFirebaseConfigured } from '../lib/firebase'

// Gradients cycled through so each video card gets a branded backdrop while it
// loads (matching the photo gallery's look).
const GRAD_POOL = [
  'linear-gradient(160deg,#0e2a5e,#1450c8)',
  'linear-gradient(160deg,#0a1f44,#2563eb)',
  'linear-gradient(160deg,#103374,#4f86f7)',
]

/**
 * Videos section for the Gallery page. Lists admin-uploaded videos (type
 * 'video' from the media collection) in a clean grid; click any card to play it
 * full-size in a lightbox. Shows a friendly note until the first video is added.
 */
export default function VideoGallery() {
  const [videos, setVideos] = useState([])
  const [ready, setReady] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) { setReady(true); return }
    let alive = true
    fetchMedia()
      .then((rows) => {
        if (!alive) return
        setVideos(
          rows
            .filter((m) => (m.type || 'image') === 'video')
            .map((m, i) => ({
              title: m.title || 'Untitled',
              cat: m.category || 'Campus',
              url: m.url,
              grad: GRAD_POOL[i % GRAD_POOL.length],
            }))
        )
      })
      .catch(() => {})
      .finally(() => { if (alive) setReady(true) })
    return () => { alive = false }
  }, [])

  const move = useCallback((dir) => {
    setLightbox((i) => (i === null ? i : (i + dir + videos.length) % videos.length))
  }, [videos.length])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, move])

  // Don't render an empty section before we know whether any videos exist.
  if (ready && videos.length === 0) return null

  return (
    <section className="section section-alt" id="videos">
      <div className="container">
        <SectionHead
          center
          eyebrow="Watch"
          title="Dawn in"
          accent="Motion"
          lead="Step into the energy of campus life — assemblies, performances, sports, and celebrations, captured on video."
        />

        <Reveal>
          <div className="video-grid">
            {videos.map((v, i) => (
              <figure
                className="video-card"
                key={v.url + i}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightbox(i)}
                aria-label={`Play ${v.title}`}
              >
                <div className="video-thumb" style={{ background: v.grad }}>
                  <video className="v-media" src={v.url} muted playsInline preload="metadata" />
                  <span className="video-play" aria-hidden="true">▶</span>
                </div>
                <figcaption className="video-overlay">
                  <span>{v.cat}</span>
                  <b>{v.title}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox-content" style={{ background: videos[lightbox].grad }} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            {videos.length > 1 && (
              <>
                <button className="lightbox-nav prev" onClick={() => move(-1)} aria-label="Previous">‹</button>
                <button className="lightbox-nav next" onClick={() => move(1)} aria-label="Next">›</button>
              </>
            )}
            <video className="lb-img" src={videos[lightbox].url} controls autoPlay playsInline />
            <div className="lb-shade" aria-hidden="true" />
            <div className="lightbox-caption">
              <span>{videos[lightbox].cat}</span>
              <b>{videos[lightbox].title}</b>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
