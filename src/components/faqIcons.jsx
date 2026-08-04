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

/** Scholarships — award medal. */
export const ScholarshipIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.4 13.6-1.6 7.4 5.2-2.6 5.2 2.6-1.6-7.4" strokeLinejoin="round" />
    <path d="m12 6.4 1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2L8.8 8.7l2.2-.3 1-2Z" strokeLinejoin="round" opacity=".75" />
  </svg>
)

/** Mid-year admissions — transfer arrows. */
export const TransferIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 8h13M13.5 4.5 17 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16H7M10.5 12.5 7 16l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
