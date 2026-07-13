/**
 * Meteors — a decorative shower of diagonal "shooting star" streaks.
 * Ported from the shadcn/Aceternity Tailwind original to this project's
 * stack (plain JSX + CSS; styles live in index.css under `.meteor`).
 *
 * Drop it inside any `position: relative; overflow: hidden` container.
 */
export default function Meteors({ number = 16, className = '' }) {
  const meteors = Array.from({ length: number })
  return (
    <span className={`meteors ${className}`} aria-hidden="true">
      {meteors.map((_, idx) => (
        <span
          key={`meteor-${idx}`}
          className="meteor"
          style={{
            top: 0,
            left: `${Math.floor(Math.random() * 800 - 400)}px`,
            animationDelay: `${(Math.random() * 0.6 + 0.2).toFixed(2)}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 3)}s`,
          }}
        />
      ))}
    </span>
  )
}
