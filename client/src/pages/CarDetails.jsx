import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!id) {
      navigate("/cars")
    }
    const car = dummyCarData.find(car => car._id === id)
    setCar(car)
  }, [id])

  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      {/* button back */}
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src={assets.arrow_icon} alt="arrow" className='rotate-180 opacity-65' />
        Back
      </button>
      {/* car details and form */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Car details and image */}
        <div className='lg:col-span-2'>
          <img src={car?.image} alt="carImage"
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md" />
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car?.brand} {car?.model}</h1>
              <p className='text-gray-500 text-lg'>{car?.category} • {car?.year}</p>
            </div>
            <hr className='border-borderColor my-6' />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car?.seating_capacity} seats` },
                { icon: assets.fuel_icon, text: car?.fuel_type },
                { icon: assets.car_icon, text: car?.transmission },
                { icon: assets.location_icon, text: car?.location },
              ].map((item, index) => (
                <div key={index + "carDetails"} className='flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={item.icon} alt="icon" className='h-5 mb-2' />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car?.description}</p>
            </div>
            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {['360 Camera', 'GPS', 'Air Condition', 'Bluetooth', 'USB', 'Wifi', 'Heated Seats', 'Read View Mirror']
                  .map((feature, index) => (<li key={index + "features"} className='flex items-center text-gray-500 gap-2'>
                    <img src={assets.check_icon} alt="check" className='h-5' /> <p>{feature}</p></li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Right: Booking form */}
        <form className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'
        onSubmit={handleSubmit}>
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}{car?.pricePerDay}<span className='text-base text-gray-400 font-normal'>per day</span>
          </p>

          <hr className='border-borderColor my-6' />

          <div className='flex flex-col gap-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='pickup-date'>Pick-up Date</label>
            <input type="date" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' required
              min={new Date().toISOString().split('T')[0]} id='pickup-date' />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='return-date'>Return Date</label>
            <input type="date" className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5' required
              min={new Date().toISOString().split('T')[0]} id='return-date' />
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all
          py-3 font-medium text-white rounded-xl cursor-pointer'>
            Book Now
          </button>

          <p className='text-center text-sm'>No credit cart required to reserve</p>
        </form>
      </div>
    </div>
  ) : <Loader />
}

export default CarDetails