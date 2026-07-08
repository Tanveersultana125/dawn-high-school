import { useCallback, useEffect, useState } from 'react'
import { Reveal, SectionHead } from './common'
import { fetchMedia } from '../lib/media'
import { isFirebaseConfigured } from '../lib/firebase'
import SmartImage from './SmartImage'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

// Heights + gradients cycled through for admin-uploaded items so they slot into
// the masonry layout like the built-in samples.
const H_POOL = [260, 210, 300, 230, 270, 200]
const GRAD_POOL = [
  'linear-gradient(160deg,#0e2a5e,#1450c8)',
  'linear-gradient(160deg,#0a1f44,#2563eb)',
  'linear-gradient(160deg,#103374,#4f86f7)',
]

const IMAGES = [
  { emoji: '🏛️', title: 'Main Building', cat: 'Campus', h: 260, img: U('photo-1562774053-701939374585'), grad: 'linear-gradient(160deg,#0e2a5e,#1450c8)' },
  { emoji: '🔬', title: 'Science Lab', cat: 'Academics', h: 200, img: U('photo-1532094349884-543bc11b234d'), grad: 'linear-gradient(160deg,#1450c8,#4f86f7)' },
  { emoji: '🏀', title: 'Sports Arena', cat: 'Athletics', h: 300, img: U('photo-1546519638-68e109498ffc'), grad: 'linear-gradient(160deg,#0a1f44,#2563eb)' },
  { emoji: '🎭', title: 'Annual Theatre', cat: 'Arts', h: 220, img: U('photo-1503095396549-807759245b35'), grad: 'linear-gradient(160deg,#103374,#4f86f7)' },
  { emoji: '📚', title: 'The Library', cat: 'Campus', h: 280, img: U('photo-1521587760476-6c12a4b040da'), grad: 'linear-gradient(160deg,#061128,#0e2a5e)' },
  { emoji: '🎓', title: 'Graduation Day', cat: 'Events', h: 210, img: U('photo-1523580494863-6f3031224c94'), grad: 'linear-gradient(160deg,#1450c8,#2563eb)' },
  { emoji: '🤖', title: 'Robotics Club', cat: 'Innovation', h: 250, img: U('photo-1518770660439-4636190af475'), grad: 'linear-gradient(160deg,#0e2a5e,#4f86f7)' },
  { emoji: '🎨', title: 'Art Studio', cat: 'Arts', h: 190, img: U('photo-1513364776144-60967b0f800f'), grad: 'linear-gradient(160deg,#0a1f44,#1450c8)' },
  { emoji: '🌳', title: 'Green Courtyard', cat: 'Campus', h: 240, img: U('photo-1622397333309-3056849bc70b'), grad: 'linear-gradient(160deg,#103374,#2563eb)' },
]

// How many photos to show at first, and how many more each "load more" click adds.
const INITIAL_SHOWN = 6
const LOAD_STEP = 3

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const [uploaded, setUploaded] = useState([])
  const [shown, setShown] = useState(INITIAL_SHOWN)

  // Pull admin-uploaded media (newest first) and slot it ahead of the samples.
  useEffect(() => {
    if (!isFirebaseConfigured) return
    let alive = true
    fetchMedia()
      .then((rows) => {
        if (!alive) return
        // Photos only — videos have their own section below the gallery.
        setUploaded(
          rows.filter((m) => (m.type || 'image') !== 'video').map((m, i) => ({
            title: m.title || 'Untitled',
            cat: m.category || 'Campus',
            img: m.url,
            type: m.type || 'image',
            h: H_POOL[i % H_POOL.length],
            grad: GRAD_POOL[i % GRAD_POOL.length],
            emoji: m.type === 'video' ? '▶' : '🖼️',
          }))
        )
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  const items = [...uploaded, ...IMAGES]
  const visibleItems = items.slice(0, shown)
  const hasMore = shown < items.length

  const move = useCallback((dir) => {
    setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length))
  }, [items.length])

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

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHead
          center
          eyebrow="Gallery"
          title="A Glimpse Into"
          accent="Campus Moments"
          lead="Step inside the everyday magic of Dawn — from classrooms and labs to celebrations and championships."
        />

        <Reveal>
          <div className="gallery-grid">
            {visibleItems.map((img, i) => (
              <figure
                className="gallery-item"
                key={(img.title || '') + i}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightbox(i)}
                aria-label={`View ${img.title}`}
              >
                <div className="gallery-thumb" style={{ height: img.h, background: img.grad }}>
                  {img.type === 'video' ? (
                    <video className="g-img" src={img.img} muted playsInline preload="metadata" />
                  ) : (
                    <SmartImage className="g-img" src={img.img} alt={img.title} loading="lazy" />
                  )}
                  <span className="g-emoji">{img.emoji}</span>
                </div>
                <figcaption className="gallery-overlay">
                  <div className="zoom">⤢</div>
                  <span>{img.cat}</span>
                  <b>{img.title}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {hasMore && (
          <div className="gallery-more">
            <button
              type="button"
              className="gallery-more-btn"
              onClick={() => setShown((n) => n + LOAD_STEP)}
            >
              Click here for more pictures
              <span className="gallery-more-arrow" aria-hidden="true">↓</span>
            </button>
          </div>
        )}
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox-content" style={{ background: items[lightbox].grad }} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <button className="lightbox-nav prev" onClick={() => move(-1)} aria-label="Previous">‹</button>
            <button className="lightbox-nav next" onClick={() => move(1)} aria-label="Next">›</button>
            {items[lightbox].type === 'video' ? (
              <video className="lb-img" src={items[lightbox].img} controls autoPlay playsInline />
            ) : (
              <SmartImage className="lb-img" src={items[lightbox].img} alt={items[lightbox].title} />
            )}
            <div className="lb-shade" aria-hidden="true" />
            <div className="lightbox-caption">
              <span>{items[lightbox].cat}</span>
              <b>{items[lightbox].title}</b>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
