import React, { useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';

const AddCar = () => {
    const currensy = import.meta.env.VITE_CURRENCY;
    const [image, setImage] = useState('');
    const [car, setCar] = useState({
        brand: '',
        model: '',
        category: '',
        year: 0,
        pricePerDay: 0,
        transmission: '',
        fuel_type: '',
        seating_capacity: 0,
        description: '',
        location: '',
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='px-4 py-10 md:px-10 flex-1'>
            {/* title */}
            <Title title='Add New Car' subtitle='Fill in details to list a new car for
            booking, including price, car specifications and availability.' />
            {/* form */}
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5
            text-gray-500 text-sm mt-6 max-w-xl'>
                {/* car image */}
                <div className='flex items-center gap-2 w-full'>
                    <label htmlFor='car-image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_icon}
                            alt="" className='h-14 rounded cursor-pointer' />
                        <input type="file" id='car-image' onChange={(e) => setImage(e.target.files[0])} hidden />
                    </label>
                    <p className='text-sm text-gray-500'>Upload a picture of your car</p>
                </div>
                {/* car brand and model */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="brand">Brand</label>
                        <input type="text" id='brand' placeholder='e.g. BMW, Mercedes, Audi...' required
                            value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="model">Model</label>
                        <input type="text" id='model' placeholder='e.g. X5, E-Class, A3...' required
                            value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                    </div>
                </div>
                {/* Car Year, Price, Category */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="year">Year</label>
                        <input type="number" id='year' placeholder='e.g. 2022' required
                            value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="price">Price per Day ({currensy})</label>
                        <input type="number" id='price' placeholder='e.g. 100' required
                            value={car.pricePerDay} onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="category">Category</label>
                        <select id='category' required value={car.category}
                            onChange={(e) => setCar({ ...car, category: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Category</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Crossover">Crossover</option>
                            <option value="Minivan">Minivan</option>
                            <option value="Pickup">Pickup</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                        </select>
                    </div>
                </div>
                {/* Fuel Type, Seating Capacity, Transmission Type */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="transmission">Transmission Type</label>
                        <select id='transmission' required value={car.transmission}
                            onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="CVT">CVT</option>
                            <option value="AMT">AMT</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="fuel">Fuel Type</label>
                        <select id='fuel' required value={car.fuel_type}
                            onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
                            <option value="">Select Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="capacity">Seating Capacity</label>
                        <input type="number" id='capacity' placeholder='e.g. 5' required
                            value={car.seating_capacity} onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })}
                            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                    </div>
                </div>
                {/* location */}
                <div className='flex flex-col w-full'>
                    <label htmlFor="location">Location</label>
                    <input type="text" id='location' placeholder='e.g. New York, USA' required
                        value={car.location} onChange={(e) => setCar({ ...car, location: e.target.value })}
                        className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                </div>
                {/* description */}
                <div className='flex flex-col w-full'>
                    <label htmlFor="description">Description</label>
                    <textarea id='description' placeholder='e.g. This car is amazing!' rows={5}
                        value={car.description} onChange={(e) => setCar({ ...car, description: e.target.value })}
                        className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' />
                </div>
                {/* button */}
                <button type='submit' className='w-max mt-4 px-4 py-2.5 bg-primary text-white rounded-md
                hover:bg-primery-dull transition-all font-semibold cursor-pointer flex itams-center gap-2'>
                    <img src={assets.tick_icon} alt="" /> List Your Car
                </button>
            </form>
        </div>
    )
}

export default AddCar