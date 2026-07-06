import AdminShell from '../components/AdminShell'
import HeroManager from '../components/HeroManager'
import PageImagesManager from '../components/PageImagesManager'

/**
 * Generic editor for a single public page (Home, About, Academics, Campus,
 * Admissions, Contact). Shows that page's editable images, plus the homepage
 * hero when `showHero` is set. Driven by props from the routes in App.jsx.
 */
export default function AdminPage({ page, title, subtitle, showHero = false }) {
  return (
    <AdminShell title={title} subtitle={subtitle}>
      {showHero && <HeroManager />}
      <PageImagesManager page={page} />
    </AdminShell>
  )
}
