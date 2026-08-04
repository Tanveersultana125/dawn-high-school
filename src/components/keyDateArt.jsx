/*
 * Artwork for the Key Dates timeline. Two sets, both drawn inline as SVG in
 * `currentColor` so each row's accent drives them:
 *   - Icon*  — the small line mark inside the round badge on the rail
 *   - Art*   — the large faded illustration sitting inside the card
 */

/* ── Badge icons ─────────────────────────────────────────────────────────── */

export const CalendarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    <path d="M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2M11 17.5h2" strokeLinecap="round" />
  </svg>
)

export const BuildingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="m12 3 9 5H3l9-5Z" strokeLinejoin="round" />
    <path d="M6 11v7M10 11v7M14 11v7M18 11v7" strokeLinecap="round" />
    <path d="M3.5 21h17M4.5 18h15" strokeLinecap="round" />
  </svg>
)

export const ClipboardIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="2.5" width="6" height="3.5" rx="1.4" />
    <path d="m8.4 11.4 1.3 1.3 2.2-2.4M8.4 16.1l1.3 1.3 2.2-2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 11.5h2.5M14 16.2h2.5" strokeLinecap="round" />
  </svg>
)

export const EnvelopeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
    <path d="m3.5 7 8.5 6 8.5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ShieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M12 2.8 4.5 6v6.2c0 4.4 3.1 7.9 7.5 9 4.4-1.1 7.5-4.6 7.5-9V6L12 2.8Z" strokeLinejoin="round" />
    <path d="m8.6 12.2 2.3 2.3 4.5-4.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Card illustrations ──────────────────────────────────────────────────── */

/** Application form with a pencil. */
export const FormArt = (
  <svg viewBox="0 0 120 96" fill="none" aria-hidden="true">
    <path d="M28 10h40l18 18v58a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z" fill="currentColor" opacity=".2" />
    <path d="M68 10l18 18H74a6 6 0 0 1-6-6V10Z" fill="currentColor" opacity=".38" />
    <path
      d="M34 40h30M34 50h38M34 60h34M34 70h22"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      opacity=".55"
    />
    <circle cx="30" cy="26" r="4" fill="currentColor" opacity=".5" />
    <g transform="rotate(38 92 52)">
      <rect x="86" y="20" width="13" height="44" rx="3" fill="currentColor" opacity=".55" />
      <path d="M86 64h13l-6.5 11L86 64Z" fill="currentColor" opacity=".38" />
      <rect x="86" y="14" width="13" height="6" rx="2" fill="currentColor" opacity=".42" />
    </g>
  </svg>
)

/** Campus building flanked by trees. */
export const CampusArt = (
  <svg viewBox="0 0 120 96" fill="none" aria-hidden="true">
    <path d="M60 12 92 30H28l32-18Z" fill="currentColor" opacity=".38" />
    <path d="M60 4v9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".5" />
    <path d="M61 4h11l-3.5 4.5L72 13H61V4Z" fill="currentColor" opacity=".5" />
    <rect x="30" y="32" width="60" height="42" rx="3" fill="currentColor" opacity=".22" />
    <rect x="52" y="50" width="16" height="24" rx="2" fill="currentColor" opacity=".45" />
    <rect x="37" y="42" width="9" height="9" rx="1.6" fill="currentColor" opacity=".45" />
    <rect x="74" y="42" width="9" height="9" rx="1.6" fill="currentColor" opacity=".45" />
    <path d="M22 78h76" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" opacity=".4" />
    <path d="M16 74c0-9 4-15 6-15s6 6 6 15h-12Z" fill="currentColor" opacity=".3" />
    <path d="M92 74c0-9 4-15 6-15s6 6 6 15H92Z" fill="currentColor" opacity=".3" />
  </svg>
)

/** Assessment clipboard beside a student. */
export const AssessArt = (
  <svg viewBox="0 0 120 96" fill="none" aria-hidden="true">
    <rect x="22" y="12" width="56" height="72" rx="7" fill="currentColor" opacity=".2" />
    <rect x="42" y="6" width="18" height="11" rx="4" fill="currentColor" opacity=".42" />
    <path
      d="m31 34 4 4 7-8M31 52l4 4 7-8"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity=".55"
    />
    <path d="M50 34h20M50 52h20M31 70h30" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity=".42" />
    <circle cx="88" cy="54" r="12" fill="currentColor" opacity=".38" />
    <circle cx="88" cy="48" r="5.5" fill="currentColor" opacity=".6" />
    <path d="M79 62a9 9 0 0 1 18 0v2H79v-2Z" fill="currentColor" opacity=".6" />
  </svg>
)

/** Offer letter in an opened envelope. */
export const LetterArt = (
  <svg viewBox="0 0 120 96" fill="none" aria-hidden="true">
    <rect x="36" y="8" width="48" height="42" rx="4" fill="currentColor" opacity=".3" />
    <path d="M44 20h32M44 30h32M44 40h20" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" opacity=".5" />
    <path d="M18 40h84v40a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6V40Z" fill="currentColor" opacity=".25" />
    <path d="M18 40 60 68l42-28" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" opacity=".55" />
    <path d="M18 86 52 60M102 86 68 60" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" opacity=".38" />
  </svg>
)

/** Enrolment confirmed on screen. */
export const EnrolArt = (
  <svg viewBox="0 0 120 96" fill="none" aria-hidden="true">
    <rect x="16" y="14" width="88" height="56" rx="7" fill="currentColor" opacity=".2" />
    <rect x="22" y="20" width="76" height="44" rx="4" fill="currentColor" opacity=".18" />
    <path d="M48 70h24l3 12H45l3-12Z" fill="currentColor" opacity=".32" />
    <path d="M38 86h44" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".4" />
    <circle cx="52" cy="36" r="8" fill="currentColor" opacity=".55" />
    <path d="M39 54a13 13 0 0 1 26 0v2H39v-2Z" fill="currentColor" opacity=".55" />
    <circle cx="82" cy="50" r="13" fill="currentColor" opacity=".55" />
    <path
      d="m76 50 4.4 4.4 8-8.8"
      stroke="#fff"
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
