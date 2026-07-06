// Catalogue of admin-editable TEXT slots, grouped by page → section. Each field
// has a stable `key` (matched by the page component via usePageText), a human
// `label`, the built-in `def` text (shown as the current value / placeholder),
// and an optional `multiline` flag for longer copy.
//
// Keep the `def` values in sync with the matching component's hard-coded default
// so the admin panel shows the real current text.

// --- Home: Awards slider (Recognition.jsx) -----------------------------------
const AWARDS = [
  { tag: 'Oxford University Press Partner', t0: 'Officially Partnered with', t1: 'Oxford',
    desc: 'Delivering the Oxford Quality English curriculum across our classrooms for the academic year 2025–2026.' },
  { tag: 'National Honour', t0: 'Global Education', t1: 'Excellence Award',
    desc: 'Recognised at the National Education & Trade Development summit for our outstanding contribution to education.' },
  { tag: 'Certified Excellence', t0: 'An Institution of', t1: 'Distinction',
    desc: 'Certified for excellence in industry-aligned education and holistic student development.' },
  { tag: 'International Ties', t0: 'Building Global', t1: 'Academic Bridges',
    desc: 'Forging international collaborations with diplomatic and educational leaders across the world.' },
  { tag: 'Civic Honour', t0: 'Recognised by', t1: 'Civic Leadership',
    desc: 'Felicitated by distinguished public representatives for our impact on the community.' },
  { tag: 'Inspiring Minds', t0: 'Hosting Literary', t1: 'Laureates',
    desc: 'Welcoming Sahitya Academy Award winner Janab Khalid Hussain to mentor and inspire our students.' },
]

const awardsFields = AWARDS.flatMap((s, i) => {
  const n = i + 1
  return [
    { key: `home.awards.${n}.tag`,   label: `Slide ${n} — Eyebrow`, def: s.tag },
    { key: `home.awards.${n}.t0`,    label: `Slide ${n} — Title`, def: s.t0 },
    { key: `home.awards.${n}.t1`,    label: `Slide ${n} — Highlighted word`, def: s.t1 },
    { key: `home.awards.${n}.desc`,  label: `Slide ${n} — Description`, def: s.desc, multiline: true },
  ]
})

// --- Home: Distinctly Dawn (Distinctly.jsx) ----------------------------------
const DISTINCT = [
  { accent: 'Stretch',  rest: 'Your Intellect',
    desc: 'Dawn students are empowered to explore. We are known for academic rigor, with faculty fiercely committed to guiding young minds and developing strength of intellect through innovative, inquiry-led curricula.',
    caps: ['Inquiry-Led Mastery', 'Honors & AP Courses', 'Schedules Built for Deep Learning'] },
  { accent: 'Make',     rest: 'It Your Own',
    desc: 'No two learners are alike. Personalised pathways, a rich slate of electives, and independent study give every student the freedom to pursue their passions and shape their own journey.',
    caps: ['Personalised Pathways', 'Signature Electives', 'Independent Study'] },
  { accent: 'Connect',  rest: 'Beyond the Classroom',
    desc: 'Learning extends far beyond four walls. Through 40+ clubs, community service, and global exchange programs, students build character, leadership, and lifelong friendships.',
    caps: ['Clubs & Leadership', 'Community Service', 'Global Exchange'] },
  { accent: 'Find',     rest: 'Your Place',
    desc: 'A close-knit community where everyone belongs. Mentorship, wellbeing support, and a culture of respect ensure each student feels seen, supported, and inspired to thrive.',
    caps: ['Mentorship', 'Wellbeing & Support', 'A Culture of Respect'] },
  { accent: 'Explore',  rest: 'a Campus Unlike Others',
    desc: 'A 12-acre smart campus designed for discovery — advanced labs, a digital library, performing-arts studios, and athletic facilities that bring learning to life.',
    caps: ['Digital Library', 'Smart Laboratories', 'Arts & Athletics'] },
]

const distinctFields = [
  { key: 'home.distinct.kicker', label: 'Small kicker (above title)', def: 'Distinctly' },
  { key: 'home.distinct.title',  label: 'Big title', def: 'Dawn' },
  ...DISTINCT.flatMap((it, i) => {
    const n = i + 1
    return [
      { key: `home.distinct.${n}.accent`, label: `Item ${n} — Highlighted word`, def: it.accent },
      { key: `home.distinct.${n}.rest`,   label: `Item ${n} — Rest of heading`, def: it.rest },
      { key: `home.distinct.${n}.desc`,   label: `Item ${n} — Description`, def: it.desc, multiline: true },
      ...it.caps.map((c, ci) => ({ key: `home.distinct.${n}.cap${ci + 1}`, label: `Item ${n} — Card ${ci + 1} title`, def: c })),
    ]
  }),
]

export const PAGE_TEXT_GROUPS = [
  {
    page: 'Home',
    sections: [
      {
        title: 'Awards Slider',
        note: 'The full-width slider at the very top of the homepage (Oxford, awards, partnerships).',
        fields: awardsFields,
      },
      {
        title: 'Distinctly Dawn',
        note: 'The rotating “Distinctly Dawn” feature section with its five themes and cards.',
        fields: distinctFields,
      },
    ],
  },
]
