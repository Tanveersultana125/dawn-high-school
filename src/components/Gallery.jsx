import { useCallback, useEffect, useState } from 'react'
import { Reveal, SectionHead } from './common'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const IMAGES = [
  { emoji: '🏛️', title: 'Main Building', cat: 'Campus', h: 260, img: U('photo-1562774053-701939374585'), grad: 'linear-gradient(160deg,#0e2a5e,#1450c8)' },
  { emoji: '🔬', title: 'Science Lab', cat: 'Academics', h: 200, img: U('photo-1532094349884-543bc11b234d'), grad: 'linear-gradient(160deg,#1450c8,#4f86f7)' },
  { emoji: '🏀', title: 'Sports Arena', cat: 'Athletics', h: 300, img: U('photo-1546519638-68e109498ffc'), grad: 'linear-gradient(160deg,#0a1f44,#2563eb)' },
  { emoji: '🎭', title: 'Annual Theatre', cat: 'Arts', h: 220, img: U('photo-1503095396549-807759245b35'), grad: 'linear-gradient(160deg,#13316c,#4f86f7)' },
  { emoji: '📚', title: 'The Library', cat: 'Campus', h: 280, img: U('photo-1521587760476-6c12a4b040da'), grad: 'linear-gradient(160deg,#061128,#0e2a5e)' },
  { emoji: '🎓', title: 'Graduation Day', cat: 'Events', h: 210, img: U('photo-1523580494863-6f3031224c94'), grad: 'linear-gradient(160deg,#1450c8,#2563eb)' },
  { emoji: '🤖', title: 'Robotics Club', cat: 'Innovation', h: 250, img: U('photo-1518770660439-4636190af475'), grad: 'linear-gradient(160deg,#0e2a5e,#4f86f7)' },
  { emoji: '🎨', title: 'Art Studio', cat: 'Arts', h: 190, img: U('photo-1513364776144-60967b0f800f'), grad: 'linear-gradient(160deg,#0a1f44,#1450c8)' },
  { emoji: '🌳', title: 'Green Courtyard', cat: 'Campus', h: 240, img: U('photo-1622397333309-3056849bc70b'), grad: 'linear-gradient(160deg,#13316c,#2563eb)' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const move = useCallback((dir) => {
    setLightbox((i) => (i === null ? i : (i + dir + IMAGES.length) % IMAGES.length))
  }, [])

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
            {IMAGES.map((img, i) => (
              <figure
                className="gallery-item"
                key={img.title}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLightbox(i)}
                aria-label={`View ${img.title}`}
              >
                <div className="gallery-thumb" style={{ height: img.h, background: img.grad }}>
                  <img className="g-img" src={img.img} alt={img.title} loading="lazy" />
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
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <div className="lightbox-content" style={{ background: IMAGES[lightbox].grad }} onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <button className="lightbox-nav prev" onClick={() => move(-1)} aria-label="Previous">‹</button>
            <button className="lightbox-nav next" onClick={() => move(1)} aria-label="Next">›</button>
            <img className="lb-img" src={IMAGES[lightbox].img} alt={IMAGES[lightbox].title} />
            <div className="lb-shade" aria-hidden="true" />
            <div className="lightbox-caption">
              <span>{IMAGES[lightbox].cat}</span>
              <b>{IMAGES[lightbox].title}</b>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
