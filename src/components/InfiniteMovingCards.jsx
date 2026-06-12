/**
 * Infinite horizontal marquee of cards. Adapted from the Aceternity/Tailwind
 * original to the project's plain-CSS stack: instead of cloning DOM nodes at
 * runtime, the items are rendered twice so the CSS keyframe loops seamlessly.
 * Pauses on hover; supports left/right direction and slow/normal/fast speed.
 */
export default function InfiniteMovingCards({
  items,
  renderItem,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className = '',
}) {
  const duration = speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'
  const animDirection = direction === 'left' ? 'normal' : 'reverse'
  const loop = [...items, ...items]

  return (
    <div
      className={`imc-scroller ${className}`}
      style={{ '--imc-dur': duration, '--imc-dir': animDirection }}
    >
      <ul className={`imc-track ${pauseOnHover ? 'imc-pause' : ''}`}>
        {loop.map((item, i) => (
          <li className="imc-card" key={i} aria-hidden={i >= items.length ? 'true' : undefined}>
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  )
}
