import { motion } from 'framer-motion'
import About from '../components/About'
import StatsStrip from '../components/StatsStrip'
import Achievements from '../components/Achievements'
import { Reveal, SectionHead } from '../components/common'
import SmartImage from '../components/SmartImage'

const JOURNEY = [
  { year: '2000', title: 'Founded', desc: 'Dawn High School opens its doors with 120 students and a bold vision.' },
  { year: '2008', title: 'Campus Expansion', desc: 'A new 12-acre smart campus with advanced science and technology labs.' },
  { year: '2016', title: 'Digital Transformation', desc: 'Every classroom becomes a connected, smart-learning environment.' },
  { year: '2024', title: 'National Recognition', desc: 'Ranked among the region’s top institutions for academic excellence.' },
]

const VALUES = [
  { ic: '🫶', t: 'Empathy', d: 'We teach our students to understand and care for others, fostering kindness and respect in every interaction.' },
  { ic: '🏅', t: 'Excellence', d: 'Pursuing high standards in academics, arts, and personal growth is part of our everyday culture.' },
  { ic: '✊', t: 'Courage', d: 'We encourage bold thinking, resilience, and the confidence to take on new challenges.' },
  { ic: '💡', t: 'Innovation', d: 'We nurture curiosity and creativity, integrating modern tools and teaching methods to prepare students for the future.' },
  { ic: '🧩', t: 'Integrity', d: 'Honesty and strong moral principles form the cornerstone of our community.' },
]

// Vision & Mission reveal: container fires once in view, then plays its children
// in order — text first, image afterwards (controlled, never simultaneous).
const vmContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 2.5 } },
}
const vmCopyV = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}
const vmImgV = {
  hidden: { opacity: 0, x: 90 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutPage() {
  return (
    <>
      <About />

      <StatsStrip />

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <motion.div
            className="vm-grid"
            variants={vmContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="vm-copy" variants={vmCopyV}>
              <h2 className="vm-title">
                Our <span className="accent">Vision &amp; Mission</span>
              </h2>

              <div className="vm-block">
                <h4>Vision</h4>
                <p>
                  <i aria-hidden="true">❯</i>
                  To be the most trusted institution of learning in the region — empowering
                  students through knowledge, character, and global readiness.
                </p>
              </div>

              <div className="vm-block">
                <h4>Mission</h4>
                <p>
                  <i aria-hidden="true">❯</i>
                  Rooted in tradition, Dawn fosters compassionate, competent, and future-ready
                  citizens by providing a nurturing, inclusive, and innovative learning
                  environment.
                </p>
              </div>
            </motion.div>

            <motion.div className="vm-visual" variants={vmImgV}>
              <SmartImage
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1100&q=80"
                alt="Dawn High School students learning together"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
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
              <SmartImage
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
              <SmartImage
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
            title="Our Core"
            accent="Values"
            lead="We believe values are the foundation of meaningful education. At Dawn, our core values are reflected in every aspect of school life — from classrooms and curriculum to community initiatives."
          />
          <div className="values-wrap">
            {VALUES.map((v, i) => (
              <Reveal className="value-card" delay={(i % 3) + 1} key={v.t}>
                <div className="value-ic">{v.ic}</div>
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
