import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const NavBar = () => {
    const { setShowLogin, user, logoutUser, isOwner, setIsOwner, axios } = useAppContext()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const chengeRole = async () => {
    try {
        const { data } = await axios.post("/api/owner/change-role")
        if (data.success) {
            setIsOwner(true)
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

return (
    <motion.div 
    initial={{ y:-20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className={`flex items-center justify-between px-6 md:px-12 lg:px-14 xl:px-32 py-4
    text-gray-600 border-b border-borderColor relative transition-all
        ${location.pathname === "/" && "bg-light"}`}>
        {/* logo */}
        <Link to="/">
            <motion.img whileHover={{scale:1.05}} src={assets.logo} alt="logo" className='h-8' />
        </Link>
        {/* navigation */}
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t gap-4
            border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center sm:gap-8
            max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"}
            ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            {/* menu links */}
            {menuLinks.map((link, index) => (
                <Link key={index + "linkMenu"} to={link.path} onClick={() => setOpen(!open)}>
                    {link.name}
                </Link>
            ))}
            {/* search */}
            <div className='hidden lg:flex items-center gap-2 text-sm border border-borderColor
                px-3 rounded-full max-w-56'>
                <input type="text" className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
                    placeholder='Search products' />
                <img src={assets.search_icon} alt="search" className='w-4 cursor-pointer' />
            </div>
            {/* buttons */}
            <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                <button className='cursor-pointer' onClick={() => { isOwner ? navigate("/owner") : chengeRole(); setOpen(!open) }}>
                    {isOwner ? "Dashboard" : "List cars"}
                </button>
                <button onClick={() => { user ? logoutUser() : setShowLogin(true); setOpen(!open) }}
                    className='cursor-pointer px-8 py-2 bg-primary hover:bg-primery-dull
                    transition-all text-white rounded-lg'>
                    {user ? "Logout" : "Login"}
                </button>
            </div>
        </div>
        {/* mobile button menu */}
        <button className='sm:hidden curser-pointer' onClick={() => setOpen(!open)} aria-label='Menu'>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="mobileMenu" />
        </button>
    </motion.div>
)
}

export default NavBar