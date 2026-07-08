// Catalogue of admin-editable TEXT slots, grouped by page → section. Each field
// has a stable `key` (matched by the page component via usePageText), a human
// `label`, the built-in `def` text (shown as the current value / placeholder),
// and an optional `multiline` flag for longer copy.
//
// Keep the `def` values in sync with the matching component's hard-coded default
// so the admin panel shows the real current text.

// Small helper: build a field object. `m` marks a multiline (textarea) field.
const F = (key, label, def, m = false) => ({ key, label, def, multiline: m })

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

// --- Home: Announcement ticker (AnnounceTicker.jsx) --------------------------
// The slim scrolling "Latest" strip at the top of the homepage. Keep these
// defaults in sync with the NEWS array in AnnounceTicker.jsx.
const TICKER = [
  '🎉 Admissions Open 2026–27 — Enroll Now at Dawn High School!',
  '🏆 Congratulations to our Top Achievers!',
  '📘 Now an Oxford University Press — Quality Partner',
  '🌟 New Activity Programs Launched',
  '🏅 Ranked Among Hyderabad’s Top Schools',
]
const tickerFields = TICKER.map((t, i) => F(`home.ticker.${i + 1}`, `Message ${i + 1}`, t))

// =============================================================================
// ABOUT PAGE (About.jsx + AboutPage.jsx)
// =============================================================================
const aboutSections = [
  {
    title: 'Intro — Welcome',
    note: 'The “About Our School” block with the photo collage and welcome copy.',
    fields: [
      F('about.intro.kicker', 'Kicker (above title)', "About Our School"),
      F('about.intro.title', 'Title', "Welcome To"),
      F('about.intro.accent', 'Highlighted words', "Dawn High School"),
      F('about.intro.lead', 'Lead paragraph', "A trusted name in education since 2000, offering a rich and versatile academic framework that balances strong academics, character, and global readiness.", true),
      F('about.intro.feat.1.t', 'Feature 1 — Title', "Two Decades of Trust"),
      F('about.intro.feat.1.d', 'Feature 1 — Description', "A nurturing institution since 2000, shaping thousands of confident, capable and caring students.", true),
      F('about.intro.feat.2.t', 'Feature 2 — Title', "Globally Connected Learning"),
      F('about.intro.feat.2.d', 'Feature 2 — Description', "An Oxford University Press partner with an internationally informed, future-ready curriculum.", true),
      F('about.intro.quote', 'Pull-quote', "Our commitment to excellence and strong values ensures every child receives a world-class education rooted in character.", true),
      F('about.intro.cta', 'Button text', "Admission Process"),
      F('about.intro.helpLabel', 'Helpline label', "Admission Helpline"),
      F('about.intro.helpNum', 'Helpline number', "+91 81076 66766"),
    ],
  },
  {
    title: 'Vision & Mission',
    fields: [
      F('about.vm.title', 'Title', "Our"),
      F('about.vm.accent', 'Highlighted words', "Vision & Mission"),
      F('about.vm.vision', 'Vision text', "To be the most trusted institution of learning in the region — empowering students through knowledge, character, and global readiness.", true),
      F('about.vm.mission', 'Mission text', "Rooted in tradition, Dawn fosters compassionate, competent, and future-ready citizens by providing a nurturing, inclusive, and innovative learning environment.", true),
    ],
  },
  {
    title: 'Leadership — Founder & Head',
    fields: [
      F('about.lead.eyebrow', 'Section — Eyebrow', "Our Leadership"),
      F('about.lead.title', 'Section — Title', "The Visionary Behind"),
      F('about.lead.accent', 'Section — Highlighted words', "Dawn High School"),
      F('about.founder.name', 'Founder — Name', "Janab Razi-ur-Rahman Sahab"),
      F('about.founder.role', 'Founder — Role', "Founder"),
      F('about.founder.p1', 'Founder — Paragraph 1', "A visionary educator and the guiding spirit behind Dawn High School, Janab Razi-ur-Rahman Sahab believed that education is the truest path to dignity, opportunity, and lasting change. With unwavering commitment, he laid the foundation of an institution rooted in knowledge, character, and service to the community.", true),
      F('about.founder.p2', 'Founder — Paragraph 2', "His vision was simple yet profound — to create a school where every child, regardless of background, could learn with confidence and grow into a responsible, compassionate citizen. That vision continues to shape the values, culture, and aspirations of Dawn High School to this day.", true),
      F('about.leader.name', 'Leadership — Name', "Mr. Fazlur Rahman Khurram"),
      F('about.leader.role', 'Leadership — Role', "Leadership"),
      F('about.leader.p1', 'Leadership — Paragraph 1', "A dedicated leader carrying forward the founding vision of Dawn High School, Mr. Fazlur Rahman Khurram brings warmth, discipline, and a deep commitment to nurturing every student's potential.", true),
      F('about.leader.p2', 'Leadership — Paragraph 2', "Under his guidance, the school continues to uphold its tradition of academic excellence, strong values, and care for the community — ensuring that the legacy of Dawn grows stronger with each passing year.", true),
    ],
  },
  {
    title: 'Recognition & Honours',
    fields: [
      F('about.rec.eyebrow', 'Eyebrow', "Recognition & Honours"),
      F('about.rec.title', 'Title', "Celebrating Excellence at Dawn"),
      F('about.rec.desc', 'Description', "Dawn High School takes pride in recognising and rewarding excellence — among students, educators, and the wider community that makes our mission possible.", true),
      F('about.rec.point.1', 'Point 1', "Honouring outstanding academic and co-curricular achievement"),
      F('about.rec.point.2', 'Point 2', "Felicitating distinguished guests and community leaders"),
      F('about.rec.point.3', 'Point 3', "Celebrating the dedication of our teachers and staff"),
      F('about.rec.point.4', 'Point 4', "Building a culture that values merit, effort, and character"),
    ],
  },
  {
    title: 'Journey',
    fields: [
      F('about.journey.eyebrow', 'Eyebrow', "Our Journey"),
      F('about.journey.title', 'Title', "Two Decades of"),
      F('about.journey.accent', 'Highlighted words', "Growth"),
      ...[
        ['2000', 'Founded', 'Dawn High School opens its doors with 120 students and a bold vision.'],
        ['2008', 'Campus Expansion', 'A new 12-acre smart campus with advanced science and technology labs.'],
        ['2016', 'Digital Transformation', 'Every classroom becomes a connected, smart-learning environment.'],
        ['2024', 'National Recognition', 'Ranked among the region’s top institutions for academic excellence.'],
      ].flatMap((j, i) => {
        const n = i + 1
        return [
          F(`about.journey.${n}.year`, `Milestone ${n} — Year`, j[0]),
          F(`about.journey.${n}.title`, `Milestone ${n} — Title`, j[1]),
          F(`about.journey.${n}.desc`, `Milestone ${n} — Description`, j[2], true),
        ]
      }),
    ],
  },
  {
    title: 'Core Values',
    fields: [
      F('about.values.eyebrow', 'Eyebrow', "Core Values"),
      F('about.values.title', 'Title', "Our Core"),
      F('about.values.accent', 'Highlighted words', "Values"),
      F('about.values.lead', 'Lead text', "We believe values are the foundation of meaningful education. At Dawn, our core values are reflected in every aspect of school life — from classrooms and curriculum to community initiatives.", true),
      ...[
        ['Empathy', 'We teach our students to understand and care for others, fostering kindness and respect in every interaction.'],
        ['Excellence', 'Pursuing high standards in academics, arts, and personal growth is part of our everyday culture.'],
        ['Courage', 'We encourage bold thinking, resilience, and the confidence to take on new challenges.'],
        ['Innovation', 'We nurture curiosity and creativity, integrating modern tools and teaching methods to prepare students for the future.'],
        ['Integrity', 'Honesty and strong moral principles form the cornerstone of our community.'],
      ].flatMap((v, i) => {
        const n = i + 1
        return [
          F(`about.values.${n}.t`, `Value ${n} — Title`, v[0]),
          F(`about.values.${n}.d`, `Value ${n} — Description`, v[1], true),
        ]
      }),
    ],
  },
  {
    title: "Principal's Message",
    fields: [
      F('about.principal.quote', 'Quote', "At Dawn, we don’t just prepare students for examinations — we prepare them for life. Every child who walks through our gates carries the potential to change the world, and it is our privilege to help them discover it.", true),
      F('about.principal.name', 'Name', "Dr. Eleanor Hayes"),
      F('about.principal.role', 'Role', "Principal, Dawn High School"),
    ],
  },
]

