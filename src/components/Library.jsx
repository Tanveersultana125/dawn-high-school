import { Link } from 'react-router-dom'
import { Reveal, SectionHead, Counter } from './common'

const STATS = [
  { value: 30000, suffix: '+', label: 'Books & Volumes' },
  { value: 12000, suffix: '+', label: 'E-Books & Journals' },
  { value: 120, suffix: '', label: 'Quiet Reading Seats' },
  { value: 7, suffix: '', label: 'Days a Week Open' },
]

const FEATURES = [
  'Digital catalogue & online book reservations',
  'Silent study zones and group discussion pods',
  'E-learning lab with research databases',
  'Dedicated reading programs led by librarians',
]

// Extra detail shown only on the Campus page (detailed variant)
const COLLECTIONS = [
  { ic: '📚', t: 'Reference & Lending', d: 'Curriculum titles, encyclopedias, atlases, and a rich lending collection across every subject and grade.', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=80' },
  { ic: '💻', t: 'Digital Research Commons', d: 'Access to e-books, online journals, and subscription databases for project work and competitive-exam prep.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80' },
  { ic: '🧒', t: "Children's Reading Corner", d: 'A colourful early-years zone with picture books and story-time sessions to build a lifelong love of reading.', img: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=700&q=80' },
  { ic: '🗞️', t: 'Periodicals & Archives', d: 'Daily newspapers, magazines, and a growing archive of student publications and school records.', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=700&q=80' },
]

// Default image (Campus page); Home passes its own via the `img` prop
const LIBRARY_IMG =
  'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1100&q=80'

// Gallery shown only on the Campus page (detailed variant)
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80', cap: 'Reading & Reference Halls' },
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', cap: 'Quiet Study Spaces' },
  { src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80', cap: 'Curated Collections' },
]

export default function Library({ alt = false, detailed = false, img = LIBRARY_IMG }) {
  return (
    <section className={`section library ${alt ? 'section-alt' : ''}`} id="library">
      <div className="container">
        <div className="library-grid">
          <Reveal className="library-media">
            <img src={img} alt="The Dawn Library reading hall" loading="lazy" />
            <div className="library-badge">
              <b>30,000+</b>
              <span>Volumes On Shelf</span>
            </div>
          </Reveal>

          <Reveal className="library-copy" delay={1}>
            <SectionHead
              eyebrow="The Library"
              title="A Home for"
              accent="Curious Minds"
              lead="At the heart of campus, our Library & Learning Resource Centre is a calm, light-filled space where students read, research, and discover. From a 30,000-volume collection to a digital research commons, every learner finds room to grow."
            />

            <div className="library-stats">
              {STATS.map((s) => (
                <div className="library-stat" key={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <ul className="library-features">
              {FEATURES.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {!detailed && (
              <Link to="/campus" className="btn btn-gold" style={{ marginTop: 28 }}>
                Explore the Campus
              </Link>
            )}
          </Reveal>
        </div>

        {detailed && (
          <div className="library-gallery">
            {GALLERY.map((g, i) => (
              <Reveal className="library-shot" delay={(i % 3) + 1} key={g.cap}>
                <img src={g.src} alt={g.cap} loading="lazy" />
                <span className="library-shot-cap">{g.cap}</span>
              </Reveal>
            ))}
          </div>
        )}

        {detailed && (
          <div className="library-collections">
            {COLLECTIONS.map((c, i) => (
              <Reveal className="library-collection" delay={(i % 4) + 1} key={c.t}>
                <div className="lc-media">
                  <img src={c.img} alt={c.t} loading="lazy" />
                </div>
                <span className="lc-ic">{c.ic}</span>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </Reveal>
            ))}
          </div>
        )}

        {detailed && (
          <Reveal className="library-hours">
            <span className="lh-label">Library Hours</span>
            <div className="lh-rows">
              <div><b>Mon – Fri</b><span>8:00 AM – 5:00 PM</span></div>
              <div><b>Saturday</b><span>9:00 AM – 1:00 PM</span></div>
              <div><b>Sunday</b><span>Closed</span></div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
