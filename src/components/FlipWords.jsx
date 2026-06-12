import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Cycles through a list of words with a per-letter blur/fade animation.
 * Adapted from the Aceternity/Tailwind original to the project's stack
 * (framer-motion + plain CSS instead of motion/react + Tailwind).
 */
export default function FlipWords({ words, duration = 2800, className = '' }) {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    const next = words[words.indexOf(currentWord) + 1] || words[0]
    setCurrentWord(next)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (isAnimating) return
    const id = setTimeout(startAnimation, duration)
    return () => clearTimeout(id)
  }, [isAnimating, duration, startAnimation])

  return (
    <span className={`flip-words ${className}`}>
      <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
        <motion.span
          key={currentWord}
          className="flip-words-inner"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
          exit={{ opacity: 0, y: -40, x: 40, filter: 'blur(8px)', scale: 2, position: 'absolute' }}
        >
          {currentWord.split('').map((letter, i) => (
            <motion.span
              key={currentWord + i}
              className="flip-letter"
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
