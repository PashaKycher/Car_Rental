import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'

const Home = ({ setShowLogin }) => {
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