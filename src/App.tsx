import './App.css'
import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import UpButton from './components/layout/UpButton'
import Sidebar from './components/layout/Sidebar'

import Home from './pages/Home'
import Product from './pages/Product'
import News from './pages/news/News'
import Partners from './pages/Partners'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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
        <Route path="/news" element={<News />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </div>
  )
}

export default App
