'use client'
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion'
import React, { useState } from 'react'
import { CanvasRevealEffect } from './CanvasRevealEffect'

/**
 * Dark card with a cursor-following spotlight that reveals an animated
 * WebGL dot-matrix (Aceternity "Card Spotlight"), adapted to plain JS/CSS.
 */
export const CardSpotlight = ({ children, radius = 350, color = '#262626', className = '', ...props }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className={`card-spotlight ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="card-spotlight__mask"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="canvas-reveal--transparent"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={3}
          />
        )}
      </motion.div>
      {children}
    </div>
  )
}
