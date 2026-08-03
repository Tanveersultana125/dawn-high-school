// The catalogue of admin-editable image slots, grouped by page. Each slot's
// `key` matches the key used by the page component via usePageImage(); `def` is
// the built-in default shown as a preview in the admin panel (the page keeps its
// own copy of this default, so the two only need to agree for the thumbnail).
// Hero slots use an empty `def` — with no image the page keeps its animated
// particle backdrop, and an uploaded image layers behind it.
// `section` names the block of the live page the photo appears in, so the admin
// panel can group the cards the same way the visitor sees them.

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

export const PAGE_IMAGE_GROUPS = [
  {
    page: 'Home',
    slots: [
      { key: 'home.award.1', section: 'Awards & Recognition slider', label: 'Awards slider — Oxford Partner',        def: '/achievements/oxford-quality.png' },
      { key: 'home.award.2', section: 'Awards & Recognition slider', label: 'Awards slider — Global Education Award', def: '/achievements/global-education-award.png' },
      { key: 'home.award.3', section: 'Awards & Recognition slider', label: 'Awards slider — Institution of Distinction', def: '/achievements/education-certificate.png' },
      { key: 'home.award.4', section: 'Awards & Recognition slider', label: 'Awards slider — International Ties',     def: '/achievements/turkey-consulate.png' },
      { key: 'home.award.5', section: 'Awards & Recognition slider', label: 'Awards slider — Civic Honour',          def: '/achievements/dawn-recognition.png' },
      { key: 'home.award.6', section: 'Awards & Recognition slider', label: 'Awards slider — Literary Laureates',    def: '/achievements/sahitya-academy.png' },
      { key: 'home.division.1', section: 'The Dawn Journey cards', label: 'Dawn Journey — Early Years card',    def: U('photo-1577896851231-70ef18881754') },
      { key: 'home.division.2', section: 'The Dawn Journey cards', label: 'Dawn Journey — Primary School card', def: U('photo-1503676260728-1c00da094a0b') },
      { key: 'home.division.3', section: 'The Dawn Journey cards', label: 'Dawn Journey — Middle School card',  def: U('photo-1562774053-701939374585') },
      { key: 'home.division.4', section: 'The Dawn Journey cards', label: 'Dawn Journey — High School card',    def: U('photo-1523240795612-9a054b0db644') },
      { key: 'home.library', section: 'Library', label: 'Library section image',                 def: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80' },
    ],
  },
  {
    page: 'About',
    slots: [
      { key: 'about.collage.1', section: 'Intro collage', label: 'Intro collage — main photo',   def: U('photo-1588072432836-e10032774350') },
      { key: 'about.collage.2', section: 'Intro collage', label: 'Intro collage — oval photo',   def: U('photo-1523580494863-6f3031224c94') },
      { key: 'about.collage.3', section: 'Intro collage', label: 'Intro collage — science lab',  def: U('photo-1532094349884-543bc11b234d') },
      { key: 'about.vision',    section: 'Vision & Mission', label: 'Vision & Mission image',    def: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1100&q=80' },
      { key: 'about.founder',   section: 'Founder & Leadership', label: 'Founder photo (Razi-ur-Rahman Sahab)', def: '/founder.jpg' },
      { key: 'about.leadership',section: 'Founder & Leadership', label: 'Leadership photo (F. R. Khurram)',     def: '/khurram.png' },
      { key: 'about.award',     section: 'Celebrating Excellence', label: 'Award ceremony photo', def: '/dawn-award.jpg' },
    ],
  },
  {
    page: 'Academics',
    slots: [
      { key: 'academics.hero', section: 'Hero banner (top of page)', label: 'Hero banner background (optional)', def: '' },
      { key: 'academics.oxfordCurriculum', section: 'Oxford Curriculum', label: 'Oxford Curriculum image', def: '/oxford-curriculum.png' },
      { key: 'academics.excel.poster', section: 'Achievers / Results', label: 'Achievers / SSC results poster', def: '/ssc-toppers.png' },
    ],
  },
  {
    page: 'Campus',
    slots: [
      { key: 'campus.hero',   section: 'Hero banner (top of page)', label: 'Hero banner background (optional)', def: '' },
      { key: 'campus.life.1', section: 'Campus Life cards', label: 'Campus Life — Sports & Athletics', def: U('photo-1461896836934-ffe607ba8211') },
      { key: 'campus.life.2', section: 'Campus Life cards', label: 'Campus Life — Arts & Music',       def: U('photo-1511671782779-c97d3d27a1d4') },
      { key: 'campus.life.3', section: 'Campus Life cards', label: 'Campus Life — Science Labs',       def: U('photo-1532094349884-543bc11b234d') },
      { key: 'campus.life.4', section: 'Campus Life cards', label: 'Campus Life — Modern Library',     def: U('photo-1497486751825-1233686d5d80') },
      { key: 'campus.life.5', section: 'Campus Life cards', label: 'Campus Life — Student Clubs',      def: U('photo-1529070538774-1843cb3265df') },
      { key: 'campus.life.6', section: 'Campus Life cards', label: 'Campus Life — Leadership',         def: U('photo-1517245386807-bb43f82c33c4') },
      { key: 'campus.library',section: 'Library', label: 'Library main image',                         def: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1100&q=80' },
    ],
  },
  {
    page: 'Faculty',
    slots: [
      { key: 'faculty.hero', section: 'Hero banner (top of page)', label: 'Hero banner background photo', def: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80' },
      { key: 'faculty.member.1', section: 'Faculty member cards', label: 'Faculty member 1 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.2', section: 'Faculty member cards', label: 'Faculty member 2 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.3', section: 'Faculty member cards', label: 'Faculty member 3 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.4', section: 'Faculty member cards', label: 'Faculty member 4 photo (optional — replaces the initials avatar)', def: '' },
    ],
  },
  {
    page: 'Admissions',
    slots: [
      { key: 'admissions.hero', section: 'Hero banner (top of page)', label: 'Hero background photo (optional — layers softly behind the 3D scene)', def: '' },
    ],
  },
  {
    page: 'Contact',
    slots: [
      { key: 'contact.hero', section: 'Hero banner (top of page)', label: 'Hero banner background photo', def: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80' },
    ],
  },
]
