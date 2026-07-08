import PageHero from '../components/PageHero'
import Academics from '../components/Academics'
import TiltCard from '../components/TiltCard'
import { Reveal, SectionHead } from '../components/common'
import SmartImage from '../components/SmartImage'
import { usePageImage, usePageImageResolver } from '../context/PageImagesContext'
import { usePageTextResolver } from '../context/PageTextContext'

// Achiever gallery: the first is a wide banner, the rest a 2×2 grid of photos.
const EXCEL_IMAGES = [
  { key: 'academics.excel.1', def: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1100&q=80', wide: true },
  { key: 'academics.excel.2', def: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80' },
  { key: 'academics.excel.3', def: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80' },
  { key: 'academics.excel.4', def: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' },
  { key: 'academics.excel.5', def: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80' },
]

const PHILOSOPHY = [
  { ic: '🔍', t: 'Inquiry-Based', d: 'Students learn by questioning, exploring, and discovering — not memorising.' },
  { ic: '🎯', t: 'Personalised', d: 'Adaptive pathways and small class sizes meet every learner where they are.' },
  { ic: '🚀', t: 'Future-Ready', d: 'Coding, critical thinking, and real-world projects from an early age.' },
]

const SUBJECTS = [
  { ic: '🔢', b: 'Mathematics', s: 'Algebra · Calculus · Statistics' },
  { ic: '🧪', b: 'Sciences', s: 'Physics · Chemistry · Biology' },
  { ic: '🌐', b: 'Languages', s: 'English · Urdu · Telugu · Hindi' },
  { ic: '📜', b: 'Humanities', s: 'History · Geography · Civics' },
  { ic: '💻', b: 'Computer Science', s: 'Computer Basics · MS Office · Coding' },
  { ic: '🎨', b: 'Visual & Performing Arts', s: 'Art · Music · Theatre' },
  { ic: '📈', b: 'Commerce', s: 'Economics · Business · Accounts' },
  { ic: '⚽', b: 'Physical Education', s: 'Athletics · Wellness · Teamwork' },
]

const ASSESS = [
  { ic: '📝', t: 'Continuous Assessment', d: 'Regular feedback over high-stakes testing keeps learning on track.' },
  { ic: '🧩', t: 'Project-Based', d: 'Capstone projects and portfolios demonstrate real understanding.' },
  { ic: '📊', t: 'Data-Informed', d: 'Each student’s progress is tracked to personalise support and stretch.' },
]

export default function AcademicsPage() {
  const heroPhoto = usePageImage('academics.hero', '')
  const oxfordImg = usePageImage('academics.oxfordCurriculum', '/oxford-curriculum.png')
  const pickImg = usePageImageResolver()
  const txt = usePageTextResolver()
  return (
    <>
      <PageHero
        variant="academics"
        photo={heroPhoto}
        kicker={txt('academics.hero.kicker', 'Academic Excellence')}
        title={txt('academics.hero.title', 'Programs for Every Stage of Growth')}
        subtitle={txt('academics.hero.subtitle', 'From first steps to final exams, our academic pathways challenge, inspire, and empower students at every level.')}
        crumb="Academics"
      />

      <Academics />

      {/* Our Academic Excellence — achievers & results */}
      <section className="section excel-section">
        <div className="container">
          <div className="excel-grid">
            <Reveal className="excel-copy">
              <span className="excel-eyebrow">{txt('academics.excel.eyebrow', 'Our Achievers')}</span>
              <h2 className="excel-title">
                {txt('academics.excel.title', 'Our Academic')}{' '}
                <span className="excel-accent">{txt('academics.excel.accent', 'Excellence')}</span>
              </h2>
              <span className="excel-rule" aria-hidden="true" />
              <p className="excel-lead">
                {txt('academics.excel.desc', "Dawn High School's outstanding recognition, with top ranks and distinctions in the SSC Telangana State Board examinations.")}
              </p>
              <h3 className="excel-sub">{txt('academics.excel.sub', 'Celebrating Our SSC Toppers 2022–2023')}</h3>
              <p className="excel-body">
                {txt('academics.excel.body', 'Every year, our students shine in the SSC (Telangana State Board) examinations — earning distinctions, top grades, and remarkable ranks. These results reflect the hard work of our students and the dedication of our teachers, who together bring out the very best in every learner.')}
              </p>
            </Reveal>
            <Reveal className="excel-gallery" delay={1}>
              {EXCEL_IMAGES.map((img, i) => {
                const src = pickImg(img.key, img.def)
                if (!src) return null // slot deleted in admin → drop the tile
                return (
                  <div className={`excel-cell ${img.wide ? 'is-wide' : ''}`} key={img.key}>
                    <SmartImage src={src} alt={`Dawn High School achiever ${i + 1}`} loading="lazy" />
                  </div>
                )
              })}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Oxford Curriculum Framework */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.oxford.eyebrow', 'Global Excellence, Powered by the British Curriculum')}
            title={txt('academics.oxford.title', 'Unlocking Potential with the')}
            accent={txt('academics.oxford.accent', 'Oxford Curriculum Framework')}
          />
          <div className="award-card">
            <Reveal className="award-copy">
              <span className="eyebrow" style={{ color: 'var(--gold-400)' }}>{txt('academics.oxford.eyebrow2', 'UK-Based Global Curriculum')}</span>
              <h2>{txt('academics.oxford.title2', 'A World-Class British Education')}</h2>
              <p>
                {txt('academics.oxford.desc', 'Dawn High School delivers the Oxford Curriculum Framework — a UK-based, globally recognised programme designed by expert boards and refined through cutting-edge research to give every student a strong, future-ready foundation.')}
              </p>
              <ul className="award-points">
                <li><i>★</i> {txt('academics.oxford.point.1', 'UK-based, globally recognised curriculum')}</li>
                <li><i>★</i> {txt('academics.oxford.point.2', 'Designed by expert boards & top research centres')}</li>
                <li><i>★</i> {txt('academics.oxford.point.3', 'Structured for strong, measurable student growth')}</li>
                <li><i>★</i> {txt('academics.oxford.point.4', 'Refined through cutting-edge research')}</li>
                <li><i>★</i> {txt('academics.oxford.point.5', 'Future-ready skills: Robotics, Coding & STEM')}</li>
              </ul>
            </Reveal>
            <Reveal className="award-photo" delay={1}>
              <SmartImage
                src={oxfordImg}
                alt="Dawn High School — Unlocking potential with the Oxford Curriculum Framework"
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Learning philosophy */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.philo.eyebrow', 'Our Approach')}
            title={txt('academics.philo.title', 'A Philosophy Built for')}
            accent={txt('academics.philo.accent', 'Real Learning')}
          />
          <div className="grid cols-3">
            {PHILOSOPHY.map((p, i) => (
              <Reveal className="philo-cell" delay={(i % 3) + 1} key={p.t}>
                <TiltCard className="card philosophy-card">
                  <div className="card-icon">{p.ic}</div>
                  <h3>{txt(`academics.philo.${i + 1}.t`, p.t)}</h3>
                  <p>{txt(`academics.philo.${i + 1}.d`, p.d)}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.subjects.eyebrow', 'Curriculum')}
            title={txt('academics.subjects.title', 'Subjects We')}
            accent={txt('academics.subjects.accent', 'Offer')}
            lead={txt('academics.subjects.lead', 'A broad, balanced curriculum that lets every student discover and pursue their passion.')}
          />
          <Reveal>
            <div className="subject-grid">
              {SUBJECTS.map((s, i) => (
                <div className="subject" key={s.b}>
                  <span className="s-ic">{s.ic}</span>
                  <div>
                    <b>{txt(`academics.subject.${i + 1}.b`, s.b)}</b>
                    <span>{txt(`academics.subject.${i + 1}.s`, s.s)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Assessment */}
      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow={txt('academics.assess.eyebrow', 'Assessment')}
            title={txt('academics.assess.title', 'How We')}
            accent={txt('academics.assess.accent', 'Measure Growth')}
          />
          <div className="grid cols-3">
            {ASSESS.map((a, i) => (
              <Reveal className="card" delay={(i % 3) + 1} key={a.t}>
                <div className="card-icon">{a.ic}</div>
                <h3>{txt(`academics.assess.${i + 1}.t`, a.t)}</h3>
                <p>{txt(`academics.assess.${i + 1}.d`, a.d)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
