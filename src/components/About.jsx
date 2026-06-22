import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SmartImage from './SmartImage'

const HIGHLIGHTS = [
  'Trusted by families for more than two decades',
  'A strong balance of academics and character building',
  'Two welcoming campuses across Hyderabad',
  'A modern, future-ready and globally informed curriculum',
  'A nurturing environment where every student belongs',
]

export default function About() {
  return (
    <section className="section about2" id="about">
      <div className="container">
        <div className="about2-grid">
          <motion.div
            className="about2-visual"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmartImage
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1100&q=80"
              alt="Dawn High School students with their teacher"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            className="about2-copy"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <span className="about2-kicker">About Us</span>

            <h2 className="about2-title">
              Inspiring <strong>Excellence</strong>, Nurturing{' '}
              <strong>Character</strong>, Shaping <strong>Leaders</strong>
            </h2>

            <p>
              Since 2000, Dawn High School has been more than a place of study — it is a
              community where <strong>curiosity is encouraged</strong>, effort is celebrated,
              and every child is known by name. Over the years we have grown into a modern
              institution while holding firmly to the values we started with.
            </p>

            <p>
              We believe real education goes far beyond marks. It is about raising thoughtful,
              kind and capable young people who can <strong>think for themselves and care for
              others</strong>. Through strong academics, creative learning and a culture of
              respect, we prepare students for life — not just for exams.
            </p>

            <h3 className="about2-h">Highlights of Our Journey:</h3>
            <ul className="about2-list">
              {HIGHLIGHTS.map((h) => (
                <li key={h}>
                  <i aria-hidden="true">❯</i>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <Link to="/admissions" className="btn btn-gold about2-btn">
              Admissions Open 2025–26&nbsp;<strong>Register Now</strong>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
