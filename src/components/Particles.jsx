import { useEffect, useRef } from 'react'

/**
 * Lightweight canvas particle field with subtle connecting lines.
 * Density and motion are tuned down on small screens and disabled for
 * users who prefer reduced motion, keeping the hero buttery on mobile.
 *
 * Props:
 *  - className   class for the <canvas> (default 'hero-particles')
 *  - interactive when true, particles drift toward the cursor and link
 *               to it, giving a depth / parallax feel on mouse-over.
 */
export default function Particles({ className = 'hero-particles', interactive = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    let width, height, particles, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    // Pointer lives in CSS pixels; -1 means "no pointer over the canvas".
    const pointer = { x: -1, y: -1 }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const isMobile = width < 760
      const count = Math.floor((width * height) / (isMobile ? 22000 : 13000))
      particles = Array.from({ length: Math.min(count, 110) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        gold: Math.random() > 0.78,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Cursor interaction: gentle pull + a glowing link line when close.
        if (interactive && pointer.x >= 0) {
          const mdx = pointer.x - p.x
          const mdy = pointer.y - p.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < 170 && mdist > 0.01) {
            const pull = (1 - mdist / 170) * 0.04
            p.vx += (mdx / mdist) * pull
            p.vy += (mdy / mdist) * pull
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.strokeStyle = `rgba(212,175,55,${0.22 * (1 - mdist / 170)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
          // keep speed from running away after repeated pulls
          p.vx *= 0.99
          p.vy *= 0.99
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? 'rgba(212,175,55,0.85)' : 'rgba(140,180,255,0.55)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(120,160,240,${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onLeave = () => { pointer.x = -1; pointer.y = -1 }

    resize()
    draw()
    window.addEventListener('resize', resize)
    if (interactive) {
      window.addEventListener('mousemove', onMove, { passive: true })
      canvas.addEventListener('mouseleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (interactive) {
        window.removeEventListener('mousemove', onMove)
        canvas.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [interactive])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
