import { Link } from 'react-router-dom'

/** Banner shown at the top of every interior page. */
export default function PageHero({ kicker, title, subtitle, crumb }) {
  return (
    <section className="page-hero">
      <div className="page-hero-overlay" aria-hidden="true" />
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
