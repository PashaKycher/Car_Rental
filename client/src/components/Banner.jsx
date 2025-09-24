import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = ({ setShowLogin }) => {
    const navigate = useNavigate()
    const user = dummyUserData

    const handleClick = () => {
        if (user) {
            navigate("/owner")
        } else {
            setShowLogin(true)
        }
    }

    return (
        <div className='flex flex-col md:flex-row items-center md:items-start justify-between px-8 rounded-2xl
    min-md:pl-14 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto overflow-hidden'>
            {/* info and button */}
            <div className='text-white'>
                <h2 className='text-3xl font-medium'>Do You Own a Luxury Car</h2>
                <p className='mt-2'>Monetize your vehicle effortlessly by listing it on CarReental</p>
                <p className='max-w-130'>We take care of insurance, driver varification and secure payments
                    - so you can earn passive income, stress-free.</p>

                <button onClick={handleClick}
                className='px-6 py-2 bg-white hover:bg-slate-100 transition-all mt-4
                text-primary rounded-lg text-sm cursor-pointer'>List your car</button>
            </div>
            {/* car image */}
            <img src={assets.banner_car_image} alt="bannerCar" className='max-h-45 mt-10' />
        </div>
    )
}

export default Banner