import { useState, useEffect } from 'react'
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

// Which of a face's nine cells carry a pip, for each value 1–6.
const PIP_CELLS = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
}

// Opposite faces sum to seven, as on a real die.
const DIE_FACES = [
  { face: 'front', value: 1 },
  { face: 'back', value: 6 },
  { face: 'right', value: 3 },
  { face: 'left', value: 4 },
  { face: 'top', value: 5 },
  { face: 'bottom', value: 2 },
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
  lead = 'Every lesson, lab, and project is a building block — layered together to shape confident, curious, future-ready learners. Hover to pause the roll, click to open the gallery.',
  buttonText = 'Explore Academics',
  to = '/academics',
  sectionClassName = '',
}) {
  const stacked = layout === 'stacked'
  const reverse = layout === 'reverse'
  const [spreadOpen, setSpreadOpen] = useState(false) // scattered full-image gallery
  const [openImg, setOpenImg] = useState(null)        // single image zoomed from the spread
  const [arranged, setArranged] = useState(false)     // scattered → grid auto-animation

  // When the spread opens, let the tiles start scattered for one frame, then
  // automatically settle into the clean grid (no scrolling needed).
  useEffect(() => {
    if (!spreadOpen) { setArranged(false); return }
    const t = setTimeout(() => setArranged(true), 90)
    return () => clearTimeout(t)
  }, [spreadOpen])

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

  // A tumbling die. Each face is a 3×3 grid; PIP_CELLS says which of the nine
  // cells that face's value fills. Opposite faces sum to seven, as on a real
  // die, so the tumble never shows an impossible pair.
  const die = (
    <div
      className="die"
      role="button"
      tabIndex={0}
      aria-label="Open the photo gallery"
      onClick={() => setSpreadOpen(true)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSpreadOpen(true)}
    >
      <div className="die-cube">
        {DIE_FACES.map(({ face, value }) => (
          <span className={`die-face die-${face}`} key={face}>
            {PIP_CELLS[value].map((cell) => (
              <i
                key={cell}
                style={{ gridRow: Math.ceil(cell / 3), gridColumn: ((cell - 1) % 3) + 1 }}
              />
            ))}
          </span>
        ))}
      </div>
      <span className="die-shadow" aria-hidden="true" />
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
    <Reveal className="blocks-visual" delay={reverse || stacked ? 0 : 1}>{die}</Reveal>
  )

  // Auto-arranging gallery: images start scattered/skewed and settle into a
  // clean grid on their own when it opens. Click any image to zoom it full-size.
  const spread = spreadOpen && (
    <div className="gallery-spread" role="dialog" aria-modal="true">
      <button className="gallery-spread-close" aria-label="Close gallery" onClick={() => setSpreadOpen(false)}>✕</button>
      <div className={`gs-grid ${arranged ? 'on' : ''}`}>
        {TILE_IMAGES.map((img, idx) => (
          <button
            key={idx}
            className="gs-img"
            style={{ '--dx': SCATTER[idx].dx, '--dy': SCATTER[idx].dy, '--sk': SCATTER[idx].sk, '--d': `${idx * 55}ms` }}
            aria-label="Open photo full-size"
            onClick={() => setOpenImg(img.full)}
          >
            <SmartImage src={img.full} alt="Campus moment at Dawn High School" />
          </button>
        ))}
      </div>
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
      <section className={`section section-dark blocks-section blocks-stacked ${sectionClassName}`} id="innovation">
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
    <section className={`section section-dark blocks-section ${sectionClassName}`} id="innovation">
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
