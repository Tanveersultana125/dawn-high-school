import { useState } from 'react'
import { Reveal, SectionHead } from './common'

const PROGRAMS = [
  {
    icon: '🧒',
    name: 'Primary School',
    grades: 'Grades 1 – 5',
    tag: 'Foundation Years',
    title: 'Joyful Foundations for Lifelong Learning',
    desc: 'A nurturing, activity-rich environment where curiosity is celebrated and core literacy, numeracy, and social skills are built on strong, caring foundations.',
    features: ['Phonics & Early Literacy', 'Concept-Based Math', 'Creative Arts', 'Outdoor Discovery'],
    meta: [['1:18', 'Teacher Ratio'], ['100%', 'Activity Based']],
  },
  {
    icon: '📚',
    name: 'Middle School',
    grades: 'Grades 6 – 8',
    tag: 'Growth Years',
    title: 'Building Critical Thinkers & Innovators',
    desc: 'Students transition into deeper inquiry with a rigorous, interdisciplinary curriculum that sharpens reasoning, collaboration, and independent study habits.',
    features: ['STEM Integration', 'Research Projects', 'Global Languages', 'Leadership Labs'],
    meta: [['12+', 'Subjects Offered'], ['1:20', 'Teacher Ratio']],
  },
  {
    icon: '🎓',
    name: 'High School',
    grades: 'Grades 9 – 12',
    tag: 'Senior Years',
    title: 'Preparing Scholars for Top Universities',
    desc: 'An academically demanding program with specialized streams, advanced placement options, and dedicated career counseling to secure placements at leading universities.',
    features: ['Science & Commerce Streams', 'AP & Honors Courses', 'University Counseling', 'Capstone Research'],
    meta: [['98%', 'University Placement'], ['40+', 'Partner Universities']],
  },
  {
    icon: '🔬',
    name: 'Science & Technology',
    grades: 'All Levels',
    tag: 'Innovation Track',
    title: 'Hands-On Science, Robotics & Innovation',
    desc: 'State-of-the-art laboratories and a dedicated innovation hub where students explore robotics, AI, biotechnology, and engineering through real-world projects.',
    features: ['Robotics & AI Lab', 'Maker Space', 'Science Olympiad', 'Innovation Hub'],
    meta: [['8', 'Smart Labs'], ['30+', 'Competitions Won']],
  },
  {
    icon: '💻',
    name: 'Digital Learning',
    grades: 'All Levels',
    tag: 'Smart Campus',
    title: 'A Connected, Future-Ready Classroom',
    desc: 'Every classroom is digitally enabled with smart boards, a personalized learning platform, and a one-to-one device program that extends learning beyond walls.',
    features: ['Smart Classrooms', '1:1 Device Program', 'Coding from Grade 3', 'Adaptive Learning AI'],
    meta: [['100%', 'Smart Classrooms'], ['24/7', 'Learning Portal']],
  },
]

export default function Academics() {
  const [active, setActive] = useState(0)
  const p = PROGRAMS[active]

  return (
    <section className="section" id="academics">
      <div className="container">
        <SectionHead
          center
          eyebrow="Academic Excellence"
          title="Programs Designed for Every"
          accent="Stage of Growth"
          lead="From first steps to final exams, our carefully crafted academic pathways challenge, inspire, and empower students at every level."
        />

        <div className="academics-layout">
          <Reveal className="academic-tabs">
            {PROGRAMS.map((prog, i) => (
              <button
                key={prog.name}
                className={`academic-tab ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
              >
                <span className="num">0{i + 1}</span>
                <span className="tab-ic">{prog.icon}</span>
                <span>
                  <b>{prog.name}</b>
                  <small>{prog.grades}</small>
                </span>
              </button>
            ))}
          </Reveal>

          <Reveal className="academic-panel" delay={1} key={active}>
            <div>
              <span className="panel-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul className="panel-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="panel-footer">
              <div className="panel-meta">
                {p.meta.map(([val, label]) => (
                  <div key={label}>
                    <b>{val}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a className="panel-cta" href="#admissions">
                Explore Program <i aria-hidden="true">→</i>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
