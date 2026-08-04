import { Link } from 'react-router-dom'
import { Reveal } from './common'

/**
 * Introductory band for a photo section — eyebrow, headline, lead and a button.
 *
 * It used to carry a photo visual (a cube cluster, later a die) beside the copy,
 * along with the pop-out gallery that visual opened. Both are gone, so this is
 * now just the copy, centred.
 */
export default function BuildingBlocks({
  eyebrow = 'Innovation at Dawn',
  title = 'Building Blocks of a',
  accent = 'Brighter Future',
  lead = 'Every lesson, lab, and project is a building block — layered together to shape confident, curious, future-ready learners.',
  buttonText = 'Explore Academics',
  to = '/academics',
  sectionClassName = '',
}) {
  return (
    <section className={`section section-dark blocks-section ${sectionClassName}`} id="innovation">
      <div className="container">
        <Reveal className="blocks-copy center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">
            {title} <span className="accent">{accent}</span>
          </h2>
          <p className="section-lead">{lead}</p>
          {buttonText && (
            <Link to={to} className="btn btn-gold" style={{ marginTop: 28 }}>{buttonText}</Link>
          )}
        </Reveal>
      </div>
    </section>
  )
}
