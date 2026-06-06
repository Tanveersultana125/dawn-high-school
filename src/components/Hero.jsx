import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Particles from './Particles'
import { getHeroMedia } from '../lib/settings'
import { isFirebaseConfigured } from '../lib/firebase'
import { highQualityVideo } from '../lib/cloudinary'

// Poster (shows instantly before the video loads, or if it can't load)
const HERO_POSTER =
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80'
// Campus film — higher quality on desktop, lighter clip on small screens
const VIDEO_HD = 'https://videos.pexels.com/video-files/5198159/5198159-hd_1920_1080_25fps.mp4'
const VIDEO_SD = 'https://videos.pexels.com/video-files/5198159/5198159-sd_960_540_25fps.mp4'

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" strokeLinecap="round" />
    <circle cx="12" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
    <path d="M12 21c4.5-4.2 7-7.5 7-11a7 7 0 1 0-14 0c0 3.5 2.5 6.8 7 11Z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
const PenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" strokeLinejoin="round" />
    <path d="M14 6l3 3" strokeLinecap="round" />
  </svg>
)

const ACTIONS = [
  { label: 'Inquire', to: '/contact', Icon: InfoIcon },
  { label: 'Visit', to: '/contact', Icon: PinIcon },
  { label: 'Apply', to: '/admissions', Icon: PenIcon },
]

