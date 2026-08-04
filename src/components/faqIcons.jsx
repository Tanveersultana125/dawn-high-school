/*
 * Line icons for the admissions FAQ. Stroked in `currentColor` so each row's
 * accent drives them, and drawn inline so they cost no extra requests.
 */

/** Age to apply — calendar. */
export const AgeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" role="img" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    <path d="M7.5 14h3M7.5 17.5h6" strokeLinecap="round" opacity=".65" />
  </svg>
)

/** Entrance test — clipboard with a check. */
export const TestIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" role="img" aria-hidden="true">
    <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="2.5" width="6" height="3.5" rx="1.4" />
    <path d="m8.8 13.4 2.1 2.1 4.3-4.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Scholarships — award medal. */
export const ScholarshipIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" role="img" aria-hidden="true">
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.4 13.6-1.6 7.4 5.2-2.6 5.2 2.6-1.6-7.4" strokeLinejoin="round" />
    <path d="m12 6.4 1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2L8.8 8.7l2.2-.3 1-2Z" opacity=".7" strokeLinejoin="round" />
  </svg>
)

/** Mid-year transfers — arrows exchanging. */
export const TransferIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" role="img" aria-hidden="true">
    <path d="M4 8h13M13.5 4.5 17 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 16H7M10.5 12.5 7 16l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
