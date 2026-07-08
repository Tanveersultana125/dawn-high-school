import { Link } from 'react-router-dom'
import { Reveal } from './common'
import SmartImage from './SmartImage'

// Swap this with your own happy-student photo any time.
const STUDENT_IMG = '/student-kid.png'

const AVATARS = [
  'linear-gradient(160deg,#1450c8,#4f86f7)',
  'linear-gradient(160deg,#f59e0b,#fbbf24)',
  'linear-gradient(160deg,#ef4444,#fb7185)',
  'linear-gradient(160deg,#10b981,#34d399)',
]

export default function BetterFuture() {
  const watch = (e) => {
    e.preventDefault()
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="section bf-section" id="better-future">
      <div className="container bf-grid">
        <Reveal className="bf-copy">
          <span className="eyebrow">Admissions Open 2026</span>
          <h2 className="bf-title">
            Better future <br />for your <span className="bf-accent">kids</span>
          </h2>
          <p className="bf-sub">
            We don’t just give our students lectures — we give them real-life experiments,
            workshops, and hands-on field experience that shape confident, curious learners.
          </p>

          <div className="bf-actions">
            <Link to="/admissions" className="bf-btn-primary">Get Started</Link>
            <a href="#home" onClick={watch} className="bf-btn-play">
              <span className="bf-play">▶</span> Watch Video
            </a>
          </div>

          <div className="bf-enrol">
            <div className="bf-avatars">
              {AVATARS.map((g, i) => (
                <span key={i} className="bf-av" style={{ background: g }} />
              ))}
            </div>
            <div className="bf-enrol-txt">
              <b>5k+</b> <span>Happy Enrolments</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="bf-visual" delay={1}>
          {/* The photo is a complete composed graphic (blocks, sparkles and the
              "admission completed" card are already part of the image), so we
              simply present it in a clean frame — no duplicate decorations. */}
          <div className="bf-photo-frame">
            <SmartImage src={STUDENT_IMG} alt="A happy Dawn High School student" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
