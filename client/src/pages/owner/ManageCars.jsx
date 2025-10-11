import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageCars = () => {
    const { isOwner, axios, currency } = useAppContext()

    const [car, setCar] = useState([])

    const fetchOwnerCars = async () => {
        try {
            const { data } = await axios.get('/api/owner/cars');
            if (data.success) {
                setCar(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const toggleAvailability = async (carId) => {
        try {
            const { data } = await axios.post('/api/owner/toggle-car', { carId })
            if (data.success) {
                fetchOwnerCars()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteAvailability = async (carId) => {
        try {
            const conform = window.confirm('Are you sure you want to delete this car?')
            if (!conform) return null

            const { data } = await axios.post('/api/owner/delete-car', { carId })
            if (data.success) {
                fetchOwnerCars()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        isOwner && fetchOwnerCars()
    }, [isOwner])

    return (
        <div className='px-4 pt-10 md:px-10 w-full'>
            {/* title */}
            <Title title='Manage Cars' subtitle='View all lister cars,
        updatils, or remove them from the booking platform.'/>
            {/* Table */}
            <div className='max-w-3xl w-full rounded-md overflow-hidden 
        border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-sm text-gray-600'>
                    <thead className='text-gray-500'>
                        <tr>
                            <th className='p-3 font-medium'>Car</th>
                            <th className='p-3 font-medium max-lg:hidden'>Category</th>
                            <th className='p-3 font-medium'>Price</th>
                            <th className='p-3 font-medium max-lg:hidden'>Statys</th>
                            <th className='p-3 font-medium'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-borderColor'>
                        {car.map((car) => (
                            <tr key={car._id} className='border-t border-borderColor'>
                                {/* Image and brand */}
                                <td className='p-3 flex items-center gap-3'>
                                    <img src={car.image} alt="" className='w-12 h-12 object-cover rounded-md aspect-square' />
                                    <div className='max-md:hidden'>
                                        <p className='font-medium'>{car.brand} {car.model}</p>
                                        <p className='text-gray-500 text-sm'>{car.seating_capacity} • {car.transmission}</p>
                                    </div>
                                </td>
                                {/* Category */}
                                <td className='p-3 max-lg:hidden'>{car.category}</td>
                                {/* Price */}
                                <td className='p-3'>{currency}{car.pricePerDay}<span className='max-md:hidden'>/day</span></td>
                                {/* Status */}
                                <td className='p-3 max-lg:hidden'>
                                    <span className={`px-3 py-1 rounded-full text-sm
                                ${car.isAvaliable ? "bg-green-400/15 text-green-600" : "bg-red-400/15 text-red-600"}`}>
                                        {car.isAvaliable ? "Available" : "Unavailable"}
                                    </span>
                                </td>
                                {/* Actions */}
                                <td className='p-3 flex items-center'>
                                    <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt=""
                                        className='cursor-pointer' onClick={() => toggleAvailability(car._id)} />

                                    <img src={assets.delete_icon} alt="" className='cursor-pointer'
                                        onClick={() => deleteAvailability(car._id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCars