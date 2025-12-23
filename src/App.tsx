import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'

import Home from './pages/Home'
import Product from './pages/Product'
import News from './pages/News'
import Partners from './pages/Partners'

function App() {
  return (
    <div className="h-screen bg-gray-950">
      <div className='mb-10'>
        <Navbar />
      </div>

      <div className='px-4'>
        <div className="max-w-255 m-auto text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/news" element={<News />} />
            <Route path="/partners" element={<Partners />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
