import { Link } from 'react-router-dom'
import Particles from './Particles'

/** Banner shown at the top of every interior page.
 *  By default the backdrop is a live, mouse-interactive particle field.
 *  Pass `photo` to layer a dimmed background image behind the particles
 *  (used on Contact). Pass `variant` to switch the accent pattern per page. */
export default function PageHero({ kicker, title, subtitle, crumb, variant, photo }) {
  return (
    <section className={`page-hero${variant ? ` page-hero--${variant}` : ''}${photo ? ' page-hero--photo' : ''}`}>
      {photo && (
        <div
          className="page-hero-photo"
          aria-hidden="true"
          style={{ backgroundImage: `url('${photo}')` }}
        />
      )}
      <Particles className="page-hero-particles" interactive />
      <div className="container page-hero-inner">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <b>{crumb || title}</b>
        </nav>
        {kicker && <span className="eyebrow">{kicker}</span>}
        {title && <h1 className="page-hero-title">{title}</h1>}
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  )
}
