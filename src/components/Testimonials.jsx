import { SectionHead } from './common'
import InfiniteMovingCards from './InfiniteMovingCards'

const REVIEWS = [
  {
    text: 'Dawn didn’t just prepare my daughter for exams — it prepared her for life. Her confidence and curiosity have grown beyond what we imagined.',
    name: 'Priya Sharma',
    role: 'Parent · Grade 9',
    grad: 'linear-gradient(160deg,#1450c8,#4f86f7)',
    initials: 'PS',
  },
  {
    text: 'The teachers genuinely care. The science labs and innovation hub made me fall in love with engineering. I’m now studying at a top university.',
    name: 'Daniel Okoye',
    role: 'Alumnus · Class of 2022',
    grad: 'linear-gradient(160deg,#0e2a5e,#2563eb)',
    initials: 'DO',
  },
  {
    text: 'From robotics club to leadership camp, every day brought something new. Dawn feels less like a school and more like a launchpad.',
    name: 'Aisha Rahman',
    role: 'Student · Grade 11',
    grad: 'linear-gradient(160deg,#103374,#4f86f7)',
    initials: 'AR',
  },
  {
    text: 'As parents, the transparency, safety, and academic rigor gave us complete peace of mind. Worth every bit of trust we placed in them.',
    name: 'Michael & Sara Bennett',
    role: 'Parents · Grade 6 & 8',
    grad: 'linear-gradient(160deg,#0a1f44,#1450c8)',
    initials: 'MB',
  },
]

export default function Testimonials() {
  return (
    <section className="section section-dark" id="testimonials">
      <div className="container">
        <SectionHead
          center
          eyebrow="Testimonials"
          title="Voices of the"
          accent="Dawn Family"
          lead="Parents, students, and alumni share what makes the Dawn experience truly special."
        />
      </div>

      <InfiniteMovingCards
        items={REVIEWS}
        direction="left"
        speed="slow"
        renderItem={(r) => (
          <>
            <div className="imc-stars" aria-hidden="true">★★★★★</div>
            <p className="imc-quote">{r.text}</p>
            <div className="imc-person">
              <span className="imc-avatar" style={{ background: r.grad }}>{r.initials}</span>
              <div>
                <b>{r.name}</b>
                <span>{r.role}</span>
              </div>
            </div>
          </>
        )}
      />
    </section>
  )
}
