import './App.css'
import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import UpButton from './components/layout/UpButton'
import Sidebar from './components/layout/Sidebar'

import Home from './pages/Home'
import Product from './pages/Product'
import Partners from './pages/Partners'

import News from './pages/news/News'
import News2 from './pages/news/News2'
import News33 from './pages/news/News33'
import News4 from './pages/news/News4'

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/partners" element={<Partners />} />

        <Route path="/news" element={<News />} />
        <Route path="/news2" element={<News2 />} />
        <Route path="/news3" element={<News33 />} />
        <Route path="/news4" element={<News4 />} />
      </Routes>
    </div>
  )
}

export default App
