import { Reveal, SectionHead } from './common'
import SmartImage from './SmartImage'
import { usePageImageResolver } from '../context/PageImagesContext'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const CARDS = [
  { icon: '🏆', title: 'Sports & Athletics', stat: '14 Disciplines', desc: 'Olympic-grade facilities across 14 disciplines, from cricket to swimming.', img: U('photo-1461896836934-ffe607ba8211'), slot: 'campus.life.1', grad: 'linear-gradient(150deg,#0e2a5e,#1450c8)', cls: 'wide' },
  { icon: '🎨', title: 'Arts & Music', stat: '6 Studios', desc: 'Dedicated studios for visual arts, dance, theatre, and an orchestra.', img: U('photo-1511671782779-c97d3d27a1d4'), slot: 'campus.life.2', grad: 'linear-gradient(150deg,#1450c8,#4f86f7)' },
  { icon: '🔬', title: 'Science Labs', stat: '8 Smart Labs', desc: 'Eight smart laboratories for physics, chemistry, biology & robotics.', img: U('photo-1532094349884-543bc11b234d'), slot: 'campus.life.3', grad: 'linear-gradient(150deg,#061128,#0e2a5e)', cls: 'tall' },
  { icon: '📖', title: 'Modern Library', stat: '30K+ Volumes', desc: 'A 30,000-volume library and digital research center.', img: U('photo-1497486751825-1233686d5d80'), slot: 'campus.life.4', grad: 'linear-gradient(150deg,#0a1f44,#2563eb)' },
  { icon: '🤝', title: 'Student Clubs', stat: '40+ Clubs', desc: '40+ clubs from debate and MUN to coding and entrepreneurship.', img: U('photo-1529070538774-1843cb3265df'), slot: 'campus.life.5', grad: 'linear-gradient(150deg,#103374,#4f86f7)', cls: 'wide' },
  { icon: '⭐', title: 'Leadership Activities', stat: 'Global Programs', desc: 'Student council, community service, and global exchange programs.', img: U('photo-1517245386807-bb43f82c33c4'), slot: 'campus.life.6', grad: 'linear-gradient(150deg,#0e2a5e,#1450c8)' },
]

export default function CampusLife() {
  const pick = usePageImageResolver()
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
              <SmartImage className="life-img" src={pick(c.slot, c.img)} alt={c.title} loading="lazy" />
              <div className="life-top">
                <span className="life-ic">{c.icon}</span>
                <span className="life-stat">{c.stat}</span>
              </div>
              <div className="life-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="life-more">Explore <i aria-hidden="true">→</i></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
