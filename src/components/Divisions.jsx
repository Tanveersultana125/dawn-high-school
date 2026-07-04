import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './common'
import SmartImage from './SmartImage'
import { usePageImageResolver } from '../context/PageImagesContext'

const DIVISIONS = [
  {
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    slot: 'home.division.1',
    label: 'Nursery – UKG',
    name: 'Early Years',
    to: '/academics',
  },
  {
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    slot: 'home.division.2',
    label: 'Grades 1 – 5',
    name: 'Primary School',
    to: '/academics',
  },
  {
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
    slot: 'home.division.3',
    label: 'Grades 6 – 8',
    name: 'Middle School',
    to: '/academics',
  },
  {
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
    slot: 'home.division.4',
    label: 'Grades 9 – 12',
    name: 'High School',
    to: '/academics',
  },
]

export default function Divisions() {
  const [hovered, setHovered] = useState(null)
  const pick = usePageImageResolver()

  return (
    <section className="section divisions" id="divisions">
      <div className="container">
        <Reveal className="div-head">
          <span className="eyebrow">Discover Your</span>
          <h2 className="div-title">Dawn Journey</h2>
          <p className="div-lead">
            Our divisions are thoughtfully structured around how children learn best at each
            stage of their lives. We nurture, develop, and empower open minds to learn for life —
            from the earliest years through High School, and beyond.
          </p>
        </Reveal>

        <div className="div-grid">
          {DIVISIONS.map((d, i) => (
            <Reveal
              as={Link}
              to={d.to}
              className={`div-card ${hovered !== null && hovered !== i ? 'div-card-dim' : ''}`}
              delay={(i % 4) + 1}
              key={d.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <SmartImage src={pick(d.slot, d.img)} alt={d.name} loading="lazy" />
              <span className="div-card-shade" aria-hidden="true" />
              <div className="div-card-cap">
                <span className="div-card-label">{d.label}</span>
                <h3 className="div-card-name">{d.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
