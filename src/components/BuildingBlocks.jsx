import { Link } from 'react-router-dom'
import { Reveal } from './common'

// Isometric block field — adapted from the Uiverse cube grid to the brand
// (white cubes, hover-driven colour cycle) for a premium, interactive look.
export default function BuildingBlocks({
  layout = 'split', // 'split' (text | cubes) | 'reverse' (cubes | text) | 'stacked' (centered)
  eyebrow = 'Innovation at Dawn',
  title = 'Building Blocks of a',
  accent = 'Brighter Future',
  lead = 'Every lesson, lab, and project is a building block — layered together to shape confident, curious, future-ready learners. Hover the blocks to watch Dawn light up.',
  buttonText = 'Explore Academics',
  to = '/academics',
}) {
  const stacked = layout === 'stacked'
  const reverse = layout === 'reverse'

  // 3 depth layers, each a grid of isometric cube tiles → one big 3D cube
  const grid = (
    <div className="cube-container" aria-hidden="true">
      {[0, 1, 2].map((l) => (
        <div className="cube" key={l}>
          {Array.from({ length: 4 }).map((_, x) => (
            <div className="cube-col" key={x} style={{ '--x': x }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} style={{ '--i': i + 1 }} />
              ))}
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

  if (stacked) {
    return (
      <section className="section section-dark blocks-section blocks-stacked" id="innovation">
        <div className="container">
          {copy}
          {visual}
        </div>
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
    </section>
  )
}
