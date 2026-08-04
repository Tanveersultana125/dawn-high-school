/*
 * Artwork for the "What you'll need to apply" panel. All inline SVG so it stays
 * crisp and costs no extra requests. The small row icons are stroked in
 * `currentColor`; the badges and the folder scene carry their own gradients in
 * the site's royal-blue and gold.
 */

/* ── Row icons ───────────────────────────────────────────────────────────── */

const doc = (extra) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8l-5-5Z" strokeLinejoin="round" />
    <path d="M14 3v3.4A1.6 1.6 0 0 0 15.6 8H19" strokeLinejoin="round" />
    {extra}
  </svg>
)

/** Application form — lined document. */
export const FormIcon = doc(
  <path d="M8.5 12h7M8.5 15.5h7M8.5 18h4" strokeLinecap="round" />
)

/** Birth certificate — document with a seal. */
export const CertIcon = doc(
  <>
    <path d="M8.5 12h4M8.5 15h3" strokeLinecap="round" />
    <circle cx="14.6" cy="16.4" r="2.4" />
    <path d="m13.1 18.4-.5 2.4 2-1 2 1-.5-2.4" strokeLinejoin="round" />
  </>
)

/** Report cards — document with a grade. */
export const ReportIcon = doc(
  <>
    <path d="M8.5 12h4M8.5 18h6" strokeLinecap="round" />
    <path d="m11.4 15.6 1.6-3.4 1.6 3.4M11.9 14.6h2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.4 13.2h2M17.4 12.2v2" strokeLinecap="round" />
  </>
)

/** Photographs — framed picture. */
export const PhotoIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.6" />
    <circle cx="9" cy="9.8" r="1.8" />
    <path d="m4.5 17 4.6-4.6 3.4 3.4 2.6-2.4 4.4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** ID proof — identity card. */
export const IdIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.6" />
    <circle cx="8.4" cy="11" r="2.2" />
    <path d="M5.2 16.2a3.4 3.4 0 0 1 6.4 0" strokeLinecap="round" />
    <path d="M14.6 10h4.2M14.6 13.2h4.2M14.6 16h2.6" strokeLinecap="round" />
  </svg>
)

/* ── Badges ──────────────────────────────────────────────────────────────── */

/** Clipboard badge beside the heading. */
export const ClipboardBadge = (
  <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ap-clip-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0e2a5e" />
      </linearGradient>
      <linearGradient id="ap-clip-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#ap-clip-bg)" />
    <circle cx="24" cy="21" r="11" fill="#fff" opacity=".16" />
    <rect x="19" y="17" width="26" height="33" rx="4" fill="#fff" />
    <rect x="26" y="12" width="12" height="8" rx="3" fill="url(#ap-clip-gold)" />
    <path
      d="m24.5 29 2 2 3.6-4M24.5 38l2 2 3.6-4"
      stroke="#1450c8"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M33 29h7M33 38h7" stroke="#9db6e6" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

/** Shield badge in the footer note. */
export const ShieldBadge = (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ap-shield" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0e2a5e" />
      </linearGradient>
    </defs>
    <path d="M24 4 8 10.4v11.4C8 32 14.6 40 24 43c9.4-3 16-11 16-21.2V10.4L24 4Z" fill="url(#ap-shield)" />
    <path d="M24 4 8 10.4v11.4C8 27 9.8 31.6 12.8 35L24 4Z" fill="#fff" opacity=".14" />
    <path
      d="m17 23.4 4.6 4.6L31 17.6"
      stroke="#fff"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ── Folder scene ────────────────────────────────────────────────────────── */

/** Documents tucked into an open folder, the panel's showpiece. */
export const FolderArt = (
  <svg viewBox="0 0 210 190" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="ap-fold-front" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stopColor="#4f86f7" />
        <stop offset="1" stopColor="#0e2a5e" />
      </linearGradient>
      <linearGradient id="ap-fold-back" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8fb6fb" />
        <stop offset="1" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="ap-fold-gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e6c768" />
        <stop offset="1" stopColor="#b8860b" />
      </linearGradient>
      <linearGradient id="ap-fold-paper" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#e8eefb" />
      </linearGradient>
    </defs>

    {/* leaves behind the stack */}
    <path d="M28 108c14-6 26-2 32 8-13 6-25 3-32-8Z" fill="#c9dbf9" opacity=".7" />
    <path d="M22 128c15-3 26 3 29 14-14 3-25-3-29-14Z" fill="#dce7fb" opacity=".8" />
    <path d="M186 96c-13 2-21 10-21 21 12-1 20-9 21-21Z" fill="#c9dbf9" opacity=".7" />

    {/* back sheets */}
    <rect x="96" y="34" width="74" height="94" rx="7" fill="url(#ap-fold-back)" opacity=".45" transform="rotate(6 133 81)" />
    <rect x="112" y="52" width="62" height="82" rx="6" fill="url(#ap-fold-gold)" transform="rotate(9 143 93)" />

    {/* front sheet */}
    <rect x="60" y="30" width="88" height="106" rx="8" fill="url(#ap-fold-paper)" />
    <circle cx="84" cy="58" r="12" fill="#c9dbf9" />
    <path d="M74 76a10 10 0 0 1 20 0v1H74v-1Z" fill="#c9dbf9" />
    <path
      d="M104 50h32M104 60h32M74 92h62M74 104h62M74 116h40"
      stroke="#c9dbf9"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* folder body */}
    <path d="M34 92h58l10 12h74a10 10 0 0 1 10 10v52a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10V102a10 10 0 0 1 10-10Z" fill="url(#ap-fold-front)" />
    <path d="M34 92h58l10 12H24v-2a10 10 0 0 1 10-10Z" fill="#fff" opacity=".22" />

    {/* check seal */}
    <circle cx="140" cy="146" r="24" fill="#fff" opacity=".16" />
    <path
      d="m128 146 8 8 16-18"
      stroke="#fff"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* sparkles */}
    <path d="m176 42 2.6 6.4 6.4 2.6-6.4 2.6-2.6 6.4-2.6-6.4-6.4-2.6 6.4-2.6L176 42Z" fill="#b8dbff" />
    <path d="m158 72 1.7 4.2 4.2 1.7-4.2 1.7-1.7 4.2-1.7-4.2-4.2-1.7 4.2-1.7 1.7-4.2Z" fill="#d9e8ff" />
  </svg>
)
