import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Staggered entrance for the copy column.
const wrap = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Light, corporate-style split hero for the Gallery page:
 *  left copy + gold CTA, right an angular-clipped campus photo. */
export default function GalleryHero({ kicker, title, subtitle, crumb, image, ctaText = 'Schedule a Visit', ctaTo = '/contact' }) {
  return (
    <section className="gallery-hero">
      <span className="gh-shape gh-shape--a" aria-hidden="true" />
      <span className="gh-shape gh-shape--b" aria-hidden="true" />

      <motion.div className="container gh-inner" variants={wrap} initial="hidden" animate="visible">
        <div className="gh-copy">
          <motion.nav className="crumb" aria-label="Breadcrumb" variants={item}>
            <Link to="/">Home</Link>
            <span>/</span>
            <b>{crumb || title}</b>
          </motion.nav>
          {kicker && <motion.span className="eyebrow" variants={item}>{kicker}</motion.span>}
          <motion.h1 className="gh-title" variants={item}>{title}</motion.h1>
          {subtitle && <motion.p className="gh-sub" variants={item}>{subtitle}</motion.p>}
          <motion.div variants={item}>
            <Link to={ctaTo} className="btn btn-gold gh-cta">{ctaText}</Link>
          </motion.div>
        </div>

        <motion.div
          className="gh-media"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* thin blue chevron pointing into the copy */}
          <svg className="gh-chevron" viewBox="0 0 130 240" fill="none" aria-hidden="true">
            <path d="M120 12 L22 120 L120 228" stroke="#2f6cdc" strokeWidth="2" />
          </svg>

          {/* angular hexagon-masked photo, echoed by a thin outline behind it */}
          <span className="gh-outline" aria-hidden="true" />
          <div className="gh-photo" style={{ backgroundImage: `url('${image}')` }} />

          {/* small gold corner bracket */}
          <svg className="gh-bracket" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M60 20 L60 60 L20 60" stroke="var(--gold-400)" strokeWidth="3" strokeLinecap="square" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
