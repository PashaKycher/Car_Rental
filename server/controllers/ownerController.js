import User from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/CarModels.js";

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
        let car = JSON.parse(req.body.car)
        const imageFile = req.file
        const { _id } = req.user

        res.status(200).json({
            success: true,
            error: false,
            message: "Car added successfully",
            car
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
