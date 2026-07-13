import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './common'
import FlipWords from './FlipWords'

const TABS = ['Overview', 'Attendance', 'Grades', 'Reports', 'Fees']

/* How long each screen stays before auto-advancing */
const CYCLE = 4200

/* Right-side copy that changes together with each dashboard screen */
const COPY = {
  Overview: {
    title: 'Dashboard with all analytical information',
    text: 'Leverage data-driven insights to enhance decision-making and simplify the everyday workflow — for teachers, parents and students alike.',
    feats: [
      ['📊', 'Live academic analytics', 'Attendance, grades and test trends update in real time.'],
      ['🔔', 'Smart alerts', 'Parents are notified the moment something needs attention.'],
      ['🗂️', 'One unified record', 'Every report card, fee and remark in a single place.'],
    ],
  },
  Attendance: {
    title: 'Attendance tracked, effortlessly',
    text: "See daily presence at a glance and spot patterns early — every entry syncs the moment it's marked.",
    feats: [
      ['📅', 'Real-time roll call', 'Presence updates the second a teacher marks it.'],
      ['🔔', 'Instant absence alerts', 'Parents hear about an absence right away, not days later.'],
      ['📈', 'Weekly trend insights', 'Early warning when a pattern starts to slip.'],
    ],
  },
  Grades: {
    title: 'Every grade, clearly in view',
    text: "Follow each subject's progress with clean, honest numbers — no more chasing scattered mark sheets.",
    feats: [
      ['🎯', 'Subject-wise breakdown', 'See exactly where a student is strong or needs help.'],
      ['🏅', 'Live class ranking', 'Standing and GPA recalculated automatically.'],
      ['📊', 'Progress at a glance', 'Clean bars replace confusing spreadsheets.'],
    ],
  },
  Reports: {
    title: 'Report cards, always at hand',
    text: 'Term reports, assessments and teacher notes gathered in one tidy timeline you can open anytime.',
    feats: [
      ['📄', 'One-tap report access', 'Every report card and assessment, ready to view.'],
      ['🗓️', 'Release reminders', 'Know the moment a new report goes live.'],
      ['📝', 'Parent–teacher notes', 'Personal remarks kept alongside the record.'],
    ],
  },
  Fees: {
    title: 'Fees made effortless',
    text: "Track what's paid, what's pending and what's next — clear balances with zero guesswork.",
    feats: [
      ['💳', 'Transparent balances', 'Paid and due amounts always add up cleanly.'],
      ['⏰', 'Due-date reminders', 'A gentle nudge before a term payment is due.'],
      ['🧾', 'Instant receipts', 'Every payment logged and receipted on the spot.'],
    ],
  },
}

/* ---------- Per-tab dashboard content ---------- */

