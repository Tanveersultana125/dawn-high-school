import { Routes, Route } from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute'
import { PageImagesProvider } from './context/PageImagesContext'

export default function App() {
  return (
    <PageImagesProvider>
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
      <Route
        path="/admin/media"
        element={
          <ProtectedRoute>
            <AdminMedia />
          </ProtectedRoute>
        }
      />
    </Routes>
    </PageImagesProvider>
  )
}
