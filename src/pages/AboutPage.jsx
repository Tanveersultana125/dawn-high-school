import PageHero from '../components/PageHero'
import About from '../components/About'
import Achievements from '../components/Achievements'
import { Reveal, SectionHead } from '../components/common'

const JOURNEY = [
  { year: '2000', title: 'Founded', desc: 'Dawn High School opens its doors with 120 students and a bold vision.' },
  { year: '2008', title: 'Campus Expansion', desc: 'A new 12-acre smart campus with advanced science and technology labs.' },
  { year: '2016', title: 'Digital Transformation', desc: 'Every classroom becomes a connected, smart-learning environment.' },
  { year: '2024', title: 'National Recognition', desc: 'Ranked among the region’s top institutions for academic excellence.' },
]

const VALUES = [
  { ic: '⚖️', t: 'Integrity', d: 'We act with honesty and hold ourselves to the highest ethical standards.' },
  { ic: '🏆', t: 'Excellence', d: 'We pursue mastery in everything — from academics to character.' },
  { ic: '🤝', t: 'Respect', d: 'We honour diversity and treat every individual with dignity and care.' },
  { ic: '💡', t: 'Innovation', d: 'We embrace curiosity, creativity, and a future-focused mindset.' },
  { ic: '🌍', t: 'Community', d: 'We grow together — students, parents, and faculty as one family.' },
  { ic: '🌱', t: 'Growth', d: 'We nurture lifelong learners who never stop reaching higher.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="A Legacy of Learning, A Vision for Tomorrow"
        subtitle="For over two decades, Dawn High School has shaped confident, compassionate, and capable global citizens."
        crumb="About"
      />

      <About />

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid cols-2">
            <Reveal className="card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To deliver a world-class, values-driven education that empowers every student
                to think critically, act compassionately, and lead boldly — preparing them to
                thrive in a rapidly changing world.
              </p>
            </Reveal>
            <Reveal className="card" delay={1}>
              <div className="card-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted institution of learning in the region — where academic
                excellence, character, and innovation come together to shape the leaders and
                changemakers of tomorrow.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead center eyebrow="Our Journey" title="Two Decades of" accent="Growth" />
          <div className="grid cols-4">
            {JOURNEY.map((j, i) => (
              <Reveal className="card" delay={(i % 4) + 1} key={j.year}>
                <div className="why-num">{j.year}</div>
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Core Values"
            title="What We"
            accent="Stand For"
            lead="Six principles that guide every decision, every lesson, and every relationship at Dawn."
          />
          <div className="grid cols-3">
            {VALUES.map((v, i) => (
              <Reveal className="card" delay={(i % 3) + 1} key={v.t}>
                <div className="card-icon">{v.ic}</div>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <Achievements />

      {/* Principal's message */}
      <section className="section section-alt">
        <div className="container">
          <Reveal className="big-quote">
            <div className="q-mark">“</div>
            <p className="q">
              At Dawn, we don’t just prepare students for examinations — we prepare them for
              life. Every child who walks through our gates carries the potential to change the
              world, and it is our privilege to help them discover it.
            </p>
            <div className="who">
              Dr. Eleanor Hayes
              <small>Principal, Dawn High School</small>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
