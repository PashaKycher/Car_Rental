import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const user = dummyUserData
    const location = useLocation()
    const [image, setImage] = useState('')

    const updeteImage = async () => {
        user.image = URL.createObjectURL(image)
        setImage('')
    }

    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8
        max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
            {/* user image */}
            <div className='group relative'>
                <label htmlFor="image">
                    <img alt="" className='max-md:mt-3 mb-1 md:w-20 md:h-20 rounded-full object-cover cursor-pointer'
                        src={image ? URL.createObjectURL(image) : user?.image
                            || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />

                    <input type="file" id='image' accept='image/*' className="hidden"
                        onChange={(e) => setImage(e.target.files[0])} />

                    <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10
                    rounded-full group-hover:flex items-center justify-center cursor-pointer'>
                        <img src={assets.edit_icon} alt="" />
                    </div>
                </label>
            </div>
            {/* Save button */}
            {image && (
                <button className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer max-md:w-full'>
                    Save <img src={assets.check_icon} alt="" width={13} onClick={updeteImage} className='max-md:hidden'/>
                </button>
            )}
            {/* user name */}
            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>
            {/* sidebar links menu */}
            <div className='w-full'>
                {ownerMenuLinks.map((link, index) => (
                    <NavLink key={index + "linkMenu"} to={link.path} className={`relative flex items-center gap-2 w-full
                    py-3 pl-4 first-mt-6 ${link.path === location.pathname ? "bg-primary/10" : "text-gray-600"}`}>
                        <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" />
                        <span className='max-md:hidden'>{link.name}</span>
                        <div className={`${link.path === location.pathname && "bg-primary"}
                        w-1.5 h-8 rounded-l right-0 absolute`}></div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Sidebar