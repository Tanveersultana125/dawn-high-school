import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Chatbot from './Chatbot'

/** Thin gold progress bar that tracks scroll position. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setProgress(scrolled * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background: 'var(--gradient-gold)',
        zIndex: 1100,
        transition: 'width 0.1s linear',
      }}
    />
  )
}

/**
 * Jump to the top whenever the route changes — unless the link carried a hash,
 * in which case scroll to that section instead. React Router does not act on
 * the hash itself, so a link like /gallery#videos would otherwise land at the
 * top of the page.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    // The target section may not be mounted on the first paint after the route
    // change, so retry for a short while before giving up.
    const id = decodeURIComponent(hash.slice(1))
    let frame = 0
    const findAndScroll = (attemptsLeft) => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attemptsLeft > 0) {
        frame = requestAnimationFrame(() => findAndScroll(attemptsLeft - 1))
        return
      }
      // Section never appeared — some render conditionally, e.g. the video
      // gallery hides itself when nothing has been uploaded. Land at the top
      // rather than leaving the page at an arbitrary offset.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    findAndScroll(40)

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
