import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import { Link } from 'react-router-dom'
import Title from '../../components/owner/Title'

const ManageBookings = () => {
    const currecy = import.meta.env.VITE_CURRENCY
    const [bookings, setBookings] = useState([])

    const fetchOwnerBoookings = async () => {
        setBookings(dummyMyBookingsData)
    }

    useEffect(() => {
        fetchOwnerBoookings()
    }, [])

    return (
        <div className='px-4 pt-10 md:px-10 w-full'>
            {/* title */}
            <Title title='Manage Bookings' subtitle='Track all customer bookings, approve
        or cancel requests, and manage booking statuses.' />
            {/* Table */}
            <div className='max-w-3xl w-full rounded-md overflow-hidden 
        border border-borderColor mt-6'>
                <table className='w-full border-collapse text-left text-sm text-gray-600'>
                    <thead className='text-gray-500'>
                        <tr>
                            <th className='p-3 font-medium'>Car</th>
                            <th className='p-3 font-medium max-lg:hidden'>Date Range</th>
                            <th className='p-3 font-medium'>Total</th>
                            <th className='p-3 font-medium max-lg:hidden'>Payment</th>
                            <th className='p-3 font-medium'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-borderColor'>
                        {bookings.map((bookings) => (
                            <tr key={bookings._id} className='border-t border-borderColor text-gray-500'>
                                {/* Car image and brand */}
                                <td className='p-3 flex items-center gap-3'>
                                    <img src={bookings.car.image} alt=""
                                        className='w-12 h-12 object-cover rounded-md aspect-square' />
                                    <p className='font-medium max-md:hidden'>{bookings.car.brand} {bookings.car.model}</p>
                                </td>
                                {/* Date range */}
                                <td className='p-3 max-lg:hidden'>
                                    {bookings.pickupDate.split('T')[0]} - {bookings.returnDate.split('T')[0]}
                                </td>
                                {/* Total */}
                                <td className='p-3'>{currecy}{bookings.price}</td>
                                {/* Payment */}
                                <td className='p-3 max-lg:hidden'>
                                    <span className='bg-gray-100 px-3 py-1 rounded-full text-sm'>offline</span>
                                </td>
                                {/* Actions */}
                                <td className='p-3'>
                                    {bookings.status === 'pending' ? (
                                        <select className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor
                                        rounded-md outline-none max-sm:text-xs max-[330px]:max-w-[82px]' value={bookings.status}>
                                            <option value="pending">Pending</option>
                                            <option value="cancelled">Cancelled</option>
                                            <option value="confirmed">Confirmed</option>
                                        </select>
                                    ) : (<span className={`px-3 py-1 rounded-full font-semibold max-[330px]:text-xs
                                    ${bookings.status === 'confirmed' ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'} text-sm`}>{bookings.status}</span>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings