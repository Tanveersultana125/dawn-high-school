import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Particles from './Particles'

// Staggered fade + slide-up entrance for the hero content.
const heroContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Banner shown at the top of every interior page.
 *  By default the backdrop is a live, mouse-interactive particle field.
 *  Pass `photo` to layer a dimmed background image behind the particles
 *  (used on Contact). Pass `variant` to switch the accent pattern per page.
 *  Pass `highlights` (array of { n, l }) to float a column of glass stat
 *  cards alongside the copy on wider layouts. */
export default function PageHero({ kicker, title, subtitle, crumb, variant, photo, highlights }) {
  const hasAside = Array.isArray(highlights) && highlights.length > 0
  return (
    <section className={`page-hero${variant ? ` page-hero--${variant}` : ''}${photo ? ' page-hero--photo' : ''}${hasAside ? ' page-hero--split' : ''}`}>
      {photo && (
        <div
          className="page-hero-photo"
          aria-hidden="true"
          style={{ backgroundImage: `url('${photo}')` }}
        />
      )}
      <Particles className="page-hero-particles" interactive />
      <motion.div
        className="container page-hero-inner"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="page-hero-copy">
          {(crumb || title) && (
            <motion.nav className="crumb" aria-label="Breadcrumb" variants={heroItem}>
              <Link to="/">Home</Link>
              <span>/</span>
              <b>{crumb || title}</b>
            </motion.nav>
          )}
          {kicker && <motion.span className="eyebrow" variants={heroItem}>{kicker}</motion.span>}
          {title && (
            <motion.h1 className="page-hero-title" variants={heroItem}>
              {title}
              <span className="page-hero-underline" aria-hidden="true" />
            </motion.h1>
          )}
          {subtitle && <motion.p className="page-hero-sub" variants={heroItem}>{subtitle}</motion.p>}
        </div>

        {hasAside && (
          <motion.div className="page-hero-aside" variants={heroItem} aria-hidden="true">
            {highlights.map((h) => (
              <div className="page-hero-stat" key={h.l}>
                <b>{h.n}</b>
                <span>{h.l}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
