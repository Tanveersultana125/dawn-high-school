import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

import './ImageTrail.css'

/*
 * Cursor image trail (React Bits, JS + CSS variant).
 *
 * Two changes from the upstream source, both needed because this site is a SPA:
 *  - the pointer plumbing and the rAF loop live on a shared base class with a
 *    destroy(), so leaving the page stops the loop instead of leaking one per
 *    visit. The eight variants keep their own showNextImage() timelines.
 *  - `pointerTarget` lets an outer element (e.g. a whole section) drive the
 *    trail, so content layered above it doesn't create dead zones.
 */

function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

function getLocalPointerPos(e, rect) {
  let clientX = 0,
    clientY = 0
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x
  const dy = p1.y - p2.y
  return Math.hypot(dx, dy)
}

class ImageItem {
  DOM = { el: null, inner: null }
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 }
  rect = null

  constructor(DOM_el) {
    this.DOM.el = DOM_el
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner')
    this.getRect()
    this.initEvents()
  }
  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle)
      this.getRect()
    }
    window.addEventListener('resize', this.resize)
  }
  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect()
  }
  destroy() {
    window.removeEventListener('resize', this.resize)
    gsap.killTweensOf(this.DOM.el)
  }
}

/**
 * Shared state, pointer handling and render loop. Subclasses set `threshold`,
 * `lerpAmount` and `advanceBeforeLerp` to match their upstream behaviour, and
 * implement showNextImage().
 */
class ImageTrailBase {
  // How far the pointer must travel before the next image is released.
  threshold = 80
  // Smoothing applied to the trailing "cached" pointer position.
  lerpAmount = 0.1
  // Variants 4 and 5 advance the trail before smoothing, which changes the
  // direction vector they animate along.
  advanceBeforeLerp = false

  constructor(container) {
    this.container = container
    this.DOM = { el: container }
    this.images = [...container.querySelectorAll('.content__img')].map((img) => new ImageItem(img))
    this.imagesTotal = this.images.length
    this.imgPosition = 0
    this.zIndexVal = 1
    this.activeImagesCount = 0
    this.isIdle = true
    this.destroyed = false
    this.rafId = 0

    this.mousePos = { x: 0, y: 0 }
    this.lastMousePos = { x: 0, y: 0 }
    this.cacheMousePos = { x: 0, y: 0 }

    this.handlePointerMove = (ev) => {
      this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect())
    }
    this.initRender = (ev) => {
      this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect())
      this.cacheMousePos = { ...this.mousePos }
      this.rafId = requestAnimationFrame(() => this.render())
      container.removeEventListener('mousemove', this.initRender)
      container.removeEventListener('touchmove', this.initRender)
    }

    container.addEventListener('mousemove', this.handlePointerMove)
    container.addEventListener('touchmove', this.handlePointerMove)
    container.addEventListener('mousemove', this.initRender)
    container.addEventListener('touchmove', this.initRender)
  }

  render() {
    if (this.destroyed) return

    const distance = getMouseDistance(this.mousePos, this.lastMousePos)
    const advance = () => {
      if (distance > this.threshold) {
        this.showNextImage()
        this.lastMousePos = { ...this.mousePos }
      }
    }

    if (this.advanceBeforeLerp) advance()
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, this.lerpAmount)
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, this.lerpAmount)
    if (!this.advanceBeforeLerp) advance()

    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1

    this.rafId = requestAnimationFrame(() => this.render())
  }

  // Pick the next image in the ring and reset any tween still running on it.
  nextImage() {
    ++this.zIndexVal
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0
    const img = this.images[this.imgPosition]
    gsap.killTweensOf(img.DOM.el)
    return img
  }

  onImageActivated() {
    this.activeImagesCount++
    this.isIdle = false
  }
  onImageDeactivated() {
    this.activeImagesCount--
    if (this.activeImagesCount === 0) this.isIdle = true
  }

  destroy() {
    this.destroyed = true
    cancelAnimationFrame(this.rafId)
    this.container.removeEventListener('mousemove', this.handlePointerMove)
    this.container.removeEventListener('touchmove', this.handlePointerMove)
    this.container.removeEventListener('mousemove', this.initRender)
    this.container.removeEventListener('touchmove', this.initRender)
    this.images.forEach((img) => img.destroy())
  }
}

class ImageTrailVariant1 extends ImageTrailBase {
  showNextImage() {
    const img = this.nextImage()
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3',
          opacity: 0,
          scale: 0.2,
        },
        0.4
      )
  }
}

