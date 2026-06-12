import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Reveal, SectionHead } from './common'
import TiltCard from './TiltCard'

const REASONS = [
  { icon: '🎯', title: 'Academic Excellence', desc: 'A consistent record of top board results and national-level achievements year after year.' },
  { icon: '👩‍🏫', title: 'Experienced Faculty', desc: 'Mentors with advanced degrees and a passion for unlocking every student’s potential.' },
  { icon: '💻', title: 'Digital Classrooms', desc: 'Fully smart-enabled rooms with interactive boards and personalized learning tech.' },
  { icon: '🌱', title: 'Smart Learning Environment', desc: 'A safe, green, and connected campus engineered for focus, wellbeing, and growth.' },
  { icon: '🚀', title: 'Student Development', desc: 'Holistic programs in leadership, wellbeing, arts, and athletics for complete growth.' },
  { icon: '🧭', title: 'Career Guidance', desc: 'Dedicated counselors guiding students toward top universities and future careers.' },
]

export default function WhyChoose() {
  const autoplay = useRef(
    Autoplay({ delay: 2600, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [autoplay.current])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback((api) => {
    setSelected(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

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

        <Reveal className="why-carousel">
          <div className="why-viewport" ref={emblaRef}>
            <div className="why-track">
              {REASONS.map((r, i) => (
                <div className={`why-slide ${selected === i ? 'is-active' : ''}`} key={r.title}>
                  <TiltCard className="why-card" max={12}>
                    <div className="why-num">0{i + 1}</div>
                    <span className="why-ic">{r.icon}</span>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          <div className="why-controls">
            <button className="why-arrow" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous">‹</button>
            <div className="why-dots">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  className={`why-dot ${selected === i ? 'active' : ''}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Go to reason ${i + 1}`}
                />
              ))}
            </div>
            <button className="why-arrow" onClick={() => emblaApi?.scrollNext()} aria-label="Next">›</button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
