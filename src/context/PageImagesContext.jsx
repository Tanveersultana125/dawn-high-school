// Loads the admin-managed page images once and exposes a tiny lookup helper so
// any public page can do `img('about.hero', defaultSrc)` and transparently get
// either the admin override or its built-in default.
import { createContext, useContext, useEffect, useState } from 'react'
import { getPageImages } from '../lib/pageImages'

const PageImagesContext = createContext({ images: {}, ready: false })

export function PageImagesProvider({ children }) {
  const [images, setImages] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    getPageImages()
      .then((m) => { if (alive) setImages(m) })
      .catch(() => {}) // On any error just keep the built-in defaults.
      .finally(() => { if (alive) setReady(true) })
    return () => { alive = false }
  }, [])

  return (
    <PageImagesContext.Provider value={{ images, ready }}>
      {children}
    </PageImagesContext.Provider>
  )
}

// Resolve one slot: a hidden slot ("deleted" in the admin) yields an empty
// string so the component shows nothing; otherwise the custom URL, else the
// built-in default.
function resolve(images, key, fallback) {
  const entry = images?.[key]
  if (!entry) return fallback
  if (entry.hidden) return ''
  return entry.url || fallback
}

/**
 * Resolve a single managed image slot, falling back to the supplied default.
 * @param {string} key      slot key, e.g. 'about.hero'
 * @param {string} fallback the image baked into the component
 * @returns {string} the URL to render ('' when the slot was deleted/hidden)
 */
export function usePageImage(key, fallback) {
  const { images } = useContext(PageImagesContext)
  return resolve(images, key, fallback)
}

/**
 * Returns a `(key, fallback) => url` resolver. Use this in components that map
 * over an array of images so we don't call a hook inside a loop.
 */
export function usePageImageResolver() {
  const { images } = useContext(PageImagesContext)
  return (key, fallback) => resolve(images, key, fallback)
}

/**
 * Returns a `(key, fallback) => objectPosition` resolver for the admin-set focal
 * point of a slot (e.g. "50% 30%"), falling back to the component's default.
 */
export function usePageImagePosResolver() {
  const { images } = useContext(PageImagesContext)
  return (key, fallback = '') => images?.[key]?.pos || fallback
}