class ImageTrailVariant2 extends ImageTrailBase {
  showNextImage() {
    const img = this.nextImage()
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2.8,
          filter: 'brightness(250%)',
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%)',
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power2',
          opacity: 0,
          scale: 0.2,
        },
        0.45
      )
  }
}

class ImageTrailVariant3 extends ImageTrailBase {
  showNextImage() {
    const img = this.nextImage()
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          xPercent: 0,
          yPercent: 0,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(img.DOM.inner, { scale: 1.2 }, { duration: 0.4, ease: 'power1', scale: 1 }, 0)
      .to(
        img.DOM.el,
        {
          duration: 0.6,
          ease: 'power2',
          opacity: 0,
          scale: 0.2,
          xPercent: () => gsap.utils.random(-30, 30),
          yPercent: -200,
        },
        0.6
      )
  }
}

class ImageTrailVariant4 extends ImageTrailBase {
  advanceBeforeLerp = true

  showNextImage() {
    const img = this.nextImage()

    let dx = this.mousePos.x - this.cacheMousePos.x
    let dy = this.mousePos.y - this.cacheMousePos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance !== 0) {
      dx /= distance
      dy /= distance
    }
    dx *= distance / 100
    dy *= distance / 100

    const punch = Math.max((400 * distance) / 100, 100)

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        {
          scale: 2,
          filter: `brightness(${punch}%) contrast(${punch}%)`,
        },
        {
          duration: 0.4,
          ease: 'power1',
          scale: 1,
          filter: 'brightness(100%) contrast(100%)',
        },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: 'power3', opacity: 0 }, 0.4)
      .to(
        img.DOM.el,
        { duration: 1.5, ease: 'power4', x: `+=${dx * 110}`, y: `+=${dy * 110}` },
        0.05
      )
  }
}

class ImageTrailVariant5 extends ImageTrailBase {
  advanceBeforeLerp = true
  lastAngle = 0

  showNextImage() {
    let dx = this.mousePos.x - this.cacheMousePos.x
    let dy = this.mousePos.y - this.cacheMousePos.y
    let angle = Math.atan2(dy, dx) * (180 / Math.PI)
    if (angle < 0) angle += 360
    if (angle > 90 && angle <= 270) angle += 180
    const isMovingClockwise = angle >= this.lastAngle
    this.lastAngle = angle
    const startAngle = isMovingClockwise ? angle - 10 : angle + 10

    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance !== 0) {
      dx /= distance
      dy /= distance
    }
    dx *= distance / 150
    dy *= distance / 150

    const img = this.nextImage()

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          filter: 'brightness(80%)',
          scale: 0.1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotation: startAngle,
        },
        {
          duration: 1,
          ease: 'power2',
          scale: 1,
          filter: 'brightness(100%)',
          x: this.mousePos.x - img.rect.width / 2 + dx * 70,
          y: this.mousePos.y - img.rect.height / 2 + dy * 70,
          rotation: this.lastAngle,
        },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: 'expo', opacity: 0 }, 0.5)
      .to(
        img.DOM.el,
        { duration: 1.5, ease: 'power4', x: `+=${dx * 120}`, y: `+=${dy * 120}` },
        0.05
      )
  }
}

class ImageTrailVariant6 extends ImageTrailBase {
  lerpAmount = 0.3

  mapSpeedToSize(speed, minSize, maxSize) {
    const maxSpeed = 200
    return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1)
  }
  mapSpeedToBrightness(speed, minB, maxB) {
    const maxSpeed = 70
    return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1)
  }
  mapSpeedToBlur(speed, minBlur, maxBlur) {
    const maxSpeed = 90
    return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1)
  }
  mapSpeedToGrayscale(speed, minG, maxG) {
    const maxSpeed = 90
    return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1)
  }

  showNextImage() {
    const dx = this.mousePos.x - this.cacheMousePos.x
    const dy = this.mousePos.y - this.cacheMousePos.y
    const speed = Math.sqrt(dx * dx + dy * dy)

    const img = this.nextImage()

    const scaleFactor = this.mapSpeedToSize(speed, 0.3, 2)
    const brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3)
    const blurValue = this.mapSpeedToBlur(speed, 20, 0)
    const grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0)

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.8,
          ease: 'power3',
          scale: scaleFactor,
          filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(img.DOM.inner, { scale: 2 }, { duration: 0.8, ease: 'power3', scale: 1 }, 0)
      .to(
        img.DOM.el,
        { duration: 0.4, ease: 'power3.in', opacity: 0, scale: 0.2 },
        0.45
      )
  }
}

function getNewPosition(position, offset, arr) {
  const realOffset = Math.abs(offset) % arr.length
  if (position - realOffset >= 0) {
    return position - realOffset
  }
  return arr.length - (realOffset - position)
}

