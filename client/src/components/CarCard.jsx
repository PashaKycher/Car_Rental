import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
    const currecy = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate(`/car-ditails/${car._id}`); scrollTo(0, 0)}}
        className=' overflow-hidden shadow-lg hover:-translate-y-1
        transition-all duration-500 cursor-pointer group rounded-xl'>
            {/* car image and text on image */}
            <div className='relative h-48 overflow-hidden'>
                <img src={car.image} alt="carCard" className='w-full object-cover
                transition-transform duration-500 group-hover:scale-105 h-full' />

                {car.isAvaliable && <p className='absolute top-4 left-4 bg-primary/90
                text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}

                <div className='absolute bottom-4 right-4 bg-black/80 
                text-white px-3 py-2 rounded-lg backdrop-blur-sm'>
                    <span className='font-semibold'>{currecy}{car.pricePerDay}</span>
                    <span className='text-sm text-white/80'> / day</span>
                </div>
            </div>
            {/* car details */}
            <div className='p-4 sm:p-5'>
                <div className='flex justify-between items-start mb-2'>
                    <div>
                        <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
                        <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
                    </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-y-2 text-gray-600'>
                    <div className='flex items-center text-sm txt-muted-foreground'>
                        <img src={assets.users_icon} alt="user" className='h-4 w-4 mr-2' />
                        <span>{car.seating_capacity} Seats</span>
                    </div>
                    <div className='flex items-center text-sm txt-muted-foreground'>
                        <img src={assets.fuel_icon} alt="user" className='h-4 w-4 mr-2' />
                        <span>{car.fuel_type}</span>
                    </div>
                    <div className='flex items-center text-sm txt-muted-foreground'>
                        <img src={assets.car_icon} alt="user" className='h-4 w-4 mr-2' />
                        <span>{car.transmission}</span>
                    </div>
                    <div className='flex items-center text-sm txt-muted-foreground'>
                        <img src={assets.location_icon} alt="user" className='h-4 w-4 mr-2' />
                        <span>{car.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarCard