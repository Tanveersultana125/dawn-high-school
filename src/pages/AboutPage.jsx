import { motion } from 'framer-motion'
import About from '../components/About'
import StatsStrip from '../components/StatsStrip'
import Achievements from '../components/Achievements'
import { Reveal, SectionHead } from '../components/common'
import Meteors from '../components/Meteors'
import BackgroundBoxes from '../components/BackgroundBoxes'
import SmartImage from '../components/SmartImage'
import { usePageImage } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

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

// ---- Value-card interactivity: cursor spotlight glow + 3D tilt ----
// Stateless handlers using e.currentTarget, so they can be shared by every card.
const onValueMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  el.style.setProperty('--rx', (((y - r.height / 2) / (r.height / 2)) * -7).toFixed(2) + 'deg')
  el.style.setProperty('--ry', (((x - r.width / 2) / (r.width / 2)) * 7).toFixed(2) + 'deg')
  el.style.setProperty('--glow-x', ((x / r.width) * 100).toFixed(1) + '%')
  el.style.setProperty('--glow-y', ((y / r.height) * 100).toFixed(1) + '%')
}
const onValueEnter = (e) => e.currentTarget.classList.add('tilting')
const onValueLeave = (e) => {
  const el = e.currentTarget
  el.classList.remove('tilting')
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

// Vision & Mission reveal: three equal-size cards (Vision, Mission, Photo) that
// rise into view one after another.
const vmContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}
const vmCardV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const vmImgV = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function AboutPage() {
  const visionImg = usePageImage('about.vision', 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1100&q=80')
  const founderImg = usePageImage('about.founder', '/founder.jpg')
  const leadershipImg = usePageImage('about.leadership', '/khurram.png')
  const awardImg = usePageImage('about.award', '/dawn-award.jpg')
  const txt = usePageTextResolver()
  return (
    <>
      <About />

      <StatsStrip />

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <h2 className="vm-title">
            {txt('about.vm.title', 'Our')} <span className="accent">{txt('about.vm.accent', 'Vision & Mission')}</span>
          </h2>

          <motion.div
            className="vm-grid"
            variants={vmContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="vm-copy">
              <motion.div className="vm-block" variants={vmCardV}>
                <span className="vm-ic" aria-hidden="true">🎯</span>
                <h4>Vision</h4>
                <p>
                  {txt('about.vm.vision', 'To be the most trusted institution of learning in the region — empowering students through knowledge, character, and global readiness.')}
                </p>
              </motion.div>

              <motion.div className="vm-block" variants={vmCardV}>
                <span className="vm-ic" aria-hidden="true">🧭</span>
                <h4>Mission</h4>
                <p>
                  {txt('about.vm.mission', 'Rooted in tradition, Dawn fosters compassionate, competent, and future-ready citizens by providing a nurturing, inclusive, and innovative learning environment.')}
                </p>
              </motion.div>
            </div>

            <motion.div className="vm-visual" variants={vmImgV}>
              <SmartImage
                src={visionImg}
                alt="Dawn High School students learning together"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder / Leadership */}
      <section className="section leadership-section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('about.lead.eyebrow', 'Our Leadership')}
            title={txt('about.lead.title', 'The Visionary Behind')}
            accent={txt('about.lead.accent', 'Dawn High School')}
          />
          <Reveal className="founder-card">
            <div className="founder-photo">
              <SmartImage
                src={founderImg}
                alt="Janab Razi-ur-Rahman Sahab, Founder of Dawn High School"
                loading="lazy"
              />
            </div>
            <div className="founder-bio">
              <h3>{txt('about.founder.name', 'Janab Razi-ur-Rahman Sahab')}</h3>
              <span className="founder-role">{txt('about.founder.role', 'Founder')}</span>
              <p>
                {txt('about.founder.p1', 'A visionary educator and the guiding spirit behind Dawn High School, Janab Razi-ur-Rahman Sahab believed that education is the truest path to dignity, opportunity, and lasting change. With unwavering commitment, he laid the foundation of an institution rooted in knowledge, character, and service to the community.')}
              </p>
              <p>
                {txt('about.founder.p2', 'His vision was simple yet profound — to create a school where every child, regardless of background, could learn with confidence and grow into a responsible, compassionate citizen. That vision continues to shape the values, culture, and aspirations of Dawn High School to this day.')}
              </p>
            </div>
          </Reveal>

          <Reveal className="founder-card alt" delay={1}>
            <div className="founder-photo">
              <SmartImage
                src={leadershipImg}
                alt="Mr. Fazlur Rahman Khurram, Dawn High School"
                loading="lazy"
              />
            </div>
            <div className="founder-bio">
              <h3>{txt('about.leader.name', 'Mr. Fazlur Rahman Khurram')}</h3>
              <span className="founder-role">{txt('about.leader.role', 'Leadership')}</span>
              <p>
                {txt('about.leader.p1', "A dedicated leader carrying forward the founding vision of Dawn High School, Mr. Fazlur Rahman Khurram brings warmth, discipline, and a deep commitment to nurturing every student's potential.")}
              </p>
              <p>
                {txt('about.leader.p2', 'Under his guidance, the school continues to uphold its tradition of academic excellence, strong values, and care for the community — ensuring that the legacy of Dawn grows stronger with each passing year.')}
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
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>{txt('about.rec.eyebrow', 'Recognition & Honours')}</span>
              <h2>{txt('about.rec.title', 'Celebrating Excellence at Dawn')}</h2>
              <p>
                {txt('about.rec.desc', 'Dawn High School takes pride in recognising and rewarding excellence — among students, educators, and the wider community that makes our mission possible.')}
              </p>
              <ul className="award-points">
                <li><i>★</i> {txt('about.rec.point.1', 'Honouring outstanding academic and co-curricular achievement')}</li>
                <li><i>★</i> {txt('about.rec.point.2', 'Felicitating distinguished guests and community leaders')}</li>
                <li><i>★</i> {txt('about.rec.point.3', 'Celebrating the dedication of our teachers and staff')}</li>
                <li><i>★</i> {txt('about.rec.point.4', 'Building a culture that values merit, effort, and character')}</li>
              </ul>
            </Reveal>
            <Reveal className="award-photo" delay={1}>
              <SmartImage
                src={awardImg}
                alt="Dawn High School honouring excellence at an award ceremony"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section section-dark journey-section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('about.journey.eyebrow', 'Our Journey')}
            title={txt('about.journey.title', 'Two Decades of')}
            accent={txt('about.journey.accent', 'Growth')}
          />
          <div className="grid cols-4">
            {JOURNEY.map((j, i) => (
              <Reveal className="card journey-card" delay={(i % 4) + 1} key={j.year}>
                <Meteors number={12} />
                <div className="why-num">{txt(`about.journey.${i + 1}.year`, j.year)}</div>
                <h3>{txt(`about.journey.${i + 1}.title`, j.title)}</h3>
                <p>{txt(`about.journey.${i + 1}.desc`, j.desc)}</p>
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
            eyebrow={txt('about.values.eyebrow', 'Core Values')}
            title={txt('about.values.title', 'Our Core')}
            accent={txt('about.values.accent', 'Values')}
            lead={txt('about.values.lead', 'We believe values are the foundation of meaningful education. At Dawn, our core values are reflected in every aspect of school life — from classrooms and curriculum to community initiatives.')}
          />
          <div className="values-wrap">
            {VALUES.map((v, i) => (
              <Reveal
                className="value-card"
                delay={(i % 3) + 1}
                key={v.t}
                onMouseEnter={onValueEnter}
                onMouseMove={onValueMove}
                onMouseLeave={onValueLeave}
              >
                <BackgroundBoxes rows={26} cols={16} className="value-boxes" />
                <div className="value-mask" aria-hidden="true" />
                <div className="value-inner">
                  <div className="value-ic">{v.ic}</div>
                  <h3>{txt(`about.values.${i + 1}.t`, v.t)}</h3>
                  <p>{txt(`about.values.${i + 1}.d`, v.d)}</p>
                </div>
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
              {txt('about.principal.quote', 'At Dawn, we don’t just prepare students for examinations — we prepare them for life. Every child who walks through our gates carries the potential to change the world, and it is our privilege to help them discover it.')}
            </p>
            <div className="who">
              {txt('about.principal.name', 'Dr. Eleanor Hayes')}
              <small>{txt('about.principal.role', 'Principal, Dawn High School')}</small>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
