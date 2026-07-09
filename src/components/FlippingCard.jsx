import './FlippingCard.css'

/**
 * FlippingCard — a 3D hover-flip card (adapted from the shadcn/Tailwind
 * "flipping-card" component into this project's plain JSX + CSS stack).
 * Pass `frontContent` and `backContent`; it flips on hover.
 */
export default function FlippingCard({
  className = '',
  height = 300,
  width = 350,
  frontContent,
  backContent,
}) {
  return (
    <div
      className="flip-card"
      style={{ '--fc-height': `${height}px`, '--fc-width': `${width}px` }}
    >
      <div className={`flip-card__inner ${className}`}>
        <div className="flip-card__face flip-card__face--front">{frontContent}</div>
        <div className="flip-card__face flip-card__face--back">{backContent}</div>
      </div>
    </div>
  )
}
