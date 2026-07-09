import './GradientCard.css'

/**
 * GradientCard — an animated skewed-gradient glass card (adapted from the
 * "gradient card showcase" effect into this project's plain JSX + CSS stack).
 * On hover the skewed gradient panels straighten, blobs float in, and the
 * glass content slides + expands.
 */
export default function GradientCard({ icon, title, desc, from, to }) {
  const grad = { background: `linear-gradient(315deg, ${from}, ${to})` }
  return (
    <div className="gcard">
      {/* Skewed gradient panels */}
      <span className="gcard__panel" style={grad} />
      <span className="gcard__panel gcard__panel--blur" style={grad} />

      {/* Animated floating blobs */}
      <span className="gcard__blobs" aria-hidden="true">
        <span className="gcard__blob gcard__blob--1" />
        <span className="gcard__blob gcard__blob--2" />
      </span>

      {/* Glass content */}
      <div className="gcard__content">
        {icon && <div className="gcard__icon">{icon}</div>}
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}
