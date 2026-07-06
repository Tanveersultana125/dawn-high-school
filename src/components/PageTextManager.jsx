import { useEffect, useState } from 'react'
import { getPageText, setPageText, clearPageText } from '../lib/pageText'
import { PAGE_TEXT_GROUPS } from '../lib/pageTextSlots'

/**
 * Admin panel section: edit the wording shown across the public pages. Each
 * field saves to Firestore and the matching page component picks it up
 * automatically. Pass `page` (e.g. "Home") to show only that page's sections.
 */
export default function PageTextManager({ page }) {
  const [saved, setSaved] = useState({})   // committed values from Firestore
  const [drafts, setDrafts] = useState({}) // in-progress edits, keyed by slot
  const [busyKey, setBusyKey] = useState('')
  const [doneKey, setDoneKey] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getPageText().then(setSaved).catch(() => {})
  }, [])

  const groups = page ? PAGE_TEXT_GROUPS.filter((g) => g.page === page) : PAGE_TEXT_GROUPS
  if (groups.length === 0) return null

  // Current value for a field: the live draft if editing, else saved, else default.
  const valueOf = (f) => (f.key in drafts ? drafts[f.key] : (saved[f.key] ?? f.def))
  const isDirty = (f) => f.key in drafts && drafts[f.key] !== (saved[f.key] ?? f.def)
  const isCustom = (f) => f.key in saved && saved[f.key] !== f.def

  const onChange = (key, val) => {
    setDrafts((d) => ({ ...d, [key]: val }))
    setDoneKey('')
  }

  const onSave = async (f) => {
    const val = valueOf(f)
    setBusyKey(f.key)
    setError('')
    try {
      // Empty (or back-to-default) → clear the override so the default returns.
      if (String(val).trim() === '' || val === f.def) {
        await clearPageText(f.key)
        setSaved((s) => {
          const next = { ...s }
          delete next[f.key]
          return next
        })
      } else {
        await setPageText(f.key, val)
        setSaved((s) => ({ ...s, [f.key]: val }))
      }
      setDrafts((d) => {
        const next = { ...d }
        delete next[f.key]
        return next
      })
      setDoneKey(f.key)
    } catch (err) {
      setError(err?.message || 'Could not save.')
    } finally {
      setBusyKey('')
    }
  }

  const onReset = async (f) => {
    setDrafts((d) => {
      const next = { ...d }
      delete next[f.key]
      return next
    })
    if (!(f.key in saved)) return
    setBusyKey(f.key)
    try {
      await clearPageText(f.key)
      setSaved((s) => {
        const next = { ...s }
        delete next[f.key]
        return next
      })
    } catch (err) {
      setError(err?.message || 'Could not reset.')
    } finally {
      setBusyKey('')
    }
  }

  return (
    <section className="page-text">
      {!page && (
        <div className="page-images-head">
          <h2>Text Content</h2>
          <p>Edit the wording shown across the public pages. Changes appear on the live site instantly.</p>
        </div>
      )}

      {error && <div className="admin-error">{error}</div>}

      {groups.map((group) =>
        group.sections.map((section) => (
          <div className="pt-section" key={section.title}>
            <div className="pt-section-head">
              <h3>{section.title}</h3>
              {section.note && <p>{section.note}</p>}
            </div>

            <div className="pt-fields">
              {section.fields.map((f) => {
                const busy = busyKey === f.key
                const dirty = isDirty(f)
                return (
                  <div className={`pt-field ${dirty ? 'is-dirty' : ''}`} key={f.key}>
                    <label htmlFor={`pt-${f.key}`}>
                      {f.label}
                      {isCustom(f) && <span className="pt-badge">Edited</span>}
                    </label>
                    {f.multiline ? (
                      <textarea
                        id={`pt-${f.key}`}
                        rows={3}
                        value={valueOf(f)}
                        onChange={(e) => onChange(f.key, e.target.value)}
                      />
                    ) : (
                      <input
                        id={`pt-${f.key}`}
                        type="text"
                        value={valueOf(f)}
                        onChange={(e) => onChange(f.key, e.target.value)}
                      />
                    )}
                    <div className="pt-actions">
                      <button
                        type="button"
                        className="btn btn-gold btn-sm"
                        disabled={busy || !dirty}
                        onClick={() => onSave(f)}
                      >
                        {busy ? 'Saving…' : dirty ? 'Save' : doneKey === f.key ? '✓ Saved' : 'Saved'}
                      </button>
                      {(isCustom(f) || dirty) && (
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onReset(f)}>
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </section>
  )
}
