import User from "../models/UserModels.js";
import Car from "../models/CarModels.js";
import Booking from "../models/BookingModel.js";

// function available car
const checkAvailableCar = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({ 
        car: car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate }
     });
     return bookings.length === 0;
}

// check if car is available the given Data and Location
export const availabilityCarOfDataAndLocationController = async (req, res) => {
    try {
        const { pickupDate, returnDate, location } = req.body;

        const cars = await Car.find({ location, isAvaliable: true });

        const availableCars = cars.map(async (car) => {
            const isAvailable = await checkAvailableCar(car._id, pickupDate, returnDate);
            return { ...car._doc, isAvailable: isAvailable };
        });
        let availableCarsData = await Promise.all(availableCars);
        availableCarsData = availableCarsData.filter((car) => car.isAvailable === true);

        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Available cars fetched successfully", 
            availableCars: availableCarsData
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message || error 
        });
    }
}

// create booking
export const createBookingController = async (req, res) => {
    try {
        const { carId, pickupDate, returnDate } = req.body
        const { _id } = req.user

        const isAvaliable = await checkAvailableCar(carId, pickupDate, returnDate)
        if (!isAvaliable) {
            return res.status(400).json({ 
                success: false, 
                error: true, 
                message: "Car is not available" 
            });
        }

        const car = await Car.findById(carId)
        if (!car) {
            return res.status(404).json({ 
                success: false, 
                error: true, 
                message: "Car not found" 
            });
        }

        if (car.owner.toString() === _id.toString()) {
            return res.status(400).json({ 
                success: false, 
                error: true, 
                message: "You can't book your own car" 
            });
        }

        const picke = new Date(pickupDate)
        const retur = new Date(returnDate)
        const noOfDays = Math.ceil((retur - picke) / (1000 * 60 * 60 * 24))
        const price = noOfDays * car.pricePerDay

        await Booking.create({
            car: carId,
            owner: car.owner,
            user: _id,
            pickupDate,
            returnDate,
            price
        })

        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Booking created successfully" 
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message || error 
        });
    }
}

// get user bookings
export const getUserBookingsController = async (req, res) => {
    try {
        const { _id } = req.user

        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Bookings fetched successfully", 
            bookings 
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message || error 
        });
    }
}

// get owner bookings
export const getOwnerBookingsController = async (req, res) => {
    try {
        const { _id } = req.user

        if (req.user.role !== "owner") {
            return res.status(401).json({ 
                success: false, 
                error: true, 
                message: "You are not authorized" 
            });
        }

        const bookings = await Booking.find({ owner: _id }).populate("car user").select("-user.password").sort({ createdAt: -1 });

        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Bookings fetched successfully", 
            bookings 
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message || error 
        });
    }
}

// chenge booking status
export const changeBookingStatusController = async (req, res) => {
    try {
        const { _id } = req.user
        const { status, bookingId } = req.body

        const booking = await Booking.findById(bookingId)
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                error: true, 
                message: "Booking not found" 
            });
        }
        
        if (booking.owner.toString() !== _id.toString()) {
            return res.status(401).json({ 
                success: false, 
                error: true, 
                message: "You are not authorized" 
            });
        }

        booking.status = status
        await booking.save()

        res.status(200).json({ 
            success: true, 
            error: false, 
            message: "Booking status changed successfully" 
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({ 
            success: false, 
            error: true, 
            message: error.message || error 
        });
    }
}