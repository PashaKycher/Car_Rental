import User from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    const payload = userId.toString();
    return jwt.sign({payload}, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

// Register User
export const registerUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Not all fields are required"
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            error: false,
            message: "User registered successfully",
            token
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
};

// Login User
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Not all fields are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            error: false,
            message: "User logged in successfully",
            token
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
};

// Get user data using token
export const getUserDataController = async (req, res) => {
    try {
        const { user } = req

        res.status(200).json({
            success: true,
            error: false,
            message: "User data fetched successfully",
            user
        });
    } catch (error) {
        console.log(error.message || error);

        res.status(500).json({
            success: false,
            error: true,
            message: error.message || error
        });
    }
};
