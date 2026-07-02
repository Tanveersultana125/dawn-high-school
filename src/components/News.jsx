import { useRef } from 'react'
import { SectionHead } from './common'
import { NewsCard, NewsSpotlight } from './NewsMagic'
import { ViewMagnifier } from './ViewMagnifier'

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
  const gridRef = useRef(null)

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

        <NewsSpotlight gridRef={gridRef} />
        <div className="news-grid" ref={gridRef}>
          {EVENTS.map((e, i) => (
            <ViewMagnifier className="news-magnifier" key={e.title}>
              <NewsCard event={e} delay={i + 1} />
            </ViewMagnifier>
          ))}
        </div>
      </div>
    </section>
  )
}
