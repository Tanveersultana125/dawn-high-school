import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SmartImage from './SmartImage'

// Stagger the card's children in as it scrolls into view.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
  },
}

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

/**
 * Animated feature-highlight card — image, title, description and a CTA.
 * Adapted from the shadcn/Tailwind original to the project's plain-CSS stack,
 * keeping the Framer Motion stagger reveal and soft background glow.
 */
export default function FeatureHighlightCard({
  imageSrc,
  imageAlt = 'Feature image',
  title,
  description,
  buttonText,
  to = '/contact',
  className = '',
}) {
  return (
    <motion.div
      className={`fhc ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <span className="fhc-glow" aria-hidden="true" />

      <motion.div className="fhc-img" variants={imageVariants}>
        <SmartImage src={imageSrc} alt={imageAlt} loading="lazy" />
      </motion.div>

      <motion.h2 className="fhc-title" variants={itemVariants}>{title}</motion.h2>

      <motion.p className="fhc-desc" variants={itemVariants}>{description}</motion.p>

      <motion.div className="fhc-action" variants={itemVariants}>
        <Link to={to} className="btn btn-gold fhc-btn">{buttonText}</Link>
      </motion.div>
    </motion.div>
  )
}
