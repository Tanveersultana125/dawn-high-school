import { useState } from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'
import VideoGallery from '../components/VideoGallery'
import BuildingBlocks from '../components/BuildingBlocks'
import CurvedInput from '../components/CurvedInput'
import { Reveal } from '../components/common'
import { submitEnquiry } from '../lib/enquiries'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function GalleryPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  // The curved bar is a visit request: drop the address into the same
  // "enquiries" collection the contact form writes to, tagged so the admin
  // inbox shows where it came from.
  const requestVisit = async (address) => {
    const clean = address.trim()
    if (!EMAIL_RE.test(clean)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry(
        {
          name: '',
          email: clean,
          phone: '',
          grade: '',
          message: 'Campus visit request — sent from the Gallery page.',
        },
        'contact'
      )
      setStatus('sent')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <BuildingBlocks
        layout="reverse"
        sectionClassName="blocks-first"
        eyebrow="Life at Dawn"
        title="Moments That Build"
        accent="Lasting Memories"
        lead="Every photograph is a building block of the Dawn journey — first-day smiles, science fairs, championship cheers, and everything in between. Hover the blocks, then scroll on to explore the moments."
        buttonText="See Campus Life"
        to="/campus"
      />

      <Gallery />

      <VideoGallery />

      <section className="section section-alt">
        <div className="container">
          <Reveal className="cta-band">
            <div>
              <h3>Experience Dawn in person</h3>
              <p>Pictures tell a story — but nothing compares to walking our campus. Book a visit today.</p>
            </div>

            <div className="cta-band-form">
              <CurvedInput
                width="100%"
                bend={20}
                height={62}
                fontSize={15}
                cornerRadius={20}
                borderWidth={1.5}
                shadowSize="lg"
                theme="dark"
                type="email"
                name="email"
                placeholder="your@email.com"
                buttonText={status === 'sending' ? 'Sending…' : 'Schedule a Visit'}
                ariaLabel="Email address to request a campus visit"
                value={email}
                onChange={(v) => {
                  setEmail(v)
                  if (status !== 'idle') setStatus('idle')
                }}
                onSubmit={requestVisit}
                backgroundColor="#08193a"
                textColor="#ffffff"
                placeholderColor="rgba(255, 255, 255, 0.5)"
                borderColor="rgba(212, 175, 55, 0.42)"
                buttonColor="#d4af37"
                buttonTextColor="#061128"
                iconColor="#d4af37"
                shadowColor="#061128"
              />
              <p className="cta-band-note" role="status">
                {status === 'sent' ? (
                  <>Thanks — we&apos;ll be in touch to arrange your visit.</>
                ) : status === 'error' ? (
                  <span className="cta-band-note-error">{error}</span>
                ) : (
                  <>
                    Prefer to talk first? <Link to="/contact">Contact the school</Link>.
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
