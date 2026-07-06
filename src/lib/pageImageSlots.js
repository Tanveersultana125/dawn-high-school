// The catalogue of admin-editable image slots, grouped by page. Each slot's
// `key` matches the key used by the page component via usePageImage(); `def` is
// the built-in default shown as a preview in the admin panel (the page keeps its
// own copy of this default, so the two only need to agree for the thumbnail).
// Hero slots use an empty `def` — with no image the page keeps its animated
// particle backdrop, and an uploaded image layers behind it.

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

export const PAGE_IMAGE_GROUPS = [
  {
    page: 'Home',
    slots: [
      { key: 'home.award.1', label: 'Awards slider — Oxford Partner',        def: '/achievements/oxford-quality.png' },
      { key: 'home.award.2', label: 'Awards slider — Global Education Award', def: '/achievements/global-education-award.png' },
      { key: 'home.award.3', label: 'Awards slider — Institution of Distinction', def: '/achievements/education-certificate.png' },
      { key: 'home.award.4', label: 'Awards slider — International Ties',     def: '/achievements/turkey-consulate.png' },
      { key: 'home.award.5', label: 'Awards slider — Civic Honour',          def: '/achievements/dawn-recognition.png' },
      { key: 'home.award.6', label: 'Awards slider — Literary Laureates',    def: '/achievements/sahitya-academy.png' },
      { key: 'home.division.1', label: 'Dawn Journey — Early Years card',    def: U('photo-1577896851231-70ef18881754') },
      { key: 'home.division.2', label: 'Dawn Journey — Primary School card', def: U('photo-1503676260728-1c00da094a0b') },
      { key: 'home.division.3', label: 'Dawn Journey — Middle School card',  def: U('photo-1562774053-701939374585') },
      { key: 'home.division.4', label: 'Dawn Journey — High School card',    def: U('photo-1523240795612-9a054b0db644') },
      { key: 'home.library', label: 'Library section image',                 def: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1100&q=80' },
    ],
  },
  {
    page: 'About',
    slots: [
      { key: 'about.collage.1', label: 'Intro collage — main photo',   def: U('photo-1588072432836-e10032774350') },
      { key: 'about.collage.2', label: 'Intro collage — oval photo',   def: U('photo-1523580494863-6f3031224c94') },
      { key: 'about.collage.3', label: 'Intro collage — science lab',  def: U('photo-1532094349884-543bc11b234d') },
      { key: 'about.vision',    label: 'Vision & Mission image',       def: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1100&q=80' },
      { key: 'about.founder',   label: 'Founder photo (Razi-ur-Rahman Sahab)', def: '/founder.jpg' },
      { key: 'about.leadership',label: 'Leadership photo (F. R. Khurram)',     def: '/khurram.png' },
      { key: 'about.award',     label: 'Award ceremony photo',         def: '/dawn-award.jpg' },
    ],
  },
  {
    page: 'Academics',
    slots: [
      { key: 'academics.hero', label: 'Hero banner background (optional)', def: '' },
      { key: 'academics.oxfordCurriculum', label: 'Oxford Curriculum image', def: '/oxford-curriculum.png' },
    ],
  },
  {
    page: 'Campus',
    slots: [
      { key: 'campus.hero',   label: 'Hero banner background (optional)', def: '' },
      { key: 'campus.life.1', label: 'Campus Life — Sports & Athletics', def: U('photo-1461896836934-ffe607ba8211') },
      { key: 'campus.life.2', label: 'Campus Life — Arts & Music',       def: U('photo-1511671782779-c97d3d27a1d4') },
      { key: 'campus.life.3', label: 'Campus Life — Science Labs',       def: U('photo-1532094349884-543bc11b234d') },
      { key: 'campus.life.4', label: 'Campus Life — Modern Library',     def: U('photo-1497486751825-1233686d5d80') },
      { key: 'campus.life.5', label: 'Campus Life — Student Clubs',      def: U('photo-1529070538774-1843cb3265df') },
      { key: 'campus.life.6', label: 'Campus Life — Leadership',         def: U('photo-1517245386807-bb43f82c33c4') },
      { key: 'campus.library',label: 'Library main image',              def: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1100&q=80' },
    ],
  },
  {
    page: 'Faculty',
    slots: [
      { key: 'faculty.hero', label: 'Hero banner background photo', def: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80' },
      { key: 'faculty.member.1', label: 'Faculty member 1 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.2', label: 'Faculty member 2 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.3', label: 'Faculty member 3 photo (optional — replaces the initials avatar)', def: '' },
      { key: 'faculty.member.4', label: 'Faculty member 4 photo (optional — replaces the initials avatar)', def: '' },
    ],
  },
  {
    page: 'Admissions',
    slots: [
      { key: 'admissions.hero', label: 'Hero background photo (optional — layers softly behind the 3D scene)', def: '' },
    ],
  },
  {
    page: 'Contact',
    slots: [
      { key: 'contact.hero', label: 'Hero banner background photo', def: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1600&q=80' },
    ],
  },
]
