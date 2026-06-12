import PageHero from '../components/PageHero'
import About from '../components/About'
import StatsStrip from '../components/StatsStrip'
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

      <StatsStrip />

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

      {/* Founder / Leadership */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our Leadership"
            title="The Visionary Behind"
            accent="Dawn High School"
          />
          <Reveal className="founder-card">
            <div className="founder-photo">
              <img
                src="/founder.jpg"
                alt="Janab Razi-ur-Rahman Sahab, Founder of Dawn High School"
                loading="lazy"
              />
            </div>
            <div className="founder-bio">
              <h3>Janab Razi-ur-Rahman Sahab</h3>
              <span className="founder-role">Founder</span>
              <p>
                A visionary educator and the guiding spirit behind Dawn High School,
                Janab Razi-ur-Rahman Sahab believed that education is the truest path to
                dignity, opportunity, and lasting change. With unwavering commitment, he
                laid the foundation of an institution rooted in knowledge, character, and
                service to the community.
              </p>
              <p>
                His vision was simple yet profound — to create a school where every child,
                regardless of background, could learn with confidence and grow into a
                responsible, compassionate citizen. That vision continues to shape the
                values, culture, and aspirations of Dawn High School to this day.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recognition / award */}
      <section className="section section-alt">
        <div className="container">
          <div className="award-card">
            <Reveal className="award-copy">
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>Recognition &amp; Honours</span>
              <h2>Celebrating Excellence at Dawn</h2>
              <p>
                Dawn High School takes pride in recognising and rewarding excellence — among
                students, educators, and the wider community that makes our mission possible.
              </p>
              <ul className="award-points">
                <li><i>★</i> Honouring outstanding academic and co-curricular achievement</li>
                <li><i>★</i> Felicitating distinguished guests and community leaders</li>
                <li><i>★</i> Celebrating the dedication of our teachers and staff</li>
                <li><i>★</i> Building a culture that values merit, effort, and character</li>
              </ul>
            </Reveal>
            <Reveal className="award-photo" delay={1}>
              <img
                src="/dawn-award.jpg"
                alt="Dawn High School honouring excellence at an award ceremony"
                loading="lazy"
              />
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
