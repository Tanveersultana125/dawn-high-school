import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { useInView } from '../hooks/useScrollReveal'

/**
 * MagicBento-style interactive effects, adapted for the light-themed News cards
 * and the school's royal-blue brand. Provides:
 *  - a proximity-driven border glow that follows the cursor across the grid
 *  - particle "stars" that spawn on hover
 *  - subtle 3D tilt + magnetism
 *  - a click ripple
 */

const DEFAULT_PARTICLE_COUNT = 10
const DEFAULT_SPOTLIGHT_RADIUS = 320
const DEFAULT_GLOW_COLOR = '20, 80, 200' // royal blue (--royal-600)
const MOBILE_BREAKPOINT = 768

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div')
  el.className = 'news-particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 3;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlow = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100
  card.style.setProperty('--glow-x', `${relativeX}%`)
  card.style.setProperty('--glow-y', `${relativeY}%`)
  card.style.setProperty('--glow-intensity', glow.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

/**
 * Single interactive News card. Owns its own scroll-reveal (via useInView) plus
 * the tilt / magnetism / particle / ripple effects on the same element.
 */
export function NewsCard({
  event,
  delay = 0,
  onOpen,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  enableStars = true,
}) {
  const [ref, inView] = useInView()
  const isMobile = useMobileDetection()
  const disabled = isMobile

  const particlesRef = useRef([])
  const timeoutsRef = useRef([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef([])
  const particlesInitialized = useRef(false)
  const magnetismRef = useRef(null)

  const initParticles = useCallback(() => {
    if (particlesInitialized.current || !ref.current) return
    const { width, height } = ref.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor, ref])

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismRef.current?.kill()
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => p.parentNode?.removeChild(p),
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!ref.current || !isHoveredRef.current) return
    if (!particlesInitialized.current) initParticles()

    memoizedParticles.current.forEach((particle, index) => {
      const t = setTimeout(() => {
        if (!isHoveredRef.current || !ref.current) return
        const clone = particle.cloneNode(true)
        ref.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true })
      }, index * 100)
      timeoutsRef.current.push(t)
    })
  }, [initParticles, ref])

  useEffect(() => {
    if (disabled || !ref.current) return
    const el = ref.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      if (enableStars) animateParticles()
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearParticles()
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' })
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - cy) / cy) * -6
        const rotateY = ((x - cx) / cx) * 6
        gsap.to(el, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 })
      }
      if (enableMagnetism) {
        magnetismRef.current = gsap.to(el, {
          x: (x - cx) * 0.04,
          y: (y - cy) * 0.04,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleClick = (e) => {
      if (!clickEffect) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.16) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 4;
      `
      el.appendChild(ripple)
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() }
      )
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('click', handleClick)
      clearParticles()
    }
  }, [animateParticles, clearParticles, disabled, enableTilt, enableMagnetism, clickEffect, enableStars, glowColor, ref])

  const delayClass = delay ? ` d${delay}` : ''
  const glowClass = disabled ? '' : ' news-card--magic news-card--glow'

  return (
    <div
      ref={ref}
      className={`reveal${delayClass} news-card${glowClass} ${inView ? 'in' : ''}`}
      style={{ '--glow-color': glowColor }}
    >
      <div className="news-media" style={{ background: event.grad }}>
        <span className="news-tag">{event.tag}</span>
        {event.emoji}
        <div className="news-date">
          <b>{event.day}</b>
          <span>{event.month}</span>
        </div>
      </div>
      <div className="news-body">
        <h3>{event.title}</h3>
        <p>{event.desc}</p>
        <button type="button" className="news-link" onClick={() => onOpen?.(event)}>
          Read More
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/**
 * Cursor-following spotlight for the News grid. Drives each card's
 * --glow-intensity based on proximity and paints a soft brand-blue orb.
 */
export function NewsSpotlight({ gridRef, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) {
  const isMobile = useMobileDetection()

  useEffect(() => {
    if (isMobile || !gridRef?.current) return

    const spotlight = document.createElement('div')
    spotlight.className = 'news-spotlight'
    spotlight.style.cssText = `
      position: fixed;
      width: 640px;
      height: 640px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.10) 0%,
        rgba(${glowColor}, 0.05) 25%,
        rgba(${glowColor}, 0.02) 45%,
        transparent 65%
      );
      z-index: 1;
      opacity: 0;
      transform: translate(-50%, -50%);
    `
    document.body.appendChild(spotlight)

    const handleMouseMove = (e) => {
      const grid = gridRef.current
      if (!grid) return
      const rect = grid.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      const cards = grid.querySelectorAll('.news-card--glow')

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' })
        cards.forEach((c) => c.style.setProperty('--glow-intensity', '0'))
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
      let minDistance = Infinity

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)
        minDistance = Math.min(minDistance, effectiveDistance)

        let glow = 0
        if (effectiveDistance <= proximity) glow = 1
        else if (effectiveDistance <= fadeDistance) glow = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)

        updateCardGlow(card, e.clientX, e.clientY, glow, spotlightRadius)
      })

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' })
      const targetOpacity =
        minDistance <= proximity
          ? 1
          : minDistance <= fadeDistance
            ? (fadeDistance - minDistance) / (fadeDistance - proximity)
            : 0
      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gridRef.current?.querySelectorAll('.news-card--glow').forEach((c) => c.style.setProperty('--glow-intensity', '0'))
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleLeave)
      spotlight.parentNode?.removeChild(spotlight)
    }
  }, [gridRef, isMobile, spotlightRadius, glowColor])

  return null
}

/**
 * Details dialog shown when a card's "Read More" is clicked. Closes on
 * backdrop click, the × button, or Escape; locks body scroll while open.
 */
export function NewsModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div className="news-modal-overlay" role="dialog" aria-modal="true" aria-label={event.title} onClick={onClose}>
      <div className="news-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="news-modal-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="news-modal-media" style={{ background: event.grad }}>
          <span className="news-tag">{event.tag}</span>
          <span className="news-modal-emoji">{event.emoji}</span>
          <div className="news-date">
            <b>{event.day}</b>
            <span>{event.month}</span>
          </div>
        </div>
        <div className="news-modal-body">
          <h3>{event.title}</h3>
          <ul className="news-modal-meta">
            {event.when && (
              <li>
                <span aria-hidden="true">🗓️</span>
                {event.when}
              </li>
            )}
            {event.venue && (
              <li>
                <span aria-hidden="true">📍</span>
                {event.venue}
              </li>
            )}
          </ul>
          <p>{event.body || event.desc}</p>
        </div>
      </div>
    </div>
  )
}