export default function Hero() {
  const trackRef = useRef(null)
  const mediaRef = useRef(null)
  const copyRef = useRef(null)
  const cueRef = useRef(null)
  const stmtRef = useRef(null)
  const videoRef = useRef(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(true)
  // Admin-managed hero media (overrides the default film when set).
  const [heroMedia, setHeroMedia] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured) return
    let alive = true
    getHeroMedia()
      .then((m) => { if (alive && m?.url) setHeroMedia(m) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  const heroIsImage = heroMedia?.type === 'image'

  // Two-phase scroll: (1) the video card grows into a full-screen background,
  // then (2) the editorial message fades in over the film. Afterwards the next
  // section slides up from below.
  useLayoutEffect(() => {
    const track = trackRef.current
    const media = mediaRef.current
    const copy = copyRef.current
    const cue = cueRef.current
    const stmt = stmtRef.current
    if (!track || !media) return

    const boxInsets = (vw, vh) =>
      vw < 900
        ? { top: 0, left: 0, right: 0, bottom: 0, radius: 0 } // mobile: video is the full-screen backdrop
        : {
            // Never start above the fixed header (~150px) so the card/stat badge
            // is not clipped by the navbar on shorter laptop screens.
            top: Math.max(vh * 0.15, 150),
            left: vw * 0.5,
            right: vw * 0.05,
            bottom: vh * 0.17,
            radius: 26,
          }

    const clamp = (n) => Math.min(Math.max(n, 0), 1)

    const apply = (p) => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const b = boxInsets(vw, vh)
      const pe = clamp(p / 0.4) // expand finishes at 40% of the track
      const f = (a) => (a - a * pe).toFixed(1)
      media.style.top = f(b.top) + 'px'
      media.style.left = f(b.left) + 'px'
      media.style.right = f(b.right) + 'px'
      media.style.bottom = f(b.bottom) + 'px'
      media.style.borderRadius = (b.radius * (1 - pe)).toFixed(1) + 'px'
      media.style.boxShadow = pe > 0.92 ? 'none' : '0 50px 100px rgba(0,0,0,0.5)'
      const badge = media.querySelector('.hero-media-badge')
      if (badge) badge.style.opacity = String(Math.max(0, 1 - pe * 1.8))

      if (copy) {
        copy.style.opacity = String(clamp(1 - p / 0.25))
        copy.style.transform = `translateY(${(-p * 40).toFixed(1)}px)`
      }
      if (cue) cue.style.opacity = String(clamp(1 - p / 0.12))

      if (stmt) {
        // The blue panel sweeps up over the film: rises in from below, holds
        // briefly so it can be read, then continues up and exits off the top —
        // after which the next section (About) follows from below.
        const st = clamp((p - 0.4) / 0.6) // 0 → 1 across the second part
        let ty
        if (st < 0.4) ty = 100 - (st / 0.4) * 100 // rise: +100% → 0
        else if (st < 0.6) ty = 0 // hold centered (readable)
        else ty = -((st - 0.6) / 0.4) * 115 // exit: 0 → -115%
        stmt.style.opacity = '1'
        stmt.style.transform = `translateY(${ty.toFixed(1)}%)`
        stmt.style.pointerEvents = st > 0.38 && st < 0.62 ? 'auto' : 'none'
      }
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      track.classList.remove('is-expand')
      apply(0)
      return
    }
    track.classList.add('is-expand')

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const dist = track.offsetHeight - window.innerHeight
        const p = dist > 0 ? clamp(-track.getBoundingClientRect().top / dist) : 0
        apply(p)
      })
    }
    apply(0)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Pause the film when it scrolls out of view; resume when it returns
  // (unless the visitor paused it manually).
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) {
            video.play().then(() => setPlaying(true)).catch(() => {})
          }
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.05 }
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  // EXPLORE / scroll cue → smoothly scroll past the hero film into the first
  // content section below. Falls back to a one-viewport scroll if it's missing.
  const exploreDown = (e) => {
    e.preventDefault()
    const next = document.getElementById('distinct')
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      userPausedRef.current = false
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      userPausedRef.current = true
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="hero" id="home" ref={trackRef}>
      <div className="hero-sticky">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <Particles />

        <div className="container hero-inner">
          <div className="hero-copy" ref={copyRef}>
            <span className="hero-badge reveal in">
              <i>★</i> Ranked Among Hyderabad&apos;s Top Schools
            </span>

            <h1 className="hero-title">
              <span className="ht-kicker reveal in d1">Shaping</span>
              <span className="ht-serif reveal in d2">Future Leaders</span>
            </h1>

            <p className="hero-sub reveal in d4">
              A world-class learning environment where academic rigor meets innovation,
              character, and limitless ambition.
            </p>

            <div className="hero-actions reveal in d5">
              {ACTIONS.map(({ label, to, Icon }) => (
                <Link className="hero-act" to={to} key={label}>
                  <span className="hero-act-ic"><Icon /></span>
                  <span className="hero-act-label">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-media" ref={mediaRef}>
          {heroIsImage ? (
            <img
              className="hero-video"
              src={heroMedia.url}
              alt="Campus life at Dawn High School"
            />
          ) : (
            <video
              ref={videoRef}
              key={heroMedia?.url || 'default'}
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={HERO_POSTER}
              aria-label="Campus life at Dawn High School"
            >
              {heroMedia?.url ? (
                <source src={highQualityVideo(heroMedia.url)} type="video/mp4" />
              ) : (
                <>
                  <source src={VIDEO_HD} type="video/mp4" media="(min-width: 900px)" />
                  <source src={VIDEO_SD} type="video/mp4" />
                </>
              )}
            </video>
          )}

          {!heroIsImage && (
            <button
              className="hero-play"
              onClick={togglePlay}
              aria-label={playing ? 'Pause campus film' : 'Play campus film'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
          )}

          <div className="hero-media-badge">
            <b>4,200+</b>
            <span>Bright Students</span>
          </div>
        </div>

        {/* Editorial message that fades in over the full-screen film */}
        <div className="hero-statement" ref={stmtRef} aria-hidden="true">
          <div className="container">
            <div className="statement-copy">
              <span className="statement-kicker">At Dawn High School</span>
              <h2 className="statement-title">Every Day is an Exploration</h2>
              <p className="statement-text">
                It is our scale and spirit that let us offer a robust curriculum and rich,
                hands-on learning experiences — yet it is the strength of our close-knit
                community that fosters independence and emboldens young minds to thrive far
                beyond their comfort zone.
              </p>
            </div>
          </div>
          <a href="#distinct" onClick={exploreDown} className="statement-scroll" aria-label="Scroll down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <a href="#distinct" onClick={exploreDown} className="scroll-cue" ref={cueRef} aria-label="Scroll to explore">
          <span className="mouse" />
          Explore
        </a>
      </div>
    </section>
  )
}
