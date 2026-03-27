import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ThemeSwitcher from './components/ThemeSwitcher'

const Home   = lazy(() => import('./pages/Home'))
const Menu   = lazy(() => import('./pages/Menu'))
const Vendor = lazy(() => import('./pages/Vendor'))
const About  = lazy(() => import('./pages/About'))

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-night-900 min-h-screen text-white">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"           element={<Home />}   />
            <Route path="/menu"       element={<Menu />}   />
            <Route path="/vendor/:id" element={<Vendor />} />
            <Route path="/about"      element={<About />}  />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  )
}