function Overview() {
  return (
    <div className="ip-charts">
      <div className="ip-card">
        <small>Attendance</small>
        <svg viewBox="0 0 200 84" preserveAspectRatio="none" className="ip-svg">
          <defs>
            <linearGradient id="ipAtt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#10b981" stopOpacity="0.32" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 64 L25 48 L50 56 L75 30 L100 40 L125 22 L150 34 L175 16 L200 26 L200 84 L0 84 Z" fill="url(#ipAtt)" />
          <polyline points="0,64 25,48 50,56 75,30 100,40 125,22 150,34 175,16 200,26"
            fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="ip-card">
        <small>Normalized Grade</small>
        <svg viewBox="0 0 200 84" preserveAspectRatio="none" className="ip-svg">
          <defs>
            <linearGradient id="ipBell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6366f1" stopOpacity="0.30" />
              <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 78 C60 78 72 16 100 16 C128 16 140 78 200 78 L200 84 L0 84 Z" fill="url(#ipBell)" />
          <path d="M0 78 C60 78 72 16 100 16 C128 16 140 78 200 78"
            fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="ip-card ip-wide">
        <small>Test Performance</small>
        <div className="ip-bars">
          {[52, 70, 44, 86, 60, 78, 50, 90, 66, 74].map((h, i) => (
            <span key={i} className={i % 2 ? 'b-gold' : 'b-royal'} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatRow({ items }) {
  return (
    <div className="ip-card ip-wide ip-statrow">
      {items.map(([label, val, tone]) => (
        <div key={label}>
          <small>{label}</small>
          <b className={`ip-stat${tone ? ` ${tone}` : ''}`}>{val}</b>
        </div>
      ))}
    </div>
  )
}

function Attendance() {
  const week = [['Mon', 92], ['Tue', 98], ['Wed', 86], ['Thu', 100], ['Fri', 95]]
  return (
    <div className="ip-charts">
      <StatRow items={[['Present', '96.4%', 'ok'], ['Absent', '2.1%', 'bad'], ['Late', '1.5%', 'warn']]} />
      <div className="ip-card ip-wide">
        <small>This Week</small>
        <div className="ip-bars labelled">
          {week.map(([d, h]) => (
            <span key={d} className="b-royal" style={{ height: `${h}%` }} data-label={d} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Grades() {
  const subjects = [
    ['Mathematics', 'A', 92], ['Science', 'A−', 88],
    ['English', 'B+', 84], ['Social Studies', 'A', 90], ['Computer', 'A+', 96],
  ]
  return (
    <div className="ip-charts">
      <StatRow items={[['GPA', '3.8'], ['Class Rank', '#4'], ['Credits', '42']]} />
      <div className="ip-card ip-wide ip-rows">
        {subjects.map(([name, grade, pct]) => (
          <div className="ip-row" key={name}>
            <span className="ip-row-name">{name}</span>
            <span className="ip-prog"><span className="ip-prog-i" style={{ width: `${pct}%` }} /></span>
            <span className="ip-pill">{grade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reports() {
  const reports = [
    ['Term 1 Report Card', 'Released · Oct 2025'],
    ['Mid-Term Assessment', 'Released · Dec 2025'],
    ['Parent–Teacher Notes', 'Updated · Jan 2026'],
    ['Term 2 Report Card', 'Pending · Mar 2026'],
  ]
  return (
    <div className="ip-charts">
      <div className="ip-card ip-wide ip-rows">
        {reports.map(([name, meta], i) => (
          <div className="ip-row" key={name}>
            <span className="ip-row-ic">📄</span>
            <span className="ip-row-name">
              {name}<em>{meta}</em>
            </span>
            <span className={`ip-tag${i === 3 ? ' muted' : ''}`}>{i === 3 ? 'Soon' : 'View'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Fees() {
  const terms = [
    ['Term 1 Tuition', '₹40,000', 'paid'],
    ['Term 2 Tuition', '₹40,000', 'paid'],
    ['Term 3 Tuition', '₹40,000', 'due'],
  ]
  return (
    <div className="ip-charts">
      <StatRow items={[['Total', '₹1,20,000'], ['Paid', '₹80,000', 'ok'], ['Due', '₹40,000', 'warn']]} />
      <div className="ip-card ip-wide ip-rows">
        {terms.map(([name, amt, st]) => (
          <div className="ip-row" key={name}>
            <span className="ip-row-name">{name}</span>
            <span className="ip-row-amt">{amt}</span>
            <span className={`ip-tag ${st === 'paid' ? 'ok' : 'warn'}`}>{st === 'paid' ? 'Paid' : 'Due'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PANELS = { Overview, Attendance, Grades, Reports, Fees }

export default function Insights() {
  const [tab, setTab] = useState('Overview')
  const [paused, setPaused] = useState(false)
  const Panel = PANELS[tab]
  const copy = COPY[tab]
  const timer = useRef(null)

  /* Auto-advance to the next screen unless the visitor is hovering */
  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(() => {
      setTab((cur) => TABS[(TABS.indexOf(cur) + 1) % TABS.length])
    }, CYCLE)
    return () => clearTimeout(timer.current)
  }, [tab, paused])

  /* Manual pick — jump straight there and restart the cycle */
  const pick = useCallback((t) => setTab(t), [])

  return (
    <section className="section insights" id="insights">
      <div className="container">
        <div className="insights-head">
          <Reveal>
            <span className="eyebrow">Dawn Smart Campus</span>
            <h2 className="insights-title">
              Innovate Your <FlipWords words={['Classroom', 'Learning', 'Curiosity', 'Future']} className="insights-flip" />
              <br />
              Exploring Dawn <span className="accent">Features</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link to="/admissions" className="insights-demo">
              Go Demo <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <div
          className="insights-grid"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Dashboard mock-up */}
          <Reveal className="ip-panel">
            <div className="ip-bar">
              <span className="ip-dots"><i /><i /><i /></span>
              <b>Dawn Analytics — {tab}</b>
              <span className="ip-live">● Live</span>
            </div>

            <div className="ip-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="ip-nav" role="tablist" aria-label="Dashboard sections">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  className={tab === t ? 'on' : ''}
                  onClick={() => pick(t)}
                >
                  {t}
                  {tab === t && !paused && (
                    <span key={`${t}-p`} className="ip-tab-prog" style={{ animationDuration: `${CYCLE}ms` }} />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Copy — swaps together with the active screen */}
          <div className="insights-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3>{copy.title}</h3>
                <p>{copy.text}</p>
                <ul className="insights-feats">
                  {copy.feats.map(([ic, t, d]) => (
                    <li key={t}>
                      <span className="if-ic">{ic}</span>
                      <div>
                        <b>{t}</b>
                        <p>{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
