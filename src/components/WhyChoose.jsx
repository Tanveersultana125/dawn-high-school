import { Reveal, SectionHead } from './common'

const REASONS = [
  { icon: '🎯', title: 'Academic Excellence', desc: 'A consistent record of top board results and national-level achievements year after year.' },
  { icon: '👩‍🏫', title: 'Experienced Faculty', desc: 'Mentors with advanced degrees and a passion for unlocking every student’s potential.' },
  { icon: '💻', title: 'Digital Classrooms', desc: 'Fully smart-enabled rooms with interactive boards and personalized learning tech.' },
  { icon: '🌱', title: 'Smart Learning Environment', desc: 'A safe, green, and connected campus engineered for focus, wellbeing, and growth.' },
  { icon: '🚀', title: 'Student Development', desc: 'Holistic programs in leadership, wellbeing, arts, and athletics for complete growth.' },
  { icon: '🧭', title: 'Career Guidance', desc: 'Dedicated counselors guiding students toward top universities and future careers.' },
]

export default function WhyChoose() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <SectionHead
          center
          eyebrow="Why Choose Us"
          title="Six Reasons Families"
          accent="Trust Dawn"
          lead="Choosing a school is one of life’s most important decisions. Here is why thousands of families choose Dawn High School."
        />

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal className="why-card" delay={(i % 3) + 1} key={r.title}>
              <div className="why-num">0{i + 1}</div>
              <span className="why-ic">{r.icon}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
