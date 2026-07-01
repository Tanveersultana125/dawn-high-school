import { useState } from 'react'
import { Reveal, SectionHead } from './common'
import SplitText from './SplitText'

const FAQS = [
  { q: 'What is the admission process at Dawn High School?', a: 'Admissions open with an online inquiry, followed by a campus visit, a friendly interaction for the child, and document submission. Our team guides you through every step.' },
  { q: 'Which curriculum does Dawn High School follow?', a: 'We deliver the Oxford Curriculum Framework — a UK-based, globally recognised programme refined through cutting-edge research, with strong focus on robotics, coding, and STEM.' },
  { q: 'What are the school timings and class sizes?', a: 'Classes run Monday to Saturday, 8:00 AM to 2:30 PM. We maintain small class sizes (1:18 in primary, 1:20 in higher grades) for personalised attention.' },
  { q: 'Does the school provide transport and meals?', a: 'Yes. We operate a GPS-tracked, safe bus fleet across the city and serve nutritious, freshly-prepared meals in our modern dining hall.' },
  { q: 'What extracurricular activities are offered?', a: 'From robotics and STEM clubs to sports, performing arts, leadership labs, and community service — every passion finds a home on our 12-acre campus.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section section-dark" id="faq">
      <div className="container faq-container">
        <SectionHead
          center
          eyebrow="Got Questions?"
          title="Frequently Asked"
          accent="Questions"
          lead="Everything you need to know about life and learning at Dawn High School."
        />

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal className={`faq-item ${open === i ? 'open' : ''}`} delay={(i % 4) + 1} key={f.q}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{f.q}</span>
                <i className="faq-ic" aria-hidden="true" />
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">
                  {open === i ? (
                    <SplitText
                      key={`faq-split-${i}`}
                      text={f.a}
                      tag="p"
                      className="faq-split"
                      splitType="words"
                      delay={16}
                      duration={0.5}
                      ease="power3.out"
                      from={{ opacity: 0, y: 16 }}
                      to={{ opacity: 1, y: 0 }}
                      threshold={0.1}
                      rootMargin="0px"
                      textAlign="left"
                    />
                  ) : (
                    <p>{f.a}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
