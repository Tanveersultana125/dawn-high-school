import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './common'
import SmartImage from './SmartImage'

// Small school / children / campus photos that tile across the cube faces.
// `thumb` is used on the tiny cube faces; `full` opens in the lightbox on click.
// (CSS backgrounds — if one ever fails to load the tile just stays a soft grey,
// never a broken-image icon.)
const U = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${w > 600 ? 85 : 70}`
const photo = (id) => ({ thumb: U(id, 240), full: U(id, 1280) })

const TILE_IMAGES = [
  photo('photo-1577896851231-70ef18881754'), // young students
  photo('photo-1523240795612-9a054b0db644'), // classroom
  photo('photo-1503676260728-1c00da094a0b'), // study
  photo('photo-1497486751825-1233686d5d80'), // library
  photo('photo-1461896836934-ffe607ba8211'), // sports
  photo('photo-1511671782779-c97d3d27a1d4'), // arts & music
  photo('photo-1532094349884-543bc11b234d'), // science lab
  photo('photo-1529070538774-1843cb3265df'), // students together
  photo('photo-1517245386807-bb43f82c33c4'), // activities
  photo('photo-1562774053-701939374585'),    // campus
  { thumb: '/student-kid.png', full: '/student-kid.png' }, // a Dawn student
]

// Deterministic per-tile scatter (offset + skew) for the scroll-arrange gallery.
// Seeded by index so it never jitters between renders.
const seeded = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x) // 0..1
}
const SCATTER = TILE_IMAGES.map((_, i) => ({
  dx: `${(seeded(i + 1) * 2 - 1) * 200}px`,
  dy: `${(seeded(i + 41) * 2 - 1) * 150}px`,
  sk: `${(seeded(i + 77) * 2 - 1) * 9}deg`,
}))

// Isometric block field — adapted from the Uiverse cube grid to the brand.
// Static cluster; click any tile to open that photo full-size.
export default function BuildingBlocks({
  layout = 'split', // 'split' (text | cubes) | 'reverse' (cubes | text) | 'stacked' (centered)
  eyebrow = 'Innovation at Dawn',
  title = 'Building Blocks of a',
  accent = 'Brighter Future',
  lead = 'Every lesson, lab, and project is a building block — layered together to shape confident, curious, future-ready learners. Hover to pause, click a block to open the photo.',
  buttonText = 'Explore Academics',
  to = '/academics',
}) {
  const stacked = layout === 'stacked'
  const reverse = layout === 'reverse'
  const [spreadOpen, setSpreadOpen] = useState(false) // scattered full-image gallery
  const [openImg, setOpenImg] = useState(null)        // single image zoomed from the spread
  const gridRef = useRef(null)
  const hintRef = useRef(null)

  // Scroll the overlay to scrub the scattered → grid arrange animation.
  const onSpreadScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 1
    if (gridRef.current) gridRef.current.style.setProperty('--p', p)
    if (hintRef.current) hintRef.current.style.opacity = p > 0.04 ? '0' : ''
  }

  // Lock body scroll while an overlay is open; Esc closes the topmost layer.
  useEffect(() => {
    const anyOpen = spreadOpen || openImg
    document.body.style.overflow = anyOpen ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (openImg) setOpenImg(null)
      else if (spreadOpen) setSpreadOpen(false)
    }
    if (anyOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [spreadOpen, openImg])

  // 3 depth layers, each a grid of isometric cube tiles → one big 3D cube
  const grid = (
    <div className="cube-container">
      {[0, 1, 2].map((l) => (
        <div className="cube" key={l}>
          {Array.from({ length: 4 }).map((_, x) => (
            <div className="cube-col" key={x} style={{ '--x': x }}>
              {Array.from({ length: 4 }).map((_, i) => {
                const img = TILE_IMAGES[(l * 16 + x * 4 + i) % TILE_IMAGES.length]
                return (
                  <span
                    key={i}
                    role="button"
                    tabIndex={0}
                    aria-label="Open photo"
                    style={{ '--i': i + 1, '--img': `url('${img.thumb}')` }}
                    onClick={() => setSpreadOpen(true)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSpreadOpen(true)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  const copy = (
    <Reveal className={`blocks-copy ${stacked ? 'center' : ''}`} delay={reverse ? 1 : 0}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} <span className="accent">{accent}</span>
      </h2>
      <p className="section-lead">{lead}</p>
      {buttonText && (
        <Link to={to} className="btn btn-gold" style={{ marginTop: 28 }}>{buttonText}</Link>
      )}
    </Reveal>
  )

  const visual = (
    <Reveal className="blocks-visual" delay={reverse || stacked ? 0 : 1}>{grid}</Reveal>
  )

  // Scroll-driven gallery: images start scattered/skewed and arrange into a
  // clean grid as you scroll. Click any image to zoom it full-size.
  const spread = spreadOpen && (
    <div className="gallery-spread" role="dialog" aria-modal="true" onScroll={onSpreadScroll}>
      <button className="gallery-spread-close" aria-label="Close gallery" onClick={() => setSpreadOpen(false)}>✕</button>
      <div className="gs-track">
        <div className="gs-grid" ref={gridRef}>
          {TILE_IMAGES.map((img, idx) => (
            <button
              key={idx}
              className="gs-img"
              style={{ '--dx': SCATTER[idx].dx, '--dy': SCATTER[idx].dy, '--sk': SCATTER[idx].sk }}
              aria-label="Open photo full-size"
              onClick={() => setOpenImg(img.full)}
            >
              <SmartImage src={img.full} alt="Campus moment at Dawn High School" />
            </button>
          ))}
        </div>
      </div>
      <span className="gs-hint" ref={hintRef}>Scroll to arrange ↓</span>
    </div>
  )

  const lightbox = openImg && (
    <div className="cube-lightbox" role="dialog" aria-modal="true" onClick={() => setOpenImg(null)}>
      <button className="cube-lightbox-close" aria-label="Close" onClick={() => setOpenImg(null)}>✕</button>
      <SmartImage src={openImg} alt="Campus moment at Dawn High School" onClick={(e) => e.stopPropagation()} />
    </div>
  )

  if (stacked) {
    return (
      <section className="section section-dark blocks-section blocks-stacked" id="innovation">
        <div className="container">
          {copy}
          {visual}
        </div>
        {spread}
        {lightbox}
      </section>
    )
  }

  return (
    <section className="section section-dark blocks-section" id="innovation">
      <div className="container blocks-layout">
        {reverse ? (
          <>
            {visual}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {visual}
          </>
        )}
      </div>
      {spread}
      {lightbox}
    </section>
  )
}
