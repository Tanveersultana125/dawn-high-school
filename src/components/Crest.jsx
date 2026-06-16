import { useState } from 'react'

/** Dawn High School logo. Falls back gracefully if the image ever fails to
 *  load (stale cache, offline, etc.) so the navbar never shows a broken-image
 *  icon — it swaps to the backup logo, then to a styled text crest. */
export default function Crest({ className = 'crest' }) {
  const [stage, setStage] = useState(0) // 0: primary, 1: backup, 2: text fallback

  if (stage === 2) {
    return (
      <span className={`${className} crest-fallback`} aria-label="Dawn High School logo" role="img">
        DHS
      </span>
    )
  }

  return (
    <img
      className={className}
      src={stage === 0 ? '/dawn-logo.png' : '/logo.png'}
      alt="Dawn High School logo"
      width="226"
      height="213"
      loading="eager"
      decoding="async"
      onError={() => setStage((s) => s + 1)}
    />
  )
}