// =============================================================================
// ACADEMICS PAGE (Academics.jsx + AcademicsPage.jsx)
// =============================================================================
const ACAD_PROGRAMS = [
  ['Primary School', 'Grades 1 – 5', 'Foundation Years', 'Joyful Foundations for Lifelong Learning',
    'A nurturing, activity-rich environment where curiosity is celebrated and core literacy, numeracy, and social skills are built on strong, caring foundations.',
    ['Phonics & Early Literacy', 'Concept-Based Math', 'Creative Arts', 'Outdoor Discovery']],
  ['Middle School', 'Grades 6 – 8', 'Growth Years', 'Building Critical Thinkers & Innovators',
    'Students transition into deeper inquiry with a rigorous, interdisciplinary curriculum that sharpens reasoning, collaboration, and independent study habits.',
    ['STEM Integration', 'Research Projects', 'Global Languages', 'Leadership Labs']],
  ['High School', 'Grades 9 – 12', 'Senior Years', 'Preparing Scholars for Top Universities',
    'An academically demanding program with specialized streams, advanced placement options, and dedicated career counseling to secure placements at leading universities.',
    ['Science & Commerce Streams', 'AP & Honors Courses', 'University Counseling', 'Capstone Research']],
  ['Science & Technology', 'All Levels', 'Innovation Track', 'Hands-On Science, Robotics & Innovation',
    'State-of-the-art laboratories and a dedicated innovation hub where students explore robotics, AI, biotechnology, and engineering through real-world projects.',
    ['Robotics & AI Lab', 'Maker Space', 'Science Olympiad', 'Innovation Hub']],
  ['Digital Learning', 'All Levels', 'Smart Campus', 'A Connected, Future-Ready Classroom',
    'Every classroom is digitally enabled with smart boards, a personalized learning platform, and a one-to-one device program that extends learning beyond walls.',
    ['Smart Classrooms', '1:1 Device Program', 'Coding from Grade 3', 'Adaptive Learning AI']],
]

