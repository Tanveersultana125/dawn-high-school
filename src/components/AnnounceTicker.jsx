import InfiniteMovingCards from './InfiniteMovingCards'

/**
 * Slim scrolling announcement ticker — a "breaking news" strip of school
 * highlights that loops seamlessly across the width. Navy/gold themed.
 */

const NEWS = [
  '🎉 Admissions Open 2026–27 — Enroll Now at Dawn High School!',
  '🏆 Congratulations to our Top Achievers!',
  '📘 Now an Oxford University Press — Quality Partner',
  '🌟 New Activity Programs Launched',
  '🏅 Ranked Among Hyderabad’s Top Schools',
]

export default function AnnounceTicker() {
  return (
    <div className="ann" role="marquee" aria-label="School announcements">
      <span className="ann-tag">📣 Latest</span>
      <InfiniteMovingCards
        items={NEWS}
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
