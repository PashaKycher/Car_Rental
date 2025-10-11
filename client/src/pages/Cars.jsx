import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {
  const { cars, axios } = useAppContext()

  // get search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate
  const applyFilter = async () => {
    if (input === '') {
      setFilteredCars(cars)
      return null
    }
    const filtered = cars.slice().filter((car) => {
      return car.brand.toLowerCase().includes(input.toLocaleLowerCase())
        || car.model.toLowerCase().includes(input.toLocaleLowerCase())
        || car.category.toLowerCase().includes(input.toLocaleLowerCase())
        || car.transmission.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailsbility = async () => {
    try {
      const { data } = await axios.post('/api/bookings/cheak-availability', { location: pickupLocation, pickupDate, returnDate })
      if (data.success) {
        setFilteredCars(data.availableCars)
        if (data.availableCars.length === 0) {
          toast.error('No cars available for selected date')
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailsbility()
    } else {
      setFilteredCars(cars)
    }
  }, [isSearchData])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])

  return (
    <div>
      {/* search bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Avalible Cars' subtitle='Browse our selection of premium vehicles
        available for your next adventure.'/>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="search" className='w-4.5 h-4.5 mr-2' />

          <input type="text" placeholder='Search by make, model, or features' value={input}
            className='w-full h-full outline-none text-gray-500' onChange={(e) => setInput(e.target.value)} />

          <img src={assets.filter_icon} alt="filter" className='w-4.5 h-4.5 ml-2' />
        </motion.div>
      </motion.div>
      {/* cars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            key={car._id}><CarCard car={car} /></motion.div>))}
        </div>
      </motion.div>
    </div>
  )
}

export default Cars