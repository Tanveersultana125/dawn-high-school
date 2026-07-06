// Loads the admin-managed text overrides once and exposes a tiny lookup helper
// so any public page can do `txt('home.awards.1.title', defaultText)` and get
// either the admin override or its built-in default.
import { createContext, useContext, useEffect, useState } from 'react'
import { getPageText } from '../lib/pageText'

const PageTextContext = createContext({ text: {}, ready: false })

export function PageTextProvider({ children }) {
  const [text, setText] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    getPageText()
      .then((m) => { if (alive) setText(m) })
      .catch(() => {}) // On any error just keep the built-in defaults.
      .finally(() => { if (alive) setReady(true) })
    return () => { alive = false }
  }, [])

  return (
    <PageTextContext.Provider value={{ text, ready }}>
      {children}
    </PageTextContext.Provider>
  )
}

// A blank override ('' or whitespace) means "use the default", so admins can't
// accidentally wipe a heading to nothing.
function resolve(text, key, fallback) {
  const v = text?.[key]
  return v != null && String(v).trim() !== '' ? v : fallback
}

/**
 * Resolve a single managed text slot, falling back to the supplied default.
 * @param {string} key      slot key, e.g. 'home.awards.1.title'
 * @param {string} fallback the text baked into the component
 */
export function usePageText(key, fallback) {
  const { text } = useContext(PageTextContext)
  return resolve(text, key, fallback)
}

/**
 * Returns a `(key, fallback) => value` resolver. Use this in components that map
 * over an array so we don't call a hook inside a loop.
 */
export function usePageTextResolver() {
  const { text } = useContext(PageTextContext)
  return (key, fallback) => resolve(text, key, fallback)
}
