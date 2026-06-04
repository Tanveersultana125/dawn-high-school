/** Heraldic school crest — shield with stars, torch of knowledge, and an open book. */
export default function Crest({ className = 'crest' }) {
  return (
    <svg className={className} viewBox="0 0 100 116" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dawn Model High School crest">
      <defs>
        <linearGradient id="crNavy" x1="50" y1="4" x2="50" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1b4488" />
          <stop offset="1" stopColor="#0a1f44" />
        </linearGradient>
        <linearGradient id="crGold" x1="10" y1="6" x2="90" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d98a" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#b8860b" />
        </linearGradient>
      </defs>

      {/* Shield */}
      <path
        d="M50 5 L90 18 V52 C90 78 72 98 50 110 C28 98 10 78 10 52 V18 Z"
        fill="url(#crNavy)"
        stroke="url(#crGold)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Inner hairline border */}
      <path
        d="M50 12 L84 23 V52 C84 74 68 90 50 100 C32 90 16 74 16 52 V23 Z"
        stroke="url(#crGold)"
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* Three stars */}
      <g fill="url(#crGold)">
        <path d="M30 28 l1.3 2.7 2.9 .4 -2.1 2 .5 2.9 -2.6 -1.4 -2.6 1.4 .5 -2.9 -2.1 -2 2.9 -.4 Z" />
        <path d="M50 25 l1.5 3.1 3.4 .5 -2.5 2.4 .6 3.4 -3 -1.6 -3 1.6 .6 -3.4 -2.5 -2.4 3.4 -.5 Z" />
        <path d="M70 28 l1.3 2.7 2.9 .4 -2.1 2 .5 2.9 -2.6 -1.4 -2.6 1.4 .5 -2.9 -2.1 -2 2.9 -.4 Z" />
      </g>

      {/* Torch flame */}
      <path d="M50 43 C45 48.5 46.8 55 50 59 C53.2 55 55 48.5 50 43 Z" fill="url(#crGold)" />
      <path d="M50 48 C48 51 48.4 55 50 57.5 C51.6 55 52 51 50 48 Z" fill="#2563eb" />
      {/* Torch bowl + handle */}
      <path d="M44 59 H56 L54 63 H46 Z" fill="url(#crGold)" />
      <path d="M47.6 63 H52.4 L51 82 H49 Z" fill="url(#crGold)" />

      {/* Open book */}
      <path d="M50 86 C45 83.5 39.5 82.8 34 84 V94 C39.5 92.8 45 93.5 50 96 Z" fill="#f4f7fc" stroke="url(#crGold)" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M50 86 C55 83.5 60.5 82.8 66 84 V94 C60.5 92.8 55 93.5 50 96 Z" fill="#e3eaf7" stroke="url(#crGold)" strokeWidth="1.1" strokeLinejoin="round" />
      <g stroke="#b8860b" strokeOpacity="0.5" strokeWidth="0.8">
        <path d="M37 87 H47" />
        <path d="M37 90 H47" />
        <path d="M53 87 H63" />
        <path d="M53 90 H63" />
      </g>
    </svg>
  )
}
