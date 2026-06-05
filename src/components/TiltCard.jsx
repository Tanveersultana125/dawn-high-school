import { useRef } from 'react'

/**
 * Interactive 3D tilt card. Tracks the pointer and rotates the card in 3D,
 * exposing --mx/--my (glare position) and lifting children via translateZ.
 * Respects prefers-reduced-motion (skips the tilt).
 */
export default function TiltCard({ className = '', children, max = 11, ...rest }) {
  const ref = useRef(null)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMove = (e) => {
    const el = ref.current
    if (!el || reduce) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const ry = (px - 0.5) * 2 * max
    const rx = -(py - 0.5) * 2 * max
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`tilt3d ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <span className="tilt3d-glare" aria-hidden="true" />
      {children}
    </div>
  )
}
