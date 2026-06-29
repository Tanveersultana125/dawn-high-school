import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import SmartImage from './SmartImage'
import TiltCard from './TiltCard'

/**
 * Recognition Hero — a full-width, full-bleed banner slider showcasing Dawn
 * High School's real awards, accreditations and global partnerships. Each
 * photo fills the screen behind a cinematic overlay, with a bold headline,
 * supporting copy and calls-to-action on the left — premium navy/gold theme.
 */

const SLIDES = [
  {
    img: '/achievements/oxford-quality.png',
    pos: 'center 30%',
    tag: "Oxford University Press Partner",
    title: ['Officially Partnered with', 'Oxford'],
    desc: 'Delivering the Oxford Quality English curriculum across our classrooms for the academic year 2025–2026.',
    primary: { label: 'Explore Academics', to: '/academics' },
    secondary: { label: 'Learn More', to: '/about' },
  },
  {
    img: '/achievements/global-education-award.png',
    pos: 'center 28%',
    tag: 'National Honour',
    title: ['Global Education', 'Excellence Award'],
    desc: 'Recognised at the National Education & Trade Development summit for our outstanding contribution to education.',
    primary: { label: 'Our Story', to: '/about' },
    secondary: { label: 'Admissions', to: '/admissions' },
  },
  {
    img: '/achievements/education-certificate.png',
    pos: 'center 25%',
    tag: 'Certified Excellence',
    title: ['An Institution of', 'Distinction'],
    desc: 'Certified for excellence in industry-aligned education and holistic student development.',
    primary: { label: 'Why Choose Dawn', to: '/about' },
    secondary: { label: 'Visit Campus', to: '/campus' },
  },
  {
    img: '/achievements/turkey-consulate.png',
    pos: 'center 22%',
    tag: 'International Ties',
    title: ['Building Global', 'Academic Bridges'],
    desc: 'Forging international collaborations with diplomatic and educational leaders across the world.',
    primary: { label: 'Discover the Campus', to: '/campus' },
    secondary: { label: 'About Us', to: '/about' },
  },
  {
    img: '/achievements/dawn-recognition.png',
    pos: 'center 30%',
    tag: 'Civic Honour',
    title: ['Recognised by', 'Civic Leadership'],
    desc: 'Felicitated by distinguished public representatives for our impact on the community.',
    primary: { label: 'Schedule a Visit', to: '/admissions' },
    secondary: { label: 'Our Story', to: '/about' },
  },
  {
    img: '/achievements/sahitya-academy.png',
    pos: 'center 28%',
    tag: 'Inspiring Minds',
    title: ['Hosting Literary', 'Laureates'],
    desc: 'Welcoming Sahitya Academy Award winner Janab Khalid Hussain to mentor and inspire our students.',
    primary: { label: 'Apply Now', to: '/admissions' },
    secondary: { label: 'Gallery', to: '/gallery' },
  },
]

export default function Recognition() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState([])

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), [])

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
    <section className="recog-hero" id="recognition" aria-label="Awards & Recognition">
      <div className="recog-vp" ref={emblaRef}>
        <div className="recog-track">
          {SLIDES.map((s, i) => (
            <div className="recog-slide" key={s.tag}>
              {/* immersive full-bleed ambient backdrop (blurred copy of the photo) */}
              <SmartImage src={s.img} alt="" aria-hidden="true" className="recog-ambient" loading={i === 0 ? 'eager' : 'lazy'} />
              <span className="recog-veil" />

              <div className={`recog-inner ${i % 2 === 1 ? 'rev' : ''}`}>
                <div className={`recog-text ${selected === i ? 'on' : ''}`}>
                  <span className="recog-eyebrow">{s.tag}</span>
                  <h2 className="recog-h">
                    {s.title[0]} <span className="recog-h-accent">{s.title[1]}</span>
                  </h2>
                  <p className="recog-p">{s.desc}</p>
                  <div className="recog-actions">
                    <Link to={s.primary.to} className="recog-btn">{s.primary.label}</Link>
                    <Link to={s.secondary.to} className="recog-btn ghost">{s.secondary.label}</Link>
                  </div>
                </div>

                {/* the full, sharp photo in a 3D tilt frame — never cropped */}
                <div className={`recog-figcol ${selected === i ? 'on' : ''}`}>
                  <TiltCard className="recog-figure" max={9}>
                    <SmartImage src={s.img} alt={s.title.join(' ')} className="recog-photo" loading={i === 0 ? 'eager' : 'lazy'} />
                  </TiltCard>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="recog-arrow prev" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous">←</button>
      <button className="recog-arrow next" onClick={() => emblaApi?.scrollNext()} aria-label="Next">→</button>

      <div className="recog-dashes">
        {snaps.map((_, i) => (
          <button
            key={i}
            className={`recog-dash ${selected === i ? 'active' : ''}`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
