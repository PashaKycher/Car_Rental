import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import { useAppContext } from '../context/AppContext'
import NewsLetter from '../components/NewsLetter'

const Home = ({ setShowLogin }) => {
  const { fetchCars } = useAppContext()

  useEffect(() => {
    fetchCars()
  }, []);
  return (
    <>
      {/* first section */}
      <Hero />
      {/* second section */}
      <FeaturedSection />
      {/* third section */}
      <Banner setShowLogin={setShowLogin} />
      {/* fourth section */}
      <Testimonial />
      {/* fifth section */}
      <NewsLetter />
    </>
  )
}

export default Home