import React from 'react'
import { assets, dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

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
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='flex flex-col md:flex-row items-center md:items-start justify-between px-8 rounded-2xl
            min-md:pl-14 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto overflow-hidden'>
            {/* info and button */}
            <div className='text-white'>
                <h2 className='text-3xl font-medium mt-2'>Do You Own a Luxury Car</h2>
                <p className='mt-2'>Monetize your vehicle effortlessly by listing it on CarReental</p>
                <p className='max-w-130'>We take care of insurance, driver varification and secure payments
                    - so you can earn passive income, stress-free.</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClick}
                    className='px-6 py-2 bg-white hover:bg-slate-100 transition-all mt-4
                    text-primary rounded-lg text-sm cursor-pointer'>
                    List your car
                </motion.button>
            </div>
            {/* car image */}
            <motion.img
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src={assets.banner_car_image} alt="bannerCar" className='max-h-45 mt-10' />
        </motion.div>
    )
}

export default Banner