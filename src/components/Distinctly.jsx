import { useEffect, useState } from 'react'
import Crest from './Crest'
import { Reveal } from './common'

const IMG = {
  classroom: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
  study: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
  library: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=900&q=80',
  campus: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
  building: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
  kids: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
}

const ITEMS = [
  {
    accent: 'Stretch',
    rest: 'Your Intellect',
    desc: 'Dawn students are empowered to explore. We are known for academic rigor, with faculty fiercely committed to guiding young minds and developing strength of intellect through innovative, inquiry-led curricula.',
    cards: [
      { img: IMG.classroom, cap: 'Inquiry-Led Mastery', tag: 'Academics', text: 'Students drive their own discovery through questions, experiments, and real-world problem solving — building deep, lasting understanding that goes far beyond memorisation.' },
      { img: IMG.study, cap: 'Honors & AP Courses', tag: 'Academics', text: 'Advanced Placement and Honors tracks challenge our most ambitious learners, earning them a genuine head start on university-level credit.' },
      { img: IMG.kids, cap: 'Schedules Built for Deep Learning', tag: 'Academics', text: 'Longer, focused learning blocks give students the time to think deeply, collaborate, and truly master each subject without the rush.' },
    ],
  },
  {
    accent: 'Make',
    rest: 'It Your Own',
    desc: 'No two learners are alike. Personalised pathways, a rich slate of electives, and independent study give every student the freedom to pursue their passions and shape their own journey.',
    cards: [
      { img: IMG.study, cap: 'Personalised Pathways', tag: 'Personalised', text: 'Adaptive learning plans meet every student where they are and stretch them steadily toward their full potential.' },
      { img: IMG.kids, cap: 'Signature Electives', tag: 'Choice', text: 'From robotics to film-making, a rich slate of electives lets students follow their curiosity wherever it leads.' },
      { img: IMG.classroom, cap: 'Independent Study', tag: 'Ownership', text: 'Self-directed projects and research empower students to take full ownership of their learning journey.' },
    ],
  },
  {
    accent: 'Connect',
    rest: 'Beyond the Classroom',
    desc: 'Learning extends far beyond four walls. Through 40+ clubs, community service, and global exchange programs, students build character, leadership, and lifelong friendships.',
    cards: [
      { img: IMG.kids, cap: 'Clubs & Leadership', tag: 'Community', text: 'More than 40 student-led clubs and councils build confidence, voice, and real leadership skills.' },
      { img: IMG.campus, cap: 'Community Service', tag: 'Service', text: 'Service-learning connects students to their community and nurtures empathy and responsibility.' },
      { img: IMG.building, cap: 'Global Exchange', tag: 'Global', text: 'International exchange and partnerships open students’ eyes to the wider, interconnected world.' },
    ],
  },
  {
    accent: 'Find',
    rest: 'Your Place',
    desc: 'A close-knit community where everyone belongs. Mentorship, wellbeing support, and a culture of respect ensure each student feels seen, supported, and inspired to thrive.',
    cards: [
      { img: IMG.classroom, cap: 'Mentorship', tag: 'Support', text: 'Every student is paired with mentors who guide them academically and personally, every step of the way.' },
      { img: IMG.library, cap: 'Wellbeing & Support', tag: 'Wellbeing', text: 'Counsellors, wellness programs, and a caring culture keep students healthy, happy, and balanced.' },
      { img: IMG.kids, cap: 'A Culture of Respect', tag: 'Belonging', text: 'Diversity is celebrated, and every voice is heard in our warm, inclusive community.' },
    ],
  },
  {
    accent: 'Explore',
    rest: 'a Campus Unlike Others',
    desc: 'A 12-acre smart campus designed for discovery — advanced labs, a digital library, performing-arts studios, and athletic facilities that bring learning to life.',
    cards: [
      { img: IMG.library, cap: 'Digital Library', tag: 'Facilities', text: 'A 30,000-volume library and digital research commons fuel curiosity and independent inquiry.' },
      { img: IMG.building, cap: 'Smart Laboratories', tag: 'Facilities', text: 'Eight advanced laboratories bring science, robotics, and technology vividly to life.' },
      { img: IMG.campus, cap: 'Arts & Athletics', tag: 'Facilities', text: 'Studios, theatres, and Olympic-grade facilities nurture talent far beyond the classroom.' },
    ],
  },
]

export default function Distinctly() {
  const [active, setActive] = useState(0)
  const [gIndex, setGIndex] = useState(null) // null = closed; else current slide
  const [paused, setPaused] = useState(false)
  const item = ITEMS[active]
  const cards = item.cards
  const open = gIndex !== null

  const next = () => setGIndex((i) => (i === null ? i : (i + 1) % cards.length))
  const prev = () => setGIndex((i) => (i === null ? i : (i - 1 + cards.length) % cards.length))

  // Esc / arrow keys + scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setGIndex(null)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-advance through the three images, one after another
  useEffect(() => {
    if (!open || paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [open, paused, gIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="section section-alt" id="distinct">
      <div className="container">
        <Reveal className="distinct-head">
          <span className="distinct-kicker">Distinctly</span>
          <h2 className="distinct-title">Dawn</h2>
        </Reveal>

        <div className="distinct-layout">
          <Reveal className="distinct-list">
            {ITEMS.map((it, i) => (
              <div className={`distinct-item ${i === active ? 'active' : ''}`} key={it.accent}>
                <button className="di-head" onClick={() => setActive(i)}>
                  {i === active && <Crest className="di-crest" />}
                  <span className="di-accent">{it.accent}</span> {it.rest}
                </button>
                {i === active && <p className="di-body">{it.desc}</p>}
              </div>
            ))}
          </Reveal>

          <div className="distinct-cards" key={active}>
            {item.cards.map((c, i) => (
              <figure
                className={`di-card c${i + 1}`}
                key={c.cap}
                onClick={() => setGIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setGIndex(i)}
                aria-label={`Open ${c.cap}`}
              >
                <img src={c.img} alt={c.cap} loading="lazy" />
                <button
                  className="di-plus"
                  aria-label={`More about ${c.cap}`}
                  onClick={(e) => { e.stopPropagation(); setGIndex(i) }}
                >
                  +
                </button>
                <figcaption>{c.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="di-modal" onClick={() => setGIndex(null)} role="dialog" aria-modal="true">
          <div
            className="di-modal-card"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <button className="di-modal-close" onClick={() => setGIndex(null)} aria-label="Close">✕</button>
            <div className="di-modal-img">
              <img key={gIndex} src={cards[gIndex].img} alt={cards[gIndex].cap} />
            </div>
            <div className="di-modal-body">
              <span className="tag">{cards[gIndex].tag}</span>
              <h3>{cards[gIndex].cap}</h3>
              <p>{cards[gIndex].text}</p>
              <div className="di-modal-nav">
                <button className="di-modal-arrow" onClick={prev} aria-label="Previous image">‹</button>
                <div className="di-modal-dots">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      className={`di-modal-dot ${i === gIndex ? 'active' : ''}`}
                      onClick={() => setGIndex(i)}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
                <button className="di-modal-arrow" onClick={next} aria-label="Next image">›</button>
                <span className="di-modal-count">{gIndex + 1} / {cards.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
