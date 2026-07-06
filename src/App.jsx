import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import AcademicsPage from './pages/AcademicsPage'
import CampusPage from './pages/CampusPage'
import FacultyPage from './pages/FacultyPage'
import GalleryPage from './pages/GalleryPage'
import AdmissionsPage from './pages/AdmissionsPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminMedia from './pages/AdminMedia'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'
import { PageImagesProvider } from './context/PageImagesContext'
import { PageTextProvider } from './context/PageTextContext'

// Per-page editors shown in the admin sidebar (Gallery is handled by AdminMedia).
const ADMIN_PAGES = [
  { path: 'home',       page: 'Home',       title: 'Home Page',       subtitle: 'Homepage hero, awards, journey cards & library image', showHero: true },
  { path: 'about',      page: 'About',      title: 'About Page',      subtitle: 'Intro collage, vision, founder & leadership photos' },
  { path: 'academics',  page: 'Academics',  title: 'Academics Page',  subtitle: 'Hero banner & curriculum image' },
  { path: 'campus',     page: 'Campus',     title: 'Campus Page',     subtitle: 'Hero banner, campus-life photos & library image' },
  { path: 'admissions', page: 'Admissions', title: 'Admissions Page', subtitle: 'Optional hero background photo' },
  { path: 'contact',    page: 'Contact',    title: 'Contact Page',    subtitle: 'Hero banner background photo' },
]

export default function App() {
  return (
    <PageImagesProvider>
    <PageTextProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="academics" element={<AcademicsPage />} />
        <Route path="campus" element={<CampusPage />} />
        <Route path="faculty" element={<FacultyPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Route>

      {/* Admin — bare pages, no public header/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      {ADMIN_PAGES.map((p) => (
        <Route
          key={p.path}
          path={`/admin/${p.path}`}
          element={
            <ProtectedRoute>
              <AdminPage page={p.page} title={p.title} subtitle={p.subtitle} showHero={p.showHero} />
            </ProtectedRoute>
          }
        />
      ))}
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <AdminMedia />
          </ProtectedRoute>
        }
      />
      {/* Legacy path — the old bundled Media Library now lives at /admin/gallery */}
      <Route path="/admin/media" element={<Navigate to="/admin/gallery" replace />} />
    </Routes>
    </PageTextProvider>
    </PageImagesProvider>
  )
}
