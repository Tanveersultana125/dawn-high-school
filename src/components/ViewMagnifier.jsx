'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

/**
 * Drag-to-zoom "view magnifier" (adapted from the shadcn/TS original to plain
 * JS/CSS). Grab the handle on the right edge and drag horizontally to scale the
 * content up to `maxScale`; the rest of the page blurs behind it. Releasing
 * springs it back to 100%.
 */
export function ViewMagnifier({
  className = '',
  children,
  maxScale = 1.8,
  onScaleChange,
  onMaxScaleReached,
  ...props
}) {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isAtMaxScale, setIsAtMaxScale] = useState(false)
  const startX = useRef(0)
  const initialScale = useRef(1)
  const scale = useMotionValue(1)
  const opacity = useTransform(scale, [1, maxScale], [0, 1])
  const containerScale = useTransform(scale, [1, maxScale], [1, 1.6])

  // Fire a callback whenever the magnifier reaches (or leaves) max zoom.
  useEffect(() => {
    const unsubscribe = scale.on('change', (latestScale) => {
      const newIsAtMaxScale = Math.abs(latestScale - maxScale) < 0.01
      if (newIsAtMaxScale !== isAtMaxScale) {
        setIsAtMaxScale(newIsAtMaxScale)
        onMaxScaleReached?.(newIsAtMaxScale)
      }
    })
    return () => unsubscribe()
  }, [scale, maxScale, isAtMaxScale, onMaxScaleReached])

  const handleZoomAnimation = useCallback(
    (targetScale) => {
      animate(scale, targetScale, {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        onUpdate: (latest) => setZoomLevel(Math.round(latest * 100)),
      })
    },
    [scale]
  )

  const handlePointerDown = useCallback(
    (e) => {
      setIsMouseDown(true)
      startX.current = e.clientX
      initialScale.current = scale.get()
      e.currentTarget.setPointerCapture(e.pointerId)
      onScaleChange?.(true)
    },
    [scale, onScaleChange]
  )

  const handlePointerUp = useCallback(
    (e) => {
      if (isMouseDown) {
        setIsMouseDown(false)
        handleZoomAnimation(1)
        e.currentTarget.releasePointerCapture(e.pointerId)
        onScaleChange?.(false)
      }
    },
    [isMouseDown, handleZoomAnimation, onScaleChange]
  )

  const handlePointerMove = useCallback(
    (e) => {
      if (!isMouseDown) return
      const deltaX = e.clientX - startX.current
      const scaleChange = deltaX * 0.005
      const newScale = Math.max(0.8, Math.min(maxScale, initialScale.current + scaleChange))
      scale.set(newScale)
      setZoomLevel(Math.round(newScale * 100))
    },
    [isMouseDown, maxScale, scale]
  )

  return (
    <div className="view-magnifier" {...props}>
      <motion.div className="view-magnifier__overlay" style={{ opacity }} aria-hidden="true" />

      <motion.div
        className={`view-magnifier__scaler ${className}`.trim()}
        style={{ scale: containerScale, zIndex: isMouseDown ? 60 : undefined }}
        role="img"
        aria-label={`Content at zoom level ${zoomLevel}%`}
      >
        <div className="view-magnifier__content">{children}</div>

        <motion.div className="view-magnifier__glow" style={{ opacity }} aria-hidden="true" />

        <motion.button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          style={{ touchAction: 'none' }}
          aria-label={`Drag to zoom. Current zoom level: ${zoomLevel}%`}
          aria-valuemin={80}
          aria-valuemax={180}
          aria-valuenow={zoomLevel}
          role="slider"
          className={`view-magnifier__handle ${isMouseDown ? 'is-grabbing' : ''}`}
        />
      </motion.div>
    </div>
  )
}
