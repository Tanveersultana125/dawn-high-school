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
      <motion.div
        className="container page-hero-inner"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {(crumb || title) && (
          <motion.nav className="crumb" aria-label="Breadcrumb" variants={heroItem}>
            <Link to="/">Home</Link>
            <span>/</span>
            <b>{crumb || title}</b>
          </motion.nav>
        )}
        {kicker && <motion.span className="eyebrow" variants={heroItem}>{kicker}</motion.span>}
        {title && <motion.h1 className="page-hero-title" variants={heroItem}>{title}</motion.h1>}
        {subtitle && <motion.p className="page-hero-sub" variants={heroItem}>{subtitle}</motion.p>}
      </motion.div>
    </section>
  )
}
