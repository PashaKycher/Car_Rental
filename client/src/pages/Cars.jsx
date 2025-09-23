import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'

const Cars = () => {
  const [input, setInput] = useState('')

  return (
    <div>
      {/* search bar */}
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Avalible Cars' subtitle='Browse our selection of premium vehicles
        available for your next adventure.'/>

        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2' />

          <input type="text" placeholder='Search by make, model, or features' value={input}
          className='w-full h-full outline-none text-gray-500' onChange={(e) => setInput(e.target.value)}/>

          <img src={assets.filter_icon} alt="filter" className='w-4.5 h-4.5 ml-2'/>
        </div>
      </div>
      {/* cars */}
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {dummyCarData.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {dummyCarData.map((car) => (<div key={car._id}><CarCard car={car} /></div>))}
        </div>
      </div>
    </div>
  )
}

export default Cars