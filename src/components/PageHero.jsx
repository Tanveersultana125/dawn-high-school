import { Link } from 'react-router-dom'
import Particles from './Particles'

/** Banner shown at the top of every interior page.
 *  The backdrop is a live, mouse-interactive particle field (no photo)
 *  so every page gets a clean, professional, animated look.
 *  Pass `variant` to switch the layout/accent pattern per page. */
export default function PageHero({ kicker, title, subtitle, crumb, variant }) {
  return (
    <section className={`page-hero${variant ? ` page-hero--${variant}` : ''}`}>
      <Particles className="page-hero-particles" interactive />
      <div className="container page-hero-inner">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <b>{crumb || title}</b>
        </nav>
        {kicker && <span className="eyebrow">{kicker}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  )
}
