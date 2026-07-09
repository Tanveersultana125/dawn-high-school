import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * Dawn Assistant — a lightweight, built-in chat assistant.
 * No external API or key: it answers common questions about the school using
 * a small keyword-matched knowledge base, with a polished, menu-driven chat UI.
 */

// ---- Knowledge base -------------------------------------------------------
// Each intent: keywords to match + an answer, plus optional quick action chips.
const KB = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa', 'good morning', 'good evening'],
    answer: "Hello! 👋 I'm the Dawn Assistant. I can help with admissions, fees, campuses, timings and more. What would you like to know?",
  },
  {
    id: 'admissions',
    keywords: ['admission', 'apply', 'enroll', 'enrol', 'join', 'application', 'seat', 'register', 'registration'],
    answer:
      'Admissions for 2026–27 are open! 🎓 The process is simple — 4 steps:\n1️⃣ Enquire (online form or call)\n2️⃣ Campus visit\n3️⃣ Friendly assessment\n4️⃣ Enroll & welcome!\n\nSeats are limited across all grades.',
    chips: [
      { label: 'Admissions page', to: '/admissions' },
      { label: 'Call admissions', href: 'tel:+918107666766' },
    ],
  },
  {
    id: 'fees',
    keywords: ['fee', 'fees', 'cost', 'price', 'tuition', 'charges', 'how much', 'payment', 'scholarship', 'scholarships', 'discount'],
    answer:
      'Fees vary by grade and programme. For an exact fee structure, our admissions team will be happy to guide you. 💡 Merit and need-based scholarships are available for eligible students across all grades.',
    chips: [
      { label: 'Talk to admissions', href: 'tel:+918107666766' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
  {
    id: 'grades',
    keywords: ['grade', 'grades', 'class', 'classes', 'standard', 'which classes', 'programs', 'programmes', 'levels', 'nursery', 'kg', 'play school', 'streams', 'science', 'commerce'],
    answer:
      'We welcome students from Play School to Grade 12:\n• 🧸 Play School — Nursery to KG\n• 📚 Primary — Grades 1 to 5\n• 🔬 Middle — Grades 6 to 8\n• 🎓 High School — Grades 9 to 12 (Science & Commerce streams)',
    chips: [{ label: 'Academics', to: '/academics' }],
  },
  {
    id: 'age',
    keywords: ['age', 'how old', 'eligible', 'eligibility', 'right age', 'old enough', 'minimum age'],
    answer:
      'Grade 1 admissions are open to children who turn 6 by the start of the academic year. For other grades, placement is age-appropriate based on prior schooling.',
    chips: [{ label: 'Admissions', to: '/admissions' }],
  },
  {
    id: 'documents',
    keywords: ['document', 'documents', 'paper', 'papers', 'required', 'requirement', 'requirements', 'need to bring', 'birth certificate', 'transfer certificate', 'tc'],
    answer:
      'For admission, please keep these ready:\n• Completed application form\n• Birth certificate (age proof)\n• Previous school records (last 2 years)\n• 2 passport-size photographs\n• Transfer certificate (if changing schools)',
    chips: [{ label: 'Admissions', to: '/admissions' }],
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'address', 'campus', 'campuses', 'branch', 'branches', 'reach', 'map', 'malakpet', 'purani haveli', 'directions'],
    answer:
      'Dawn High School has two campuses in Hyderabad — Malakpet and Purani Haveli. 📍\nMain campus: 16-3-993, Malakpet Rd, Opposite Officer Mess, Officers Colony, New Malakpet, Hyderabad – 500036, Telangana.',
    chips: [{ label: 'Campus & visit', to: '/campus' }, { label: 'Contact', to: '/contact' }],
  },
  {
    id: 'contact',
    keywords: ['contact', 'phone', 'call', 'number', 'email', 'mail', 'reach you', 'helpline', 'talk', 'enquiry', 'enquire'],
    answer:
      'You can reach us at:\n📞 +91 81076 66766 (Malakpet)\n📞 040 6671 4228 (Purani Haveli)\n✉️ info@dawnhighschool.com',
    chips: [
      { label: 'Call now', href: 'tel:+918107666766' },
      { label: 'Email us', href: 'mailto:info@dawnhighschool.com' },
      { label: 'Contact page', to: '/contact' },
    ],
  },
  {
    id: 'timings',
    keywords: ['timing', 'timings', 'hours', 'open', 'opening', 'closing', 'time', 'when open', 'office hours', 'working hours'],
    answer:
      'Office hours:\n• Mon – Fri · 8:00 AM – 4:00 PM\n• Saturday · 9:00 AM – 1:00 PM\n• Sunday & holidays · Closed',
    chips: [{ label: 'Contact', to: '/contact' }],
  },
  {
    id: 'curriculum',
    keywords: ['curriculum', 'syllabus', 'oxford', 'english', 'academics', 'academic', 'subjects', 'teaching', 'cambridge', 'board', 'courses', 'course'],
    answer:
      'Our curriculum balances strong academics with character and global readiness. 🌍 We are an Oxford University Press — Oxford Quality partner, delivering an internationally informed, future-ready English curriculum.',
    chips: [{ label: 'Academics', to: '/academics' }],
  },
  {
    id: 'about',
    keywords: ['about', 'history', 'who are you school', 'founded', 'when started', 'years', 'experience', 'established', 'founder'],
    answer:
      'Dawn High School has been a trusted name in education since 2000 — over 25 years of excellence, 4,200+ students and 180+ expert educators, shaping confident and caring young leaders.',
    chips: [{ label: 'About us', to: '/about' }],
  },
  {
    id: 'achievements',
    keywords: ['achievement', 'achievements', 'award', 'awards', 'recognition', 'rank', 'ranking', 'best', 'top', 'accolade'],
    answer:
      'We are proud of our recognitions — including the Global Education Excellence Award, an Oxford University Press partnership, and being ranked among Hyderabad’s top schools. 🏆',
    chips: [{ label: 'See recognition', to: '/' }, { label: 'Gallery', to: '/gallery' }],
  },
  {
    id: 'visit',
    keywords: ['visit', 'tour', 'see campus', 'come', 'meeting', 'appointment', 'open house'],
    answer:
      'We’d love to welcome you! 🏫 You can schedule a campus visit to tour our facilities and meet our faculty. Just call us or send an enquiry.',
    chips: [
      { label: 'Schedule a visit', href: 'tel:+918107666766' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    id: 'thanks',
    keywords: ['thank', 'thanks', 'shukriya', 'thank you', 'great', 'ok thanks'],
    answer: "You're most welcome! 😊 Is there anything else I can help you with?",
  },
]

const FALLBACK =
  "I’m not fully sure about that, but our team will gladly help! 📞 Call +91 81076 66766 or email info@dawnhighschool.com. You can also ask me about admissions, fees, grades, campuses, timings or contact details."

// Opening menu — mirrors the four quick options a visitor most often needs.
const MENU = [
  { label: 'About Us', q: 'about us' },
  { label: 'Campuses', q: 'campus location' },
  { label: 'Courses / Curriculum', q: 'curriculum courses' },
  { label: 'Admissions', q: 'admissions' },
]

function findAnswer(text) {
  const q = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const intent of KB) {
    let score = 0
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.length // longer keyword = stronger match
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }
  if (best && bestScore > 0) return { answer: best.answer, chips: best.chips }
  return { answer: FALLBACK }
}

// Format the current time as "05:13 PM" for the message meta line.
function nowTime() {
  return new Date()
    .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    .toUpperCase()
}

let idSeq = 0
const newId = () => `m${++idSeq}`

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: newId(),
      from: 'bot',
      time: nowTime(),
      text: 'Hello, welcome to Dawn High School online assistance. 👋',
    },
    {
      id: newId(),
      from: 'bot',
      time: nowTime(),
      text: 'How may I assist you today?',
      menu: true,
    },
  ])
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // auto-scroll to latest message
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  // focus the input when the panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

  // `display` is what the user sees in their bubble; `resolve` is what we match
  // against the knowledge base (lets menu buttons show a nice label).
  const send = (display, resolve) => {
    const shown = (display || '').trim()
    if (!shown) return
    setMessages((m) => [...m, { id: newId(), from: 'user', time: nowTime(), text: shown }])
    setTyping(true)

    // simulate a short "thinking" delay for a natural feel
    window.setTimeout(() => {
      const { answer, chips } = findAnswer(resolve || shown)
      setTyping(false)
      setMessages((m) => [...m, { id: newId(), from: 'bot', time: nowTime(), text: answer, chips }])
    }, 600)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const val = inputRef.current?.value || ''
    send(val)
    if (inputRef.current) inputRef.current.value = ''
  }

  const onChip = (chip) => {
    if (chip.to) {
      navigate(chip.to)
      setOpen(false)
    } else if (chip.href) {
      window.location.href = chip.href
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        className={`cbot-launch ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with Dawn Assistant'}
        whileTap={{ scale: 0.92 }}
      >
        <span className="cbot-launch-ic" aria-hidden="true">{open ? '✕' : '💬'}</span>
        {!open && <span className="cbot-launch-ping" aria-hidden="true" />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="cbot-panel"
            role="dialog"
            aria-label="Dawn Assistant chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="cbot-head">
              <span className="cbot-logo" aria-hidden="true">
                <img src="/dawn-logo.png" alt="" width="44" height="44" />
              </span>
              <div className="cbot-head-txt">
                <b>Dawn High School</b>
                <i><span className="cbot-dot" /> Online · replies instantly</i>
              </div>
              <button type="button" className="cbot-x" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </header>

            <div className="cbot-body" ref={bodyRef}>
              {messages.map((m) => (
                <div key={m.id} className={`cbot-msg ${m.from}`}>
                  <span className="cbot-meta">
                    {m.from === 'bot' ? 'Dawn' : 'You'} : {m.time}
                  </span>
                  <div className="cbot-bubble">{m.text}</div>

                  {m.menu && (
                    <div className="cbot-menu">
                      {MENU.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="cbot-menu-btn"
                          onClick={() => send(item.label, item.q)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.chips && (
                    <div className="cbot-chips">
                      {m.chips.map((c) => (
                        <button key={c.label} type="button" className="cbot-chip" onClick={() => onChip(c)}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="cbot-msg bot">
                  <div className="cbot-bubble cbot-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
            </div>

            <form className="cbot-input" onSubmit={onSubmit}>
              <input ref={inputRef} type="text" placeholder="Type your question…" aria-label="Type your message" />
              <button type="submit" aria-label="Send">➤</button>
            </form>

            <div className="cbot-foot">
              <p className="cbot-disclaimer">
                By sharing your email and mobile number, you agree to receive updates from Dawn High School
                via Email / SMS / WhatsApp / Calls.
              </p>
              <p className="cbot-powered">Powered By <span>Edullent</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
