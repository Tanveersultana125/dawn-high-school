/*
 * Soft-3D illustrations for the "Classes We Offer" grade cards. Drawn inline as
 * SVG rather than shipped as images so they stay crisp at any size and cost no
 * extra requests.
 *
 * Every icon is built from the site palette only — navy, royal blue and gold —
 * so the row reads as one family. Each is a ground shadow, two or three
 * gradient-filled shapes, then white highlight overlays for the lit faces.
 */

/** Play School — stacked alphabet blocks with a ball and a star. */
export const BlocksArt = (
  <svg viewBox="0 0 64 64" fill="none" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="ga-blk-royal" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stopColor="#8fb6fb" />
        <stop offset="1" stopColor="#1450c8" />
      </linearGradient>
      <linearGradient id="ga-blk-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
      <linearGradient id="ga-blk-ball" x1="0.2" y1="0" x2="0.9" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0e2a5e" />
      </linearGradient>
    </defs>

    <ellipse cx="32" cy="56" rx="21" ry="3.6" fill="#0a1f44" opacity=".13" />

    {/* back cube */}
    <rect x="9" y="17" width="21" height="21" rx="5" fill="url(#ga-blk-royal)" />
    <path d="M14 17h11a5 5 0 0 1 5 5v1H9v-1a5 5 0 0 1 5-5Z" fill="#fff" opacity=".26" />
    <text
      x="19.5"
      y="32"
      textAnchor="middle"
      fill="#fff"
      fontSize="13"
      fontWeight="800"
      fontFamily="system-ui, sans-serif"
    >
      A
    </text>

    {/* ball */}
    <circle cx="17" cy="46" r="8.5" fill="url(#ga-blk-ball)" />
    <circle cx="14" cy="42.5" r="3" fill="#fff" opacity=".38" />

    {/* front cube */}
    <rect x="28" y="33" width="23" height="23" rx="5.5" fill="url(#ga-blk-gold)" />
    <path d="M33.5 33H45a5.5 5.5 0 0 1 5.5 5.5v1h-23v-1A5.5 5.5 0 0 1 33.5 33Z" fill="#fff" opacity=".34" />
    <text
      x="39.5"
      y="49.5"
      textAnchor="middle"
      fill="#fff"
      fontSize="14"
      fontWeight="800"
      fontFamily="system-ui, sans-serif"
    >
      B
    </text>

    {/* star */}
    <path
      d="m48 12 2.1 4.4 4.8.6-3.5 3.3.9 4.8-4.3-2.3-4.3 2.3.9-4.8-3.5-3.3 4.8-.6L48 12Z"
      fill="url(#ga-blk-gold)"
    />
  </svg>
)

/** Primary — open book with a pencil. */
export const BookArt = (
  <svg viewBox="0 0 64 64" fill="none" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="ga-bk-cover" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0e2a5e" />
      </linearGradient>
      <linearGradient id="ga-bk-page" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e2eaf7" />
      </linearGradient>
      <linearGradient id="ga-bk-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
    </defs>

    <ellipse cx="32" cy="55" rx="22" ry="3.6" fill="#0a1f44" opacity=".14" />

    {/* covers */}
    <path d="M32 20 12 25v25l20-5V20Z" fill="url(#ga-bk-cover)" />
    <path d="M32 20l20 5v25l-20-5V20Z" fill="url(#ga-bk-cover)" opacity=".8" />

    {/* pages */}
    <path d="M31 23 15 27.2v19.4L31 42.4V23Z" fill="url(#ga-bk-page)" />
    <path d="M33 23l16 4.2v19.4L33 42.4V23Z" fill="url(#ga-bk-page)" opacity=".92" />
    <path d="M18.5 32.5 27.5 30M18.5 37 27.5 34.5" stroke="#a9bcd8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36.5 30l9 2.5M36.5 34.5l9 2.5" stroke="#a9bcd8" strokeWidth="1.5" strokeLinecap="round" />

    {/* spine */}
    <path d="M31 23h2v19.4h-2z" fill="#0a1f44" opacity=".38" />

    {/* pencil */}
    <g transform="rotate(38 46 26)">
      <rect x="42.5" y="8" width="7" height="22" rx="1.6" fill="url(#ga-bk-gold)" />
      <rect x="42.5" y="8" width="3" height="22" fill="#fff" opacity=".32" />
      <path d="M42.5 30h7l-3.5 6-3.5-6Z" fill="#f3e7cb" />
      <path d="m44.6 33.6 1.4 2.4 1.4-2.4h-2.8Z" fill="#0a1f44" />
      <rect x="42.5" y="5" width="7" height="3.4" rx="1.2" fill="#c2ccdb" />
    </g>
  </svg>
)

