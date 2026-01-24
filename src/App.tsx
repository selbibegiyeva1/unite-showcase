import './App.css'
import { useState, lazy, Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import UpButton from './components/layout/UpButton'
import Sidebar from './components/layout/Sidebar'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Product = lazy(() => import('./pages/Product'))
const Partners = lazy(() => import('./pages/Partners'))

const News = lazy(() => import('./pages/news/News'))
const News2 = lazy(() => import('./pages/news/News2'))
const News33 = lazy(() => import('./pages/news/News33'))
const News4 = lazy(() => import('./pages/news/News4'))
const AboutUs = lazy(() => import('./pages/AboutUs'))

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // LazyLoading
  return (
    <div className="bg-[#18181B] min-h-screen relative">
      <div className='pb-28'>
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <ScrollToTop />
      <UpButton />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/news" element={<News />} />
          <Route path="/news2" element={<News2 />} />
          <Route path="/news3" element={<News33 />} />
          <Route path="/news4" element={<News4 />} />
          <Route path="/news5" element={<AboutUs />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
