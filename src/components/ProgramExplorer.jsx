import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionHead } from './common'

const FILTERS = ['All', 'Primary', 'Middle', 'High', 'STEM']

const PROGRAMS = [
  { cat: 'Primary', icon: '🧒', title: 'Primary School', grades: 'Grades 1 – 5', rating: 4.9, tag: 'Foundation Years', desc: 'Joyful, activity-rich foundations in literacy, numeracy, and social skills.', long: 'Our Foundation Years build confident, curious learners through play-based, activity-rich teaching. Small classes, phonics-led literacy, hands-on numeracy, and rich social-emotional learning give every child a warm, joyful start — laying strong roots for a lifelong love of learning.' },
  { cat: 'Middle', icon: '📚', title: 'Middle School', grades: 'Grades 6 – 8', rating: 4.8, tag: 'Growth Years', desc: 'Inquiry-led, interdisciplinary learning that sharpens reasoning & collaboration.', long: 'The Growth Years stretch young minds with inquiry-led, interdisciplinary projects. Students investigate real questions across science, humanities, and the arts — sharpening reasoning, collaboration, and independence while discovering the subjects and passions that excite them most.' },
  { cat: 'High', icon: '🎓', title: 'High School', grades: 'Grades 9 – 12', rating: 5.0, tag: 'Senior Years', desc: 'Specialised streams, honors courses, and dedicated university counselling.', long: 'Our Senior Years offer specialised Science and Commerce streams, honors and advanced courses, and dedicated university counselling. Students are mentored toward their goals with rigorous academics, leadership opportunities, and personalised guidance for top universities at home and abroad.' },
  { cat: 'STEM', icon: '🔬', title: 'Science & Discovery', grades: 'All Levels', rating: 4.9, tag: 'Hands-on STEM', desc: 'Hands-on science experiments and beginner robotics in our school labs.', long: 'In our science labs, students explore practical experiments and beginner robotics kits. Through science-fair projects and STEM club activities, learners build curiosity, teamwork, and problem-solving skills — a solid, practical foundation for the years ahead.' },
  { cat: 'High', icon: '📈', title: 'Commerce Stream', grades: 'Grades 11 – 12', rating: 4.7, tag: 'Career Track', desc: 'Economics, business studies & accounting with real-world case learning.', long: 'The Career Track in Commerce blends economics, business studies, and accounting with real-world case learning. Students analyse live business problems, sharpen financial literacy, and build the analytical, entrepreneurial mindset needed for university and the world of work.' },
]

export default function ProgramExplorer() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null) // currently expanded program
  const shown = filter === 'All' ? PROGRAMS : PROGRAMS.filter((p) => p.cat === filter)

  // Esc to close + lock body scroll while a card is expanded
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    document.body.classList.add('no-scroll')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const selectFilter = (f) => {
    setOpen(null)
    setFilter(f)
  }

  return (
    <section className="section section-alt" id="programs">
      <div className="container">
        <SectionHead
          center
          eyebrow="Explore Programs"
          title="Find the Right"
          accent="Path for Your Child"
          lead="Filter by stage to discover the program that fits — every pathway is designed to challenge, inspire, and empower."
        />

        <Reveal className="prog-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`prog-pill ${filter === f ? 'active' : ''}`}
              onClick={() => selectFilter(f)}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="prog-grid" key={filter}>
          {shown.map((p, i) => (
            <Reveal className="flip-cell" delay={(i % 3) + 1} key={p.title}>
              <div className="flip-card">
                {/* Front */}
                <div className="prog-card flip-face">
                  <div className="prog-card-top">
                    <span className="prog-ic">{p.icon}</span>
                    <span className="prog-rating">★ {p.rating.toFixed(1)}</span>
                  </div>
                  <span className="prog-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <span className="prog-grades">{p.grades}</span>
                  <p>{p.desc}</p>
                  <span className="flip-hint">Hover to flip ↻</span>
                </div>

                {/* Back */}
                <div className="flip-back flip-face">
                  <span className="flip-back-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.grades} · ★ {p.rating.toFixed(1)}</p>
                  <div className="flip-back-actions">
                    <button className="flip-btn" onClick={() => setOpen(p)}>View Details</button>
                    <Link className="flip-link" to="/academics">Explore Program →</Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
        {open && (
          <motion.div
            key="prog-modal"
            className="prog-modal-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="prog-modal-backdrop" onClick={() => setOpen(null)} />
            <div className="prog-modal-wrap" onClick={() => setOpen(null)}>
              <motion.div
                className="prog-modal-card"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={open.title}
                initial={{ opacity: 0, scale: 0.88, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
              >
                <button className="prog-modal-close" onClick={() => setOpen(null)} aria-label="Close">✕</button>

                <div className="prog-card-top">
                  <span className="prog-ic prog-ic-lg">{open.icon}</span>
                  <span className="prog-rating">★ {open.rating.toFixed(1)}</span>
                </div>
                <span className="prog-tag">{open.tag}</span>
                <h3 className="prog-modal-title">{open.title}</h3>
                <span className="prog-grades">{open.grades}</span>

                <p className="prog-modal-desc">{open.long}</p>

                <div className="prog-modal-actions">
                  <Link className="bf-btn-primary" to="/academics">Explore Program</Link>
                  <Link className="prog-modal-apply" to="/admissions">Apply Now</Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
