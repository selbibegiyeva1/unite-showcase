import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import ScrollToTop from './components/layout/ScrollToTop'
import UpButton from './components/layout/UpButton'

import Home from './pages/Home'
import Product from './pages/Product'
import News from './pages/News'
import Partners from './pages/Partners'

function App() {
  return (
    <div className="bg-[#18181B] min-h-screen relative">
      <div className='pb-28'>
        <Navbar />
      </div>
      <ScrollToTop />
      <UpButton />

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
