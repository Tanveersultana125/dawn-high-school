import { useState } from 'react'
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
  const [openImg, setOpenImg] = useState(null)

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
                    onClick={() => setOpenImg(img.full)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenImg(img.full)}
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
      {lightbox}
    </section>
  )
}
