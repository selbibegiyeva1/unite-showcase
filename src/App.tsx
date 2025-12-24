import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'

import Home from './pages/Home'
import Product from './pages/Product'
import News from './pages/News'
import Partners from './pages/Partners'

function App() {
  return (
    <div className="bg-[#18181B]">
      <div className='mb-10'>
        <Navbar />
      </div>

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
