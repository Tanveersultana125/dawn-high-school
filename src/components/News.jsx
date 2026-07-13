import { useRef, useState } from 'react'
import { SectionHead } from './common'
import { NewsCard, NewsSpotlight, NewsModal } from './NewsMagic'

const EVENTS = [
  {
    tag: 'Event',
    emoji: '🔬',
    day: '12',
    month: 'Jun',
    title: 'Annual Science & Innovation Fair',
    desc: 'Students showcase robotics, AI, and sustainability projects to the community.',
    grad: 'linear-gradient(160deg,#0e2a5e,#1450c8)',
    when: 'Thursday, 12 June 2026 · 9:00 AM – 3:00 PM',
    venue: 'Dawn Innovation Hall & Central Courtyard',
    body: 'Our flagship science celebration returns bigger than ever. Students from Grades 6–12 present working robotics builds, AI experiments and sustainability prototypes across more than 40 stalls. Parents and the wider community are warmly invited to explore, ask questions and vote for the People’s Choice project. Live demonstrations run every hour on the main stage.',
  },
  {
    tag: 'Announcement',
    emoji: '🎓',
    day: '20',
    month: 'Jun',
    title: 'Class of 2026 Graduation Ceremony',
    desc: 'Celebrating our graduating cohort and their remarkable university placements.',
    grad: 'linear-gradient(160deg,#1450c8,#4f86f7)',
    when: 'Saturday, 20 June 2026 · 5:00 PM onwards',
    venue: 'Dawn Grand Auditorium',
    body: 'Join us as we honour the Class of 2026 and their outstanding achievements. The evening features the conferring of diplomas, valedictorian address, distinction awards and a celebration of university placements secured across leading institutions. Each graduate may invite up to four guests; formal dress requested. A reception follows in the west lawn.',
  },
  {
    tag: 'Sports',
    emoji: '🏆',
    day: '28',
    month: 'Jun',
    title: 'Inter-School Athletics Championship',
    desc: 'Dawn hosts the regional championship across 14 athletic disciplines.',
    grad: 'linear-gradient(160deg,#0a1f44,#2563eb)',
    when: 'Sunday, 28 June 2026 · 8:00 AM – 6:00 PM',
    venue: 'Dawn Sports Complex & Athletics Track',
    body: 'Dawn is proud to host this year’s regional championship, welcoming twelve partner schools to compete across 14 track and field disciplines. Expect a full day of sprints, relays, long jump, shot put and the ever-popular tug-of-war finale. Spectator stands open at 7:30 AM; refreshments and a family zone will be available throughout the day.',
  },
]

export default function News() {
  const gridRef = useRef(null)
  const [active, setActive] = useState(null)

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
            <NewsCard event={e} delay={i + 1} key={e.title} onOpen={setActive} />
          ))}
        </div>
      </div>

      <NewsModal event={active} onClose={() => setActive(null)} />
    </section>
  )
}
