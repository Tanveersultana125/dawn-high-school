import { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Warp Background — animated 3D "warp tunnel" of grid planes with beams of
 * light streaking down each of the four sides toward a vanishing point.
 *
 * Ported from the shadcn/Magic-UI Tailwind original to this project's stack
 * (plain JSX + framer-motion + CSS; styles live in index.css under `.warp-*`).
 * The rainbow beams are biased to the brand palette (royal / gold / sky) and
 * the grid lines use a faint navy instead of `hsl(var(--border))`.
 *
 * Drop any content inside as children; it renders crisply above the warp.
 */

// Brand-tuned hue buckets the random beam colour is picked from (degrees on
// the HSL wheel): royal blue, sky, gold, and a touch of violet for variety.
const HUES = [218, 205, 46, 262]

const Beam = ({ width, x, delay, duration, seed }) => {
  // Deterministic-ish per-beam variety without Math.random in render paths
  // that could mismatch — seed is the beam's index.
  const hue = HUES[seed % HUES.length]
  const ar = ((seed * 37) % 10) + 1

  return (
    <motion.div
      className="warp-beam"
      style={{
        '--x': `${x}`,
        '--width': `${width}`,
        '--aspect-ratio': `${ar}`,
        '--beam-bg': `linear-gradient(hsl(${hue} 85% 62%), transparent)`,
      }}
      initial={{ y: '100cqmax', x: '-50%' }}
      animate={{ y: '-100%', x: '-50%' }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default function WarpBackground({
  children,
  perspective = 100,
  className = '',
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = 'rgba(10, 31, 68, 0.14)',
  ...props
}) {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide
    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ x, delay })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams = useMemo(() => generateBeams(), [generateBeams])

  const renderSide = (side, beams) =>
    beams.map((beam, index) => (
      <Beam
        key={`${side}-${index}`}
        width={`${beamSize}%`}
        x={`${beam.x * beamSize}%`}
        delay={beam.delay}
        duration={beamDuration}
        seed={index + side.length}
      />
    ))

  return (
    <div className={`warp-bg ${className}`} {...props}>
      <div
        className="warp-scene"
        style={{
          '--perspective': `${perspective}px`,
          '--grid-color': gridColor,
          '--beam-size': `${beamSize}%`,
        }}
        aria-hidden="true"
      >
        <div className="warp-side warp-top">{renderSide('top', topBeams)}</div>
        <div className="warp-side warp-bottom">{renderSide('bottom', bottomBeams)}</div>
        <div className="warp-side warp-left">{renderSide('left', leftBeams)}</div>
        <div className="warp-side warp-right">{renderSide('right', rightBeams)}</div>
      </div>
      <div className="warp-content">{children}</div>
    </div>
  )
}
