import { useState } from 'react'

/**
 * Drop-in <img> replacement that never shows a broken-image icon.
 * If the source fails to load (dead CDN link, stale cache, offline…),
 * it swaps to a branded navy/gold placeholder so the layout stays clean.
 *
 * Usage is identical to <img>: pass src, alt, className and any other
 * img attributes (loading, width, height, etc.).
 */

// Branded placeholder: navy gradient + a small gold "image" glyph.
// Inline SVG (no network request) so the fallback is always available.
const SVG = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='#0a1f44'/>
      <stop offset='1' stop-color='#0e2a5e'/>
    </linearGradient>
  </defs>
  <rect width='16' height='10' fill='url(#g)'/>
  <g transform='translate(8 4.8)'>
    <rect x='-2.1' y='-1.5' width='4.2' height='3.1' rx='0.35' fill='none' stroke='#d4af37' stroke-width='0.16'/>
    <circle cx='-1.1' cy='-0.6' r='0.34' fill='#d4af37'/>
    <path d='M-2 1 L-0.5 -0.4 L0.4 0.4 L1.3 -0.6 L2.1 0.3 V1.5 H-2 Z' fill='#d4af37' opacity='0.85'/>
  </g>
</svg>`

const FALLBACK = `data:image/svg+xml,${encodeURIComponent(SVG)}`

export default function SmartImage({ src, alt = '', className, fallback = FALLBACK, onError, ...rest }) {
  const [failed, setFailed] = useState(false)

  // An empty src (e.g. a slot deleted in the admin) would render a broken /
  // empty <img>; show the branded placeholder instead.
  const missing = failed || !src

  return (
    <img
      src={missing ? fallback : src}
      alt={alt}
      className={[className, missing ? 'img-fallback' : ''].filter(Boolean).join(' ') || undefined}
      onError={(e) => {
        if (!failed) setFailed(true)
        onError?.(e)
      }}
      {...rest}
    />
  )
}
