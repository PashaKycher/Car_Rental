import User from "../models/UserModels.js";
import Car from "../models/CarModels.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Booking from "../models/BookingModel.js";


// Chenge role to owner
export const changeRoleToOwnerController = async (req, res) => {
    try {
        const { _id } = req.user

        await User.findByIdAndUpdate(_id, { role: "owner" })

        res.status(200).json({
            success: true,
            error: false,
            message: "Now you can list cars"
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// Add new car
export const addNewCarController = async (req, res) => {
    try {
        let car = JSON.parse(req.body.carData)
        const imageFile = req.file
        const { _id } = req.user

        // upload image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        })
        // generation url for image from respons imagekit
        const imageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'},   // Resize to width 1280
                {quality: 'auto'}, // Auto compression 
                {format: 'webp'}   // Convert to modern image format
            ]
        })
        const image = imageUrl

        await Car.create({ ...car, image, owner: _id })

        res.status(200).json({
            success: true,
            error: false,
            message: "Car added successfully",
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// list owner cars
export const listOwnerCarsController = async (req, res) => {
    try {
        const { _id } = req.user

        const cars = await Car.find({ owner: _id })

        res.status(200).json({
            success: true,
            error: false,
            message: "Cars fetched successfully",
            cars
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// toggle car availability
export const toggleCarAvailabilityController = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body

        const car = await Car.findById(carId)

        if (car.owner.toString() !== _id.toString()) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "You are not authorized"
            })
        }
    
        car.isAvaliable = !car.isAvaliable 
        await car.save()

        res.status(200).json({
            success: true,
            error: false,
            message: "Car availability toggled successfully"
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// delete car
export const deleteCarController = async (req, res) => {
    try {
        const { _id } = req.user
        const { carId } = req.body

        const car = await Car.findById(carId)

        if (car.owner.toString() !== _id.toString()) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "You are not authorized"
            })
        }

        car.owner = null
        car.isAvaliable = false
        await car.save()

        res.status(200).json({
            success: true,
            error: false,
            message: "Car deleted successfully"
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// deshbord data
export const deshbordDataController = async (req, res) => {
    try {
        const { _id, role } = req.user

        if (role !== "owner") {
            return res.status(401).json({
                success: false,
                error: true,
                message: "You are not authorized"
            })
        }

        const cars = await Car.find({ owner: _id })
        const bookings = await Booking.find({ owner: _id }).populate("car").sort({ createdAt: -1 });
        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const compliedBookings = await Booking.find({ owner: _id, status: "confirmed" })
        const rejectedBookings = await Booking.find({ owner: _id, status: "cancelled" })

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").reduce((acc, booking) => acc + booking.price, 0)

        const dashbordData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            totalPendingBookings: pendingBookings.length,
            totalCompliedBookings: compliedBookings.length,
            totalRejectedBookings: rejectedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue,
        }

        res.status(200).json({
            success: true,
            error: false,
            message: "Deshbord data fetched successfully",
            dashbordData
        })
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
};

// update user image
export const updateUserImageController = async (req, res) => {
    try {
        const { _id } = req.user
        const imageFile = req.file

        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            })
        }

        // upload image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/owners"
        })
        // generation url for image from respons imagekit
        const imageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '400'},   // Resize to width 400
                {quality: 'auto'}, // Auto compression 
                {format: 'webp'}   // Convert to modern image format
            ]
        })
        const image = imageUrl

        user.image = image
        await user.save()

        res.status(200).json({
            success: true,
            error: false,
            message: "User image updated successfully"
        })

    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        })
    }
}