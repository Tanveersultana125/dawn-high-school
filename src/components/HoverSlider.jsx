import { createContext, useCallback, useContext, useState, forwardRef } from 'react'
import { motion, MotionConfig } from 'framer-motion'

/**
 * Hover Slider — a list of text labels that, on hover, plays a per-character
 * stagger reveal and swaps a large image via a clip-path wipe.
 *
 * Ported from the shadcn/21st "animated-slideshow" (Tailwind + motion/react)
 * to this project's stack: plain JSX + framer-motion + CSS (styles live in
 * index.css under `.hslide-*`).
 */

const HoverSliderContext = createContext(undefined)

function useHoverSliderContext() {
  const ctx = useContext(HoverSliderContext)
  if (ctx === undefined) {
    throw new Error('useHoverSliderContext must be used within a <HoverSlider>')
  }
  return ctx
}

function splitText(text) {
  const words = text.split(' ').map((w) => w.concat(' '))
  return words.map((w) => w.split('')).flat(1)
}

export function HoverSlider({ children, className = '', ...props }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const changeSlide = useCallback((index) => setActiveSlide(index), [])
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
}

export const TextStaggerHover = forwardRef(function TextStaggerHover(
  { text, index, className = '', ...props },
  ref,
) {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const characters = splitText(text)
  const isActive = activeSlide === index
  return (
    <span
      ref={ref}
      className={`hslide-text${isActive ? ' is-active' : ''} ${className}`}
      onMouseEnter={() => changeSlide(index)}
      onFocus={() => changeSlide(index)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      {...props}
    >
      {characters.map((char, i) => (
        <span key={`${char}-${i}`} className="hslide-charwrap">
          <MotionConfig
            transition={{ delay: i * 0.025, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="hslide-char base"
              initial={{ y: '0%' }}
              animate={isActive ? { y: '-110%' } : { y: '0%' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
            <motion.span
              className="hslide-char reveal"
              initial={{ y: '110%' }}
              animate={isActive ? { y: '0%' } : { y: '110%' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          </MotionConfig>
        </span>
      ))}
    </span>
  )
})

const clipPathVariants = {
  visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
  hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)' },
}

export function HoverSliderImageWrap({ className = '', ...props }) {
  return <div className={`hslide-imgwrap ${className}`} {...props} />
}

export const HoverSliderImage = forwardRef(function HoverSliderImage(
  { index, className = '', ...props },
  ref,
) {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      ref={ref}
      className={`hslide-img ${className}`}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? 'visible' : 'hidden'}
      {...props}
    />
  )
})
