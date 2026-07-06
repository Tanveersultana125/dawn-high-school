import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'
import { usePageImageResolver } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const FEATURES = [
  {
    ic: '🎓',
    t: 'Two Decades of Trust',
    d: 'A nurturing institution since 2000, shaping thousands of confident, capable and caring students.',
  },
  {
    ic: '🌍',
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
              <span className="abx-badge-ic">🏆</span>
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
              <span className="abx-kicker-ic" aria-hidden="true">🏫</span> {txt('about.intro.kicker', 'About Our School')}
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
                <span className="abx-help-ic" aria-hidden="true">📞</span>
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
