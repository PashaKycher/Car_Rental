import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.includes("/owner")

  return (
    <>
      {!isOwnerPath && <NavBar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-ditails/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
