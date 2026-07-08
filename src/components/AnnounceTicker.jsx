import InfiniteMovingCards from './InfiniteMovingCards'
import { usePageTextResolver } from '../context/PageTextContext'

/**
 * Slim scrolling announcement ticker — a "breaking news" strip of school
 * highlights that loops seamlessly across the width. Navy/gold themed.
 * Each message is admin-editable via the "Announcement Ticker" text slots.
 */

const NEWS = [
  '🎉 Admissions Open 2026–27 — Enroll Now at Dawn High School!',
  '🏆 Congratulations to our Top Achievers!',
  '📘 Now an Oxford University Press — Quality Partner',
  '🌟 New Activity Programs Launched',
  '🏅 Ranked Among Hyderabad’s Top Schools',
]

export default function AnnounceTicker() {
  const txt = usePageTextResolver()
  const items = NEWS.map((def, i) => txt(`home.ticker.${i + 1}`, def))
  return (
    <div className="ann" role="marquee" aria-label="School announcements">
      <span className="ann-tag">📣 Latest</span>
      <InfiniteMovingCards
        items={items}
        speed="normal"
        renderItem={(text) => (
          <span className="ann-item">
            {text}
            <span className="ann-sep" aria-hidden="true">◆</span>
          </span>
        )}
      />
    </div>
  )
}