/** Middle — microscope with a flask. */
export const ScienceArt = (
  <svg viewBox="0 0 64 64" fill="none" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="ga-sci-navy" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#061128" />
      </linearGradient>
      <linearGradient id="ga-sci-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#eef3fc" />
        <stop offset="1" stopColor="#c2ccdb" />
      </linearGradient>
      <linearGradient id="ga-sci-liquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
    </defs>

    <ellipse cx="32" cy="55" rx="22" ry="3.6" fill="#0a1f44" opacity=".14" />

    {/* microscope */}
    <rect x="14" y="48" width="26" height="5" rx="2.5" fill="url(#ga-sci-navy)" />
    <path d="M22 48c0-9 4-13 9-14.5" stroke="url(#ga-sci-navy)" strokeWidth="4" strokeLinecap="round" />
    <rect x="26" y="40" width="14" height="3.6" rx="1.8" fill="url(#ga-sci-glass)" />
    <g transform="rotate(20 31 22)">
      <rect x="27" y="8" width="9" height="22" rx="3" fill="url(#ga-sci-navy)" />
      <rect x="27" y="8" width="3.4" height="22" fill="#fff" opacity=".3" />
      <rect x="28.4" y="29" width="6.2" height="5" rx="1.6" fill="#061128" />
    </g>
    <rect x="20" y="6" width="12" height="4" rx="2" fill="url(#ga-sci-glass)" transform="rotate(20 26 8)" />

    {/* flask */}
    <path
      d="M40 30h8v7.5l6 11.2c1 1.9-.3 4.3-2.5 4.3H36.5c-2.2 0-3.5-2.4-2.5-4.3L40 37.5V30Z"
      fill="url(#ga-sci-glass)"
      opacity=".8"
    />
    <path d="M37 43.5h14l3.5 5.2c1 1.9-.3 4.3-2.5 4.3H36c-2.2 0-3.5-2.4-2.5-4.3l3.5-5.2Z" fill="url(#ga-sci-liquid)" />
    <circle cx="41" cy="48.5" r="1.6" fill="#fff" opacity=".55" />
    <circle cx="46.5" cy="46.8" r="1.1" fill="#fff" opacity=".45" />
    <rect x="38.5" y="27.5" width="11" height="3.4" rx="1.7" fill="url(#ga-sci-navy)" />
  </svg>
)

/** High School — graduation cap on a stack of books. */
export const GraduateArt = (
  <svg viewBox="0 0 64 64" fill="none" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="ga-grd-navy" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0a1f44" />
      </linearGradient>
      <linearGradient id="ga-grd-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
      <linearGradient id="ga-grd-royal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#1450c8" />
      </linearGradient>
    </defs>

    <ellipse cx="32" cy="56" rx="22" ry="3.6" fill="#0a1f44" opacity=".14" />

    {/* book stack */}
    <rect x="12" y="47" width="38" height="7" rx="2.4" fill="url(#ga-grd-gold)" />
    <rect x="12" y="47" width="38" height="2.4" rx="1.2" fill="#fff" opacity=".3" />
    <rect x="15" y="40" width="34" height="7" rx="2.4" fill="url(#ga-grd-royal)" />
    <rect x="15" y="40" width="34" height="2.4" rx="1.2" fill="#fff" opacity=".26" />
    <rect x="18" y="33.5" width="29" height="6.5" rx="2.2" fill="#dfe8f7" />
    <rect x="18" y="33.5" width="29" height="2.2" rx="1.1" fill="#fff" opacity=".75" />

    {/* cap */}
    <path d="M32 8 8 18l24 10 24-10L32 8Z" fill="url(#ga-grd-navy)" />
    <path d="M32 8 8 18l24 10 4-12-4-8Z" fill="#fff" opacity=".18" />
    <path d="M20 23v7c0 3.3 5.4 6 12 6s12-2.7 12-6v-7l-12 5-12-5Z" fill="url(#ga-grd-navy)" opacity=".85" />
    <path d="M54 19v11" stroke="url(#ga-grd-gold)" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="54" cy="32" r="3.2" fill="url(#ga-grd-gold)" />

    {/* star */}
    <path
      d="m13 24 1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9-3.6 1.9.7-4-3-2.9 4.1-.6L13 24Z"
      fill="url(#ga-grd-gold)"
    />
  </svg>
)

/** Small filled check used for each card's bullet list. */
export const CheckMark = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="currentColor" opacity=".14" />
    <path
      d="m6 10.3 2.7 2.7L14 7.7"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
