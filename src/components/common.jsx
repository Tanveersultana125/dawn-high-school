import { useInView, useCountUp } from '../hooks/useScrollReveal'

/** Scroll-reveal wrapper. Adds `.reveal` + delay class, toggles `.in` when visible. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const [ref, inView] = useInView()
  const delayClass = delay ? ` d${delay}` : ''
  return (
    <Tag ref={ref} className={`reveal${delayClass} ${className} ${inView ? 'in' : ''}`} {...rest}>
      {children}
    </Tag>
  )
}

/** Standard section heading block. */
export function SectionHead({ eyebrow, title, accent, lead, center = false }) {
  return (
    <Reveal className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  )
}

/** Animated counter that fires when scrolled into view. */
export function Counter({ value, suffix = '', prefix = '' }) {
  const [ref, inView] = useInView({ once: true })
  const count = useCountUp(value, inView)
  return (
    <b ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix && <span className="suffix">{suffix}</span>}
    </b>
  )
}
