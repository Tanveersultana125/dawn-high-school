/*
 * Line icons shown beside each admissions FAQ answer. Stroked in `currentColor`
 * so the answer panel's gold drives them, and inline so they cost no requests.
 */

/** Age to apply — a child with a verified badge. */
export const AgeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="10" cy="7" r="3.6" />
    <path d="M3.6 20a6.4 6.4 0 0 1 11.2-4.2" strokeLinecap="round" />
    <path d="M18 12.6l4 1.6v3.2c0 2.4-1.6 4.4-4 5-2.4-.6-4-2.6-4-5v-3.2l4-1.6Z" strokeLinejoin="round" />
    <path d="m16.5 17.4 1.2 1.2 2.3-2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Entrance test — clipboard with ticked items. */
export const TestIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="2.5" width="6" height="3.5" rx="1.4" />
    <path d="m8.4 11.4 1.3 1.3 2.2-2.4M8.4 16.1l1.3 1.3 2.2-2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11.5h2.6M14 16.2h2.6" strokeLinecap="round" />
  </svg>
)

/** Scholarships — graduation cap. */
export const ScholarshipIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z" strokeLinejoin="round" />
    <path d="M6.5 10.8v4.4c0 1.9 2.5 3.4 5.5 3.4s5.5-1.5 5.5-3.4v-4.4" strokeLinecap="round" />
    <path d="M21.5 8.5v5" strokeLinecap="round" />
  </svg>
)

/** Mid-year admissions — a new student. */
export const TransferIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
  </svg>
)

/** Question mark, shown beside the section's intro line. */
export const AskIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M20.5 11.5c0 4.4-3.8 8-8.5 8-1 0-2-.2-2.9-.5L4 20.5l1.6-4.4a7.7 7.7 0 0 1-1.1-4c0-4.4 3.8-8 8.5-8s7.5 3.6 7.5 7.4Z" strokeLinejoin="round" />
    <path d="M10.2 9.4a2 2 0 0 1 3.8.8c0 1.4-2 1.6-2 3" strokeLinecap="round" />
    <path d="M12 15.4h.01" strokeLinecap="round" strokeWidth="2.2" />
  </svg>
)