const academicsSections = [
  {
    title: 'Hero Banner',
    note: 'The banner at the very top of the Academics page.',
    fields: [
      F('academics.hero.kicker', 'Kicker', "Academic Excellence"),
      F('academics.hero.title', 'Title', "Programs for Every Stage of Growth"),
      F('academics.hero.subtitle', 'Subtitle', "From first steps to final exams, our academic pathways challenge, inspire, and empower students at every level.", true),
    ],
  },
  {
    title: 'Programs (tabbed section)',
    note: 'The interactive tabs listing each academic program.',
    fields: [
      F('academics.programs.eyebrow', 'Heading — Eyebrow', "Academic Excellence"),
      F('academics.programs.title', 'Heading — Title', "Programs Designed for Every"),
      F('academics.programs.accent', 'Heading — Highlighted words', "Stage of Growth"),
      F('academics.programs.lead', 'Heading — Lead', "From first steps to final exams, our carefully crafted academic pathways challenge, inspire, and empower students at every level.", true),
      ...ACAD_PROGRAMS.flatMap((p, i) => {
        const n = i + 1
        return [
          F(`academics.program.${n}.name`, `Program ${n} — Tab name`, p[0]),
          F(`academics.program.${n}.grades`, `Program ${n} — Grades`, p[1]),
          F(`academics.program.${n}.tag`, `Program ${n} — Tag`, p[2]),
          F(`academics.program.${n}.title`, `Program ${n} — Title`, p[3]),
          F(`academics.program.${n}.desc`, `Program ${n} — Description`, p[4], true),
          ...p[5].map((f, fi) => F(`academics.program.${n}.feat.${fi + 1}`, `Program ${n} — Feature ${fi + 1}`, f)),
        ]
      }),
    ],
  },
  {
    title: 'Oxford Curriculum Framework',
    fields: [
      F('academics.oxford.eyebrow', 'Heading — Eyebrow', "Global Excellence, Powered by the British Curriculum"),
      F('academics.oxford.title', 'Heading — Title', "Unlocking Potential with the"),
      F('academics.oxford.accent', 'Heading — Highlighted words', "Oxford Curriculum Framework"),
      F('academics.oxford.eyebrow2', 'Card — Eyebrow', "UK-Based Global Curriculum"),
      F('academics.oxford.title2', 'Card — Title', "A World-Class British Education"),
      F('academics.oxford.desc', 'Card — Description', "Dawn High School delivers the Oxford Curriculum Framework — a UK-based, globally recognised programme designed by expert boards and refined through cutting-edge research to give every student a strong, future-ready foundation.", true),
      F('academics.oxford.point.1', 'Point 1', "UK-based, globally recognised curriculum"),
      F('academics.oxford.point.2', 'Point 2', "Designed by expert boards & top research centres"),
      F('academics.oxford.point.3', 'Point 3', "Structured for strong, measurable student growth"),
      F('academics.oxford.point.4', 'Point 4', "Refined through cutting-edge research"),
      F('academics.oxford.point.5', 'Point 5', "Future-ready skills: Robotics, Coding & STEM"),
    ],
  },
  {
    title: 'Learning Philosophy',
    fields: [
      F('academics.philo.eyebrow', 'Heading — Eyebrow', "Our Approach"),
      F('academics.philo.title', 'Heading — Title', "A Philosophy Built for"),
      F('academics.philo.accent', 'Heading — Highlighted words', "Real Learning"),
      ...[
        ['Inquiry-Based', 'Students learn by questioning, exploring, and discovering — not memorising.'],
        ['Personalised', 'Adaptive pathways and small class sizes meet every learner where they are.'],
        ['Future-Ready', 'Coding, critical thinking, and real-world projects from an early age.'],
      ].flatMap((p, i) => {
        const n = i + 1
        return [
          F(`academics.philo.${n}.t`, `Card ${n} — Title`, p[0]),
          F(`academics.philo.${n}.d`, `Card ${n} — Description`, p[1], true),
        ]
      }),
    ],
  },
  {
    title: 'Subjects',
    fields: [
      F('academics.subjects.eyebrow', 'Heading — Eyebrow', "Curriculum"),
      F('academics.subjects.title', 'Heading — Title', "Subjects We"),
      F('academics.subjects.accent', 'Heading — Highlighted words', "Offer"),
      F('academics.subjects.lead', 'Heading — Lead', "A broad, balanced curriculum that lets every student discover and pursue their passion.", true),
      ...[
        ['Mathematics', 'Algebra · Calculus · Statistics'],
        ['Sciences', 'Physics · Chemistry · Biology'],
        ['Languages', 'English · Urdu · Telugu · Hindi'],
        ['Humanities', 'History · Geography · Civics'],
        ['Computer Science', 'Computer Basics · MS Office · Coding'],
        ['Visual & Performing Arts', 'Art · Music · Theatre'],
        ['Commerce', 'Economics · Business · Accounts'],
        ['Physical Education', 'Athletics · Wellness · Teamwork'],
      ].flatMap((s, i) => {
        const n = i + 1
        return [
          F(`academics.subject.${n}.b`, `Subject ${n} — Name`, s[0]),
          F(`academics.subject.${n}.s`, `Subject ${n} — Detail`, s[1]),
        ]
      }),
    ],
  },
  {
    title: 'Assessment',
    fields: [
      F('academics.assess.eyebrow', 'Heading — Eyebrow', "Assessment"),
      F('academics.assess.title', 'Heading — Title', "How We"),
      F('academics.assess.accent', 'Heading — Highlighted words', "Measure Growth"),
      ...[
        ['Continuous Assessment', 'Regular feedback over high-stakes testing keeps learning on track.'],
        ['Project-Based', 'Capstone projects and portfolios demonstrate real understanding.'],
        ['Data-Informed', 'Each student’s progress is tracked to personalise support and stretch.'],
      ].flatMap((a, i) => {
        const n = i + 1
        return [
          F(`academics.assess.${n}.t`, `Card ${n} — Title`, a[0]),
          F(`academics.assess.${n}.d`, `Card ${n} — Description`, a[1], true),
        ]
      }),
    ],
  },
]

