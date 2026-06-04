import { Reveal, SectionHead } from './common'

const CARDS = [
  { icon: '🏆', title: 'Sports & Athletics', desc: 'Olympic-grade facilities across 14 disciplines, from cricket to swimming.', grad: 'linear-gradient(150deg,#0e2a5e,#1450c8)', cls: 'wide' },
  { icon: '🎨', title: 'Arts & Music', desc: 'Dedicated studios for visual arts, dance, theatre, and an orchestra.', grad: 'linear-gradient(150deg,#1450c8,#4f86f7)' },
  { icon: '🔬', title: 'Science Labs', desc: 'Eight smart laboratories for physics, chemistry, biology & robotics.', grad: 'linear-gradient(150deg,#061128,#0e2a5e)', cls: 'tall' },
  { icon: '📖', title: 'Modern Library', desc: 'A 30,000-volume library and digital research center.', grad: 'linear-gradient(150deg,#0a1f44,#2563eb)' },
  { icon: '🤝', title: 'Student Clubs', desc: '40+ clubs from debate and MUN to coding and entrepreneurship.', grad: 'linear-gradient(150deg,#13316c,#4f86f7)', cls: 'wide' },
  { icon: '⭐', title: 'Leadership Activities', desc: 'Student council, community service, and global exchange programs.', grad: 'linear-gradient(150deg,#0e2a5e,#1450c8)' },
]

export default function CampusLife() {
  return (
    <section className="section section-alt" id="campus-life">
      <div className="container">
        <SectionHead
          center
          eyebrow="Campus Life"
          title="Where Learning Extends"
          accent="Beyond the Classroom"
          lead="A vibrant campus where every passion finds a home — building well-rounded individuals through sports, arts, science, and service."
        />

        <div className="life-grid">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.title}
              delay={(i % 4) + 1}
              className={`life-card ${c.cls || ''}`}
              style={{ '--bg-gradient': c.grad }}
            >
              <span className="life-ic">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
