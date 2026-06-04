import { Reveal, SectionHead, Counter } from './common'

const POINTS = [
  ['Holistic Curriculum', 'A balanced blend of academics, arts, athletics, and character education.'],
  ['Globally Benchmarked', 'Standards aligned with leading international education frameworks.'],
  ['Future-Ready Skills', 'Critical thinking, coding, communication, and leadership from day one.'],
]

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 4200, suffix: '+', label: 'Student Strength' },
  { value: 320, suffix: '+', label: 'Qualified Faculty' },
  { value: 180, suffix: '+', label: 'Academic Awards' },
]

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-visual">
            <div className="about-frame">
              <div className="campus-illustration" aria-hidden="true">
                <svg width="74%" viewBox="0 0 200 200" fill="none">
                  <rect x="40" y="80" width="120" height="90" rx="6" fill="#13316c" />
                  <rect x="55" y="100" width="18" height="22" rx="2" fill="#e6c768" opacity="0.8" />
                  <rect x="91" y="100" width="18" height="22" rx="2" fill="#e6c768" opacity="0.8" />
                  <rect x="127" y="100" width="18" height="22" rx="2" fill="#e6c768" opacity="0.8" />
                  <rect x="88" y="135" width="24" height="35" rx="2" fill="#0a1f44" />
                  <polygon points="100,40 165,80 35,80" fill="#1450c8" />
                  <polygon points="100,52 150,80 50,80" fill="#2563eb" opacity="0.7" />
                  <rect x="98" y="20" width="4" height="22" fill="#d4af37" />
                  <path d="M102 22 L122 28 L102 34 Z" fill="#d4af37" />
                  <circle cx="100" cy="40" r="4" fill="#e6c768" />
                </svg>
              </div>
              <div className="scene-tag">
                <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>Est. 2000</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', lineHeight: 1.15 }}>
                    A Legacy of Learning, A Vision for Tomorrow
                  </h3>
                </div>
              </div>
            </div>
            <div className="about-quote">
              <p>“We don&apos;t just teach subjects — we nurture leaders.”</p>
              <span>— Dr. Eleanor Hayes, Principal</span>
            </div>
          </Reveal>

          <div className="about-copy">
            <SectionHead
              eyebrow="About Our School"
              title="Where Ambition Meets"
              accent="Achievement"
              lead="For over two decades, Dawn Model High School has been a beacon of educational excellence — combining a rich heritage with cutting-edge teaching to shape confident, compassionate, and capable global citizens."
            />
            <Reveal className="about-points" delay={2}>
              {POINTS.map(([title, desc]) => (
                <div className="about-point" key={title}>
                  <i>✓</i>
                  <div>
                    <b>{title}</b>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="stats-strip">
          {STATS.map((s, i) => (
            <Reveal className="stat" delay={i + 1} key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
