/*
 * Icons for the four admission steps. Drawn inline as SVG so they stay crisp,
 * cost no extra requests, and sit on the accent-coloured badge as flat white
 * marks — the badge itself supplies the gradient and highlight.
 */

/** Step 1 — two chat bubbles. */
export const EnquireIcon = (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-hidden="true">
    <path
      d="M6 8.5A2.5 2.5 0 0 1 8.5 6h11A2.5 2.5 0 0 1 22 8.5v6a2.5 2.5 0 0 1-2.5 2.5H13l-4.6 3.4A.6.6 0 0 1 7.5 20v-3h1A2.5 2.5 0 0 1 6 14.5v-6Z"
      fill="#fff"
    />
    <circle cx="11" cy="11.5" r="1.3" fill="currentColor" />
    <circle cx="14.5" cy="11.5" r="1.3" fill="currentColor" />
    <circle cx="18" cy="11.5" r="1.3" fill="currentColor" />
    <path
      d="M24.5 13h1A2.5 2.5 0 0 1 28 15.5v5a2.5 2.5 0 0 1-2.5 2.5H24v2.8a.6.6 0 0 1-.96.48L19 23h-2.5a2.5 2.5 0 0 1-2.44-2h6.44a3.5 3.5 0 0 0 3.5-3.5V13Z"
      fill="#fff"
      opacity=".65"
    />
  </svg>
)

/** Step 2 — school building with a flag. */
export const CampusIcon = (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-hidden="true">
    <path d="M16 3v3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16.8 3.2h4.4l-1.4 1.9 1.4 1.9h-4.4V3.2Z" fill="#fff" opacity=".8" />
    <path d="m16 7 9 5v1H7v-1l9-5Z" fill="#fff" />
    <path d="M8.5 14h15v12h-15V14Z" fill="#fff" opacity=".92" />
    <path d="M13.5 19.5h5V26h-5v-6.5Z" fill="currentColor" />
    <rect x="10" y="16.5" width="2.6" height="2.6" rx=".7" fill="currentColor" />
    <rect x="19.4" y="16.5" width="2.6" height="2.6" rx=".7" fill="currentColor" />
    <path d="M6 26h20" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

/** Step 3 — clipboard with a check. */
export const AssessIcon = (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-hidden="true">
    <rect x="7" y="5.5" width="18" height="21" rx="3" fill="#fff" />
    <rect x="11.5" y="3" width="9" height="5" rx="2.2" fill="#fff" opacity=".72" />
    <rect x="11.5" y="3" width="9" height="5" rx="2.2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M11 12.5h6M11 16.5h9M11 20.5h5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      opacity=".55"
    />
    <circle cx="22.5" cy="21.5" r="6" fill="#fff" />
    <circle cx="22.5" cy="21.5" r="6" stroke="currentColor" strokeWidth="1.4" opacity=".3" />
    <path
      d="m19.8 21.6 2 2 3.4-4"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/** Step 4 — enrolled student with a confirmation badge. */
export const EnrollIcon = (
  <svg viewBox="0 0 32 32" fill="none" role="img" aria-hidden="true">
    <circle cx="15" cy="11" r="5.5" fill="#fff" />
    <path d="M5.5 27a9.5 9.5 0 0 1 19 0 1.4 1.4 0 0 1-1.4 1.4H6.9A1.4 1.4 0 0 1 5.5 27Z" fill="#fff" opacity=".92" />
    <circle cx="24" cy="22" r="6.5" fill="#fff" />
    <circle cx="24" cy="22" r="6.5" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
    <path
      d="m21.2 22.1 2 2 3.6-4.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
