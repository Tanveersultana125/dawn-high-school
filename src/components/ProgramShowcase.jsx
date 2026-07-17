import { Reveal } from './common'
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
} from './HoverSlider'

// Reuse the project's known-good Unsplash education photos.
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`

const PROGRAMS = [
  { id: 'sciences', title: 'Sciences', img: U('photo-1532094349884-543bc11b234d') },
  { id: 'commerce', title: 'Commerce', img: U('photo-1497486751825-1233686d5d80') },
  { id: 'computer-science', title: 'Computer Science', img: U('photo-1529070538774-1843cb3265df') },
  { id: 'visual-arts', title: 'Visual Arts', img: U('photo-1511671782779-c97d3d27a1d4') },
  { id: 'sports', title: 'Sports & PE', img: U('photo-1461896836934-ffe607ba8211') },
]

export default function ProgramShowcase() {
  return (
    <section className="section program-showcase">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Explore Our Streams</span>
          <h2 className="ps-title">
            Find Your <span className="ps-accent">Path</span>
          </h2>
          <p className="ps-lead">Hover a stream to see where it can take you.</p>
        </Reveal>

        <HoverSlider className="ps-slider">
          <div className="ps-list">
            {PROGRAMS.map((p, i) => (
              <TextStaggerHover key={p.id} index={i} text={p.title} />
            ))}
          </div>

          <HoverSliderImageWrap className="ps-media">
            {PROGRAMS.map((p, i) => (
              <HoverSliderImage
                key={p.id}
                index={i}
                src={p.img}
                alt={p.title}
                loading="eager"
                decoding="async"
              />
            ))}
          </HoverSliderImageWrap>
        </HoverSlider>
      </div>
    </section>
  )
}
