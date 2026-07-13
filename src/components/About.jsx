import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'
import { usePageImageResolver } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

/* Clean line-icons (lucide-style) replace emojis for a consistent, pro look */
const Icon = {
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2.5 9 2.5 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
}

const FEATURES = [
  {
    ic: Icon.shield,
    t: 'Two Decades of Trust',
    d: 'A nurturing institution since 2000, shaping thousands of confident, capable and caring students.',
  },
  {
    ic: Icon.globe,
    t: 'Globally Connected Learning',
    d: 'An Oxford University Press partner with an internationally informed, future-ready curriculum.',
  },
]

const ease = [0.22, 1, 0.36, 1]

export default function About() {
  const pick = usePageImageResolver()
  const txt = usePageTextResolver()
  return (
    <section className="section abx" id="about">
      <div className="container">
        <div className="abx-grid">
          {/* ---- Image collage ---- */}
          <motion.div
            className="abx-visual"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
          >
            <div className="abx-img abx-main">
              <SmartImage src={pick('about.collage.1', U('photo-1588072432836-e10032774350'))} alt="Dawn High School students with their teacher" loading="lazy" />
            </div>
            <div className="abx-img abx-oval">
              <SmartImage src={pick('about.collage.2', U('photo-1523580494863-6f3031224c94'))} alt="Dawn students celebrating success" loading="lazy" />
            </div>
            <div className="abx-img abx-blob">
              <SmartImage src={pick('about.collage.3', U('photo-1532094349884-543bc11b234d'))} alt="Students in the Dawn science laboratory" loading="lazy" />
            </div>

            <div className="abx-badge">
              <span className="abx-badge-ic">{Icon.trophy}</span>
              <span className="abx-badge-txt">
                <b>25 Years</b>
                <i>Of Excellence</i>
              </span>
            </div>
          </motion.div>

          {/* ---- Copy ---- */}
          <motion.div
            className="abx-copy"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            <span className="abx-kicker">
              <span className="abx-kicker-ic" aria-hidden="true">{Icon.cap}</span> {txt('about.intro.kicker', 'About Our School')}
            </span>

            <h2 className="abx-title">
              {txt('about.intro.title', 'Welcome To')} <span className="accent">{txt('about.intro.accent', 'Dawn High School')}</span>
            </h2>

            <p className="abx-lead">
              {txt('about.intro.lead', 'A trusted name in education since 2000, offering a rich and versatile academic framework that balances strong academics, character, and global readiness.')}
            </p>

            <div className="abx-midgrid">
              <div className="abx-feats">
                {FEATURES.map((f, i) => (
                  <div className="abx-feat" key={f.t}>
                    <span className="abx-feat-ic" aria-hidden="true">{f.ic}</span>
                    <div>
                      <h4>{txt(`about.intro.feat.${i + 1}.t`, f.t)}</h4>
                      <p>{txt(`about.intro.feat.${i + 1}.d`, f.d)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="abx-quote">
                {txt('about.intro.quote', 'Our commitment to excellence and strong values ensures every child receives a world-class education rooted in character.')}
                <span className="abx-quote-mark" aria-hidden="true">”</span>
              </blockquote>
            </div>

            <div className="abx-cta">
              <Link to="/admissions" className="btn btn-gold">{txt('about.intro.cta', 'Admission Process')}&nbsp;→</Link>
              <a href="tel:+918107666766" className="abx-help">
                <span className="abx-help-ic" aria-hidden="true">{Icon.phone}</span>
                <span className="abx-help-txt">
                  <i>{txt('about.intro.helpLabel', 'Admission Helpline')}</i>
                  <b>{txt('about.intro.helpNum', '+91 81076 66766')}</b>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