// =============================================================================
// CAMPUS PAGE (CampusLife.jsx + CampusPage.jsx + Library.jsx campus variant)
// =============================================================================
const campusSections = [
  {
    title: 'Hero Banner',
    note: 'The banner at the very top of the Campus page.',
    fields: [
      F('campus.hero.kicker', 'Kicker', "Campus Life"),
      F('campus.hero.title', 'Title', "Where Learning Extends Beyond the Classroom"),
      F('campus.hero.subtitle', 'Subtitle', "A vibrant 12-acre campus where every passion finds a home — sports, arts, science, and service.", true),
    ],
  },
  {
    title: 'Campus Life (photo grid)',
    fields: [
      F('campus.life.eyebrow', 'Heading — Eyebrow', "Campus Life"),
      F('campus.life.title', 'Heading — Title', "Where Learning Extends"),
      F('campus.life.accent', 'Heading — Highlighted words', "Beyond the Classroom"),
      F('campus.life.lead', 'Heading — Lead', "A vibrant campus where every passion finds a home — building well-rounded individuals through sports, arts, science, and service.", true),
      ...[
        ['Sports & Athletics', '14 Disciplines', 'Olympic-grade facilities across 14 disciplines, from cricket to swimming.'],
        ['Arts & Music', '6 Studios', 'Dedicated studios for visual arts, dance, theatre, and an orchestra.'],
        ['Science Labs', '8 Smart Labs', 'Eight smart laboratories for physics, chemistry, biology & robotics.'],
        ['Modern Library', '30K+ Volumes', 'A 30,000-volume library and digital research center.'],
        ['Student Clubs', '40+ Clubs', '40+ clubs from debate and MUN to coding and entrepreneurship.'],
        ['Leadership Activities', 'Global Programs', 'Student council, community service, and global exchange programs.'],
      ].flatMap((c, i) => {
        const n = i + 1
        return [
          F(`campus.life.${n}.title`, `Card ${n} — Title`, c[0]),
          F(`campus.life.${n}.stat`, `Card ${n} — Stat`, c[1]),
          F(`campus.life.${n}.desc`, `Card ${n} — Description`, c[2], true),
        ]
      }),
    ],
  },
  {
    title: 'Facilities',
    fields: [
      F('campus.fac.eyebrow', 'Heading — Eyebrow', "World-Class Facilities"),
      F('campus.fac.title', 'Heading — Title', "Built for"),
      F('campus.fac.accent', 'Heading — Highlighted words', "Every Ambition"),
      F('campus.fac.lead', 'Heading — Lead', "State-of-the-art infrastructure designed for safety, comfort, and inspired learning.", true),
      ...[
        ['Smart Classrooms', '60 air-conditioned rooms with interactive smart boards.'],
        ['Science Laboratories', 'Eight fully-equipped physics, chemistry, biology & robotics labs.'],
        ['Library & Media Centre', 'A 30,000-volume library and digital research commons.'],
        ['Sports Complex', 'Indoor arena, swimming pool, and Olympic-grade athletic fields.'],
        ['Auditorium', 'A 600-seat performing-arts theatre with professional staging.'],
        ['Dining Hall', 'Nutritious, freshly-prepared meals in a modern cafeteria.'],
        ['Transport', 'A GPS-tracked, safe, and comfortable bus fleet across the city.'],
        ['Medical & Wellness', 'On-campus infirmary and full-time counselling support.'],
      ].flatMap((f, i) => {
        const n = i + 1
        return [
          F(`campus.fac.${n}.t`, `Facility ${n} — Title`, f[0]),
          F(`campus.fac.${n}.d`, `Facility ${n} — Description`, f[1], true),
        ]
      }),
    ],
  },
  {
    title: 'Library Heading',
    note: 'The heading of the Library section on the Campus page.',
    fields: [
      F('campus.library.eyebrow', 'Eyebrow', "Library & Resource Centre"),
      F('campus.library.title', 'Title', "Where Every Book"),
      F('campus.library.accent', 'Highlighted words', "Opens a Door"),
      F('campus.library.lead', 'Lead text', "Spread across calm, light-filled halls, the Dawn Library invites every student to read, research, and dream. From open-stack lending shelves to a digital research commons and a dedicated children’s reading corner, there is a space here for every kind of learner.", true),
    ],
  },
]

