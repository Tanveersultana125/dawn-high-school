import { Reveal, SectionHead } from './common'

const FACULTY = [
  { name: 'Dr. Eleanor Hayes', role: 'Principal', qual: 'Ph.D. Education · 28 yrs', grad: 'linear-gradient(160deg,#0e2a5e,#1450c8)', initials: 'EH' },
  { name: 'Mr. Arjun Mehta', role: 'Head of Science', qual: 'M.Sc. Physics · 18 yrs', grad: 'linear-gradient(160deg,#1450c8,#4f86f7)', initials: 'AM' },
  { name: 'Ms. Sophia Laurent', role: 'Head of Humanities', qual: 'M.A. Literature · 15 yrs', grad: 'linear-gradient(160deg,#0a1f44,#2563eb)', initials: 'SL' },
  { name: 'Dr. Rajiv Nair', role: 'Director of Technology', qual: 'Ph.D. Computer Sci · 20 yrs', grad: 'linear-gradient(160deg,#13316c,#4f86f7)', initials: 'RN' },
]

export default function Faculty() {
  return (
    <section className="section section-alt" id="faculty">
      <div className="container">
        <SectionHead
          center
          eyebrow="Our Faculty"
          title="Mentors Who"
          accent="Inspire Greatness"
          lead="Behind every great student is a great teacher. Meet a few of the dedicated educators shaping the leaders of tomorrow."
        />

        <div className="faculty-grid">
          {FACULTY.map((f, i) => (
            <Reveal className="faculty-card" delay={(i % 4) + 1} key={f.name}>
              <div className="faculty-photo" style={{ background: f.grad }}>
                <span className="avatar">{f.initials}</span>
                <div className="faculty-social">
                  <a href="#faculty" aria-label={`${f.name} on LinkedIn`}>in</a>
                  <a href="#faculty" aria-label={`Email ${f.name}`}>@</a>
                  <a href="#faculty" aria-label={`${f.name} profile`}>↗</a>
                </div>
              </div>
              <div className="faculty-info">
                <b>{f.name}</b>
                <div className="role">{f.role}</div>
                <div className="qual">{f.qual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
