import { Reveal, SectionHead } from './common'

const EVENTS = [
  {
    tag: 'Event',
    emoji: '🔬',
    day: '12',
    month: 'Jun',
    title: 'Annual Science & Innovation Fair',
    desc: 'Students showcase robotics, AI, and sustainability projects to the community.',
    grad: 'linear-gradient(160deg,#0e2a5e,#1450c8)',
  },
  {
    tag: 'Announcement',
    emoji: '🎓',
    day: '20',
    month: 'Jun',
    title: 'Class of 2026 Graduation Ceremony',
    desc: 'Celebrating our graduating cohort and their remarkable university placements.',
    grad: 'linear-gradient(160deg,#1450c8,#4f86f7)',
  },
  {
    tag: 'Sports',
    emoji: '🏆',
    day: '28',
    month: 'Jun',
    title: 'Inter-School Athletics Championship',
    desc: 'Dawn hosts the regional championship across 14 athletic disciplines.',
    grad: 'linear-gradient(160deg,#0a1f44,#2563eb)',
  },
]

export default function News() {
  return (
    <section className="section" id="news">
      <div className="container">
        <SectionHead
          center
          eyebrow="News & Events"
          title="What's Happening at"
          accent="Dawn"
          lead="Stay connected with the latest announcements, upcoming events, and celebrations across our vibrant campus."
        />

        <div className="news-grid">
          {EVENTS.map((e, i) => (
            <Reveal className="news-card" delay={i + 1} key={e.title}>
              <div className="news-media" style={{ background: e.grad }}>
                <span className="news-tag">{e.tag}</span>
                {e.emoji}
                <div className="news-date">
                  <b>{e.day}</b>
                  <span>{e.month}</span>
                </div>
              </div>
              <div className="news-body">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                <a href="#news" className="news-link">
                  Read More
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