// =============================================================================
// FACULTY PAGE (Faculty.jsx + FacultyPage.jsx)
// =============================================================================
const facultySections = [
  {
    title: 'Hero Banner',
    note: 'The banner at the very top of the Faculty page.',
    fields: [
      F('faculty.hero.kicker', 'Kicker', "Our Faculty"),
      F('faculty.hero.title', 'Title', "Mentors Who Inspire Greatness"),
      F('faculty.hero.subtitle', 'Subtitle', "Behind every great student is a great teacher. Meet the educators shaping tomorrow’s leaders.", true),
    ],
  },
  {
    title: 'Stats Strip',
    note: 'The four numbers below the hero (only the labels are editable here).',
    fields: [
      F('faculty.stat.1.label', 'Stat 1 — Label', "Qualified Educators"),
      F('faculty.stat.2.label', 'Stat 2 — Label', "Average Experience"),
      F('faculty.stat.3.label', 'Stat 3 — Label', "Student–Teacher Ratio"),
      F('faculty.stat.4.label', 'Stat 4 — Label', "PhDs & Specialists"),
    ],
  },
  {
    title: 'Faculty Members',
    fields: [
      F('faculty.head.eyebrow', 'Heading — Eyebrow', "Our Faculty"),
      F('faculty.head.title', 'Heading — Title', "Mentors Who"),
      F('faculty.head.accent', 'Heading — Highlighted words', "Inspire Greatness"),
      F('faculty.head.lead', 'Heading — Lead', "Behind every great student is a great teacher. Meet a few of the dedicated educators shaping the leaders of tomorrow.", true),
      ...[
        ['Dr. Eleanor Hayes', 'Principal', 'Ph.D. Education · 28 yrs'],
        ['Mr. Arjun Mehta', 'Head of Science', 'M.Sc. Physics · 18 yrs'],
        ['Ms. Sophia Laurent', 'Head of Humanities', 'M.A. Literature · 15 yrs'],
        ['Dr. Rajiv Nair', 'Director of Technology', 'Ph.D. Computer Sci · 20 yrs'],
      ].flatMap((m, i) => {
        const n = i + 1
        return [
          F(`faculty.member.${n}.name`, `Member ${n} — Name`, m[0]),
          F(`faculty.member.${n}.role`, `Member ${n} — Role`, m[1]),
          F(`faculty.member.${n}.qual`, `Member ${n} — Qualification`, m[2]),
        ]
      }),
    ],
  },
  {
    title: 'Departments',
    fields: [
      F('faculty.dept.eyebrow', 'Heading — Eyebrow', "Departments"),
      F('faculty.dept.title', 'Heading — Title', "Expertise Across"),
      F('faculty.dept.accent', 'Heading — Highlighted words', "Every Discipline"),
      F('faculty.dept.lead', 'Heading — Lead', "Our faculty is organised into specialised departments, each led by experienced heads.", true),
      ...[
        ['Science & Technology', '38 specialists across physics, chemistry, biology, and computer science.'],
        ['Mathematics', '24 educators making numbers intuitive, logical, and fun.'],
        ['Languages', 'Native and certified teachers in English, Urdu, Telugu, and Hindi.'],
        ['Humanities', 'Bringing history, geography, and civics to life through inquiry.'],
        ['Arts & Music', 'Professional artists, musicians, and performers mentoring talent.'],
        ['Physical Education', 'Certified coaches building fitness, discipline, and teamwork.'],
      ].flatMap((d, i) => {
        const n = i + 1
        return [
          F(`faculty.dept.${n}.t`, `Department ${n} — Title`, d[0]),
          F(`faculty.dept.${n}.d`, `Department ${n} — Description`, d[1], true),
        ]
      }),
    ],
  },
]

export const PAGE_TEXT_GROUPS = [
  {
    page: 'Home',
    sections: [
      {
        title: 'Announcement Ticker',
        note: 'The scrolling “Latest” news strip at the very top of the homepage.',
        fields: tickerFields,
      },
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
  { page: 'About', sections: aboutSections },
  { page: 'Academics', sections: academicsSections },
  { page: 'Campus', sections: campusSections },
  { page: 'Faculty', sections: facultySections },
]
