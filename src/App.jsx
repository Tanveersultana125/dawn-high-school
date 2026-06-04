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

export default function App() {
  return (
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
    </Routes>
  )
}
