/** Dawn High School logo. */
export default function Crest({ className = 'crest' }) {
  return (
    <img
      className={className}
      src="/dawn-logo.png"
      alt="Dawn High School logo"
      width="226"
      height="213"
      loading="eager"
      decoding="async"
    />
  )
}
