import { memo } from 'react'
import { motion } from 'framer-motion'

/**
 * Background Boxes — an interactive skewed grid that lights up on hover.
 * Ported from the shadcn/Aceternity Tailwind original to this project's
 * stack (plain JSX + CSS; styles live in index.css under `.boxes-*`).
 *
 * Colours are a curated brand palette (gold / royal / sky / teal / violet)
 * rather than the original rainbow, and the grid is sized down for perf.
 */
const COLORS = [
  'rgb(212 175 55)', // gold
  'rgb(37 99 235)', // royal blue
  'rgb(125 211 252)', // sky
  'rgb(45 212 191)', // teal
  'rgb(165 180 252)', // indigo
  'rgb(196 181 253)', // violet
]

const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

function BoxesCore({ rows = 90, cols = 50, className = '' }) {
  const rowArr = new Array(rows).fill(1)
  const colArr = new Array(cols).fill(1)

  return (
    <div
      className={`boxes-core ${className}`}
      style={{ transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)' }}
      aria-hidden="true"
    >
      {rowArr.map((_, i) => (
        <div key={`row-${i}`} className="boxes-row">
          {colArr.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              className="boxes-cell"
              whileHover={{ backgroundColor: randomColor(), transition: { duration: 0 } }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="boxes-plus">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default memo(BoxesCore)