class ImageTrailVariant7 extends ImageTrailBase {
  lerpAmount = 0.3

  constructor(container) {
    super(container)
    this.visibleImagesCount = 0
    this.visibleImagesTotal = Math.min(9, this.imagesTotal - 1)
  }

  // This variant keeps a queue of images on screen, so it retires the oldest
  // one itself rather than fading each image at the end of its own timeline.
  onImageDeactivated() {
    this.activeImagesCount--
  }

  showNextImage() {
    const img = this.nextImage()
    ++this.visibleImagesCount

    const scaleValue = gsap.utils.random(0.5, 1.6)

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .fromTo(
        img.DOM.el,
        {
          scale: scaleValue - Math.max(gsap.utils.random(0.2, 0.6), 0),
          rotationZ: 0,
          opacity: 1,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4,
          ease: 'power3',
          scale: scaleValue,
          rotationZ: gsap.utils.random(-3, 3),
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )

    if (this.visibleImagesCount >= this.visibleImagesTotal) {
      const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images)
      const oldImg = this.images[lastInQueue]
      gsap.to(oldImg.DOM.el, {
        duration: 0.4,
        ease: 'power4',
        opacity: 0,
        scale: 1.3,
        onComplete: () => {
          if (this.activeImagesCount === 0) this.isIdle = true
        },
      })
    }
  }
}

class ImageTrailVariant8 extends ImageTrailBase {
  constructor(container) {
    super(container)
    this.rotation = { x: 0, y: 0 }
    this.cachedRotation = { x: 0, y: 0 }
    this.zValue = 0
    this.cachedZValue = 0
  }

  showNextImage() {
    const rect = this.container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const relX = this.mousePos.x - centerX
    const relY = this.mousePos.y - centerY

    this.rotation.x = -(relY / centerY) * 30
    this.rotation.y = (relX / centerX) * 30
    this.cachedRotation = { ...this.rotation }

    const distanceFromCenter = Math.sqrt(relX * relX + relY * relY)
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
    const proportion = distanceFromCenter / maxDistance
    this.zValue = proportion * 1200 - 600
    this.cachedZValue = this.zValue
    const normalizedZ = (this.zValue + 600) / 1200
    const brightness = 0.2 + normalizedZ * 2.3

    const img = this.nextImage()

    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated(),
      })
      .set(this.DOM.el, { perspective: 1000 }, 0)
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          z: 0,
          scale: 1 + this.cachedZValue / 1000,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
          rotationX: this.cachedRotation.x,
          rotationY: this.cachedRotation.y,
          filter: `brightness(${brightness})`,
        },
        {
          duration: 1,
          ease: 'expo',
          scale: 1 + this.zValue / 1000,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
          rotationX: this.rotation.x,
          rotationY: this.rotation.y,
        },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: 'power2', opacity: 0, z: -800 }, 0.3)
  }
}

const variantMap = {
  1: ImageTrailVariant1,
  2: ImageTrailVariant2,
  3: ImageTrailVariant3,
  4: ImageTrailVariant4,
  5: ImageTrailVariant5,
  6: ImageTrailVariant6,
  7: ImageTrailVariant7,
  8: ImageTrailVariant8,
}

/**
 * @param {string[]} items       image URLs cycled through the trail
 * @param {number}   variant     1–8, each a different animation style
 * @param {Element}  pointerTarget optional outer element whose pointer moves
 *   drive the trail — use it when content sits on top of the trail layer
 * @param {string}   className   extra class on the trail container
 */
export default function ImageTrail({ items = [], variant = 1, pointerTarget = null, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const Cls = variantMap[variant] || variantMap[1]
    const instance = new Cls(containerRef.current)
    return () => instance.destroy()
  }, [variant, items])

  // Mirror pointer moves from an outer element onto the container. The relayed
  // event carries the same client coordinates, so every variant's rect maths is
  // unchanged; it just no longer needs the pointer directly over the layer.
  useEffect(() => {
    const el = containerRef.current
    if (!pointerTarget || !el || pointerTarget === el) return

    const relay = (e) => {
      const touch = e.touches?.[0]
      el.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: touch ? touch.clientX : e.clientX,
          clientY: touch ? touch.clientY : e.clientY,
        })
      )
    }
    pointerTarget.addEventListener('mousemove', relay)
    pointerTarget.addEventListener('touchmove', relay, { passive: true })
    return () => {
      pointerTarget.removeEventListener('mousemove', relay)
      pointerTarget.removeEventListener('touchmove', relay)
    }
  }, [pointerTarget])

  return (
    <div className={`content ${className}`.trim()} ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  )
}
