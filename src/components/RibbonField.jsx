import { useEffect, useRef } from 'react'

/**
 * "Ribbon Field" animated gradient (21st.dev community gradients).
 *
 * A canvas stripe field: pixels are projected onto an axis set by `angle`, the
 * projection is bent by a cross-axis sine (`wave`), and the resulting position
 * picks a colour from hard bands whose edges are feathered by `softness`. A
 * seeded grain tile is overlaid on top.
 *
 * A CSS linear-gradient can only match this when `wave` is 0, which is why it
 * is drawn rather than declared.
 *
 * Rendered at a fraction of the display size and scaled up: the per-pixel work
 * is the cost here, and the field is smooth enough that the upscale is free
 * quality-wise.
 */

const TAU = Math.PI * 2

const DEFAULTS = {
  colors: [
    { hex: '#FFFFFF', pos: 18 },
    { hex: '#78B8F9', pos: 57 },
    { hex: '#5667FF', pos: 60 },
    { hex: '#4D2FF9', pos: 100 },
  ],
  angle: 38,
  centerX: 50,
  centerY: 50,
  scale: 68,
  softness: 24,
  wave: 14,
  grain: 42,
  speed: 100,
  motionAmount: 0,
  motionReverse: false,
  seed: 174074637,
  // The wave clock starts here rather than at 0, so the bands begin mid-bend
  // instead of dead straight.
  waveClock: 20.75,
}

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Deterministic 0..1 noise, so the grain is identical on every mount. */
const makeRandom = (seed) => {
  let s = seed >>> 0
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return ((s >>> 0) % 100000) / 100000
  }
}

const smoothstep = (t) => t * t * (3 - 2 * t)

// Shared so the default prop keeps one identity — a fresh `{}` per render would
// re-run the effect and restart the field every time the parent re-renders.
const NO_OVERRIDES = Object.freeze({})

export default function RibbonField({ className = '', config = NO_OVERRIDES }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cfg = { ...DEFAULTS, ...config }
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stops = [...cfg.colors].sort((a, b) => a.pos - b.pos)
    const rgb = stops.map((c) => hexToRgb(c.hex))
    // A band boundary sits midway between two stops; `softness` sets how far
    // the blend reaches either side of it.
    const edges = stops.slice(0, -1).map((c, i) => {
      const next = stops[i + 1]
      const mid = (c.pos + next.pos) / 2
      const feather = Math.max(0.001, ((cfg.softness / 100) * (next.pos - c.pos)) / 2)
      return { mid, feather }
    })

    // Offscreen buffer at reduced resolution — this is what actually gets shaded.
    const buf = document.createElement('canvas')
    const bctx = buf.getContext('2d')

    // Grain is a fixed tile composited over the field, not regenerated per frame.
    const grainTile = document.createElement('canvas')
    grainTile.width = grainTile.height = 120
    {
      const gctx = grainTile.getContext('2d')
      const img = gctx.createImageData(120, 120)
      const rand = makeRandom(cfg.seed)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 120 + rand() * 135
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 255
      }
      gctx.putImageData(img, 0, 0)
    }
    const grainAlpha = (cfg.grain / 100) * 0.5

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let bw = 0
    let bh = 0
    let imageData = null

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      // ~1/5 of display size: the field has no detail finer than that.
      bw = Math.max(2, Math.round(w / 5))
      bh = Math.max(2, Math.round(h / 5))
      buf.width = bw
      buf.height = bh
      imageData = bctx.createImageData(bw, bh)
    }

    const draw = (t) => {
      const ph = t * (cfg.speed / 100)
      const amt = cfg.motionAmount / 100
      const dir = cfg.motionReverse ? -1 : 1
      const spin = ph * dir

      // Written so it is exactly 0 at ph = 0 — otherwise the field snaps the
      // moment the loop starts.
      const angleNow = cfg.angle + Math.sin(spin * 0.6) * 28 * amt
      const clock = cfg.waveClock + ph * 1.2

      const a = (angleNow * Math.PI) / 180
      const ca = Math.cos(a)
      const sa = Math.sin(a)
      const cx = cfg.centerX / 100
      const cy = cfg.centerY / 100
      const span = 1.4 * (cfg.scale / 100) + 0.2
      const waveAmp = (cfg.wave / 100) * 0.35
      const aspect = bw / bh

      const data = imageData.data
      let p = 0
      for (let y = 0; y < bh; y++) {
        const ny = (y + 0.5) / bh - cy
        for (let x = 0; x < bw; x++) {
          const nx = ((x + 0.5) / bw - cx) * aspect

          const along = nx * ca + ny * sa
          const cross = -nx * sa + ny * ca

          let u = 0.5 + along / span
          u += waveAmp * Math.sin(cross * 2.4 * TAU + clock)

          const pos = u * 100
          // Walk the bands: below the first edge is the first colour, above the
          // last is the last, otherwise blend across the feathered boundary.
          let idx = edges.length
          let mix = 0
          for (let e = 0; e < edges.length; e++) {
            const { mid, feather } = edges[e]
            if (pos < mid - feather) { idx = e; mix = 0; break }
            if (pos < mid + feather) {
              idx = e
              mix = smoothstep((pos - (mid - feather)) / (2 * feather))
              break
            }
          }
          const from = rgb[idx]
          const to = rgb[Math.min(idx + 1, rgb.length - 1)]

          data[p++] = from[0] + (to[0] - from[0]) * mix
          data[p++] = from[1] + (to[1] - from[1]) * mix
          data[p++] = from[2] + (to[2] - from[2]) * mix
          data[p++] = 255
        }
      }

      bctx.putImageData(imageData, 0, 0)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(buf, 0, 0, bw, bh, 0, 0, canvas.width, canvas.height)

      if (grainAlpha > 0) {
        ctx.globalCompositeOperation = 'overlay'
        ctx.globalAlpha = grainAlpha
        const pattern = ctx.createPattern(grainTile, 'repeat')
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      }
    }

    resize()

    // Only run while the section is on screen — a full-bleed per-pixel loop is
    // not worth spending frames on when it is scrolled away.
    let raf = 0
    let start = 0
    let visible = true

    const frame = (now) => {
      if (!start) start = now
      draw((now - start) / 1000)
      raf = requestAnimationFrame(frame)
    }

    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const play = () => {
      if (!raf) raf = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      draw(0)
    } else {
      play()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (reduceMotion) return
        if (visible) play()
        else stop()
      },
      { rootMargin: '120px' }
    )
    io.observe(canvas)

    const onResize = () => {
      resize()
      if (reduceMotion || !visible) draw(0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [config])

  return <canvas ref={canvasRef} className={`ribbon-field ${className}`.trim()} aria-hidden="true" />
}
